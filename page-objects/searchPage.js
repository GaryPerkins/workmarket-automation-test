var searchCommands = {
	clickFindTalent: function() {
		return this.click('@findTalent');
	},
	searchForWorkers: function(keyword) {
		return this.setValue('@searchField', [keyword, this.api.Keys.ENTER]);
	},
	getResults: function(callback) {
		// access all relevant details of the profile card divs via details class 
		this.api.elements('css selector', 'div.profile-card--details', function(elements) {
			callback(elements.value);
		});
	}
}

module.exports = {
	commands: [searchCommands],
	elements: {
		findTalent: {
			selector: '//*[@id="wm-main-nav"]/div/div[1]/div/div/div[2]/div[2]/a',
			locateStrategy: 'xpath'
		},
		searchField: {
			selector: '#input-text'
		},
		resultsList: {
			selector: '#search_results.results-list'
		}
	}
}