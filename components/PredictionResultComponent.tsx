import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PredictionResult } from '../utils/modelUtils';

interface PredictionResultComponentProps {
  result: PredictionResult;
  imageUri: string;
  onTakeAnother: () => void;
}

export default function PredictionResultComponent({ 
  result, 
  imageUri, 
  onTakeAnother 
}: PredictionResultComponentProps) {
  
  const getFreshnessBadge = () => {
    if (result.isFresh) {
      return {
        text: 'FRESH',
        color: '#4CAF50',
        icon: 'checkmark-circle' as const,
      };
    } else {
      return {
        text: 'ROTTEN',
        color: '#F44336',
        icon: 'close-circle' as const,
      };
    }
  };

  const getFruitEmoji = (fruitType: string) => {
    switch (fruitType.toLowerCase()) {
      case 'apples':
      case 'apple':
        return '🍎';
      case 'banana':
      case 'bananas':
        return '🍌';
      case 'oranges':
      case 'orange':
        return '🍊';
      default:
        return '🍓';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return '#4CAF50';
    if (confidence >= 0.6) return '#FF9800';
    return '#F44336';
  };

  const badge = getFreshnessBadge();

  return (
    <View style={styles.container}>
      {/* Result Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Analysis Complete</Text>
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={[styles.badge, { backgroundColor: badge.color }]}>
          <Ionicons name={badge.icon} size={20} color="white" />
          <Text style={styles.badgeText}>{badge.text}</Text>
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <View style={styles.fruitInfo}>
          <Text style={styles.fruitEmoji}>{getFruitEmoji(result.fruitType)}</Text>
          <Text style={styles.fruitType}>
            {result.fruitType.charAt(0).toUpperCase() + result.fruitType.slice(1)}
          </Text>
        </View>

        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Confidence</Text>
          <Text style={[
            styles.confidenceValue, 
            { color: getConfidenceColor(result.confidence) }
          ]}>
            {Math.round(result.confidence * 100)}%
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={[styles.statusValue, { color: badge.color }]}>
            {result.isFresh ? 'Good to eat!' : 'Consider discarding'}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.takeAnotherButton} onPress={onTakeAnother}>
          <Ionicons name="camera" size={20} color="white" />
          <Text style={styles.takeAnotherText}>Take Another Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ECEDEE',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#333',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: '50%',
    transform: [{ translateX: 50 }],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 12,
  },  resultsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#333',
  },
  fruitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  fruitEmoji: {
    fontSize: 32,
    marginRight: 12,
  },  fruitType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ECEDEE',
  },  confidenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  confidenceLabel: {
    fontSize: 16,
    color: '#9BA1A6',
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  statusLabel: {
    fontSize: 16,
    color: '#9BA1A6',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    alignItems: 'center',
  },  takeAnotherButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  takeAnotherText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
