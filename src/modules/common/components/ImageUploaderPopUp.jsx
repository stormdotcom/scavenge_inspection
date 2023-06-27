import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
    extractImageFileExtensionFromBase64
} from "./CropHelper";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { grey, red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Components, Icons } from "../../../common/components";

export default function ImageUploaderPopUp({ id, name = "Name", description = "Sample", popupName = "Upload", action, open, setOpen, cropData, setCropData }) {
    const dispatch = useDispatch();
    const { Grid, Input, InputLabel, Typography, DialogActions, DialogContent, Divider, DialogTitle, IconButton } = Components;
    const { AddAPhoto, Close, CloudUpload, Crop, Image } = Icons;
    const [img, setImage] = useState({ imgSrc: null, imgSrcExt: null });
    const [error, setError] = useState(null);
    const [cropper, setCropper] = useState();
    const [showCropper, setShowCropper] = useState(false);
    const [imageMeta, setImageMeta] = useState();
    const imageMaxSize = 10000000; // bytes
    const acceptedFileTypesArray = ["image/x-png", "image/png", "image/jpg", "image/jpeg", "image/gif"];

    const verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            const sizeInMb = Math.round((currentFileSize / 1000000) * 100) / 100;
            if (currentFileSize > imageMaxSize) {
                setError("file_size_not_allowed" + sizeInMb);
                setShowCropper(false);
                return false;
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                setShowCropper(false);
                setError("files_not_allowed");
                return false;
            }
            return true;
        }
    };
    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };
    const formatImageData = (obj) => {
        let imageObj = {};
        _.set(imageObj, "contentType", _.get(obj, "type"));
        _.set(imageObj, "fileSizeKb", _.get(obj, "size"));
        _.set(imageObj, "resourceName", `${name}`);
        _.set(imageObj, "fileExtn", obj.type.split("/")[1]);
        _.set(imageObj, "resourceDescription", `${name} ${description}`);
        return imageObj;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setCropData(null);
        setImage({ imgSrc: null, imgSrcExt: null });
        setOpen(false);
        setError(null);
    };
    const handleImage = (e) => {
        setError("");
        let files = e.target.files;
        if (files && files.length > 0) {
            const isVerified = verifyFile(files);
            if (isVerified) {
                // imageBase64Data
                const currentFile = files[0];
                const myFileItemReader = new FileReader();
                myFileItemReader.addEventListener("load", () => {
                    const myResult = myFileItemReader.result;
                    setShowCropper(true);
                    setImageMeta(formatImageData(files[0]));
                    setImage({
                        imgSrc: myResult,
                        imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                    });
                }, false);

                myFileItemReader.readAsDataURL(currentFile);

            }
        }
    };
    const handleSubmit = () => {
        const regex = /data:.*base64,/;
        let base64EncodedData = cropData.replace(regex, "");
        let multimediaList = [{ ...imageMeta, base64EncodedData }];
        dispatch(action({ userId: id, multimediaList }));
        setImage({ imgSrc: null, imgSrcExt: null });
    };
    const customUploadStyle = {
        padding: "2px 4px",
        cursor: "pointer"
    };

    return (
        <Grid>
            <Button onClick={handleClickOpen}>
                <CloudUpload /> &nbsp; <Typography variant="p" sx={{ fontSize: 10 }}>{popupName}</Typography>
            </Button>
            <Dialog maxWidth={30} open={open} onClose={handleClose} sx={{ display: "flex", justifyContent: "center" }}>
                <DialogTitle >{"crop_image_title"}</DialogTitle>
                <Divider sx={{ width: "90%" }} />
                <DialogContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    {showCropper ?
                        <Cropper
                            style={{ height: "250px", width: "250px" }}
                            zoomTo={0.5}
                            initialAspectRatio={1 / 1}
                            preview=".img-preview"
                            src={img.imgSrc}
                            viewMode={1 / 1}
                            minCropBoxHeight={7}
                            minCropBoxWidth={7}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                        />
                        :
                        <Grid sx={{ width: "500px", height: "500px", display: "flex", justifyContent: "center" }}>
                            <Image sx={{ mx: "auto", my: "auto", transform: "scale(5.8)", color: grey[500], opacity: 0.8 }} />
                        </Grid>
                    }
                    <Grid sx={{ display: "flex", justifyContent: "center", border: 1 }}>
                        {cropData && <img style={{ width: "100%" }} src={cropData} alt="cropped" />}
                    </Grid>
                    <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", py: 1 }} >
                        <Grid>
                            <InputLabel htmlFor="file-upload" sx={customUploadStyle}>
                                <AddAPhoto />
                            </InputLabel>
                            <Input
                                id="file-upload"
                                type="file"
                                onChange={handleImage}
                                style={{ display: "none" }}
                            />
                        </Grid>
                        <Grid>
                            {error && <Typography variant="p" sx={{ textAlign: "center", color: red[500] }}>{error}</Typography>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={handleClose}><Close /></IconButton>
                    {cropData && <IconButton variant="contained" onClick={handleSubmit}> <CloudUpload /> </IconButton>}
                    <IconButton variant="contained" onClick={getCropData}><Crop /></IconButton>

                </DialogActions>
            </Dialog>
        </Grid>
    );
}
