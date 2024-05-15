import useGetData from "@/api/useGetData";
import UrlTextField from "@/components/url-textfield";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { default as Builder } from "@/components/condition-builder";
import { invalidUrlMessage, urlInputTip } from "./constants";
import useGetFilteredData from "./useGetFilteredData";
import { ConditionsMap } from "@/core/types/condition";
import ResultsTable from "@/components/results-table";

const addressBarStyles: SxProps = {
  marginBottom: "2rem",
};

const ConditionBuilder = (): JSX.Element => {
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
      <ResultsTable
        results={filteredData}
        fields={fields}
        total={data?.length || 0}
      ></ResultsTable>
    </Box>
  );
};

export default ConditionBuilder;
