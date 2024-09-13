import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

function Home() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [fromdate, setFromDate] = useState();
    const [todate, setTodate] = useState()
    const [duplicaterooms, setDuplicaterooms] = useState([])

    useEffect(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/rooms/getallrooms')
            setRooms(data)
            setDuplicaterooms(data)
            setLoading(false)
        } catch (error) {
            setError(false)
            console.log(error)
            setLoading(false)
        }
    }, [])

    function filterByDate(dates) {
        const from = moment(dates[0].$d).format('LL');
        const to = moment(dates[1].$d).format('LL');
        setFromDate(from);
        setTodate(to)
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <h1><Loader /></h1>
                ) : rooms.length > 1 ? (
                    rooms.map((room) => {
                        return <div className="col-md-9">
                            <Room room={room} fromdate={fromdate} todate={todate} />
                        </div>;
                    })

                ) : (
                    <Error />
                )}
            </div>

        </div>
    )
}

export default Home