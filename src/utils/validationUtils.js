export const isEmail = (string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string);

const number = /^[0-9]+$/;

export const isNumber = (string = "") => string.match(number);

export const minNumber = (string) => /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/?.test(string);
export const mobileNumber = (string) => /^\d{9,12}[0-9]$/?.test(string);
export const specialCharCheck = (str, includeArray = [], excludeArray = []) => {

    let string = "";
    // eslint-disable-next-line quotes
    let defaultString = '`!@#$%^&*()_+-=\\[\\]{};\'' + ':"\\\\|,.<>/?~';

    if (excludeArray.length > 0) {
        excludeArray.forEach((item) => {
            string += item;
        });
    }
    defaultString += string;
    let mainRegex = RegExp(`[${defaultString}]`).toString();
    let replaced = mainRegex.slice(1, -1);
    if (includeArray?.length > 0) {
        includeArray.forEach((item) => {
            replaced = replaced.replace(item, "");
        });
    }
    replaced = new RegExp(replaced);
    return replaced.test(str);
};
