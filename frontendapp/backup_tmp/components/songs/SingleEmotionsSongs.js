import React from 'react';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBackward } from "@fortawesome/free-solid-svg-icons";

const SingleEmotionsSongs = () => {
    let navigate = useNavigate();

    const { emotions } = useParams();
    console.log(emotions)

  return (
    <>
     <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName={<a
                                    style={{color:"green"}}
                                    onClick={() => navigate('/Songs')}
                                    >
                                        <FontAwesomeIcon size='1x' icon={faBackward}></FontAwesomeIcon>
                                    </a>} URL_TO_GO=""
                                />
                <p>Songs emotions category at top </p>
                {emotions}
            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default SingleEmotionsSongs;

