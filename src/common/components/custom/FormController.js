import { Files, Input3, Input2, Checkbox, CustomInput, CustomSelect, DatePicker, Input, RadioButtons, Textarea, FileUploader, ToggleButton, SimpleDate, SimpleDateType2 } from "./form-controller-components";
import FileUploadCommon from "./form-controller-components/FileUploadCommon";

const FormController = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "input2":
      return <Input2 {...rest} />;
    case "input3":
      return <Input3 {...rest} />;
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
    case "date2":
      return <SimpleDate {...rest} />;
    case "date3":
      return <SimpleDateType2 {...rest} />;
    default:
      return null;
  }
};

export default FormController;
