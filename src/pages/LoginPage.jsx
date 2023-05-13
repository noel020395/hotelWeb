import Form from "react-bootstrap/Form";
import MyButton from "../components/MyButton";
import { call } from "../firebase";
import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    console.log(1);
    let result = await call("userLogin")({
      username: username,
      password: password,
    });
    console.log(2);

    if (result.data.err != null) {
      alert(result.data.err);
    } else {
      if (result.data.role == 0) {
        alert("Welcome admin!");
        window.location.href = "./admin";
      } else if (result.data.role == 1) alert("Welcome user!");
    }
  };

  return (
    <div className="p-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <MyButton text="Log In" color="teal" onClick={handleLogin} />
        <span className="ml-2">
          <MyButton
            text="Register"
            color="teal"
            onClick={() => (window.location.href = "/register")}
          />
        </span>
      </Form>
    </div>
  );
}

export default LoginPage;
