import { Typography } from "@mui/material";

const TextErrorType2 = (props) =>
    <Typography sx={{ postion: "relative", color: "error.main", fontSize: { xs: "9px", sm: "10px", md: "11px", lg: "12px" } }} color="error.main" variant="p" >
        {props.children}
    </Typography>;

export default TextErrorType2;
