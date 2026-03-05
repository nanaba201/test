import e1 from "../assets/e1.pdf";
import e2 from "../assets/e2.pdf";
import b1 from "../assets/b1.pdf";
import b2 from "../assets/b2.pdf";
import b3 from "../assets/b3.pdf";
import b4 from "../assets/b4.pdf";
import b5 from "../assets/b5.pdf";
import b6 from "../assets/b6.pdf";
import b7 from "../assets/b7.pdf";
import b8 from "../assets/b8.pdf";
import b9 from "../assets/b9.pdf";
import b10 from "../assets/b10.pdf";
import c1 from "../assets/c1.pdf";
import c2 from "../assets/c2.pdf";
import c3 from "../assets/c3.pdf";
import c4 from "../assets/c4.pdf";
import c5 from "../assets/c5.pdf";
import c6 from "../assets/c6.pdf";
import c7 from "../assets/c7.pdf";
import c8 from "../assets/c8.pdf";
import Pdf from "../assets/Admission Form.pdf";
// import schoolvideo from "../assets/school-video.mp4";

const documents = [
  {
    name: "MANDATORY PUBLIC DISCLOSURE",
    file: b1,
  },
  {
    name: "COPIES OF AFFILIATION UPGRADATION / LETTERS RECENT EXTENSION OF AFFILIATION",
    file: b2,
  },
  {
    name: "COPIES OF SOCIETIES / TRUST / COMPANY REGISTRATION / RENEWAL CERTIFICATE",
    file: b3,
  },
  {
    name: "COPY OF NO OBJECTION CERTIFICATE ISSUED BY THE STATE GOVERNMENT",
    file: b4,
  },
  {
    name: "COPY OF RECOGNITION CERTIFICATE ITS RENEWAL",
    file: b5,
  },
  {
    name: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
    file: b6,
  },
  {
    name: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
    file: b7,
  },
  {
    name: "COPY OF DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION EXTENSION.",
    file: b8,
  },
  {
    name: "COPY OF VALID WATER, HEALTH AND SANITATION CERTIFICATE.",
    file: b9,
  },
  {
    name: "SCHOOL NAME CHANGE",
    file: b10,
  },
];

const documents1 = [
  {
    name: "SCHOOL MANAGEMENT COMMITTEE",
    file: c1,
  },
  {
    name: "PARENTS TEACHERS' ASSOCIATION COMMITTEE",
    file: c2,
  },
  {
    name: "SAFTY AND SECURITY OF SCHOOL CHILDREN COMMITTEE",
    file: c3,
  },
  {
    name: "SEXUAL HARASSMENT COMMITTEE",
    file: c4,
  },
  {
    name: "FEE COMMITTEE",
    file: c5,
  },
  {
    name: "ANTI BULLYING COMMITTEE",
    file: c6,
  },
  {
    name: "POSCO ACT COMMITTEE",
    file: c7,
  },
  {
    name: "GRIEVANCE REDRESSAL COMMITTEE",
    file: c8,
  },
];

