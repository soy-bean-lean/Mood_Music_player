import React , {useEffect , useState} from 'react';
import { useParams } from 'react-router-dom'
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { useNavigate } from "react-router-dom";
import './payments.css'
import { MAIN_FRONT_URL,BACK_END_REFRESH_TOKEN_AFTER_VERIFICATION ,PORT, MAIN_URL } from '../../config/urls';
import {useLocation} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ref } from 'yup';
import Button from '@mui/material/Button';

const VerfiyPayments = ( {AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    const [_checking_data_, set_checking_data_] = useState(true)
    const [response_data, setresponse_data] = useState(null)
    const [_status_, set_status_] = useState(false)
    let  {subcription} = useParams()
    const search = useLocation().search;
    const subcription_data = new URLSearchParams(search).get('subcription');
    const oid = new URLSearchParams(search).get('oid');
    const amt = new URLSearchParams(search).get('amt');
    const refId = new URLSearchParams(search).get('refId');
    // let _token_from_redux_store_ = useSelector((state) => state.CountJwtRefreshAccessToken.JwtAccessToken)
    // const dispatch = useDispatch()

    function _payment_function(){
        let url_data = MAIN_URL+"/payments_check/Verify-Transaction/api/"+subcription_data+"/?subcription="+subcription_data+"&oid="+oid+"&amt="+amt+"&refId="+refId
        axios.get(url_data,{
            headers:{
                'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
            }}).then((res)=>{
            // console.log(res)
            set_checking_data_(false)
            setresponse_data("Thanks for the subscription")
            window.location.replace("http://"+window.location.hostname+PORT+"/music?subcription=true");


            // location.replace(window.location.hostname+PORT+"/music")

        }).catch((err)=>{
            // console.log(err.response)
            set_checking_data_(false)
        })
    }

    // function _new_access_refresh(){
    //     // BACK_END_REFRESH_TOKEN_AFTER_VERIFICATION
    //     axios.get(BACK_END_REFRESH_TOKEN_AFTER_VERIFICATION,{ headers: {'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`},withCredentials: true})
    //     .then((respose) => {
    //     //   console.log(respose.data)
    //     // location.replace(window.location.href)
    //     })
    //     .catch((error) => {
    //         // console.log(error)
    //     })    }
    useEffect(() => {
        // MAIN_URL
        _payment_function()
  }, [])
//   useEffect(() => {
//     _new_access_refresh()
// }, [response_data])

    const _div_input_ = {
        display:"inline-block",
    }
  return (
    <>

     <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName={subcription+" Subcription with E-Sewa"}  URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                <div className="_div_input_">
                </div>

            {(_checking_data_)?
                <>
                <center>
                    <h1>Checking Payment Verfification ....</h1>
                    <CircularProgress/>
                </center>
                </>
                :
               (response_data)?
               <>
                    <div style={{width:"50%",margin:"auto"}}>
                        <center>
                            <br></br>
                        <h4 style={{color:"green",fontFamily:"cursive"}}>
                            {(response_data)?response_data:null}
                        </h4>
                        <br></br>

                        {(response_data)?
                                null
                            :
                            <>
                            <h3 style={{color:"green",fontFamily:"cursive"}}>
                                We Welcome to the Music Mood Player Now Your can have your Best Time
                            </h3>
                            <h2 style={{color:"red"}}>
                                Refresh Page Once<br></br>
                            </h2>
                            </>
                        }

                        <br></br><br></br><br></br><br></br>
                        {response_data?null:
                        <Button variant="contained"
                        onClick={()=>{
                            navigate('/music')
                        }}
                        >Go To Home
                        </Button>
                        }
                        </center>
                    </div>
                </>

               :
               <center>
                <p style={{color:"red",fontWeight:"bold",fontSize:"20px"}}>Something went wrong Try again</p>
                </center>
            }
            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default VerfiyPayments;
