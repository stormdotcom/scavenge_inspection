/* eslint-disable camelcase */
import * as Yup from "yup";


export const vesselDetailsSchema = Yup.object({
    vesselName: Yup.string()
        .min(2)
        .max(100)
        .required("Vessel Name Required"),
    imoNumber: Yup.string()
        .max(150)
        .required("IMO Number Required"),
    manufacturer: Yup.string()
        .min(2)
        .max(100)
        .required("Manufacturer Required"),
    engineType: Yup.string()
        .max(150)
        .required("Engine Type Required"),

    vesselType: Yup.string()
        .min(2)
        .max(100)
        .required("Vessel Type Required"),
    inspectionDate: Yup.number()
        .max(150)
        .required("Inspection Date Required"),

    totalRunningHours: Yup.string()
        .min(2)
        .max(100)
        .required("Total RunningHours Required"),
    cylinderNumber: Yup.string()
        .max(150)
        .required("Cylinder Number Required"),

    cylinderOilType: Yup.string()
        .min(2)
        .max(100)
        .required("Cylinder Oil-Type Required"),
    cylinderOilConsump: Yup.string()
        .max(150),
    serviceLoad: Yup.string()
        .max(150)
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

