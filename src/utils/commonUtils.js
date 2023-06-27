/* eslint-disable valid-jsdoc */

export const getBase64 = file => {
    // eslint-disable-next-line no-undef
    return new Promise(resolve => {
        let baseURL = "";
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
};

export const sortByKeys = data => {
    let sorted = Object.keys(data).sort()
        .reduce(function (acc, key) {
            acc[key] = data[key];
            return acc;
        }, {});

    Object.keys(sorted).forEach(key => {
        if (!sorted[key] || sorted[key].length === 0) {
            delete sorted[key];
        }
    });

    return sorted;
};


export const downloadFileAsync = async ({ response, file: { name = "download", ext = "pdf" } = {} }) => {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.${ext}`);
    document.body.appendChild(link);
    link.click();
};

/**
*  Convert Numbers to INR abbreviation
 * @param  {String} value Amount
 * @param  {Number} points Decimal points length
 * @returns {Boolean}
 */
export const inrFormatter = (value, points) => {
    const newVal = parseInt(value);
    if (newVal < 100000) {
        return `₹${newVal.toFixed(points)}`;
    } else {
        const converted = newVal.toLocaleString("en-IN", {
            style: "currency", currency: "INR", notation: "compact", minimumFractionDigits: points,
            roundingIncrement: 5
        });
        return converted;
    }
};
