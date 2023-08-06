import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialCheckbox from "@mui/material/Checkbox";

export default function Checkbox({
  label,
  checked,
  onChange,
  color,
  labelClass,
  id,
  disabled,
  name,
}) {
  return (
    <div className="checkbox-container">
      <FormControlLabel
        control={
          <MaterialCheckbox
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            color={color}
            id={id}
            disabled={disabled}
          />
        }
        label={label}
        className={`${labelClass}`}
        labelPlacement="end"
        data-testid={"checkbox-container"}
      />
    </div>
  );
}
