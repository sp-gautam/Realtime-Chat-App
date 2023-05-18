import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // console.log(req)
    // console.log(req.cookies.jwtToken, res);
    const token =
        req.cookies.jwtToken || req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.username = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

// module.exports = verifyToken;

export default verifyToken;