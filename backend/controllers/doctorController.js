import Doctor from "../models/doctorModel.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, doctor });
  } catch (error) {
    console.error("Get Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ New function: change doctor availability
export const changeAvailability = async (req, res) => {
  try {
    const doctorId = req.params.id; // get ID from URL

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    doctor.available = !doctor.available; // toggle availability
    await doctor.save();

    res.json({ success: true, message: `Doctor is now ${doctor.available ? "available" : "unavailable"}`, doctor });
  } catch (error) {
    console.error("Change Availability Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

