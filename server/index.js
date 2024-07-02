const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const projectRoutes = require('./routes/project.js');
const teamRoutes = require('./routes/teams.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = process.env.PORT || 8700;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    });
};


app.use(express.json())
// app.enable('trust proxy'); // optional, not needed for secure cookies
// app.use(express.session({
//     secret : '123456',
//     key : 'sid',
//     proxy : true, // add this when behind a reverse proxy, if you need secure cookies
//     cookie : {
//         secure : true,
//         maxAge: 5184000000 // 2 months
//     }
// }));
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/team", teamRoutes)
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";        
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(port,()=>{
    console.log("Connected")
    connect();
})
