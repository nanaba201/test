import "../../styles/pages/about/mission&vision.css";
import slider1 from "../../assets/school_slider.jpg"
import logoRM from "../../assets/Eden-logo-rm-bg.png"

function MissionVision() {
  return (
    <div className="mission-vision-container">
      <img
        src={slider1}
        alt="Slide 1"
        className="zoom-img"
      />

      <div className="mission-vision-content">
        <img
          src={logoRM}
          alt="School Logo"
          style={{ maxWidth: "100px", marginLeft: "15px" }}
          className="school-logo"
        />
        <p className="school-name">EMMANEUL MISSION SR SEC SCHOOL</p>
        <h3 className="mission-title">MISSION & VISION</h3>

        <div className="info-section">
          <img
            src={logoRM}
            alt="School Logo"
            className="info-logo"
          />
          <div>
            <h2>ABOUT THE SCHOOL</h2>
            <p>
              Eden International School is a vision of Shri Sampat Mal Lodha and
              Smt. Pushpa Lodha, who invited Mr. Danmal Mathur, a renowned and
              eminent educationist, to set up a co-ed English medium public
              school in Bhilwara. He was the founder Principal and established
              the school on 15th July 1970. The school grew and shifted in 1985
              to its new location on a 10-acre land. Eden International School
              is presently affiliated with the CBSE Board.
            </p>
            <p>
              The results are among the best in Rajasthan and Bhilwara, with
              numerous students qualifying in JEE Mains/Advanced/NEET (UG) and
              securing a CA foundation course every year. The school boasts of
              its Chemistry, Physics, Biology, Mathematics, Fine Arts, Music
              Rooms, Computer labs, and a rich Library.
            </p>
          </div>
        </div>

        <div className="info-section">
          <img
            src={logoRM}
            alt="School Logo"
            className="info-logo"
          />
          <div>
            <h2>AIMS</h2>
            <ul>
              <li>To develop good human beings with compassionate hearts.</li>
              <li>
                To foster responsibility, self-discipline, and initiative.
              </li>
              <li>To ensure fluency in both Hindi and English.</li>
              <li>To pursue excellence in academics and character building.</li>
              <li>
                To uphold basic values while adapting to societal changes.
              </li>
              <li>To promote collaboration and community participation.</li>
              <li>
                To equip children with skills for their future professions.
              </li>
              <li>
                To recognize and encourage students' talents and potential.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionVision;
