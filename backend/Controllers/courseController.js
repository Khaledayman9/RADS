const Course = require('../Models/courseModel');
const Instructor = require('../Models/instructorModel');
const mongoose = require('mongoose');

// GET all courses
const getCourses = async(req, res) => {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.status(200).json(courses);
}

// GET a single course
const getCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findById(id)
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}


const getCourseByInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course that has an Instructor with the corresponding id.' });
    }
    const course = await Course.find({ instructor: id }).sort({ createdAt: -1 });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

// const filterCourse = async(req, res) => {
//     const courseId = req.query.courseId;
//     if (courseId) {
//         const result = await Course.find({ _id: mongoose.Types.ObjectId(courseId) }).populate('_id');
//         res.status(200).json(result)
//     } else {
//         res.status(400).json({ error: "courseId is required" })
//     }
// }


// POST new course
const postCourse = async(req, res) => {
    const { courseTitle, subtitles, price, shortSummary, subject, totalHours, instructor, courseExercises, coursePreview } = req.body;
    try {
        const course = await Course.create({
            courseTitle,
            subtitles,
            price,
            shortSummary,
            subject,
            totalHours,
            instructor,
            courseRating: { rating: 0, ratersCount: 0 },
            courseExercises,
            coursePreview
        });
        res.status(200).json({ message: "Course added successfully", message: "Course info" + course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE a course
const deleteCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

// UPDATE a course
const updateCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

//add a review to a course
const postCourseReview = async(req, res) => {
    const { traineeRating, traineeReview, traineeId, corpTraineeId } = req.body;
    const newReview = {
        reviews: {
            traineeRating: traineeRating,
            traineeReview: traineeReview,
            traineeId: traineeId,
            corpTraineeId: corpTraineeId
        }

    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const course = await Course.findById({ "_id": id })
        const currentOverallRating = course.courseRating.rating;
        let currentRatingCount = course.courseRating.ratersCount;
        const newOverallRating = (currentOverallRating * currentRatingCount + traineeRating) / (currentOverallCount + 1);
        currentRatingCount += 1;
        course.courseRating.rating = newOverallRating;
        course.courseRating.ratersCount = currentRatingCount;
        await course.save();
        const dbResp = await Course.findOneAndUpdate({ "_id": id }, { $push: newReview }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newReview);
        } else {
            res.status(400).json({ message: 'Not able to update reviews' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET a single course rating
const getCourseRating = async(req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const course = await Course.findById({ "_id": id })
    currentOverallRating = course.courseRating.rating
    res.status(200).json("Course Rating is: " + currentOverallRating)
}


const updateCourseReview = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}


// GET all courses
const getRatings = async(req, res) => {
    const ratings = await courseRating.find({}).sort({ createdAt: -1 });
    res.status(200).json(ratings);
}

// GET a single course
const getRating = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a rating for the corresponding id.' });
    }
    const rating = await courseRating.findById(id)
    if (!rating) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(rating);
}


// DELETE a course
const deleteReview = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

// UPDATE a course
const updateReview = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const review = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!review) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json({ message: "Review added successfully", message: "Review info" + review });
}

// Export the functions
module.exports = {
    getCourses,
    getCourse,
    postCourse,
    deleteCourse,
    updateCourse,
    getCourseByInstructor,
    postCourseReview,
    getCourseRating
}