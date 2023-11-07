import { Typography } from "@mui/material";

const TextError = (props) =>
  <Typography sx={{ color: "red", position: "absolute", bottom: "-16px", fontWeight: { xs: 400, md: 600 }, fontSize: { xs: "9px", sm: "10px", md: "11px", lg: "12px" } }} color="common.red" variant="p" >
    {props.children}
  </Typography>;

export default TextError;
