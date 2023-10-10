const Workout = require("../models/workouts");

// creating workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  
  let emptyFields = []

  if(!title) {
    emptyFields.push(title)
  }
  if(!reps) {
    emptyFields.push(reps)
  }
  if(!load) {
    emptyFields.push(load)
  }

  if(emptyFields.length > 0) return res.status(400).json({error: 'Please Fill all The Fields'})

  try {
    const user_id = req.user._id
    const result = await Workout.create({
      title,
      reps,
      load,
      user_id,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// getting all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id
    const results = await Workout.find({ user_id }).sort({createdAt:-1});
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// getting single workout
const getSingleWorkout = async (req, res) => {
    const searchId = req.params.id
  try {
    const results = await Workout.findById(searchId);
    if(!results) return res.status(400).json({error: "No such workout "})
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// deleting workout
const deleteWorkout = async (req, res) => {
    const searchId = req.params.id
  try {
    // const results = await Workout.findByIdAndDelete(searchId);
    const results = await Workout.findOneAndDelete({_id:searchId});
    if(!results) return res.status(400).json({error: "No such workout "})
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// updating workout 
const updateWorkout = async (req, res) => {
    const searchId = req.params.id
  try {
    const results = await Workout.findOneAndUpdate({_id: searchId},{...req.body});
    if(!results) return res.status(400).json({error: "No such workout "})
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createWorkout, getWorkouts, deleteWorkout, updateWorkout, getSingleWorkout };


//  