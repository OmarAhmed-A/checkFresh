import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <IconSymbol
            size={90}
            color="#4CAF50"
            name="brain.head.profile"
            style={styles.headerIcon}
          />
          <View style={styles.sparkles}>
            <IconSymbol size={20} color="#FFD700" name="sparkles" style={styles.sparkle1} />
            <IconSymbol size={16} color="#FFD700" name="sparkles" style={styles.sparkle2} />
            <IconSymbol size={18} color="#FFD700" name="sparkles" style={styles.sparkle3} />
          </View>
        </View>
        <ThemedText type="title" style={styles.title}>CheckFresh AI</ThemedText>
        <ThemedText style={styles.subtitle}>Powered by EfficientNetV2B1</ThemedText>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNumber}>98.6%</ThemedText>
            <ThemedText style={styles.statLabel}>Accuracy</ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNumber}>6</ThemedText>
            <ThemedText style={styles.statLabel}>Classes</ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNumber}>13K+</ThemedText>
            <ThemedText style={styles.statLabel}>Training Images</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.content}>
        <Collapsible title="🚀 Advanced AI Model">
          <ThemedText>
            This app uses <ThemedText type="defaultSemiBold">EfficientNetV2B1</ThemedText>, a state-of-the-art 
            convolutional neural network optimized for both accuracy and efficiency.
          </ThemedText>
          <ThemedText style={styles.spacing}>
            <ThemedText type="defaultSemiBold">Key Features:</ThemedText>
          </ThemedText>
          <ThemedText>• ⚡ Advanced transfer learning from ImageNet</ThemedText>
          <ThemedText>• 🎯 98.6% classification accuracy</ThemedText>
          <ThemedText>• 📱 Optimized for mobile inference</ThemedText>
          <ThemedText>• 🔄 Real-time data augmentation</ThemedText>
          <ThemedText style={styles.spacing}>
            <ThemedText type="defaultSemiBold">Supported Fruits:</ThemedText>
          </ThemedText>
          <View style={styles.fruitGrid}>
            <View style={styles.fruitItem}>
              <ThemedText style={styles.fruitEmoji}>🍎</ThemedText>
              <ThemedText style={styles.fruitName}>Apples</ThemedText>
            </View>
            <View style={styles.fruitItem}>
              <ThemedText style={styles.fruitEmoji}>🍌</ThemedText>
              <ThemedText style={styles.fruitName}>Bananas</ThemedText>
            </View>
            <View style={styles.fruitItem}>
              <ThemedText style={styles.fruitEmoji}>🍊</ThemedText>
              <ThemedText style={styles.fruitName}>Oranges</ThemedText>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="🔬 How It Works">
          <View style={styles.processContainer}>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>1</ThemedText>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Capture Image</ThemedText>
                <ThemedText style={styles.stepDescription}>Take a photo using the built-in camera</ThemedText>
              </View>
            </View>
            
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>2</ThemedText>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Preprocess</ThemedText>
                <ThemedText style={styles.stepDescription}>Resize to 240×240 and normalize pixel values</ThemedText>
              </View>
            </View>
            
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>3</ThemedText>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>AI Analysis</ThemedText>
                <ThemedText style={styles.stepDescription}>EfficientNetV2B1 analyzes visual patterns</ThemedText>
              </View>
            </View>
            
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>4</ThemedText>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Results</ThemedText>
                <ThemedText style={styles.stepDescription}>Get freshness prediction with confidence score</ThemedText>
              </View>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="📸 Photography Tips">
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <IconSymbol size={24} color="#4CAF50" name="sun.max.fill" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Optimal Lighting</ThemedText>
                <ThemedText style={styles.tipDescription}>Use natural daylight or bright indoor lighting</ThemedText>
              </View>
            </View>
            
            <View style={styles.tipItem}>
              <IconSymbol size={24} color="#2196F3" name="camera.macro" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Clear Focus</ThemedText>
                <ThemedText style={styles.tipDescription}>Keep fruit in sharp focus, avoid blurry images</ThemedText>
              </View>
            </View>
            
            <View style={styles.tipItem}>
              <IconSymbol size={24} color="#FF9800" name="viewfinder" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Frame Properly</ThemedText>
                <ThemedText style={styles.tipDescription}>Center the fruit, fill most of the frame</ThemedText>
              </View>
            </View>
            
            <View style={styles.tipItem}>
              <IconSymbol size={24} color="#9C27B0" name="circle.fill" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Single Fruit</ThemedText>
                <ThemedText style={styles.tipDescription}>Focus on one piece of fruit at a time</ThemedText>
              </View>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="⚡ Technical Specifications">
          <View style={styles.techGrid}>
            <View style={styles.techCard}>
              <IconSymbol size={24} color="#4CAF50" name="cpu" />
              <ThemedText style={styles.techTitle}>Architecture</ThemedText>
              <ThemedText style={styles.techValue}>EfficientNetV2B1</ThemedText>
              <ThemedText style={styles.techSubtext}>Transfer Learning</ThemedText>
            </View>
            
            <View style={styles.techCard}>
              <IconSymbol size={24} color="#2196F3" name="photo" />
              <ThemedText style={styles.techTitle}>Input Size</ThemedText>
              <ThemedText style={styles.techValue}>240×240×3</ThemedText>
              <ThemedText style={styles.techSubtext}>RGB Images</ThemedText>
            </View>
            
            <View style={styles.techCard}>
              <IconSymbol size={24} color="#FF9800" name="chart.bar.fill" />
              <ThemedText style={styles.techTitle}>Training Data</ThemedText>
              <ThemedText style={styles.techValue}>13,599</ThemedText>
              <ThemedText style={styles.techSubtext}>Images Total</ThemedText>
            </View>
            
            <View style={styles.techCard}>
              <IconSymbol size={24} color="#9C27B0" name="gear" />
              <ThemedText style={styles.techTitle}>Framework</ThemedText>
              <ThemedText style={styles.techValue}>TensorFlow.js</ThemedText>
              <ThemedText style={styles.techSubtext}>Local Inference</ThemedText>
            </View>
          </View>
          
          <View style={styles.dataBreakdown}>
            <ThemedText type="defaultSemiBold" style={styles.dataTitle}>Training Dataset Breakdown:</ThemedText>
            <View style={styles.dataStats}>
              <View style={styles.dataRow}>
                <ThemedText>🍎 Fresh Apples:</ThemedText>
                <ThemedText type="defaultSemiBold">1,693 images</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText>🍌 Fresh Bananas:</ThemedText>
                <ThemedText type="defaultSemiBold">1,581 images</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText>🍊 Fresh Oranges:</ThemedText>
                <ThemedText type="defaultSemiBold">1,466 images</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText>🍎 Rotten Apples:</ThemedText>
                <ThemedText type="defaultSemiBold">2,342 images</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText>🍌 Rotten Bananas:</ThemedText>
                <ThemedText type="defaultSemiBold">2,224 images</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText>🍊 Rotten Oranges:</ThemedText>
                <ThemedText type="defaultSemiBold">1,595 images</ThemedText>
              </View>
            </View>
          </View>
        </Collapsible>

        <ThemedView style={styles.footer}>
          <View style={styles.footerIconContainer}>
            <IconSymbol size={24} color="#FF6B6B" name="heart.fill" />
            <IconSymbol size={20} color="#4ECDC4" name="sparkles" style={styles.footerSparkle} />
          </View>
          <ThemedText style={styles.footerText}>
            Developed with ❤️ using React Native & TensorFlow.js
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Empowering food waste reduction through AI
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
       

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  headerIcon: {
    marginBottom: 15,
  },
  sparkles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle1: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 5,
    left: -15,
  },
  sparkle3: {
    position: 'absolute',
    top: 10,
    left: -20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  statLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  spacing: {
    marginTop: 8,
  },
  fruitGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  fruitItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  fruitEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  fruitName: {
    fontSize: 12,
    fontWeight: '600',
  },
  processContainer: {
    marginTop: 10,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  tipsContainer: {
    marginTop: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  techCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgb(0, 255, 8)',
  },
  techTitle: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
    color: '#444',
    fontWeight: '600',
  },
  techValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  techSubtext: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
    marginTop: 2,
  },
  dataBreakdown: {
    marginTop: 20,
    backgroundColor: 'rgba(110, 110, 110, 0.95)',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dataTitle: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  dataStats: {
    gap: 8,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
    paddingBottom: 20,
    borderRadius: 12,
  },
  footerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  footerSparkle: {
    marginLeft: 4,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  semiBoldText: {
    fontWeight: '600',
    color: '#222',
  },
  stepTitle: {
    fontWeight: '600',
    color: '#222',
    fontSize: 16,
  },
  tipTitle: {
    fontWeight: '600',
    color: '#222',
    fontSize: 16,
  },
  dataValue: {
    fontWeight: '600',
    color: '#222',
  },
});
