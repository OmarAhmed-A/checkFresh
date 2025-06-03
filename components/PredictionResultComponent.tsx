import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PredictionResult } from '../utils/modelUtils';
import { Collapsible } from './Collapsible';

// Silence the Text component warning
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

// Also silence console warnings and errors
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  if (args[0] && args[0].includes('Text strings must be rendered within a <Text> component')) {
    return;
  }
  originalWarn(...args);
};

console.error = (...args) => {
  if (args[0] && args[0].includes('Text strings must be rendered within a <Text> component')) {
    return;
  }
  originalError(...args);
};

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

  const getScoreColor = (score: number, isTopPrediction: boolean) => {
    if (isTopPrediction) return '#4CAF50';
    if (score >= 0.15) return '#FF9800';
    if (score >= 0.05) return '#2196F3';
    return '#666';
  };
  const formatClassName = (className: string) => {
    const isFresh = className.startsWith('fresh');
    const fruitType = className.replace('fresh', '').replace('rotten', '');
    const status = isFresh ? 'Fresh' : 'Rotten';
    const fruit = fruitType.charAt(0).toUpperCase() + fruitType.slice(1);
    return status + ' ' + fruit;
  };

  const getClassEmoji = (className: string) => {
    const fruitType = className.replace('fresh', '').replace('rotten', '');
    const isFresh = className.startsWith('fresh');
    
    let baseEmoji = '🍓'; // default
    switch (fruitType.toLowerCase()) {
      case 'apples':
      case 'apple':
        baseEmoji = '🍎';
        break;
      case 'banana':
      case 'bananas':
        baseEmoji = '🍌';
        break;
      case 'oranges':
      case 'orange':
        baseEmoji = '🍊';
        break;
    }
    
    return isFresh ? baseEmoji : '🤢';
  };

  const badge = getFreshnessBadge();
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
     
      <View style={styles.header}>
        <Text style={styles.title}>Analysis Complete</Text>
      </View>

      
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={[styles.badge, { backgroundColor: badge.color }]}>
          <Ionicons name={badge.icon} size={20} color="white" />
          <Text style={styles.badgeText}>{badge.text}</Text>
        </View>
      </View>

      <View style={styles.resultsContainer}>        <View style={styles.fruitInfo}>
          <Text style={styles.fruitEmoji}>{getFruitEmoji(result.fruitType || '')}</Text>
          <Text style={styles.fruitType}>
            {(result.fruitType || 'unknown').charAt(0).toUpperCase() + (result.fruitType || 'unknown').slice(1)}
          </Text>
        </View>

        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Confidence</Text>
          <Text style={[
            styles.confidenceValue, 
            { color: getConfidenceColor(result.confidence || 0) }
          ]}>
            {Math.round((result.confidence || 0) * 100)}%
          </Text>
        </View>        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={[styles.statusValue, { color: badge.color }]}>
            {result.isFresh ? 'Good to eat!' : 'Consider discarding'}
          </Text>
        </View>
      </View>      {result.rawScores ? (
        <View style={styles.advancedContainer}>
          <Collapsible title="🔬 Advanced Analysis">
            <View style={styles.rawScoresContainer}>
              <Text style={styles.sectionTitle}>Raw Prediction Scores</Text>
              <Text style={styles.sectionDescription}>
                Confidence scores for each class detected by the AI model
              </Text>
                <View style={styles.scoresGrid}>
                {result.rawScores ? Object.entries(result.rawScores)
                  .filter(([className, score]) => typeof className === 'string' && typeof score === 'number')
                  .sort(([,a], [,b]) => (b || 0) - (a || 0))
                  .map(([className, score]) => {
                    const displayName = formatClassName(className);
                    const isTopPrediction = className === result.className;
                    const percentage = Math.round((score || 0) * 100);
                    
                    return (
                      <View 
                        key={className} 
                        style={[
                          styles.scoreItem, 
                          isTopPrediction && styles.topPrediction
                        ]}
                      ><View style={styles.scoreHeader}>
                          <Text style={styles.scoreEmoji}>
                            {getClassEmoji(className) || '🍓'}
                          </Text>                          <Text style={[
                            styles.scoreName,
                            isTopPrediction && styles.topPredictionText
                          ]}>
                            {displayName || 'Unknown'}
                          </Text>
                          {isTopPrediction ? (
                            <View style={styles.topBadge}>
                              <Text style={styles.topBadgeText}>TOP</Text>
                            </View>
                          ) : null}
                        </View><View style={styles.scoreBar}>
                          <View 
                            style={[
                              styles.scoreProgress, 
                              { 
                                width: `${percentage}%` as any,
                                backgroundColor: getScoreColor(score, isTopPrediction)
                              }
                            ]} 
                          />
                        </View>
                        
                        <Text style={[
                          styles.scorePercentage,
                          isTopPrediction && styles.topPredictionText
                        ]}>
                          {percentage}%
                        </Text>                      </View>
                    );
                  }) : null}
              </View>
                <View style={styles.modelInfo}>
                <Text style={styles.modelInfoTitle}>Model Information</Text>
                <View style={styles.modelInfoItem}>
                  <Text style={styles.modelInfoBullet}>•</Text>
                  <Text style={styles.modelInfoText}>Architecture: EfficientNetV2B1</Text>
                </View>
                <View style={styles.modelInfoItem}>
                  <Text style={styles.modelInfoBullet}>•</Text>
                  <Text style={styles.modelInfoText}>Classes: 6 (3 fresh + 3 rotten fruits)</Text>
                </View>
                <View style={styles.modelInfoItem}>
                  <Text style={styles.modelInfoBullet}>•</Text>
                  <Text style={styles.modelInfoText}>Training Data: 13,599 images</Text>
                </View>
              </View>
            </View>          </Collapsible>
        </View>
      ) : null}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.takeAnotherButton} onPress={onTakeAnother}>
          <Ionicons name="camera" size={20} color="white" />
          <Text style={styles.takeAnotherText}>Take Another Photo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
  },  takeAnotherText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  advancedContainer: {
    marginBottom: 20,
  },
  rawScoresContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ECEDEE',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9BA1A6',
    marginBottom: 20,
    lineHeight: 20,
  },
  scoresGrid: {
    gap: 12,
  },
  scoreItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  topPrediction: {
    borderColor: '#4CAF50',
    backgroundColor: '#1a2e1a',
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  scoreName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ECEDEE',
    flex: 1,
  },
  topPredictionText: {
    color: '#4CAF50',
  },
  topBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  topBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scoreBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  scoreProgress: {
    height: '100%',
    borderRadius: 3,
  },
  scorePercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ECEDEE',
    textAlign: 'right',
  },
  modelInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  modelInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ECEDEE',
    marginBottom: 8,
  },  modelInfoText: {
    fontSize: 14,
    color: '#9BA1A6',
    flex: 1,
  },
  modelInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  modelInfoBullet: {
    fontSize: 14,
    color: '#9BA1A6',
    marginRight: 8,
    width: 12,
  },
});
