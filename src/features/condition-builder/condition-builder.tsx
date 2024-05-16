import useGetData from "@/api/useGetData";
import UrlTextField, {
  UrlTextFieldErrorMessages,
} from "@/components/url-textfield";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { default as Builder } from "@/components/condition-builder";
import {
  invalidUrlMessage,
  noDataFoundMessage,
  urlInputTip,
} from "./constants";
import useGetFilteredData from "./useGetFilteredData";
import { ConditionsMap } from "@/core/types/condition";
import ResultsTable from "@/components/results-table";
import validator from "./validator";

const addressBarStyles: SxProps = {
  marginBottom: "2rem",
};

const errorMessages: UrlTextFieldErrorMessages = {
  default: invalidUrlMessage,
  responseError: noDataFoundMessage,
};

const ConditionBuilder = (): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const [conditions, setConditions] = useState<ConditionsMap>(new Map());
  const { data, isError, isLoading } = useGetData(url);
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
        autoFocus
        label="Url"
        tip={urlInputTip}
        responseError={isError}
        errorMessage={errorMessages}
        sx={addressBarStyles}
        onChange={handleUrlChange}
        inputProps={{ readOnly: isLoading }}
      />
      {!isLoading && fields && (
        <Builder
          fields={fields}
          onChange={handleChange}
          validator={validator}
        />
      )}
      <ResultsTable
        results={filteredData}
        fields={fields}
        total={data?.length || 0}
        isLoading={isLoading}
      ></ResultsTable>
    </Box>
  );
};

export default ConditionBuilder;
