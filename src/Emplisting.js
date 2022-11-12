import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Emplisting = () => {
  const [empdata, empdatachange] = useState(null);

  //============ asc dsc starts======================
  const [order, setorder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...empdata].sort((a, b) => {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      empdatachange(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...empdata].sort((a, b) => {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      empdatachange(sorted);
      setorder("ASC");
    }
  };
  //============ asc dsc ends======================

  //====================== for navigating to edit component================
  const navigate = useNavigate();
  const LoadEdit = (id) => {
    navigate("/contact/edit/" + id);
  };
  // for deleting the contacts sarts ====================

  const Removefunction = (id) => {
    if (window.confirm("Contact will be permanently deleted ?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Contact removed sucessfully");
          //   navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  //============deleting complete===================================================
  //   };
  // ===========default loading of data on rendering  starts =====================
  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  // ===========default loading of data on rendering  ends =====================
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h1>All Contacts</h1>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="contact/create" className="btn btn-info">
              Add Contact
            </Link>
          </div>
          <div className="divbtn">
            <Link to="/contact/search" className="btn btn-info">
              Search Contact
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Id</td>
                <td>
                  Name
                  <div>
                    <a
                      onClick={() => sorting("name")}
                      className="btn btn-primary"
                    >
                      click for asc & dsc
                    </a>
                  </div>
                </td>
                <td>
                  Phone
                  <div>
                    <a
                      onClick={() => sorting("phone")}
                      className="btn btn-primary"
                    >
                      click for asc & dsc
                    </a>
                  </div>
                </td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-warning"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Emplisting;
