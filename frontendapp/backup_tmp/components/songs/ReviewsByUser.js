import React ,  { useEffect,useState } from 'react';
import { BACKEND_URL_REVIEWS_SHOW } from '../../config/urls';
import axios from 'axios';

import { useSelector, useDispatch } from "react-redux"
import { _show_reviews_ } from '../../features/Reviews'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserAlt,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';

import { BACKEND_URL_REVIEWS_ADD } from '../../config/urls';
import CircularProgress from '@mui/material/CircularProgress';

const ReviewsByUser = ({_SONG_NAME_}) => {
    console.log("========================")
    console.log("Name : "+_SONG_NAME_)
    console.log("========================")
    const [_reviews_data_, set_reviews_data_] = useState(null)
    const [_posting_, set_posting_] = useState(false)
    const dispatch = useDispatch()
    const _songs_reviews_ = useSelector((state) => state._REVIEWS_._songs_reviews)
    // console.log(_songs_reviews_)

    const _data_from_server_ = async (url) => {

        await axios.get(BACKEND_URL_REVIEWS_SHOW+_SONG_NAME_+"/").then((resp)=>{
            // console.log(resp.data)
            dispatch(_show_reviews_(resp.data))
        }).catch((err)=>{
            console.log(err)
        })
      }

    useEffect(() => {
        _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
    }, [])
    useEffect(()=>{
        _data_from_server_(BACKEND_URL_REVIEWS_SHOW)
    },[_SONG_NAME_])
    const ReviewsValidation = Yup.object().shape({
        reviews: Yup.string()
            .min(4, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Type something'),
        });
  return (
      <>
      <h4>Reviews </h4>
      <Formik
        initialValues={{
            reviews:'',
            songs_name:_SONG_NAME_,
            category:"tmp",
        }}
        validationSchema={ReviewsValidation}
        onSubmit={(values, actions) => {
            // console.log(values)
            set_posting_(true)
            axios.post(BACKEND_URL_REVIEWS_ADD, {
                reviews:values.reviews,
                songs_name:_SONG_NAME_,
                category:values.category,
              }).then((response) => {
                console.log(response)
              })
              .catch((err) => {
                  console.log(err)
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
        {_songs_reviews_.map((reviews_by_user,index)=>{
            // console.log(reviews_by_user.id)
            return (
                    <div key={index}>
                        <hr style={{boxShadow: "20px 20px 50px 10px pink"}}></hr>
                        <FontAwesomeIcon size='1x' icon={faUserAlt}></FontAwesomeIcon>
                        <span style={{marginLeft:"5px"}}>User name</span>
                            <p key={reviews_by_user.id}>{reviews_by_user.reviews}</p>
                        <hr style={{boxShadow: "20px 20px 50px 10px pink"}}></hr>
                    </div>
                )
        })
        }
      </>
  )
};

export default ReviewsByUser;
