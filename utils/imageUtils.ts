import * as tf from '@tensorflow/tfjs';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

/**
 * Preprocesses an image for the fruit freshness model
 * @param imageUri URI of the image to preprocess
 * @returns Promise<tf.Tensor> A tensor ready for model prediction
 */
export async function preprocessImage(imageUri: string): Promise<tf.Tensor> {
  try {
    console.log('Preprocessing image:', imageUri);
    
    // Use expo-image-manipulator to resize the image to 224x224
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 224, height: 224 } }],
      { 
        format: ImageManipulator.SaveFormat.JPEG, 
        compress: 1.0,
        base64: true 
      }
    );
    
    if (!manipulatedImage.base64) {
      throw new Error('Failed to get base64 data from image');
    }
    
    // Convert base64 to tensor
    const tensor = await base64ToTensor(manipulatedImage.base64);
    
    // Normalize pixel values to [0, 1] and expand dimensions for batch
    const normalizedTensor = tensor.div(255.0).expandDims(0);
    
    console.log('Preprocessed tensor shape:', normalizedTensor.shape);
    return normalizedTensor;
    
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw new Error('Failed to preprocess image');
  }
}

  /**
   * Converts an image URI to a normalized tensor
   */
  private async imageToTensor(imageUri: string): Promise<tf.Tensor> {
    return new Promise((resolve, reject) => {
      try {
        // Create an image element (works for web, for mobile we'll need different approach)
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          // Create canvas and draw image
          const canvas = document.createElement('canvas');
          canvas.width = 224;
          canvas.height = 224;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, 224, 224);
          
          // Get image data and convert to tensor
          const imageData = ctx.getImageData(0, 0, 224, 224);
          const tensor = tf.tidy(() => {
            // Convert to tensor and normalize
            const imageTensor = tf.browser.fromPixels(imageData, 3);
            const resized = tf.cast(imageTensor, 'float32');
            const normalized = tf.div(resized, 255.0);
            return tf.expandDims(normalized, 0);
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
  }

  /**
   * Alternative method for React Native (mobile platforms)
   * This will be used when tf.browser.fromPixels is not available
   */
  async imageToTensorMobile(imageUri: string): Promise<tf.Tensor> {
    // TODO: Implement mobile-specific image to tensor conversion
    // This might involve using expo-gl or react-native-fs
    // For now, return a placeholder
    return tf.randomNormal([1, 224, 224, 3]);
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
