import { Typography } from "@mui/material";

const TextError = (props) =>
  <Typography sx={{ color: "red", position: "absolute", bottom: "-16px", fontSize: { xs: "9px", sm: "10px", md: "11px", lg: "12px" } }} color="common.red" variant="p" >
    {props.children}
  </Typography>;

export default TextError;