const CBSEMandatoryDisclosure = () => {
  // Common styles
  const styles = {
    container: {
      maxWidth: "1140px",
      margin: "50px auto 0",
      padding: "16px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      marginBottom: "32px",
      textAlign: "center",
    },
    headerTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    headerSubtitle: {
      fontSize: "20px",
    },
    section: {
      marginBottom: "32px",
    },
    sectionHeader: {
      fontSize: "20px",
      fontWeight: "bold",
      backgroundColor: "#f2f2f2",
      padding: "8px",
      marginBottom: "16px",
    },
    tableContainer: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      border: "1px solid #ccc",
      padding: "8px",
      textAlign: "left",
      backgroundColor: "#f8f8f8",
    },
    td: {
      border: "1px solid #ccc",
      padding: "8px",
      textAlign: "left",
    },
    link: {
      color: "#0066cc",
      textDecoration: "none",
      cursor: "pointer",
    },
    nestedCell: {
      paddingLeft: "32px",
      border: "1px solid #ccc",
      padding: "8px",
    },
    footer: {
      marginTop: "48px",
      padding: "16px",
      backgroundColor: "#f8f8f8",
      textAlign: "center",
    },
    footerSchool: {
      marginBottom: "8px",
      fontWeight: "bold",
    },
    footerInfo: {
      fontSize: "14px",
    },
    copyright: {
      marginTop: "8px",
      fontSize: "12px",
      color: "#666",
    },
  };

  function onClickOpen(pdf) {
    window.open(pdf);
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>EDEN INTERNATIONAL SCHOOL, Bhilwara</h1>
        <div style={styles.headerSubtitle}>CBSE Mandatory Disclosure</div>
      </header>

      {/* [A] General Information */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>[A] GENERAL INFORMATION:</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.NO.</th>
                <th style={styles.th}>DOCUMENTS</th>
                <th style={styles.th}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>NAME OF THE SCHOOL</td>
                <td style={styles.td}>
                  EDEN INTERNATIONAL SCHOOL BHILWARA -311001
                </td>
              </tr>
              <tr>
                <td style={styles.td}>2</td>
                <td style={styles.td}>AFFILIATION NO.</td>
                <td style={styles.td}>1730176</td>
              </tr>
              <tr>
                <td style={styles.td}>3</td>
                <td style={styles.td}>SCHOOL CODE</td>
                <td style={styles.td}>10525</td>
              </tr>
              <tr>
                <td style={styles.td}>4</td>
                <td style={styles.td}>COMPLETE ADDRESSES WITH PIN CODE</td>
                <td style={styles.td}>
                  NEAR AAHINSHA CIRCLE, SUWANA ROAD, BHILWARA -311001
                </td>
              </tr>
              <tr>
                <td style={styles.td}>5</td>
                <td style={styles.td}>PRINCIPAL NAME</td>
                <td style={styles.td}>SATYA NARAYAN UPADHYAY</td>
              </tr>
              <tr>
                <td style={styles.td}>6</td>
                <td style={styles.td}>PRINCIPAL QUALIFICATION</td>
                <td style={styles.td}>
                  M.SC. (MATHS), M.A. (ENG.LITT.), B.ED. , M.B.A. (HRM)
                </td>
              </tr>
              <tr>
                <td style={styles.td}>7</td>
                <td style={styles.td}>SCHOOL E.MAIL ID</td>
                <td style={styles.td}>
                  principal.bhilwara@schooleden.in, 10525@cbseshiksha.in
                </td>
              </tr>
              <tr>
                <td style={styles.td}>8</td>
                <td style={styles.td}>CONTACT DETAILS</td>
                <td style={styles.td}>9799298780 , 01482-450134</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* [B] Documents and Information */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>[B] DOCUMENTS AND INFORMATION:</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.NO.</th>
                <th style={styles.th}>DOCUMENTS</th>
                <th style={styles.th}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={`doc-${index}`}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{doc.name}</td>
                  <td style={styles.td}>
                    <span
                      onClick={() => onClickOpen(doc.file)}
                      style={styles.link}
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* [C] Committees */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>[C] COMMITTEES:</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.NO.</th>
                <th style={styles.th}>DOCUMENTS</th>
                <th style={styles.th}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {documents1.map((doc, index) => (
                <tr key={`doc-${index}`}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{doc.name}</td>
                  <td style={styles.td}>
                   <span
                       onClick={() => onClickOpen(doc.file)}
                       style={styles.link}
                   >
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* [D] Staff (Teaching) */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>[D] STAFF (TEACHING):</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.NO.</th>
                <th style={styles.th}>DOCUMENTS</th>
                <th style={styles.th}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>PRINCIPAL</td>
                <td style={styles.td}>1</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, rowSpan: 7 }}>2</td>
                <td style={styles.td}>TOTAL NUMBER OF TEACHERS</td>
                <td style={styles.td}></td>
              </tr>
              <tr>
                <td style={styles.td}></td>
                <td style={styles.nestedCell}>PGT</td>
                <td style={styles.td}>9</td>
              </tr>
              <tr>
                <td style={styles.td}></td>
                <td style={styles.nestedCell}>TGT</td>
                <td style={styles.td}>6</td>
              </tr>
              <tr>
                <td style={styles.td}></td>
                <td style={styles.nestedCell}>PRT</td>
                <td style={styles.td}>10</td>
              </tr>
              <tr>
                <td style={styles.td}></td>
                <td style={styles.nestedCell}>PET</td>
                <td style={styles.td}>1</td>
              </tr>
              <tr>
                <td style={styles.td}></td>
                <td style={styles.nestedCell}>NON TEACHING</td>
                <td style={styles.td}>9</td>
              </tr>
              <tr>
                <td style={styles.td}></td>
                <td style={styles.nestedCell}>NTT</td>
                <td style={styles.td}>3</td>
              </tr>
              <tr>
                <td style={styles.td}>3</td>
                <td style={styles.td}>TEACHER SECTION RATIO</td>
                <td style={styles.td}>1:30</td>
              </tr>
              <tr>
                <td style={styles.td}>4</td>
                <td style={styles.td}>DETAILS OF SPECIAL EDUCATOR</td>
                <td style={styles.td}>ASHA KANWAR</td>
              </tr>
              <tr>
                <td style={styles.td}>5</td>
                <td style={styles.td}>
                  DETAILS OF COUNSELLOR AND WELNESS TEACHER
                </td>
                <td style={styles.td}>ANITA ACHARYA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* [E] Result and Academics */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>[E] RESULT AND ACADEMICS:</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.NO.</th>
                <th style={styles.th}>DOCUMENTS</th>
                <th style={{ ...styles.th, colSpan: 3 }}>DETAILS</th>
                <th style={styles.th}></th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>CLASS 10</td>
                <td style={styles.td}>2020-21</td>
                <td style={styles.td}>2021-22</td>
                <td style={styles.td}>2022-23</td>
              </tr>
              <tr>
                <td style={styles.td}>2</td>
                <td style={styles.td}>CLASS 12</td>
                <td style={styles.td}>95.83</td>
                <td style={styles.td}>100.00</td>
                <td style={styles.td}>93.93</td>
              </tr>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>FRE STRUCTURE OF THE SCHOOL</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={{ ...styles.td, colSpan: 3 }}>
                  <span
                      onClick={() => onClickOpen(e1)}
                      style={styles.link}
                  >
                      View
                    </span>
                </td>
              </tr>
              <tr>
                <td style={styles.td}>2</td>
                <td style={styles.td}>ACADEMIC CALENDAR</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={{ ...styles.td, colSpan: 3 }}>
                  <span
                      onClick={() => onClickOpen(e2)}
                      style={styles.link}
                  >
                      View
                    </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* [F] School Infrastructure */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>[F] SCHOOL INFRASTRUCTURE:</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.NO.</th>
                <th style={styles.th}>DOCUMENTS</th>
                <th style={styles.th}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>
                  TOTAL CAMPUS AREA OF THE SCHOOL ( IN SQUARE MTR)
                </td>
                <td style={styles.td}>40,468.6 Sq.MTR</td>
              </tr>
              <tr>
                <td style={styles.td}>2</td>
                <td style={styles.td}>
                  NO.AND SIZE OF THE CLASS ROOMS (IN SQ. MTR)
                </td>
                <td style={styles.td}>28 65.03/55.74</td>
              </tr>
              <tr>
                <td style={styles.td}>3</td>
                <td style={styles.td}>
                  NO AND SIZE OF LABORATORIES INCLUDING LABS (IN.SQ.MTR)
                </td>
                <td style={styles.td}>7 83.61/74.32/ 65.03</td>
              </tr>
              <tr>
                <td style={styles.td}>4</td>
                <td style={styles.td}>INTERNET FACILITY</td>
                <td style={styles.td}>YES AIRTEL</td>
              </tr>
              <tr>
                <td style={styles.td}>5</td>
                <td style={styles.td}>NO.OF GIRLS TOILETS</td>
                <td style={styles.td}>10</td>
              </tr>
              <tr>
                <td style={styles.td}>6</td>
                <td style={styles.td}>NO.OF BOYS TOILETS</td>
                <td style={styles.td}>10</td>
              </tr>
              <tr>
                <td style={styles.td}>7</td>
                <td style={styles.td}>School Video</td>
                <td style={styles.td}>
                  <span
                      onClick={() => onClickOpen()}
                      style={styles.link}
                  >
                      View
                    </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CBSEMandatoryDisclosure;
