// const mongoose = require('mongoose');
import {connect} from "mongoose";

export default async function dbConnection(){
    try {
        console.log(process.env.MONGO_CNN);
        await connect(process.env.MONGO_CNN);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}