# FarmInvest Lite - Mobile App

An Expo React Native application for managing farm investments.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing on physical device)

## Setup Instructions

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure Backend URL

Edit `src/config/api.ts` to point to your backend server:

```typescript
// For Android Emulator
export const BACKEND_URL = 'http://10.0.2.2:3000';

// For iOS Simulator
export const BACKEND_URL = 'http://localhost:3000';

// For Physical Device (use your computer's local IP)
export const BACKEND_URL = 'http://192.168.1.100:3000';
```

**How to find your local IP:**
- Windows: Run `ipconfig` in terminal
- Mac/Linux: Run `ifconfig` or `ip addr`

### 3. Start the App

```bash
# Start Expo development server
npx expo start

# Or using npm script
npm start
```

### 4. Run on Device/Emulator

After starting Expo:

- **Android Emulator**: Press `a` in terminal
- **iOS Simulator**: Press `i` in terminal
- **Physical Device**: Scan QR code with Expo Go app

## Running Tests

```bash
npm test
```

This will run Jest tests including the InvestmentItem component test.

## Project Structure

```
mobile/
├── App.tsx                    # Main app component
├── app.json                   # Expo configuration
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
├── babel.config.js            # Babel configuration
├── __tests__/                 # Test files
│   └── InvestmentItem.test.tsx
├── assets/                    # App assets (icons, splash)
└── src/
    ├── components/            # React components
    │   ├── InvestmentItem.tsx
    │   ├── InvestmentList.tsx
    │   └── NewInvestmentModal.tsx
    ├── config/
    │   └── api.ts             # API configuration
    ├── services/
    │   └── investmentService.ts  # API service functions
    └── types/
        └── index.ts           # TypeScript types
```

## Features

- ✅ View list of investments with FlatList
- ✅ Pull-to-refresh to reload data
- ✅ Create new investment via modal form
- ✅ Optimistic updates (shows new item immediately)
- ✅ Loading and error states
- ✅ Form validation
- ✅ TypeScript support
- ✅ Unit tests

## Troubleshooting

### Network Request Failed

Make sure:
1. Backend server is running on port 3000
2. BACKEND_URL is configured correctly for your environment
3. Your device/emulator can reach the backend server

### Expo Start Issues

Try clearing cache:
```bash
npx expo start --clear
```

### Android Emulator Connection

Use `10.0.2.2` instead of `localhost` as Android emulator uses a different network stack.
