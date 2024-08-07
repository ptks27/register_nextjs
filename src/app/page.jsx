import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <br className="my-4"/>
      <h1 className="justify-center text-center my-4">Hello</h1>
      <h1 className="justify-center text-center my-4">Please register to log in.</h1>
      <div className="justify-center text-center">
      <button className="mx-3 justify-center  text-center p-3 rounded-md text-white bg-cyan-700">
              <Link  href="/register">Register</Link>
            </button>
            </div>
    </main>
  );
}
