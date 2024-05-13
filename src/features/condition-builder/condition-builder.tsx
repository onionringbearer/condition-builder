import useGetData from "@/api/useGetData";
import UrlTextField from "@/components/url-textfield";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { useMemo, useState } from "react";
import {
  default as Builder,
  ConditionsMap,
} from "@/components/condition-builder";
import { invalidUrlMessage, urlInputTip } from "./constants";

const addressBarStyles: SxProps = {
  marginBottom: "2rem",
};

type ConditionBuilderProps = {
  onChange?: (conditions: ConditionsMap) => void;
};

const ConditionBuilder = ({ onChange }: ConditionBuilderProps): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const { data } = useGetData(url);

  const handleUrlChange = (url: string): void => {
    setUrl(url);
  };

  const fields: string[] | null = useMemo(() => {
    return data?.length ? Object.keys(data[0]) : null;
  }, [data]);

  return (
    <Box>
      <UrlTextField
        fullWidth
        label="Url"
        tip={urlInputTip}
        errorMessage={invalidUrlMessage}
        sx={addressBarStyles}
        onChange={handleUrlChange}
      />
      {fields && <Builder fields={fields} onChange={onChange} />}
    </Box>
  );
};

export default ConditionBuilder;
