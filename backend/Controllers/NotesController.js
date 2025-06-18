const noteModel = require("../models/Notes");
const { encrypt, decrypt } = require("../utils/crypto");

const addNotes = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const newNotes = new noteModel({
      title: encrypt(title),
      category: encrypt(category),
      content: encrypt(content),
    });
    await newNotes.save();
    res.status(200).json({ message: 'Note added successfully', success: true });
  } catch (error) {
    console.error("Error in adding note:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content } = req.body;

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      {
        title: encrypt(title),
        category: encrypt(category),
        content: encrypt(content),
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found", success: false });
    }

    res.status(200).json({ message: 'Note updated successfully', success: true });
  } catch (error) {
    console.error("Error in updating note:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await noteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found", success: false });
    }

    res.status(200).json({ message: "Note deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const allNotes = await noteModel.find();

    if (allNotes.length === 0) {
      return res.status(404).json({ message: "No notes found", success: false });
    }

    const decryptedNotes = allNotes.map(note => ({
      _id: note._id,
      title: decrypt(note.title),
      category: decrypt(note.category),
      content: decrypt(note.content),
    }));

    res.status(200).json({
      message: "Notes retrieved successfully",
      success: true,
      data: decryptedNotes
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found", success: false });
    }

    const decryptedNote = {
      _id: note._id,
      title: decrypt(note.title),
      category: decrypt(note.category),
      content: decrypt(note.content),
    };

    res.status(200).json({
      message: "Note retrieved successfully",
      success: true,
      data: decryptedNote
    });
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  addNotes,
  updateNotes,
  deleteNotes,
  getAllNotes,
  getNoteById
};
