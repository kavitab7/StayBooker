import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Room from '../components/Room';

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
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>Error</h1>
                ) : (
                    rooms.map((room) => {
                        return <div className="col-md-9">
                            <Room room={room} />
                        </div>;
                    })
                )}
            </div>

        </div>
    )
}

export default Home