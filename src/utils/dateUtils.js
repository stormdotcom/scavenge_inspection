import moment from "moment";

export const DATE_FORMAT = "DD/MM/YYYY";

export const DATE_TIME_FORMAT = "DD/MM/YYYY hh:mm A";

export const TIME_FORMAT = "hh:mm A";

/**
 * Converts date to epoch
 * @example
 * toEpoch(new Date( ));
 * // returns epoch of given date
 * @returns {long} Returns long data type of date
 */

export const toEpoch = (date) => {
    return date && moment(date).valueOf() || null;
};

/**
 * Converts epoch to moment
 * @example
 * fromEpoch(1670970530);
 * // returns Moment instance of : Tuesday, December 13, 2022 10:28:50 PM
 * @returns {moment} Returns the moment instance
 */

export const fromEpoch = (epoch) => {
    return epoch && moment(epoch) || null;
};

export const formatDate = (date, format = DATE_TIME_FORMAT) => {
    return date && moment(date).format(format) || null;
};
