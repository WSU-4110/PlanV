# PlanV Application Overview

**PlanV** is a travel planning application that allows users to organize their trips all in one place. Key features include:

- Viewing distance, weather, and flight details for desired destinations.
- Generating hotel recommendations.
- Storing flight documents securely.
- Editing user profiles for a personalized experience.

---

## Preface for Running the Application

When using PlanV, follow these recommendations to achieve the best results:

### Using Flights and Hotels Features

#### Flights:
- Begin by typing in a city to fetch the associated airport results.
- Once the airports are displayed, erase the city name and enter the airport code in all caps (e.g., JFK, LAX) to gather accurate flight results.

#### Hotels:
- Search by city name and select the desired city from the list.
- After selecting the city, wait for the **Search Results** button to appear.
- Click on this button to view hotel options for your destination.

### Important Notes
- The use of pre-set `useState` values for Flights and Hotels is recommended, as these configurations have been tested and confirmed to work.
- Please allow time for hotel search results to load, as a large amount of data is being processed in the background. Rest assured, the functionality works correctly despite potential delays.

---

## How to Install and Run PlanV

Follow these steps to get PlanV running on your device:

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
   - Set up a device (either a physical device or an emulator) to run the app.
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

For more detailed instructions, follow the official [installation guide link](https://github.com/WSU-4110/PlanV/).

---

## Authors

- **Aminah** (hm3480@wayne.edu)
- **Amna** (hc9090@wayne.edu)
- **Kleant** (hf0218@wayne.edu)
