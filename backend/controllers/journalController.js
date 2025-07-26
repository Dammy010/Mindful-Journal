const Entry = require('../models/Entry');

const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createEntry = async (req, res) => {
  try {
    const { mood, thoughts, tags } = req.body;
    const entry = await Entry.create({ userId: req.userId, mood, thoughts, tags });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { mood, thoughts, tags } = req.body;
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { mood, thoughts, tags },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
};
