import React from "react"
import { Select, MenuItem, InputLabel } from "@mui/material"

function SelectInput({
  label,
  value,
  selectStyle,
  menuList,
  onChangeFunction,
}) {
  return (
    <>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={e => onChangeFunction(e)}
        label="Filter Data by"
        className={selectStyle}
      >
        {menuList.map((item, i) => (
          <MenuItem value={i + 1} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default SelectInput
