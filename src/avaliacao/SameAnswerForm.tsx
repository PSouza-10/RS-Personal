import { ChangeEvent } from "react";
import { RadioGroup } from "../../components/Form/Radio";
import { FormVal, Form } from "./types";
import { FormContainer } from "./style";
interface ICompositeRadioForm {
  setValue: (val: FormVal) => any;
  val: FormVal;
  content: { type: "same-answer" } & Form;
  formKey: string;
}

export const SameAnswerForm: React.FC<ICompositeRadioForm> = ({
  content,
  setValue,
  val,
  formKey,
}) => {
  const handleValueChange = (
    questionIdx: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let newVal = [...val];

    newVal[questionIdx] = parseFloat(e.target.value);

    setValue(newVal);
  };

  return (
    <FormContainer>
      {content.questions.map((question, qstIdx) => (
        <RadioGroup
          radioLabel={qstIdx + 1 + ") - " + question}
          options={content.opts.map(([label, value], optIdx) => ({
            label,
            value,
            id: `${formKey}-${qstIdx}-opt-${optIdx}`,
          }))}
          onChange={(val) => handleValueChange(qstIdx, val)}
          name={formKey + "-" + qstIdx}
          key={formKey + "-" + qstIdx}
        />
      ))}
    </FormContainer>
  );
};
