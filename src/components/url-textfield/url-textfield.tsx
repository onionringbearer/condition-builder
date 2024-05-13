import { UrlRegex } from "@/utils/regex";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";

type UrlTextFieldProps = Omit<TextFieldProps, "onChange"> & {
  /** The helper text to be displayed. */
  tip?: string;
  /** The error message to be displayed when the URL is invalid. Will replace `tip`.  */
  errorMessage?: string;
  /**
   * Callback function to be called when the URL changes.
   *
   * Does not trigger if the URL is invalid.
   *
   * @returns the URL string if it is valid. An empty string if
   * the field is empty.
   */
  onChange?: (url: string) => void;
};

/**
 * An MUI textfield that validates the input as a URL.
 */
const UrlTextField = ({
  label,
  tip = "",
  errorMessage = "",
  onChange,
  ...rest
}: UrlTextFieldProps): JSX.Element => {
  const [url, setUrl] = useState("");
  const [helperText, setHelperText] = useState(tip);
  const [error, setError] = useState(false);

  const validateUrl = (url: string): boolean => {
    return !url || UrlRegex.test(url);
  };

  useEffect(() => {
    const isValidUrl = validateUrl(url);
    setError(!isValidUrl);
    setHelperText(isValidUrl ? tip : errorMessage);
  }, [url, errorMessage, tip]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value.trim();
    setUrl(newUrl);
    if (validateUrl(newUrl)) {
      onChange?.(newUrl);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={url}
      helperText={helperText}
      error={error}
      onChange={handleUrlChange}
      {...rest}
    />
  );
};

export default UrlTextField;
