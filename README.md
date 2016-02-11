# Visual Regression Testing with Selenium

Multiplatform testing for visual differences with Selenium Server.

We use node.js in and out so this is our tool of choice for testing purposes as well.


## Install selenium server

```
npm install -g selenium-standalone
selenium-standalone install
```

To run the server you can use: 
```
selenium-standalone start
```

*You might need to install Java SDK if you haven't already so do it to be able to run selenium.
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

## Install node dependencies

We will use WebdriverIO wrapper for Selenium as well as its addon WebdriverCSS which will help with screenshooting and diffing. WebdriverCSS uses GraphicsMagick for image processing so you'll need it preinstalled on your system as well: https://github.com/webdriverio/webdrivercss#install

```
npm install
```

If you experience any problems make sure we're on the same train by comparing node versions. We tested it with:
- node: v0.12.7, v4.1.1
- npm:  v2.11.3, v2.14.4

For easy version switch install nvm:
https://github.com/creationix/nvm/


## Setup testing enviroment

First off all you'll need to specify your testing enviroment. 
 Set `isLocalSeleniumUsed` to true. Pass to `browsers` json file with browsers list and it's settings. Use defaults provided in repository or just take a reference and adjust it to your needs.

### BrowserStack

Set `isLocalSeleniumUsed` to false and create in root folder credentials.json with your api keys like this:
```JSON
{
   	"browserstack": {
     	"user": "urBSuser",
     	"key": "urBSkey"
  	}
}
```

### Local

Set `isLocalSeleniumUsed` to true.

Note for Win: IE needs page to be served from localhost as of security reasons.
Note for OSX: Safari needs extension and enviroment prerequisites:
- http://www.seleniumhq.org/download/
- http://stackoverflow.com/questions/19971088/how-to-open-safari-browser-using-webdriver
- https://itisatechiesworld.wordpress.com/selenium/selenium-webdriver/steps-to-get-safari-webdriver-running-on-mac-osx/

## Running tests

Start your selenium server with one terminal tab / window:
```
selenium-standalone start
```

Run your first tests within another:
```
node index.js
```

It will produce your base images. Later when you run the same command it will create and evaluate comparisons

## Warnings

1. When you load your urls from remote server you should look out on usage of background images. Browsers trigger `load` event before `background-image` is retrived. Exactly the same scenario applies to any other async operation like loading third party widgets (google maps, youtube videos etc). 

2. For the moment WebdriverCSS doesn't support multiremote method so there is no way to run those tests in parallel. Waiting for official 2.0 release!

## Resources

http://www.creativebloq.com/web-design/automate-visual-regression-testing-111517944
http://ngeor.net/2016/02/adventures-with-automated-browser-tests-in-javascript/