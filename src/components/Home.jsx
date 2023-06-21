import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/crudSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState({
    name: "",
    age: "",
    email: "",
    gender: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users, "hello");
    dispatch(createUser(users));
    alert("User Added Successfully")
    navigate('read')
  };

  return (
    <>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>

        <div className="form-check">
          <input
            name="gender"
            className="form-check-input"
            type="checkbox"
            value="Male"
            onChange={handleChange}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            name="gender"
            className="form-check-input"
            type="checkbox"
            value="Female"
            onChange={handleChange}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Home;
