import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Deleteuser, Readuser } from "../features/crudSlice";
import Modals from "./Modal";

const ReadData = () => {
  const [show, setshow] = useState(false);
  const [radioData, setRadiodata] = useState("");
  const [id, setid] = useState();
  const dispatch = useDispatch();
  const { users, loading, searchData } = useSelector((state) => state.crud);

  useEffect(() => {
    dispatch(Readuser());
  }, []);

  if (loading) {
    return <h2>Loading....</h2>;
  }
  return (
    <>
      <div className="card w-50 mx-auto mt-3 my-2">
        {show && <Modals id={id} setshow={setshow} show={show} />}
        <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    name="gender"
                    className="form-check-input"
                    type="radio"
                    value="All"
                    checked={radioData === ""}
                    onChange={(e)=>{
                      setRadiodata("")
                    }}
                  />
                  <label className="form-check-label">All</label>
                  <input
                    name="gender"
                    className="form-check-input"
                    type="radio"
                    value="Male"
                    checked={radioData === "Male"}
                    onChange={(e)=>{
                      setRadiodata(e.target.value)
                    }}
                  />
                  <label className="form-check-label">Male</label>
                  <input
                    name="gender"
                    className="form-check-input"
                    type="radio"
                    value="Female"
                    checked={radioData === "Female"}
                    onChange={(e)=>{
                      setRadiodata(e.target.value)
                    }}
                  />
                  <label className="form-check-label">Female</label>
                </div>
        {users &&
          users.data
            ?.filter((item) => {
              if (searchData.length === 0) {
                return item;
              } else {
                return item.name
                  ?.toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            }).filter((item)=>{
              if(radioData === "Male"){
                return item.gender === radioData
              } else if(radioData === 'Female'){
                return item.gender === radioData
              } else{
                return item
              }
            })

            .map((item, index) => (
              <div className="card-body" key={index}>
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>
                <p className="card-text">
                  AGE:{item.age} Gender:{item.gender}
                </p>
                <button
                  onClick={() => {
                    setshow(true);
                    setid(item.id);
                  }}
                  className="card-link"
                >
                  View
                </button>
                <Link to={`/update/${item.id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  to="#"
                  onClick={() => {
                    dispatch(Deleteuser(item.id));
                    alert("user Deleted");
                    dispatch(Readuser());
                  }}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            ))}
      </div>
    </>
  );
};

export default ReadData;
