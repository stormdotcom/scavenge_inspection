import { Grid } from "@mui/material";

const CustomCardHeader = ({ title, component }) =>
    <Grid sx={{ height: 30 }} >
        <Grid container spacing={2}>
            <Grid item xs={10} sx={{ mt: "-5px" }}>{title}</Grid>
            <Grid item xs={2} sx={{ textAlign: "right", mt: "-12px" }}>{component}</Grid>
        </Grid>
    </Grid>;

export default CustomCardHeader;
