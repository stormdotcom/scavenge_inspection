/* eslint-disable camelcase */
import * as Yup from "yup";


export const vesselDetailsSchema = Yup.object({
    inspection_date: Yup.mixed()
        .required("Inspection Date Required"),
    total_running_hours: Yup.string()
        .max(100)
        .required("Total RunningHours Required"),
    cylinder_numbers: Yup.number()
        .max(100, "Cylinder Number should be less than 100")
        .required("Cylinder Number Required"),
    cyl_oil_Type: Yup.string()
        .max(200)
        .required("Cylinder Oil-Type Required"),
    cyl_oil_consump_Ltr_24hr: Yup.string()
        .max(200),
    normal_service_load_in_percent_MCR: Yup.string()
        .max(200)
        .required("Service Load Required")
});

export const reportValidationSchema = Yup.object({
    startDate: Yup.number().optional("Start Date is required"),
    endDate: Yup.number()
        .when("startDate", (startDate, schema) => {
            return schema.test({
                name: "endDate",
                exclusive: false, // Ensure that 'endDate' is validated even if 'startDate' is empty.
                message: "End Date should be greater than Start Date",
                test: function (endDate) {
                    // 'this' refers to the current Yup context.

                    if (typeof startDate !== "number" || typeof endDate !== "number") {
                        // If either 'startDate' or 'endDate' is not a number, the validation will pass,
                        // since either 'startDate' validation has failed or 'endDate' is empty.
                        return true;
                    }

                    return endDate > startDate;
                }
            });
        })
        .optional("End Date is required")
});
