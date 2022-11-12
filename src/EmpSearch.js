import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const EmpSearch = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/employee");
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);
  return (
    <div className="App">
      {/* <h3>Search Contact</h3> */}

      <div className="container">
        <div className="card">
          <div className="card-title">
            <h3>Search Contact</h3>
            <div>
              <input
                style={{ width: "45%", height: "45px" }}
                type="text"
                placeholder="Search Contact.."
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="card-body">
            <div className="divbtn">
              <Link to="/" className="btn btn-info">
                Back to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <input
        style={{ width: "45%", height: "45px" }}
        type="text"
        placeholder="Search Contact.."
        onChange={(e) => setSearchTitle(e.target.value)}
      /> */}

      {loading ? (
        <h4>Loading Matching Contacts.......</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })

          .map(
            (item) =>
              // applying the table for display===============
              {
                return (
                  <div className="container">
                    <div className="card">
                      <div className="card-title"></div>
                      <div className="card-body">
                        <table className="table table-bordered">
                          <thead className="bg-dark text-white">
                            <tr>
                              <td>Id</td>
                              <td>Name</td>
                              <td>Phone</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.phone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              }
            //==============================================================
            //   <h5 key={item.id}>{item.name}</h5>
          )
      )}
    </div>
  );
};

export default EmpSearch;
