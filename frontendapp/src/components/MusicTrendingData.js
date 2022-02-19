import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {BACKENDURL_FOR_TRENDING} from '../config/urls'
import { Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const MusicTrendingData = ({category,_table_color_,color_from_props,_text_color_,AUTHORIZATION_TOKEN}) => {
    const [_data_, setdata] = useState([])
    const [load, setload] = useState(false)

    function _data_from_server_ (){

        axios.get(BACKENDURL_FOR_TRENDING+category+"/",{
            headers:{
                'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
            }
        }).then((resp)=>{
            setdata(resp.data)
            // console.log(resp.data)
            setload(true)
        }).catch((err)=>{
            // setdata(err.response.data)
            // console.log(err.response.data)
            setload(true)
        })
      }


    useEffect(() => {
        _data_from_server_()
    }, [])
    // useEffect(() => {
    //     // return () => {
    //     //     setdata([])
    //     // };
    // }, [_data_])

    const _font_for_text_ = {
        fontFamily:"Comic Sans MS, Comic Sans, cursive",
        fontWeight:"bold"
    }
    const  _text_= {
        fontWeight:"bold",
        fontFamily:"URW Chancery L, cursive"
    }
    const _text_2_ = {
        fontSize:"25px",
        fontWeight:"bold",
        fontFamily:"Brush Script MT, Brush Script Std, cursive"
    }
const _play_ = {
    border: "none",
    padding: "5px",
    margin: "10px",
    transition: "0.2s",
    borderRadius:"20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
}
  return (
    <>
        {(load)?
        <>
           {_data_.map((_songs_,index) =>{
                return (
                    <tr className={_table_color_} style={{backgroundColor:color_from_props,color:_text_color_}} key={index}>
                    <td scope="row" style={_font_for_text_}>
                    {_songs_["category"]}
                    </td>
                    <td style={_text_}>
                        {/* /Songs/playsongs/ */}
                        {(_songs_["song_name"]=="...")?
                        <>
                            <p style={{fontSize:"13px"}}>Not yet Reviewd</p>
                        </>:
                            <>
                            <Link to={"/Songs/playsongs/"+_songs_["song_name"]}>
                                {_songs_["song_name"]}
                            </Link>
                        </>
                        }
                    </td>
                    <td style={_text_2_}>
                        {_songs_["artist_name"]}
                    </td>
                </tr>
                )
           })
           }
        </>
        :
        <tr className={_table_color_} style={{backgroundColor:color_from_props,color:_text_color_}}>
            <td scope="row" style={_font_for_text_}>
                <CircularProgress />
            </td>
            <td style={_text_}>
                <CircularProgress />
            </td>
            <td style={_text_2_}>
                <CircularProgress />
            </td>
        </tr>
        }
    </>
  )
};

export default MusicTrendingData;
