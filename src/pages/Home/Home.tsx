import { useQuery } from "@tanstack/react-query";
import ScrollProgressBar from "../../components/ScrollProgressBar/ScrollProgressBar";
import { useState } from "react";
import "./Home.css";
import CardsForm from "../../components/CardsForm/CardsForm";
import Slider from "../../components/Slider/Slider";
import SpecialInput from "../../components/SpecialInput/SpecialInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showSwal } from "../../utils/sweetAlerts";

export interface Survey {
  additionalComments: string;
  commentBox: string;
  qualityFeedback: string;
  actionabilityFeedback: string;
  peerFeedback: string;
  otherFeedback: string;
}
export type SurveyKeys = keyof Survey;

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
  const [slider1Value, setslider1Value] = useState<unknown | number>();
  const [slider2Value, setslider2Value] = useState<unknown | number>();
  const {
    formState: { errors },
    register,
    handleSubmit,
    resetField,
  } = useForm<Survey>();
  const navigate = useNavigate();

  const submitSurvey: SubmitHandler<Survey> = (data) => {
    if (typeof slider1Value !== "number" || typeof slider2Value !== "number") {
      return showSwal();
    }
    const formData = {
      ...data,
      questionOneScore: slider1Value,
      questionTwoScore: slider2Value,
    }; //!? The form data is here
    console.log(formData);
    return navigate("/thanks");
  };

  return (
    <>
      <ScrollProgressBar />
      <nav className="navbar-survey-form">
        <img src="/butterfly-icon-color.svg" />
        <h1>{data && data[0]?.brand}</h1>
      </nav>
      <main className="form-content">
        <form onSubmit={handleSubmit(submitSurvey)}>
          <section>
            <h2>
              Hi, {data && `${data[1]?.first_name} ${data[1]?.last_name}`}
            </h2>
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
              <Slider index={0} outterState={setslider1Value} />
              <div className="texts-ratings">
                <span>Strongly disagree</span>
                <span>Neutral</span>
                <span>Strongly agree</span>
              </div>
              {typeof slider1Value === "number" && slider1Value < 5 && (
                <div className="additional-comments">
                  <input
                    {...register("additionalComments", {
                      required: {
                        value: true,
                        message: "Is neccesary write an additional comment",
                      },
                    })}
                    type="text"
                    placeholder="Additional comments"
                  />
                  {errors?.additionalComments && (
                    <small className="error-message-form">
                      {errors?.additionalComments?.message}
                    </small>
                  )}
                </div>
              )}
            </CardsForm>
            <CardsForm colorStyle="light">
              <h5>2 of 3 | Rating slider with multiple choice</h5>
              <h4>
                I feel comfortable working and interacting with the colleagues
                on my team.
              </h4>
              <Slider index={1} outterState={setslider2Value} />
              <div className="texts-ratings">
                <span>Strongly disagree</span>
                <span>Neutral</span>
                <span>Strongly agree</span>
              </div>
              {typeof slider2Value === "number" && slider2Value < 5 && (
                <>
                  <hr className="divider-coments" />
                  <h6>Which of the following should we improve on?</h6>
                  <div className="special-inputs">
                    <SpecialInput
                      register={register}
                      registerName="qualityFeedback"
                      registerMessage="The quality of feedback is neccesary"
                      resetField={resetField}
                      text="Quality of feedback"
                      errors={errors}
                    />
                  </div>
                  <div className="special-inputs">
                    <SpecialInput
                      register={register}
                      registerName="actionabilityFeedback"
                      registerMessage="The actionability of feedback is neccesary"
                      resetField={resetField}
                      text="Actionability of feedback"
                      errors={errors}
                    />
                  </div>
                  <div className="special-inputs">
                    <SpecialInput
                      register={register}
                      registerName="peerFeedback"
                      registerMessage="The peer feedback is neccesary"
                      resetField={resetField}
                      text="Openness to receive peer feedback"
                      errors={errors}
                    />
                  </div>
                  <div className="special-inputs">
                    <SpecialInput
                      register={register}
                      registerName="otherFeedback"
                      registerMessage="The other feedback is neccesary"
                      resetField={resetField}
                      text="Other"
                      errors={errors}
                    />
                  </div>
                </>
              )}
            </CardsForm>
            <CardsForm colorStyle="dark">
              <div className="feedback-indicator pulse">
                Extra feedback helps
              </div>
              <h5>3 of 3 | Open ended</h5>
              <h4>Would you like to add anything?</h4>
              <textarea
                {...register("commentBox", {
                  required: false,
                })}
                className="comments"
                placeholder="Express yourself freely and safely. This will always remain anonymous."
              />
            </CardsForm>
          </section>
          <section>
            <button className="submit-btn grow">
              Submit <img className="wobble" src="/right-arrow.svg" alt="" />
            </button>
          </section>
        </form>
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
