import React, { useEffect, useRef } from 'react';
import "./style.scss";
import Icon from "../Icon";

export default function ImageView({ img, className,...restProps }) {
  const ref = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const zoomer = e.currentTarget;
      let offsetX, offsetY;
      e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
      e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX;
      let x = offsetX/zoomer.offsetWidth*100
      let y = offsetY/zoomer.offsetHeight*100
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
    };
    const element = ref.current;
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, [])
  return (
    <figure
      {...restProps}
      className={'zoom ' + className}
      ref={ref}
      style={{backgroundImage: `url(${img})`, backgroundSize: ""}}
    >
      <Icon src={img} width={400} height={400}/>
    </figure>
  );
}
