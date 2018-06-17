import passport from 'passport';

import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import config from '../../../config/config';

import User from '../model';


const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.JWT_SECRET
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(e) {
        return done(e, false);
    }
});

passport.use(jwtStrategy);
