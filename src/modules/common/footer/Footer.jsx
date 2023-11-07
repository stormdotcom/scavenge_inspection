import { useDispatch, useSelector } from "react-redux";
import { Components } from "../../../common/components";
import { actions as commonSliceAction } from "../slice";
import TermsAndCondition from "../TermsAndCondition/TermsAndCondition";
import { STATE_REDUCER_KEY } from "../constants";
const { Grid, Typography } = Components;


const Footer = () => {
    const dispatch = useDispatch();
    const handleTermsAndCond = () => dispatch(commonSliceAction.toggleShowHideTC(true));
    const handleCloseTC = () => dispatch(commonSliceAction.toggleShowHideTC(false));
    const tcOpen = useSelector(state => state[STATE_REDUCER_KEY].tcOpen);
    return (
        <>
            <Grid sx={{ bgcolor: "primary.light", display: "flex", justifyContent: "end", width: "100%", pr: { md: "80px", sm: "40px", xs: "20px" }, py: 2 }}>
                <Typography onClick={handleTermsAndCond} sx={{ pl: 2, fontSize: "12px", cursor: "pointer", color: "white.main" }}>{"Terms and Conditions"}</Typography>
                <Typography sx={{ pl: 2, fontSize: "12px", color: "white.main" }}>{"Scav-AI | Copyright"}</Typography>
            </Grid >
            <TermsAndCondition handleClose={handleCloseTC} open={tcOpen} />
        </>
    );
};

export default Footer;
