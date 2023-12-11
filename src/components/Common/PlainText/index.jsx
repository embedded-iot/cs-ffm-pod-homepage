import React from 'react';

import './style.scss';

export default function PlainText({ type, className, children }) {
  return (
    <div className={`plain-text__wrapper ${type} ${className}`}>
      { children }
    </div>
  )
}
