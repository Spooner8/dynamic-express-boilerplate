/**
 * @fileoverview
 * This file sets up the passport authentication middleware for the application.
 * It imports the necessary strategies and configures passport to use them.
 * It also exports the configured passport instance for use in other parts of the application.
 */

import passport from 'passport';
import { localStrategy } from '../strategies/local.strategy';
import { jwtStrategy } from '../strategies/jwt.strategy';
import { googleStrategy } from '../strategies/google.strategy';

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);

export default passport;