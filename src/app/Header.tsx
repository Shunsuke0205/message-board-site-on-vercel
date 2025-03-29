import Image from "next/image"
import Link from "next/link"
import React from "react"


type HeaderProps = {
  isLoggedIn: boolean
}

const Header = ({isLoggedIn}: HeaderProps) => {
  return (
    <div className="border-b border-gray-300">
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
      {isLoggedIn ?
        <Link href="/private">
          マイページ
        </Link>
        :
        <Link href="/login">
          ログイン
        </Link>
      }
    </div>
  )
}

export default Header
