import React from 'react'
import Select from 'react-select';

function Select_options({onChange,options_value,value}) {
    // console.log("initial value : "+value)
    // console.log(options_value)
    // console.log(onChange)
    // console.log(options_value)
    // console.log(value)
    const defaultValue = (options_value,_user_choice_value_) => {
        // console.log("value in defaultValue : "+_user_choice_value_)
        // const options_value_choice_made = options_value ? options_value.find(opt=>opt.value === _user_choice_value_):""
        // console.log(options_value_choice_made)
        return options_value ? options_value.find(opt=>opt.value === _user_choice_value_):""
    }
    return (
        <div style={{width:"60%"}}>
            {/* <p>test</p> */}
            <Select
                value={defaultValue(options_value,value)}
                onChange={ value=> onChange(value)}
                options={options_value}
            />
        </div>
    )
}

export default Select_options
