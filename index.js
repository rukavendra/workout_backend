require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()


//Middle ware
// app.use(cors({
//     origin: 'https://workout-buddy-app-tau.vercel.app',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,

// }))

app.use(cors())


app.use(express.json())

// app.use(cors({
//     origin: true, // allow all origins
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use('/', (req,res)=>res.send("Welcome to Workout Buddy"))

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// route
app.use('/workouts',workoutRoutes)
app.use('/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Access granted"))
.catch(err=>console.log(err))


app.listen(process.env.PORT,()=>console.log("Server running at port ", process.env.PORT))