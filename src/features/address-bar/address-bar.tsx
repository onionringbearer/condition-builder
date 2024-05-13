import React from "react";
import UrlTextField from "@/components/url-textfield";

interface AddressBarProps {
  onChange?: (url: string) => void;
}

const tip =
  "Insert data url. Returning data MUST be a JSON array where each element is a key/value pair.";
const errorMessage = "Please enter a valid URL.";

const AddressBar: React.FC<AddressBarProps> = ({ onChange }) => {
  return (
    <UrlTextField
      fullWidth
      label="Url"
      tip={tip}
      errorMessage={errorMessage}
      onChange={console.log}
    />
  );
};

export default AddressBar;
