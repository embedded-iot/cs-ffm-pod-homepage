import React from 'react';
import Image from "next/image";


export default function Icon({ src, className, activeSrc, active = false, alt, width, height, style, ...rest }) {
  return (
    <Image className={className} src={active ? activeSrc : src} alt={alt || 'icon'} width={width} height={height} style={style} {...rest} />
  );
}
