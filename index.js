(function() {
    'use strict';

    // NPM packages
    var webdriverio  = require('webdriverio'),
        webdrivercss = require('webdrivercss');


    /**
     *  SETTINGS
     *  
     *  All common config goes here for a cleaner boilerplate code. 
     */
    
    // Enviroment settings
    var isLocalSeleniumUsed = true;
    
    // External seetings files
    var _links       = require('./links.json'),
        _browsers    = (isLocalSeleniumUsed) ? require('./browsers-win10-local.json') // keep it updated
                                             : require('./browsers-browserstack.json');

    var config = {
        webdrivercss: {
            screenshotRoot: 'visual/baseline',
            failedComparisonsRoot: 'visual/failures',
            misMatchTolerance: 0.05,
            screenWidth: [1920, 1680]
        },
        webdriverio: {}
    };

    if(!isLocalSeleniumUsed) {
        // For cloud testing system expects you to have credentials.json in your root folder where you pass your api keys like this:
        // {
        //   "browserstack": {
        //     "user": "urBSuser",
        //     "key": "urBSkey"
        //   }
        // }
        var credentials  = require('./credentials.json');

        // Extend settings for Browserstack
        config.webdriverio = {
            host: 'hub.browserstack.com',
            port: 80,
            logLevel: 'silent',
            user: credentials.browserstack.user,
            key: credentials.browserstack.key
        };
    }


    /**
     *  BROWSERS
     *  
     *  Setup each browser, run test and close it. 
     */
    function runBrowser(browser) { 

        // TODO - doublecheck it with browser stack - issue with resolution might be an effect of resources given within free account
        if(!isLocalSeleniumUsed) {
            // Extend each BrowsterStack browser with common capabilities
            _browsers[browser]['browserstack.debug'] = 'true';
            _browsers[browser]['browserstack.local'] = 'false';
            _browsers[browser]['resolution'] = '1920x1080';
        }

        // Configure webdriverio
        config.webdriverio.desiredCapabilities = _browsers[browser];
        var client = webdriverio.remote(config.webdriverio);

        // Initialize webdrivercss
        webdrivercss.init(client, config.webdrivercss);

        // Initialize webdriverio client with reassignment to make it available without chaining so we may pass client around and decouple concerns.
        client = client.init(); 
        client = runTest(client);
        client.end();
    }


    /**
     *  TESTS
     *  
     *  Make snapshots inside given browser
     *  TODO console test with mocha (?)
     */
    function runTest(client) {
        // Go through all links 
        for(var linkName in _links) {
            var title = linkName + '_' + browser;

            client = client.url(_links[linkName]);
            client = client.webdrivercss(title, {
                name: 'snapshot',
                elem: 'body'
            });
        }

        return client;
    }


    /**
     *  ENTRY POINT
     *  
     *  Run all browsers. Opens all, execute in order.
     *  TODO For parallel execution get into multiremote mode and selenium GRID
     */
    for(var browser in _browsers) {
        runBrowser(browser);
    }
    
}());