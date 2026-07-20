"use client"
import { LoginForm } from '@/components/auth/Login/LoginForm'
import { GL } from '@/components/gl'
import { Leva } from 'leva'

function AuthLoginPage() {
    return (
        <section className="flex flex-col h-svh w-full justify-between">
            <section className="flex flex-col h-svh justify-between">
                <GL hovering={true} />
                <Leva hidden />
                <LoginForm />
            </section>
        </section>
    )
}

export default AuthLoginPage