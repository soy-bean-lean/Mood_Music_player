import React , { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SideDivForAllComponents } from '../../../style/SideDivForAllComponents';
import TopBar from "../../TopBar";

const SingelSongs = ({AUTHORIZATION_TOKEN}) => {
  let  {name} = useParams()
  console.log(name)
  const [songslist, setsongslist] = useState([])

  return (
    <>
        <SideDivForAllComponents>
    <div className="_side_component_">
        <TopBar TopBarName="List of Songs" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />

        <div className="inner_div">
            <div style={{width:"70%",margin:"auto",backgroundColor:'#fff5f5'}}>
                    single song
            </div>
        </div>

    </div>
</SideDivForAllComponents>
    </>
  )
}

export default SingelSongs