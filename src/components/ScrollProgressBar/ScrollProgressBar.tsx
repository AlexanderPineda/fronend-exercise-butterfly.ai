import { useEffect, useState } from "react";
import "./ScrollProgressBar.css";

interface ScrollProgressBarProps {}
const ScrollProgressBar: React.FC<ScrollProgressBarProps> = () => {

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  return (
    <div className="progress-main-wrapper">
      <div className="progress-main-style" style={{ width: `${scrollTop}%` }}></div>
    </div>
  );
};

export default ScrollProgressBar;
