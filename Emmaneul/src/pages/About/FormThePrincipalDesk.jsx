import "../../styles/pages/about/FromThePrincipalDesk.css";
import slider1 from "../../assets/school_slider.jpg"

function FromThePrincipalDesk() {
  return (
    <div className="principal-desk-container">
      <img
        src={slider1}
        alt="Slide 1"
        className="zoom-img"
      />
      <div>
        <p className="school-name">EMMANEUL MISSION SR SEC SCHOOL</p>
        <div className="principal-desk-section">
          {/* <img
            alt="School Logo"
            className="principal-image"
          /> */}
          <div>
            <h2 className="principal-title">FROM THE PRINCIPAL DESK</h2>
            <p className="principal-text">
              Respected Parents, Learned Colleagues & Dear Students
            </p>
            <p className="principal-text">
              "Arise, awake, and stop not till the goal is reached." ~Swami
              Vivekanand
            </p>
            <p className="principal-text">
              “Success Comes to those who work hard and stay with those who
              don’t rest “
            </p>
            <p className="principal-text">
              Being an educationist with over 30 years of teaching and
              administrative experience, it is a matter of pride to pen down
              this message...
            </p>
            <p className="principal-text">
              At Eden International School, We understand that every child is
              unique, with their own strengths and challenges...
            </p>
            <p className="principal-text">
              By fostering a culture of positivity and encouragement, we aim to
              inspire our students...
            </p>
            <p className="principal-text">With Best Wishes</p>
            <p className="principal-text">Satya Narayan Upadhyay</p>
            <p className="principal-text">
              [ M.Sc. Maths, M.A. Eng Lit., B.Ed. & MBA(HRM) ]
            </p>
            <p className="principal-text">Principal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FromThePrincipalDesk;
