const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  getEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/journalController');

const router = express.Router();

router.use(protect);
router.get('/', getEntries);
router.post('/', createEntry);
router.get('/:id', getEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

module.exports = router;
