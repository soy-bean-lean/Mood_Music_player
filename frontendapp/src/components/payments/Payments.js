import React,{ useEffect,useState } from 'react';
import { SideDivForPayments } from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { useNavigate } from "react-router-dom";
import './payments.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";

const Payments = ( {AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    const [payment, setpayment] = useState("None");
    useEffect(() => {
      document.title = "Payment | Music Mood Player";
    }, [])

    useEffect(() => {
        var decoded = jwt_decode(AUTHORIZATION_TOKEN);
        setpayment(decoded.payment_options)
    }, [AUTHORIZATION_TOKEN])
    const _div_input_ = {
        display:"inline-block",
    }
  return (
    <>

     <SideDivForPayments>
            <div className="_side_component_">
                <TopBar TopBarName="Payment"  URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                <div className="_div_input_">
                </div>

                <div className="container">
                  <div >
                    <div style={{height:"65px",fontSize:"25px",padding:"10px",borderRadius:"5px",color:"white",backgroundColor:"#e95846",fontWeight:"bold"}}>
                      <center>Monthly</center>
                    </div>
                    <div style={{height:"40px",fontSize:"20px",padding:"5px",marginTop:"2px",color:"black",backgroundColor:"#82d5f4",fontWeight:"bold"}}>
                      <center>
                        <FontAwesomeIcon size='1x' color='green' style={{marginRight:"4px"}} icon={faCheck}></FontAwesomeIcon>
                        Unlimited Songs for 1 Months</center>
                    </div>
                    <div style={{height:"40px",fontSize:"15px",padding:"5px",marginTop:"2px",color:"black",backgroundColor:"#82d5f4",fontWeight:"bold"}}>
                      <center>
                      <sup>R.s</sup><span style={{fontSize:"20px",fontWeight:"bold"}}>50</span>/<span>monthly</span>
                      </center>
                    </div>
                    <div>
                        {(payment=="yearly" || payment == "monthly")?
                        <input
                        className='btn btn-primary'
                        style={{marginTop:"5px",fontWeight:"bold",padding:"10px",width:"100%"}}
                        type="button"
                        value={"Renew after "+payment}
                        disabled
                        />
                        :
                        <input
                        className='btn btn-primary'
                        style={{marginTop:"5px",fontWeight:"bold",padding:"10px",width:"100%"}}
                        type="button"
                        onClick={()=>{
                          navigate("subcription/monthly")
                        }}
                        value="Monthly pay"
                        />
                      }
                    </div>
                  </div>
                  <div>

                  <div style={{height:"65px",fontSize:"25px",padding:"10px",borderRadius:"5px",color:"white",backgroundColor:"#2db3cb",fontWeight:"bold"}}>
                      <center>Premium</center>
                    </div>
                    <div style={{height:"40px",fontSize:"20px",padding:"5px",marginTop:"2px",color:"black",backgroundColor:"#82d5f4",fontWeight:"bold"}}>
                    <center>
                        <FontAwesomeIcon size='1x' color='green' style={{marginRight:"4px"}} icon={faCheck}></FontAwesomeIcon>
                        Unlimited Songs for 1 Year</center>
                    </div>
                    <div style={{height:"40px",fontSize:"15px",padding:"5px",marginTop:"2px",color:"black",backgroundColor:"#82d5f4",fontWeight:"bold"}}>
                      <center>
                      <sup>R.s</sup><span style={{fontSize:"20px",fontWeight:"bold"}}>1200</span>/<span>Yearly</span>
                      </center>
                      <div>
                    </div>
                    </div>
                    <div>
                    {(payment=="yearly" || payment == "monthly")?
                        <input
                        className='btn btn-primary'
                        style={{marginTop:"5px",fontWeight:"bold",padding:"10px",width:"100%"}}
                        type="button"
                        value={"Renew after "+payment}
                        disabled
                      />
                    :
                      <input
                      className='btn btn-primary'
                      style={{marginTop:"5px",fontWeight:"bold",padding:"10px",width:"100%"}}
                      type="button"
                      onClick={()=>{
                        navigate("subcription/yearly")
                      }}
                      value="Yearly pay"
                      />
                    }
                    </div>
                  </div>
                </div>


            </div>
        </SideDivForPayments>
    </>
  )
};

export default Payments;
