import React , {useState} from 'react'
import { BACKEND_RESEND_ACTIVATION } from '../../config/urls';
import {Alert, Form  } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import AlertMUI from '@mui/material/Alert';

const ResendEmailVerification = () => {
    const [error, seterror] = useState(null)
    const [success, setsuccess] = useState(false)
    const _whole_div_ = {
        width:"50%",
        margin:"auto",
        borderRadius:"50px"
      }
      const schema = yup.object().shape({
        email: yup.string().email().required(),
      });
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmitHandler = (data) => {
        // console.log(data.email)
        axios.post(BACKEND_RESEND_ACTIVATION,{
            email:data.email
          })
          .then((response) => {
            seterror(null)
            setsuccess(true)
            })
            .catch(err =>{
                setsuccess(false)
                seterror("Check your mail again")
            })

        // reset();
      };
  return (
      <>
   <div className="shadow-lg p-3 mb-5 mt-5 bg-white rounded" style={_whole_div_}>
        <Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
        <center>
          <h3>Resend Verification</h3>
              <Form.Group controlId="formBasicToken">
              <Form.Label>Email</Form.Label>


            <input className='form-control' {...register("email")} placeholder="E-Mail" type="email"  autoComplete="off" />
            <br />
            {(errors.email)
            ?
            <Alert style={{textAlign:"center",fontFamily:"cursive",fontSize:"15px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.email.message}</Alert>
            :
                null
            }
            {(error)
            ?
            <Alert style={{textAlign:"center",fontFamily:"cursive",fontSize:"15px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{error}</Alert>
            :
                null
            }
            {(success)
            ?
                <AlertMUI severity="success">Verifcation send</AlertMUI>
            :
                null
            }


              </Form.Group>

                  <Button className='mt-4' type="submit" variant="contained">Send Verifcation</Button>
            </center>
        </Form>
      </div>
    </>
  )
}

export default ResendEmailVerification