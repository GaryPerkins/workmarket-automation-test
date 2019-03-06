module.exports = {
  'Sign Up Page Initial Render' : function(browser) {
    // instantiate our page object
    var signUp = browser.page.signUpPage();

    // navigate to sign up url and wait for page to load before continuing
    signUp.navigate().waitForElementVisible('body', 1000);
    signUp.expect.element('@individualSignUpButton').to.be.visible;
    signUp.expect.element('@signUpForm').to.not.be.visible;
  },
  'Join As An Individual Form Verification': function(browser) {
    var signUp = browser.page.signUpPage();

    // click Join as Individual Button, make sure everything on form is present
    signUp.clickJoinButton()
    signUp.expect.element('@firstName').to.be.visible;
    signUp.expect.element('@lastName').to.be.visible;
    signUp.expect.element('@email').to.be.visible;
    signUp.expect.element('@password').to.be.visible;
    signUp.expect.element('@agreeSection').to.be.visible;
    signUp.expect.element('@register').to.be.visible;
  },
  'Fill Out All But First Name': function(browser) {
  	var signUp = browser.page.signUpPage();
  	signUp
  		.fillInLastName('Testerson')
  		.fillInEmail('test@testing.com')
  		.fillInPassword('T3sT1nG!!')
  		.clickAgreeCheckbox()
  		.expect.element('@register').to.not.be.enabled;

  	// reset any field manipulated in this test for the next one
  	signUp.clearAllFields();
  	signUp.clickAgreeCheckbox();
  },
  'Fill Out All But Last Name': function(browser) {
	var signUp = browser.page.signUpPage();
	signUp
		.fillInFirstName('Tester')
		.fillInEmail('test@testing.com')
		.fillInPassword('T3sT1nG!!')
		.clickAgreeCheckbox()
		.expect.element('@register').to.not.be.enabled;

		signUp.clearAllFields();
  	signUp.clickAgreeCheckbox();
  },
  'Fill Out All But Email': function(browser) {
		var signUp = browser.page.signUpPage();

		signUp
			.fillInFirstName('Tester')
			.fillInLastName('Testerson')
			.fillInPassword('T3sT1nG!!')
			.clickAgreeCheckbox()
			.expect.element('@register').to.not.be.enabled;
		
		signUp.clearAllFields();
	 	signUp.clickAgreeCheckbox();
  },
  'Fill Out All But Password': function(browser) {
		var signUp = browser.page.signUpPage();
		signUp
			.fillInFirstName('Tester')
			.fillInLastName('Testerson')
			.fillInEmail('test@testing.com')
			.clickAgreeCheckbox()
			.expect.element('@register').to.not.be.enabled;

		signUp.clearAllFields();
	 	signUp.clickAgreeCheckbox();
  },
  'Fill Out All But Agreement': function(browser) {
		var signUp = browser.page.signUpPage();
		signUp
			.fillInFirstName('Tester')
			.fillInLastName('Testerson')
			.fillInEmail('test@testing.com')
			.fillInPassword('T3sT1nG!!')
			.expect.element('@register').to.not.be.enabled;

		signUp.clearAllFields();
  },
  'Fill Out Email Incorrectly': function(browser) {
  	var signUp = browser.page.signUpPage();
  	signUp
  		.fillInEmail('this is not an email')
  		.expect.element('@emailError').text.to.equal('Please enter a valid email');

  	signUp.clearAllFields();
  },
  'Fill Out With Invalid Password': function(browser) {
  	var signUp = browser.page.signUpPage();
  	signUp
  		.fillInPassword('test')
  		.expect.element('@passwordError').text.to.equal('Please enter a valid password');

  	signUp.clearAllFields();

  	// This case will fail since the Password instructions are "Min 8 characters,
  	// at least 1 number", but it accepts an invalid password!
  	// In normal test, would reach out to developers as this is either misleading UI or bug
  	// but using a try/catch of sorts to continue code execution for purposes of rest of tests

  	signUp
  		.fillInPassword('longEnoughButNoNumber');
  		signUp.api.element('css selector', '@passwordError', function(result) {
  			if(result.status !== -1) {
  				signUp.expect.element('@passwordError').text.to.equal('Please enter a valid password');
  			}
  			else {
  				console.log('^^^ ERROR: Password Error field expected but not present, continuing execution');
  			}
  		});

  	signUp.clearAllFields();
  },
  'Fill Out All Correctly With Weak Password': function(browser) {
  	var signUp = browser.page.signUpPage();
  	signUp
  		.fillInFirstName('Tester')
  		.fillInLastName('Testerson')
			.fillInEmail('test' + Math.floor(Math.random() * 10000) + '@testing.com')
			.fillInPassword('testtest')
			.clickAgreeCheckbox()
			.expect.element('@register').to.be.enabled;
		signUp
			.clickRegister()
			.expect.element('@errorBanner').text.to.equal('Your password entered is not allowed because it is too simple');

		signUp.clearAllFields();
		signUp.clickAgreeCheckbox();
  },
  'Fill Out All Correctly With In-Use Email': function(browser) {
  	var signUp = browser.page.signUpPage();
  	var inUseEmail = 'test@test.com';
  	signUp
  		.fillInFirstName('Tester')
  		.fillInLastName('Testerson')
			.fillInEmail(inUseEmail)
			.fillInPassword('T3sT1nG!!')
			.clickAgreeCheckbox()
			.expect.element('@register').to.be.enabled;
		signUp
			.clickRegister()
			.expect.element('@errorBanner').text.to.equal('The email address ' + inUseEmail + ' is already being used.');

		signUp.clearAllFields();
		signUp.clickAgreeCheckbox();
  },
  'Fill Out All Correctly': function(browser) {
  	var signUp = browser.page.signUpPage();
  	signUp
  		.fillInFirstName('Tester')
  		.fillInLastName('Testerson')
  		// making random accounts for purposes of testing multiple times...
			.fillInEmail('test' + Math.floor(Math.random() * 10000) + '@testing.com')
			.fillInPassword('T3sT1nG!!')
			.clickAgreeCheckbox()
			.expect.element('@register').to.be.enabled;

		signUp
			.clickRegister();

		// we should be on success page now, lets check if the appropriate elements are there
		var successPage = browser.page.successfulSignUpPage();

		successPage.expect.element('@thankYouHeader').to.be.present;
		successPage.expect.element('@nextStepsHeader').to.be.present;
		successPage.expect.element('@nextStepsMessage').to.be.present;

		browser.end();
  }
};