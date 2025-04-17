import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from '../services/database';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * @description
 * This strategy is used to authenticate users using JWT tokens.
 * It uses the passport-jwt strategy to handle the authentication process.
 * 
 * @usage
 * For every protected route, the JWT token is extracted from the request cookies.
 * 
 * @see https://www.passportjs.org/packages/passport-jwt/
 */
export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => req?.cookies?.jwt || null,
    ]),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await db.user.findUnique({ where: { id: payload.id } });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);