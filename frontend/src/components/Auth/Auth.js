import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { userAction } from '../../store/redux'
import { useDispatch } from 'react-redux'

const Auth = () => {

  const dispatch = useDispatch();

  const onResReceived = (data) => {
      dispatch(userAction.login())
      localStorage.setItem("userId" , data.id)
      alert('authentication successfull close the page and navigate to home')
      
  }

  const getData = (data) => {
      sendUserAuthRequest(data.inputs , data.signup)
      .then(onResReceived)
      .catch(err=>{console.log(err)})
  }  

  return (
    <div>

           <AuthForm onSubmit={getData} isAdmin={false}/>

    </div>
  )
}

export default Auth