"use client"

import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut()} className="px-6 py-2 border bg-black hover:bg-slate-900 text-white rounded-md font-semibold">Sign out</button>
