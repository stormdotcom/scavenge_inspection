import { Refresh } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY as COMMON } from "../../../modules/common";
import { refresh } from "../../../modules/common/actions";
import { actions as commonActions } from "../../../modules/common/slice";
import { useEffect } from "react";
import ContainedButton from "./ContainedButton";
import notFoundImage from "../../../assets/images/404.png";
const DATA = {
    STATUS: "Something went wrong",
    TITLE: "Error",
    HEADER: "Oops! Page not found"
};


const ErrorPage = (props) => {
    const navigate = useNavigate();
    const homePath = useSelector(state => state[COMMON].homePath);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state[COMMON].isLoggedIn);
    const safePath = isLoggedIn ? homePath : "signin";
    useEffect(() => {
        dispatch(commonActions.setNavigator(navigate));
    }, []);
    let { error: { status, message, statusText } = {}, image, title = DATA.TITLE } = props;
    return (
        <Grid sx={{ display: "flex", minHeight: "600px", height: "100vh", backgroundColor: "primary.main", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img src={notFoundImage || image} alt='notFoundImage' height={"270"} width={"60%"} />
            <Grid sx={{
                textAlign: "center", fontSize: "2rem", fontWeight: 600, letterSpacing: "8px", color: "white.main", position: "absolute"
            }}>
                {DATA.HEADER}
            </Grid>
            <Grid sx={{ textAlign: "center", width: "50%" }}>
                <Typography sx={{
                    fontSize: "0.9rem", color: "white.main"
                }}>Looks like you’re lost in the voyage Let's navigate back to smoother waters.
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{}}>
                <Grid sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    <ContainedButton onClick={() => navigate(`../${safePath}`)} sx={{ fontWeight: 700 }}> Back to Homepage</ContainedButton>  <Typography sx={{
                        fontSize: "1.6rem", letterSpacing: "0.4rem"
                    }}>
                        <IconButton aria-label="home" size="large" onClick={() => dispatch(refresh())} color="primary">
                            <Refresh fontSize="inherit" sx={{ color: "secondary.main" }} />
                        </IconButton>
                    </Typography>
                </Grid>
            </Grid>
            {(process.env.NODE_ENV === "development") && <Grid sx={{ top: "50px", position: "absolute", backgroundColor: "primary.light", p: 3, borderRadius: "15px" }}>
                <Typography sx={{
                    fontSize: "2rem", color: "error.main", fontWeight: 600, letterSpacing: "8px", textAlign: "center"
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    letterSpacing: "0.4rem", color: "error.main", fontSize: "1.8rem", textAlign: "center"
                }}>
                    {status || DATA.STATUS}
                </Typography>

                {((message || statusText)) && < Typography sx={{
                    letterSpacing: "0.2rem", color: "error.main", fontSize: "0.8rem", textAlign: "center"
                }}>
                    {message || statusText}
                </Typography>}
                {status && < Typography sx={{
                    letterSpacing: "0.2rem", color: "error.main", fontSize: "0.8rem", textAlign: "center"
                }}>
                    {message || statusText}
                </Typography>}
            </Grid>}
        </Grid >
    );
};

export default ErrorPage;
