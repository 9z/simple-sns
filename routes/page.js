const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain, renderHashtag } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    console.log('=====================');
    console.log(req.user?.Followers);
    console.log(req.user);
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profiles', isLoggedIn, renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/profile', renderProfile);

router.get('/join', renderJoin);

router.get('/', renderMain);

router.get('/hashtag', renderHashtag);

module.exports = router;