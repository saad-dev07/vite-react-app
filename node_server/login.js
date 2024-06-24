import express from 'express';
import sql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config.js';

const router = express.Router();

// Login
router.post('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.NVarChar, req.body.email)
            .input('password', sql.NVarChar, req.body.password)
            .query('SELECT * FROM Users WHERE Email = @email');

        if (result.recordset.length > 0) {
            const userData = result.recordset[0];
            const passwordMatch = await bcrypt.compare(req.body.password.toString(), userData.PasswordHash);
            if (passwordMatch) {
                const userId = userData.UserId;
                const getUserRole = await pool.request().input('UserId', sql.Int, userId).query('SELECT UserRole FROM UserRoles WHERE UserId = @UserId');
                if(getUserRole.recordset.length > 0){
                    const userRole = getUserRole.recordset[0].UserRole;
                    if(userData.LoginCounter === 0){
                        return res.status(200).json({ message: 'First login, please reset your password', resetPassword: true });
                    } else {
                        const token = jwt.sign({ name: userData.FullName, email: req.body.email, role: userRole }, "jwt-secret-key", { expiresIn: '2h' });
                        res.cookie('token', token);
                        return res.status(200).json({ message: 'Login successful!', role: userRole });
                    }
                } else {
                    return res.status(404).json({ error: "User role not found!" });
                }
            } else {
                return res.status(400).json({ error: "Password not matched!" });
            }
        } else {
            return res.status(404).json({ error: "Incorrect email or password!" });
        }
    }
    catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ error: "Login error in server!" });
    }
});

// Verifying through JWT Token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ error: "You are not authenticated." });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ error: "Token is not correct!" });
            } else {
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        });
    }
};
router.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
});

export default router;
