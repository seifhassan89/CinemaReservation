import { Box, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

import Autocomplete from "../Autocomplete";
import "./DropDown.scss";

const DropDown = ({
  options,
  value,
  name,
  placeholder,
  onChange,
  id,
  label,
  required,
  isInputHasErr,
  errMsg,
  getOptionDisabled,
  disabled,
  multiple,
}) => {
  return (
    <Box className="drop-down-wrapper">
      <InputLabel htmlFor={id} required={required} sx={{ mb: "2px" }}>
        {label}
      </InputLabel>
      <Autocomplete
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        id={id}
        isInputHasErr={isInputHasErr}
        getOptionDisabled={getOptionDisabled}
        disabled={disabled}
        multiple={multiple}
      />
      <FormHelperText error={isInputHasErr}>
        {isInputHasErr && errMsg}
      </FormHelperText>
    </Box>
  );
};

export default DropDown;
