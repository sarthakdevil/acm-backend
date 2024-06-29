import jwt from 'jsonwebtoken';

// Generate JWT token
export function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to verify JWT token
export function verifyToken(req, res, next) {
    const token = req.cookies && req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}
