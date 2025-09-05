const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;
    let filter = {};
    if (tag) {
      filter.tags = tag;
    }
    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.create({ title, content, tags });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id/archive", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id/tags", async (req, res) => {
  try {
    const { tags } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { tags: { $each: tags } } },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/status/:status", async (req, res) => {
  try {
    const notes = await Note.find({ status: req.params.status });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
