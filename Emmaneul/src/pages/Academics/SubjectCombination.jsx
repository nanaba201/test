import React from "react";
import "../../styles/pages/academics/SubjectCombination.css"; // Importing the CSS file

function SubjectCombination() {
  return (
    <div>
      <img
        src="../src/assets/school_slider.jpg"
        alt="Slide 1"
        className="zoom-img"
      />
      <div className="subject-container">
        {/* <img
          src="../src/assets/Eden School logo bhilwara.jpg"
          alt="School Logo"
          className="school-logo"
        /> */}
        <p className="school-name">EMMANEUL MISSION SR SEC SCHOOL</p>
        <div className="course-container">
          <img
            src="../src/assets/Eden School logo bhilwara.png"
            alt="School Logo"
            className="school-logo-large"
          />
          <div>
            <h2 className="course-title">COURSE OF STUDY:</h2>
            <ul className="course-list">
              <li>
                The subjects taught in Nursery, L.K.G., and U.K.G. include
                English, Hindi, Mathematics, Music, and Art & Craft
              </li>
              <li>
                In classes I to VIII, the subjects include English, Hindi,
                Mathematics, Social Studies, and Science. Sanskrit is studied as
                a third language.
              </li>
              <li>
                In classes IX and X, the subjects are English, Hindi,
                Mathematics, Science, Social Science, Information Technology,
                PHE, Music, and Art & Craft.
              </li>
              <li>
                The Senior School Certificate (+2 scheme) is divided into three
                streams:
              </li>
              <h4 className="stream-title">SCIENCE STREAM:</h4>
              <li>English Core/English elective</li>
              <li>Physics (Optional)</li>
              <li>Chemistry (Optional)</li>
              <li>Mathematics (Optional)</li>
              <li>Biology (Optional)</li>
              <li>Fine Art</li>
              <li>Computer Science</li>
              <li>Geography</li>
              <li>Economics</li>
              <li>Music Hindustani Vocal</li>
              <h4 className="stream-title">HUMANITIES STREAM:</h4>
              <li>English Core /English Elective</li>
              <li>History (Optional)</li>
              <li>Political Science (Optional)</li>
              <li>Economics (Optional)</li>
              <li>Sociology</li>
              <li>Psychology</li>
              <li>Fine Arts (Optional)</li>
              <li>Music Hindustani Vocal</li>
              <h4 className="stream-title">COMMERCE STREAM:</h4>
              <li>English Core /English Elective</li>
              <li>Accountancy (Optional)</li>
              <li>Business Studies (Optional)</li>
              <li>Economics (Optional)</li>
              <li>Applied Mathematics (Optional)</li>
              <li>Informatics Practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectCombination;
