import React , {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { useNavigate } from "react-router-dom";
import './payments.css'
import { MAIN_FRONT_URL,ON_PAYMENT_SUCCESS ,ON_PAYMENT_FAIL, MAIN_URL } from '../../config/urls';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";

const Subcription = ( {AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    let  {subcription} = useParams()

    useEffect(() => {
      if(subcription ==="monthly"  || subcription ==="yearly"){
        console.log(subcription)
      }else{
        navigate("/")
      }
  }, [])

    const _div_input_ = {
        display:"inline-block",
    }
  return (
    <>

     <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName={subcription+" Subcription with E-Sewa"}  URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                <button
                className='btn btn-danger'
                style={{borderRadius:"50px"}}
                onClick={() => navigate('/payment')}
               >
                <FontAwesomeIcon
                    size='1x'
                    icon={faStepBackward}
                >
                </FontAwesomeIcon>
               </button>
                <div className="_div_input_">
                </div>
                <div style={{width:"50%",margin:"auto",marginTop:"20px"}}>
                <form action="https://uat.esewa.com.np/epay/main" method="POST">

                    <div className="form-group">
                      <label htmlFor="exampleInputtxtamt">Total amount</label>
                      <input value={(subcription==="monthly")?50:1200} className="form-control" id="exampleInputttAmt" aria-describedby="ttAmtHelp" name="totalAmount" type="text" disabled/>
                      <input value={(subcription==="monthly")?50:1200} className="form-control" id="exampleInputtAmt" aria-describedby="tAmtHelp" name="tAmt" type="hidden" />
                    </div>


                    <div className="form-group">
                      <label htmlFor="exampleInputamt">Amount</label>
                      <input value={(subcription==="monthly")?50:1200} className="form-control" id="exampleInpuAmt" aria-describedby="mtHelp" name="Amount" type="text" disabled/>
                      <input value={(subcription==="monthly")?50:1200} className="form-control" id="exampleInpuAmt" aria-describedby="tAmtHelp" name="amt" type="hidden" />
                    </div>

                    <input value="0" name="txAmt" type="hidden"/>
                    <input value="0" name="psc" type="hidden"/>
                    <input value="0" name="pdc" type="hidden"/>
                    <input value="EPAYTEST" name="scd" type="hidden"/>
                    <input value={Math.random()} name="pid" type="hidden"/>

                    <input value={MAIN_FRONT_URL+"/payments_data/Verify-Transaction/"+subcription+"?subcription="+subcription} type="hidden" name="su"/>
                    <input value={MAIN_FRONT_URL + "/payment/subcription/" + subcription} type="hidden" name="fu"/>
                    <input className='btn btn-success' value="Pay Using E-Sewa" type="submit"/>
                  </form>
                  </div>

            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default Subcription;
