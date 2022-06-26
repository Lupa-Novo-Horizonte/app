::Lupa App
Website for information about the project: https://seer.uscs.edu.br/index.php/revista_comunicacao_inovacao/article/view/5030

::Repository
https://github.com/wellingtonp1/LupaNHAPI
https://github.com/wellingtonp1/LupaMobile
https://github.com/Lupa-Novo-Horizonte/app

::Pre requerement steps
1. Install node (download it from official website)
2. choco install -y nodejs-lts openjdk11
3. node -v
4. npm -v
5. java -version

::Clone the project and inside the folder execute commands (even if you already have, after clone, need to excute step 2, 3 and 4)
1. npm install
2. Get-ExecutionPolicy
3. Set-ExecutionPolicy AllSigned
4. Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
5. npm install react-native-eject
6. npm i --save-dev @react-native-community/cli
	
::Install libraries in order to load the app correctly
1. npm install react-native-geolocation-service
2. npm install react-native-vector-icons
3. npm install react-native-maps (additional settings needed: https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md)
4. npm install react-native-svg
5. npm install react-native-svg-transformer
6. npm install formik
7. npm install haversine
8. npm install styled-components
9. npm install react-native-reanimated react-native-gesture-handler react-native-screens
10. npm install react-native-safe-area-context @react-native-community/masked-view
11. npm install react-native-permissions
12. npm install react-native-swiper
13. npm install @react-navigation/stack
14. npm install @react-navigation/bottom-tabs
15. npm install @react-native-community/async-storage
16. npm install @react-native-community/geolocation 
17. npm install @react-navigation/native
18. npm install react-native-select-dropdown

*In case needed use "--legacy-peer-deps" at the end of each command for compactibility reason.

::In case run using emulator
Android Studio install steps (Only for emulator purpose only).
https://react-native.rocketseat.dev/android/windows

::Start the app
1. npm start
2. react-native run-android

:: Mysql
See script inside DB folder of app repository.

#ngrok
install ngrok
open the port for remote connection using: ngrok http https://localhost:58365

# Generate APK for android
1. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
2. cd android
3. ./gradlew bundleRelease
APK in "yourProject/android/app/build/outputs/apk/debug/app-debug.apk"
