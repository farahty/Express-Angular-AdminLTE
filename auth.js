var jwtStrategy = require('passport-jwt').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var githubStrategy = require('passport-github2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config.js');
var jwt = require('jsonwebtoken');

module.exports = function (passport, app, User) {
    app.get('/401', function (req, res) {
        return res.status(401).json({
            error: true,
            message: 'unauthrized routes.'
        });
    });
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    app.use(function (req, res, next) {
        res.locals.login = req.isAuthenticated();
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }

        next();
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/#/login');
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/#/login',
        failureFlash : false
    }));
    //app.post('/login',passport.authenticate('local'));
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
    }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/#/login'
    }));

    app.get('/auth/github', passport.authenticate('github', {
        scope: ['user:email']
    }));
    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/#/login'
    }));
    app.post('/auth', function (req, res) {
        process.nextTick(function () {
            if (!req.body.email || !req.body.password)
                return res.status(401).json({
                    error: true,
                    message: 'username and password is required.'
                });
            User.findOne({
                email: req.body.email
            }, function (error, user) {
                if (error) {
                    res.status(401).json({
                        error: true,
                        message: 'Error while retriving data.'
                    });
                } else if (!user) {
                    res.status(401).json({
                        error: true,
                        message: 'Username not available.'
                    });
                } else if (!user.verifyPasswordSync(req.body.password)) {
                    res.status(401).json({
                        error: true,
                        message: 'Invalid Password.'
                    });
                } else {
                    user.password = null;
                    res.json({
                        error: false,
                        message: 'Token Created Successfully.',
                        user: user,
                        token: jwt.sign({
                            data: user
                        }, config.secret, {
                            expiresIn: '1h'
                        })
                    });
                }
            });
        });
    });

    passport.use('local-login',new LocalStrategy(config.local, function (req, email, password, done) {
        process.nextTick(function () {
            console.log('local auth');
            if (!email || !password)
                return res.status(401).json({
                    error: true,
                    message: 'username and password is required.'
                });
            User.findOne({
                email: email
            }, function (error, user) {
                if (error) {
                    return done(error, false, req.flash('auth', 'error whiler retriving data.'));
                } else if (!user) {
                    return done(null, false, req.flash('auth', 'Username not available.'));
                } else if (!user.verifyPasswordSync(password)) {
                    return done(null, false, req.flash('auth', 'Invalid Password.'));
                } else {
                    user.password = null;
                    return done(null, user);
                }
            });
        });
    }));


    passport.use(new jwtStrategy({
        secretOrKey: config.secret,
        jwtFromRequest: require('passport-jwt').ExtractJwt.fromAuthHeader()
        }, function (payload, done) {
            User.findOne({
                _id: payload.data._id
            }, function (error, user) {
                if (user) {
                    user.password = null;
                    done(null, user);
                } else {
                    done({
                        error: true,
                        message: 'not verfid token'
                    }, false);
                }
        });

    }));

    passport.use(new facebookStrategy(config.facebook, function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({
                'auth_id': profile.id,
                'auth_type': 'facebook'
            }, function (err, user) {
                if (err) {
                    return done(null , false , err);
                } else {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.password = '202018109';
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.auth_type = 'facebook';
                        newUser.auth_id = profile.id;
                        newUser.avatar = profile.photos[0].value;
                        newUser.auth_token = token;
                        newUser.save(function (err, user) {
                            if (err) {
                               return done(null , false , err);
                            } else {
                                return done(null, user);
                            }
                        });
                    }
                }
            });
        });
    }));

    passport.use(new githubStrategy(config.github, function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({
                'auth_id': profile.id,
                'auth_type': 'github'
            }, function (err, user) {
                if (err) {
                    return done(null , false , err);
                } else {
                    if (user) {
                        return done(null, user);
                    } else {
                        console.log(profile._json);
                        var newUser = new User();
                        newUser.password = '202018109';
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.auth_type = 'github';
                        newUser.auth_id = profile.id;
                        newUser.avatar = profile.avatar_url;
                        newUser.access_token = token;
                        newUser.save(function (err, user) {
                            if (err) {
                                return done(null , false , err);
                            } else {
                               return done(null, user);
                            }
                        });
                    }
                }
            });
        });
    }));
};