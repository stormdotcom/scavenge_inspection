import { Box } from "@mui/material";
import { GridLoader as CustomLoader } from "react-spinners";

const Loader = (props) => {
    return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" >
        <CustomLoader {...props} />
    </Box>);
};

export default Loader;
