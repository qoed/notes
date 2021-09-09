import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import { setupPassport } from './config/passport-config.js';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';

import auth from './routes/auth.js';
import notes from './routes/notes.js';
import images from './routes/images.js';

// * Load ENV vars
dotenv.config({ path: './config/.env' });

setupPassport();

const port = 4200;
const app = express();

app.use(
  cors({
    origin: /.*/,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(fileupload());
app.use(helmet());

// * Connect to DB
const clientPromise = connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore.create({
      clientPromise,
      collectionName: 'sessions',
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/files', express.static('static'));
app.use('/api/v1/auth', auth);
app.use('/api/v1/notes', notes);
app.use('/api/v1/images', images);

// Mount custom ErrorHandler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`notes api listening on port ${port}`);
});
