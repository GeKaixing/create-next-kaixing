"use client"
import AuthForm from '@/components/AuthForm'
import ForgotPassword from '@/components/ForgotPassword'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function page() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    
    return (
        <div className='flex '>
            <AuthForm mode='login'
                onSubmit={() => {
                    console.log('')
                }}></AuthForm>
            <ForgotPassword></ForgotPassword>
            <AuthForm mode='signup'
                onSubmit={() => {
                    console.log('')
                }}></AuthForm>
        </div>
    )
}
