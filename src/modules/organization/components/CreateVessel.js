import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../constants";
import { actions as sliceActions } from "../slice";
import CreateVesselForm from "./CreateVesselForm";
import { Icons } from "../../../common/components";
const { Close } = Icons;
const CreateVessel = () => {
    const dispatch = useDispatch();
    const createVesselModal = useSelector(state => state[STATE_REDUCER_KEY].createVesselModal);
    const handleClose = () => dispatch(sliceActions.setModal(false));
    const handleOpen = () => dispatch(sliceActions.setModal(true));
    return <Box sx={{
        bgcolor: "primary.light", width: "80%", borderRadius: "5px"
    }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", pt: "29%", pb: { md: "30px" }, flexDirection: "column" }}>
            <Box >
                <IconButton onClick={handleOpen} >
                    <AddCircleIcon sx={{ color: "shaded.main", transform: "scale(5)" }} />
                </IconButton>
            </Box>
            <Typography sx={{ color: "white.main", fontWeight: 700, mt: 4 }}>{"Create New Vessel"}</Typography>
        </Box>
        <Modal
            open={createVesselModal}
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
                minWidth: 300,
                textAlign: "center"
            }}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", right: "-1px", top: "-2px" }}>
                    <Close sx={{ color: "white.main" }} />
                </IconButton>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ color: "secondary.light", fontWeight: 700 }}>
                    {"Add New Vessel"}
                </Typography>
                <CreateVesselForm />
            </Box>
        </Modal>
    </Box>;
};

export default CreateVessel;
