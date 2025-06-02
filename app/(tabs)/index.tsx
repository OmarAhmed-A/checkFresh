import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, StatusBar, Text, Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import CameraComponent from '@/components/CameraComponent';
import PredictionResultComponent from '@/components/PredictionResultComponent';
import { modelService, PredictionResult } from '@/utils/modelUtils';
import { imageProcessor } from '@/utils/imageUtils';

type AppState = 'loading' | 'camera' | 'predicting' | 'result';

export default function HomeScreen() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Animation control refs
  const animationRefs = useRef<{
    fadeAnimation?: any;
    pulseAnimation?: any;
    rotateAnimation?: any;
  }>({});

  useEffect(() => {
    if (appState === 'loading') {
      startLoadingAnimation();
      initializeApp();
    }
    
    return () => {
      // Cleanup animations when component unmounts
      stopAllAnimations();
    };
  }, []);

  useEffect(() => {
    // Stop animations when leaving loading state
    if (appState !== 'loading') {
      stopAllAnimations();
    }
  }, [appState]);

  // Handle focus event to ensure camera works when navigating back from other tabs
  useFocusEffect(
    React.useCallback(() => {
      // Only handle navigation back to this tab, not internal state changes
      // This ensures camera works when returning from other tabs without 
      // interfering with the normal prediction → result flow
      if (isInitialized) {
        // Force camera component to re-render to ensure it works after tab navigation
        setCameraKey(prev => prev + 1);
      }
    }, [isInitialized])
  );

  const stopAllAnimations = () => {
    // Stop all running animations
    if (animationRefs.current.fadeAnimation) {
      animationRefs.current.fadeAnimation.stop();
    }
    if (animationRefs.current.pulseAnimation) {
      animationRefs.current.pulseAnimation.stop();
    }
    if (animationRefs.current.rotateAnimation) {
      animationRefs.current.rotateAnimation.stop();
    }
    // Clear refs
    animationRefs.current = {};
  };

  const startLoadingAnimation = () => {
    // Simple fade animation that runs until stopped
    const fade = () => {
      animationRefs.current.fadeAnimation = Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);
      
      animationRefs.current.fadeAnimation.start((result: { finished: boolean }) => {
        if (result.finished && appState === 'loading') {
          fade(); // Only continue if still loading
        }
      });
    };
    fade();
    
    // Pulse animation for the content
    const pulse = () => {
      animationRefs.current.pulseAnimation = Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]);
      
      animationRefs.current.pulseAnimation.start((result: { finished: boolean }) => {
        if (result.finished && appState === 'loading') {
          pulse(); // Only continue if still loading
        }
      });
    };
    pulse();

    // Rotate animation for the brain emoji
    const rotate = () => {
      rotateAnim.setValue(0);
      animationRefs.current.rotateAnimation = Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      });
      
      animationRefs.current.rotateAnimation.start((result: { finished: boolean }) => {
        if (result.finished && appState === 'loading') {
          rotate(); // Only continue if still loading
        }
      });
    };
    rotate();
  };

  const animateProgress = (toValue: number, duration: number = 800) => {
    Animated.timing(progressAnim, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Can't use native driver for width
    }).start();
    setLoadingProgress(toValue);
  };

  const initializeApp = async () => {
    try {
      setAppState('loading');
      
      // Initialize TensorFlow.js
      animateProgress(25, 600);
      await tf.ready();
      
      // Load the model
      animateProgress(75, 800);
      await modelService.loadModel();
      
      animateProgress(100, 400);
      
      // Ensure minimum loading time for better UX
      const minimumLoadTime = 1200;
      await new Promise(resolve => setTimeout(resolve, minimumLoadTime));
      
      // Stop animations before transitioning
      stopAllAnimations();
      setAppState('camera');
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      stopAllAnimations();
      Alert.alert(
        'Initialization Error',
        'Failed to load the AI model. Please restart the app.',
        [{ text: 'OK' }]
      );
    }
  };

  const handlePhotoTaken = async (imageUri: string) => {
    setCapturedImage(imageUri);
    setAppState('predicting');

    try {
      // Use the actual model for prediction
      const result = await modelService.predict(imageUri);
      setPredictionResult(result);
      setAppState('result');
    } catch (error) {
      console.error('Prediction failed:', error);
      Alert.alert(
        'Prediction Error',
        'Failed to analyze the image. Please try again.',
        [{ text: 'OK', onPress: () => setAppState('camera') }]
      );
    }
  };

  const handleTakeAnother = () => {
    setPredictionResult(null);
    setCapturedImage(null);
    setAppState('camera');
    // Force camera component to re-render
    setCameraKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        const spin = rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <View style={styles.loadingContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
            <Animated.View 
              style={[
                styles.loadingContent,
                { 
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Animated.View 
                style={[
                  styles.logoContainer,
                  { transform: [{ rotate: spin }] }
                ]}
              >
                <Text style={styles.logoEmoji}>🧠</Text>
              </Animated.View>
              <Text style={styles.loadingTitle}>CheckFresh AI</Text>
              <Text style={styles.loadingSubtitle}>Loading EfficientNetV2B1 Model</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      { 
                        width: progressAnim.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                          extrapolate: 'clamp'
                        })
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{loadingProgress}%</Text>
              </View>
              
              <Text style={styles.loadingHint}>Preparing AI for fruit freshness detection</Text>
            </Animated.View>
          </View>
        );

      case 'camera':
      case 'predicting':
        return (
          <CameraComponent
            key={cameraKey}
            onPhotoTaken={handlePhotoTaken}
            isLoading={appState === 'predicting'}
          />
        );

      case 'result':
        return predictionResult && capturedImage ? (
          <PredictionResultComponent
            result={predictionResult}
            imageUri={capturedImage}
            onTakeAnother={handleTakeAnother}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Change to bright green so it's definitely visible
    paddingHorizontal: 40,
  },
  loadingContent: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight dark overlay to make content more visible
    padding: 20,
    borderRadius: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // White background for visibility
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#FFFFFF', // White border
  },
  logoEmoji: {
    fontSize: 50,
  },
  loadingTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text on green background
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#FFFFFF', // White text
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.9,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF', // White progress bar on green background
    borderRadius: 3,
  },
  progressText: {
    color: '#FFFFFF', // White text on green background
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingHint: {
    fontSize: 14,
    color: '#FFFFFF', // White text
    textAlign: 'center',
    opacity: 0.9,
    fontStyle: 'italic',
  },
  loadingDots: {
    fontSize: 24,
    color: '#4CAF50',
  },
});
