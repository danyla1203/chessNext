import { Profile } from './Profile';
import './Navbar.scss';
import Link from 'next/link';
import { UserProvider } from '@/app/lib/context/UserContext';

export function Navbar() {
  return (
    <div className="navbar">
      <ul className="navbar__navigation">
        <li className="navbar__navigation-item">👾</li>
        <li className="navbar__navigation-item">
          <Link href="/">Home</Link>
        </li>
      </ul>
      <UserProvider>
        <Profile />
      </UserProvider>
    </div>
  );
}
