import React from 'react'
import { Select, MenuItem, InputLabel } from '@mui/material';

function SelectInput(props) {
    return (
        <>
            <InputLabel id="demo-simple-select-standard-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props.value}
                onChange={(e)=>props.onChangeFunction(e)}
                label="Filter Data by"
                className={props.selectStyle}
            >
                {props.menuList.map((item, i)=>(
                    <MenuItem value={i+1} key={i}>{item}</MenuItem>
                ))}
            </Select>
        </>
    )
}

export default SelectInput
