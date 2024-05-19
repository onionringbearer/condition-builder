import useGetData from "@/api/useGetData";
import UrlTextField from "@/components/url-textfield";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { default as Builder } from "@/components/condition-builder";
import { errorMessages, urlInputTip } from "./config";
import useGetFilteredData from "./useGetFilteredData";
import { ConditionsMap, ValidatorFunction } from "@/core/types/condition";
import ResultsTable from "@/components/results-table";
import { DatasetFilter } from "@/core/types/filter";
import { Operators } from "@/core/constants/operators";

const addressBarStyles: SxProps = {
  marginBottom: "2rem",
};

const operators = Object.values(Operators);

type ConditionBuilderProps = {
  datasetFilter: DatasetFilter;
  validator?: ValidatorFunction;
};

const ConditionBuilder = ({
  datasetFilter,
  validator,
}: ConditionBuilderProps): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const [conditions, setConditions] = useState<ConditionsMap>(new Map());
  const { data, isError, isLoading } = useGetData(url);
  const { filteredData } = useGetFilteredData(data, conditions, datasetFilter);

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
          operators={operators}
          onChange={handleChange}
          validator={validator}
        />
      )}
      <ResultsTable
        title="Results"
        results={filteredData}
        fields={fields}
        total={data?.length || 0}
        isLoading={isLoading}
      ></ResultsTable>
    </Box>
  );
};

export default ConditionBuilder;
