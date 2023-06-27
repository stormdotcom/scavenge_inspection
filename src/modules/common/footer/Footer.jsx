import { Components } from "../../../common/components";

const { Grid, Typography } = Components;


const Footer = () => {
    return (
        <Grid sx={{ display: "flex", justifyContent: "end", width: "100%", pr: { md: "80px", sm: "40px", xs: "20px" }, py: 2 }}>
            <Typography sx={{ pl: 2, fontSize: "12px" }}>{"Copyright"}</Typography>
        </Grid >
    );
};

export default Footer;
