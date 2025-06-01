import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

interface CameraComponentProps {
  onPhotoTaken: (uri: string) => void;
  isLoading?: boolean;
}

export default function CameraComponent({ onPhotoTaken, isLoading = false }: CameraComponentProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isLoading) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
        });
        
        if (photo && photo.uri) {
          onPhotoTaken(photo.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          {/* Camera controls */}
          <View style={styles.topControls}>
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={toggleCameraFacing}
              disabled={isLoading}
            >
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Point camera at a fruit and tap capture
            </Text>
          </View>

          {/* Capture button */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={[styles.captureButton, isLoading && styles.captureButtonDisabled]}
              onPress={takePicture}
              disabled={isLoading}
            >
              <View style={[styles.captureButtonInner, isLoading && styles.captureButtonInnerDisabled]}>
                {isLoading ? (
                  <Text style={styles.loadingText}>...</Text>
                ) : (
                  <Ionicons name="camera" size={32} color="white" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 60, // Account for status bar
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 12,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 8,
  },
  bottomControls: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  captureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
    padding: 4,
  },
  captureButtonDisabled: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },
  captureButtonInner: {
    backgroundColor: '#FF6B6B',
    borderRadius: 46,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInnerDisabled: {
    backgroundColor: '#888',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
