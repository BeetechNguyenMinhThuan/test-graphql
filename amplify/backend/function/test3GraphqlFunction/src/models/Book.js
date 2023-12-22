import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: String,
        genre: String,
        authorId: String
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model("Book", bookSchema);
