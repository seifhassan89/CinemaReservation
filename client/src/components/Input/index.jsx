import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, FormHelperText } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";

export default function Input({
  required,
  fullWidth,
  id,
  label,
  name,
  autoComplete,
  autoFocus,
  type,
  onChange,
  inputWrapperClass,
  isInputHasErr,
  helperTextClass,
  errMsg,
  helperText,
  disabled,
  value,
  inputClass,
  sxWrapper,
  onBlur,
  inputTestId,
  placeholder,
  multiline,
  startAdornment,
  inputProps,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { isRtl } = useSelector((state) => state.locale);

  return (
    <Box
      className={inputWrapperClass}
      sx={{ ...sxWrapper, width: "100%" }}
      data-testid={"input-wrapper"}
    >
      <InputLabel htmlFor={id} required={required} sx={{ mb: "2px" }}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...props}
        required={required}
        fullWidth={fullWidth}
        id={id}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        type={showPassword ? "text" : type}
        disabled={disabled}
        error={isInputHasErr}
        value={value}
        className={inputClass}
        multiline={multiline}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
        startAdornment={
          startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )
        }
        onBlur={onBlur}
        sx={{
          backgroundColor: "background.main",
          borderRadius: "8px",
          color: "text.input",
        }}
        inputProps={{
          "data-testid": inputTestId,
          dir: "auto",
          style: {
            textAlign: isRtl ? "right" : "left",
          },
          ...inputProps,
        }}
        placeholder={placeholder}
      />
      <FormHelperText error={isInputHasErr} className={helperTextClass}>
        {isInputHasErr ? errMsg : helperText}
      </FormHelperText>
    </Box>
  );
}
