import { useEffect, useState } from "react";
import SliderRc from "rc-slider";
import "rc-slider/assets/index.css";
import "./Slider.css";

interface SliderProps {
  index: number;
  setSliderValueFromOutside?: React.Dispatch<
    React.SetStateAction<unknown | number>
  >;
}
const Slider: React.FC<SliderProps> = ({
  index,
  setSliderValueFromOutside,
}) => {
  const [sliderValue, setsliderValue] = useState<number>(1);
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const dots = Array.from(document.querySelectorAll(".rc-slider-dot"));
    if (!dots) {
      return;
    }
    dots.map((_, ind) => {
      dots[ind].innerHTML = `<img src="/slider/${
        ind % (mobile ? 5 : 10) === 0 ? "white-stars" : "grey-stars"
      }/star-${(ind % (mobile ? 5 : 10)) + 1}.svg" alt="stars-rate-slider" />`;
    });
  }, [mobile]);

  useEffect(() => {
    const handler = Array.from(document.querySelectorAll(".rc-slider-handle"));
    handler &&
      (handler[
        index
      ].innerHTML = `<img src="/slider/white-stars/star-${sliderValue}.svg" />`);
  }, [index, sliderValue]);

  useEffect(() => {
    const dots = Array.from(document.querySelectorAll(".rc-slider-dot"));
    if (index === 0) {
      dots.map((_, i) => {
        i < (mobile ? 4 : 9) &&
          (dots[i].innerHTML = `<img src="/slider/${
            i < sliderValue ? "white-stars" : "grey-stars"
          }/star-${i + 1}.svg" alt="stars-rate-slider" />`);
      });
      return;
    }
    if (index === 1) {
      dots.map((_, i) => {
        i > (mobile ? 4 : 9) &&
          i < (mobile ? 9 : 19) &&
          (dots[i].innerHTML = `<img src="/slider/${
            index + (i % (mobile ? 5 : 10)) < sliderValue
              ? "white-stars"
              : "grey-stars"
          }/star-${
            (i % (mobile ? 5 : 10)) + 1
          }.svg" alt="stars-rate-slider" />`);
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue, mobile]);

  const sliderMarks = mobile
    ? { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }
    : { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 };

  return (
    <div className="wrapper-slider">
      <div
        className="progress-wrapper"
        style={{
          width: `calc(${(mobile ? 20 : 10) * sliderValue}% - 4px)`,
          height: "calc(100% - 4px)",
        }}
      ></div>
      <SliderRc
        marks={sliderMarks}
        min={1}
        max={mobile ? 5 : 10}
        defaultValue={1}
        onChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          setsliderValue(e);
          setSliderValueFromOutside && setSliderValueFromOutside(e);
        }}
        classNames={{ handle: "grow" }}
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
