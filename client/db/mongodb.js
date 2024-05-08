import mongoose from 'mongoose'

const mongoDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongo_uri);
        console.log(`MongoDb connected: ${connect.connection.host}`);

    }
    catch (err) {
        console.log('MongoDB connection error: ', err);
        process.exit(1);
    }
}

export default mongoDb;