import { Login } from '@/containers/Login';
import { GuestLayout } from '@/layouts/GuestLayout';
import React from 'react'

export default function LoginPage() {
  return (
    <GuestLayout>
      <Login/>
    </GuestLayout>
  );
}