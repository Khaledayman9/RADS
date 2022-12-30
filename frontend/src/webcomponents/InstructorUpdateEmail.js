import { useState } from "react"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button } from "@mui/material";

const InstructorUpdateEmail = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const [email,setEmail] = useState('')
    const decode = jwt_decode(token);
    const instructorId = decode.id;
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {email};
        axios
        .patch(`/instructor/changeInfo/${instructorId}`, instructor)
        .then((res) => {
            setEmail('');
            console.log("Info Changed", res.data);
            //refresh page on successful submission
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        })
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Email</h3> 
            <label>Email:</label>
            <input type="text" onChange={(e) =>  setEmail(e.target.value)}
            value= {email}
            />
            <Button
          variant="contained">Submit</Button>
        </form>
    )
}



export default InstructorUpdateEmail;