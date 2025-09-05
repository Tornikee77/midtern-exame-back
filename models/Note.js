const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    content: { type: String },
    status: { type: String, default: "active" },
    tags: { type: [String] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
