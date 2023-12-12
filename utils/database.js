import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB ist already connected!");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "Lets_Bummel",
            useNewUrlParser: true,  // Deprecated since version v5.0.0 of MongoDB driver
            useUnifiedTopology: true // Use the new unified topology based on the legacy Topologies and Core classes.
            })
            
            isConnected = true; 

            console.log("MongoDB connected")
    } catch(error) {
        console.log(error);
    }
}