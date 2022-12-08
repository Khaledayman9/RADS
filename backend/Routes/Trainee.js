const express = require('express');
const { getTrainees, updatePassword, postCourseRegister, getTrainee, getTraineeCourses, postTrainee, forgotPassword, postCourseGrade, findOldGrade, signUp,login,logout } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/', getTrainees);
router.get('/:id', getTrainee);
router.post('/add', postTrainee);
router.get('/getcourses/:id', getTraineeCourses);
router.patch('/password/:id', updatePassword);
router.post('/register/:id', postCourseRegister);
router.post('/update/:id', postCourseGrade);
router.post('/findgrade/:id', findOldGrade);
router.post('/forgot/:id', forgotPassword);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;