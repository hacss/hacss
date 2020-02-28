export type RuleFn = (...args: string[]) => string;

type O<A> = A | null;

export type RuleSpec
  = RuleFn
  | string
  | [ O<string>, RuleFn ]
  | [ O<string>, O<RuleFn>, RuleFn ]
  | [ O<string>, O<RuleFn>, O<RuleFn>, RuleFn ]
  | [ O<string>, O<RuleFn>, O<RuleFn>, O<RuleFn>, RuleFn ]
  | [ O<string>, O<RuleFn>, O<RuleFn>, O<RuleFn>, O<RuleFn>, RuleFn ]
  | [ O<string>, O<RuleFn>, O<RuleFn>, O<RuleFn>, O<RuleFn>, O<RuleFn>, RuleFn ]
