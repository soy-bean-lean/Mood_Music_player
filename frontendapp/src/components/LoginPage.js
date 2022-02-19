import React , {useState,useEffect} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Button from '@mui/material/Button';
import { BACKEND_URL_LOGIN } from '../config/urls'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { _save_access_token_,_save_refresh_token_ , __delete_refresh_token_} from '../features/JwtRefreshAccessToken'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();

  const [_load_spinner_, set_load_spinner_] = useState(false)
  const dispatch = useDispatch()

  const LoginUpvalidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    password:Yup.string()
        .max(12, 'Nobody have that long password')
        .required('Password required'),
  });
  const _whole_div_ = {
    width:"60%",
    margin:"auto",
    borderRadius:"50px"
  }

  return (
    <>

      <>
      <Formik
          initialValues={{
              email:"",
              password:"",
              added:null,
          }}
          validationSchema={LoginUpvalidation}
          onSubmit={(values,actions) => {
              actions.setStatus(undefined);
              // console.log(values)
              set_load_spinner_(true)
              axios.post(BACKEND_URL_LOGIN,{
                email:values.email,
                password:values.password,
              },{withCredentials:true})
                .then((response) => {
                      // console.log(response.data["access"])
                      dispatch(_save_refresh_token_(response.data['refresh']));
                      dispatch(_save_access_token_(response.data['access']));
                      navigate('/Dashboard')
                      // break
                  })
                  .catch(err =>{
                      set_load_spinner_(false)
                      // console.log(err.response.data["detail"])
                      if(err.response.data["detail"]){
                          actions.setStatus({
                              added: err.response.data["detail"]
                            });
                          }
                  });

          }}
          >
              {({errors,status,touched}) => (
                <div className="shadow-lg p-3 mb-5 mt-5 bg-white rounded" style={_whole_div_}>
                  <Form autoComplete="off" noValidate>
                    <center><h4 style={{marginTop:"15px"}}>Login to your ACC</h4></center>

                  {status && status.added ? (
                    <>
                    <center>
                      <Alert style={{textAlign:"center",fontFamily:"cursive",fontSize:"15px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{status.added}</Alert>
                      <Link to="/signup" style={{decoration:"none"}} className="btn">Create account</Link><br></br>
                      <Link to="/reset_password" style={{decoration:"none"}} className="btn">Reset Password</Link><br></br>
                    </center>
                    </>
                  ) : (null)}

                    <label style={{fontWeight:"bold"}}>Email </label>
                    <Field  className="form-control"  name="email" type="email" placeholder="Email"autoComplete="off" noValidate/>

                    {errors.email && touched.email
                      ?
                      <center>
                      <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"50%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.email}</Alert>
                      </center>
                      :
                          null
                      }

                    <label style={{fontWeight:"bold"}}>Password </label>
                    <Field  className="form-control"  name="password" type="password" placeholder="Password"autoComplete="off" noValidate/>

                    {errors.password && touched.password
                      ?
                      <center>
                      <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"50%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.password}</Alert>
                      </center>
                      :
                          null
                      }
                      {(_load_spinner_)
                      ?
                          <center>
                              <p style={{fontWeight:"bold",fontFamily:"cursive",color:"red",fontSize:"15px"}}>Verifying Email and Password</p>
                              <CircularProgress />
                          </center>
                      :
                      <center>
                      <Button className='mt-4' type="submit" variant="contained">Login</Button>
                      </center>
                      }
                </Form>
                </div>
              )}

          </Formik>
      </>
  </>
  )
}

export default LoginPage