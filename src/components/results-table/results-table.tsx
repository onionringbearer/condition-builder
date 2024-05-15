import { Dataset } from "@/core/types/utility";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PropsWithChildren, useMemo } from "react";

import * as styles from "./styles";

type ResultTableProps = PropsWithChildren & {
  results: Dataset;
  fields: string[] | null;
  total: number;
};

const ResultsTable = ({ results, fields, total }: ResultTableProps) => {
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
      <Typography variant="h5" sx={styles.boldHeader}>
        Result
      </Typography>
      <Box sx={styles.chipsContainer}>
        <Chip label={totalLabel} />
        <Chip label={filteredLabel} color="primary" />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={styles.dataGrid}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[50, 100, 200]}
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </Box>
  );
};

export default ResultsTable;
