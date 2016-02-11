# Visual Regression Testing with Selenium

Multiplatform testing for visual differences with Selenium Server.

We use node.js in and out so this is our tool of choice for testing purposes as well.


## Install selenium server

npm install -g selenium-standalone
selenium-standalone install

To run the server you can use: selenium-standalone start*

*You might need to install Java SDK if you haven't already so do it to be able to tun selenium.

## Install node dependencies

We will use WebdriverIO wrapper for Selenium as well as its addon WebdriverCSS which will help with screenshooting and diffing. WebdriverCSS uses GraphicsMagick for image processing so you'll need it preinstalled on your system as well: https://github.com/webdriverio/webdrivercss#install

npm install

If you experience any problems make sure we're on the same train by comparing node versions. We work with:
- node v0.12.7
- npm v2.11.3

For easy version switch install nvm:
https://github.com/creationix/nvm/


## Setup testing enviroment

First off all you'll need to specify your testing enviroment.

### BrowserStack

Set isLocalSeleniumUsed to false and create in root folder credentials.json with your api keys like this:
 `{
   "browserstack": {
     "user": "urBSuser",
     "key": "urBSkey"
   }
 }`

## Running tests
