/* 'Type' prefix used for disambiguation, as we also have a Condition component. */
export type ConditionType = {
  id: string;
  field: string;
  operator: string;
  value?: string;
};

export type ConditionsMap = Map<string, Array<ConditionType>>;

export type ValidatorFunction = (
  condition: ConditionType
) => [valid: boolean, message: string];
