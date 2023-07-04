import { Box, Typography } from "@mui/material";
import { GridLoader as CustomLoader } from "react-spinners";

const Loader = (props) => {
    return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor="primary.main" >
        <Box sx={{ textAlign: "center" }}>
            <CustomLoader {...props} color="#f0c246" size={8} />
            <Typography sx={{ color: "secondary.light", fontSize: "16px", fontWeight: 800 }}>Scav AI </Typography>
        </Box>

    </Box >);
};

export default Loader;
