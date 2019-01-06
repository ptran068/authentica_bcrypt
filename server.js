import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import router from './index';
import mongoose from 'mongoose'
import mongodb from 'mongodb';

const db = mongoose.connection;

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use((e, req, res, next) => {
	return res.status(400).json({
		isSuccess: false,
		message: e.message || 'Have error', // Get message from new Error()
		error: e.stack || e
	})
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
module.exports = app;