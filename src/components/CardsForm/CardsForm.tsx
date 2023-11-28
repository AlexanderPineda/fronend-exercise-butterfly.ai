import "./CardsForm.css";

interface CardsFormProps {
  colorStyle: "light" | "dark";
  [key: string]: never | React.ReactNode;
}
const CardsForm: React.FC<CardsFormProps> = ({colorStyle, children, ...rest }) => (
    <div {...rest} className={"body-card body-card-" + colorStyle}>
      {children}
      <img
        style={{
          position: "absolute",
          left: "-8px",
          top: "50px",
        }}
        src={`/triangle-card-${colorStyle}.svg`}
        alt="triangle-card"
      />
    </div>
  )


export default CardsForm;
