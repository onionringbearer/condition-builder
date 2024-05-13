import { ConditionsMap } from "@/components/condition-builder";
import ConditionBuilder from "@/features/condition-builder";
import Box from "@mui/material/Box";

const DemoPage = (): JSX.Element => {
  const handleConditionsChange = (conditions: ConditionsMap): void => {
    console.log(conditions);
  };
  return (
    <Box>
      <ConditionBuilder onChange={handleConditionsChange} />
    </Box>
  );
};

export default DemoPage;
