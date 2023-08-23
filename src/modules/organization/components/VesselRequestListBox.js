import React from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import { STATE_REDUCER_KEY } from "../constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVesselRequestList } from "../actions";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { actions as sliceActions } from "../slice";

const VesselRequestListBox = () => {
    const dispatch = useDispatch(); //setModalViewDetails
    const viewVesselDetailsModal = useSelector(state => state[STATE_REDUCER_KEY].viewVesselDetailsModal);
    const handleClose = () => dispatch(sliceActions.setModalViewDetails(false));
    const handleViewDetails = (data) => {
        dispatch(sliceActions.setRequestDetails(data));
        dispatch(sliceActions.setModalViewDetails(true));
    };
    const { data: pendingList = [], requestInProgress = false } = useSelector(state => state[STATE_REDUCER_KEY].pendingVesselRequest);
    useEffect(() => {
        dispatch(fetchVesselRequestList());
    }, []);
    const handleRefresh = () => {
        dispatch(fetchVesselRequestList());
    };
    return <Box sx={{ bgcolor: "primary.light", width: "80%", py: 0.8, px: 0.5, borderRadius: "5px", height: { lg: "220px", xl: "380px" }, overflowY: "scroll" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ color: "secondary.main", mt: 2, ml: 3, borderRadius: "5px", fontSize: "14px", fontWeight: 700 }}> {"New Requests"}</Typography>
            <Box>
                <IconButton sx={{ position: "relative", top: "11px", left: "-20px" }} onClick={handleRefresh}>
                    <Autorenew sx={{ color: "shaded.main" }} />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ p: 1, mt: 0.3 }}>
            <LoadingCustomOverlay active={requestInProgress}>
                {pendingList.map((ele, idx) => {
                    return (
                        <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 0.5 }}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "column" }}>
                                <Typography sx={{ color: "white.main", fontSize: "14px", fontWeight: 600 }}>{ele.vesselDetails?.vessel_name || ""}</Typography>
                                <Typography sx={{ color: "shaded.main", fontSize: "11px", fontWeight: 600 }}>{ele.email}</Typography>
                            </Box>
                            <Box>
                                <Button size="small" variant="contained"
                                    onClick={handleViewDetails}
                                    sx={{
                                        padding: "2px 10px",
                                        minWidth: "100px", bgcolor: "primary.200", color: "shaded.main", fontSize: "11px", py: 0.3, px: 1
                                    }}> View Details</Button>
                            </Box>
                        </Box>
                    );
                })}
            </LoadingCustomOverlay>
        </Box>
        <Modal
            open={viewVesselDetailsModal}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "primary.600",
                boxShadow: 24,
                p: 4,
                minWidth: 300
            }}>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ color: "secondary.light" }}>
                    {"New Request"}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    This is the modal content.
                </Typography>
                <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    </Box>;
};

export default VesselRequestListBox;
