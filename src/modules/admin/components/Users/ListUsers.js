import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY, columnsUsers, usersColOrder } from "../../constants";
import { useMemo } from "react";
import { Icons } from "../../../../common/components";
import CustomListMenu from "../../../../common/components/custom/CustomListMenu";
import { actions as sliceActions } from "../../slice";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../common/constants";
import { COMMON_TABLE_PAGINATION } from "../../../common/constants";
import CustomReactTable from "../../../../common/components/custom/CustomReactTable";
import { fetchUserList } from "../../actions";

const { OpenInNewIcon } = Icons;
const ListUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { table = {}, requestInProgress = false } = useSelector(state => state[STATE_REDUCER_KEY]).usersList;
    const { data = [], pagingInfo: { pageSize, pageIndex, totalCount } = {} } = table;
    const columns = useMemo(
        () => columnsUsers,
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
        dispatch(fetchUserList());
    };

    const handleChangeRowsPerPage = (e) => {
        dispatch(sliceActions.setPagination({ ...COMMON_TABLE_PAGINATION, pageSize: e.target.value }));
        dispatch(fetchUserList());
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
            columnOrder: usersColOrder
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
        dispatch(fetchUserList());
        return (() => dispatch(sliceActions.clearAll()));
    }, []);
    return (
        <>
            <CustomReactTable
                data={data}
                columns={columns}
                options={options}
                enableRowVirtualization={false}
                enableCustomTableFilter={true}
                // filterComponent={({ setOpen }) => <DashboardFilter onClose={setOpen} />}
                title={"User Management"} />
        </>
    );
};

export default ListUsers;
