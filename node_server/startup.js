import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const router = express.Router();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["https://pronet-application.vercel.app/", "http://localhost:5173"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}));
router.use((req, res, next) => {
    console.log("MIDDLEWARE!");
    next();
});

// Register Router
import registerRouter from './register.js';
app.post('/Register', registerRouter);

// Login Router
import loginRouter from './login.js';
app.use('/', loginRouter);

// Password Reset
import resetRouter from './reset.js';
app.post('/ResetPassword', resetRouter);

// Logout
import logoutRouter from './logout.js';
app.get('/Logout', logoutRouter);

// Fetching /Roles, /GetUserData, /GetRecordingsData
import fetchdataRouter from './fetchdata.js';
app.get('/Roles', fetchdataRouter);
app.get('/GetUserData', fetchdataRouter);
app.get('/GetRecordingsData', fetchdataRouter);

// Edit/Delete User
import editdeleteRouter from './editdelete.js';
app.delete('/Delete', editdeleteRouter);

// Defining PORT
const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log("Server is running at PORT: " + port);
});
