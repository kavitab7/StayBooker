import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Room = ({ room }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='row bs' >
            <div className="col-md-4">
                <img src={Room.imgurls[0]} className='smalling' />
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <b>
                    {" "}
                    <p>Max Count : {room.maxcount} </p>
                    <p>Phone Number : {room.phonenumber} </p>
                    <p>Type : {room.type} </p>
                </b>
                <div style={{ float: 'right' }}>
                    <Link to={`/book/${room._id}`}>
                        <button className='btn btn-dark mr-2'>Book Now</button>
                    </Link>
                    <button className='btn btn-success' onClick={handleShow} >View Details</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Carousel prevLabel='' nextLabel='' >
                        {room.imgurls.map(url => {
                            return <Carousel.Item>
                                <img className='d-block w-100 bigimg' src={url} />
                            </Carousel.Item>
                        })}

                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Room