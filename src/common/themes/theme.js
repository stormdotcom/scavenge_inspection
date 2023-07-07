import { createTheme } from "@mui/material/styles";
import button from "./button.json";
import buttonBase from "./buttonBase.json";
import checkbox from "./checkbox.json";
import components from "./components.json";
import inputField from "./inputField.json";
import palette from "./palette.json";
import select from "./select.json";
import shape from "./shape.json";
import spacing from "./spacing.json";
import textfield from "./textfield.json";
import typography from "./typography.json";
import pagination from "./pagination.json";
import card from "./card.json";
import inputBase from "./inputBase.json";
import listItemButton from "./listItemButton.json";
import paper from "./paper.json";
import cardHeader from "./cardHeader.json";
import formLabel from "./FormLabel.json";
import toggleButton from "./ToggleButton.json";
const overrides = {
  components: {
    ...inputField,
    ...button,
    ...checkbox,
    ...select,
    ...textfield,
    ...buttonBase,
    ...card,
    ...pagination,
    ...inputBase,
    ...listItemButton,
    ...paper,
    ...cardHeader,
    ...formLabel,
    ...toggleButton
  }
};
const customThemes = {
  ...palette,
  ...typography,
  ...spacing,
  ...shape,
  ...components,
  ...overrides
};

export { palette };
const theme = createTheme({ ...customThemes });
export default theme;
