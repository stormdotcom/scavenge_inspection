/* eslint-disable camelcase */
import * as Yup from "yup";


export const createVesselSchema = Yup.object({
    fullName: Yup.string().max(150).required("Full Name Required"),
    vessel_name: Yup.string().max(150).required("Vessel Name Required"),
    imo_number: Yup.string().max(150).required("IMO Number Required"),
    vessel_type: Yup.string().max(150).required("Vessel Type Required"),
    manufacturer: Yup.string().max(150).required("Manufacturer Required"),
    cylinder_numbers: Yup.string().max(150).required("No Of Cylinders Required"),
    email: Yup.string().max(150).required("Email Required"),
    password: Yup.string().max(150).required("Password Required"),
    confirmPassword: Yup.string().max(150).required("Confirm Password Required"),
    type_of_engine: Yup.string().max(150).required("Type of Engine Required")
});


export const signUpSchema = Yup.object({
    email: Yup.string()
        .min(3)
        .max(100)
        .required("Email Required"),
    password: Yup.string()
        .max(150)
        .required("Password Required"),
    confirmPassword: Yup.string()
        .max(150)
        .required("Confirm Password Required"),
    imo_number: Yup.string()
        .max(30)
        .required("IMO Number Required")
});

