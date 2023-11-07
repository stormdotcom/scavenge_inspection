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


// export const signUpSchema = Yup.object({
//     email: Yup.string()
//         .min(3)
//         .max(100)
//         .required("Email Required"),
//     password: Yup.string()
//         .max(150)
//         .required("Password Required"),
//     confirmPassword: Yup.string()
//         .max(150)
//         .required("Confirm Password Required"),
//     imo_number: Yup.string()
//         .max(30)
//         .required("IMO Number Required")
// });

export const managerProfileValidate = Yup.object({
    email: Yup.string()
        .min(3)
        .max(100)
        .required("Email Required"),
    fullName: Yup.string()
        .max(150)
        .required("Name Required"),
    phone: Yup.string()
        .min(10, "Phone Number At least 10 characters")
        .max(15, "Phone Number max 15 characters")
        .required("Phone Number Required")
        .test("is-valid-phone", "Please enter a valid phone number", function (value) {
            if (!value) {
                return true;
            }
            // The phone number is not required, so skip validation if it's empty
            // Use your custom validation logic here to check if the input contains only numbers
            // For example, you can use a regular expression to check if it's a valid number
            // Return true if it's valid, or false if it's not
            // Example using regex:
            // return /^\d+$/.test(value);
            // If using regex, you may want to customize it to match your specific requirements.

            // Check if the value contains any non-numeric characters
            if (!/^\d+$/.test(value)) {
                return false; // Invalid phone number (contains non-numeric characters)
            }
            return true; // Valid phone number (only numeric characters)
        })
});

