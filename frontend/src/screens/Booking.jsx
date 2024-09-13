import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

const Booking = () => {
    let { roomid, fromDate, toDate } = useParams();
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const firstdate = moment(fromDate, 'DD-MM-YYYY')
    const lastdate = moment(toDate, 'DD-MM-YYYY')

    const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1
    const [totalAmount, setTotalAmount] = useState();
    useEffect(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/rooms/getroombyid', { roomid })
            setRoom(data)
            setTotalAmount(data?.rentperday * totaldays)
            setLoading(false)
        } catch (error) {
            setError(false)
            console.log(error)
            setLoading(false)
        }
    }, [])

    async function bookRoom() {
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate: fromDate,
            todate: toDate,
            totalamount: totalAmount,
            totaldays
        }
        try {
            const { data } = await axios.post('/api/bookings/bookroom', bookingDetails)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='m-5' >
            {loading ? (<h1><Loader /></h1>) : error ? (<div>
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
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>Form Date : {fromDate}</p>
                                <p>To Date : {toDate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }} >
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : {totaldays}</p>
                                <p>Rent per day : {room.rentperday} </p>
                                <p>Total Amount: {totalAmount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }} >
                            <button className='btn btn-primary' onClick={bookRoom} >Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>) : (<Error />)}
        </div>
    )
}

export default Booking