/**
* Using page object model to improve reusability and separate verification code
* from page manipulation code
*/
var signUpCommands = {
	clickJoinButton: function() {
		return this.click('@individualSignUpButton');
	},
	fillInFirstName: function(firstName) {
		return this.setValue('@firstName', firstName);
	},
	fillInLastName: function(lastName) {
		return this.setValue('@lastName', lastName);
	},
	fillInEmail: function(email) {
		return this.setValue('@email', email);
	},
	fillInPassword: function(password) {
		return this.setValue('@password', password);
	},
	clickAgreeCheckbox: function() {
		return this.click('@agreeCheckbox');
	},
	clickRegister: function() {
		return this.click('@register');
	},
	clearAllFields: function() {
		// hacky workaround due to clearValue being seemingly broken: https://github.com/nightwatchjs/nightwatch/issues/1939
		var manyBackSpaces = ['\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008','\u0008'];
		this.setValue('@firstName', manyBackSpaces);
		this.setValue('@lastName', manyBackSpaces);
		this.setValue('@email', manyBackSpaces);
		this.setValue('@password', manyBackSpaces);
	}
};

module.exports = {
	commands: [signUpCommands],
	url: function() {
		return 'https://dev.workmarket.com/register/campaign/10081C503B209A0C8E7F05FDCC1AA98D4C904DEEF5F73265CAE38C744E7EAD3E';
	},
	elements: {
		individualSignUpButton: {
			selector: '//*[@id="landing-page-bucket"]/div/div[1]/div[2]/div[2]/div/button',
			locateStrategy: 'xpath'
		},
		signUpForm: {
			selector: '//*[@id="landing-page-bucket"]/div/div[2]',
			locateStrategy: 'xpath'
		},
		firstName: {
			selector: '#firstname'
		},
		lastName: {
			selector: '#lastname'
		},
		email: {
			selector: '#email'
		},
		emailError: {
			selector: '//*[@id="landing-page-bucket"]/div/div[2]/div[2]/div/div[3]/div[2]',
			locateStrategy: 'xpath'
		},
		password: {
			selector: '#password'
		},
		passwordError: {
			selector: '//*[@id="landing-page-bucket"]/div/div[2]/div[2]/div/div[4]/div[3]',
			locateStrategy: 'xpath'
		},
		agreeSection: {
			selector: '//*[@id="landing-page-bucket"]/div/div[2]/div[2]/div/div[5]',
			locateStrategy: 'xpath'
		},
		agreeCheckbox: {
			selector: 'input[type=checkbox]'
		},
		register: {
			selector: 'button[data-component-identifier="wm-validating-form__submit"]'
		},
		errorBanner: {
			selector: 'div[data-component-identifier="wm-message-banner-text"] > p'
		}
	}
};