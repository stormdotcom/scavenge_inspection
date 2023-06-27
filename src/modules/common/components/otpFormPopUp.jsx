import { Components, Icons } from ;
import { Form, withFormik } from "formik";
import { Counter } from "modules/user-management/register/components/Counter";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { connect, useDispatch } from "react-redux";
import * as actions from "../actions";
import { getOtpDetails } from "../selectors";
import { createStructuredSelector } from "reselect";

const { CloseOutlined } = Icons;
const { Grid, Card, Modal, Box, CardHeader, IconButton, CustomCardHeader, CardContent, Divider } = Components;

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "70%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.while",
    border: "none",
    p: 4
};

export const OtpForm = ({ handleSubmit, open, setOpen, count, reset, otpDetails: { isVerified = false } = {} }) => {

    const [OTP, setOTP] = useState("");
    const dispatch = useDispatch();
    const [hide, setHide] = useState(false);
    function handleChange(otp) {
        setOTP(otp);
    }
    useEffect(() => {
        if (OTP.length === 6) {
            dispatch(actions.postOtp({ OTP }));
            if (!isVerified) {
                setOpen(false);
            }
        }
    }, [OTP]);

    useEffect(() => {
        if (count === 0) {
            setHide(true);
        }
        return () => {
            setHide(false);
        };
    }, [count]);

    const resendOtp = () => {
        dispatch(actions.resendOtp());
    };
    const handleBack = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Card sx={{ m: 2, width: "50%" }} >
                        <CardHeader sx={{ borderRadius: "10px 10px 0 0" }} title={<CustomCardHeader title={"verify"} component={hide && <IconButton onClick={handleBack}>
                            < CloseOutlined />
                        </IconButton>} />} />
                        <Form onSubmit={handleSubmit}>
                            <CardContent sx={{ m: 1, p: { lg: 5, sm: 1, xs: 1 } }}>
                                <Grid sx={{ pb: 1 }} >
                                    <OtpInput
                                        isInputSecure={true}
                                        onChange={handleChange}
                                        value={OTP}
                                        inputStyle="inputStyle"
                                        focusStyle="focusStyle"
                                        numInputs={6}
                                        separator={<span></span>}
                                        isInputNum="true"
                                    />
                                </Grid>
                            </CardContent>
                            <Divider />
                            <Grid sx={{ mb: 2, mt: 1 }} container justifyContent="center">
                                <Counter resendOtp={resendOtp} count={count} reset={reset} />
                            </Grid>
                        </Form>
                    </Card>
                </Box>
            </Modal>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addUserValue: (data) => dispatch(actions.postOtp(data))
});

const mapStateToProps = createStructuredSelector({
    otpDetails: getOtpDetails
});

const verifyForm = withFormik({
    enableReinitialize: true,
    displayName: "stepper"

})(OtpForm);

export default connect(mapStateToProps, mapDispatchToProps)(verifyForm);
