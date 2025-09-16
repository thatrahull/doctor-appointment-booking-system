import express from 'express';
import {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard
} from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", loginAdmin);

// Add doctor
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);

// Get all appointments
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);

// Cancel appointment (PUT request)
adminRouter.put("/appointment/:id/cancel", authAdmin, appointmentCancel);

// Get all doctors
adminRouter.get("/doctors", authAdmin, allDoctors);

// Change doctor availability (PUT request)
adminRouter.put("/doctor/:id/availability", authAdmin, changeAvailability);

// Admin dashboard
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
