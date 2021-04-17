const mongoose = require('mongoose');

const uri = 'mongodb+srv://dimas:QyezJ0xXtgjGZIJ6@cluster0.ridvs.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
