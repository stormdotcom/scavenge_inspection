import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../../../actions";
import CustomReactTable from "../../../../../common/components/custom/CustomReactTable";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../../common/constants";
import { actions as sliceActions } from "../../../slice";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY, columnsReport, reportsColOrder } from "../../../constants";
import { Icons } from "../../../../../common/components";
import CustomListMenu from "../../../../../common/components/custom/CustomListMenu";
import { COMMON_TABLE_PAGINATION } from "../../../../common/constants";
import ReportFilter from "./ReportFilter";

const { VisibilityIcon } = Icons;
const ReportTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { table = {}, requestInProgress = false } = useSelector(state => state[STATE_REDUCER_KEY]).reports;
    const { data = [], pagingInfo: { pageSize, pageIndex, totalCount } = {} } = table;
    const columns = useMemo(
        () => columnsReport,
        []
    );
    const actions = (row) => {
        let item = [1, 2];
        let customActions = [];
        if (item[0]) {
            customActions.push({ title: "View", icon: <VisibilityIcon fontSize="small" sx={{ color: "#fff" }} />, handleClick: () => navigate(`${row.original._id}/edit`) });
        }
        return customActions;
    };
    const toolBarActions = [];
    const toolbarPermissions = [0, 1];
    if (toolbarPermissions[1]) {
        toolBarActions.push({
            title: "Create", icon: <VisibilityIcon sx={{ color: "#fff" }} fontSize="medium" />, handleClick: () => navigate("create")
        });
    }

    const displayColumnDefOptions = {
        "mrt-row-actions": {
            Cell: ({ row }) => <CustomListMenu customActions={actions(row)} />

        }
    };

    const handleChangePage = (e, newPage) => {
        dispatch(sliceActions.setPagination({ totalCount, pageSize, pageIndex: newPage }));
        dispatch(fetchReports());
    };

    const handleChangeRowsPerPage = (e) => {
        dispatch(sliceActions.setPagination({ ...COMMON_TABLE_PAGINATION, pageSize: e.target.value }));
        dispatch(fetchReports());
    };
    const options = {
        ...REACT_TABLE_COMMON_OPTIONS,
        requestInProgress: requestInProgress,
        pageSize: pageSize,
        totalCount: totalCount,
        page: pageIndex,
        enableFilters: true,
        state: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            columnOrder: reportsColOrder
        },
        customPagination: {
            handleChangePage,
            handleChangeRowsPerPage,
            rowsPerPageOptions: [5, 10, 15]
        },
        displayColumnDefOptions,
        toolBarActions: toolBarActions
    };

    useEffect(() => {
        dispatch(fetchReports());
        return (() => dispatch(sliceActions.clearAll()));
    }, []);
    return (
        <>
            <ReportFilter />
            <CustomReactTable
                data={data}
                columns={columns}
                options={options}
                enableRowVirtualization={false}
                enableCustomTableFilter={true}
                // filterComponent={({ setOpen }) => <DashboardFilter onClose={setOpen} />}
                title={"Reports"} />
        </>
    );
};

export default ReportTable;
