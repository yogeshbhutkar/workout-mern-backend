const workoutModel = require("../models/workout")
const mongoose = require("mongoose")

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await workoutModel.find({}).sort({createdAt: -1})
    
    return res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    
    const workout = await workoutModel.findById(id)
    
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }
    
    return res.status(200).json(workout)
}


//create a workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    
    try {
        const workout = await workoutModel.create({title, load, reps})
        
        return res.status(200).json(workout)
    }catch(err){
        
        return res.status(400).json({error: err.message})
    
    }
}


//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"})
    }
    
    const workout = await workoutModel.findOneAndDelete({_id: id})
    
    if (!workout){
        return res.status(400).json({error: "No workout found"})
    }
    
    return res.status(200).json(workout);
}



//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"})
    }
    
    const workout = await workoutModel.findOneAndUpdate({ _id: id },{ ...req.body })
    
    if (!workout){
        return res.status(400).json({error: "No workout found"})
    }
    
    return res.status(200).json(workout)
}

module.exports = { createWorkout, getWorkout, getWorkouts, updateWorkout, deleteWorkout }