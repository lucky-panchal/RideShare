# Map Debug Steps

## 1. Test Basic Map (SimpleHome)
Navigate to "SimpleHome" screen to test if basic map loads.

## 2. Check Console Logs
Look for these messages:
- ✅ "Map Ready!" = Map loaded successfully
- ❌ "Map Error:" = Map failed to load

## 3. Common Issues & Solutions

### Issue: Blank/White Screen
**Solution:** 
```bash
expo install react-native-maps
expo prebuild --clean
```

### Issue: "Map Error" in console
**Solutions:**
1. Check internet connection
2. Verify Google Maps API key is enabled for:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Places API (if using search)

### Issue: Location not working
**Solutions:**
1. Enable location services on device
2. Grant location permission when prompted
3. Test on physical device (not simulator)

## 4. API Key Verification
Your API key: AIzaSyCxcCXkBZ_q_U-akixwLNJOFRFSAr4npxc

Go to Google Cloud Console:
1. Enable "Maps SDK for Android"
2. Enable "Maps SDK for iOS" 
3. Check API key restrictions

## 5. Test Commands
```bash
# Clean and restart
expo start --clear

# For Android
expo start --android

# For iOS  
expo start --ios
```

## 6. If Still Not Working
Try the MapTest screen - it's the most basic map implementation.