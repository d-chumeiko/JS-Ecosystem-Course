const nodemailer = require('nodemailer');

const sendEmail = async (mail) => {
	const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'merl26@ethereal.email',
        pass: 'JJTPvZayZRVWQPNSsW'
    }
});

	let result = await transporter.sendMail({
		from: '"Node js" <nodejs@example.com>',
		to: mail,
		subject: 'Message from Node js',
		text: 'Your account was successfully created!'
	});

	console.log('Message was sent');
};

module.exports = sendEmail;
