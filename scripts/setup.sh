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

STATUS=$(npx supabase status 2>/dev/null)
if [[ $STATUS == *"Project URL"* ]]; then
  echo "⚠️ Supabase is already running"
else
    npx supabase start
    if [ $? -ne 0 ]; then
        echo "❌ Supabase failed to start"
        exit 1
    fi
fi

echo "✅ Supabase running"
echo ""

# -----------------------------
# Get credentials
# -----------------------------
echo "🔑 Extracting Supabase credentials..."

STATUS=$(npx supabase status 2>/dev/null)

SUPABASE_URL=$(echo "$STATUS" | grep "Project URL" | awk '{print $3}')
SUPABASE_ANON_KEY=$(echo "$STATUS" | grep "anon key" | awk '{print $2}')
SUPABASE_PUBLISHABLE_KEY=$(echo "$STATUS" | grep "publishable key" | awk '{print $2}')

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_PUBLISHABLE_KEY" ]; then
  echo "❌ Failed to extract Supabase credentials"
  exit 1
fi

echo "✅ Credentials extracted"
echo "URL: $SUPABASE_URL"
echo "Anon Key: $SUPABASE_ANON_KEY"
echo "Publishable Key: $SUPABASE_PUBLISHABLE_KEY"
echo ""

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
