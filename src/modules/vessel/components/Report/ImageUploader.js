import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import React from "react";
import { createStructuredSelector } from "reselect";
import { getCylinderNumbers, getOpenImageUploader } from "../../selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { actions as sliceActions } from "../../slice";

import SelectInput from "./SelectComponent";
import ImageView from "./ImageView";
import { STATE_REDUCER_KEY } from "../../constants";

const ImageUploader = (props) => {
    const { cylinder_numbers = 0, openImageUploader = false } = props;
    const cylinders = Array.from({ length: cylinder_numbers }, (_, idx) => ({
        id: `cylinder${idx + 1}`,
        name: `Cylinder ${idx + 1}`
    }));
    const dispatch = useDispatch();
    const cylinder = useSelector(state => state[STATE_REDUCER_KEY].currentCylinder);
    const handleClose = () => dispatch(sliceActions.setImageUploader(false));
    const handleOnChange = (e) => dispatch(sliceActions.setCylinderNumbers(e.target.value));
    const handleImageDone = () => dispatch(sliceActions.setImageUploadDone(true));
    return <Grid sx={{ bgcolor: "primary.main", px: 4 }}>
        <Dialog
            open={openImageUploader}
            onClose={handleClose}
            aria-labelledby="ImageUploader"
            aria-describedby="ImageUploader_desc"
        >
            <DialogTitle sx={{ color: "white.main", fontColor: 700 }} id="alert-dialog-title">
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
                <ContainedButton onClick={handleImageDone} disabled={cylinder}>Done </ContainedButton>
            </DialogActions>
        </Dialog>
    </Grid>;
};


const mapStateToProps = createStructuredSelector({
    cylinder_numbers: getCylinderNumbers,
    openImageUploader: getOpenImageUploader
});

const mapDispatchToProps = () => ({

});
const Popup = connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
export default React.memo(Popup);


