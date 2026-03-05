import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

function StudentDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [newsBody, setNewsBody] = useState("");

  /// Function to fetch existing news.
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/fetch_news");
        if (response.ok) {
          const data = await response.json();
          setNewsList(data.news || []);
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Function to add a new empty row
  const handleAddEmptyRow = () => {
    const newRow = { body: "", date: Date.now() };
    setNewsList([...newsList, newRow]);
  };

  // Function to remove a row
  const handleRemoveRow = (index) => {
    const updatedList = newsList.filter((_, i) => i !== index);
    setNewsList(updatedList);
  };

  // Update input value in state
  const handleNewsChange = (index, value) => {
    const updatedList = [...newsList];
    updatedList[index].body = value;
    setNewsList(updatedList);
  };

  /// Function to Add News
  const handleAddNews = async (index) => {
    console.log("Index received:", index);
    console.log("NewsList at index:", newsList[index]);

    const newsBody = newsList[index]?.body?.trim();
    console.log("News Body:", newsBody);
    if (!newsBody) {
      toast.error("News body cannot be empty!");
      return;
    }

    const newNews = {
      news: {
        date: new Date(news.date).toLocaleString(),
        body: newsBody,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/add_news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      });

      if (response.ok) {
        const result = await response.json();
        setNewsList([...newsList, result.news]);
        toast.success("News ADDED SUCCESSFULLY");
      } else {
        console.error("Failed to add news");
        toast.error("Failed to add news");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      toast.error("Error adding news");
    }
  };

  // const handleAddNews = async (index) => {
  //   const newsBody = newsList[index]?.body?.trim();
  //   if (!newsBody) {
  //     toast.error("News body cannot be empty!");
  //     return;
  //   }

  //   const newNews = {
  //     news: {
  //       date: Date.now(),
  //       body: newsBody,
  //     },
  //   };

  //   try {
  //     const response = await fetch("http://localhost:5000/add_news", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newNews),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       setNewsList([...newsList, result.news]);
  //       toast.success("News ADDED SUCCESSFULLY");
  //     } else {
  //       console.error("Failed to add news");
  //       toast.error("Failed to add news");
  //     }
  //   } catch (error) {
  //     console.error("Error adding news:", error);
  //     toast.error("Error adding news");
  //   }
  // };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          backgroundColor: "white",
          color: "grey",
          overflow: "auto",
          padding: "20px",
          width: "83vw",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "10px",
          }}
        >
          <h2 style={{ color: "black" }}>Dashboard</h2>

          <button
            style={{ color: "white" }}
            onClick={() => {
              handleAddNews(newsBody);
            }}
          >
            Add News
          </button>
        </div>

        {/* News Table */}
        <table
          style={{
            width: "80vw",
            borderCollapse: "collapse",
            marginTop: "20px",
            border: "1px solid grey",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                S.NO.
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                News Data
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {newsList.length > 0 ? (
              newsList.map((news, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid grey" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid grey" }}>
                    <input
                      type="text"
                      style={{ width: "90%", padding: "5px", borderRadius: 8 }}
                      value={news.body}
                      onChange={(e) => handleNewsChange(index, e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid grey",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {new Date(news.date).toLocaleString()}
                    <div>
                      <IconButton
                        onClick={handleAddEmptyRow}
                        style={{
                          marginLeft: "10px",
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          marginRight: "5px",
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemoveRow(index)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        {" "}
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No news available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboard;
