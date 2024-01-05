'use client'

import { UserContext } from "@/app/lib/context/UserContext";
import { emailVerification } from "@/request/emailVerification";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from 'react';

export default function Signup() {
  const [ email, setEmail ] = useState('');
  const router = useRouter();
  const { profile } = useContext(UserContext);

  const verifyEmail = async () => {
    const res = await emailVerification({ email });
    if (res.message === 'ok') router.push('/signup/mail-sent');
  }

  useEffect(() => {
    if (profile) router.push('/')
  }, [profile, router]);

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email"/>
      </div>
      <button onClick={verifyEmail} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <Link href={`/authorization/signup/mail-sent`}>Send confirmation email</Link>
      </button>
    </form>
  )
}