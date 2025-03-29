import LogoutButton from "@/component/LogoutButton"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { isLoggedIn } from "./login/actions"



const Header = async () => {
  const isloggedin = await isLoggedIn();

  return (
    <header className="border-b border-gray-300">
       <Link href="/">
        <Image
          src="/product_icon.png"
          alt="Icon"
          width={60}
          height={60}
          className="p-2"
        />
        <h1>えん</h1>
      </Link>
      {isloggedin ?
        <div>
          <Link href="/private">
            マイページ
          </Link>
          <LogoutButton />
        </div>
        :
        <Link href="/login">
          ログイン
        </Link>
      }
    </header>
  )
}

export default Header
