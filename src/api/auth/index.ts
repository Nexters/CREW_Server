import dotenv from "dotenv"
dotenv.config();

import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import csurf from "csurf";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import jwt from "jsonwebtoken";

import { db }from "../../app";
import { insertReq, insertToken, loginRequired} from "../../middleware";
import { UserAttributes } from "../../models/user";
import { error } from "util";

const GoogleStrategy = require('passport-google-oauth20').Strategy
const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(cookieParser(process.env.SESSION_SECRET))
router.use(expressSession({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
router.use(csurf());
router.use(insertReq);
router.use(insertToken);
router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user: UserAttributes, done) => {
  done(null, `${user.member_provider}:${user.member_provider_number}`)
});

passport.deserializeUser(async (str: String, done) => {
  const [member_provider, member_provider_number] = str.split(':')
  try {
    const user = await db.User.find({where: {member_provider, member_provider_number}})
    if(user) { done(null, user)}  
  } catch (error) {
    console.error(error);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},async (accessToken:any, refreshToken:any, profile:any ,done:any) => {
  const avatar_url = profile.photos[0] ? profile.photos[0].value : null
  try {
    const user = await db.User.find({where: {member_provider: 'google', member_provider_number: profile.id}})
    if(user) {
      done(null, user)
    } else {
      const newUser = await db.User.create({
        member_provider: 'google',
        member_provider_number: profile.id,
        provide_image: avatar_url,
        token: accessToken
      })
      if(newUser) {
        done(null, newUser);
      }
    }
  } catch (error) {
    console.error(error);
    done(error);   
  }
}))

router.get('/', (req: express.Request, res: express.Response) => {
  res.render('auth.pug')
});

router.get('/success', loginRequired, (req: express.Request, res: express.Response) =>{
  const token = jwt.sign({ 'id': req.user.id }, `${process.env.JWT_SECRET}`)
  res.render('success.pug', {
    token,
    'origin': process.env.TARGET_ORIGIN
  })
}); 

router.get('/google', passport.authenticate('google', {scope: ["profile", "email"]}));

router.get('/google/callback', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      // 예상치 못한 예외 발생 시
      return next(err)
    }
    if (!user) {
      // 로그인 실패 시
      return res.redirect(req.baseUrl)
    }
    req.logIn(user, err => {
      // 예상치 못한 예외 발생 시
      if (err) {
        return next(err)
      }
      // 로그인 성공
      res.redirect(`${req.baseUrl}/success`)
    })
  })(req, res, next)
})

export default router;