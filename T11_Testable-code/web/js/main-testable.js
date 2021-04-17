export default class SignInFormTracking {
	constructor() {
		this.$submit = $('#submit');
		this.$login = $('#login');
		this.$password1 = $('#password1');
		this.$password2 = $('#password2');

		this.addListeners();
	}

	addListeners = () => {
		this.$submit.click(this.handleSubmitBtn);
		this.$login.change(this.handleLoginChange);
		this.$password2.change(this.handlePasswordChange);
	};

	handleLoginChange = () => {
		$.get('/checkLogin/' + this.$login.val(), this.checkLogin);
	};

	handlePasswordChange = () => {
		if (this.$password1.val() === this.$password2.val()) {
			return this.makePasswordFieldValid();
		}

		return this.makePasswordFieldInvalid();
	};

	handleSubmitBtn = (e) => {
		e.preventDefault();
		$.post('/createAccount', $('#create-account-form').serialize(), this.createAccount);
	};

	checkLogin = (response) => {
    if (response.status.indexOf('alright') >= 0) {
			return this.makeLoginValid();
		}

		return this.makeLoginInvalid();
	};

	makeLoginValid = () => {
		this.$login.css({
			'border-color': '#0c0'
		});
		this.$login.valid = true;

		if (this.$password1.valid) {
			return this.unlockSubmitButton();
		}
	};

	makeLoginInvalid = () => {
		this.$login.css({
			'border-color': '#c00'
		});
		this.$login.valid = false;

		this.lockSubmitButton();
	};

	makePasswordFieldValid = () => {
		this.$password2.css({
			'border-color': '#0c0'
		});

		this.$password1.valid = true;

		this.unlockSubmitButton();
	};

	makePasswordFieldInvalid = () => {
		this.$password2.css({
			'border-color': '#c00'
		});

		this.$password1.valid = false;
		this.lockSubmitButton();
	};

	createAccount = (response) => {
		if (response.status === 'ok') {
			alert('Account Created Successfully');
		}
	};

	lockSubmitButton = () => {
		this.$submit.attr('disabled', 'disable');
	};

	unlockSubmitButton = () => {
		this.$submit.removeAttr('disabled');
	};
}

const signInFormTracking = new SignInFormTracking();
