import { InputLabel } from "@mui/material";

import { withFormik } from "formik";
import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import { Components, FormController, Icons } from "../../material/Icons";


const FileUploadRemark = ({ label = "", setBlobArray, viewOnly = false, imageUrl = [], edit, setIdx, name = "fileUpload" }) => {
    const [attachment, setAttachment] = useState([]);
    const [file, setFile] = useState([]);
    const { Grid, Box, Card, Stack, IconButton, Tooltip } = Components;
    const { AddCircleOutline, CloseOutlined, PictureAsPdfTwoTone } = Icons;

    useEffect(() => {
        if (imageUrl.length > 0) {
            setFile(imageUrl);
            setAttachment(imageUrl);
        }
    }, [edit, imageUrl]);

    function uploadSingleFile(e) {
        let files = e.target.files;
        let idx = new Date(); attachment;
        setFile([...file, { idx: idx, fileType: files[0].type, url: URL.createObjectURL(e.target.files[0]) }]);
        const currentFile = files[0];
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            const regex = /data:.*base64,/;
            let base64EncodedData = reader.result.replace(regex, "");
            let regexAll = (/\.[0-9a-z]+$/i)[0];
            let fileExtn = files[0].name.replace(regexAll, "");
            setAttachment([...attachment, {
                idx: idx,
                base64EncodedData: base64EncodedData,
                fileExtn: fileExtn.split(".").pop(),
                contentType: files[0].type,
                fileSizeKb: files[0].size,
                resourceName: files[0].name,
                resourceDescription: "complaints"
            }]);
        });
        reader.readAsDataURL(currentFile);
    }

    useEffect(() => {
        setBlobArray(attachment);
    }, [attachment]);

    const downloadFile = (item) => {
        window.open(`${item}`, "_blank");
    };

    function deleteFile(e) {
        if (e.id) {
            setIdx(e.id);
        }
        setFile(file.filter((item) => item.idx !== e.idx));
        setBlobArray(attachment.filter(item => item.idx !== e.idx));
    }

    const handleRemark = (val, i) => {
        const fileValue = file;
        fileValue[i].remarks = val;
        setFile(fileValue);
        if (attachment[i]) {
            const attachmentVal = attachment;
            attachmentVal[i].resourceDescription = val;
            setAttachment(attachmentVal);
        }
    };

    return (
        <>
            <InputLabel >{label}</InputLabel>
            <Card sx={{ backgroundColor: "#fff", width: "100%", p: "10px", display: "flex", alignItems: "center", boxShadow: "none", border: "1px solid #CFE7DE" }}>
                <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                    <Stack direction={{ sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center" >
                        {file.length > 0 &&
                            file.map((item, i) => {
                                return (
                                    <>
                                        <Grid key={item.url} sx={{ width: "250px", border: "1px dashed #CFE7DE", display: "flex", justifyContent: "flex-start", borderRadius: "10px" }}>
                                            <Grid>
                                                {viewOnly ? <IconButton
                                                    inverted
                                                    onClick={() => deleteFile(item)} sx={{ position: "relative", top: "10px", float: "right", backgroundColor: "#f9e6e2", paddingLeft: "5", paddingRight: "5", borderRadius: "5px" }}
                                                    shape="circular" >
                                                    <CloseOutlined sx={{ margin: "1px", fontSize: "12px", color: "red" }} />
                                                </IconButton> :
                                                    ""}
                                                <Grid item sx={{ cursor: "pointer" }}>
                                                    {item.fileType === "application/pdf" ? <PictureAsPdfTwoTone style={{ fontSize: "xxx-large", marginTop: "40px", marginLeft: "80px" }} color="primary" onClick={() => downloadFile(item.url)} />
                                                        : <img style={{ objectFit: "fill" }} src={item.url} width={"100%"} height={"60px"} onClick={() => downloadFile(item.url)} />}
                                                </Grid>
                                                {item.id ?
                                                    <FormController disabled={true} control="input" name={`file[${i}].remarks`} value={item.remarks} placeholder={"remarks"} /> :
                                                    <FormController control="input" name={`file[${i}].remarks`} value={item.remarks} onChangeText={(val) => handleRemark(val, i)} placeholder={"remarks"} />}

                                            </Grid>
                                        </Grid>
                                    </>
                                );
                            })}
                    </Stack>

                </Box>

                <Stack direction="row" >
                    <Grid sx={{ p: "32px" }}>
                        {viewOnly && <label htmlFor={name} >
                            <Tooltip title="Upload" >

                                <AddCircleOutline size="large" sx={{
                                    cursor: "pointer"
                                }} />
                            </Tooltip>
                            <input
                                id={name}
                                style={{ display: "none" }}
                                type={"file"}
                                accept=".png,.jpg,.jpeg,.pdf"
                                direction={{ xs: "column", sm: "row" }}
                                disabled={file.length === 3}
                                onChange={uploadSingleFile}
                            />
                        </label>}
                    </Grid>
                </Stack>
            </Card>
        </>);
};
const FileUploadRemarks = withFormik({
    enableReinitialize: true,
    displayName: "FileUploadForm"
})(FileUploadRemark);

export default connect(null, null)(FileUploadRemarks);
