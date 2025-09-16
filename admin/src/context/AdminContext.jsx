import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(false);

  const headers = { headers: { aToken } };

  // Get all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/doctors`, headers);
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Change doctor availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/admin/doctor/${docId}/availability`, {}, headers);
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // Get all appointments
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, headers);
      if (data.success) setAppointments(data.appointments.reverse());
      else toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/admin/appointment/${appointmentId}/cancel`, {}, headers);
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // Get dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, headers);
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <AdminContext.Provider value={{
      aToken, setAToken,
      doctors, getAllDoctors, changeAvailability,
      appointments, getAllAppointments, cancelAppointment,
      dashData, getDashData
    }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
