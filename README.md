# MyMatrix Mobile App
#### Usage
To get the MyMatrix Mobile App running on your local system, please perform the following instructions:
* Installation
    * `git clone <repo location>` (Copy repo to local system)
    *  `cd <repo name>` (Enter repo folder)
    *  install node at `https://nodejs.org/en/`
    *  Run `node -v` (Check version of node installed)
    *  Run `npm -v` (Check version of npm installed)
        *  To update npm `sudo npm install npm -g`
    *  `sudo npm install -g ionic@2.0.0-beta.19` (Install Ionic 2 beta 19)
        * Run `ionic -v` (Check version of ionic installed)
    *  `sudo npm install -g cordova` (Installs Cordova)
        * Run `cordova -v` (Check version of cordova installed)
    *  `npm install -g typescript` (Installs Typescript)
    *  `npm install -g typings` (Installs Typings- definitions for Typescriptss)
    *  `npm install` (Install dependencies)
    *  `gulp build` (Install dependencies)
    *  `typings install` (Installs typings package manager)
    *  `ionic state reset` (Resets ionic/rebuilds state)
* Running on Web Browser
    * `ionic serve` (Start Ionic app)
    * `ionic serve -l` (View Ionic App on IOS and Android in browser)
    * Open browser to url: `http://localhost:8100/` (View Ionic App in browser)
* Running on Device
    * NOTE: `You must have a working Apple Developer account certified and updated to run on device`
    * Make sure you have Xcode install + updated
        * Download Url: `https://developer.apple.com/xcode/download/`
    * Plug in your device into USB port
    *  In terminal: `ionic platform add ios` (Creates Xcode project folder and dependencies)
    *  In terminal: `ionic build ios` (This builds the code and creates a .xcodeproj file)
    * Locate the file with the `.xcodeproj` file extention in `<repo name>/platforms/ios` folder and double click to launch
    * Xcode will open (if not, choose Xcode to open file) and begin processing file.
    * Make sure that your device is selected and the build message says `Succeeded`
    * Press the `Play` button on the top-left
    * You should see the app download to your device and then launch.


  #### Directions to Update Repository
  To update the master repository, perform the following:

* Set Up
  * Fork master repo into personal profile
  * `git remote add origin <repo location>`
  * `git remote add upstream <main repo location>`
* Updating
  * `git fetch upstream`
  * `git merge upstream/master` (Fix conflicts)
  * `git push origin master`
  * Create `pull request` updating master repository

#### Ionic View
Ionic view is a downloadable application on Android and iOS that allows for the testing of Ionic applications without the need of the Apple or Play Stores.

* Check out the Deploy from Scratch tutorial to get started: http://docs.ionic.io/docs/deploy-from-scratch
* Check out the usage guide: http://docs.ionic.io/docs/deploy-usage

NOTE: Ionic 2 is still in beta and the deploy documentation hasn't been updated to reflect the beta builds.
