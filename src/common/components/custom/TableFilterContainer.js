import { Box, Modal } from "@mui/material";
import React from "react";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    bgcolor: "background.while",
    border: "none",
    p: 4
};
const TableFilterContainer = (props) => {
    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box style={modalStyle} >
                {props.children}
            </Box>
        </Modal>
    );
};

export default TableFilterContainer;
