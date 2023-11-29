import "./CustomCheckbox.css"

interface CustomCheckboxProps {
    setisChecked: React.Dispatch<React.SetStateAction<boolean>>
} 
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({setisChecked}) => {
    return <input type="checkbox" className="surprise" onChange={(e) => setisChecked(e.target?.checked)} disabled={false} name="checkbox" />;
}
 
export default CustomCheckbox;