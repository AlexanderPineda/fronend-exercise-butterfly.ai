import "./CustomCheckbox.css"

interface CustomCheckboxProps {} 
const CustomCheckbox: React.FC<CustomCheckboxProps> = () => {
    return <input type="checkbox" disabled={false} name="checkbox" />;
}
 
export default CustomCheckbox;