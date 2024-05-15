/* 'Type' prefix used for disambiguation, as we also have a Condition component. */
export type ConditionType = {
  id: string;
  field: string;
  operator: string;
  value?: string;
};

export type ConditionsMap = Map<string, Array<ConditionType>>;
