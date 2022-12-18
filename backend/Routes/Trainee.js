const express = require('express');
const { getTrainees, updatePassword, getTrainee, postCourseRegister, updateSolvedExercises, checkExercisesSolvingStatus, checkSolvingStatus, getTraineeCourses, postTrainee, deleteCreditCard, forgotPassword, findExercisesGrade, postCreditCard, checkRegistered, signUp, login, logout, updateCourseProgress, checkCourseProgress, refundCourse, updateTraineeBalance, updateSolvedExam, updateExamGrade, updateExercisesGrade, findExamGrade, findCreditCard } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/', getTrainees);
router.get('/:id', getTrainee);
router.get('/getcourses/:id', getTraineeCourses);
router.patch('/password/:id', updatePassword);
router.post('/add', postTrainee);
router.post('/register/:id', postCourseRegister);
router.post('/findgrade/:id', findExercisesGrade);
router.post('/findtestgrade/:id', findExamGrade);
router.post('/forgot/:id', forgotPassword);
router.post('/addcredit/:id', postCreditCard);
router.post('/checkregister/:id', checkRegistered);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);
router.post('/updatebalance/:id', updateTraineeBalance);
router.post('/updateprogress/:id', updateCourseProgress);
router.post('/courseprogress/:id', checkCourseProgress);
router.post('/updateexamstatus/:id', updateSolvedExam);
router.post('/updateexamgrade/:id', updateExamGrade);
router.post('/updateexercisesgrade/:id', updateExercisesGrade);
router.post('/updateexercisesstatus/:id', updateSolvedExercises);
router.post('/refund/:id', refundCourse);
router.post('/checkstatus/:id', checkSolvingStatus);
router.post('/checkexstatus/:id', checkExercisesSolvingStatus);
router.post('/findcreditcard/:id', findCreditCard);
router.post('/deletecard/:id', deleteCreditCard);


module.exports = router;