import Image from "next/image"
import Link from "next/link"
import React from "react"
import { isLoggedIn } from "./login/actions"



const Header = async () => {
  const isloggedin = await isLoggedIn();

  return (
    <header className="py-4 border-b border-gray-300 flex justify-between items-center ">
      <Link
        href="/"
        className="flex items-center"
      >
        <Image
          src="/product_icon.png"
          alt="Icon"
          width={50}
          height={50}
          className=""
        />
        <h1 className="ml-4 text-2xl">えん</h1>
      </Link>
      {isloggedin ?
        <div>
          <Link
            href="/mypage"
            className="border border-gray-300 px-3 py-1 bg-white cursor-pointer rounded-lg hover:bg-gray-100"
          >
            マイページ
          </Link>
        </div>
        :
        <Link
          href="/login"
          className="px-2 py-1 bg-red-100 cursor-pointer rounded-lg hover:bg-red-200"
        >
          ログイン
        </Link>
      }
    </header>
  )
}

export default Header
