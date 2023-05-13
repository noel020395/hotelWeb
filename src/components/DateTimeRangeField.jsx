import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function DateTimeRangeField() {
  return (
    <div className="flex flex-col justify-center m-5">
      <center className="text-2xl font-bold m-3">Book with us</center>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text-xl  font-bold">Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label className="text-xl  font-bold">Phone Number</Form.Label>
            <Form.Control type="password" placeholder="Phone Number" />
          </Form.Group>
        <Form.Group className="m-2" controlId="formBasicDateAndTime">
          <Form.Label className="text-xl  font-bold">Check In</Form.Label>
        </Form.Group>
        <DatePicker />
        <Form.Group className="m-2" controlId="formBasicDateAndTime">
          <Form.Label className="text-xl  font-bold">Check Out</Form.Label>
        </Form.Group>
        <DatePicker />
        </Form>
      </LocalizationProvider>
      <div className="m-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
}
