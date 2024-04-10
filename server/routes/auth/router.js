const router = require("express").Router();
const passport = require("passport");
const config = require("../../../config.js");

router.get('/referral/:referralId', (req, res) => {
    const referralId = req.params.referralId;
    req.session.referralId = referralId;
    res.redirect('/index');
});


router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth',
        failureFlash: true
    }), (req, res) => {
        if (req.header('user-agent').indexOf('Mobile') != -1) {
            return res.redirect('/index');
        } else {
            return res.redirect('/index');
        }
    });

router.use('/google',
    passport.authenticate('google', {
        scope:
            ['profile', 'email']
    }
    ));



router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: "/auth",
        failureFlash: true
    }), (req, res) => {
        /*return res.json({
            status: true,
            data: jwt.generate(req.user.user_id)
        });*/
        if (req.header('user-agent').indexOf('Mobile') != -1) {
            return res.redirect('/index');
        } else {
            return res.redirect('/index');
        }

    });

router.use('/facebook',
    passport.authenticate('facebook', {
        scope:
            ['gaming_profile' , 'email']
    }
    ));

router.post('/login',
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: false, message: 'SERVER_ERROR' });
            }
            if (!user) {
                return res.status(401).json({ status: false, message: 'WRONG_PASS' });
            }
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    console.log(loginErr);
                    return res.status(500).json({ status: false, message: 'SERVER_ERROR' });
                }
                return res.status(200).json({ status: true, message: 'LOGGED_IN' });
            });
        })(req, res, next);
    }
);


module.exports = router;