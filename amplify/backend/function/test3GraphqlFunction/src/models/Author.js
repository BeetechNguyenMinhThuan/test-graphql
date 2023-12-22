import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        name: String,
        age: Number
    },
    {
        timestamps: true,
    }
);

export const Author = mongoose.model("Author", authorSchema);
