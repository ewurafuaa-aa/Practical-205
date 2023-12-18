const Doctor = require('../models/doctor'); 


exports.getAllDoctors = async(req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({error: 'Error retrieving doctors' });
  }
};


exports.getDoctorById = async(req, res) => {
  const {doctorId} = req.params;
  try {
    const doctor = await Doctor.findById(doctorId);
    if(!doctor) {
      return res.status(404).json({error: 'Doctor not found'});
    }
    res.status(200).json(doctor);
  } catch(error) {
    res.status(500).json({error: 'Error retrieving doctor details'});
  }
};


exports.addDoctor = async(req, res) => {
  const {name, specialization, phoneNumber, email} = req.body;
  try {
    const newDoctor = await Doctor.create({
      name,
      specialization,
      phoneNumber,
      email,
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({error: 'Error adding a new doctor'});
  }
};


exports.updateDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const {name, specialization, phoneNumber, email} = req.body;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {name, specialization, phoneNumber, email},
      {new: true}
    );
    if(!updatedDoctor) {
      return res.status(404).json({error: 'Doctor not found'});
    }
    res.status(200).json(updatedDoctor);
  } catch(error) {
    res.status(500).json({error: 'Error updating doctor details'});
  }
};


exports.deleteDoctor = async(req, res) => {
  const {doctorId} = req.params;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if(!deletedDoctor) {
      return res.status(404).json({error: 'Doctor not found'});
    }
    res.status(200).json({message: 'Doctor deleted successfully'});
  } catch (error) {
    res.status(500).json({error: 'Error deleting doctor'});
  }
};