import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, StatusBar, Text } from 'react-native';
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

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize TensorFlow.js
      await tf.ready();
      console.log('TensorFlow.js initialized');
      
      // Load the model
      await modelService.loadModel();
      console.log('Model loaded successfully');
      
      setAppState('camera');
    } catch (error) {
      console.error('Failed to initialize app:', error);
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
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <Text style={styles.loadingTitle}>CheckFresh AI</Text>
              <Text style={styles.loadingSubtitle}>Loading AI Model...</Text>
              <Text style={styles.loadingDots}>●●●</Text>
            </View>
          </View>
        );

      case 'camera':
      case 'predicting':
        return (
          <CameraComponent
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
    backgroundColor: '#000',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  loadingDots: {
    fontSize: 24,
    color: '#4CAF50',
  },
});
