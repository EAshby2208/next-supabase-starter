#!/bin/bash
# scripts/setup.sh

echo "🚀 Setting up Next.js + Supabase Starter App..."
echo ""

# -----------------------------
# Install dependencies
# -----------------------------
echo "📦 Installing npm dependencies..."
npm install

# if fail...
if [ $? -ne 0 ]; then
  echo "❌ npm instal failed"
  exit 1
fi

echo "✅ Dependencies installed"
echo ""

# -----------------------------
# Start Supabase
# -----------------------------
echo "🏃 Starting Supabase..."

npx supabase start
if [ $? -ne 0 ]; then
  echo "❌ Supabase failed to start"
  exit 1
fi
echo "✅ Supabase running"
echo ""

# -----------------------------
# Get credentials
# -----------------------------
echo "🔑 Extracting Supabase credentials..."

SUPABASE_URL=$(npx supabase status | grep "URL" | awk '{print $3}')
SUPABASE_ANON_KEY=$(npx supabase status | grep "anon key" | awk '{print $3}')


# -----------------------------
# Create .env.local
# -----------------------------
echo "📝 Creating .env.local..."

if [ -f ".env.local" ]; then
    echo "⚠️ .env.local already exists, updating..."
fi

cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$SUPABASE_PUBLISHAABLE_KEY
EOF

echo "✅ .env.local created"
echo ""

# -----------------------------
# Run migrations
# -----------------------------
echo "🗄️ Running database migrations..."

npx supabase db reset

if [ $? -ne 0 ]; then
  echo "❌ Migration failed"
  exit 1
fi

echo "✅ Database ready"
echo ""

# -----------------------------
# Done
# -----------------------------
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. npm run dev"
echo "2. Open http://localhost:3000"
echo "3. Sign up for a new account"




