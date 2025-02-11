import { body, param } from "express-validator"; // Agregar 'param' aquí
import { validarCampos } from "./validate-fields.js";
import { appointmentExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";

export const createAppointmentValidator = [
    body("date").notEmpty().withMessage("La fecha es requerida"),
    body("pet").notEmpty().withMessage("La mascota es requerida"),
    body("pet").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const updateAppointmentValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(appointmentExists),
    validarCampos,
    handleErrors
]

export const cancelAppointmentValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(appointmentExists),
    validarCampos,
    handleErrors
];
