import * as Yup from "yup";


export const passwordChangeSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(100)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Must contain at least 1 lowercase, 1 uppercase, and 1 num"
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required")
});


