'use client'; // for app router
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex gap-4">
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/contact">Contact</Link>
    <Link href="/about">Model</Link>
    </nav>
  );
}