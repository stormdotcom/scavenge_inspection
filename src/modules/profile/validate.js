/* eslint-disable camelcase */
import * as Yup from "yup";


export const vesselDetailsSchema = Yup.object({
    vessel_name: Yup.string()
        .min(2)
        .max(100)
        .required("Vessel Name Required"),
    imo_number: Yup.number()
        .required("IMO Number Required"),

    manufacturer: Yup.string()
        .min(2)
        .max(100)
        .required("Manufacturer Required"),
    type_of_engine: Yup.string()
        .max(150)
        .required("Engine Type Required"),

    vessel_type: Yup.string()
        .min(2)
        .max(100)
        .required("Vessel Type Required"),
    cylinder_numbers: Yup.string()
        .min(1)
        .max(150)
        .required("Cylinder Number Required")
});


