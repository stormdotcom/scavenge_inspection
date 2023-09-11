import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Swal from "sweetalert2";

import { STATE_REDUCER_KEY, columnsUsers, usersColOrder } from "../../constants";
import { Icons } from "../../../../common/components";
import CustomListMenu from "../../../../common/components/custom/CustomListMenu";
import { actions as sliceActions } from "../../slice";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../common/constants";
import { COMMON_TABLE_PAGINATION } from "../../../common/constants";
import CustomReactTable from "../../../../common/components/custom/CustomReactTable";
import { allowAccess, disAllowAccess, fetchUserList } from "../../actions";
import UserFilter from "./UserFilter";
import "./modal.css";

const { NotInterestedIcon, CheckCircleIcon, OpenInNewIcon } = Icons;

const ListUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY]).table.requestInProgress;
    const { data = [], pageInfo: { pageSize, pageIndex, totalCount } = {} } = useSelector(state => state[STATE_REDUCER_KEY]).table;
    const columns = useMemo(
        () => columnsUsers,
        []
    );
    const handleAllow = (id) => {
        Swal.fire({
            title: "Are you sure you want to enable web access for this user?",
            showCancelButton: true,
            confirmButtonText: "Enable Access"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(allowAccess(id));
            }
        });
    };
    const handleDisAllow = (id) => {
        Swal.fire({
            title: "Are you sure you want to disable web access for this user?",
            showCancelButton: true,
            confirmButtonText: "Disable Access"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(disAllowAccess(id));
            }
        });
    };
    const actions = (row) => {
        let customActions = [];
        customActions.push({ title: "Edit", icon: <OpenInNewIcon fontSize="small" sx={{ color: "#fff" }} />, handleClick: () => navigate(`${row.original._id}/edit`) });
        if (row.original.status) {
            customActions.push({ title: "Disable Access", icon: <NotInterestedIcon fontSize="small" sx={{ color: "#fff" }} />, handleClick: () => handleDisAllow(row.original._id) });
        } else {
            customActions.push({ title: "Enable Access", icon: <CheckCircleIcon fontSize="small" sx={{ color: "#fff" }} />, handleClick: () => handleAllow(row.original._id) });
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
        dispatch(sliceActions.setTablePagination({ totalCount, pageSize, pageIndex: newPage }));
        dispatch(fetchUserList());
    };

    const handleChangeRowsPerPage = (e) => {
        dispatch(sliceActions.setTablePagination({ ...COMMON_TABLE_PAGINATION, pageSize: e.target.value }));
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
        <> <UserFilter />
            <CustomReactTable
                data={data}
                columns={columns}
                options={options}
                enableRowVirtualization={false}
                enableCustomTableFilter={true}
                // filterComponent={({ setOpen }) => <DashboardFilter onClose={setOpen} />}
                title={"Users"} />
        </>
    );
};

export default ListUsers;
