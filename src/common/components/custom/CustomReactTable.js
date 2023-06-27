import MaterialReactTable from "material-react-table";
import { useEffect, useRef, useState } from "react";
import { Components } from "../../components";
import TableFilterContainer from "./TableFilterContainer";
import LoadingCustomOverlay from "../../../modules/common/components/LoadingOverlay";

const { Grid, Pagination, Box, Typography, IconButton, Tooltip } = Components;

const CustomReactTable = ({ data, columns, options, title = "", enableRowVirtualization = false, enableCustomTableFilter = false, filterComponent }) => {
    const virtualizerInstanceRef = useRef(null);
    const [sorting, setSorting] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const {
        page = 0, state, enableCustomPagination = true,
        totalPages = 1,
        customPagination: {
            handleChangePage
            //handleChangeRowsPerPage,
            //rowsPerPageOptions = []
        } = {},
        toolBarActions = [],
        enableFilters = false, displayColumnDefOptions, getCanMultiSelect, handleRowSelection, requestInProgress, ...rest } = options;
    const newPage = page + 1;
    useEffect(() => {
        if (virtualizerInstanceRef.current) {
            virtualizerInstanceRef.current.scrollToIndex(0);
        }
    }, [sorting]);
    return (
        <LoadingCustomOverlay active={requestInProgress}>
            <Grid sx={{ m: 2 }}>
                <Grid sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                    <Grid>
                        <Typography sx={{ float: "left", padding: "5px", fontWeight: 500, fontSize: "24px", fontFamily: "Clash Display" }} variant="h4" component='p'> {title}</Typography>
                    </Grid>
                    {
                        toolBarActions.length > 0 && <Box sx={{ marginLeft: 2 }}>
                            {toolBarActions && toolBarActions.map((element) => {
                                if (element.key === "customFilter") {
                                    return <Tooltip key={element.title} title={element.title} onClick={() => setOpen(true)}>
                                        <IconButton
                                        >
                                            {element?.icon}
                                        </IconButton>
                                    </Tooltip>;
                                }
                                if (element.key === "download") {
                                    return <Tooltip key={element?.title} title={element.title || ""} onClick={element.handleClick}>
                                        <IconButton
                                        >
                                            {element?.component}
                                        </IconButton>
                                    </Tooltip>;
                                }
                                return <Tooltip key={element?.title} title={element.title || ""} onClick={element.handleClick}>
                                    <IconButton
                                    >
                                        {element?.icon}
                                    </IconButton>
                                </Tooltip>;
                            })}
                        </Box>
                    }
                </Grid>
                <MaterialReactTable
                    initialState={{ density: "comfortable", showHideColumnFilters: "false" }}
                    columns={columns}
                    data={data}
                    state={state}
                    enableFilters={enableFilters}
                    enableRowVirtualization={enableRowVirtualization}
                    virtualizerInstanceRef={enableRowVirtualization && virtualizerInstanceRef}
                    virtualizerProps={{ overscan: 25 }}
                    muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
                    onSortingChange={setSorting}
                    displayColumnDefOptions={displayColumnDefOptions}
                    getCanMultiSelect={getCanMultiSelect}
                    enableColumnFilter={enableFilters ? true : false}
                    onRowSelectionChange={handleRowSelection}
                    enableBottomToolbar={false}
                    enableStickyFooter={false}
                    muiTablePaperProps={{
                        elevation: 1,
                        sx: {
                            borderRadius: "25px",
                            border: "1px solid #86938E",
                            padding: "7px",
                            background: "none"
                        }
                    }
                    }
                    muiTableBodyCellProps={{
                        sx: {
                            fontSize: "14px",
                            borderTop: "1px solid #86938E",
                            fontFamily: "Franklin Gothic Book"

                        }
                    }}
                    muiTopToolbarProps={{
                        sx: {
                            display: "block",
                            flexDirection: "column",
                            backgroundColor: "white"
                        }
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            fontSize: "14px",
                            fontWeight: "medium",
                            fontFamily: "Clash Display",
                            py: 3
                        }
                    }}

                    {...rest}
                />
                {enableCustomPagination && <Grid sx={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
                    <Pagination
                        color="primary"
                        shape="rounded"
                        count={totalPages}
                        page={newPage}
                        onChange={handleChangePage}
                    />
                </Grid>}
                {(enableCustomTableFilter && open) && <TableFilterContainer open={open} setOpen={setOpen} handleOpen={handleOpen} >
                    {filterComponent({ setOpen })}
                </TableFilterContainer>}
            </Grid>
        </LoadingCustomOverlay>
    );
};

export default CustomReactTable;
