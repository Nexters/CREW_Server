import express from "express";
import passport from "passport";
import { db }from "../../app";

const router = express.Router();
interface userInfo {
  member_provider: String,
  member_provider_number: String
}

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('I am auth router');
});

passport.serializeUser((user: userInfo, done) => {
  done(null, `${user.member_provider}:${user.member_provider_number}`)
});

passport.deserializeUser((str: String, done) => {
  const [member_provider, member_provider_number] = str.split(':');
  db.User.findOne({where: {member_provider: member_provider, member_provider_number: member_provider_number}})
    .then((user) => {
      if(user) {
        done(null, user);
      } else {
        done(new Error('해당 정보와 일치하는 사용자가 없습니다.'));
      }
    })
});

export default router;