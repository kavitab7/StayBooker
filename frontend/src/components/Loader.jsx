import React, { useState } from 'react'
import DotLoader from "react-spinners/DotLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: '155px' }}>
            <div className="sweet-loading text-center ">
                <DotLoader
                    loading={loading}
                    size={70}
                />
            </div>
        </div>
    )
}

export default Loader