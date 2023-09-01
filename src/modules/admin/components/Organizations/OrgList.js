import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY, columnsOrg, orgColOrder } from "../../constants";
import { useMemo } from "react";
import { Icons } from "../../../../common/components";
import CustomListMenu from "../../../../common/components/custom/CustomListMenu";
import { actions as sliceActions } from "../../slice";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../common/constants";
import { COMMON_TABLE_PAGINATION } from "../../../common/constants";
import CustomReactTable from "../../../../common/components/custom/CustomReactTable";
import { fetchOrgList } from "../../actions";
import OrgFilter from "./OrgFilter";


const { OpenInNewIcon } = Icons;
const ListUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data = [], requestInProgress, pageInfo: { pageSize, pageIndex, totalCount } = {} } = useSelector(state => state[STATE_REDUCER_KEY]).table;
    const columns = useMemo(
        () => columnsOrg,
        []
    );

    const actions = (row) => {
        let customActions = [];
        customActions.push({ title: "Edit", icon: <OpenInNewIcon fontSize="small" sx={{ color: "#fff" }} />, handleClick: () => navigate(`${row.original._id}/edit`) });

        return customActions;
    };
    const toolBarActions = [];

    const displayColumnDefOptions = {
        "mrt-row-actions": {
            Cell: ({ row }) => <CustomListMenu customActions={actions(row)} />

        }
    };

    const handleChangePage = (e, newPage) => {
        dispatch(sliceActions.setTablePagination({ totalCount, pageSize, pageIndex: newPage }));
        dispatch(fetchOrgList());
    };

    const handleChangeRowsPerPage = (e) => {
        dispatch(sliceActions.setTablePagination({ ...COMMON_TABLE_PAGINATION, pageSize: e.target.value }));
        dispatch(fetchOrgList());
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
            columnOrder: orgColOrder
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
        dispatch(fetchOrgList());
        return (() => dispatch(sliceActions.clearAll()));
    }, []);
    return (
        <>
            <OrgFilter />
            <CustomReactTable
                data={data}
                columns={columns}
                options={options}
                enableRowVirtualization={false}
                enableCustomTableFilter={true}
                // filterComponent={({ setOpen }) => <DashboardFilter onClose={setOpen} />}
                title={"Organizations"} />
        </>
    );
};

export default ListUsers;
