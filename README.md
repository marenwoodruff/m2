# SPH Mobile App
#### Usage
To get the SPH Mobile App running on your local system, please perform the following instructions:
* Installation
    * `git clone <repo location>` (Copy repo to local system)
    *  `cd <repo name>` (Enter repo folder)
    *  `npm install -g ionic@beta` (Install Ionic 2)
    *  `sudo npm install -g cordova` (Installs Cordova)
    *  `npm install` (Install dependencies)
* Running on Web Browser
    * `ionic serve` (Start Ionic app)
    * Open browser to url: `http://localhost:8100/` (View Ionic App in browser)
* Running on Device
    * NOTE: `You must have a working Apple Developer account certified and updated to run on device`
    * Make sure you have Xcode install
        * Download Url: `https://developer.apple.com/xcode/download/`
    * Plug in your device into USB port
    *  In terminal: `ionic platform add ios` (Creates Xcode project folder and dependencies)
    *  In terminal: `ionic build ios` (This builds the code and creates a .xcodeproj file)
    * Locate the file with the `.xcodeproj` file extention in `<repo name>/platforms/ios` folder and double click to launch
    * Xcode will open (if not, choose Xcode to open file) and begin processing file.
    * Make sure that your device is selected and the build message says `Succeeded`
    * Press the `Play` button on the top-left
    * You should see the app download to your device and then launch.
