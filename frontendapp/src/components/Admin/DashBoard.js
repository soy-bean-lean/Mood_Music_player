import React, { useState, useRef , useEffect } from 'react';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from "../TopBar";
import { TopShadowBar } from '../../style/TopShadowBar';
import { PieChart } from 'react-minimal-pie-chart';
import {GET_SET_SUBCRIPTION_DATA_READONLY_, ANALYTIC_URL_FOR_PIE_CHART ,MAIN_FRONT_URL,MAIN_URL ,GET_SET_SUBCRIPTION_DATA } from '../../config/urls';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import {defaultLabelStyle, shiftSize,happy ,sad ,neutral ,fear, diguest ,surprise, angry} from './color_pie_data'
import { UserDetails } from '../../style/UserDetails';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeadphonesAlt,faChevronRight,faChevronLeft, faL } from "@fortawesome/free-solid-svg-icons";

const DashBoard = ({AUTHORIZATION_TOKEN}) => {
    useEffect(() => {
        document.title = "Admin DashBoard | Music Mood Player";
      }, [])
    let navigate = useNavigate();
    const [data, setdata] = useState(null)
    const [subcriptiondata, setsubcriptiondata] = useState(null)
    const [next, setnext] = useState(null)
    const [prev, setprev] = useState(null)

function get_analytics_report(){
    axios.get(ANALYTIC_URL_FOR_PIE_CHART,{ headers: {'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`}})
    .then((respose) => {
        setdata(respose.data)
    })
    .catch((error) => {
        // console.log(error.respose)
        setdata(null)
    })
}
function set_get_subcription(URL_LINK){
    axios.get(URL_LINK,{ headers: {'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`}})
    .then((respose) => {
        setnext(respose.data.next)
        setprev(respose.data.previous)
        setsubcriptiondata(respose.data.results)
        console.log((respose.data.results).length)
    })
    .catch((error) => {
        setsubcriptiondata(null)
    })
}
function _cancle_subs_(_URL_CANCLE_){
    axios.patch(_URL_CANCLE_,{
        "payment_options": "None",
        "order_id": "None"
    },{ headers: {'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`}})
    .then((respose) => {
        set_get_subcription(GET_SET_SUBCRIPTION_DATA)
    })
    .catch((error) => {
        set_get_subcription(GET_SET_SUBCRIPTION_DATA)
    })
}
function _ban_acc_backend_(_URL_CANCLE_){
    axios.patch(_URL_CANCLE_,{
        "is_active": false,
    },{ headers: {'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`}})
    .then((respose) => {
        set_get_subcription(GET_SET_SUBCRIPTION_DATA)
    })
    .catch((error) => {
        set_get_subcription(GET_SET_SUBCRIPTION_DATA)
    })
}
function _active_acc_backend_(_URL_CANCLE_){
    axios.patch(_URL_CANCLE_,{
        "is_active": true,
    },{ headers: {'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`}})
    .then((respose) => {
        set_get_subcription(GET_SET_SUBCRIPTION_DATA)
    })
    .catch((error) => {
        set_get_subcription(GET_SET_SUBCRIPTION_DATA)
    })
}
    useEffect(() => {
        get_analytics_report()
        set_get_subcription(GET_SET_SUBCRIPTION_DATA_READONLY_)
    }, [])

const _cancle_subscription= (value_id) =>{
    _cancle_subs_(GET_SET_SUBCRIPTION_DATA+value_id+"/")
}
const _ban_acc= (value_id) =>{
    _ban_acc_backend_(GET_SET_SUBCRIPTION_DATA+value_id+"/")
}

const _active_acc= (value_id) =>{
    _active_acc_backend_(GET_SET_SUBCRIPTION_DATA+value_id+"/")
}
const _next_page = () =>{
    set_get_subcription(next)
}
const _pre_page = () =>{
    set_get_subcription(prev)
}
const _search_parameter = (data_search) =>{
    // console.log(data_search)
    set_get_subcription(GET_SET_SUBCRIPTION_DATA_READONLY_+"?search="+data_search)
}


  return (
        <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="DashBoard" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>

                <div className='div_photo_and_trending'>
                    <div className="_mobile_view" style={{width:"65%"}}>
                            <TopShadowBar >
                                <div className='top_bar_with_shadow_class' style={{backgroundColor:'#9099fb'}}>
                                    <p style={{padding:"5px",fontWeight:"bold"}}>Users Control Panel</p>
                                </div>
                                {(subcriptiondata)?
                                    <UserDetails>

                                            <center><TextField
                                                    style={{width:"85%",margin:"10px"}}
                                                    id="outlined-basic"
                                                    label="Search"
                                                    variant="outlined"
                                                    onChange={(e)=>{
                                                        // console.log(e.target.value)
                                                        _search_parameter(e.target.value)
                                                    }}
                                                />
                                            </center>
                                            <div className="_div_down_bar_user_list">
                                            {(subcriptiondata.map((item,index)=>{
                                                return (
                                                    <div key={index} style={{margin:"2px",backgroundColor:"rgb(212 234 237)",padding:"10px",borderRadius:"30px"}}>
                                                        <img
                                                            src={item.profile_pic}
                                                            style={{borderRadius:"50px",height:"50px",width:"50px",marginLeft:"5px"}}
                                                        />
                                                        <span style={{marginLeft:"4px",fontWeight:"bold",fontSize:"15px",fontFamily:"monospace"}}>({item.email})</span>
                                                        <span style={{marginLeft:"4px",fontWeight:"bold",fontSize:"12px",fontFamily:"monospace"}}>{
                                                                (item.order_id=="None")?
                                                                    <label>Not Subscribed</label>
                                                                    :
                                                                    (item.payment_options=="monthly")?
                                                                    <>
                                                                    <label style={{color:"rgb(157 34 34)",fontFamily:"cursive",fontWeight:"bold"}}>(Remaning days :
                                                                        {parseInt(30-(Date.now()-Date.parse(item.date_of_subcription))/86400000)
                                                                        +" ) "+item.payment_options}
                                                                    </label>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <label style={{color:"rgb(157 34 34)",fontFamily:"cursive",fontWeight:"bold"}}>(Remaning days :
                                                                        {parseInt(365-(Date.now()-Date.parse(item.date_of_subcription))/86400000)
                                                                        +" ) "+item.payment_options}
                                                                        </label>
                                                                    </>
                                                        }
                                                        </span>
                                                        <button
                                                            className='btn '
                                                            style={{backgroundColor:"#9154c3",color:"white",margin:"2px",borderRadius:"10px",float:'right',fontSize:"15px"}}
                                                            value={item.id}
                                                            onClick={(e)=>{
                                                                (item.is_active)?
                                                                    _ban_acc(e.target.value)
                                                                :
                                                                    _active_acc(e.target.value)
                                                            }}
                                                            >
                                                            {(item.is_active)?
                                                                <>Ban ACC</>
                                                                :
                                                                <>ACT ACC</>
                                                            }
                                                        </button>
                                                        {(item.order_id=="None")?
                                                        <button
                                                        disabled
                                                        >
                                                        </button>
                                                        :
                                                        <>
                                                        <button
                                                            className='btn btn-danger'
                                                            style={{margin:"2px",borderRadius:"10px",float:'right',fontSize:"15px"}}
                                                            value={item.id}
                                                            onClick={(e)=>{
                                                                _cancle_subscription(e.target.value)

                                                            }}
                                                            >
                                                            Cancle
                                                            </button>
                                                        </>
                                                    }
                                                    </div>
                                                )
                                            }))}
                                            <center>
                                            {(subcriptiondata.length<=0)
                                            ?
                                                <>
                                                    <h3>There was no Data </h3>
                                                    <img src="https://files.muzli.space/979769291858f4c896612f1850824d0a.webp"
                                                        style={{width:"200px",height:"200px",borderRadius:"30px"}}
                                                        alt="No Data"
                                                    />
                                                </>
                                                :
                                                <>
                                                    {(prev)?
                                                        <>
                                                            <button
                                                                onClick={()=>{
                                                                    _pre_page()
                                                                }}
                                                                    className='button_category'
                                                                    >
                                                                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button
                                                                className='button_category_disabled'
                                                                disabled
                                                                >
                                                                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                                                            </button>
                                                        </>}
                                                        {(next)
                                                        ?
                                                        <>
                                                            <button
                                                            onClick={()=>{
                                                                _next_page()
                                                            }}
                                                            className='button_category'
                                                            >
                                                            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button
                                                            className='button_category_disabled'
                                                            disabled
                                                            >
                                                            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                                                            </button>
                                                        </>
                                                        }
                                                </>
                                                }
                                            </center>
                                        </div>
                                    </UserDetails>

                                    :
                                <center>
                                    <br></br><br></br>
                                    <CircularProgress />
                                </center>
                                }
                            </TopShadowBar>
                        </div>
                        <div className="_mobile_view" style={{width:"30%"}}>
                            <TopShadowBar >
                                <div className='top_bar_with_shadow_class' style={{backgroundColor:'#67e0f2'}}>
                                    <p style={{padding:"5px",fontWeight:"bold"}}>Most Requested Songs ACC to Emotion</p>
                                </div>

                                {(data)?
                                <>
                                <PieChart
                                    style={{padding:"1px"}}
                                    radius={PieChart.defaultProps.radius - shiftSize}
                                    segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                                    label={({ dataEntry }) =>
                                         dataEntry.value
                                        }
                                    labelStyle={{
                                    ...defaultLabelStyle,
                                    }}
                                    data={data}
                                />
                                <span>
                                    <div style={happy}>
                                        <p style={{marginLeft:"25px"}}>Happy</p>
                                    </div>
                                    <div style={sad}>
                                        <p style={{marginLeft:"25px"}}>Sad</p>
                                    </div>
                                    <div style={neutral}>
                                        <p style={{marginLeft:"25px"}}>Neutral</p>
                                    </div>
                                    <div style={fear}>
                                        <p style={{marginLeft:"25px"}}>Fear</p>
                                    </div>
                                    <div style={diguest}>
                                        <p style={{marginLeft:"25px"}}>Diguest</p>
                                    </div>
                                    <div style={surprise}>
                                        <p style={{marginLeft:"25px"}}>Surprise</p>
                                    </div>
                                    <div style={angry}>
                                        <p style={{marginLeft:"25px"}}>Angry</p>
                                    </div>
                                </span>
                                </>
                                :
                                <center>
                                    <br></br><br></br>
                                    <CircularProgress />
                                </center>
                            }
                            </TopShadowBar>
                        </div>
            </div>
        </div>
    </SideDivForAllComponents>
  )
}

export default DashBoard