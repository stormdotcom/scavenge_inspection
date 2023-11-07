export function formatProps(inputObject) {
    const formattedObject = {};
    for (const key in inputObject) {
        if (inputObject[key] !== "" &&
            inputObject[key] !== 0 &&
            inputObject.hasOwnProperty(key) &&
            typeof inputObject[key] !== "undefined") {
            formattedObject[key] = inputObject[key];
        }
    }
    return formattedObject;
}


