import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function login() {
        const user = {
            email, password
        }
        try {
            setLoading(true)
            const { data } = await axios.post('/api/users/login', user)
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(data));
            window.location.href = '/home'
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }
    return (
        <div>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 ">
                    {error && (<Error message='Invalid Credentionals' />)}
                    <div>
                        <h1>Login</h1>
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button className='btn btn-light ' onClick={login}>Login  </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login