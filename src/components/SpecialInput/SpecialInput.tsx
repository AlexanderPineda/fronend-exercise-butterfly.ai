import { useState } from "react";
import CustomCheckbox from "../CustomCheckBox/CustomCheckbox";
import "./SpecialInput.css";

interface SpecialInputProps {
  text: string;
}
const SpecialInput: React.FC<SpecialInputProps> = ({ text }) => {
  const [isChecked, setisChecked] = useState(false);
  return (
    <>
      <div className={`special-input-container ${isChecked ? 'dark' : 'light'}`}>
        <span>
          <CustomCheckbox setisChecked={setisChecked} />
        </span>
        <span className={isChecked ? 'dark' : 'light'}>{text}</span>
      </div>
      {isChecked && (
        <div className="optional-container">
          <textarea className="special-input-textarea" placeholder={"Add a comment"} />
        </div>
      )}
    </>
  );
};

export default SpecialInput;
