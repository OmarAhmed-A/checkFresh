# 🍎 CheckFresh AI - Smart Fruit Freshness Detection

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow.js" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br />

A cutting-edge React Native mobile application that leverages **EfficientNetV2B1** deep learning architecture to determine fruit freshness with **98.6% accuracy**. Simply point your camera at a fruit and get instant AI-powered freshness predictions!

## ✨ Features

- 🤖 **Advanced AI Model**: EfficientNetV2B1 with transfer learning
- 📱 **Real-time Camera**: Instant capture and analysis
- 🎯 **High Accuracy**: 98.6% precision on validation dataset
- 🔄 **Offline Capable**: No internet connection required
- 🍎🍌🍊 **Multi-fruit Support**: Apples, bananas, and oranges
- 📊 **Confidence Scores**: Detailed prediction confidence
- 🎨 **Modern UI**: Beautiful, intuitive interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or later)
- Bun package manager
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd checkFresh
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

## 🏗️ Architecture

### AI Model Specifications

| Specification | Value |
|---------------|-------|
| **Architecture** | EfficientNetV2B1 + Transfer Learning |
| **Input Size** | 240×240×3 RGB |
| **Output Classes** | 6 (3 fruits × 2 states) |
| **Accuracy** | 98.6% on validation set |
| **Training Images** | 13,599 total |
| **Framework** | TensorFlow.js |

### Dataset Breakdown

| Fruit Type | Fresh Images | Rotten Images | Total |
|------------|-------------|---------------|-------|
| 🍎 Apples | 1,693 | 2,342 | 4,035 |
| 🍌 Bananas | 1,581 | 2,224 | 3,805 |
| 🍊 Oranges | 1,466 | 1,595 | 3,061 |
| **Total** | **5,740** | **8,161** | **13,901** |

### Training Features

- ✅ **Data Augmentation**: Random flip, rotation, zoom, translation, contrast
- ✅ **Transfer Learning**: Pre-trained ImageNet weights
- ✅ **Optimization**: Adam optimizer with learning rate scheduling
- ✅ **Regularization**: Dropout layers for overfitting prevention

## 📱 App Structure

```
checkFresh/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx           # Main camera/prediction screen
│   │   ├── explore.tsx         # AI model information & tips
│   │   └── _layout.tsx         # Tab navigation layout
│   └── _layout.tsx             # Root layout
├── components/
│   ├── CameraComponent.tsx     # Camera capture functionality
│   ├── PredictionResultComponent.tsx  # Results display
│   ├── ThemedText.tsx          # Themed text components
│   └── ThemedView.tsx          # Themed view components
├── utils/
│   ├── modelUtils.ts           # TensorFlow.js model handling
│   └── imageUtils.ts           # Image preprocessing utilities
├── assets/
│   └── model/                  # TensorFlow.js model files
└── constants/
    └── Colors.ts               # App color scheme
```

## 🎯 Usage

1. **Launch the App**: Open CheckFresh AI on your device
2. **Point Camera**: Aim at a single piece of fruit
3. **Capture Photo**: Tap the camera button
4. **Get Results**: View freshness prediction with confidence score
5. **Learn More**: Check the "About AI" tab for model details and tips

## 🔬 Technical Implementation

### Model Pipeline

1. **Image Capture** → Camera API captures 240×240 image
2. **Preprocessing** → Normalization and tensor conversion
3. **AI Inference** → EfficientNetV2B1 processes image
4. **Classification** → Softmax output for 6 classes
5. **Results Display** → User-friendly prediction with confidence

### Performance Optimizations

- **Lazy Loading**: Model loads only when needed
- **Memory Management**: Efficient tensor disposal
- **Native Performance**: React Native optimizations
- **Background Processing**: Non-blocking AI inference

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| **Training Accuracy** | 98.5% |
| **Validation Accuracy** | 98.6.0% |
| **Inference Time** | <500ms |
| **Model Size** | ~15MB |
| **Memory Usage** | ~100MB |

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **AI/ML**: TensorFlow.js
- **Language**: TypeScript
- **Camera**: expo-camera
- **Navigation**: expo-router
- **Styling**: StyleSheet API
- **Package Manager**: Bun

## 📸 Photography Tips

For best results when scanning fruits:

- 🌞 **Good Lighting**: Use natural daylight or bright indoor lighting
- 🎯 **Clear Focus**: Keep fruit in sharp focus
- 📏 **Proper Distance**: Fill 60-80% of the frame
- 🍎 **Single Fruit**: Focus on one piece at a time
- 🔄 **Multiple Angles**: Try different orientations if needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TensorFlow.js Team** for the amazing ML framework
- **Expo Team** for the excellent development platform
- **React Native Community** for continuous innovation
- **EfficientNet Authors** for the state-of-the-art architecture

---

<div align="center">
  <p><strong>Built with ❤️ for reducing food waste through AI</strong></p>
  <p>🌱 <em>Every fresh fruit detected helps reduce food waste!</em> 🌱</p>
</div>
