'use client';

import Head from 'next/head';
import * as React from 'react';

import NearLogo from '~/svg/near.svg'

export default function Dashboard() {
    return (
        <>
        <main>
            <section className='bg-white'>
                <div className='layout relative flex min-h-screen flex-col items-center py-12 text-center'>
                    <NearLogo className='w-16' />
                    <h1 className='mt-4'>Next.js + Tailwind CSS + TypeScript Starter</h1>
                    <p className='mt-2 text-sm text-gray-800'>
                        A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
                        Import, Seo, Link component, pre-configured with Husky{' '}
                    </p>
                </div>
            </section>
        </main>
    </>
    );
}
