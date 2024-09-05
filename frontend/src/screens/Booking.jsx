import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Booking = () => {
    let { roomid } = useParams();
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/rooms/getroombyid', { roomid })
            setRoom(data)
            setLoading(false)
        } catch (error) {
            setError(false)
            console.log(error)
            setLoading(false)
        }
    }, [])
    return (
        <div className='m-5' >
            {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error...</h1>) : (<div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h1>{roomid.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name :</p>
                                <p>Form Date :</p>
                                <p>To Date :</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }} >
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : </p>
                                <p>Rent per day : {room.rentperday} </p>
                                <p>Total Amount</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }} >
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Booking