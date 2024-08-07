"use client";

import Navbar from '../components/Navbar';
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const HomePage = () => {
  const { data: session } = useSession();

  if (!session) redirect("/login")

  return (
    <div>
      <Navbar session={session}/>
      <br />
      <div className="container mx-auto">
        <h1 className="text-3xl my-3 text-cyan-700">Personal Information</h1>
        <hr className='my-3'/>
        <p className="my-3 font-bold">Name: <span className='text-gray-800 font-semibold'>{session?.user?.name ?? 'N/A'}</span></p>
        <p className="my-3 font-bold">Lastname: <span className='text-gray-800 font-semibold'>{session?.user?.lastname ?? 'N/A'}</span></p>
        <p className="my-3 font-bold">Birthday: <span className='text-gray-800 font-semibold'>{session?.user?.day ?? 'N/A'} / {session?.user?.month ?? 'N/A'} / {session?.user?.year ?? 'N/A'}</span></p>
        <p className="my-3 font-bold">Email: <span className='text-gray-800 font-semibold'>{session?.user?.email ?? 'N/A'}</span></p>
        <hr className="my-3" />
      </div>
    </div>
  );
};

export default HomePage;
