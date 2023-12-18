const Encounter = require('../models/encounter');

exports.startEncounter = async (req, res) => {
  const{patientId, dateTime, encounterType} = req.body;

  try{
    const newEncounter = await Encounter.create({
      patientId,
      dateTime,
      encounterType,
    });
    res.status(201).json(newEncounter);
  } catch(error) {
    res.status(500).json({error: 'Error starting a new encounter'});
  }
};

exports.getPatientEncounters = async(req, res) => {
  const {patientId} = req.params;

  try{
    const encounters = await Encounter.find({patientId});
    res.status(200).json(encounters);
  } catch(error) {
    res.status(500).json({error: 'Error retrieving patient encounters'});
  }
};

exports.getEncounterById = async(req, res) => {
  const{encounterId} = req.params;

  try{
    const encounter = await Encounter.findById(encounterId);
    if(!encounter) {
      return res.status(404).json({error: 'Encounter not found'});
    }
    res.status(200).json(encounter);
  } catch(error) {
    res.status(500).json({error: 'Error retrieving encounter details'});
  }
};


exports.updateEncounter = async(req, res) => {
  const {encounterId} = req.params;
  const {dateTime, encounterType} = req.body;

  try{
    const updatedEncounter = await Encounter.findByIdAndUpdate(
      encounterId,
      {dateTime, encounterType},
      {new: true}
    );
    if(!updatedEncounter) {
      return res.status(404).json({error: 'Encounter not found'});
    }
    res.status(200).json(updatedEncounter);
  } catch(error) {
    res.status(500).json({error: 'Error updating encounter details'});
  }
};


exports.deleteEncounter = async(req, res) => {
  const {encounterId} = req.params;

  try{
    const deletedEncounter = await Encounter.findByIdAndDelete(encounterId);
    if(!deletedEncounter) {
      return res.status(404).json({error: 'Encounter not found'});
    }
    res.status(200).json({message: 'Encounter deleted successfully'});
  } catch(error) {
    res.status(500).json({error: 'Error deleting encounter'});
  }
};