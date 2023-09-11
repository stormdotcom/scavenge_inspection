/* eslint-disable camelcase */
import * as Yup from "yup";


export const signInSchema = Yup.object({
    email: Yup.string()
        .min(2)
        .max(100)
        .required("Email Required"),
    password: Yup.string()
        .max(150)
        .required("Password Required")
});


export const signUpSchema = Yup.object({
    fullName: Yup.string()
        .min(3)
        .max(100)
        .required("Full Name Required"),
    company_name: Yup.mixed()
        .required("Company Name Required"),
    vessel_name: Yup.string()
        .min(3)
        .max(100),
    email: Yup.string()
        .min(3)
        .max(200)
        .required("Email Required"),
    password: Yup.string()
        .max(150)
        .required("Password Required"),
    confirmPassword: Yup.string()
        .max(150)
        .required("Confirm Password Required"),
    imo_number: Yup.string()
        .max(30)
});


export const signUpVesselSchema = Yup.object({
    fullName: Yup.string()
        .min(3)
        .max(100)
        .required("Full Name Required"),
    company_name: Yup.mixed()
        .required("Company Name Required"),
    vessel_name: Yup.string()
        .min(3)
        .max(100),
    email: Yup.string()
        .min(3)
        .max(200)
        .required("Email Required"),
    password: Yup.string()
        .max(150)
        .required("Password Required"),
    confirmPassword: Yup.string()
        .max(150)
        .required("Confirm Password Required"),
    imo_number: Yup.string()
        .max(30)
});

export const signUpOwnerSchema = Yup.object({
    fullName: Yup.string()
        .min(3)
        .max(100)
        .required("Full Name Required"),
    company_name: Yup.mixed()
        .required("Company Name Required"),
    email: Yup.string()
        .min(3)
        .max(200)
        .required("Email Required"),
    password: Yup.string()
        .max(150)
        .required("Password Required"),
    confirmPassword: Yup.string()
        .max(150)
        .required("Confirm Password Required")
});
