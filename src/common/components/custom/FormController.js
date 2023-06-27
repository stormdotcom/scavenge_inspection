import { Files, Checkbox, CustomInput, CustomSelect, DatePicker, Input, RadioButtons, Textarea, FileUploader, ToggleButton } from "./form-controller-components";
import FileUploadCommon from "./form-controller-components/FileUploadCommon";

const FormController = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <CustomSelect {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "customInput":
      return <CustomInput {...rest} />;
    case "file":
      return <Files {...rest} />;
    case "fileUploader":
      return <FileUploader {...rest} />;
    case "fileUpload":
      return <FileUploadCommon {...rest} />;
    case "toggleButton":
      return <ToggleButton {...rest} />;
    default:
      return null;
  }
};

export default FormController;
