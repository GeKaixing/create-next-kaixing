"use client"
import AuthForm from '@/components/AuthForm'
import ForgotPassword from '@/components/ForgotPassword'
import React from 'react'

export default function page() {
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
