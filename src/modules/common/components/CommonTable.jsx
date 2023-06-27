import CustomReactTable from "common/components/custom/CustomReactTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMON_TABLE_INITIAL_STATE, DEFAULT_TABLE_ID, STATE_REDUCER_KEY } from "../constants";
import { actions as commonActions } from "modules/common/slice";
import { ROWS_PER_PAGE } from "../../../common/constants";

const callApi = (fetchData, pagination, filters, dispatch) => {
    let { payload = {} } = fetchData;
    let finalPayload = { ...payload, ...pagination, ...filters };
    dispatch(fetchData(finalPayload));
};

const CommonTable = (props) => {
    const dispatch = useDispatch();

    const { tableId = DEFAULT_TABLE_ID, autoFetch = true, columns, options, title, enableStickyFooter = false, enableRowVirtualization = false, rowsPerPageOptions = ROWS_PER_PAGE, fetchData, filterComponent, enableCustomTableFilter, clearAll = true, rowsPerPage, ...rest } = props;

    const { [tableId]: { requestInProgress = false, data = [], rowSelected = {}, filters = {}, pagination: { pageNo, totalRecords, pageSize, totalPages } = COMMON_TABLE_INITIAL_STATE.pagination } = {} } = useSelector(state => state[STATE_REDUCER_KEY].table);

    const handleChangePage = (e, page) => {
        dispatch(commonActions.setPagination({ key: tableId, pageNo: page }));
        if (autoFetch) {
            fetchData && callApi(fetchData, { pageNo: page - 1, pageSize }, filters, dispatch);
        } else {
            fetchData && callApi(fetchData, { pageNo: page - 1, pageSize: 25 }, filters, dispatch);
        }
    };

    const handleChangeRowsPerPage = (e) => {
        dispatch(commonActions.setPagination({ key: tableId, pagination: { pageSize: e.target.value }, reset: true }));
        fetchData && callApi(fetchData, { pageNo: 0, pageSize: e.target.value }, filters, dispatch);
    };

    useEffect(() => {
        dispatch(commonActions.initializeTable({ key: tableId }));
        if (autoFetch) {
            fetchData && callApi(fetchData, { pageNo: 0, pageSize }, filters, dispatch);
        }
        if (clearAll) {
            return () => dispatch(commonActions.clearAll({ key: tableId }));
        }
    }, []);

    return (
        <CustomReactTable
            data={data}
            columns={columns}
            options={{
                ...options, pageSize,
                page: pageNo,
                count: totalRecords,
                totalPages,
                state: {
                    ...options.state,
                    rowSelection: rowSelected,
                    // showProgressBars: requestInProgress,
                    showSkeletons: false
                },
                requestInProgress: requestInProgress,
                customPagination: {
                    handleChangePage,
                    handleChangeRowsPerPage,
                    rowsPerPageOptions: rowsPerPage || rowsPerPageOptions
                }
            }}
            enableRowVirtualization={enableRowVirtualization}
            enableCustomTableFilter={enableCustomTableFilter}
            filterComponent={filterComponent}
            enableStickyFooter={enableStickyFooter}
            title={title}
            {...rest}
        />
    );
};

export default CommonTable;
