# CheckFresh AI - Fruit Freshness Detection App

A React Native mobile application powered by TensorFlow.js that uses AI to determine if fruits are fresh or rotten.

## 🚀 Features

- **AI-Powered Detection**: Uses EfficientNetV2B1 neural network with 97% accuracy
- **Real-time Camera**: Take photos directly within the app
- **Instant Results**: Get immediate freshness predictions with confidence scores
- **Offline Capability**: Runs completely locally without internet connection
- **Multi-fruit Support**: Detects freshness in apples, bananas, and oranges

## 📱 Screenshots

*Screenshots will be added once the app is running*

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **AI/ML**: TensorFlow.js
- **Camera**: expo-camera
- **Navigation**: expo-router
- **Language**: TypeScript
- **Package Manager**: Bun

## 🏗️ Architecture

### Model Details
- **Base Architecture**: EfficientNetV2B1 with Transfer Learning
- **Input Size**: 240×240×3 RGB images
- **Output Classes**: 6 (freshapples, freshbanana, freshoranges, rottenapples, rottenbanana, rottenoranges)
- **Accuracy**: 97% on validation set
- **Training Data**: 13,599 total images (10,901 training + 2,698 validation)
- **Data Augmentation**: Random flip, rotation, zoom, translation, and contrast adjustment

### Training Dataset Breakdown
- **Fresh Apples**: 1,693 images
- **Fresh Bananas**: 1,581 images  
- **Fresh Oranges**: 1,466 images
- **Rotten Apples**: 2,342 images
- **Rotten Bananas**: 2,224 images
- **Rotten Oranges**: 1,595 images

### App Structure
```
app/
├── (tabs)/
│   ├── index.tsx          # Main camera/prediction screen
│   ├── explore.tsx        # Model info and tips
│   └── _layout.tsx        # Tab navigation
components/
├── CameraComponent.tsx    # Camera capture functionality
├── PredictionResultComponent.tsx  # Results display
utils/
├── modelUtils.ts         # TensorFlow.js model handling
└── imageUtils.ts         # Image preprocessing
assets/
└── model/               # TensorFlow.js model files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun package manager
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone and navigate to the project**
   ```bash
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

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

## 📋 Current Status - MVP

### ✅ Completed Features
- [x] App structure and navigation
- [x] Camera integration with permissions
- [x] TensorFlow.js setup and model loading utilities
- [x] Mock prediction system for testing UI flow
- [x] Results display with confidence scores
- [x] Model information screen
- [x] Basic error handling
- [x] Loading states

### 🔄 Next Steps (Post-MVP)
- [ ] Implement actual image preprocessing
- [ ] Connect real model predictions
- [ ] Add image gallery/history
- [ ] Implement better error handling
- [ ] Add animations and transitions
- [ ] Performance optimizations
- [ ] Add more fruits support
- [ ] Batch processing capability

## 🎯 How to Use

1. **Launch the app** - The AI model loads automatically
2. **Grant camera permissions** when prompted
3. **Point camera at a fruit** (apple, banana, or orange)
4. **Tap the capture button** to take a photo
5. **Wait for analysis** (2-3 seconds)
6. **View results** showing freshness status and confidence
7. **Take another photo** or check the About tab for tips

## 📷 Tips for Best Results

- **Good lighting**: Use natural light when possible
- **Clear view**: Keep the fruit clearly visible and in focus
- **Single fruit**: Focus on one piece of fruit at a time
- **Close distance**: Get reasonably close to the fruit
- **Stable shot**: Hold the camera steady while capturing

## 🧠 Model Information

The AI model was trained using:
- **Training Data**: 1,182 images across 6 classes
- **Validation Data**: 329 images for testing
- **Preprocessing**: Images resized to 224x224, normalized to [0,1]
- **Augmentation**: Rotation, zoom, shift, and flip transformations
- **Training**: 5 epochs with early stopping

## 🔧 Development

### Adding New Features
1. Check the `.copilot-instructions.md` for development guidelines
2. Follow the roadmap in `ROADMAP.md`
3. Use TypeScript for all new code
4. Add proper error handling
5. Test on both iOS and Android

### Debugging
- Use `bun run start` to start the development server
- Use React Native debugger for debugging
- Check console logs for TensorFlow.js model loading

## 📄 License

This project is part of a neural networks course project.

## 🤝 Contributing

This is an educational project. Improvements and suggestions are welcome!

---

**Note**: This is currently an MVP with mock predictions. The actual model integration is the next development phase.
