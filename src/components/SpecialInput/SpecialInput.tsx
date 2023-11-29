import { useEffect, useState } from "react";
import CustomCheckbox from "../CustomCheckBox/CustomCheckbox";
import "./SpecialInput.css";
import { UseFormRegister, UseFormResetField } from "react-hook-form";
import { Survey, SurveyKeys } from "../../pages/Home/Home";

interface SpecialInputProps {
  text: string;
  register: UseFormRegister<Survey>;
  registerName: SurveyKeys;
  registerMessage: string;
  resetField: UseFormResetField<Survey>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: { [key: string]: any };
}
const SpecialInput: React.FC<SpecialInputProps> = ({
  text,
  register,
  registerName,
  registerMessage,
  resetField,
  errors,
}) => {
  const [isChecked, setisChecked] = useState(false);
  useEffect(() => {   
    resetField(registerName)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked])
  
  return (
    <>
      <div
        className={`special-input-container ${isChecked ? "dark" : "light"}`}
      >
        <span>
          <CustomCheckbox setisChecked={setisChecked} />
        </span>
        <span className={isChecked ? "dark" : "light"}>{text}</span>
      </div>
      {isChecked && (
        <div className="optional-container">
          <textarea
            className="special-input-textarea"
            placeholder={"Add a comment"}
            {...register(registerName, {
              required: {
                value: true,
                message: registerMessage,
              },
            })}
          />
        </div>
      )}
      {isChecked && errors?.[registerName] && (
        <small className="error-message-form">{errors?.[registerName]?.message}</small>
      )}
    </>
  );
};

export default SpecialInput;
