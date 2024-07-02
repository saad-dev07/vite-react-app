import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    
    console.log("Cookies in verifyUser.js: ", req.cookies);
    // console.log("Token in verifyUser.js (_vercel_jwt): ", req.cookies._vercel_jwt);
    console.log("Token in verifyUser.js in front-end: ", token);

    if (!token) {
        return res.status(401).json({ error: "You are not authenticated." });
    } else {
        jwt.verify(token, "pronet-jwt-key", (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Token is not correct!" });
            } else {
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        });
    }
};

export default verifyUser;