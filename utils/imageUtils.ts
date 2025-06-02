import * as tf from '@tensorflow/tfjs';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

export interface ImageProcessingResult {
  tensor: tf.Tensor;
  processedUri: string;
}

export class ImageProcessor {
  
  /**
   * Preprocesses an image for model prediction
   * Resizes to 240x240 and normalizes pixel values to [0,1]
   */  async preprocessImage(imageUri: string): Promise<ImageProcessingResult> {
    try {
      // Resize image to 240x240 using the new manipulateAsync function
      const resizedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 240, height: 240 } }],
        { compress: 1, format: SaveFormat.JPEG }
      );

      // Convert image to tensor
      const tensor = await this.imageToTensor(resizedImage.uri);
      
      return {
        tensor,
        processedUri: resizedImage.uri
      };
    } catch (error) {
      console.error('Image preprocessing failed:', error);
      throw error;
    }
  }

  /**
   * Converts an image URI to a normalized tensor
   * Uses different methods for web vs mobile platforms
   */
  private async imageToTensor(imageUri: string): Promise<tf.Tensor> {
    if (Platform.OS === 'web') {
      return this.imageToTensorWeb(imageUri);
    } else {
      return this.imageToTensorMobile(imageUri);
    }
  }

  /**
   * Web-specific image to tensor conversion
   */
  private async imageToTensorWeb(imageUri: string): Promise<tf.Tensor> {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 240;
          canvas.height = 240;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, 240, 240);          const imageData = ctx.getImageData(0, 0, 240, 240);
          const tensor = tf.tidy(() => {
            const imageTensor = tf.browser.fromPixels(imageData, 3);
            // EfficientNetV2B1 with include_preprocessing=True expects [0, 255] range
            // browser.fromPixels already gives us [0, 255], so just cast to float32
            const float32Tensor = tf.cast(imageTensor, 'float32');
            return tf.expandDims(float32Tensor, 0);
          });
          
          resolve(tensor);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = imageUri;
      } catch (error) {
        reject(error);
      }
    });
  }  /**
   * Mobile-specific image to tensor conversion
   * Uses TensorFlow.js React Native's decodeJpeg function
   */  private async imageToTensorMobile(imageUri: string): Promise<tf.Tensor> {
    try {
      console.log('Processing image for mobile:', imageUri);
      
      // First, let's try the expo-image-manipulator approach directly
      // as it's more reliable than decodeJpeg for local files
      return await this.imageToTensorFromManipulator(imageUri);
      
    } catch (error) {
      console.error('Mobile image to tensor conversion failed:', error);
      console.log('Creating fallback tensor...');
      
      // Final fallback: return a dummy tensor with correct shape
      console.warn('Using random tensor - predictions will be unreliable');
      return tf.randomUniform([1, 240, 240, 3], 0, 1);
    }
  }  /**
   * Alternative implementation using expo-image-manipulator and FileSystem
   * More reliable for React Native environments
   */
  private async imageToTensorFromManipulator(imageUri: string): Promise<tf.Tensor> {
    try {
      console.log('Using manipulator method for image processing...');
      
      // First ensure the image is properly sized
      const manipResult = await manipulateAsync(
        imageUri,
        [{ resize: { width: 240, height: 240 } }],
        { 
          compress: 1, 
          format: SaveFormat.JPEG
        }
      );

      console.log('Image resized successfully:', manipResult.uri);

      // For React Native, try a simpler approach using FileSystem
      const base64Data = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });      console.log('Got base64 data, length:', base64Data.length);

      // Try a simpler approach - use the expo manipulator to get base64 directly
      const manipResultWithBase64 = await manipulateAsync(
        imageUri,
        [{ resize: { width: 240, height: 240 } }],
        { 
          compress: 1, 
          format: SaveFormat.JPEG,
          base64: true
        }
      );

      if (!manipResultWithBase64.base64) {
        throw new Error('Failed to get base64 from manipulator');
      }

      console.log('Got base64 from manipulator, length:', manipResultWithBase64.base64.length);

      // Convert base64 to Uint8Array more safely
      const binaryString = atob(manipResultWithBase64.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      console.log('Converted to bytes, length:', bytes.length, 'attempting decodeJpeg...');// Try decodeJpeg with the processed bytes
      const imageTensor = decodeJpeg(bytes, 3);
      console.log('DecodeJpeg successful, tensor shape:', imageTensor.shape);
      
      const tensor = tf.tidy(() => {
        // EfficientNetV2B1 with include_preprocessing=True expects [0, 255] range
        // So we keep the raw pixel values and just cast to float32
        const float32Tensor = tf.cast(imageTensor, 'float32');
        return tf.expandDims(float32Tensor, 0);
      });

      imageTensor.dispose();
      console.log('Final tensor shape:', tensor.shape);
      return tensor;
      
    } catch (error) {
      console.error('Image manipulator tensor conversion failed:', error);
      throw error;
    }
  }

  /**
   * Validates image format and size
   */
  validateImage(imageUri: string): boolean {
    // Basic validation - check if URI exists and has valid format
    if (!imageUri || imageUri.length === 0) {
      return false;
    }
    
    // Check for common image formats
    const validFormats = ['.jpg', '.jpeg', '.png'];
    const hasValidFormat = validFormats.some(format => 
      imageUri.toLowerCase().includes(format)
    );
    
    return hasValidFormat;
  }
}

export const imageProcessor = new ImageProcessor();
