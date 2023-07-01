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
    imoNumber: Yup.string()
        .max(30)
        .required("IMO Number Required")
});

