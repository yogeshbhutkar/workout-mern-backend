require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const workoutRoutes = require("./routes/workouts")
const cors = require('cors')



const app = express()

app.use(cors())

//middleware
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts/', workoutRoutes)

//routes
app.get("/", (req, res) => {
    res.json({msg: "This is the message"})
})

//Connecting to MongoDB.
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //Listening for requests
        app.listen(process.env.PORT, () => {
            console.log("Listening on port 4000")
        })
    })
    .catch((err)=>{
        console.log(err)
    })


