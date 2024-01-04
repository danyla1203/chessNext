'use client'

import * as React from 'react';
import { AnonymousMenu } from './menu/AnonymousMenu';
import { AuthorizedMenu } from './menu/AuthorizedMenu';
import { UserContext } from '@/app/lib/context/UserContext';

export function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = React.useContext(UserContext);
  const click = (event: any) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const close = () => setAnchorEl(null);

  return (
    <div className="navbar__user">
      {user ? (
        <AuthorizedMenu
          handleClick={click}
          handleClose={close}
          anchor={anchorEl}
          setAnchor={setAnchorEl}
        />
      ) : (
        <AnonymousMenu
          handleClick={click}
          handleClose={close}
          anchor={anchorEl}
          setAnchor={setAnchorEl}
        />
      )}
    </div>
  );
}
