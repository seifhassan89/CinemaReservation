import { useSelector } from "react-redux";
import MuiAutocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import messages from "../../assets/locales/messages";

const Autocomplete = ({
  options,
  placeholder,
  value,
  onChange,
  name,
  id,
  isInputHasErr,
  getOptionDisabled,
  disabled,
  multiple,
}) => {
  const { locale } = useSelector((state) => state.locale);
  const { skeletonObject } = useSelector((state) => state.loader);
  const { shared } = messages[locale];

  const selectedOptions = multiple
    ? value?.map((id) => options.find((option) => option.id === id))
    : options.find((option) => option.id === value) || null;

  return (
    <MuiAutocomplete
      multiple={multiple}
      id={id}
      options={options}
      getOptionLabel={(option) => option?.name}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      noOptionsText={shared?.filters.noOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={isInputHasErr}
        />
      )}
      value={selectedOptions}
      onChange={(e, value) => {
        const selectedIds = multiple
          ? value.map((option) => option.id)
          : value?.id || null;
        onChange(selectedIds);
      }}
      loading={skeletonObject[name]}
      loadingText={shared?.filters.loading}
      getOptionDisabled={getOptionDisabled}
      disabled={disabled}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        );
      }}
    />
  );
};

export default Autocomplete;
