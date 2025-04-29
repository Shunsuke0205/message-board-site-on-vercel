import Image from "next/image"
import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <footer className="mt-6 border-t border-gray-300 mb-28">
      <div className="mt-4 text-center text-gray-500">
        &copy; 2025 Shunsuke HIRATA
      </div>
      <div 
        className="
          fixed bottom-0 left-0 right-0 
          md:max-w-screen-md md:mx-auto 
          flex justify-around 
          bg-white 
          border-t border-gray-300 
          p-2
          overflow-x-auto"
      >
        <Link href="/posts">
          <div 
            className="mt-1 ml-2 pt-2 pb-2 pl-4 pr-4 
            w-20
            bg-gray-100 
            flex flex-col items-center 
            rounded-lg"
          >
            <Image
              src="/posts_icon.png"
              alt="Icon"
              width={40}
              height={40}
            />
            Posts
          </div>
        </Link>
        <Link href="/complain">
          <div 
            className="mt-1 ml-2 pt-2 pb-2 pl-4 pr-4 
            w-20
            bg-gray-100 
            flex flex-col items-center 
            rounded-lg"
          >
            <Image
              src="/galaxy_icon.png"
              alt="Icon"
              width={40}
              height={40}
            />
            Guchi
          </div>
        </Link>
        <Link href="/direct-message">
          <div 
            className="mt-1 ml-2 pt-2 pb-2 pl-4 pr-4 
            w-20
            bg-gray-100 
            flex flex-col items-center 
            rounded-lg"
          >
            <Image
              src="/dm_icon.png"
              alt="Icon"
              width={40}
              height={40}
            />
            DM
          </div>
        </Link>
        <Link href="/donation">
          <div 
            className="mt-1 ml-2 pt-2 pb-2 pl-4 pr-4 
            w-20
            bg-gray-100 
            flex flex-col items-center 
            rounded-lg"
          >
            <Image
              src="/donation_not_ready.png"
              alt="Icon"
              width={40}
              height={40}
            />
            寄付
          </div>
        </Link>
        <Link href="/second-hand">
          <div 
            className="mt-1 ml-2 pt-2 pb-2 pl-4 pr-4 
            w-20
            bg-gray-100 
            flex flex-col items-center 
            rounded-lg"
          >
            <Image
              src="/gift_not_ready.png"
              alt="Icon"
              width={40}
              height={40}
            />
            <div>
              <span className="text-sm">お譲り</span>
            </div>
          </div>
        </Link>
      </div>
    </footer>
  )
}

export default Footer