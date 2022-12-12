const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getTrainees, updatePassword, postCourseRegister, getTrainee, getTraineeCourses, postTrainee, forgotPassword, postCourseGrade, findOldGrade, postCreditCard, checkRegistered, signUp, login, logout } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
getTrainees);

router.get('/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
getTrainee);

router.get('/getcourses/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
getTraineeCourses);

router.patch('/password/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
updatePassword);

router.post('/add',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postTrainee);

router.post('/register/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postCourseRegister);

router.post('/update/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postCourseGrade);

router.post('/findgrade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
findOldGrade);

router.post('/forgot/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
forgotPassword);

router.post('/addcredit/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postCreditCard);

router.post('/checkregister/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
checkRegistered);

module.exports = router;