import express from 'express';
import authRoutes from '../routes/auth.router.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from '../config/passport.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize())

app.use('/api/auth', authRoutes);



export default app;