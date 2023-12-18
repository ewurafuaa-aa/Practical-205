const express = require('express');
const router = express.Router();
const Encounter = require('../models/encounter');

router.post('/', async (req, res) => {
  try {
    const {patientId, date, time, type} = req.body;
    
    const encounter = new Encounter({
      patientId,
      date,
      time,
      type
    });
    
    const savedEncounter = await encounter.save();

    res.status(201).json(savedEncounter);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while starting the encounter.'});
  }
});


router.get('/', async (req, res) => {
  try{
    const encounters = await Encounter.find();

    res.json(encounters);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while retrieving the encounter list.'});
  }
});


router.get('/:id', async (req, res) => {
  try{
    const encounterId = req.params.id;
    
    const encounter = await Encounter.findById(encounterId);

    if(!encounter) {
      return res.status(404).json({error: 'Encounter not found.'});
    }

    res.json(encounter);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while retrieving the encounter details.'});
  }
});


router.put('/:id', async (req, res) => {
  try{
    const encounterId = req.params.id;
    const updatedEncounterData = req.body;
    
    const updatedEncounter = await Encounter.findByIdAndUpdate(encounterId, updatedEncounterData, {new: true});

    if(!updatedEncounter){
      return res.status(404).json({ error: 'Encounter not found.' });
    }

    res.json(updatedEncounter);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while updating the encounter details.'});
  }
});


router.delete('/:id', async(req, res) => {
  try{
    const encounterId = req.params.id;

    const deletedEncounter = await Encounter.findByIdAndDelete(encounterId);

    if(!deletedEncounter) {
      return res.status(404).json({error: 'Encounter not found.'});
    }

    res.json(deletedEncounter);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while deleting the encounter.'});
  }
});

module.exports = router;