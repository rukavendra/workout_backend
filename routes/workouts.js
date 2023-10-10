const express = require('express')
const {createWorkout, deleteWorkout, getSingleWorkout, updateWorkout, getWorkouts}  = require('../controllers/workouts')
const requireAuth = require('../middleware/authRequired')
const router = express.Router()

// middleware { required auth for all workout routes}
router.use(requireAuth)

router.route('/')
.get(getWorkouts)
.post(createWorkout)


router.route('/:id')
.get(getSingleWorkout)
.delete(deleteWorkout)
.patch(updateWorkout)

module.exports = router