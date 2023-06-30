import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import React from "react";
import { createStructuredSelector } from "reselect";
import { getCylinderNumber, getOpenImageUploader } from "../../selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { actions as sliceActions } from "../../slice";
import { showPredictions } from "../../actions";
import SelectInput from "./SelectComponent";
import ImageView from "./ImageView";
import { STATE_REDUCER_KEY } from "../../constants";
const ImageUploader = (props) => {
    const { cylinderNumber = 0, openImageUploader = false } = props;
    const cylinders = Array.from({ length: cylinderNumber }, (_, idx) => ({
        id: idx + 1,
        name: `Cylinder ${idx + 1}`
    }));
    const dispatch = useDispatch();
    const cylinder = useSelector(state => state[STATE_REDUCER_KEY].currentCylinder);
    const handleClose = () => dispatch(sliceActions.setImageUploader(false));
    const handleShowPredictions = () => dispatch(showPredictions());
    const handleOnChange = (e) => dispatch(sliceActions.setCylinderNumber(e.target.value));
    return <Grid sx={{ bgcolor: "primary.main", px: 4 }}>
        <Dialog
            open={openImageUploader}
            onClose={handleClose}
            aria-labelledby="ImageUploader"
            aria-describedby="ImageUploader_desc"
        >
            <DialogTitle id="alert-dialog-title">
                Cylinder Image Uploader
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Typography sx={{ color: "white.main" }}> Select Cylinder Number </Typography>
                    <SelectInput name={"cylinder"} options={cylinders || []} onChange={handleOnChange} />
                </Box>
                <Box>
                    <ImageView />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: "white.main" }} onClick={handleClose}>Cancel</Button>
                <ContainedButton onClick={handleShowPredictions} disabled={cylinder}>Show Predictions </ContainedButton>
            </DialogActions>
        </Dialog>
    </Grid>;
};


const mapStateToProps = createStructuredSelector({
    cylinderNumber: getCylinderNumber,
    openImageUploader: getOpenImageUploader
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);

