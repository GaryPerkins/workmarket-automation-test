var expect = require('chai').expect;

module.exports = {
	'Use Valid Credentials to Log In': function(browser) {
		// instantiate our page objects
    var login = browser.page.loginPage();
    var search = browser.page.searchPage();

    // navigate to login url and wait for page to load before continuing
    login.navigate().waitForElementVisible('body', 1000);
    login.expect.element('@email').to.be.visible;
    login.expect.element('@password').to.be.visible;
    login.expect.element('@loginButton').to.be.visible;

    login
    	.fillInEmail('qa+candidatetest@workmarket.com')
    	.fillInPassword('candidate123')
    	.clickLogin();

    search.expect.element('@findTalent').to.be.visible;
	},
	'Verify Search Results Are Relevant': function(browser) {
		var search = browser.page.searchPage();
		var searchTerm = 'test';

		// search for our keyword, "test"
		var results;
		search
			.clickFindTalent()
			.waitForElementVisible('@searchField', 2000)
			.searchForWorkers(searchTerm)
			.waitForElementVisible('@resultsList');

		// grab the relevant elements out of results list
		search
			.getResults(function(elements) {
				results = elements;
			});
		// with results list now in our hands, iterate through and check their innerText for our search term
		search
			.api.perform(function() {
				for(let i = 0; i < results.length; i++) {
					this.elementIdAttribute(results[i].ELEMENT, 'innerText', function(res) {
						// normalize data to check
						var innerText = JSON.stringify(res.value).toLowerCase();
						// had to use chai assertion for this as nightwatch only supports comparing elements
						// will not appear in nightwatch reporter if passing, only if failed w/ second arg as fail msg
						expect(innerText).to.have.string(searchTerm, 'Profile card did not contain ' + searchTerm);
					})
				}
			});
		browser.end();
	}
}