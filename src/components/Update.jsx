import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../features/crudSlice";

const Update = () => {
  const [update, setUpdate] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { users, loading } = useSelector((state) => state.crud);

  //   console.log(users, "hi i am in");

  useEffect(() => {
    if (id) {
      const singleuser = users.data.filter((item) => item.id === id);
      setUpdate(singleuser[0]);
    }
  }, []);

  if(loading){
    return(<h2>Loading</h2>)
  }

  console.log(update && update, "hello update");

  const newdata = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(update));
    alert("User Updated");
    navigate('/read');
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
            value={update && update.name}
            onChange={newdata}
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
            value={update && update.email}
            onChange={newdata}
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
            value={update && update.age}
            onChange={newdata}
          />
        </div>

        <div className="form-check">
          <input
            name="gender"
            className="form-check-input"
            type="checkbox"
            value="Male"
            checked={update && update.gender === "Male"}
            onChange={newdata}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            name="gender"
            className="form-check-input"
            type="checkbox"
            value="Female"
            checked={update && update.gender === "Female"}
            onChange={newdata}
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

export default Update;
