# Mantl - Mental Fitness for Men

A mobile-first emotional fitness app designed specifically for men, offering a structured, dark-mode interface with masculine, action-oriented mental health tools.

## Features

- **Mode-based Navigation**: Vent, Unload, Mantl, Locker Room
- **BroScore System**: Gamified mental health tracking
- **Mood Streaks**: Daily mood tracking with streak rewards
- **Badge System**: Achievement-based progression
- **Dark Theme**: Masculine, minimal design
- **Local Storage**: Data persistence with AsyncStorage

## Tech Stack

- **React Native** with Expo
- **React Navigation** for routing
- **AsyncStorage** for local data persistence
- **Context API** for state management
- **Firebase** (ready for integration)

## Project Structure

\`\`\`
mantl-app/
├── app/                      # App screens & routes
│   ├── index.js              # Landing screen (mode switcher)
│   ├── vent/index.js         # Vent mode feed
│   ├── unload/index.js       # Unload mode feed
│   ├── Mantl/index.js        # Mantl mode feed
│   ├── locker/index.js       # Locker room feed
│   ├── profile/index.js      # User profile screen
│   ├── settings/index.js     # Settings screen
│   └── create-post.js        # Post creation screen
├── components/               # Reusable UI components
│   ├── PostCard.js
│   ├── ModeSwitcher.js
│   ├── MoodTracker.js
│   ├── BroScore.js
│   ├── Header.js
│   ├── Badge.js
│   └── ThemeIcon.js
├── constants/                # Static values
│   ├── modes.js
│   ├── theme.js
│   └── badges.js
├── lib/                      # Utilities
│   ├── firebase.js
│   ├── streaks.js
│   ├── auth.js
│   └── storage.js
├── context/                  # App-wide context
│   ├── ThemeContext.js
│   └── AuthContext.js
└── assets/                   # Images, icons
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your phone (for testing)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd mantl-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npx expo start
   \`\`\`

4. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press \`i\` for iOS simulator
   - Press \`a\` for Android emulator

## Development Roadmap

### Phase 1 - MVP ✅
- [x] Core navigation and UI
- [x] Mode-based feeds (Vent, Unload, Mantl, Locker)
- [x] Post creation and display
- [x] Mood tracking with streaks
- [x] BroScore system
- [x] Badge system
- [x] Local data persistence

### Phase 2 - Backend Integration
- [ ] Firebase Authentication
- [ ] Cloud data sync
- [ ] User profiles
- [ ] Push notifications

### Phase 3 - Enhanced Features
- [ ] Voice memo support
- [ ] AI chat integration
- [ ] Social features
- [ ] Analytics dashboard

### Phase 4 - Launch
- [ ] Beta testing
- [ ] App Store submission
- [ ] Marketing campaign

## Contributing

This is currently a solo development project. If you're interested in contributing, please reach out!

## License

Private project - All rights reserved.
