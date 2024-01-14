import React from 'react'
import './signup.css'
import HeadingComp from './HeadingComp'
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const history = useNavigate()
  const [Inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  })
  const change = (e) => {
    const { name, value } = e.target
    setInputs({ ...Inputs, [name]: value })
  }
  const submit = async (e) => {
    e.preventDefault()
    if (
      Inputs.email === '' ||
      Inputs.username === '' ||
      Inputs.password === ''
    ) {
      toast.error('Please enter all the required fields!')
    } else {
      const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
      if (emailRegex.test(Inputs.email)) {
        await axios
          .post(`${window.location.origin}/api/v1/register`, Inputs)
          .then((response) => {
            if (response.data.message === 'User Already Exists') {
              alert(response.data.message)
            } else {
              alert(response.data.message)
              setInputs({
                email: '',
                username: '',
                password: '',
              })
              history('/signin')
            }
          })
      } else {
        toast.error('Please enter valid email')
      }
    }
  }
  return (
    <div className='signup'>
      <ToastContainer />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 column d-flex justify-content-center align-items-center '>
            <div className='d-flex flex-column  w-100 p-3'>
              <input
                className='p-2  my-3 input-signup'
                type='email'
                name='email'
                placeholder='Enter Your Email'
                onChange={change}
                value={Inputs.email}
              />
              <input
                className='p-2 my-3 input-signup'
                type='text'
                name='username'
                placeholder='Enter Your Username'
                required
                onChange={change}
                value={Inputs.username}
              />
              <input
                className='p-2 my-3 input-signup'
                type='password'
                name='password'
                placeholder='Enter Your Password'
                required
                onChange={change}
                value={Inputs.password}
              />

              <button className='btn-signup p-2' onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className=' col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none'>
            <HeadingComp first='Sign' second='Up' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
