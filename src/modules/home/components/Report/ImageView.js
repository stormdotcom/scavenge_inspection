import { Box, Input, InputLabel, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { actions as sliceActions } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import UploadIcon from "@mui/icons-material/Upload";
import { STATE_REDUCER_KEY } from "../../constants";

const ImageView = () => {

    const acceptedFileTypesArray = ["image/x-png", "image/png", "image/jpg", "image/jpeg"];
    const [err, setError] = useState(false);
    const viewToggle = useSelector(state => state[STATE_REDUCER_KEY].viewToggle);
    const image = useSelector(state => state[STATE_REDUCER_KEY].image);
    const cylinder = useSelector(state => state[STATE_REDUCER_KEY].currentCylinder);
    const imageMaxSize = 10000000; // bytes
    const dispatch = useDispatch();
    const verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            const sizeInMb = Math.round((currentFileSize / 1000000) * 100) / 100;
            if (currentFileSize > imageMaxSize) {
                setError("File size not allowed" + sizeInMb);
                return false;
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                setError("File Type Not allowed");
                return false;
            }
            return true;
        }
    };
    const handleImage = (e) => {
        setError("");
        let files = e.target.files;
        if (files && files.length > 0) {
            const isVerified = verifyFile(files);
            if (isVerified) {
                // imageBase64Data
                const currentFile = files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const imageData = reader.result;
                    dispatch(sliceActions.setImage({ cylinder, image: imageData }));
                };
                reader.readAsDataURL(currentFile);
            }
        }
    };
    return <>
        <InputLabel htmlFor="file-upload">
            <Paper sx={{
                display: "flex", justifyContent: "center", alignItems: "center",
                m: 2,
                width: "90%",
                minHeight: "30vh",
                maxHeight: "70vh",
                backgroundColor: "primary.light",
                padding: (theme) => theme.spacing(2),
                transition: "background-color 0.3s",
                "&:hover": {
                    backgroundColor: "primary.200",
                    cursor: "pointer"
                }

            }}>
                {viewToggle ?
                    <img src={image[cylinder]} alt="UploadedImage" style={{ width: "100%", height: "auto" }} />
                    :
                    <Box> <UploadIcon sx={{ color: "primary.main", transform: "scale(2)", cursor: "pointer" }} /> </Box>
                }
            </Paper>

        </InputLabel>
        <Input
            id="file-upload"
            type="file"
            onChange={handleImage}
            style={{ display: "none" }}
        />
        <Box>
            {err && <Typography variant="p" sx={{ color: "#fff" }}> {err}</Typography>}
        </Box>
    </>;
};

export default ImageView;
