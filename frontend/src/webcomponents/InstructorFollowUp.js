import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { TextField } from "@mui/material";


const InstructorFollowUp = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const instructorId = params.get('instructorId');
    const reportId = params.get('reportId');
    const [instructor, setInstructor] = useState([]);
    const [report, setReport] = useState([]);
    const [instructorComment,setInstructorComment] = useState('');

    useEffect(() => {
        const fetchInstructor = async () => {
            const response = await fetch(`/instructor/${instructorId}`);
            const json = await response.json();
            if (response.ok) {
                setInstructor(json);
                fetchReport();
            }
        }
        fetchInstructor();
    }, [])

    const fetchReport = async () => {
        const response = await fetch(`/report/request/${reportId}`);
        const json = await response.json();
        if (response.ok) {
            setReport(json);
        }
    }
    const postComment = async () => {
        const body = {instructorComment}
        const response = await fetch(`/report/instructorpostcomment/${reportId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            window.location.reload();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postComment();
    }

    
    return (
        <div>
            <h3><strong>Report Follow up:</strong></h3>
                        <div className="some-container">
                            <p><strong>Information of The Report</strong></p>
                            <p>Sender: {instructor.firstName} {instructor.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <div>Comment/Comments: {report.instructorComments && report.instructorComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.instructorComment}</p>))}</div>
                            <p>Report Status:<strong>{report.reportStatus}</strong></p>
                            {report.adminCommment ? (<div><p>Admin Reply:{report.adminCommment} </p></div>)
                                : (
                                    "No Admin Reply"
                                )}
                            <form onSubmit={handleSubmit}>
                            <TextField label="Add another comment"value ={instructorComment} onChange={(e) =>setInstructorComment(e.target.value)}></TextField>
                            <button type="submit">Submit</button>
                            </form>
                        </div>
        </div>

    )
}

export default InstructorFollowUp;