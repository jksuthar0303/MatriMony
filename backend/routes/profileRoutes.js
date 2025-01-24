const express = require('express');
const { getProfiles, addProfiles } = require('../controllers/profileController');

const router = express.Router();

router.get('/get-profiles', getProfiles);
router.post('/add-profiles', addProfiles);

module.exports = router;
