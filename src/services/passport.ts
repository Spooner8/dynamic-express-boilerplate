import passport from 'passport';
import { localStrategy } from '../strategies/local.strategy.ts';
import { jwtStrategy } from '../strategies/jwt.strategy.ts';

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;