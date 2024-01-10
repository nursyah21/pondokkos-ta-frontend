"use client"

import { signOut } from "next-auth/react";

export default function test() {

    return <>
    {signOut()}
    ...
    </>
}