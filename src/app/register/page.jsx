"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/homepage");
    return null;
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (
      !name ||
      !lastname ||
      !day ||
      !month ||
      !year ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all inputs!");
      return;
    }

    try {
      const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          day,
          month,
          year,
          email,
        }),
      });

      const { user } = await resCheckUser.json();

      if (user) {
        setError("User already exists!");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          day,
          month,
          year,
          email,
          password,
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("User registration successful!");
        router.push('/homepage');
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="container max-w-md py-5">
          <h1 className="font-bold text-center">Register</h1>
          <hr className="my-3" />
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {success}
              </div>
            )}

            <div className="flex space-x-2">
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 p-2 my-3 rounded-md w-full"
                type="text"
                placeholder="ชื่อ"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-200 p-4 my-3 rounded-md w-full"
                type="text"
                placeholder="นามสกุล"
              />
            </div>
            <div className="flex space-x-2">
              <input
                onChange={(e) => setDay(e.target.value)}
                className="bg-gray-200 p-4 my-3 rounded-md w-full"
                type="text"
                placeholder="วัน"
              />
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-gray-200 p-2 my-3 rounded-md"
              >
                <option value="" disabled>
                  เดือน
                </option>
                <option value="มกราคม">มกราคม</option>
                <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                <option value="มีนาคม">มีนาคม</option>
                <option value="เมษายน">เมษายน</option>
                <option value="พฤษภาคม">พฤษภาคม</option>
                <option value="มิถุนายน">มิถุนายน</option>
                <option value="กรกฎาคม">กรกฎาคม</option>
                <option value="สิงหาคม">สิงหาคม</option>
                <option value="กันยายน">กันยายน</option>
                <option value="ตุลาคม">ตุลาคม</option>
                <option value="พฤศจิกายน">พฤศจิกายน</option>
                <option value="ธันวาคม">ธันวาคม</option>
              </select>
              <input
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-200 p-4 my-3 rounded-md"
                type="text"
                placeholder="ปี"
              />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="block bg-gray-200 p-4 my-3 rounded-md"
              type="email"
              placeholder="อีเมล์"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="block bg-gray-200 p-4 my-3 rounded-md"
              type="password"
              placeholder="รหัสผ่าน"
            />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block bg-gray-200 p-4 my-3 rounded-md"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
            />
            <button
              type="submit"
              className="bg-blue-500 p-3 rounded-md my-3 text-white"
            >
              ยืนยัน
            </button>
            <p className="text-gray-500">
              Do not have an account? go to{" "}
              <Link
                className="text-blue-500 hover:underline font-bold"
                href="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
