const express = require('express');
const router = express.Router();
const Vitals = require('../models/vital');

router.post('/', async(req, res) => {
  try{
    const { patientId, temperature, bloodPressure, heartRate } = req.body;
    
    const vitals = new Vitals({
      patientId,
      temperature,
      bloodPressure,
      heartRate
    });
    
    const savedVitals = await vitals.save();

    res.status(201).json(savedVitals);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while submitting the vital signs.'});
  }
});


router.get('/:patientId', async(req, res) => {
  try{
    const patientId = req.params.patientId;
    
    const vitals = await Vitals.find({patientId});

    if(!vitals) {
      return res.status(404).json({error: 'Vital signs not found.'});
    }

    res.json(vitals);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while retrieving the vital signs.'});
  }
});


router.get('/:patientId/latest', async(req, res) => {
  try{
    const patientId = req.params.patientId;
    
    const latestVitals = await Vitals.findOne({patientId}).sort({createdAt: -1});

    if(!latestVitals) {
      return res.status(404).json({error: 'Vital signs not found.'});
    }

    res.json(latestVitals);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while retrieving the latest vital signs.'});
  }
});

module.exports = router;