import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <IconSymbol
          size={80}
          color="#4CAF50"
          name="brain.head.profile"
          style={styles.headerIcon}
        />
        <ThemedText type="title" style={styles.title}>CheckFresh AI</ThemedText>
        <ThemedText style={styles.subtitle}>Powered by Deep Learning</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <Collapsible title="🍎 About the AI Model">
          <ThemedText>
            This app uses a <ThemedText type="defaultSemiBold">VGG16-based neural network</ThemedText> trained 
            to classify fruit freshness with <ThemedText type="defaultSemiBold">96.8% accuracy</ThemedText>.
          </ThemedText>
          <ThemedText style={styles.spacing}>
            The model can detect freshness in:
          </ThemedText>
          <ThemedText>• 🍎 Apples</ThemedText>
          <ThemedText>• 🍌 Bananas</ThemedText>
          <ThemedText>• 🍊 Oranges</ThemedText>
        </Collapsible>

        <Collapsible title="🔬 How It Works">
          <ThemedText>
            1. <ThemedText type="defaultSemiBold">Capture:</ThemedText> Take a photo of your fruit
          </ThemedText>
          <ThemedText>
            2. <ThemedText type="defaultSemiBold">Process:</ThemedText> AI analyzes the image for signs of freshness
          </ThemedText>
          <ThemedText>
            3. <ThemedText type="defaultSemiBold">Predict:</ThemedText> Get instant results with confidence scores
          </ThemedText>
          <ThemedText style={styles.spacing}>
            The model was trained on thousands of fruit images to recognize patterns 
            associated with fresh vs. rotten produce.
          </ThemedText>
        </Collapsible>

        <Collapsible title="📷 Tips for Best Results">
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Good lighting:</ThemedText> Use natural light when possible
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Clear view:</ThemedText> Keep the fruit clearly visible and in focus
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Single fruit:</ThemedText> Focus on one piece of fruit at a time
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Close distance:</ThemedText> Get reasonably close to the fruit
          </ThemedText>
        </Collapsible>

        <Collapsible title="⚡ Technical Details">
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Architecture:</ThemedText> VGG16 + Transfer Learning
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Input Size:</ThemedText> 240x240 pixels
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Classes:</ThemedText> 6 (3 fruits × 2 states)
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Framework:</ThemedText> TensorFlow.js
          </ThemedText>
          <ThemedText>
            • <ThemedText type="defaultSemiBold">Runs locally:</ThemedText> No internet connection required
          </ThemedText>
        </Collapsible>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Developed with ❤️ using React Native & TensorFlow.js
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
  },
  headerIcon: {
    marginBottom: 15,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  spacing: {
    marginTop: 8,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
