declare type Intent = {
  id: string;
  name: string;
  utterances: {}[];
};

declare type IntentMap = Map<string, Intent[]>;
