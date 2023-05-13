import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import FieldEdit from "./FieldEdit";
import { call } from "../../../firebase";

function UserTab() {
  const [users, setUsers] = useState([]);
  //这里是adminPage, 要拿到所有user的 data, getAllUsers function 使用 index.js 的userGetAll
  const getAllUsers = async () => {
    const result = await call("userGetAll")({
      username: "admin",
      password: "admin",
    });
    console.log(result);

    //question: 如果err 的value 是空的，返回false, 就把data 存进setUser
    if (!result.data.err) {
      setUsers(result.data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>DisplayName</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {/* {users.map((user, key) => (
          <tr key={key}>
            <td>{user.username}</td>
            <td>
              <FieldEdit defaultText={user.displayName} />
            </td>
            <td>
              <FieldEdit defaultText={user.email} />
            </td>
          </tr>
        ))} */}
        <tr>
          <td>Jason</td>
          <td>
            <FieldEdit text="jason123" />
          </td>
          <td>
            <FieldEdit
              text="jason@gmail.com"
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UserTab;
