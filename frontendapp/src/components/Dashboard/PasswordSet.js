import React , {useState} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_POST_NEW_PASSWORD } from '../../config/urls';

    const PasswordSet = ({AUTHORIZATION_TOKEN}) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [disabled_or_enable, updatedisabled_or_enable] = useState(true);
    const [newpassword, setnewpassword] = useState("");
    const [currentpassword, setcurrentpassword] = useState("");


    const notify = () => {

        toast("Password updated")
    }
    const error_notify = (err_data) => {

        toast(err_data)
    }

    const onSubmit = (data) =>{
        data = {new_password:data.new_password,current_password:data.current_password,re_new_password:data.new_password}
        axios.post(BACKEND_POST_NEW_PASSWORD,data,{
            headers: {
            'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
            }}).then((resr) => {
                updatedisabled_or_enable(true)
                notify()
        }).catch(err => {
            if(err.response.data["new_password"]){
                error_notify(err.response.data["new_password"][0])}
                if(err.response.data["first"]){
                error_notify(err.response.data["first"][0])}
                if(err.response.data["current_password"]){
                error_notify(err.response.data["current_password"][0])}
                updatedisabled_or_enable(true)
        })
    };
    function current_pass(_password_set_){
        // console.log("current_pass : "+_password_set_)
        setcurrentpassword(_password_set_)
        updatedisabled_or_enable(false)
      }

      function new_pass(_password_set_){
        // console.log("new_pass : "+_password_set_)
        setnewpassword(_password_set_)
        updatedisabled_or_enable(false)
      }
  return (
    <>
        <div style={{marginTop:"10px"}}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                        {/* new_password */}
                        {/* re_new_password */}
                        <TextField
                            type="password"
                            name="new_password"
                            className="form-control float-left"
                            autoComplete="off"
                            id="newpassword"
                            value={newpassword?newpassword:""}
                            {...register("new_password", {
                            })}
                            label="New Password"
                            onChange={(e) => new_pass(e.target.value)}
                        />
                        {/* current_password */}
                        <br/><br/><br/>
                        <TextField
                            type="password"
                            name="current_password"
                            className="form-control float-left"
                            autoComplete="off"
                            id="currentsetpassword"
                            value={currentpassword?currentpassword:""}
                            {...register("current_password", {
                            })}
                            label="Current Password"
                            onChange={(e) => current_pass(e.target.value)}
                        />
                        <br></br><br></br><br></br>
                        <Button type="submit" style={{backgroundColor:"#dafb81fc",fontWeight:"bold"}} variant="outlined"  className="btn" disabled={disabled_or_enable}>Update password</Button>
            </form>

                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastStyle={{ backgroundColor: "#d1ffcf" }}
                />
        </div>
        </>
  )
}

export default PasswordSet