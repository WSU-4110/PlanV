# Installation Guide

This guide provides step-by-step instructions for setting up and running the PlanV application.

---

## Dependencies
Before starting, ensure you have the following dependencies installed:

- **Android Studio**: Includes SDKs and emulators for Android development.
- **React Native CLI**: Follow the official [setup instructions](https://reactnative.dev/docs/environment-setup).
- **Node.js**: JavaScript runtime environment ([Download Node.js](https://nodejs.org/)).
- **React Native Metro**: Comes bundled with React Native for bundling JavaScript.

---

## Installation Instructions

### 1. Clone the Repository
```bash
git clone <repository-link>
cd PlanV
```

### 2. Navigate to the Project Directory
```bash
cd PlanVapp
```

### 3. Install Dependencies
Run the following command to install all required Node.js packages:
```bash
npm install
```

### 4. Running the Android Application

#### Using Android Studio Emulator:
1. Start the Metro Bundler:
    ```bash
    npx react-native start
    ```
2. Launch the app on the Android emulator:
    ```bash
    npx react-native run-android
    ```

#### Using a Physical Device:
1. Connect your physical Android device via USB.
2. Start the Metro Bundler:
    ```bash
    npx react-native start
    ```
3. Launch the app on your device:
    ```bash
    npx react-native run-android
    ```

---

## Debugging
If you encounter issues during setup or execution, follow these steps:

1. Close the app.
2. Rebuild the app to resolve potential build issues:
    ```bash
    npx react-native run-android
    ```

### Android Studio Troubleshooting
- Ensure your Android Studio installation includes the required SDKs and that your emulator is properly configured.
- If errors persist, clean the Gradle build to reset the build environment:
    ```bash
    cd android
    ./gradlew clean
    ```

---

## Additional Notes

- Make sure your device or emulator is properly connected and detected.
- Check your Node.js version (`node -v`) to ensure compatibility with the React Native version.

---

## Download and Setup

### 1. **Download the Project**
   - Go to the [PlanV GitHub Repository](https://github.com/WSU-4110/PlanV/) and click the green **Code** button.
   - Select **Download ZIP** to download the project files.

### 2. **Extract the ZIP File**
   - Extract the ZIP file to a folder of your choice.

### 3. **Open the Project in Android Studio**
   - Open [Android Studio](https://developer.android.com/studio).
   - In Android Studio, go to **File > Open** and navigate to the extracted folder.
   - Select the folder and let Android Studio sync the project. This might take a few minutes.

### 4. **Set Up Your Device**
   - You’ll need to set up a device (either a physical device or an emulator) to run the app.
   - Follow this official guide to set up a device: [Set up a Device in Android Studio](https://developer.android.com/studio/run/device).

### 5. **Install Dependencies**
   - Open a terminal in the project folder and run the following command to install all required dependencies:
     ```bash
     npm install
     ```

### 6. **Run the App**
   - After the dependencies are installed, run the following command in the terminal:
     ```bash
     npm run android
     ```
   - The app will build and launch on your connected device or emulator.

---
