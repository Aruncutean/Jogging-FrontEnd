import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom"
import { readAllTimeFromUser, addTimeFrom, deleteTimeFromUser, getAverageDistance, getAverageTime } from '../../api/Time';
import { Link } from "react-router-dom";
import "./ListTime.css"
import moment from 'moment';


function ListTime() {

    const [time, setTime] = useState("");
    const [date, setDate] = useState(new Date());
    const [dateFirst, setDateFirst] = useState("");
    const [dateSecond, setDateSecond] = useState("");
    const [distance, setDistance] = useState("");
    const [averageDistance, setAverageDistance] = useState("");
    const [averageTime, setAverageTime] = useState("");
    const [totalDistance, setTotalDistance] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [rows, setRow] = useState([]);
    const { id } = useParams();



    useEffect((e) => {
        refreshList();
    }, [1])



    function validateDate() {
        const dateF = new Date(dateFirst);
        const dateS = new Date(dateSecond);
        return dateFirst.length > 0 && dateSecond.length > 0 && dateF < dateS;
    }



    function refreshList() {

        var idUser = localStorage.getItem("id");

        if (id != undefined) {
            console.log(id)
            idUser = id;
        }
        readAllTimeFromUser(idUser).then((response => {
            let arr = [];

            response.data.map((item => {



                const newRow =
                {

                    'id': item.id,
                    'time': item.time,
                    'distance': item.distance,
                    'speed': (parseInt(item.distance) / item.time).toFixed(2),
                    'date': item.date
                }
                arr.push(newRow);
            }))
            setRow(arr);

        }))
        getAverageTime(idUser).then(response => {
            console.log(response.data)
           setAverageTime(response.data.time);
           setAverageDistance(response.data.distance);
           setTotalDistance(response.data.distanceTotal);
           setTotalTime(response.data.timeTotal)
            
        })
    
    }

    function deleteRow(index) {
        deleteTimeFromUser(index).then(response => {
            refreshList()
        })

    }

    function validate() {
        return time && date && distance.length > 0;
    }

    function addNewRow() {

        var idUser = localStorage.getItem("id");
        if (id != undefined) {
            idUser = id;
        }
        addTimeFrom(idUser, time, distance, date).then(response => {

            setTime('');
            setDate('');
            setDistance('');
            refreshList()
        })

    }

    function sortTime() {
        var idUser = localStorage.getItem("id");

        if (id != undefined) {
            console.log(id)
            idUser = id;
        }
        readAllTimeFromUser(idUser).then((response => {
            let arr = [];

            response.data.map((item => {
                const date = new Date(item.date);
                const dateF = new Date(dateFirst);
                const dateS = new Date(dateSecond);
                if (dateF < date && date < dateS) {

                    const newRow =
                    {
                        'id': item.id,
                        'time': item.time,
                        'distance': item.distance,
                        'speed': (parseInt(item.distance) / item.time).toFixed(2),
                        'date': item.date
                    }
                    arr.push(newRow);
                }
            }))
            setRow(arr);

        }))

    }



    return (
        <div className="ListTime">
            <div className="container">
                <br></br>
                <div className="col ">
                    <div className="row align-items-md-baseline py-6">
                        <div className="col justify-content-end">
                            <label>
                                Time:
                                <input type="number" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                            </label>
                        </div>
                        <div className="col ">
                            <label>
                                Date:
                                {console.log(moment(new Date()).format('yyyy-MM-DD'))}
                                <input type="date" name="date" value={moment(date).format('yyyy-MM-DD')} onChange={(e) => setDate(e.target.value)} />
                            </label>
                        </div>
                        <div className="col ">
                            <label>
                                (Km):
                                <input type="number" name="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
                            </label>
                        </div>
                        <div className="col ">
                            <input type="submit" value="Add Time" disabled={!validate()} onClick={(e) => addNewRow()} />
                        </div>

                    </div>

                </div>
                <div className='row py-6 '>
                    <div className='col'> <label>
                        DateFirst:
                        <input type="date" name="date" value={dateFirst} onChange={(e) => setDateFirst(e.target.value)} />
                    </label></div>
                    <div className='col'>
                        <label>
                            DateSecond:
                            <input type="date" name="date" value={dateSecond} onChange={(e) => setDateSecond(e.target.value)} />
                        </label>
                    </div>

                    <div className="col ">
                        <input type="submit" value="Sort time" onClick={() => sortTime()} disabled={!validateDate()} />
                    </div>
                    <div className="col ">
                        <input type="submit" value="refresh time" onClick={() => refreshList()} />
                    </div>


                </div>
                <div className='row my-2 '>
                    Average speed:  {(averageDistance / averageTime).toFixed(2)}
                </div>
                <div className='row my-2'>
                    Average distance :  {averageDistance}
                </div>
                <div className='row my-2'>
                    Total distance :  {totalDistance}
                </div>
                <div className='row my-2'>
                Total time :  {totalTime}
                </div>
                <div className='row my-2'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Time</th>
                                <th scope="col">Distance(Km)</th>
                                <th scope="col">Speed</th>
                                <th scope="col">Date</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{r.time} </td>
                                    <td>{r.distance}</td>
                                    <td>{r.speed}</td>
                                    <td>{moment(r.date).format('yyyy-MM-DD')}</td>
                                    <td><Link to={`/edit/${r.id}`}><button type="button" class="btn btn-dark">Edit</button></Link></td>
                                    <td> <button type="button" class="btn btn-danger" onClick={() => deleteRow(r.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default ListTime;
