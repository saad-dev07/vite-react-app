import express from 'express';
import sql from 'mssql';
import bcrypt from 'bcrypt';
import multer from 'multer';
import config from './config.js';

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets/img/user/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

const router = express.Router();

// Register Code
router.post('/Register', upload.single('image'), (req, res) => {
    const userData = req.body;
    const fullName = userData.f_name + " " + userData.l_name;
    const username = userData.email;
    const imagePath = req.file ? req.file.path : null;
    const imageName = req.file ? req.file.filename : null;

    if (userData.password !== userData.c_password) {
        return res.status(400).json({ error: 'Password and confirm password do not match' });
    }

    bcrypt.hash(userData.password, 10, async (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error while hashing password!' });
        }
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('FirstName', sql.NVarChar, userData.f_name)
                .input('LastName', sql.NVarChar, userData.l_name)
                .input('Email', sql.NVarChar, userData.email)
                .input('ContactNo', sql.NVarChar, userData.contact_no)
                .input('Password', sql.NVarChar, userData.password)
                .input('C_Password', sql.NVarChar, userData.c_password)
                .input('FullName', sql.NVarChar, fullName)
                .input('Username', sql.NVarChar, username)
                .input('PasswordHash', sql.NVarChar, hashedPassword)
                .input('ImagePath', sql.NVarChar, imagePath)
                .input('ImageName', sql.NVarChar, imageName)
                .query(`INSERT INTO Users (ProfileImage, FirstName, LastName, Email, ContactNo, Password, ConfirmPassword, FullName, Username, PasswordHash, ProfileImagePath)
                        OUTPUT INSERTED.UserId
                        VALUES (@ImageName, @FirstName, @LastName, @Email, @ContactNo, @Password, @C_Password, @FullName, @Username, @PasswordHash, @ImagePath)`);

            if (!result.recordset || result.recordset.length === 0) {
                throw new Error('User insertion failed, no UserId returned.');
            }

            const userId = result.recordset[0].UserId;
            const insertRoleResult = await pool.request()
                .input('UserId', sql.Int, userId)
                .input('UserRole', sql.NVarChar, userData.userRole)
                .query("INSERT INTO UserRoles (UserId, UserRole) VALUES (@UserId, @UserRole)");

            res.status(200).json({ message: 'Registration successful' });
        }
        catch (error) {
            console.error('Error inserting data to DB:', error);
            res.status(500).json({ error: 'Internal server error while entering user data or role.' });
        }
    });
});

export default router;
