const mongoose = require("mongoose");
const { Schema } = mongoose;

var workoutPlan = new Schema({
    day: {
        type: Date,
        default: Date
    },
    exercises: [{
        name: {
            type: String
        },
        type: {
            type: String
        },
        weight:
        {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        duration:
        {
            type: Number
        },
        distance:
        {
            type: Number
        }
    }]

},
    { toJSON: { virtuals: true } });

workoutPlan.virtual("totalDuration").get(function () {
    return this.exercises.reduce((allDurations, exercise) => {
        console.log(allDurations + exercise.duration);
        return allDurations + exercise.duration
    }, 0);

})

const Workout = mongoose.model("Workout", workoutPlan);

module.exports = Workout;