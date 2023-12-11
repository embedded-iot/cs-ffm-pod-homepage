import React from 'react';
import UserInfo from 'components/Share/UserInfo';

import './style.scss';
export default function Header({ notificationsCount, isLogin, isAdmin, isProducer, currentUser, selectedRouters, redirectTo, goBack,  signOut }) {
  return (
    <div className="header__wrapper">
      <UserInfo isLogin={isLogin}
                isAdmin={isAdmin}
                isProducer={isProducer}
                currentUser={currentUser}
                redirectTo={redirectTo}
                selectedRouters={selectedRouters}
                goBack={goBack}
                signOut={signOut}
                notificationsCount={notificationsCount}
      />
    </div>
  );
}
