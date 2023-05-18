bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');

const User = require('../models/user')

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        console.log(existingUser);

        if (!existingUser) {
            res.status(404).json({ message: 'USer does not exist' });
        }

        const isPasswordConfirmed = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordConfirmed) {
            res.status(400).json({ message: 'Invalid Password' });
        }

        // here test is secret key

        const token = jwt.sign({ email: existingUser.email, Id: existingUser._id }, 'test', { expiresIn: '10s' });
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    console.log(email);

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: 'USer already exists' });
        }
        if (password !== confirmPassword)
            res.status(400).json({ message: 'Passwords do not match' })

        // 12 - level of difficulty - salt length
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, Id: result._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = { signin, signup }