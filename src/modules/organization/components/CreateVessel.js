import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../constants";
import { actions as sliceActions } from "../slice";
const CreateVessel = () => {
    const dispatch = useDispatch();
    const createVesselModal = useSelector(state => state[STATE_REDUCER_KEY].createVesselModal);
    const handleClose = () => dispatch(sliceActions.setModal(false));
    const handleOpen = () => dispatch(sliceActions.setModal(true));
    return <Box sx={{
        bgcolor: "primary.light", width: "80%", borderRadius: "5px"
    }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: "29%", flexDirection: "column" }}>
            <Box >
                <IconButton onClick={handleOpen}>
                    <AddCircleIcon sx={{ color: "shaded.main", transform: "scale(5)" }} />
                </IconButton>
            </Box>
            <Typography sx={{ color: "white.main", fontWeight: 700, mt: 4 }}>{"Create New Vessel"}</Typography>
        </Box>
        <Modal
            open={createVesselModal}
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

export default CreateVessel;
