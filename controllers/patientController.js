const Patient = require('../models/patient');

exports.registerPatient = async(req, res) => {
  const {
    patientId,
    surname,
    otherNames,
    gender,
    phoneNumber,
    residentialAddress,
    emergencyName,
    emergencyContact,
    relationshipWithPatient,
  } = req.body;

  try {
    const newPatient = await Patient.create({
      patientId,
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyName,
      emergencyContact,
      relationshipWithPatient,
    });
    res.status(201).json(newPatient);
  } catch(error) {
    res.status(500).json({error: 'Error registering a new patient'});
  }
};


exports.getAllPatients = async(req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving patients' });
  }
};


exports.getPatientById = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving patient details' });
  }
};


exports.updatePatient = async(req, res) => {
  const {patientId} = req.params;
  const {
    surname,
    otherNames,
    gender,
    phoneNumber,
    residentialAddress,
    emergencyName,
    emergencyContact,
    relationshipWithPatient,
  } = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      {
        surname,
        otherNames,
        gender,
        phoneNumber,
        residentialAddress,
        emergencyName,
        emergencyContact,
        relationshipWithPatient,
      },
      {new: true}
    );
    if(!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Error updating patient details' });
  }
};

exports.deletePatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if(!deletedPatient) {
      return res.status(404).json({error: 'Patient not found'});
    }
    res.status(200).json({message: 'Patient deleted successfully'});
  } catch (error) {
    res.status(500).json({error: 'Error deleting patient'});
  }
};