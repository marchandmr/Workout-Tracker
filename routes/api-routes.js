var db = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {

        db.workout.aggregate([{
            $addFields: {
                "totalDuration": {
                    $sum: "$exercises.duration"
                },
                "duration": "exercises.duration"
            }
        }],
            (err, data) => {
                if (err) {
                    console.log(data)
                    res.send(err)
                } else {
                    console.log(data)
                    res.send(data)
                }
            });
    })


    app.post("/api/workouts", function (req, res) {
        db.workout.create({})
            .then(function (dbWorkout) {
                res.json(dbWorkout);
            })
    })

    app.put("/api/workouts/:id", function (req, res) {
        db.workout.findByIdAndUpdate({ _id: req.params.id },
            {
                $push: { exercises: req.body },
            },
            { new: true }
        )
            .then(function (dbWorkout) {
                res.json(dbWorkout);
                console.log(req.body)
            })
    })

    app.get("/api/workouts/range", function (req, res) {
        db.workout.find({})
            .then(function (dbWorkout) {
                res.json(dbWorkout);
            })
    })

};