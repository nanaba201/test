import React from "react";
import "../../styles/pages/about/FromTheChairmanDesk.css";

function FromTheChairmanDesk() {
  return (
    <div>
      <img
        src="../src/assets/school_slider.jpg"
        alt="Slide 1"
        className="zoom-img"
      />
      <div className="chairman-container">
        {/* <img
          src="../src/assets/Eden School logo bhilwara.jpg"
          alt="School Logo"
          className="school-logo"
        /> */}
        <p className="school-name">EMMANEUL MISSION SR SEC SCHOOL</p>
        <div className="chairman-content">
          <img
            src="../src/assets/Eden School logo bhilwara.png"
            alt="School Logo"
            className="chairman-image"
          />
          <div className="chairman-text">
            <h2>FROM THE CHAIRMAN DESK</h2>
            <div className="chairman-message">
              <p>Dear Students, Parents, and Esteemed Visitors,</p>
              <p>
                "The highest education is that which does not merely give us
                information but makes our life in harmony with all existence." ~
                Rabindranath Tagore
              </p>
              <p>
                ‘The journey of education begins with curiosity, and blooms into
                the wisdom of lifelong learner’
              </p>
              <p>
                Hearty congratulations for having chosen Eden International
                School for making dreams a reality...
              </p>
              <p>
                The school is a platform for the student to express their
                creative pursuits...
              </p>
              <p>
                Education is not merely about acquiring knowledge; it is about
                fostering a spirit of inquiry...
              </p>
              <p className="chairman-signature">
                Warm regards, <br />
                Dinesh Jain <br />
                Chairman <br />
                Eden International School, Bhilwara
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FromTheChairmanDesk;
