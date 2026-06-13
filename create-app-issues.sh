#!/bin/bash
# Run from inside TrusTrove-app repo root
# Usage: bash create-app-issues.sh

# Map gh to gh.exe for compatibility when running in WSL
gh() {
  gh.exe "$@"
}

REPO="TrusTrove/TrusTrove-app"

echo "Creating issues for $REPO..."

# ── SDK ───────────────────────────────────────────────────────────────────────

gh issue create --repo $REPO \
  --title "feat(sdk): add retry logic for Soroban RPC calls on network timeout" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
The SDK's \`writeContract\` and \`readContract\` functions fail immediately on network timeout with no retry. Add exponential backoff retry logic for transient RPC failures.

## Acceptance Criteria
- [ ] Add \`withRetry(fn, maxAttempts = 3, baseDelayMs = 1000)\` utility in \`packages/sdk/src/base.ts\`
- [ ] Wrap all RPC calls with \`withRetry\`
- [ ] Delays: 1s, 2s, 4s (exponential backoff)
- [ ] Only retry on network errors — never retry on contract logic errors (e.g. wrong auth)
- [ ] Log each retry attempt with attempt number and error message

## Tech Stack
TypeScript · @stellar/stellar-sdk · Soroban RPC"

echo "✓ Issue 1 created"

gh issue create --repo $REPO \
  --title "feat(sdk): add TypeScript type guards for all contract return types" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
Contract return values parsed from XDR are not type-safe at runtime. Add Zod schemas and type guards for all contract return types.

## Types Requiring Guards
- [ ] \`Invoice\` — validate all fields including \`InvoiceStatus\` enum
- [ ] \`PoolStats\` — validate all numeric fields are bigint
- [ ] \`LPPosition\` — validate shares and USDC values
- [ ] \`Profile\` — validate address format and role enum

## Acceptance Criteria
- [ ] Zod schema for each type in \`packages/sdk/src/types/schemas.ts\`
- [ ] \`parse\` function exported for each type
- [ ] Used inside each contract client's return parsing
- [ ] TypeScript compilation passes with \`strict: true\`

## Tech Stack
TypeScript · zod · @stellar/stellar-sdk · XDR parsing"

echo "✓ Issue 2 created"

gh issue create --repo $REPO \
  --title "feat(sdk): implement transaction simulation preview before signing" \
  --label "enhancement,complexity:medium" \
  --body "## Summary
Users currently have no preview of what a transaction will do before Freighter asks them to sign. Add a \`simulate\` method to the base contract client that returns human-readable transaction details without submitting.

## Acceptance Criteria
- [ ] \`simulateTransaction(method, args)\` in \`base.ts\` runs Soroban simulation
- [ ] Returns: estimated fee in XLM, function name, expected result, footprint size
- [ ] Used in \`InvoiceForm\` and \`DepositForm\` to show fee preview before sign button
- [ ] If simulation fails, show the error in plain English before user even sees Freighter

## Tech Stack
TypeScript · SorobanRpc.Server.simulateTransaction · @stellar/stellar-sdk"

echo "✓ Issue 3 created"

# ── FRONTEND ──────────────────────────────────────────────────────────────────

gh issue create --repo $REPO \
  --title "feat(web): build invoice status timeline component for invoice detail page" \
  --label "enhancement,good first issue,complexity:medium" \
  --body "## Summary
The invoice detail page (/invoices/[id]) is missing the status timeline component that shows the full lifecycle of an invoice as a vertical timeline.

## Component Spec
File: \`apps/web/components/invoice/InvoiceStatusTimeline.tsx\`

- Completed events: solid teal line, filled circle, full opacity
- Current event (most recent): pulsing teal glow on the circle
- Future events: dashed grey line, hollow circle, 40% opacity
- Each event shows: icon + label + timestamp + tx hash (truncated, links to Stellar Expert testnet)

## Events to Show (in order)
1. Created
2. Listed for Financing
3. Funded by Pool
4. Marked as Shipped
5. Delivery Confirmed — Issuer
6. Delivery Confirmed — Buyer
7. Repaid / Defaulted

## Acceptance Criteria
- [ ] Component accepts \`Invoice\` type from SDK
- [ ] Renders correct state for every \`InvoiceStatus\` value
- [ ] Tx hash links to \`https://stellar.expert/explorer/testnet/tx/{hash}\`
- [ ] Responsive — works on 375px mobile viewport

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion"

echo "✓ Issue 4 created"

gh issue create --repo $REPO \
  --title "feat(web): add USDC balance display and faucet link for testnet users" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
Users on testnet have no way to see their USDC balance inside the app or get testnet USDC easily. Add a USDC balance indicator in the nav and a faucet link when balance is zero.

## Acceptance Criteria
- [ ] Fetch USDC balance via Horizon API using connected wallet address
- [ ] Display in Navbar: 'X.XX USDC' next to wallet address in JetBrains Mono
- [ ] If balance is 0: show amber tooltip 'Get testnet USDC →' linking to https://demo.stellar.org
- [ ] Balance refreshes every 30 seconds
- [ ] Shows skeleton loader while fetching

## Tech Stack
Next.js 14 · TypeScript · @stellar/stellar-sdk · Horizon API · Tailwind CSS"

echo "✓ Issue 5 created"

gh issue create --repo $REPO \
  --title "feat(web): implement mobile-responsive invoice creation flow" \
  --label "enhancement,complexity:medium" \
  --body "## Summary
The Create Invoice modal is not fully optimized for mobile viewports (375px). SMEs reporting from a phone need a seamless experience.

## Acceptance Criteria
- [ ] Modal becomes full-screen sheet on mobile (< 768px viewport)
- [ ] All inputs are touch-friendly (min 44px tap target height)
- [ ] Keyboard does not obscure the active input field on iOS
- [ ] Number inputs use \`inputmode='decimal'\` for numeric keyboard on mobile
- [ ] Step indicators (Step 1 / Step 2) visible and accessible on small screens
- [ ] Test on 375px viewport width

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · CSS viewport units"

echo "✓ Issue 6 created"

gh issue create --repo $REPO \
  --title "feat(web): add skeleton loaders for all dashboard data fetching states" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
When the SME Dashboard and LP Dashboard load, they show blank space while data fetches. Replace all blank loading states with skeleton loaders that match the shape of the content.

## Components Needing Skeletons
- [ ] \`InvoiceCard\` skeleton — same card shape, animated shimmer
- [ ] \`PoolStatsPanel\` skeleton — 4 metric card shapes
- [ ] \`LPPositionCard\` skeleton — card shape with mock field lines
- [ ] \`InvoiceTable\` skeleton — 5 row stubs
- [ ] \`ActivityTimeline\` skeleton — 5 event stubs

## Design Spec
- Background: var(--color-background-secondary)
- Shimmer: CSS animation sweeping left to right with teal tint
- No spinners anywhere — skeletons only

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · CSS animation"

echo "✓ Issue 7 created"

gh issue create --repo $REPO \
  --title "feat(web): build LP yield calculator on the landing page" \
  --label "enhancement,complexity:medium" \
  --body "## Summary
The landing page right panel needs an interactive LP yield calculator that shows how much a USDC deposit would earn based on current pool utilization.

## Calculator Spec
Tab: 'I'm an LP'
Inputs:
- Deposit amount (USDC, AmountInput component)
- Pool utilization slider (read from pool stats or default 75%)

Outputs (update instantly):
- Estimated annual yield %
- Monthly earnings in USDC
- Comparison bar chart: TrusTrove vs Savings Account (5%) vs T-Bills (4.5%)

Disclaimer (required, small muted text):
'Yield depends on pool utilization and invoice repayment rate. Smart contract risk exists.'

## Acceptance Criteria
- [ ] All calculations update without page interaction (no submit button)
- [ ] Bar chart built with plain CSS bars — no chart library needed
- [ ] Disclaimer always visible
- [ ] Works on mobile viewport

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · React state"

echo "✓ Issue 8 created"

gh issue create --repo $REPO \
  --title "feat(web): add transaction history table using Horizon API" \
  --label "enhancement,complexity:medium" \
  --body "## Summary
The TxHistory component is defined but not fully implemented. Connect it to the Horizon API to show real transaction history for the connected wallet.

## Acceptance Criteria
- [ ] Fetch transactions from: \`https://horizon-testnet.stellar.org/accounts/{address}/transactions\`
- [ ] Display: date, operation type, amount (if applicable), tx hash (truncated + copy button)
- [ ] Filter to only show transactions involving TrusTrove contract IDs
- [ ] Paginate — show 10 per page with Next/Previous buttons
- [ ] Each tx hash links to Stellar Expert testnet explorer
- [ ] Skeleton loader while fetching

## Tech Stack
Next.js 14 · TypeScript · @stellar/stellar-sdk · Horizon API · @tanstack/react-query"

echo "✓ Issue 9 created"

gh issue create --repo $REPO \
  --title "feat(web): add shareable invoice link with open graph metadata" \
  --label "enhancement,complexity:low" \
  --body "## Summary
After creating an invoice, SMEs should be able to share a link to their invoice that shows a proper preview when shared on WhatsApp, Telegram, or Twitter.

## Acceptance Criteria
- [ ] \`/invoices/[id]\` page generates dynamic Open Graph meta tags
- [ ] OG title: 'TrusTrove Invoice #{id} — {face_value} USDC'
- [ ] OG description: 'Trade finance invoice on Stellar. Status: {status}. Due: {due_date}.'
- [ ] OG image: static branded image (can be a fixed /og-image.png)
- [ ] Copy link button on invoice detail page copies the full URL to clipboard
- [ ] Share buttons for WhatsApp and Telegram

## Tech Stack
Next.js 14 App Router · generateMetadata() · TypeScript"

echo "✓ Issue 10 created"

# ── INDEXER / API ─────────────────────────────────────────────────────────────

gh issue create --repo $REPO \
  --title "feat(indexer): add pagination support to GET /invoices endpoint" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
The \`GET /invoices\` endpoint currently returns all invoices with no pagination. As invoices grow, this will cause slow responses and large payloads.

## Acceptance Criteria
- [ ] Add \`page\` and \`limit\` query parameters (default: page=1, limit=20, max limit=100)
- [ ] Response body includes: \`{ data: Invoice[], total: number, page: number, limit: number, totalPages: number }\`
- [ ] SQL query uses \`LIMIT\` and \`OFFSET\` correctly
- [ ] Works with existing \`status\` and \`issuer\` filter params
- [ ] Update TypeScript API client in \`apps/web/lib/api.ts\` to pass pagination params

## Tech Stack
Go · chi router · pgx · PostgreSQL"

echo "✓ Issue 11 created"

gh issue create --repo $REPO \
  --title "feat(indexer): add GET /stats endpoint for landing page protocol statistics" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
The landing page needs live protocol statistics (total USDC financed, active invoices, total repaid). Add a \`/stats\` endpoint that aggregates this from the database.

## Response Shape
\`\`\`json
{
  \"total_usdc_financed\": \"1250000000000\",
  \"active_invoice_count\": 12,
  \"total_invoices\": 47,
  \"total_repaid\": 31,
  \"total_defaulted\": 2,
  \"average_yield_bps\": 210,
  \"pool_utilization_bps\": 7500
}
\`\`\`

## Acceptance Criteria
- [ ] \`GET /stats\` returns the above shape
- [ ] All amounts as strings (to preserve u128 precision)
- [ ] Response is cached for 30 seconds to avoid hammering the DB
- [ ] No auth required — this is a public endpoint

## Tech Stack
Go · chi · pgx · PostgreSQL"

echo "✓ Issue 12 created"

gh issue create --repo $REPO \
  --title "feat(api): add CORS configuration for production Vercel domain" \
  --label "enhancement,good first issue,complexity:low" \
  --body "## Summary
The indexer API currently allows all CORS origins. Restrict it to the production Vercel domain and local development origins only.

## Acceptance Criteria
- [ ] Read allowed origins from \`ALLOWED_ORIGINS\` environment variable (comma-separated)
- [ ] Default to \`http://localhost:3000\` if env var not set
- [ ] Return \`403\` for requests from unlisted origins
- [ ] Add \`ALLOWED_ORIGINS=https://trustrove.vercel.app,http://localhost:3000\` to \`.env.example\`
- [ ] Update Render environment variables documentation in README

## Tech Stack
Go · chi middleware · CORS headers"

echo "✓ Issue 13 created"

gh issue create --repo $REPO \
  --title "feat(indexer): add database index on invoices table for faster queries" \
  --label "enhancement,complexity:low" \
  --body "## Summary
The invoices table has no indexes beyond the primary key. As data grows, queries filtering by \`issuer_address\`, \`status\`, and \`due_date\` will become slow.

## Acceptance Criteria
- [ ] Add migration \`002_add_indexes.sql\`
- [ ] Index on \`issuer_address\` column
- [ ] Index on \`status\` column
- [ ] Composite index on \`(status, due_date)\` for sorted filtered queries
- [ ] Migration runs automatically on indexer startup
- [ ] Verify with \`EXPLAIN ANALYZE\` that indexes are used

## Tech Stack
Go · PostgreSQL · pgx migrations"

echo "✓ Issue 14 created"

# ── DOCS ──────────────────────────────────────────────────────────────────────

gh issue create --repo $REPO \
  --title "docs(web): add JSDoc comments to all custom hooks and SDK client methods" \
  --label "documentation,good first issue,complexity:low" \
  --body "## Summary
None of the custom hooks or SDK methods have JSDoc comments, making it hard for contributors to understand parameters and return types.

## Files Requiring Documentation
- [ ] \`apps/web/hooks/useWallet.ts\`
- [ ] \`apps/web/hooks/useAuth.ts\`
- [ ] \`apps/web/hooks/useInvoices.ts\`
- [ ] \`apps/web/hooks/usePool.ts\`
- [ ] \`packages/sdk/src/clients/invoice.ts\`
- [ ] \`packages/sdk/src/clients/pool.ts\`
- [ ] \`packages/sdk/src/clients/registry.ts\`
- [ ] \`packages/sdk/src/clients/escrow.ts\`

Each export needs: one-line summary, \`@param\` for each parameter, \`@returns\` description, \`@throws\` for error cases.

## Tech Stack
TypeScript · JSDoc"

echo "✓ Issue 15 created"

echo ""
echo "==========================================="
echo "All 15 issues created for $REPO"
echo "==========================================="
