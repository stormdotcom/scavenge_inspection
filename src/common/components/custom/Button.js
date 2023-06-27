import { Button as MUIButton } from "@mui/material";

const Button = (props) => {
    return (
        <MUIButton variant="contained" {...props} />
    );
};

export default Button;
