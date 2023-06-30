import { Typography } from "@mui/material";

const TextErrorType2 = (props) =>
    <Typography sx={{ postion: "relative", color: "error.main", fontSize: "10px" }} color="error.main" variant="p" >
        {props.children}
    </Typography>;

export default TextErrorType2;
