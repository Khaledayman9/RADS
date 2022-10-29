import { useState } from "react"

const InstructorForm = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [country,setCountry] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address,setAddress] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {firstName,lastName,country,phoneNumber,address};
        
        const response = await fetch('/Admin/addInstructor',{
            method:'POST',
            body: JSON.stringify(instructor),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){    
            setFirstName('');
            setLastName('');
            setCountry('');
            setPhoneNumber('');
            setAddress('');
            setError(null);
            console.log("New Instructor Added", json);
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="create-instructor" onSubmit={handleSubmit}>
            <h3>Instructor: Insert Your Information</h3>
           
            <label>First name:</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)}
            value= {firstName}
            />

            <label>Last name:</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)}
            value= {lastName}
            />


            <label>Country:</label>
            <input type="text" onChange={(e) => setCountry(e.target.value)}
            value= {country}
            />

            <label>Phone Number:</label>
            <input type="number" onChange={(e) => setPhoneNumber(e.target.value)}
            value= {phoneNumber}
            />

            <label>Address:</label>
            <input type="text" onChange={(e) => setAddress(e.target.value)}
            value= {address}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorForm;