import React , { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Goto = ({AUTHORIZATION_TOKEN}) => {
  let navigate = useNavigate();
// console.log((AUTHORIZATION_TOKEN))
    let  {page} = useParams()
    // console.log("page : "+page)

    useEffect(() => {
      if(AUTHORIZATION_TOKEN){
      navigate('/'+page)}else{
        navigate('/login')
      }
    }, [])

  return (
    <>
    <p>Loading. ...</p>
    </>
  )
}

export default Goto