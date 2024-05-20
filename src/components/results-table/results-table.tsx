import { Dataset } from "@/core/types/utility";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { PropsWithChildren, useMemo } from "react";

import * as styles from "./styles";

type ResultTableProps = PropsWithChildren & {
  title?: string;
  results: Dataset;
  fields: string[] | null;
  total: number;
  isLoading?: boolean;
};

const initialDatagridState: GridInitialStateCommunity = {
  pagination: {
    paginationModel: {
      pageSize: 100,
    },
  },
};

const ResultsTable = ({
  title,
  results,
  fields,
  total,
  isLoading,
}: ResultTableProps) => {
  const columns: GridColDef[] = useMemo(() => {
    return fields ? fields.map((field) => ({ field: field, flex: 1 })) : [];
  }, [fields]);

  const rows: Dataset = useMemo(() => {
    return results || [];
  }, [results]);

  const totalLabel = `Total: ${total}`;
  const filteredLabel = `Filtered: ${results?.length || 0}`;

  return (
    <Box sx={styles.tableContainer}>
      {title && (
        <Typography variant="h5" sx={styles.boldHeader}>
          {title}
        </Typography>
      )}
      <Box sx={styles.chipsContainer}>
        <Chip label={totalLabel} />
        <Chip label={filteredLabel} color="primary" />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={styles.dataGrid}
        loading={isLoading}
        initialState={initialDatagridState}
        pageSizeOptions={[50, 100]}
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </Box>
  );
};

export default ResultsTable;
