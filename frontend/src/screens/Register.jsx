import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    async function register() {
        if (password == cpassword) {
            const user = {
                name, email, password, cpassword
            }
            try {
                setLoading(true)
                const { data } = await axios.post('/api/users/register', user)
                setLoading(false);
                setSuccess(true)

                setName('');
                setEmail('')
                setPassword('')
                setCpassword('')
            } catch (error) {
                console.log(error)
                setLoading(false);
                setError(true)
            }
            console.log(user);
        } else {
            alert('Pasword not matched')
        }
    }
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message="Registration success" />)}
                    <div>
                        <h1>Register</h1>
                        <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='confirm password' value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
                        <button className='btn btn-light ' onClick={register}>Register  </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register