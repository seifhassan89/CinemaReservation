import { useSelector } from "react-redux";
import { DatePicker } from "react-nice-dates";
import { enGB, arEG } from "date-fns/locale";
import { Box, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

import "./DatePicker.scss";

export default function CustomDatePicker({
  date,
  setDate,
  required,
  id,
  name,
  isInputHasErr,
  errMsg,
  label,
  minDate,
  maxDate,
  disabled,
}) {
  const { isRtl } = useSelector((state) => state.locale);
  return (
    <Box className="date-picker-wrapper">
      <InputLabel htmlFor={id} required={required} sx={{ mb: "2px" }}>
        {label}
      </InputLabel>
      <DatePicker
        date={date}
        onDateChange={setDate}
        locale={isRtl ? arEG : enGB}
        minimumDate={minDate}
        maximumDate={maxDate}
        format="dd/MM/yyyy"
      >
        {({ inputProps, focused }) => (
          <input
            {...inputProps}
            className={`input${focused ? " -focused" : ""}${
              isInputHasErr ? " error" : ""
            }${disabled ? " disabled" : ""}`}
            required={required}
            id={id}
            name={name}
            disabled={disabled}
          />
        )}
      </DatePicker>
      <FormHelperText error={isInputHasErr}>
        {isInputHasErr && errMsg}
      </FormHelperText>
    </Box>
  );
}
