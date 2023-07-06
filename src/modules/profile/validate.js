/* eslint-disable camelcase */
import * as Yup from "yup";


export const vesselDetailsSchema = Yup.object({
    vesselName: Yup.string()
        .min(2)
        .max(100)
        .required("Vessel Name Required"),
    imo_number: Yup.string()
        .max(150)
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
    inspection_date: Yup.number()
        .max(150)
        .required("Inspection Date Required"),

    total_running_hours: Yup.string()
        .min(2)
        .max(100)
        .required("Total RunningHours Required"),
    cylinder_numbers: Yup.string()
        .max(150)
        .required("Cylinder Number Required"),

    cyl_oil_Type: Yup.string()
        .min(2)
        .max(100)
        .required("Cylinder Oil-Type Required"),
    cyl_oil_consump_Ltr_24hr: Yup.string()
        .max(150),
    normal_service_load_in_percent_MCR: Yup.string()
        .max(150)
        .required("Service Load Required")
});

// data: {
//     vesselName: "",
//     imo_number: "",
//     manufacturer: "",
//     type_of_engine: "",
//     vessel_type: "",
//     inspection_date: "",
//     cylinder_numbers: "",
//     total_running_hours: "",
//     cyl_oil_Type: "",
//     cyl_oil_consump_Ltr_24hr: "",
//     normal_service_load_in_percent_MCR: ""
// }

