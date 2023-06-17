import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { adminAction } from '../../store/redux'


const Admin = () => {

  const dispatch = useDispatch();

  const onResReceived = (data) => {
    dispatch(adminAction.login())
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token)
    alert('login successfull close the page and navigate to home')
  }

  const getData = (data) => {
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin