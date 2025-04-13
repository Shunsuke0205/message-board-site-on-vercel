import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // create a profile data of the new user
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError || !userData?.user) {
        console.error("Error fetching user in confirm route:", userError)
        // return redirect('/error')
      }

      const { error: profileError } = await supabase
        .from("profile")
        .insert([{
          userId: userData.user?.id,
          nickname: null,
          sex: null,
          selfIntro: null,
          icon: -1,
        }]);

      if (profileError) {
        console.error("Error creating profile in confirm route:", profileError)
        return redirect('/error')
      }


      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}