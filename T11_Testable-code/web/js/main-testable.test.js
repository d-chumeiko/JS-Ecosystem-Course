import SignInFormTracking from './main-testable';

describe('SignInFormTracking Testing', () => {
	let signInFormTracking;

	beforeEach(() => {
		signInFormTracking = new SignInFormTracking();

		signInFormTracking.$submit = $(
			'<button type="submit" class="btn btn-default" id="submit" disabled="disabled">Submit</button>'
		);
		signInFormTracking.$login = $(
			'<input type="text" class="form-control" id="login" placeholder="Enter your login">'
		);
		signInFormTracking.$password1 = $(
			'<input type="password" class="form-control" id="password1" placeholder="Password">'
		);
		signInFormTracking.$password2 = $(
			'<input type="password" class="form-control" id="password2" placeholder="Password">'
		);

		document.body.innerHTML = `
		<form id="create-account-form">
			<div class="form-group">
					<label for="login">Login</label>
					<input type="text" class="form-control" id="login" placeholder="Enter your login">
			</div>
			<div class="form-group">
					<label for="password1">Password</label>
					<input type="password" class="form-control" id="password1" placeholder="Password">
			</div>
			<div class="form-group">
					<label for="password2">Password Again</label>
					<input type="password" class="form-control" id="password2" placeholder="Password">
			</div>
			<button type="submit" class="btn btn-default" id="submit" disabled="disabled">Submit</button>
		</form>`;
		
		signInFormTracking.addListeners();
	});

	describe('signInFormTracking properties should be initialised', () => {
		const objectType = 'object';

		test('$submit button should be initialised as jQuery object', () => {
			expect(typeof signInFormTracking.$submit).toBe(objectType);
		});

		test('$login button should be initialised as jQuery object', () => {
			expect(typeof signInFormTracking.$login).toBe(objectType);
		});

		test('$password1 button should be initialised as jQuery object', () => {
			expect(typeof signInFormTracking.$password1).toBe(objectType);
		});

		test('$password2 button should be initialised as jQuery object', () => {
			expect(typeof signInFormTracking.$password2).toBe(objectType);
		});
	});

	describe('password change handling', () => {
		test('password field should be valid', () => {
			const password = '1jfldl';

			signInFormTracking.makePasswordFieldValid = jest.fn();
			signInFormTracking.$password1.val(password);
			signInFormTracking.$password2.val(password);

			signInFormTracking.handlePasswordChange();
			expect(signInFormTracking.makePasswordFieldValid).toHaveBeenCalled();
		});

		test('password field should be invalid', () => {
			const password1 = '1jfldl';
			const password2 = 'fsdfdsd';

			signInFormTracking.makePasswordFieldInvalid = jest.fn();
			signInFormTracking.$password1.val(password1);
			signInFormTracking.$password2.val(password2);

			signInFormTracking.handlePasswordChange();
			expect(signInFormTracking.makePasswordFieldInvalid).toHaveBeenCalled();
		});
	});

	describe('login field validation', () => {
		test('login should be validated', () => {
			signInFormTracking.makeLoginValid = jest.fn();
			const response = {
				status: 'Everything alright, go on!'
			};

			signInFormTracking.checkLogin(response);
			expect(signInFormTracking.makeLoginValid).toHaveBeenCalled();
		});

		test("login shouldn't be validated", () => {
			signInFormTracking.makeLoginInvalid = jest.fn();
			const response = {
				status: '500'
			};

			signInFormTracking.checkLogin(response);
			expect(signInFormTracking.makeLoginInvalid).toHaveBeenCalled();
		});
	});

	describe('login field valid/invalid testing', () => {
		test('makeLoginValid() testing styles', () => {
			signInFormTracking.makeLoginValid();

			expect(signInFormTracking.$login.prop('style')).toHaveProperty('borderColor', '#0c0');
		});

		test('makeLoginValid() testing unlockSubmitButton() call', () => {
			signInFormTracking.unlockSubmitButton = jest.fn();
			signInFormTracking.$password1.valid = true;
			signInFormTracking.makeLoginValid();

			expect(signInFormTracking.unlockSubmitButton).toHaveBeenCalled();
		});

		test('makeLoginInvalid() testing', () => {
			signInFormTracking.makeLoginInvalid();

			expect(signInFormTracking.$login.prop('style')).toHaveProperty('borderColor', '#c00');
		});
	});

	describe('password field valid/invalid testing', () => {
		test('makePasswordFieldValid() testing', () => {
			signInFormTracking.makePasswordFieldValid();

			expect(signInFormTracking.$password2.prop('style')).toHaveProperty('borderColor', '#0c0');
		});

		test('makePasswordFieldInvalid() testing', () => {
			signInFormTracking.makePasswordFieldInvalid();

			expect(signInFormTracking.$password2.prop('style')).toHaveProperty('borderColor', '#c00');
		});
	});

	describe('createAccount() testing', () => {
		beforeEach(() => {
			global.alert = jest.fn();
		});

		test('createAccount() should call alert', () => {
			const response = {
				status: 'ok'
			};

			signInFormTracking.createAccount(response);
			expect(global.alert).toHaveBeenCalled();
		});

		test("createAccount() shouldn't call alert", () => {
			const response = {
				status: '500'
			};

			signInFormTracking.createAccount(response);
			expect(global.alert).not.toHaveBeenCalled();
		});
	});

	describe('button should be locked/unlocked', () => {
		test('button should be locked by default', () => {
			expect(signInFormTracking.$submit.is(':disabled')).toBe(true);
		});

		test('button should be unlocked', () => {
			signInFormTracking.unlockSubmitButton();

			expect(signInFormTracking.$submit.is(':disabled')).toBe(false);
		});

		test('button should be locked', () => {
			signInFormTracking.unlockSubmitButton();
			signInFormTracking.lockSubmitButton();

			expect(signInFormTracking.$submit.is(':disabled')).toBe(true);
		});
	});
});
