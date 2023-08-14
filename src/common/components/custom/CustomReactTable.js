import MaterialReactTable from "material-react-table";
import { useEffect, useRef, useState } from "react";
import { Components } from "../../components";
import TableFilterContainer from "./TableFilterContainer";
import LoadingCustomOverlay from "../../../modules/common/components/LoadingOverlay";
import { TablePagination } from "@mui/material";

const { Grid, Box, Typography, IconButton, Tooltip } = Components;

const CustomReactTable = ({ data, columns, options, title = "", enableRowVirtualization = false, enableCustomTableFilter = false, filterComponent }) => {
    const virtualizerInstanceRef = useRef(null);
    const [sorting, setSorting] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const {
        page = 0, state, enableCustomPagination = true,
        customPagination: {
            handleChangePage,
            handleChangeRowsPerPage,
            rowsPerPageOptions = []
        } = {},
        toolBarActions = [], totalCount = 1, pageSize = 0,
        enableFilters = false, displayColumnDefOptions, getCanMultiSelect, handleRowSelection, requestInProgress, ...rest } = options;
    useEffect(() => {
        if (virtualizerInstanceRef.current) {
            virtualizerInstanceRef.current.scrollToIndex(0);
        }
    }, [sorting]);
    return (
        <LoadingCustomOverlay active={requestInProgress}>
            <Grid sx={{
                m: 2, borderRadius: "25px", bgcolor: "#181b1e",
                border: "1px solid #181b1e",
                padding: "7px", color: "#ffffff", pb: 2
            }}>
                <Grid sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                    {title && <Grid>
                        <Typography sx={{ float: "left", color: "#ffffff", padding: "5px", fontWeight: 600, fontSize: "24px", mt: 3 }} variant="h4" component='p'> {title}</Typography>
                    </Grid>}
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
                    muiTableContainerProps={{ sx: { maxHeight: "600px", color: "#ffffff" } }}
                    onSortingChange={setSorting}
                    displayColumnDefOptions={displayColumnDefOptions}
                    getCanMultiSelect={getCanMultiSelect}
                    enableColumnFilter={enableFilters ? true : false}
                    onRowSelectionChange={handleRowSelection}
                    enableBottomToolbar={false}
                    enableStickyFooter={false}
                    muiTableHeadRowProps={{
                        sx: {
                            backgroundColor: "#212529"
                        }
                    }}
                    // muiTablePaperProps={{
                    //     elevation: 1,
                    //     sx: {
                    //         backgroundColor: "#181b1e"
                    //     }
                    // }}
                    muiTableBodyCellProps={{
                        sx: {
                            fontSize: "11px",
                            color: "#fff",
                            borderTop: "1px solid #181b1e"

                        }
                    }}
                    muiTableBodyRowProps={{
                        sx: {
                            fontSize: "11px",
                            color: "#000",
                            borderTop: "1px solid #181b1e",
                            backgroundColor: "#0000",
                            "&:hover": {
                                backgroundColor: "#0fdd !important"
                            }
                        }
                    }}
                    muiTopToolbarProps={{
                        sx: {
                            display: "block",
                            flexDirection: "column",
                            backgroundColor: "#181b1e"
                        }
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#ffffff",
                            py: 3
                        }
                    }}

                    {...rest}
                />
                {enableCustomPagination && <Grid sx={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TablePagination
                        sx={{
                            color: "#ffffff",
                            "& .MuiSelect-icon": {
                                color: "#ffffff"
                            }
                        }}
                        component="div"
                        count={totalCount}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={pageSize}
                        rowsPerPageOptions={rowsPerPageOptions}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* <Pagination
                        color="primary"
                        shape="rounded"
                        count={totalPages}
                        page={newPage}
                        onChange={handleChangePage}
                    /> */}
                </Grid>}
                {(enableCustomTableFilter && open) && <TableFilterContainer open={open} setOpen={setOpen} handleOpen={handleOpen} >
                    {filterComponent({ setOpen })}
                </TableFilterContainer>}
            </Grid>
        </LoadingCustomOverlay>
    );
};

export default CustomReactTable;
