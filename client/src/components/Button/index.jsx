import MaterialButton from "@mui/material/Button";

export default function Button({
  className,
  label,
  labelClass,
  type,
  outlined,
  disabled,
  onClick,
  fullWidth,
  color,
  sx,
  ...rest
}) {
  return (
    <MaterialButton
      {...rest}
      sx={sx}
      className={`${className}`}
      fullWidth={fullWidth}
      variant={outlined ? "outlined" : "contained"}
      type={type}
      disabled={disabled}
      onClick={onClick}
      color={color}
    >
      <span className={labelClass}>{label}</span>
    </MaterialButton>
  );
}
