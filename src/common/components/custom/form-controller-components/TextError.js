import { Typography } from "@mui/material";

const TextError = (props) =>
  <Typography sx={{ color: "red", position: "absolute", bottom: "-16px" }} color="common.red" variant="p" >
    {props.children}
  </Typography>;

export default TextError;
