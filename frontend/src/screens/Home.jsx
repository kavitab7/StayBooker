import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Home() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/rooms/getallrooms')
            setRooms(data)
            setLoading(false)
        } catch (error) {
            setError(false)
            console.log(error)
            setLoading(false)
        }
    }, [])

    return (
        <div>
            <div className="row">
                {loading ? (
                    <h1><Loader /></h1>
                ) : rooms.length > 1 ? (
                    rooms.map((room) => {
                        return <div className="col-md-9">
                            <Room room={room} />
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