import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/getUsers").then((res) => {
      console.log(res);
      setListOfUsers(res.data);
    });
  }, []);

  const createUser = () => {
    axios
      .post("http://localhost:8080/createUser", {
        name,
        age,
        username,
      })
      .then((res) => {
        alert("user created!");
        setListOfUsers([...listOfUsers, { name, age, username }]);
      });
  };

  return (
    <>
      <div className="user-list">
        {listOfUsers.map((user) => {
          const { name, age, username } = user;
          return (
            <div>
              <h1> {name} </h1>
              <h2> {age} </h2>
              <h2> {username} </h2>
            </div>
          );
        })}
      </div>
      <div className="user-create">
        <input
          type="text"
          placeholder="john doe"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age.."
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={createUser}>Create User</button>
      </div>
    </>
  );
};

export default Users;
