import { Button, Menu, MenuItem } from '@mui/material';
import { useUserState } from '@/app/lib/context/UserContext';
import Link from 'next/link';

export function AuthorizedMenu({
  anchor,
  setAnchor,
  handleClick,
  handleClose,
}: any) {
  const { profile } = useUserState();

  if (!profile) throw Error('No profile in User context');

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
        {profile.name}
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
