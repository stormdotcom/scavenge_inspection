import _ from "lodash";

export const getPayloadData = (action = {}, defaultValue = {}) => _.get(action, "payload", defaultValue);

export const getPayloadContent = (action = {}, defaultValue = []) => _.get(action, "payload.content", defaultValue);

export const getPayloadContentDetails = (action = {}, defaultValue = {}, position = 0) => {
    let responseArray = _.get(action, "payload.content", []);
    return (responseArray.length > position) ? responseArray[position] : defaultValue;
};

export const removeEmptyProperty = (obj = {}) => {
    const payload = {};
    const keys = Object.keys(obj);

    _.forEach(keys, (key) => {
        let dataType = typeof (obj[key]);
        if (dataType === "boolean" || dataType === "number") {
            payload[key] = obj[key];
        } else if (dataType === "string") {
            if (obj[key].length > 0) {
                payload[key] = obj[key];
            }
        } else if (obj[key] instanceof Object && !_.isEmpty(obj[key])) {
            payload[key] = removeEmptyProperty(obj[key]);
        } else if (obj[key] instanceof Array) {
            payload[key] = obj[key].map(item => removeEmptyProperty(item));
        }
    });
    return payload;
};
