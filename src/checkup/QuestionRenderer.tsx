import {
  CheckList,
  ClosedQuestion,
  EditableList,
  FormField,
  UnitField,
} from "../../components";
import { CheckOption } from "../../components/Form/CheckList";
import { timeMeasures, YesNoOptions } from "./constants";
import { Question, QuestionState, TPaginate } from "./types";

export interface IQuestionRenderer {
  question: {
    data: Question;
    state: QuestionState;
  };
  sub?: null | [number, number];
  setValue: (newValue: any) => void;
  paginate: TPaginate;
}

export const QuestionRenderer: React.FC<IQuestionRenderer> = ({
  question,
  sub,
  setValue,
  paginate,
}) => {
  const state = question.state;
  const value = sub !== null ? state.nested[sub[0]] : state.value;
  const data = sub !== null ? question.data.nested[sub[0]] : question.data;
  switch (data.type) {
    case "confirm":
      return (
        <ClosedQuestion
          currentValue={value}
          options={YesNoOptions(paginate)}
          setValue={setValue}
        />
      );
    case "checklist":
      return (
        <CheckList
          options={value as CheckOption[]}
          onOptionChange={(idx, checked) => {
            let newVal = [...(value as CheckOption[])];
            newVal[idx].checked = checked;
            setValue(newVal);
          }}
        />
      );
    case "list":
      return (
        <EditableList
          items={value as string[]}
          limit={data.limit}
          setItems={setValue}
        />
      );
    case "text":
      return (
        <FormField
          onChange={(e) => setValue(e.target.value)}
          value={value as string}
        />
      );
    case "unit":
      return (
        <UnitField
          setValue={setValue}
          unit={timeMeasures}
          value={value as string}
        />
      );
  }
};