# PUI - Final Assignment for Multiplatform Module

This repository contains the solutions for the Programming of User Interfaces React exercises. All tasks are done in groups of three.
Authors

    Djamila Zimmermann
    Nasim Ghorbani-Elizeh
    Lakmi Pabasara Kulathunga Weerapperuma Achchi Athukoralage

Github repository

https://github.com/Lakmi94/ReactNewsManagerDevTeam1


    • Write a reduced Newspaper Reader application in React with the following elements (6points)
    • Main Page that shows all articles with thumbnail and abstract
    • Filtering by category
    • Click on article to see detail view with article image and full text
    • Build Newspaper Reader application as Desktop Application using Electron (3 Points)
    • Application has a custom Logo
    • Build Newspaper Reader application as Mobile Application using Capacitor (1 point)
    • Application has Custom Logo
    • Deliver APK and Code repository as zip uploaded to moodle

>[!IMPORTANT]
>Electron version should be "electron": "39.2.1", and not "electron": "3^9.2.1" 


To install and run the program, follow these steps

1. Go to git repository https://github.com/Lakmi94/ReactNewsManagerDevTeam1
2. Clone the repository. 
3. Open the repository with VS code. 
4. Open a new terminal on VS code at the root directory of the project.
5. Run npm install to install the packages in the root directory.
6. Run `cd packages/web` to navigate to the web directory
7. In the web directory, `run npm install` to install the web related packages. 
8. Go back to the packages directory by running `cd ../` or open a new terminal window and navigate to the packages  directory.
9. From the packages directory, navigate to desktop directory by running `cd desktop`
10. Once inside the desktop directory, `run npm install` to install electron related packages.
11. After both web and desktop packages are installed, open a new terminal window or use the same terminals and navigate to the packages/web directory. 

## To run Web:
12. In the packages/web folder `run npm run dev` and the project will open locally on http://localhost:5174/
13. Keep the website running, while proceeding to the desktop section. 
14. In a new terminal window in the web directory, `run npm run build` to build the web version. This will be needed to build the desktop, and mobile packages. The built files will be saved to packages/web/dist. 
 

 
## To run Desktop: 
1. To run the desktop version on electron, navigate to packages/desktop directory on a new terminal window by running `cd packages/desktop`
2. In the terminal at packages/desktop run the command `VITE_DEV_SERVER_URL=http://localhost:5173 NODE_ENV=development electron .`  (with the full stop)
3. This will open a new electron window with the app interface and the developer tools to debug if necessary. 
4. To build the desktop version to get an executable file to install, in a new terminal window navigate to packages/desktop by running `cd packages/desktop`
5. Run the command `npm run electronBuild`
6. The built desktop version will be saved in the dist folder in the root. Navigate to ReactNewsManagerDevTeam1/dist/desktop on finder or file manager and open the EIT News paper-1.0.0-arm64.dmg file to install the native app on your machine. 
7. Once the app is installed, move it to applications and you can open it from there. 

## To run Mobile:
1. Open a new terminal window on VS code and navigate to the mobile folder by running `cd packages/mobile`
2. Assuming that the Android SDK, platform-tools, and emulator paths are added to the shell configuration file, open a terminal config file and run `source ~/.zshrc` to refresh it.  
3. Open android studio and run an emulator on device manager. 
4. Run `adb devices` to see if the emulator is running and is being detected.
5. Once the device/emulator is running, run `adb reverse tcp:5173 tcp:5173 && NODE_ENV=development DEVICE=mobile DEV_SERVER_URL=http://localhost:5173 npx cap run android` to run the mobile app on the emulator in android studio. 
6. To build the android app to obtain an APK file, to install on devices, open a new terminal window, and run the following command `(cd packages/web && npm run build) && (cd packages/mobile && npx cap copy android) && (cd packages/mobile/android && ./gradlew assembleDebug)`
7.  If that does not work, run the following commands separately
    1. . `cd packages/web && npm run build` => to build the web version 1st
    2. `cd packages/mobile && npx cap copy android` => to copy the finished website code directly into the Android app's folder
    3. `cd packages/mobile/android && ./gradlew assembleDebug` => creates the finished installable app-debug.apk file
8. The executable apk will be saved in ReactNewsManagerDevTeam1/packages/mobile/android/app/build/outputs/apk/debug/app-debug.apk

