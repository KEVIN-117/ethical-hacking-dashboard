import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-context-menu'
import Image from 'next/image'
import React from 'react'

export function LoginForm() {
    return (
        <section className='bg-background/50 h-svh w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10'>
            <div className='w-[70vw] flex mx-auto bg-background/70 p-8 rounded-lg shadow-lg gap-6 overflow-y-auto place-items-center'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/active-directory-expert.webp`}
                    alt="Login Illustration"
                    width={300}
                    height={300}
                    className="mx-auto mb-8 col-span-2 w-full h-auto object-contain"
                />
                <div className='col-span-1 w-full grid place-items-center grid-cols-1 gap-3'>
                    <h1 className='text-4xl font-bold mb-6 text-center bg-linear-to-br from-primary to-sidebar bg-clip-text text-transparent'>
                        Iniciar Sesión
                    </h1>
                    <form action="" className='w-full grid place-items-center grid-cols-1 gap-7'>
                        <div className='w-full grid grid-cols-1 gap-2'>
                            <Label >Email</Label>
                            <Input type="email" id="email" placeholder="tu@email.com" />
                        </div>

                        <div className='w-full grid grid-cols-1 gap-2'>
                            <Label >Pass</Label>
                            <Input type="password" id="password" placeholder="********" />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
