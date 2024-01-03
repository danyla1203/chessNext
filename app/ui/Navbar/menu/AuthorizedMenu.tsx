import * as React from 'react';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import { UserContext } from '@/app/lib/context/UserContext';

export function AuthorizedMenu({
  anchor,
  setAnchor,
  handleClick,
  handleClose,
}: any) {
  const user = React.useContext(UserContext);

  const logout = () => {
    setAnchor(null);
  };
  return (
    <>
      <Button
        aria-owns={anchor ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        {user?.name}
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        id="navbar__user__dropdown"
      >
        <MenuItem onClick={handleClose}>
          <Link href="/user">Profile</Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
