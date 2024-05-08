const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://faixafaisal:faizafaisal124567890@cluster0.535dh1l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;
