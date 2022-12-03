const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, filterCourses, postInstructor, postInstructorReview, getInstructorRating } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor);

// Post an instructor
router.get('/add', postInstructor);

// GET all courses the instructors give
router.get('/filter', filterCourses);

// DELETE an instructor
router.delete('/:id', deleteInstructor);

router.patch('/changeInfo/:id', updateInstructor);

//router.post('/addPromotion/:id', addPromotion);

// POST a new Review
router.post('/review/:id', postInstructorReview);

// GET a single Course's rating 
router.get('/rating/:id', getInstructorRating);

module.exports = router;