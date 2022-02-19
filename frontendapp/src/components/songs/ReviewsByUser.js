import React ,  { useEffect,useState } from 'react';
import { BACKEND_URL_REVIEWS_SHOW } from '../../config/urls';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux"
import { _show_reviews_ } from '../../features/Reviews'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserAlt,faPaperPlane , faClose } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';

import { BACKEND_URL_REVIEWS_ADD } from '../../config/urls';
import CircularProgress from '@mui/material/CircularProgress';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const ReviewsByUser = ({_SONG_ID_,_SONG_NAME_,AUTHORIZATION_TOKEN}) => {
    // console.log("========================")
    // console.log("Name : "+_SONG_NAME_)
    // console.log("========================")
    const [_reviews_data_, set_reviews_data_] = useState(null)
    const [_posting_, set_posting_] = useState(false)

    const [_edit_reviews_, set_edit_reviews_] = useState(false)
    const [_edit_id_data_, set_edit_id_data_] = useState(null)
    // const [editedreview, seteditedreview] = useState("");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        // seteditedreview("")
        setOpen(false)
    }
    const dispatch = useDispatch()
    const _songs_reviews_ = useSelector((state) => state._REVIEWS_._songs_reviews)
    let _token_from_redux_store_ = useSelector((state) => state.CountJwtRefreshAccessToken.JwtAccessToken)
    if(_token_from_redux_store_!=null){
        var decoded = jwt_decode(_token_from_redux_store_);
    }
    const notify = () => {

        toast("Deleted")
    }

    const notifyedited = (response_data) => {
        toast(response_data)
    }
    const _data_from_server_ = async (url) => {

        await axios.get(BACKEND_URL_REVIEWS_SHOW+_SONG_ID_+"/",{headers:{
            'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
        }}).then((resp)=>{
            // console.log(resp.data)
            dispatch(_show_reviews_(resp.data))
        }).catch((err)=>{
            console.log(err)
        })
      }
      const _delete_comment_ = async (data) => {
        //   console.log(data)

        await axios.delete(BACKEND_URL_REVIEWS_ADD+data+"/",{headers:{
            'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
        }}).then((resp)=>{
            // console.log(resp.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
            notify()
        })
      }

      const _edit_comment_ = async (data) => {
        //   console.log(data)
          set_edit_reviews_(true)
          handleOpen()
          set_edit_id_data_(data)
      }
    useEffect(() => {
        _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
    }, [])
    useEffect(()=>{
        _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
    },[_SONG_ID_])
    const ReviewsValidation = Yup.object().shape({
        reviews: Yup.string()
            .min(4, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Type something'),
        });
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.patch(BACKEND_URL_REVIEWS_ADD+event.target.id.value+"/",{
            reviews:event.target.reviews.value
        },{headers:{
            'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
        }}).then((resp)=>{
            // console.log(resp.data)
            notifyedited("Reviews Edited")
        }).catch((err)=>{
            console.log(err.response.data["message"])
            notifyedited(err.response.data["message"])
        }).finally(()=>{
            _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
        })
    }

  return (
      <>
      <h4>Reviews </h4>
      {(_token_from_redux_store_!=null)?
        <Formik
            initialValues={{
                reviews:'',
                song_data:_SONG_ID_,
                category:"tmp",
            }}
            validationSchema={ReviewsValidation}
            onSubmit={(values, actions) => {
                // console.log(values)
                set_posting_(true)
                axios.post(BACKEND_URL_REVIEWS_ADD, {
                    reviews:values.reviews,
                    song_data:_SONG_ID_,
                    category:values.category,
                    first_name:decoded.first,
                    user_id:decoded.user_id,
                    // first_name:2,
                },{
                    headers:{
                        'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
                    }
                }).then((response) => {
                    // console.log(response)
                })
                .catch((err) => {
                    // console.log(err)
                }).finally(()=>{
                    _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
                    set_posting_(false)

                })
            }}
        >
            {({ values, errors,status, touched }) => (
                <Form >
                    <Field name="reviews" type="text" placeholder="Reviews .... " className="form-control" /><br></br>

                    {errors.reviews && touched.reviews ?
                        <Alert variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{errors.reviews}</Alert>
                        :
                        null
                    }
                    {(_posting_)?
                        <CircularProgress />
                    :
                        <button type='submit' className='btn btn-secondary'>
                            <FontAwesomeIcon size='1x' icon={faPaperPlane}></FontAwesomeIcon>
                        </button>
                    }

                </Form>
            )}
        </Formik>
        :
            <p>Log in to review</p>
        }
        {_songs_reviews_.map((reviews_by_user,index)=>{
            // console.log(reviews_by_user.id)
            return (
                    <div key={index}>
                        <hr style={{boxShadow: "20px 20px 50px 10px pink"}}></hr>
                        <FontAwesomeIcon size='1x' icon={faUserAlt}></FontAwesomeIcon>
                            <span style={{marginLeft:"5px"}}>
                                {reviews_by_user["first_name"]}
                            </span>
                            {(reviews_by_user["first_name"]==decoded.first)
                                ?
                                <>
                                    <p key={reviews_by_user.id}>
                                        {reviews_by_user.reviews}
                                    <button
                                        className='btn btn-danger m-1 float-right'
                                        value={reviews_by_user.id}
                                        onClick={(e)=>{
                                            _delete_comment_(e.target.value)
                                        }
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className='btn btn-warning m-1 float-right'
                                        value={reviews_by_user.id}
                                        onClick={(e)=>{
                                            _edit_comment_(e.target.value)
                                        }
                                        }
                                    >
                                        Edit
                                    </button>
                                    </p>

                                </>

                                :
                                <>
                                    <p key={reviews_by_user.id}>{reviews_by_user.reviews}</p>
                                </>
                            }
                        <hr style={{boxShadow: "20px 20px 50px 10px pink"}}></hr>
                        {(_edit_reviews_)?
                            <>
                            <div>
                                <Modal
                                    style={{opacity:"0.9"}}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <button
                                            className='btn float-right'
                                            onClick={()=>{
                                                handleClose()
                                            }}
                                        >
                                            <FontAwesomeIcon size='1x' icon={faClose}></FontAwesomeIcon>
                                        </button><br></br>
                                        <center>
                                            <b><label>Edit Review</label></b>
                                        <form onSubmit={handleSubmit}>

                                        <input className='form-control' type="hidden" name="id" value={(_edit_id_data_)?_edit_id_data_:null} />
                                        <input
                                         className='form-control mb-2'
                                          type="text"
                                          name="reviews"
                                        //   value={(editedreview)?editedreview:""}
                                        //   onChange={(e) => seteditedreview(e.target.value)}
                                         />
                                            <Button
                                                type='submit'
                                                variant="contained"
                                            >
                                                Edit
                                            </Button>
                                        </form>
                                        </center>

                                    </Box>
                                </Modal>
                                </div>
                            </>
                        :
                            null
                        }
                    </div>
                )
        })
        }
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastStyle={{ backgroundColor: "#d1ffcf" }}
        />
      </>
  )
};

export default ReviewsByUser;
