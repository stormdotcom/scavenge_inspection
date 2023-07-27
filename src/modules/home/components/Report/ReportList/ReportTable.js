import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReports } from "../../../actions";

const ReportTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchReports());
    }, []);
    return <div>ReportTable</div>;
};

export default ReportTable;
