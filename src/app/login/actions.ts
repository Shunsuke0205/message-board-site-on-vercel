'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'



function redirectWithError(message: string): never {
  console.error("Authentication Error:", message);
  redirect("/error");
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  if (!emailValue || !passwordValue) {
    redirectWithError("Email and password are required.");
  }

  const password = String(passwordValue).trim();
  if (password.length < 8) {
    redirectWithError("Password must be at least 8 characters long.");
  }
  const email = String(emailValue).trim();

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError) {
    redirectWithError("Authentication failed: " + authError.message);
  }
  if (!authData.user) {
    redirectWithError("Authentication failed. No user data returned.");
  }



  revalidatePath("/posts", "layout");
  redirect("/posts");
}



export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  if (!data.email) {
    console.error("error: email is empty")
    return;
  } else if (!data.password) {
    console.error("error: password is empty")
    return;
  } else if (data.password.length < 8) {
    console.error("error: password is too short")
    return;
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/posts', 'layout')
  redirect('/posts')
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }
  console.log("Successfully logged out");

  revalidatePath('/posts', 'layout');
  redirect('/posts');
}

export async function isLoggedIn() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log("Error fetching user in 'isLoggedIn' function:", error);
    return false;
  } else {
    console.log("User is logged in");
    return true;
  }
}
