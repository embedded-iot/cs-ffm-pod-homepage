import React, {useMemo} from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import './style.scss';

export default function SelectButtonList(
  {
    buttonList = [],
    name = '',
    value,
    multiple = false,
    toggle = false,
    onChange = () => {},
    className = '',
    ...restProps
  }
) {
  const selectedValue = useMemo(() => value || (multiple ? [] : ''), [value, multiple]);
  const handleChange = (newValue, option) => {
    if (multiple) {
      if (toggle && selectedValue.includes(newValue)) {
        onChange(selectedValue.filter(item => item !== newValue), name, option)
      } else {
        onChange([...selectedValue, newValue], name, option)
      }
    } else {
      onChange(toggle && selectedValue === newValue ? '' : newValue, name, option);
    }
  }
  return (
    <div
      className={classNames("select-button-list__wrapper", className)}
      {...restProps}
    >
      {!!buttonList.length && buttonList.map((button, index) => (
        <Button
          key={index}
          className={classNames({
            "selected": (multiple && selectedValue.includes(button.value)) || (!multiple && selectedValue === button.value)
          })}
          onClick={() => handleChange(button.value, button)}
        >
          { button.label }
        </Button>
      ))}
    </div>
  );
}
