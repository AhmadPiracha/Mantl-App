# 🧠 Mantl – Mental Fitness for Men

**Mantl** is a mobile-first emotional fitness app crafted specifically for men. It offers a masculine, minimal, dark-mode interface that promotes structured self-reflection and emotional tracking through action-based mental health tools.

---

## 🚀 Features

* 🎯 **Mode-Based Navigation** — Unique flows: Vent, Unload, Forge, and Locker Room
* 🧩 **BroScore System** — Gamified mental wellness metrics
* 🔥 **Mood Streaks** — Rewarding consistency in self-check-ins
* 🏅 **Badge System** — Earnable milestones for progress and engagement
* 🌙 **Dark Theme** — Focused, distraction-free UI with masculine tone
* 💾 **Offline-First** — Local data storage via AsyncStorage
* ☁️ **Firebase Integration** — Cloud sync and authentication ready

---

## 🛠️ Tech Stack

* **React Native** with [Expo](https://expo.dev/)
* **Expo Router** for file-based routing
* **AsyncStorage** for local persistence
* **Context API** for global state management
* **Firebase** for authentication and cloud storage
* **NetInfo** for network monitoring

---

## 📁 Project Structure

```
mantl-app/
├── app/                      # Screens & routes (via Expo Router)
│   ├── index.js              # Home screen with mode switcher
│   ├── onboarding.js         # First-time user experience
│   ├── create-post.js        # Post creation with mode-specific prompts
│   ├── mood-check.js         # Mood tracking interface
│   ├── analytics.js          # Progress visualization
│   ├── vent/index.js         # Vent mode feed
│   ├── unload/index.js       # Unload mode feed
│   ├── forge/index.js        # Forge mode feed
│   ├── locker/index.js       # Locker Room feed
│   ├── profile/index.js      # User profile & stats
│   └── settings/index.js     # App settings & sync
├── components/               # Reusable UI components
│   ├── PostCard.js           # Feed card UI
│   ├── Header.js             # Top bar/header for screens
│   └── LoadingScreen.js      # Custom loading visuals
├── constants/                # Static values and enums
│   ├── theme.js              # Color palette and dark-mode logic
│   ├── modes.js              # Mode definitions and metadata
│   └── badges.js             # Badge/achievement definitions
├── lib/                      # Helper libraries
│   ├── firebase.js           # Firebase integration layer
│   ├── storage.js            # Local storage utilities (AsyncStorage)
│   └── streaks.js            # Mood streak logic
├── context/                  # App-wide state providers
│   └── AppContext.js         # Auth, theme, and app state with Firebase sync
└── assets/                   # Static files: logos, icons, splash

```

---

## ⚙️ Setup Instructions

### Prerequisites
* Node.js (v16+)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* Expo Go app (for mobile testing)

### Getting Started

\`\`\`bash
git clone https://github.com/yourusername/mantl-app.git
cd mantl-app
npm install

# Install additional dependencies
npm install @react-native-netinfo/netinfo expo-splash-screen

# Start development server
npx expo start
\`\`\`

### Firebase Setup (Optional)
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Anonymous) and Firestore
3. Replace the config in `lib/firebase.js` with your project credentials
4. The app works offline-first, so Firebase is optional for testing

Then:
* Press `i` to open in iOS simulator (Mac only)
* Press `a` to open in Android emulator  
* Or scan the QR code with Expo Go

---

## 🧭 Development Status

### ✅ **COMPLETED - Phase 1: Core MVP**
- [x] **App Architecture** - Expo Router setup with tab navigation
- [x] **Onboarding Flow** - 5-step introduction for new users
- [x] **Mode-Based Navigation** - Vent, Unload, Forge, Locker Room feeds
- [x] **Post Creation** - Mode-specific prompts and character limits
- [x] **Mood Tracking** - 5-point mood scale with stress levels
- [x] **BroScore System** - Points for posts and mood check-ins
- [x] **Streak Tracking** - Daily mood tracking streaks
- [x] **Local Storage** - AsyncStorage for offline-first experience
- [x] **Dark Theme** - Consistent masculine UI design
- [x] **Profile Screen** - User stats and recent activity
- [x] **Analytics Dashboard** - Mood trends and usage insights
- [x] **Settings Screen** - App configuration and data management

### ✅ **COMPLETED - Phase 2: Firebase Integration**
- [x] **Firebase Authentication** - Anonymous auth with persistence
- [x] **Cloud Sync** - Automatic data synchronization
- [x] **Network Monitoring** - Online/offline state management
- [x] **Retry Logic** - Robust error handling for network issues
- [x] **Sync Status** - Visual indicators for data sync state

### 🔄 **IN PROGRESS - Polish & UX**
- [x] **Custom Splash Screen** - Branded loading experience
- [ ] **App Icons** - Custom icon set for all platforms
- [ ] **Loading States** - Skeleton screens and smooth transitions
- [ ] **Error Boundaries** - Graceful error handling
- [ ] **Performance Optimization** - Memory and render optimization

### 📋 **TODO - Phase 3: Enhanced Features**
- [ ] **Voice Memo Support** - Audio recording for posts
- [ ] **AI-Powered Prompts** - Smart journaling suggestions
- [ ] **Export Data** - PDF/CSV export functionality
- [ ] **Push Notifications** - Mood check reminders
- [ ] **Crisis Support** - Emergency resources and contacts
- [ ] **Habit Tracking** - Additional wellness metrics
- [ ] **Social Features** - Anonymous community support

### 🚀 **TODO - Phase 4: Production Ready**
- [ ] **Beta Testing** - TestFlight/Play Console testing
- [ ] **App Store Assets** - Screenshots, descriptions, metadata
- [ ] **Performance Testing** - Load testing and optimization
- [ ] **Security Audit** - Data protection and privacy compliance
- [ ] **Analytics Integration** - Usage tracking and insights
- [ ] **Crash Reporting** - Error monitoring and debugging
- [ ] **App Store Submission** - iOS App Store and Google Play

---

## 🎯 **Current Status: ~75% Complete**

**✅ What's Working:**
- Full offline-first experience with local data
- All 4 modes (Vent, Unload, Forge, Locker Room) functional
- Firebase cloud sync with automatic retry logic
- Comprehensive mood tracking and analytics
- Gamification with BroScore and streaks
- Professional onboarding experience
- Settings and data management

**🔧 What Needs Work:**
- Custom app icons and branding assets
- Voice recording functionality
- Push notifications for engagement
- Production-level error handling
- App store preparation and submission

---

## 🤝 Contributing

This is an early-stage project focused on men's mental health. If you're interested in contributing, collaborating, or supporting the vision, feel free to [open an issue](https://github.com/yourusername/mantl-app/issues) or contact me directly.

**Areas where help is needed:**
- UI/UX design and animations
- Mental health content and prompts
- Beta testing on various devices
- Marketing and community building

---

## 📜 License

**Private Repository** – All rights reserved.
For licensing inquiries, please contact the maintainer.

---

## 📫 Contact

For questions, feedback, or collaboration opportunities:
- **Email:** [ahmadpiracha3@gmail.com]
---

*Built with ❤️ for men's mental health and emotional fitness.*
