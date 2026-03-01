import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"



const Header = async () => {
  // const isloggedin = await isLoggedIn();
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const isloggedin = user.user !== null;

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
            href={`/profile/${user.user.id}`}
            className="border border-gray-300 px-3 py-1 bg-orange-100 cursor-pointer rounded-lg hover:bg-orange-100"
          >
            マイページ
          </Link>
        </div>
        :
        <Link
          href="/login"
          className="border border-gray-300 px-3 py-1 bg-orange-100 cursor-pointer rounded-lg hover:bg-orange-200"
        >
          ログイン
        </Link>
      }
    </header >
  )
}

export default Header
