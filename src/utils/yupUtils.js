import * as Yup from "yup";

Yup.addMethod(Yup.object, "dropDown", function (errorMessage) {
    return this.test("required", errorMessage, function (value) {
        const { path, createError } = this;
        return (
            (value && value.id) ||
            createError({ path, message: errorMessage })
        );
    });
});
export { Yup };
