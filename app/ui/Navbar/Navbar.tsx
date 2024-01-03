
'use client'

import { Profile } from './Profile';
import './Navbar.scss';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/app/lib/context/UserContext';

export function Navbar() {
  const user = useContext(UserContext);
  return (
    <div className="navbar">
      <ul className="navbar__navigation">
        <li className="navbar__navigation-item">👾</li>
        <li className="navbar__navigation-item">
          <Link href="/">Home</Link>
        </li>
        {!user && (
          <li className="navbar__navigation-item">
            <Link href="/login">Authorization</Link>
          </li>
        )}
      </ul>
      <Profile />
    </div>
  );
}
