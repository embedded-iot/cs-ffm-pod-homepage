import React from 'react';
import Icon from 'components/Common/Icon';
import fbTickIcon from 'public/images/fb_tick_icon.png';

import './style.scss';

export default function PostItem(props) {
  return (
    <div className='post-item__wrapper'>
      <div className='post-item__content'>{props.content}</div>
      <div className='post-item__user-info-wrapper'>
        <div className='post-item__avatar'>
          <Icon src={props.avatar} alt={props.name} />
        </div>
        <div className='post-item__user-info'>
          <div className='post-item__user-name'>
            {props.name}
            <Icon style={{marginLeft: 6}} src={fbTickIcon} width={16} height={16} />
          </div>
          <div className='post-item__user-work'>{props.work}</div>
        </div>
      </div>
    </div>
  )
}
