const Profile = require('../models/Profile');

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles' });
  }
};

const addProfiles = async(req,res)=>{
    try {
        const { name, age, occupation, location, image } = req.body;
    
        // Create a new profile instance
        const newProfile = new Profile({
          name,
          age,
          occupation,
          location,
          image,
        });
    
        // Save the profile to the database
        await newProfile.save();
    
        res.status(201).json({
          message: 'Profile created successfully!',
          profile: newProfile,
        });
      } catch (err) {
        console.error('Error adding profile:', err);
        res.status(500).json({ error: 'Failed to create profile' });
      }
}

module.exports = { getProfiles,addProfiles };
