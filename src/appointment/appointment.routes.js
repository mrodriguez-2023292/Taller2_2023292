import { Router } from "express";
import { saveAppointment, getAppointment, deleteAppointment, updateAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator, cancelAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);
router.get("/", getAppointment);
router.put("/updateAppointment/:id", updateAppointmentValidator, updateAppointment)
router.delete("/cancelAppointment/:id", cancelAppointmentValidator, deleteAppointment)

export default router;