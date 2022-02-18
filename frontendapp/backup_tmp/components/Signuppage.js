import React , {useState} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { BACKEND_ALL_SINGUP } from '../config/urls'
import { Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Signuppage = () => {
  let navigate = useNavigate();

  // console.log(BACKEND_ALL_SINGUP)
  const [_load_spinner_, set_load_spinner_] = useState(false)
  const [verify_email, set_verify_email] = useState(false)
  const [mail, setmail] = useState(null)
  const SignUpvalidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    first:Yup.string()
        .min(2, 'Too Short!')
        .max(12, 'That\'s huge name not accepted')
        .required('first name required'),
    last:Yup.string()
        .min(2, 'Too Short!')
        .max(10, 'That\'s huge name not accepted')
        .required('last name required'),
    password:Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Are You sure can remember')
        .required('Password required'),
    re_password:Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      })
  });
  const _whole_div_ = {
    width:"80%",
    margin:"auto",
    borderRadius:"50px"
  }
  return (
    <>
      <div className="shadow-lg p-3 mb-5 mt-5 bg-white rounded" style={_whole_div_}>
        {(verify_email)?
          <>
          <center>
              <p style={{fontWeight:"bold"}}>
                {(mail)?(mail):null}
              </p>
            <h3>Check your Email for verification</h3>
            <Button type="button"
            onClick={()=>{
              navigate('/login')
            }}
            >Login</Button>
            </center>
          </>
        :
          <Formik
              initialValues={{
                  email:"",
                  first:"",
                  last:"",
                  password:"",
                  re_password:"",
                  added: null,
              }}
              validationSchema={SignUpvalidation}
              onSubmit={( values,actions) =>{
                  set_load_spinner_(true)
                  axios.post(BACKEND_ALL_SINGUP,{
                      email:values.email,
                      first:values.first,
                      last:values.last,
                      password:values.password,
                      re_password:values.re_password
                    },{ withCredentials: true })
                    .then((response) => {
                      console.log(response)
                      set_load_spinner_(false)
                      set_verify_email(true)
                      if(response.data){
                        setmail(response.data["email"])
                      }
                      })
                      .catch(err =>{
                        if(err.response.data["email"]){
                          // console.log(err.response.data["email"][0])
                          actions.setStatus({
                            added: err.response.data["email"][0]
                          });
                        }else{}
                        if(err.response.data["password"]){
                          // console.log(err.response.data["password"][0])
                          actions.setStatus({
                            added: err.response.data["password"][0]
                          });
                        }else{}
                        set_load_spinner_(false)
                      }).finally(() => {
                        set_load_spinner_(false)
                        });
              }}
              >
              {({errors,status,touched}) => (
              <Form className='p-4 m-4' >
                <center><h4 style={{marginTop:"15px"}}>Register ACC</h4></center>

                {status && status.added ? (
                  <>
                  <center>
                    <Alert style={{textAlign:"center",fontFamily:"cursive",fontSize:"15px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{status.added}</Alert>
                  </center>
                  </>
                ) : (null)}

                <label style={{fontWeight:"bold",fontFamily:"monospace"}}>Email </label>
                <Field  className="form-control"  name="email" type="email" placeholder="Email" autoComplete="off" noValidate/>
                {errors.email && touched.email
                ?
                    <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.email}</Alert>
                :
                    null
                }
                <label style={{fontWeight:"bold",fontFamily:"monospace"}}>First name </label>
                <Field  className="form-control"  name="first" type="text" placeholder="First Name" autoComplete="off" noValidate/>
                {errors.first && touched.first
                ?
                    <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.first}</Alert>
                :
                    null
                }
                <label style={{fontWeight:"bold",fontFamily:"monospace"}}>Last name </label>
                <Field  className="form-control"  name="last" type="text" placeholder="Last Name" autoComplete="off" noValidate/>
                {errors.last && touched.last
                ?
                    <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.last}</Alert>
                :
                    null
                }
                <label style={{fontWeight:"bold",fontFamily:"monospace"}}>Password </label>
                <Field  className="form-control"  name="password" type="password" placeholder="Password" autoComplete="off" noValidate/>
                {errors.password && touched.password
                ?
                    <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.password}</Alert>
                :
                    null
                }
                <label style={{fontWeight:"bold",fontFamily:"monospace"}}>Repeat Password </label>
                <Field  className="form-control"  name="re_password" type="password" placeholder="Repeat Password" autoComplete="off" noValidate/>
                {errors.re_password && touched.re_password
                ?
                    <Alert style={{fontFamily:"cursive",fontSize:"13px",width:"100%",marginTop:"2px",backgroundColor:'#e31e1e',color:"white"}} severity="error">{errors.re_password}</Alert>
                :
                    null
                }
               {(_load_spinner_)?
               <>
                <center>
                    <p style={{fontWeight:"bold",fontFamily:"cursive",color:"red",fontSize:"15px"}}>Creating account</p>
                    <CircularProgress />
                </center>
                </>
                :
                  <center>
                    <Button className='mt-4' type="submit" variant="contained">Register</Button>
                  </center>}

              </Form>
              )}
              </Formik>
            }
              </div>
    </>
  )
}

export default Signuppage