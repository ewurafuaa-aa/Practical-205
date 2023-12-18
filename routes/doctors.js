const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

router.post('/', async(req, res) => {
  try{
    const { firstName, lastName, specialization, phoneNumber, email } = req.body;
    
    const doctor = new Doctor({
      firstName,
      lastName,
      specialization,
      phoneNumber,
      email
    });
    
    const savedDoctor = await doctor.save();

    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while registering the doctor.'});
  }
});


router.get('/', async(req, res) => {
  try{
    const doctors = await Doctor.find();

    res.json(doctors);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while retrieving the doctor list.'});
  }
});


router.get('/:id', async(req, res) => {
  try{
    const doctorId = req.params.id;
    
    const doctor = await Doctor.findById(doctorId);

    if(!doctor) {
      return res.status(404).json({error:'Doctor not found.' });
    }

    res.json(doctor);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while retrieving the doctor details.'});
  }
});


router.put('/:id', async (req, res) => {
  try{
    const doctorId = req.params.id;
    const updatedDoctorData = req.body;
    
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedDoctorData, {new: true});

    if(!updatedDoctor) {
      return res.status(404).json({error: 'Doctor not found.'});
    }

    res.json(updatedDoctor);
  } catch(error) {
    console.error(error);
    res.status(500).json({error:'An error occurred while updating the doctor details.'});
  }
});


router.delete('/:id', async(req, res) => {
  try{
    const doctorId = req.params.id;
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if(!deletedDoctor) {
      return res.status(404).json({error: 'Doctor not found.'});
    }

    res.json(deletedDoctor);
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while deleting the doctor.'});
  }
});

module.exports = router;