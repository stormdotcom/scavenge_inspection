import { HomeOutlined } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY as COMMON } from "../../../modules/common";


const DATA = {
    STATUS: "something_went_wrong",
    TITLE: "Oops!"
};


const ErrorPage = (props) => {
    const navigate = useNavigate();
    const homePath = useSelector(state => state[COMMON].homePath);

    let { error: { status, message, statusText } = {}, image, title = DATA.TITLE } = props;
    return (
        <Grid sx={{ display: "flex", minHeight: "600px", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {image && <img src={image} alt='' height={"300"} width={"60%"} />}
            <Grid sx={{
                textAlign: "center", fontSize: "8rem", letterSpacing: "0.5rem"
            }}>
                {title}
            </Grid>
            <Typography sx={{
                letterSpacing: "0.4rem", fontSize: "1.8rem", color: "grey", textAlign: "center"
            }}>
                {status || DATA.STATUS}
            </Typography>

            {((message || statusText)) && < Typography sx={{
                letterSpacing: "0.2rem", fontSize: "0.8rem", color: "grey", textAlign: "center"
            }}>
                {message || statusText}
            </Typography>}
            {status && < Typography sx={{
                letterSpacing: "0.2rem", fontSize: "0.8rem", color: "grey", textAlign: "center"
            }}>
                {message || statusText}
            </Typography>}
            <Grid item xs={12} sx={{ bottom: "100px", position: "absolute" }}>
                <Grid sx={{ textAlign: "center" }}>
                    <Typography sx={{
                        fontSize: "1.6rem", letterSpacing: "0.4rem"
                    }}>Lets Go
                        <IconButton aria-label="home" size="large" onClick={() => navigate(`../${homePath}`)} color="primary">
                            <HomeOutlined fontSize="inherit" />
                        </IconButton>
                        Try Again
                    </Typography>
                </Grid>
            </Grid>
        </Grid >
    );
};

export default ErrorPage;
