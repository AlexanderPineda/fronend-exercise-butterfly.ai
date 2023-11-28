import CustomCheckbox from "../CustomCheckBox/CustomCheckbox";
import "./SpecialInput.css";

interface SpecialInputProps {
  text: string;
}
const SpecialInput: React.FC<SpecialInputProps> = ({ text }) => {
  return (
    <div className="special-input-container">
      <span>
        <CustomCheckbox />
      </span>
      <span>{text}</span>
    </div>
  );
};

export default SpecialInput;
