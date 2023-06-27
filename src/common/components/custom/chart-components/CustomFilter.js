import React from "react";
import { DefaultComponents } from "common/components/material/Components";
import { Icons } from "common/components/material/Icons";

const { Accordion, AccordionSummary, AccordionDetails, Typography } = DefaultComponents;
const { ExpandMore } = Icons;

const Filters = (props) => {
    const { filter } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header" >
                <Typography sx={{ flexShrink: 0 }}>
                    Filters
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {filter({ ff: "dddddddd" })}
            </AccordionDetails>
        </Accordion>
    );
};


export default Filters;

