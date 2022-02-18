import React , {useState} from 'react'
import { useParams } from 'react-router-dom'
import {Alert, Form  } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { BACKEND_ALL_ACTIVATION } from './config/urls'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
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
    const tokensubmit = (evt) => {
      evt.preventDefault();
      const token = evt.target.elements.token.value;
      const uid = evt.target.elements.uid.value;
      // console.log(token)
      // console.log(uid)
      set_load_spinner_(true)
        axios.post(BACKEND_ALL_ACTIVATION,{
          token:token,
          uid:uid,
        })
        .then((response) => {
          // console.log(response)
          setmessageyes("Email verified")
          setmessage(null)
          })
          .catch(err =>{
            if(err.response){
            setmessageyes(null)
            setmessage(err.response.data["token"][0])
            }else{}

          }).finally(() => {
            set_load_spinner_(false)

            });

    }
  return (
    <>

      <div className="shadow-lg p-3 mb-5 mt-5 bg-white rounded" style={_whole_div_}>
        <Form onSubmit={tokensubmit}>
          <center>
          <h3>Verify email</h3>
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
              <Form.Label>Token</Form.Label>
              <Form.Control type="text" defaultValue={token} name="token" placeholder="TOKEN" disabled/>
              </Form.Group>
              <Form.Group controlId="formBasicuid">
                <Form.Control type="hidden" defaultValue={id} name="uid" placeholder="uid" disabled/>
              </Form.Group>
              {(_load_spinner_)?
                <>
                  <p>Verifying Mail</p>
                  <CircularProgress />
                </>
                :
                  <Button className='mt-4' type="submit" variant="contained">Verify</Button>}
            </>
            }
            </center>
            </Form>
      </div>
    </>
  )
}

export default EmailVerification