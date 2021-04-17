exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['main.test.js'],
  onPrepare: function () {
    /**
     * If you are testing against a non-angular site - set ignoreSynchronization setting to true
     *
     * If true, Protractor will not attempt to synchronize with the page before
     * performing actions. This can be harmful because Protractor will not wait
     * until $timeouts and $http calls have been processed, which can cause
     * tests to become flaky. This should be used only when necessary, such as
     * when a page continuously polls an API using $timeout.
     *
     * @type {boolean}
     */
    browser.ignoreSynchronization = true;
  }
}