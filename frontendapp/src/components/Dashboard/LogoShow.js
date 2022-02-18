import React from 'react'

const LogoShow = ({file,size}) => {
    // console.log(file)
    // console.log(size)
    const image_size = {
        height:"100px",
        width:"100px",
        borderRadius:"50%"
    }
    const [logo_show,setPreview] = React.useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    }
    return (
        <>
        {/* // <div> */}
        {(size)?
            <img src={logo_show} alt="_logo_" style={{ borderRadius:"50px",width:"100px",height:"100px"}}/>
        :
        (logo_show)?<img src={logo_show} alt="_logo_" style={{
                                                            borderRadius:"50px",width:"200px",height:"200px"
                                                        }}
            />
            :"Loading ... "
        }
        </>
    )
}

export default LogoShow
