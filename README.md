
PlanV is a travel planning application that allows users to organize their trips all in one place. Key features include:
* Viewing distance, weather, and flight details for desired destinations.
* Generating hotel recommendations.
* Storing flight documents securely.
* Editing user profiles for a personalized experience.
## How to Install and Run PlanV

Follow these simple steps to get PlanV running on your device:

1. **Download the Project**  
   - Go to the [PlanV GitHub Repository](https://github.com/WSU-4110/PlanV/) and click the green **Code** button.  
   - Select **Download ZIP** to download the project files.

2. **Extract the ZIP File**  
   - Extract the ZIP file to a folder of your choice.

3. **Open the Project in Android Studio**  
   - Open [Android Studio](https://developer.android.com/studio).  
   - In Android Studio, go to **File > Open** and navigate to the extracted folder.  
   - Select the folder and let Android Studio sync the project. This might take a few minutes.

4. **Set Up Your Device**  
   - You’ll need to set up a device (either a physical device or an emulator) to run the app.  
   - Follow this official guide to set up a device: [Set up a Device in Android Studio](https://developer.android.com/studio/run/device).

5. **Install Dependencies**  
   - Open a terminal in the project folder and run the following command to install all required dependencies:  
     ```
     npm install
     ```

6. **Run the App**  
   - After the dependencies are installed, run the following command in the terminal:  
     ```
     npm run android
     ```  
   - The app will build and launch on your connected device or emulator.
