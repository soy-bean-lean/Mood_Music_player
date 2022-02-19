import React , {useState} from 'react'
import { useParams } from 'react-router-dom'
import {Alert, Form  } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { BACKEND_RESET_FINAL_PASSWORD } from '../../config/urls';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const ResetPasswordFinal = () => {
  let navigate = useNavigate();

    const { id,token } = useParams();
    const [_load_spinner_, set_load_spinner_] = useState(false)
    const [message, setmessage] = useState(null)
    const [messageyes, setmessageyes] = useState(null)

    const _whole_div_ = {
      width:"50%",
      margin:"auto",
      borderRadius:"50px"
    }
    const PasswordSubmit = (evt) => {
      evt.preventDefault();
      const token = evt.target.elements.token.value;
      const uid = evt.target.elements.uid.value;
      const new_password = evt.target.elements.new_password.value;
      set_load_spinner_(true)
        axios.post(BACKEND_RESET_FINAL_PASSWORD,{
          token:token,
          uid:uid,
          new_password:new_password,
          re_new_password:new_password
        })
        .then((response) => {
          setmessageyes("Password Reset succesfully")
          setmessage(null)
          })
          .catch(err =>{
            if(err.response){
              setmessageyes(null)
                setmessage("Provide a valid data")
              }
          }).finally(() => {
            set_load_spinner_(false)

            });

    }
  return (
    <>

      <div className="shadow-lg p-3 mb-5 mt-5 bg-white rounded" style={_whole_div_}>
        <Form onSubmit={PasswordSubmit}>
          <center>
          <h3>New Password</h3>
          <p style={{color:"red",fontWeight:"bold"}}>
            {(message)?message:null}
          </p>
            {(messageyes)?
            <>
                <p style={{color:"green",fontWeight:"bold"}}>
                  {messageyes}
                </p>
                <Button type="button"
                onClick={()=>{
                  navigate('/login')
                }}
                >Login</Button>
            </>
            :
            <>
              <Form.Group controlId="formBasicToken">
              <Form.Control type="hidden" defaultValue={token} name="token" placeholder="TOKEN" disabled/>
              </Form.Group>
              <Form.Group controlId="formBasicuid">
                <Form.Control type="hidden" defaultValue={id} name="uid" placeholder="uid" disabled/>
              </Form.Group>

              <Form.Group controlId="formBasicnew_password">
                <Form.Control type="password" name="new_password" placeholder="New Password"/>
              </Form.Group>
                <br />


              {(_load_spinner_)?
                <>
                  <p>Saving New Password</p>
                  <CircularProgress />
                </>
                :
                  <Button className='mt-4' type="submit" variant="contained">Save Password</Button>}
            </>
            }
            </center>
            </Form>
      </div>
    </>
  )
}

export default ResetPasswordFinal
