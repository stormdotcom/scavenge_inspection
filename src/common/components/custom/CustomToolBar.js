import React from "react";
import { Components } from "../../components";

const { Box, IconButton, Tooltip } = Components;

const CustomToolBar = ({ toolBarActions, setOpen }) => {

    return (
        <>
            {
                toolBarActions.length > 0 && <Box sx={{ marginLeft: 1 }}>
                    {toolBarActions && toolBarActions.map((element) => {
                        if (element.key === "customFilter") {
                            return <Tooltip key={element.title} title={element.title} onClick={() => setOpen(true)}>
                                <IconButton
                                >
                                    {element?.icon}
                                </IconButton>
                            </Tooltip>;
                        }
                        return <Tooltip key={element?.title} title={element.title || ""} onClick={element.handleClick}>
                            <IconButton
                            >
                                {element?.icon}
                            </IconButton>
                        </Tooltip>;
                    })}
                </Box>
            }
        </>

    );
};

export default CustomToolBar;
