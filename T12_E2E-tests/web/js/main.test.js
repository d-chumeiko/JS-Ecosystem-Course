describe('SignIn form testing', () => {
	beforeEach(() => {
		browser.get('http://localhost:3000/');
	});

	it('should have a title', () => {
		const title = 'Legacy Application';
		expect(browser.getTitle()).toEqual(title);
	});

	describe('SignIn workability testing', () => {
		const alertText = 'Account Created Successfully';
    let $body, $submitBtn, $login, $password1, $password2;

    beforeEach(() => {
      $body = $('body');
      $submitBtn = $('#submit');
      $login = $('#login');
      $password1 = $('#password1');
      $password2 = $('#password2');
    });


    it("shouldn't login", async () => {
			$login.sendKeys('login');
			$password1.sendKeys('password');
			$password2.sendKeys('0000');
      
			$body.click();
      
			expect($submitBtn.getAttribute('disabled')).toBe('true');
		});

		it('should login successfully', () => {
			$login.sendKeys('login');
			$password1.sendKeys('password');
			$password2.sendKeys('password');

			$body.click();
			$submitBtn.click();

			const alert = browser.switchTo().alert();

			expect(alert.getText()).toEqual(alertText);
		});


	});
});
