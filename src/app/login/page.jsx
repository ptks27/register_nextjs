"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const {data: session} = useSession();
    if(session) router.replace("/homepage")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await signIn("credentials", {
                email, password, redirect:false
            })

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace('homepage')

        } catch(error) {
            console.log(error);
            
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center '>
            <div className='container max-w-md py-5'>
                <h1 className='font-bold text-center'>Login</h1>
                <hr className='my-3'/>
                <form className='flex flex-col' onSubmit={handleSubmit}>

                {error && (
              <div className="bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
                    <input onChange={(e) => setEmail(e.target.value)} className='bg-gray-200 p-2 my-3 rounded-md' type="email" placeholder='อีเมล์' />
                    <input onChange={(e) => setPassword(e.target.value)} className='bg-gray-200 p-2 my-3 rounded-md' type="password" placeholder='รหัสผ่าน' />
                    <button type='submit' className='bg-blue-500 p-3 rounded-md my-3 text-white'>เข้าสู่ระบบ</button>
                </form>
                <hr className='my-3'/>
                <p className='text-gray-500'>Do not have an account? go to <Link className='text-blue-500 hover:underline font-bold' href="/register">Register</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login
