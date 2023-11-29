import "./ThankYouPage.css"

interface ThankYouPageProps {}
const ThankYouPage: React.FC<ThankYouPageProps> = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", boxSizing: "border-box", overflow: "hidden"}}>
      <div>
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
        <header className="site-header" id="header">
          <h1 className="site-header__title">THANK YOU!</h1>
        </header>
        <div className="main-content">
          <i className="fa fa-check-circle main-content__checkmark"></i>
          <p className="main-content__body">
            Thank you very much for completing the form. It means a lot to us,
            and so do you! We thank you very much for giving us a moment to help
            us. See you soon.
          </p>
        </div>

        <footer className="site-footer">
          <p className="site-footer__fingeprint">
            Copyright ©{new Date().getFullYear()} | All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ThankYouPage;
