import express from 'express';
import sql from 'mssql';
import config from './config.js';

const router = express.Router();

// Fetch Roles
router.get('/Roles', async (req, res) => {
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Roles');

        res.status(200).json(result.recordset);
    }
    catch(error){
        console.error("Error fetching roles: "+error);
        res.status(500).json({error: "Internal server error while fetching roles"});
    }
});

// Fetch User Data
router.get('/GetUserData', async (req, res) => {
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Users');

        if(result.recordset.length > 0){
            const data = result.recordset;
            res.status(200).json({message: 'Fetching Successful', userData: data});
        }
    }
    catch(error){
        console.error("Error fetching users data: "+error);
        res.status(500).json({error: "Internal server error while fetching users data"});
    }
});

// Fetch Recordings Data
router.get('/GetRecordingsData', async (req, res) => {
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM Recordings");

        if(result.recordset.length > 0){
            const data = result.recordset;
            res.status(200).json({message: 'Fetching Successful', recordingsData: data});
        }
    }
    catch(error){
        console.error("Error fetching recordings data: "+error);
        res.status(500).json({error: "Internal server error while fetching recordings data"});
    }
});

export default router;