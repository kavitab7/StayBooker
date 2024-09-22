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
    const [searchkey, setSearchkey] = useState('')
    const [type, setType] = useState('all')

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

        var temprooms = []
        var availability = false
        for (const room of duplicaterooms) {
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    if (!moment(moment(dates[0].$d).format('LL')).isBetween(booking.fromdate, booking.todate)
                        && !moment(moment(dates[1].$d).format('LL')).isBetween(booking.fromdate, booking.todate)) {
                        if (
                            moment(dates[0].$d).format('LL') !== booking.fromdate &&
                            moment(dates[0].$d).format('LL') !== booking.todate &&
                            moment(dates[1].$d).format('LL') !== booking.fromdate &&
                            moment(dates[1].$d).format('LL') !== booking.todate
                        ) {
                            availability = true
                        }
                    }
                }
            }
            if (availability == true || room.currentbookings.length == 0) {
                temprooms.push(room)
            }
            setRooms(temprooms)
        }
        function filterBySearch() {
            const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
            setRooms(temprooms)
        }
        function filterByType(e) {
            setType(e)
            if (e != 'all') {
                const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
                setRooms(temprooms)
            } else {
                setRooms(duplicaterooms)
            }
        }
    }
    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
            </div>
            <div className="col-md-5">
                <input type='text' className='form-control' placeholder='search rooms'
                    value={searchkey} onChange={(e) => { setSearchkey(e.target.value) }} onKeyUp={filterBySearch}
                />
            </div>
            <div className="col-md-3">
                <select className='from-control' value={type} onChange={(e) => { filterByType(e.target.value) }} >
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                </select>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : (
                    rooms.map((room) => {
                        return <div className="col-md-9">
                            <Room room={room} fromdate={fromdate} todate={todate} />
                        </div>;
                    })

                )}
            </div>

        </div>
    )
}

export default Home