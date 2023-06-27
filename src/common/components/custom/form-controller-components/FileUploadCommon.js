import { InputLabel } from "@mui/material";


const FileUploadCommon = ({ isMandatory = false, label = "", name = "fileUpload" }) => {


    return (
        <>
            <InputLabel htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "14px" }}> *</span>}</InputLabel>

        </>);
};

export default FileUploadCommon;
