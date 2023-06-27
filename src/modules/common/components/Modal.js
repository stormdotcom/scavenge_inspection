import { Backdrop, Fade, Grid, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { STATE_REDUCER_KEY } from "../constants";
import palette from "../../../common/themes/palette.json";

const StatusModal = () => {
    const data = useSelector(state => state[STATE_REDUCER_KEY]).statusModal;
    const { isOpen = false, title = "", content, showLoader = true } = data;

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500
        }}
    >
        <Fade in={isOpen}>
            <Grid sx={theme => ({
                position: "absolute",
                backgroundColor: palette.palette.primary.light,
                border: `4px solid ${palette.palette.primary.main}`,
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3)
            })} >
                {title && <h2 id="transition-modal-title">{title}</h2>}
                {content && <h4 id="transition-modal-description">{content}</h4>}
                {showLoader && <div style={{ textAlign: "center" }}><ScaleLoader color={palette.palette.primary.main} /></div>}
            </Grid>
        </Fade>
    </Modal >
    );
};

export default StatusModal;
