import React from 'react';
import { useNavigate } from "react-router-dom";


const ButtonCategoryLink = ({CategoryName}) => {
    let navigate = useNavigate();

  return (
        <>
            <button
                className="button_category"
                onClick={() => navigate('singleemitions/'+CategoryName)}
            >
                {CategoryName}
            </button>
        </>
  )
};

export default ButtonCategoryLink;
