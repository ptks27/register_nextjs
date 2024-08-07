import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, name } = await req.json();
    const user = await User.findOne({ email, name }).select("_id");
    console.log("User:", user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred while checking the user." }, { status: 500 });
  }
}
