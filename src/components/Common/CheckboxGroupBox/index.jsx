import React from "react";
import { Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;
import "./style.scss";

export default function CheckboxGroupBox({
  name,
  options = [],
  value,
  onChange,
  placeholder,
  ...restProps
}) {
  const handlerOnchange = (values) => onChange(values, name);
  return (
    <CheckboxGroup
      options={options}
      {...restProps}
      value={value}
      onChange={handlerOnchange}
      className={"checkbox-group-box__wrapper"}
    />
  );
}
