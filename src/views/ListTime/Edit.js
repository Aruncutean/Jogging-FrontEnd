import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { readTimeFromindex, updateTimeFromIndex } from '../../api/Time';
import "./Edit.css"

function Edit() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [distance, setDistance] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect((e) => {
        readTimeFromindex(id).then(response => {
            console.log(response.data);
            setTime(response.data.time);
            setDate(format(response.data.date));
            setDistance(response.data.distance);

        })

    }, [1])

    function format(date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return year + '-' + month + '-' + day;
    }


    function save() {
        updateTimeFromIndex(id, time, distance, date).then(response => {
            console.log(response);
            navigate('/');
        });

    }

    return (
        <div className="Edit">
            <div className="container">

                <div className='col'>
                    <div className="row py-2">
                        <h1 className="text-center py-2">Edit Time</h1>
                    </div>
                    <div className="row py-2">
                        <label>
                            Time:
                            <input type="number" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </label>
                    </div>
                    <div className="row py-2">
                        <label>
                            Date:
                            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </label>
                    </div>
                    <div className="row py-2">
                        <label>
                            (Km):
                            <input type="number" name="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
                        </label>
                    </div>
                    <div className='row py-2'>
                        <input className="btn btn-primary py-2" name="commit" type="submit"
                            value="Save" onClick={(e) => save()} />
                    </div>
                    <br></br> <br />

                </div>
            </div>
        </div>
    );
}

export default Edit;
