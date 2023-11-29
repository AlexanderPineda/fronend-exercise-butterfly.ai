import { useQuery } from "@tanstack/react-query";
import ScrollProgressBar from "../../components/ScrollProgressBar/ScrollProgressBar";
import "./Home.css";
import CardsForm from "../../components/CardsForm/CardsForm";
import Slider from "../../components/Slider/Slider";
import { useState } from "react";
import SpecialInput from "../../components/SpecialInput/SpecialInput";

const getDynamicData = (): Promise<{ [key: string]: string }[]> =>
  new Promise((resolve, reject) => {
    Promise.all([
      fetch("https://random-data-api.com/api/v2/appliances"),
      fetch("https://random-data-api.com/api/v2/users"),
    ])
      .then((res) => {
        Promise.all([res[0].json(), res[1].json()]).then((data) => {
          resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

function Home() {
  const { data } = useQuery({
    // isPending, error, isFetching
    queryKey: ["data"],
    queryFn: () => getDynamicData(),
  });
  const [slider2Value, setslider2Value] = useState<unknown | number>();

  return (
    <>
      <ScrollProgressBar />
      <nav className="navbar-survey-form">
        <img src="/butterfly-icon-color.svg" />
        <h1>{data && data[0]?.brand}</h1>
      </nav>
      <main className="form-content">
        <section>
          <h2>Hi, {data && `${data[1]?.first_name} ${data[1]?.last_name}`}</h2>
          <p className="content-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            ullamcorper nisl sed ante molestie, quis facilisis risus placerat.
            Morbi mattis, lectus in sollicitudin tristique, quam sem aliquam
            augue.
          </p>
          <h3>Do you agree with the following statements:</h3>
        </section>
        <section>
          <CardsForm colorStyle="light">
            <h5>1 of 3 | Rating slider</h5>
            <h4>I am satisfied with my roles and responsibilities.</h4>
            <Slider index={0} />
            <div className="texts-ratings">
              <span>Strongly disagree</span>
              <span>Neutral</span>
              <span>Strongly agree</span>
            </div>
          </CardsForm>
          <CardsForm colorStyle="light">
            <h5>2 of 3 | Rating slider with multiple choice</h5>
            <h4>
              I feel comfortable working and interacting with the colleagues on
              my team.
            </h4>
            <Slider index={1} setSliderValueFromOutside={setslider2Value} />
            <div className="texts-ratings">
              <span>Strongly disagree</span>
              <span>Neutral</span>
              <span>Strongly agree</span>
            </div>

            {typeof slider2Value === "number" && slider2Value <= 5 && (
              <>
                <hr className="divider-coments" />
                <h6>Which of the following should we improve on?</h6>
                <div className="special-inputs">
                  <SpecialInput text="Quality of feedback" />
                </div>
                <div className="special-inputs">
                  <SpecialInput text="Actionability of feedback" />
                </div>
                <div className="special-inputs">
                  <SpecialInput text="Openness to receive peer feedback" />
                </div>
                <div className="special-inputs">
                  <SpecialInput text="Other" />
                </div>
              </>
            )}
          </CardsForm>
          <CardsForm colorStyle="dark">
            <div className="feedback-indicator pulse">Extra feedback helps</div>
            <h5>3 of 3 | Open ended</h5>
            <h4>Would you like to add anything?</h4>
            <textarea
              className="comments"
              placeholder="Express yourself freely and safely. This will always remain anonymous."
            />
          </CardsForm>
        </section>
        <section>
          <button className="submit-btn">
            Submit <img className="wobble" src="/right-arrow.svg" alt="" />
          </button>
        </section>
      </main>
      <footer>
        <div>
          <button className="btn-langs ">
            Modify my language <img src="/earth.svg" alt="earth-icon" />
          </button>
        </div>
        <div>
          <div>
            <p>
              What is this?{" "}
              <a target="_blank" href="https://www.butterfly.ai/">
                Meet Butterfly.ai
              </a>
            </p>
            <a>Terms of Service | Privacy Policy</a>
            <p>©2016-2023 Appynest, Inc.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
