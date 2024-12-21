//Packages
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/database.config'
import cors from 'cors'



//initialize 
dotenv.config({ path: __dirname+'/.env'});


//variables 
const PORT = 5000
const app = express()

//To render Data
app.use(express.json())

//cors
app.use(cors({
    origin :['http://localhost:8002','http://localhost:8001'],
    credentials: true 
}))

// import Routes
import routes from './routes/index.route'


//Routes
app.use('/api', routes)

//server listening
const startServer = async () => {
    await connectDB(); 
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer()

