import { NextResponse } from 'next/server'

export async function GET() {
  const envStatus = {
    nextauthSecret: !!process.env.NEXTAUTH_SECRET,
    nextauthUrl: !!process.env.NEXTAUTH_URL,
    databaseUrl: !!process.env.DATABASE_URL
  }

  return NextResponse.json(envStatus)
}
