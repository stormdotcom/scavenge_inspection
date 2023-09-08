import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions as sliceActions } from "../../slice";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../../common/components";
import CustomListMenu from "../../../../common/components/custom/CustomListMenu";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../common/constants";
import { COMMON_TABLE_PAGINATION } from "../../../common/constants";

import { STATE_REDUCER_KEY, columnsVesselList, vesselListColOrder } from "../../constants";
import { fetchVesselDetailsList } from "../../actions";
import CustomReactTable from "../../../../common/components/custom/CustomReactTable";
import VesselFilter from "./VesselFilter";

const { OpenInNewIcon } = Icons;

const VesselDetailList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { table = {}, requestInProgress = false } = useSelector(state => state[STATE_REDUCER_KEY]).vesselDetailList;
    const { data = [], pageInfo: { pageSize, pageIndex, totalCount } = {} } = table;
    const columns = useMemo(
        () => columnsVesselList,
        []
    );
    const actions = (row) => {
        let item = [1, 2];
        let customActions = [];
        if (item[0]) {
            customActions.push({ title: "View", icon: <OpenInNewIcon fontSize="small" sx={{ color: "#fff" }} />, handleClick: () => navigate(`${row.original._id}/view`) });
        }
        return customActions;
    };
    const toolBarActions = [];

    const displayColumnDefOptions = {
        "mrt-row-actions": {
            Cell: ({ row }) => <CustomListMenu customActions={actions(row)} />

        }
    };

    const handleChangePage = (e, newPage) => {
        dispatch(sliceActions.setPagination({ totalCount, pageSize, pageIndex: newPage }));
        dispatch(fetchVesselDetailsList());
    };

    const handleChangeRowsPerPage = (e) => {
        dispatch(sliceActions.setPagination({ ...COMMON_TABLE_PAGINATION, pageSize: e.target.value }));
        dispatch(fetchVesselDetailsList());
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
            columnOrder: vesselListColOrder
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
        dispatch(fetchVesselDetailsList());
        return (() => dispatch(sliceActions.clearAll()));
    }, []);
    return (
        <>
            <VesselFilter />
            <CustomReactTable
                data={data}
                columns={columns}
                options={options}
                enableRowVirtualization={false}
                enableCustomTableFilter={true}
                title={"Vessels"} />
        </>
    );
};

export default VesselDetailList;
