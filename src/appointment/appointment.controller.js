'use strict';

import Pet from "../pet/pet.model.js";
import User from '../user/user.model.js';
import Appointment from "../appointment/appointment.model.js";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    });
  }
};

export const getAppointment = async (req, res) => {
  const { limite = 10, desde = 0 } = req.query;

  // Cambiar la consulta para incluir todos los estados, excepto "COMPLETED" si prefieres excluirlas
  const query = { status: { $ne: "COMPLETED" } }; // Excluye las citas COMPLETED

  try {
      const appointments = await Appointment.find(query)
          .skip(Number(desde))
          .limit(Number(limite));

      const total = await Appointment.countDocuments(query);

      res.status(200).json({
          success: true,
          total,
          appointments
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error al obtener las citas',
          error
      });
  }
}

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const  data  = req.body;
        const isoDate = new Date(data.date);

        if (isNaN(isoDate.getTime())) {
          return res.status(400).json({
            success: false,
            msg: "Fecha inválida",
          });
        }
    
        const pet = await Pet.findOne({ _id: data.pet });
        if (!pet) {
          return res.status(404).json({ 
            success: false, 
            msg: "No se encontró la mascota" 
          });
        }

        const appointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

        await appointment.save();

        return res.status(200).json({
          success: true,
          msg: `Cita fue actulizada exitosamente en fecha ${data.date}`,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar cita',
            error: err.message
        });
    }
}

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Actualiza el estado de la cita a "CANCELLED" en lugar de eliminarla
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "CANCELLED" }, // Cambia el estado de la cita
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cita cancelada exitosamente",
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al cancelar la cita",
      error: err.message,
    });
  }
};