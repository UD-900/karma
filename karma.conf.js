// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'), // Add this for JUnit reports
      //new plugin
      require('karma-puppeteer-launcher') // for headless browsers without installing browsers
    ],
    customLaunchers: {
      ChromiumHeadlessCI: {
        base: 'PuppeteerTouchlessChrome', // Use Puppeteer for headless testing
        flags: [
          '--no-sandbox', //Critical for CI environments where chrome might run as root
          '--headless', //explicitly run in headless mode
          '--disable-gpu', //recommended for headless environments
          '--disable-dev-shm-usage', // Helps prevent OOM (Out Of Memmory) issues in CI environments
          '--remote-debugging-port=9222', // Enable remote debugging
        ]
      }
    },
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the html reporter is enabled by default and shows tests in a browser
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      captureConsole: true
    },
    jasmineHtmlReporter: {
      suppressAll: true // Suppress all messages (spec names, test summaries)
    },
    // Configuration for the coverage reporter
    coverageReporter: {
        dir: require('path').join(__dirname, './coverage/your-angular-project-name'), // Adjust path as needed
        subdir: '.',
        reporters: [
        { type: 'html' }, // HTML report
        { type: 'lcov' }, // LCOV report (for Jenkins, SonarQube, etc.)
        { type: 'text-summary' }, // Summary in the console
        { type: 'cobertura', file: 'cobertura-coverage.xml' } // Cobertura for Jenkins
        ],
        check: { // Optional: enforce coverage thresholds
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80
        }
        }
    },
    // Configuration for the JUnit reporter
    junitReporter: {
        outputDir: require('path').join(__dirname, './junit-report'), // Directory for JUnit XML files
        outputFile: 'junit-test-results.xml', // Name of the JUnit XML file
        suite: '', // Suite name to use instead of browser name
        useBrowserName: false, // Add browser name to report and classes names
        nameFormatter: undefined, // Function (browser, result) to customize the name attribute in xml testcase element
        classNameFormatter: undefined, // Function (browser, result) to customize the classname attribute in xml testcase element
        properties: {} // Key value pair of properties to add to the <properties> section of the report
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'junit'], // Add 'coverage' and 'junit'
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromiumHeadlessCI'], // Use the custom launcher for headless testing
    singleRun: false,
    restartOnFileChange: true
  });
};