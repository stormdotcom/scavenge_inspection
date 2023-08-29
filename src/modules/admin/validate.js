import * as Yup from "yup";


export const passwordChangeSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(100)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain at least one lowercase letter,\n one uppercase letter, and one number"
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required")
});


