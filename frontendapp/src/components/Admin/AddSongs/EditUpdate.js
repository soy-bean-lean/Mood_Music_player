import React , { useEffect , useState} from 'react';
import { useParams } from 'react-router-dom'
import { SideDivForAllComponents } from '../../../style/SideDivForAllComponents';
import TopBar from '../../TopBar';
import { useNavigate } from "react-router-dom";
import { BACKENDURL_SERVER_SONGS_FOR_ADMIN , GET_PROFILE_PICTURE} from '../../../config/urls';
import axios from 'axios';
import UpdateEdit from './UpdateEdit';
import Select_Update from "./Select_Update";
import UpdateCoverPhoto from './UpdateCoverPhoto'
import UpdateSong from './UpdateSong'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";


const EditUpdate = ({AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    let  {name} = useParams()
    const [loading, setloading] = useState(false)
    const [selection, setselection] = useState(null)
    const [single_data, setdata] = useState([])

    // console.log(name)


    const _get_data = async (url) => {

      await axios.get(url,{headers:{
        'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
    }}).then((resp)=>{
          // console.log(resp.data)
          setdata(resp.data)
          setloading(true)
      }).catch((err)=>{
          console.log(err.response)
      })
    }
    useEffect(() => {
      _get_data(BACKENDURL_SERVER_SONGS_FOR_ADMIN+name+"/")
    }, [])


  return (
    <>
    <SideDivForAllComponents>
           <div className="_side_component_">
               <TopBar TopBarName={"Edit/Update "+name} URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
               <div className="_div_button_">
                 <button
                 className='btn btn-danger'
                  onClick={()=>{
                    navigate('/ListSongs')
                  }}
                 >
                   <FontAwesomeIcon size='1x' icon={faCircleArrowLeft}></FontAwesomeIcon>
                 </button>
                 {(loading)
                 ?
                  <div style={{padding:"20px"}}>
                    {/* <p>{single_data["uuid"]}</p>
                     <p>{single_data["artist_name"]}</p> */}
                    <UpdateEdit
                      AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                      name_of_type="song_name"
                      data_send_from_url={single_data["id"]}
                      datatypeprops="text"
                      value_props={single_data["song_name"]}
                      uuid_of_song={single_data["uuid"]}
                      label_name="Song name"
                    />
                  <UpdateEdit
                      AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                      name_of_type="artist_name"
                      datatypeprops="text"
                      data_send_from_url={single_data["id"]}
                      value_props={single_data["artist_name"]}
                      uuid_of_song={single_data["uuid"]}
                      label_name="Artist name"
                    />

                    <br></br>
                    <Select_Update
                      value_data={single_data["category"]}
                      AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                      data_send_from_url={single_data["id"]}
                    />
                  <br></br>
                  <UpdateEdit
                      AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                      name_of_type="song_irsc"
                      datatypeprops="text"
                      data_send_from_url={single_data["id"]}
                      value_props={single_data["song_irsc"]}
                      uuid_of_song={single_data["uuid"]}
                      label_name="Song Irsc"
                    />
                  <label style={{color:"red",fontFamily:"monospace",fontWeigth:"bold"}}>Must be eg. JDI-99KK </label><br></br>
                     {/* <p>{single_data["cover_photo"]}</p>
                     <p>{single_data["song_file"]}</p> */}
                     <UpdateCoverPhoto
                        AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                        data_send_from_url={single_data["id"]}
                        value_props={single_data["cover_photo"]}

                     />
                    <UpdateSong
                        AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                        data_send_from_url={single_data["id"]}
                        value_props={single_data["song_file"]}

                     />
                  </div>
                  :
                  <>
                    <center>
                        <p>
                          Loading .....
                        </p>
                        <img style={{width:"250px",height:"250px",borderRadius:"30px"}} src={GET_PROFILE_PICTURE+"/loading_sigle_data.gif"} alt="loading..." />
                    </center>
                  </>
                }
               </div>
           </div>
       </SideDivForAllComponents>
   </>
  )
};

export default EditUpdate;

