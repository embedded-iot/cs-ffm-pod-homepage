import React from 'react';
import SelectButtonList from 'components/Common/SelectButtonList';
import classNames from "classnames";
import './style.scss';

export default function OptionsButtonsFilter(
  {
    buttonList,
    value,
    name,
    onChange,
    className,
    multiple,
    toggle,
    ...restProps
  }
) {
  return (
    <SelectButtonList
      className={classNames(
        "options-buttons-filter__wrapper",
      )}
      buttonList={buttonList}
      value={value}
      name={name}
      multiple={multiple}
      toggle={toggle}
      onChange={onChange}
      {...restProps}
    />
  )
}
