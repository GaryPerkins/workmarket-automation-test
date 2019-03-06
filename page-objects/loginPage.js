var loginCommands = {
	fillInEmail: function(email) {
		return this.setValue('@email', email);
	},
	fillInPassword: function(password) {
		return this.setValue('@password', password);
	},
	clickLogin: function() {
		return this.click('@loginButton');
	}
};

module.exports = {
	commands: [loginCommands],
	url: function() {
		return 'https://dev.workmarket.com/login';
	},
	elements: {
		email: {
			selector: '#login-email'
		},
		password: {
			selector: '#login-password'
		},
		loginButton: {
			selector: '#login_page_button'
		}
	}
};