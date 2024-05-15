import useGetData from "@/api/useGetData";
import UrlTextField from "@/components/url-textfield";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { default as Builder } from "@/components/condition-builder";
import { invalidUrlMessage, urlInputTip } from "./constants";
import useGetFilteredData from "./useGetFilteredData";
import { ConditionsMap } from "@/core/types/condition";

const addressBarStyles: SxProps = {
  marginBottom: "2rem",
};

type ConditionBuilderProps = {
  onChange?: (conditions: ConditionsMap) => void;
};

const ConditionBuilder = ({ onChange }: ConditionBuilderProps): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const [conditions, setConditions] = useState<ConditionsMap>(new Map());
  const { data } = useGetData(url);
  const { filteredData } = useGetFilteredData(data, conditions);

  const handleUrlChange = (url: string): void => {
    setUrl(url);
  };

  const fields: string[] | null = useMemo(() => {
    return data?.length ? Object.keys(data[0]) : null;
  }, [data]);

  const handleChange = (conditions: ConditionsMap): void => {
    setConditions(conditions);
  };

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
      {fields && <Builder fields={fields} onChange={handleChange} />}
      {filteredData && <pre>{JSON.stringify(filteredData, null, 2)}</pre>}
    </Box>
  );
};

export default ConditionBuilder;
