const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// Route: POST /patients
// Description: Register a new patient
router.post('/', async (req, res) => {
  try {
    // Extract patient data from the request body
    const { patientId, surname, othernames, gender, phoneNumber, residentialAddress, emergencyName, emergencyContact, emergencyRelationship } = req.body;

    // Create a new patient record
    const patient = new Patient({
      patientId,
      surname,
      othernames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyName,
      emergencyContact,
      emergencyRelationship
    });

    // Save the patient record to the database
    const savedPatient = await patient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the patient.' });
  }
});

// Route: GET /patients
// Description: Get a list of all patients
router.get('/', async (req, res) => {
  try {
    // Fetch all patient records from the database
    const patients = await Patient.find();

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the patient list.' });
  }
});

// Route: GET /patients/:id
// Description: Get details of a specific patient
router.get('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;

    // Fetch the patient record from the database based on the provided patientId
    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the patient details.' });
  }
});

// Route: PUT /patients/:id
// Description: Update details of a specific patient
router.put('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const updatedPatientData = req.body;

    // Find the patient record based on the provided patientId and update it with the new data
    const updatedPatient = await Patient.findOneAndUpdate({patientId}, updatedPatientData, {new: true});

    if (!updatedPatient) {
      return res.status(404).json({error: 'Patient not found.'});
    }

    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while updating the patient details.'});
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    
    const deletedPatient = await Patient.findOneAndDelete({patientId});

    if (!deletedPatient) {
      return res.status(404).json({error: 'Patient not found.'});
    }

    res.json(deletedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while deleting the patient.'});
  }
});

module.exports = router;