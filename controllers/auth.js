const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide name and password');
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError('User email is not valid');
	}
	const isPasswordCorrect = await user.comparePasswords(password);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid credetials');
	}
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
