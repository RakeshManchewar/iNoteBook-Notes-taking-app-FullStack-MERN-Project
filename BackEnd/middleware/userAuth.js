import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(401).send({ error: "1 Please authenticate using a valid token" });
    }

    try {
        const tokenDecode = jwt.verify(token, JWT_SECRET);

        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };
        } else {
            return res.json({ success: false, message: "Not Authorized, LogIn Again" });
        }

        next();
    } catch (error) {
        res.status(401).send({ error: "2 Please authenticate using a valid token" });
    }
}

export default userAuth;