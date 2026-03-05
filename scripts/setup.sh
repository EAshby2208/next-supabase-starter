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
  echo "❌ npm install failed"
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

STATUS=$(npx supabase status)

# SUPABASE_URL=$(echo "$STATUS" | grep "Project URL" | awk -F '│' '{print $3}' | xargs)
# SUPABASE_ANON_KEY=$(echo "$STATUS" | grep "Publishable" | awk -F '│' '{print $3}' | xargs)

SUPABASE_URL=$(echo "$STATUS" | grep "Project URL" | awk '{print $5}')
SUPABASE_ANON_KEY=$(echo "$STATUS" | grep "Publishable" | awk '{print $4}')
echo "$STATUS"
echo "URL=$SUPABASE_URL"
echo "KEY=$SUPABASE_ANON_KEY"

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
  echo "❌ Failed to extract Supabase credentials"
  echo ""
  echo "Supabase status output:"
  echo "$STATUS"
  exit 1
fi

echo "✅ Credentials extracted"
echo "URL: $SUPABASE_URL"
echo "Anon Key: $SUPABASE_ANON_KEY"
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

