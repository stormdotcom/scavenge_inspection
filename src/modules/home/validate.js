/* eslint-disable camelcase */
import * as Yup from "yup";


export const vesselDetailsSchema = Yup.object({
    inspectionDate: Yup.number()
        .required("Inspection Date Required"),
    totalRunningHours: Yup.string()
        .max(100)
        .required("Total RunningHours Required"),
    cylinderNumber: Yup.string()
        .max(150)
        .required("Cylinder Number Required"),

    cylinderOilType: Yup.string()
        .max(200)
        .required("Cylinder Oil-Type Required"),
    cylinderOilConsump: Yup.string()
        .max(200),
    serviceLoad: Yup.string()
        .max(200)
        .required("Service Load Required")
});

// data: {
//     vesselName: "",
//     imoNumber: "",
//     manufacturer: "",
//     engineType: "",
//     vesselType: "",
//     inspectionDate: "",
//     cylinderNumber: "",
//     totalRunningHours: "",
//     cylinderOilType: "",
//     cylinderOilConsump: "",
//     serviceLoad: ""
// }

