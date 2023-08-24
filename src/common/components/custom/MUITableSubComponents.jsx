import { styled } from "@mui/system";
import { TableCell, TableRow } from "@mui/material";

const StyledTableRow = styled(TableRow)({
    "&:hover": {
        backgroundColor: "transparent" // Remove the row hover effect
    },
    borderBottom: "none"
});
const CustomTableCell = styled(TableCell)(({ textcolor }) => ({
    color: textcolor || "white", // Set cell text color to the prop value or white,
    borderBottom: "none"
}));


export { CustomTableCell, StyledTableRow };
