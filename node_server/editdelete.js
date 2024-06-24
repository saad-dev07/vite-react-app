import express from 'express';
import sql from 'mssql';
import 'cors';
import config from './config.js';

const router = express.Router();

router.delete('/Delete', async (req, res) => {
    const { UserId } = req.query; // or req.body if you are sending it in the request body

    if (!UserId) {
        return res.status(400).json({ message: "UserId is required" });
    }

    try {
        const pool = await sql.connect(config);

        // First delete from Users table
        const resultUsers = await pool.request()
            .input('userId', sql.Int, UserId)
            .query("DELETE FROM Users WHERE UserId = @userId");

        // Then delete from UserRoles table
        const resultUserRoles = await pool.request()
            .input('userId', sql.Int, UserId)
            .query("DELETE FROM UserRoles WHERE UserId = @userId");

        // Check if either query affected rows
        if (resultUsers.rowsAffected[0] > 0 || resultUserRoles.rowsAffected[0] > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).json({ message: "Deletion error in server", error });
    }
});

export default router;

// import express from 'express';
// import sql from 'mssql';
// import 'cors';
// import config from './config.js';

// const router = express.Router();

// router.delete('/Delete', async (req, res) => {
//     const { UserId } = req.query; // or req.body if you are sending it in the request body

//     if (!UserId) {
//         return res.status(400).json({ message: "UserId is required" });
//     }

//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request()
//             .input('userId', sql.Int, UserId) // Assuming userId is an integer. Adjust the type if necessary.
//             .query("DELETE * FROM Users WHERE UserId = @userId", "DELETE * FROM UserRoles WHERE UserId = @userId");

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "User deleted successfully" });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         console.error("Error deleting user: ", error);
//         res.status(500).json({ message: "Deletion error in server", error });
//     }
// });

// export default router;
