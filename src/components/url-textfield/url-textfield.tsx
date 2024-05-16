import { UrlRegex } from "@/lib/utils/regex";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";

export type UrlTextFieldErrorMessages = {
  default: string;
  responseError: string;
};

type UrlTextFieldProps = Omit<TextFieldProps, "onChange"> & {
  /** The helper text to be displayed. */
  tip?: string;
  /** The error message to be displayed when the URL is invalid. Will replace `tip`.  */
  errorMessage?: UrlTextFieldErrorMessages;
  /** If true, the input will be marked as invalid. */
  responseError?: boolean;
  /** The error message to be displayed when the URL fails to produce a valid response. Will replace `tip`. */
  responseErrorMessage?: string;
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

const defaultErrorMessages: UrlTextFieldErrorMessages = {
  default: "Invalid URL",
  responseError: "Failed to fetch data",
};

/**
 * An MUI textfield that validates the input as a URL.
 */
const UrlTextField = ({
  label,
  tip = "",
  errorMessage = defaultErrorMessages,
  responseError,
  onChange,
  ...rest
}: UrlTextFieldProps): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const validateUrl = (url: string): boolean => {
    return !url || UrlRegex.test(url);
  };

  useEffect(() => {
    const isValidUrl = validateUrl(url);
    setError(!isValidUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const helperText = useMemo(
    () =>
      (responseError && errorMessage.responseError) ||
      (error && errorMessage.default) ||
      tip,
    [responseError, error, errorMessage, tip]
  );

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
      error={error || responseError}
      onChange={handleUrlChange}
      {...rest}
    />
  );
};

export default UrlTextField;
