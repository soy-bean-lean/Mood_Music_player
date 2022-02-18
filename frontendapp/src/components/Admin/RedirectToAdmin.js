import React, { useState, useRef, useEffect } from 'react';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from "../TopBar";
import './AddSongs/style.css'
import { useNavigate } from "react-router-dom";

const RedirectToAdmin = ({ AUTHORIZATION_TOKEN }) => {
    let navigate = useNavigate();

    const image_size_button = {
        height: "50px",
        width: "50px",
    }
    useEffect(() => {
        navigate("/Dashboard")
    }, [])

    return (
        <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName="AddSongs" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />

                <div className="inner_div">
                    <div>
                        ....Wait Wait......
                    </div>
                </div>

            </div>
        </SideDivForAllComponents>
    )
}

export default RedirectToAdmin