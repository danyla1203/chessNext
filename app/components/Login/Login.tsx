'use client'

import { useState } from 'react';
import { userLogin } from '@/request/login';

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const login = async () => {
    const data = {
      email,
      password
    }
    await userLogin(data);
  }

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Email
        </label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
           Signup
        </button>
      </div>
    </form>
  )
}