import { useEffect, useState } from "react";
import SliderRc from "rc-slider";
import "rc-slider/assets/index.css";
import "./Slider.css";

interface SliderProps {
  index: number;
  setSliderValueFromOutside?: React.Dispatch<React.SetStateAction<unknown | number>>
}
const Slider: React.FC<SliderProps> = ({ index, setSliderValueFromOutside }) => {
  const [sliderValue, setsliderValue] = useState<number>(1);

  useEffect(() => {
    const dots = Array.from(document.querySelectorAll(".rc-slider-dot"));
    dots &&
      dots.map((_, ind) => {
        dots[ind].innerHTML = `<img src="/slider/${
          ind % 10 === 0 ? "white-stars" : "grey-stars"
        }/star-${(ind % 10) + 1}.svg" alt="stars-rate-slider" />`;
      });
  }, []);

  useEffect(() => {    
    const handler = Array.from(document.querySelectorAll(".rc-slider-handle"));
    handler &&
    (handler[
      index
    ].innerHTML = `<img src="/slider/white-stars/star-${sliderValue}.svg" />`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue])
  

  useEffect(() => {
    const dots = Array.from(document.querySelectorAll(".rc-slider-dot"));
    if (index === 0) {
      dots.map((_, i) => {
        i < 9 &&          
          (dots[i].innerHTML = `<img src="/slider/${i < sliderValue ? "white-stars": "grey-stars"}/star-${
            i + 1
          }.svg" alt="stars-rate-slider" />`);
      });
      return;
    }
    if (index === 1) {
      dots.map((_, i) => {
        i > 9 &&
          i < 19 &&          
          (dots[i].innerHTML = `<img src="/slider/${index + (i % 10) < sliderValue ? "white-stars": "grey-stars"}/star-${
            (i % 10) + 1
          }.svg" alt="stars-rate-slider" />`);
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue]);

  return (
    <div className="wrapper-slider">
      <div
        className="progress-wrapper"
        style={{
          width: `calc(${10 * sliderValue}% - 4px)`,
          height: "calc(100% - 4px)",
        }}
      ></div>
      <SliderRc
        marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 }}
        min={1}
        max={10}
        defaultValue={1}
        style={{}}        
        onChange={(e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
          setsliderValue(e)
          setSliderValueFromOutside && setSliderValueFromOutside(e)
        }}
        styles={{
          track: {
            display: "none",
          },
          rail: {
            display: "none",
          },
          handle: {
            width: "55px",
            height: "55px",
            top: "-16px",
            background: "#532EE4",
            opacity: "1",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
    </div>
  );
};

export default Slider;
