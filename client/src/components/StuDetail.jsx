import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
    getSudentByIdApi,
    deleteSudentByIdApi
  } from '../api/stuApi';

const StuDetail = () => {
  const {id} = useParams();


  const [stu, setStu] = useState({
    name : "",
    age : "",
    phone : "",
    email : "",
    education : "",
    profession : "",
    profile : "",
});

const navigate = useNavigate();

// get student details
useEffect(() => {
    getSudentByIdApi(id).then(({ data }) => {
        setStu(data);
    });
}, [id])


function deleteStu(id){
    if(window.confirm("are you sure to delete？")){
        deleteSudentByIdApi(id).then(()=>{
            navigate("/home", {
                state : {
                    alert : `Student: ${stu.name} deleted successfully!`,
                    type : "info"
                }
            })
        })
    }
}

return (
    <div className="details container">
        <button className="btn btn-default" onClick={() => navigate("/home")}>Back</button>
        <h1 className="page-header">
            {stu.name}
            <span className="pull-right">
                <button className="btn btn-primary" onClick={() => navigate(`/edit/${stu.id}`)} style={{ marginRight: 10 }}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteStu(stu.id)}>Delete</button>
            </span>
        </h1>
        
        <ul className="list-group">
            <li className="list-group-item">
                <span className="glyphicon glyphicon-phone">Phone：{stu.phone}</span>
            </li>
            <li className="list-group-item">
                <span className="glyphicon glyphicon-envelope">Email：{stu.email}</span>
            </li>
        </ul>

        <ul className="list-group">
            <li className="list-group-item">
                <span className="glyphicon glyphicon-book">Education：{stu.education}</span>
            </li>
            <li className="list-group-item">
                <span className="glyphicon glyphicon-briefcase">Profession：{stu.profession}</span>
            </li>
            <li className="list-group-item">
                <span className="glyphicon glyphicon-user">Profile：{stu.profile}</span>
            </li>
        </ul>
    </div>
);
}

export default StuDetail