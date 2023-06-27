import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { ScaleLoader, PulseLoader } from "react-spinners";
import palette from "../../../common/themes/palette.json";
const LoadingCustomOverlay = ({ active, children, spinnerProps = "" }) => {
    let loader = <ScaleLoader color={palette.palette.primary.main} />;

    switch (spinnerProps) {
        case "selectTagProp":
            loader = <PulseLoader color={palette.palette.primary.main} />;
            break;
        default:
            loader = <ScaleLoader color={palette.palette.primary.main} />;
            break;
    }

    return <LoadingOverlay
        active={active}
        styles={{
            overlay: (base) => ({
                ...base,
                background: "transparent",
                zIndex: 999
            })
        }}

        spinner={loader}
    >
        {children}
    </LoadingOverlay>;

};
export default LoadingCustomOverlay;
