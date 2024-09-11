import React from 'react'

const Error = ({ message }) => {
    return (
        <div>
            <div className="alert alert-warning " role='alert' >
                {message}
            </div>
        </div>
    )
}

export default Error