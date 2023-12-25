import mongoose from "mongoose";
import {server} from "./graphql/schema/schema.js";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://thuanbin1108:delamgi1@learngraphql.brr9apm.mongodb.net/?retryWrites=true&w=majority")
        console.log("MongooseDB connected")
    } catch (err) {
        console.log(err)
    }
}
connectDB()
console.log(123123);
export const handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
})