import express from 'express';
import bodyParser from 'body-parser';
import user from './routers/user';
import group from './routers/group';
import message from './routers/message';
import mongoose from 'mongoose';
import config from './config/development';

// const db = mongoose.connection;

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(config.db, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user);
app.use(group);
app.use(message);

app.use((e, req, res, next) => {
	return res.status(400).json({
		isSuccess: false,
		message: e.message || 'Have error', // Get message from new Error()
		error: e.stack || e
	});
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
module.exports = app;