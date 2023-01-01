import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const InstructorDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const instructorId = params.get("instructorId");

  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    const fetchInstructor = async () => {
      axios
        .get(`/instructor/${instructorId}`)
        .then((res) => {
          setInstructor(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchInstructor();
  }, []);
  return (
    <Box className="instructor-details card-border">
      <h4>The information of user: {instructor.userName}</h4>
      <p>
        <strong>First Name: </strong>
        {instructor.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {instructor.lastName}
      </p>
      <p>
        <strong>Country: </strong>
        {instructor.country}
      </p>
      <p>
        <strong>Gender: </strong>
        {instructor.gender}
      </p>
      <p>
        <strong>Email: </strong>
        {instructor.email}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {instructor.phoneNumber}
      </p>
      <p>
        <strong>address: </strong>
        {instructor.address}
      </p>
    </Box>
  );
};

export default InstructorDetails;
