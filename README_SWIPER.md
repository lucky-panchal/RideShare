# Swiper Implementation Guide

## Overview
This project now includes comprehensive swiper functionality for smooth transitions throughout the entire application.

## Components Added

### 1. CustomSwiper (`components/shared/CustomSwiper.jsx`)
- Reusable swiper component with customizable options
- Supports pagination, autoplay, loop, and custom styling
- Built on top of `react-native-swiper`

### 2. OnboardingSwiper (`components/Onboardings/OnboardingSwiper.jsx`)
- Combines all three onboarding screens into a single swiper
- Smooth transitions between onboarding steps
- Custom pagination styling

### 3. MainHomeContainer (`components/Home/MainHomeContainer.jsx`)
- Main container for home screens with swiper navigation
- Integrates with bottom navigation for seamless experience
- Supports all main app screens (Home, Favorites, Wallet, Notifications, Profile)

### 4. SwiperNavigation (`components/shared/SwiperNavigation.jsx`)
- Reusable bottom navigation component
- Works with swiper to provide smooth tab transitions
- Includes notification badges and special wallet button styling

### 5. PageTransition (`components/shared/PageTransition.jsx`)
- Collection of smooth transition effects for React Navigation
- Includes slide, fade, scale, and custom transitions
- Easy to apply to different navigation stacks

### 6. AnimatedButton (`components/shared/AnimatedButton.jsx`)
- Smooth press animations for buttons
- Customizable scale and duration
- Enhances user interaction feedback

## Usage Examples

### Basic Swiper
```jsx
import CustomSwiper from '../shared/CustomSwiper';

<CustomSwiper
  showsPagination={true}
  autoplay={false}
  loop={false}
  onIndexChanged={(index) => console.log(index)}
>
  <View><Text>Screen 1</Text></View>
  <View><Text>Screen 2</Text></View>
  <View><Text>Screen 3</Text></View>
</CustomSwiper>
```

### Navigation with Transitions
```jsx
import { smoothSlideTransition } from './components/shared/PageTransition';

<Stack.Navigator
  screenOptions={{
    cardStyleInterpolator: smoothSlideTransition,
  }}
>
  {/* Your screens */}
</Stack.Navigator>
```

### Animated Button
```jsx
import AnimatedButton from '../shared/AnimatedButton';

<AnimatedButton
  onPress={() => console.log('Pressed')}
  style={styles.button}
>
  <Text>Press Me</Text>
</AnimatedButton>
```

## Features

### Smooth Transitions
- All screen transitions now use smooth animations
- Consistent easing and timing across the app
- Reduced motion for better accessibility

### Swiper Navigation
- Horizontal swipe gestures between main screens
- Bottom navigation synced with swiper position
- Smooth animations when switching tabs

### Enhanced Onboarding
- Single swiper component for all onboarding screens
- Progress indicators with smooth animations
- Gesture-based navigation

### Performance Optimizations
- Native driver animations where possible
- Optimized re-renders
- Smooth 60fps animations

## Configuration

### Swiper Options
- `showsPagination`: Show/hide pagination dots
- `autoplay`: Enable automatic sliding
- `loop`: Enable infinite loop
- `scrollEnabled`: Enable/disable manual scrolling
- `onIndexChanged`: Callback for index changes

### Transition Timing
- Default duration: 400ms for navigation
- Button animations: 150ms
- Easing: Bezier curve for natural feel

## Dependencies Added
- `react-native-swiper`: Main swiper functionality
- `react-native-pager-view`: Enhanced page view support

## Migration Notes
- App.js updated to use OnboardingSwiper instead of individual screens
- Home navigation now uses MainHomeContainer with swiper
- All transitions enhanced with smooth animations
- Bottom navigation integrated with swiper functionality

## Best Practices
1. Use CustomSwiper for multi-screen flows
2. Apply PageTransition effects to navigation stacks
3. Use AnimatedButton for interactive elements
4. Keep swiper index in sync with navigation state
5. Disable scrolling for controlled flows (like authentication)