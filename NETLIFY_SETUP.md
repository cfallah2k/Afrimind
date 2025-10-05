# Netlify Environment Variables Setup

## Required Environment Variables for AfriMind Platform

To fix the NextAuth configuration error, you need to set up the following environment variables in your Netlify dashboard:

### 1. Go to Netlify Dashboard
1. Visit [netlify.com](https://netlify.com) and log in
2. Go to your site dashboard
3. Click on "Site settings" → "Environment variables"

### 2. Add Required Variables

#### Database (Required)
```
DATABASE_URL=postgresql://username:password@host:port/database
```
**Note**: You need to set up a PostgreSQL database. Options:
- **Supabase** (Free tier available): https://supabase.com
- **Neon** (Free tier available): https://neon.tech
- **Railway** (Free tier available): https://railway.app
- **PlanetScale** (Free tier available): https://planetscale.com

#### NextAuth Configuration (Required)
```
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
NEXTAUTH_URL=https://afrimind.netlify.app
```

#### Optional API Keys (Set to placeholder values if not available)
```
WEATHER_API_KEY=your_weather_api_key_here
COMMODITY_API_KEY=your_commodity_api_key_here
CUSTOMS_API_KEY=your_customs_api_key_here
SHIPPING_API_KEY=your_shipping_api_key_here
LANGUAGE_API_KEY=your_language_api_key_here
CULTURAL_DATA_API_KEY=your_cultural_data_api_key_here
BANKING_API_KEY=your_banking_api_key_here
MOBILE_MONEY_API_KEY=your_mobile_money_api_key_here
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Generate NEXTAUTH_SECRET
You can generate a secure secret using:
```bash
openssl rand -base64 32
```
Or use an online generator: https://generate-secret.vercel.app/32

### 4. Database Setup Options

#### Option A: Supabase (Recommended - Free)
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Set `DATABASE_URL` in Netlify with this value

#### Option B: Neon (Free)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Set `DATABASE_URL` in Netlify with this value

### 5. Deploy Database Schema
After setting up the database, you'll need to run Prisma migrations:

```bash
# In your local project
npx prisma db push
```

### 6. Quick Fix for Testing
If you want to test without a database first, you can temporarily disable authentication by modifying the middleware:

```typescript
// src/middleware.ts - Comment out the auth check temporarily
export default withAuth(
  function middleware(req) {
    // Temporarily comment out auth logic for testing
    // if (req.nextUrl.pathname.startsWith('/dashboard')) {
    //   return NextResponse.redirect(new URL('/auth/signin', req.url))
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)
```

## Step-by-Step Fix

1. **Set up a free PostgreSQL database** (Supabase recommended)
2. **Add environment variables** in Netlify dashboard
3. **Redeploy** your site
4. **Test** the authentication flow

## Troubleshooting

- **Error: Configuration**: Missing NEXTAUTH_SECRET or NEXTAUTH_URL
- **Error: Database**: Missing or incorrect DATABASE_URL
- **Error: Prisma**: Database schema not migrated

## Support

If you need help with any of these steps, let me know which part you'd like assistance with!
