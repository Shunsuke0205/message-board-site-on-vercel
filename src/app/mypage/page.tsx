import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/component/LogoutButton'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <LogoutButton />
      <p>Hello {data.user.email}</p>
      <p>Your user ID is &quot;{data.user.id}&quot;</p>
    </div>
  )
}