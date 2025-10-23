/**
 * @description: auth sign in button component
 * @returns {React.ReactNode} auth sign in button component
 */
"use client"

import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
 
export default function SignIn() {
  const t = useTranslations("login")
  return <button onClick={() => signIn("github")}> {t("signIn")} </button>
}