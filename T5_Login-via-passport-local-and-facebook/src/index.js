const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const handlebars = require('express-handlebars');
const dotenv = require('dotenv');

const facebookRoutes = require('./routes/facebook.route');
const mainRoutes = require('./routes/main.route');

dotenv.config();

require('./config/passport');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	cookieSession({
		name: 'facebook-auth-session',
		keys: [ 'key1', 'key2' ]
	})
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars({ defaultLayout: 'welcome' }));
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'handlebars');

app.use('/api/facebook', facebookRoutes);
app.use('/', mainRoutes);



async function start() {
  try {
    await mongoose.connect(
      process.env.CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );

    app.listen(port, () => {
      console.log(`Task5 app listening at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start()


