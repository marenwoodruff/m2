# MyMatrix Mobile App
#### Usage
To get the MyMatrix Mobile App running on your local system, please perform the following instructions:
* Installation (don't sudo any of these commands, as you will run into trouble when you try to emulate/build the app)
    * `git clone <repo location>` (Copy repo to local system)
    *  `cd <repo name>` (Enter repo folder)
    *  Install node at `https://nodejs.org/en/`
    *  `node -v` (Check version of node installed)
    *  `npm -v` (Check version of npm installed)
        *  To update npm `sudo npm install npm -g`
    *  `npm install -g ionic@beta` (Installs Ionic 2 beta 7, because of the package.json)
        * `ionic -v` (Check version of ionic installed)
    *  `npm install -g cordova` (Installs Cordova)
        * `cordova -v` (Check version of cordova installed)
    *  `npm install -g typescript` (Install Typescript)
    *  `npm install -g typescript@next` (For Typescript nightly builds)
    *  `npm install -g typings` (Install Typings- definitions for Typescript)
    *  `npm install` (Install dependencies)
    *  `gulp build` (Install dependencies)
    *  `typings install` (Install typings package manager)

* Only run this command if you are having a lot of problems
    *  `ionic state reset` (Reset ionic/rebuild state)

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


#### Directions to Update Your Repository
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

* To Updatee to Ionic 2 beta 8
    *   you can also look at this link: https://github.com/driftyco/ionic/blob/2.0/CHANGELOG.md#steps-to-upgrade-to-beta-8
    *   change your package.json to reflect the changes- "ionic-angular": "^2.0.0-beta.8",
    *  `npm install -g ionic@2.0.0-beta.8` (Install Ionic 2 beta 8)
        * `ionic -v` (Check version of ionic installed)
    *  `npm install -g cordova` (Installs Cordova)
        * `cordova -v` (Check version of cordova installed)
    *  `npm install -g typescript` (Install Typescript)
    *  `npm install -g typescript@next` (For Typescript nightly builds)
    *  `npm install -g typings` (Install Typings- definitions for Typescript)
    *  `npm install` (Install dependencies)
    *  `gulp build` (Install dependencies)
    *  `typings install` (Install typings package manager)
    *   Change all references to @Page to @Component, which is imported from @angular/core
    *   In your app.ts, change the @App to @Component, which is imported from @angular/core
    *   In your app.ts, import IonicBootstrap from ionic-angular
    *   In your app.ts, delete the references to the providers and config from your @App object
    *   At the bottom of your app.ts, add 
          `// Pass the main app component as the first argument
          // Pass any providers for your app in the second argument
          // Set any config for your app as the third argument:
          // http://ionicframework.com/docs/v2/api/config/Config/

          ionicBootstrap(MyApp, [ConferenceData, UserData], {
            tabbarPlacement: 'bottom'
          });`
    *   In your app.ts, instead of IonicApp, you will just import App from ionic-angular, and change the reference in your constructor
    * If you have used lifecycle events of Ionic events in your app, there are directions about how to update the code in the url above.


#### Ionic View
Ionic view is a downloadable application on Android and iOS that allows for the testing of Ionic applications without the need of the Apple or Play Stores.

* Check out the Deploy from Scratch tutorial to get started: http://docs.ionic.io/docs/deploy-from-scratch
* Check out the usage guide: http://docs.ionic.io/docs/deploy-usage

NOTE: Ionic 2 is still in beta and the deploy documentation hasn't been updated to reflect the beta builds.
