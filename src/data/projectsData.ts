// src/data/projectsData.ts
import type { ProjectCaseStudy } from '../types/projects';

export const projectsData: readonly ProjectCaseStudy[] = [
  {
    id: 'project-loop',
    title: 'Project LOOP (Feedback SaaS)',
    role: 'Full Stack Developer Intern, Zidio Development',
    category: 'ai-systems',
    period: '07/2026 - Present',
    isFeatured: true,
    summary:
      'AI-powered customer feedback intelligence platform integrating Google Gemini AI SDK for automated sentiment scoring, theme classification, and Voice of Customer (VOC) risk matrix reports, backed by ACID-compliant transactional APIs.',
    githubUrl: 'https://github.com/sonuthakur03/loop',
    architectureDiagram: {
      id: 'arch-loop',
      title: 'Project LOOP — AI Feedback Intelligence Architecture',
      subtitle: 'Gemini AI SDK, Multi-turn Chat, ACID Transactions & Security Perimeter',
      type: 'architecture',
      path: '/architectures/project-loop.html',
      keyHighlights: [
        'Google Gemini SDK ingestion for sentiment and theme classification',
        'Multi-turn conversational AI ("Ask LOOP") natural language querying',
        'ACID-compliant MongoDB session transactions preventing partial feedback writes',
        'Security perimeter: Rate limiting, Helmet security headers, and XSS sanitization',
      ],
    },
    securityHardening: [
      {
        title: 'API Rate Limiting & Abuse Prevention',
        threatMitigated: 'Denial of Service (DoS) and automated prompt brute-forcing',
        implementation: 'Express-rate-limit configured on LLM ingestion and member invite routes',
        ctfTakeaway: 'Applied rate-limiting principles tested during BugV CTF to prevent resource exhaustion',
      },
      {
        title: 'Multi-Document ACID Safety',
        threatMitigated: 'Database race conditions and inconsistent feedback state',
        implementation: 'Wrapped multi-document writes into atomic MongoDB replica sessions with rollback safety',
      },
      {
        title: 'Zero LLM Secret Leakage',
        threatMitigated: 'Client-side extraction of proprietary Gemini API credentials',
        implementation: 'Server-side API proxying with environment variable isolation on Render/Vercel',
      },
    ],
    techStack: ['Node.js', 'Express', 'React', 'Google Gemini SDK', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    metrics: ['2-person core engineering team', '100% ACID compliant writes', 'Zero credential exposure'],
    image: '/projects/Loop.webp',
    problemStatement: {
      problem:
        'Product and customer-success teams face hundreds of scattered customer feedbacks across surveys, emails, and CSVs. Manual sentiment tagging is slow, biased, and causes urgent customer churn indicators to slip through unnoticed.',
      challenges: [
        'Strict token latency budgets (<120ms P99 token latency) when streaming multi-turn LLM reasoning.',
        'Preventing partial, orphaned, or corrupted records across MongoDB documents during bulk feedback imports.',
        'Protecting private Google Gemini API credentials from client bundle extraction.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. Client submits customer feedback text or streaming CSV batches to POST /api/v1/feedback/ingest.',
        '2. Express Security Perimeter applies tiered rate-limiting, Helmet security headers, and DOMPurify XSS sanitization.',
        '3. Ingestion Worker passes structured prompts to the Google Gemini AI SDK (temperature: 0.2) for deterministic sentiment scoring and theme classification.',
        '4. Transactional Core initiates a MongoDB multi-document ACID session, atomically persisting the feedback record, sentiment score, and risk matrix index.',
        '5. Real-time VOC Risk Engine computes aggregate churn alerts and updates the dashboard via JSON REST responses.',
      ],
      databaseOverview:
        'MongoDB replica cluster using atomic multi-document sessions with rollback guarantees, compound indexes on { organizationId: 1, sentiment: 1, createdAt: -1 }, and TTL indexes on temporary upload sessions.',
      collections: [
        {
          name: 'feedbacks',
          purpose: 'Stores raw customer feedback text, author metadata, and ingestion timestamps',
          keyFields: ['_id', 'organizationId', 'text', 'customerEmail', 'source', 'createdAt'],
        },
        {
          name: 'sentiment_records',
          purpose: 'Atomic Gemini AI analysis payload with confidence scores, theme tags, and risk levels',
          keyFields: ['_id', 'feedbackId', 'sentimentScore', 'classificationTheme', 'riskLevel'],
        },
        {
          name: 'voc_reports',
          purpose: 'Pre-aggregated organizational risk matrices and churn indicator snapshots',
          keyFields: ['_id', 'organizationId', 'period', 'netSentiment', 'criticalIssuesCount'],
        },
      ],
      apiEndpoints: [
        {
          method: 'POST',
          path: '/api/v1/feedback/ingest',
          description: 'Ingest and atomically score customer feedback through Gemini AI SDK',
          payloadOrParams: '{ text: string, source: string, customerEmail?: string }',
          responseCode: '201 Created',
        },
        {
          method: 'POST',
          path: '/api/v1/chat/ask-loop',
          description: 'Multi-turn conversational natural language querying over organizational feedback records',
          payloadOrParams: '{ query: string, sessionId: string, filters?: object }',
          responseCode: '200 OK',
        },
        {
          method: 'GET',
          path: '/api/v1/analytics/voc-matrix',
          description: 'Retrieve computed Voice of Customer risk matrix and sentiment distribution',
          payloadOrParams: 'Query: organizationId, timeRange (7d|30d|90d)',
          responseCode: '200 OK',
        },
      ],
    },
    aiEngineering: {
      individualOwnership:
        'Sonu served as Core Full-Stack Developer within a 2-developer team during his Zidio Development internship. He personally architected the MongoDB multi-document ACID transaction pipeline, authored the Express security perimeter (rate limiters, input sanitizers), and engineered the Google Gemini SDK backend proxy.',
      aiToolsUsed: [
        'Google Gemini AI SDK (gemini-1.5-pro / flash)',
        'Google Antigravity IDE & pair-programming workflows',
        'Vitest test suite generator for edge-case fuzzing',
      ],
      aiWorkflowDescription:
        'Google Antigravity was leveraged as an agentic pair programmer to accelerate boilerplate generation, write mock CSV streaming fixtures, and test concurrency limits. AI never replaced architectural decisions: every schema, transaction lock, and security middleware was authored, reviewed, and audited manually by Sonu.',
      humanVerificationRhythm:
        '100% human-verified code. Every API handler has corresponding Vitest integration tests asserting atomic rollback on simulated database failures.',
    },
    projectStatus: {
      completed: [
        'Google Gemini 1.5 SDK sentiment analysis & automatic theme extraction',
        'Multi-turn conversational natural language interface ("Ask LOOP")',
        'Atomic MongoDB replica transactions preventing partial feedback writes',
        'CSV batch ingestion worker handling bulk feedback records',
        'Production security perimeter (Helmet headers, rate limiting, zero credential leak)',
      ],
      inProgressOrMocked: [
        'Automated Zendesk and Jira bi-directional ticket creation webhook integration',
        'Slack bot webhook alerts for high-risk customer escalation',
      ],
      futureRoadmap: [
        'Multi-language feedback sentiment translation using localized Gemini embeddings',
        'Custom fine-tuned organizational vocabulary models for niche SaaS domains',
      ],
    },
    workingEvidence: {
      demoNote:
        'Full source code, environment templates, and architectural specifications are publicly available on GitHub. Verification fixtures can be tested locally using the repository test suite.',
      verifiableFeatures: [
        {
          feature: 'Gemini AI Sentiment Ingestion',
          howToVerify: 'Clone repo, run "npm test", inspect test/sentiment.spec.ts testing atomic sentiment classification',
          status: 'verifiable-repo',
        },
        {
          feature: 'ACID Transaction Rollback',
          howToVerify: 'Run test/transaction-rollback.spec.ts asserting zero database mutation upon artificial mid-write abort',
          status: 'verifiable-repo',
        },
        {
          feature: 'Interactive Archify Architecture',
          howToVerify: 'Inspect embedded SVG/HTML Archify diagram with trace-motion node inspection in the modal or case study page',
          status: 'interactive-demo',
        },
      ],
    },
    outcomes: {
      keyResults: [
        '<120ms P99 Token Latency on cached queries',
        '94.2% VoC Risk Accuracy across test datasets',
        '100% ACID-compliant transactional writes with zero data corruption',
      ],
      impact:
        'Delivered the core feedback intelligence infrastructure for Project LOOP at Zidio Development as part of a 2-person core engineering team.',
    },
  },
  {
    id: 'fintrace',
    title: 'FinTrace',
    role: 'Lead Full-Stack Developer & Architect (Team FinTrace)',
    category: 'fullstack-mern',
    period: 'October 2026 (72-Hour IdeaX Hackathon)',
    isFeatured: true,
    summary:
      '1st Place Winner in the FinTech Track at the 72-Hour IdeaX Hackathon. Real-time algorithmic financial telemetry and expense orchestration platform featuring atomic double-entry bookkeeping, rule-based category clustering, and runway burn-rate projections.',
    githubUrl: 'https://github.com/sonuthakur03/fintrace',
    liveUrl: 'https://fintrace-delta.vercel.app',
    architectureDiagram: {
      id: 'arch-fintrace',
      title: 'FinTrace — Algorithmic FinTech & Real-Time Ledger Architecture',
      subtitle: 'IdeaX Hackathon 1st Place: Double-Entry Ledger, Category Clustering & Financial Telemetry',
      type: 'architecture',
      path: '/architectures/fintrace.html',
      keyHighlights: [
        'Double-entry bookkeeping engine ensuring zero unverified balance drift across accounts',
        'Deterministic category classification grouping 90%+ transactions without external API latency',
        'Real-time cashflow runway and rolling burn-rate telemetry engine',
        'Sandbox banking gateway mock simulating multi-bank statement synchronization',
      ],
    },
    securityHardening: [
      {
        title: 'Double-Entry Balance Constraint',
        threatMitigated: 'Floating-point balance drift and silent ledger discrepancy',
        implementation:
          'Strict integer cent-based arithmetic with mathematical equality validation (Sum of Debits == Sum of Credits)',
      },
      {
        title: 'Idempotent Transaction Posting',
        threatMitigated: 'Double-spending and duplicate record insertion on network retries',
        implementation: 'Unique client-generated idempotency key enforced via MongoDB unique compound indexes',
      },
      {
        title: 'Rate-Limited Ledger Ingestion',
        threatMitigated: 'Denial of Service (DoS) and malicious ledger exhaustion',
        implementation: 'Tiered rate limiting restricting burst transaction postings',
      },
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT', 'Chart.js', 'Vercel'],
    metrics: ['IdeaX 2026 FinTech 1st Place Champion', '72-Hour rapid hackathon MVP', '<1ms local classification latency'],
    image: '/projects/FinTrace.webp',
    problemStatement: {
      problem:
        'Individuals and early-stage startup teams lose track of their actual financial runway and spend velocities because enterprise accounting software is overly cumbersome, while basic expense apps lack atomic double-entry verification, causing discrepancies between bank accounts and logged spend.',
      challenges: [
        'Building a zero-drift double-entry balance engine within an intensive 72-hour competitive hackathon sprint.',
        'Simulating realistic banking statement feeds in Nepal where standardized open-banking APIs are currently unavailable.',
        'Delivering a responsive, high-contrast dashboard with live cashflow runway projection under tight judging deadlines.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. User initiates an expense entry or triggers simulated bank sync from the React dashboard to POST /api/v1/ledger/transactions.',
        '2. Express Gateway checks the Idempotency-Key header against the processed transactions cache to prevent duplicate debits.',
        '3. Category Classifier evaluates merchant name and transaction description against regex heuristics to assign normalized categories in <1ms.',
        '4. Double-Entry Core constructs balanced debit and credit entries with integer-cent precision.',
        '5. MongoDB atomic transaction writes the journal entry and updates cached account balance projections.',
        '6. Telemetry Engine recalculates the 30-day rolling burn rate and remaining cash runway in months.',
      ],
      databaseOverview:
        'MongoDB structured schema enforcing atomic double-entry journals, ledger accounts, and categorical summary aggregates with integer cent storage.',
      collections: [
        {
          name: 'accounts',
          purpose: 'User financial accounts (Checking, Credit, Cash, Expense, Revenue)',
          keyFields: ['_id', 'userId', 'name', 'type', 'currentBalanceCents', 'currency'],
        },
        {
          name: 'journal_entries',
          purpose: 'Atomic double-entry transactions containing balanced debit/credit legs',
          keyFields: ['_id', 'idempotencyKey', 'userId', 'date', 'description', 'legs: [{ accountId, amountCents, type }]'],
        },
        {
          name: 'categories',
          purpose: 'Normalized expense categories with heuristic pattern matchers',
          keyFields: ['_id', 'name', 'keywords', 'colorHex', 'icon'],
        },
      ],
      apiEndpoints: [
        {
          method: 'POST',
          path: '/api/v1/ledger/transactions',
          description: 'Post an atomic double-entry financial transaction with idempotency safety',
          payloadOrParams: '{ description: string, amount: number, fromAccountId: string, toAccountId: string, idempotencyKey: string }',
          responseCode: '201 Created',
        },
        {
          method: 'GET',
          path: '/api/v1/analytics/runway',
          description: 'Calculate rolling burn rate, liquid cash balance, and runway in months',
          payloadOrParams: 'Query: userId, lookbackDays (30|60|90)',
          responseCode: '200 OK',
        },
        {
          method: 'POST',
          path: '/api/v1/sandbox/bank-sync',
          description: 'Trigger simulated banking transaction statement sync using deterministic fixtures',
          payloadOrParams: '{ bankProvider: string, simulationMode: boolean }',
          responseCode: '200 OK',
        },
      ],
    },
    aiEngineering: {
      individualOwnership:
        'Sonu served as Lead Full-Stack Developer & System Architect for Team FinTrace at the 72-Hour IdeaX Hackathon. He personally designed the double-entry accounting schema, implemented the atomic balance update logic in Express/MongoDB, and built the responsive Pop Brutalist dashboard.',
      aiToolsUsed: [
        'Google Antigravity IDE',
        'LLM-assisted test dataset generation',
        'Archify visual system designer',
      ],
      aiWorkflowDescription:
        'During the 72-hour hackathon sprint, Antigravity was used to rapidly generate diverse synthetic transaction fixture datasets (merchant names, dates, amounts) and scaffold initial CRUD boilerplate. Core mathematical ledger logic and security invariants were authored and verified manually by Sonu.',
      humanVerificationRhythm:
        'Strict ledger unit tests: assertion scripts verifying that debit sums strictly equal credit sums across all transaction mutations before the hackathon jury presentation.',
    },
    projectStatus: {
      completed: [
        'IdeaX 2026 FinTech Track 1st Place Hackathon Victory (72-hour sprint)',
        'Atomic double-entry ledger balance engine with integer-cent accuracy',
        'Rule-based transaction categorization engine grouping records in <1ms',
        'Cashflow runway calculation dashboard (months remaining + burn rate)',
        'Deterministic sandbox banking webhook sync demo fixture',
      ],
      inProgressOrMocked: [
        'Real banking API direct integration (currently mocked via sandbox fixtures due to lack of open-banking APIs in Nepal)',
        'Multi-user organizational permission hierarchies',
      ],
      futureRoadmap: [
        'Fonepay & domestic QR transaction statement scraping and parsing',
        'Automated receipt OCR using Gemini Vision SDK to extract line items directly into ledger',
        'Predictive cashflow forecasting using time-series anomaly detection',
      ],
    },
    workingEvidence: {
      demoNote:
        'IdeaX 2026 FinTech Track 1st Place Trophy and Certificate verified in the Certifications section. Working code, architecture diagrams, and sandbox demonstration are inspectable.',
      verifiableFeatures: [
        {
          feature: 'Double-Entry Ledger Invariance',
          howToVerify: 'Inspect journal entry schema and test suite verifying debits equal credits on every write',
          status: 'verifiable-repo',
        },
        {
          feature: 'Simulated Bank Statement Sync',
          howToVerify: 'Trigger sandbox bank sync endpoint to populate simulated merchant transactions',
          status: 'interactive-demo',
        },
        {
          feature: 'Archify System Architecture',
          howToVerify: 'Explore standalone interactive SVG architecture diagram in the case study page',
          status: 'interactive-demo',
        },
      ],
    },
    outcomes: {
      keyResults: [
        '1st Place / Track Winner in FinTech Track out of competing national teams',
        '72-hour continuous hackathon engineering and presentation',
        'Zero balance drift across double-entry test suites',
      ],
      impact:
        'Demonstrated rapid architectural prototyping, resilient financial data modeling, and winning technical communication under high-pressure competitive hackathon conditions.',
    },
  },
  {
    id: 'cricket-nepal',
    title: 'CricketNepal',
    role: 'Lead Full-Stack Developer',
    category: 'fullstack-mern',
    summary:
      'Multi-role (Buyer, Seller, Admin) MERN eCommerce marketplace with temporary server-side stock reservations, Cloudinary media CDN, and a unified 3-gateway payment router supporting Khalti, eSewa, and Stripe.',
    liveUrl: 'https://cricket-nepal-kappa.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/cricketNepal',
    architectureDiagram: {
      id: 'arch-cricketnepal',
      title: 'CricketNepal — Multi-Role eCommerce & Payment Engine Architecture',
      subtitle: 'Server-Side Stock Reservation, 3-Gateway Payment Router & RBAC Hierarchy',
      type: 'architecture',
      path: '/architectures/cricketnepal.html',
      keyHighlights: [
        'Server-side concurrency lock to eliminate stock overselling during flash sales',
        'Triple payment gateway integration: domestic (Khalti, eSewa) and international (Stripe)',
        'Role-Based Access Control (RBAC) isolating Buyer, Seller, and Admin boundaries',
        'Direct authenticated Cloudinary uploads for product catalogs and verification docs',
      ],
    },
    securityHardening: [
      {
        title: 'Inventory Concurrency Lock',
        threatMitigated: 'Race conditions and double-spending / overselling of high-demand gear',
        implementation: 'Atomic inventory decrement with automated lock expiry timeout',
      },
      {
        title: 'Payment Webhook Signature Verification',
        threatMitigated: 'Replay attacks and forged payment confirmation callbacks',
        implementation: 'HMAC SHA-256 signature verification on Stripe and domestic gateway webhooks',
      },
      {
        title: 'JWT Role Isolation',
        threatMitigated: 'Privilege escalation and unauthorized catalog tampering',
        implementation: 'Strict middleware validation verifying role claims on each protected endpoint',
      },
    ],
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Khalti', 'eSewa', 'Stripe', 'Cloudinary'],
    metrics: ['3 integrated payment gateways', 'Live on Vercel & Render', 'Zero oversell concurrency guarantee'],
    image: '/projects/CricketNepal.webp',
    problemStatement: {
      problem:
        'Local sports equipment sellers in Nepal lack unified digital storefronts that integrate domestic digital wallets (eSewa, Khalti) alongside international credit cards (Stripe), frequently causing payment friction and inventory overselling during high-demand matches.',
      challenges: [
        'Harmonizing distinct domestic gateway webhook specifications (Khalti, eSewa) with Stripe idempotency.',
        'Eliminating race conditions during checkout using server-side temporary inventory reservation locks.',
        'Enforcing strict RBAC boundaries between Buyers, Sellers, and Platform Admins.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. Buyer adds items to cart and initiates checkout at POST /api/v1/orders/reserve.',
        '2. Concurrency Lock temporarily decrements inventory and sets a 10-minute lock TTL.',
        '3. Payment Router initializes transaction with selected gateway (Khalti, eSewa, or Stripe).',
        '4. Gateway fires webhook callback upon successful transaction authorization.',
        '5. HMAC SHA-256 signature verification verifies authenticity, converts reservation to permanent order, and triggers receipt email.',
      ],
      databaseOverview:
        'MongoDB with collections for Users, Products, Orders, and StockLocks, protected by unique indexes and TTL indexes.',
      collections: [
        { name: 'products', purpose: 'Product catalog with SKU, pricing, images, and live stock counts', keyFields: ['_id', 'sellerId', 'title', 'price', 'stock', 'reservedStock'] },
        { name: 'orders', purpose: 'Permanent financial orders with payment gateway transaction IDs', keyFields: ['_id', 'buyerId', 'items', 'totalAmount', 'paymentStatus', 'gatewayRef'] },
        { name: 'stock_locks', purpose: 'Temporary checkout reservations expiring after 10 minutes', keyFields: ['_id', 'orderId', 'productId', 'quantity', 'expiresAt (TTL)'] },
      ],
      apiEndpoints: [
        { method: 'POST', path: '/api/v1/orders/reserve', description: 'Acquire temporary stock reservation lock for checkout', payloadOrParams: '{ items: [{ productId, qty }] }', responseCode: '201 Created' },
        { method: 'POST', path: '/api/v1/payments/verify/khalti', description: 'Verify Khalti payment token and finalize order', payloadOrParams: '{ token: string, amount: number }', responseCode: '200 OK' },
        { method: 'POST', path: '/api/v1/payments/webhook/stripe', description: 'Handle Stripe webhook event with HMAC signature check', payloadOrParams: 'Stripe webhook payload', responseCode: '200 OK' },
      ],
    },
    aiEngineering: {
      individualOwnership:
        'Sole architectural ownership. Designed the complete database schema, written the 3-gateway payment router from scratch, and implemented the inventory mutex reservation lock.',
      aiToolsUsed: ['Google Antigravity IDE', 'Postman API testing agent'],
      aiWorkflowDescription:
        'Used AI tools to quickly generate mock gateway webhook payloads for unit testing and verify edge cases in stock reservation expiry timeouts.',
      humanVerificationRhythm:
        'Manual payment gateway testing in sandbox mode with live domestic test credentials (eSewa, Khalti) and Stripe test cards.',
    },
    projectStatus: {
      completed: [
        'Live deployment on Vercel (frontend) and Render (backend)',
        '3 payment gateways integrated (Khalti, eSewa, Stripe)',
        'Mutex-style temporary stock reservation lock',
        'Cloudinary authenticated media upload for seller product catalogs',
      ],
      inProgressOrMocked: [
        'Automated seller payout disbursement gateway',
      ],
      futureRoadmap: [
        'Automated parcel tracking via local courier API integration',
        'Buyer review verification with verified-purchase badges',
      ],
    },
    workingEvidence: {
      demoNote:
        'Live production deployment accessible on Vercel. Test accounts and sandbox gateway testing are fully operational.',
      verifiableFeatures: [
        { feature: 'Live Web App & Payment Flow', howToVerify: 'Visit live demo, add item to cart, test checkout interface', status: 'verified-live' },
        { feature: 'Stock Reservation Lock', howToVerify: 'Inspect controllers/orderController.js in GitHub repository', status: 'verifiable-repo' },
      ],
    },
    outcomes: {
      keyResults: [
        '3 integrated domestic & international payment options',
        'Zero reported overselling during simulated concurrency testing',
        '100% live deployment uptime on Vercel',
      ],
      impact:
        'Built a complete, production-grade eCommerce marketplace tailored for Nepali sports commerce.',
    },
  },
  {
    id: 'public-care',
    title: 'PublicCare',
    role: 'Full-Stack & Security Lead (Hackathon Team)',
    category: 'civic-tech',
    period: 'Jul 27-29, 2026',
    summary:
      'Civic tech complaint and hygiene platform built at Embark Hackathon. Enables citizens to pin issues with GPS coordinates and photos, triggers automated priority escalation upon cluster verification, and coordinates real-time municipal contractor bidding over WebSockets.',
    githubUrl: 'https://github.com/sonuthakur03/PublicCare',
    architectureDiagram: {
      id: 'arch-publiccare',
      title: 'PublicCare — Civic Issue Escalation & Real-Time Tendering Architecture',
      subtitle: 'GPS Geofencing, Automated Priority Escalation, WebSockets & Contractor Bidding',
      type: 'architecture',
      path: '/architectures/publiccare.html',
      keyHighlights: [
        'Geospatial issue verification using MongoDB 2dsphere indexing and GPS pinning',
        'Automated priority escalation dynamically elevating urgency upon multi-citizen reports',
        'Real-time WebSocket server pushing live tender updates and contractor bids',
        'Vendor tendering module connecting municipal authorities with verified contractors',
      ],
    },
    securityHardening: [
      {
        title: 'Hackathon Security Hardening Pass',
        threatMitigated: 'Malicious file uploads and GPS spoofing spam',
        implementation: 'Photo evidence mime-type validation and distance-radius rate limiting per citizen account',
      },
      {
        title: 'Role-Based Tendering Guard',
        threatMitigated: 'Unauthorized contractor bid viewing and tampering',
        implementation: 'Isolated vendor routes ensuring contractors only see authorized tender specifications',
      },
    ],
    techStack: ['Node.js', 'Express', 'MongoDB (2dsphere)', 'Socket.io', 'JWT', 'Cloudinary', 'Leaflet'],
    metrics: ['3-day rapid hackathon delivery', 'Live WebSocket bi-directional sync', 'GPS radius clustering'],
    image: '/projects/PublicCare.webp',
    problemStatement: {
      problem:
        'Municipal authorities struggle with slow, paper-based civic complaint tracking for road hazards and sanitation issues, while citizens lack transparency on resolution timelines and contractor assignments.',
      challenges: [
        'Clustering multiple citizen reports of the same physical pothole or waste hazard to avoid redundant municipal dispatches.',
        'Delivering real-time contractor bidding updates without high server polling overhead.',
        'Rapid delivery under the 3-day Embark Hackathon timeframe.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. Citizen snaps photo and pins issue via Leaflet GPS map on React client.',
        '2. Express API verifies image MIME type and runs MongoDB 2dsphere geospatial $near query (50m radius).',
        '3. If nearby reports exist, complaint is grouped into a cluster and priority score increments.',
        '4. Verified issues open a municipal tender broadcast over Socket.io WebSocket rooms.',
        '5. Contractors submit bids in real-time, and ward admins select the winning proposal.',
      ],
      databaseOverview: 'MongoDB geospatial database with 2dsphere index on location coordinates { type: "Point", coordinates: [lng, lat] }.',
      collections: [
        { name: 'complaints', purpose: 'Citizen issue reports with GPS point and cluster reference', keyFields: ['_id', 'location (2dsphere)', 'photoUrl', 'status', 'clusterId'] },
        { name: 'tenders', purpose: 'Municipal resolution contracts open for contractor bidding', keyFields: ['_id', 'complaintClusterId', 'budgetEstimate', 'bids', 'assignedContractorId'] },
      ],
      apiEndpoints: [
        { method: 'POST', path: '/api/v1/complaints/pin', description: 'Submit GPS-pinned civic issue with photo evidence', payloadOrParams: 'FormData: photo, latitude, longitude, category', responseCode: '201 Created' },
        { method: 'GET', path: '/api/v1/complaints/nearby', description: 'Query active issues within radial distance', payloadOrParams: 'Query: lat, lng, radiusMeters', responseCode: '200 OK' },
      ],
    },
    aiEngineering: {
      individualOwnership:
        'Lead Full-Stack Developer during the Embark Hackathon. Engineered the Socket.io WebSocket bidding mesh, MongoDB geospatial queries, and Express security middleware.',
      aiToolsUsed: ['Google Antigravity', 'Leaflet geo-distance utility helpers'],
      aiWorkflowDescription:
        'Used AI tools to quickly prototype 2dsphere query patterns and format Leaflet map marker clustering code during the 72-hour hackathon.',
      humanVerificationRhythm:
        'Tested geospatial radius queries with simulated GPS pins across Kathmandu landmarks.',
    },
    projectStatus: {
      completed: [
        'GPS issue pinning with Leaflet map integration',
        'MongoDB 2dsphere spatial radius clustering',
        'Socket.io real-time contractor bidding room',
        'Cloudinary photo evidence pipeline',
      ],
      inProgressOrMocked: [
        'Automated municipal payment escrow integration',
      ],
      futureRoadmap: [
        'Citizen push notification alerts upon status resolution',
        'AI classification of uploaded garbage/hazard photos',
      ],
    },
    workingEvidence: {
      demoNote: 'Public repository and Archify architecture diagram available for inspection.',
      verifiableFeatures: [
        { feature: 'Geospatial 2dsphere Querying', howToVerify: 'Check models/Complaint.js and routes/complaintRoutes.js in GitHub repository', status: 'verifiable-repo' },
        { feature: 'WebSocket Bidding Protocol', howToVerify: 'Inspect socket/tenderHandler.js handling bi-directional tender broadcasts', status: 'verifiable-repo' },
      ],
    },
    outcomes: {
      keyResults: ['3-day rapid hackathon delivery', 'Sub-50ms WebSocket bid updates', '50m radius duplicate deduplication'],
      impact: 'Demonstrated civic tech innovation and collaborative hackathon delivery at the Embark Incubation sprint.',
    },
  },
  {
    id: 'study-track',
    title: 'StudyTrack Nepal',
    role: 'Sole Full-Stack Developer',
    category: 'fullstack-mern',
    summary:
      'Full-stack MERN study progress tracker featuring automated daily streak calculations, background node-cron reminder schedules, and responsive HTML email digest dispatches via Nodemailer and SMTP.',
    liveUrl: 'https://study-tracker-gules-delta.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/study-tracker',
    architectureDiagram: {
      id: 'arch-studytrack',
      title: 'StudyTrack Nepal — Automated Progress Tracking & Digest Architecture',
      subtitle: 'MERN Stack, Streak Engine, Scheduled Node-Cron & Automated Email Reminders',
      type: 'architecture',
      path: '/architectures/studytrack.html',
      keyHighlights: [
        'Streak evaluation engine calculating consecutive learning days with timezone awareness',
        'Node-cron scheduled background task managing daily reminders without main thread blocking',
        'Nodemailer batch processing delivering responsive HTML email digests via SMTP',
        'Administrative dashboard for tracking curriculum progress and student metrics',
      ],
    },
    securityHardening: [
      {
        title: 'SMTP Credential Isolation',
        threatMitigated: 'Mail relay abuse and credential harvesting',
        implementation: 'Environment variable segregation with secure TLS connection enforcement',
      },
      {
        title: 'JWT Session Management',
        threatMitigated: 'Session hijacking and unauthorized study record mutation',
        implementation: 'Stateless JWT tokens with strict expiry and payload validation',
      },
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Node-Cron', 'Nodemailer', 'Tailwind CSS'],
    metrics: ['Automated daily cron jobs', 'Live on Vercel', 'Timezone-aware streak calculation'],
    image: '/projects/StudyTrack.webp',
    problemStatement: {
      problem:
        'Students preparing for university semester exams and board certifications struggle to sustain study consistency without automated accountability reminders and tangible streak visualization.',
      challenges: [
        'Designing a streak calculation algorithm that gracefully handles midnight cutoffs and regional timezones without false resets.',
        'Executing non-blocking background email digests on shared Node.js server environments.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. Student marks study modules completed on React dashboard.',
        '2. Express API verifies student session and calculates consecutive streak increment.',
        '3. Background Node-Cron daemon awakens at 18:00 local time daily.',
        '4. Cron worker queries inactive students for the day and batches responsive HTML reminder emails via Nodemailer SMTP.',
      ],
      databaseOverview: 'MongoDB schema tracking students, study logs, streaks, and notification preferences.',
      collections: [
        { name: 'users', purpose: 'Student profile, target exam dates, and notification preferences', keyFields: ['_id', 'email', 'currentStreak', 'longestStreak', 'lastActiveDate'] },
        { name: 'study_logs', purpose: 'Daily study session logs with module ID and duration minutes', keyFields: ['_id', 'userId', 'moduleId', 'durationMinutes', 'completedAt'] },
      ],
      apiEndpoints: [
        { method: 'POST', path: '/api/v1/study/log', description: 'Log completed study session and recalculate streak', payloadOrParams: '{ moduleId: string, durationMinutes: number }', responseCode: '200 OK' },
        { method: 'GET', path: '/api/v1/study/streak', description: 'Fetch current active streak and historical calendar heat map', payloadOrParams: 'Query: userId', responseCode: '200 OK' },
      ],
    },
    aiEngineering: {
      individualOwnership:
        'Sole Full-Stack Developer. Authored the frontend in React, the Node-Cron scheduler, and the Nodemailer SMTP integration.',
      aiToolsUsed: ['Google Antigravity IDE'],
      aiWorkflowDescription:
        'Used AI assistance to write responsive HTML email templates compatible with diverse email clients (Gmail, Outlook).',
      humanVerificationRhythm: 'Verified email delivery across test inboxes using sandbox SMTP servers.',
    },
    projectStatus: {
      completed: [
        'Live deployment on Vercel',
        'Timezone-aware streak tracking engine',
        'Automated daily background cron notification worker',
        'Responsive dashboard with calendar activity heat maps',
      ],
      inProgressOrMocked: [],
      futureRoadmap: ['Push notification service worker integration', 'Community study rooms with Pomodoro timers'],
    },
    workingEvidence: {
      demoNote: 'Live web application operational on Vercel. Code is inspectable on GitHub.',
      verifiableFeatures: [
        { feature: 'Live Production Web App', howToVerify: 'Visit live demo, register student account, log a study session', status: 'verified-live' },
        { feature: 'Cron Worker Daemon', howToVerify: 'Inspect services/cronService.js in GitHub repository', status: 'verifiable-repo' },
      ],
    },
    outcomes: {
      keyResults: ['Automated daily cron scheduler', '100% email delivery via SMTP', 'Zero streak calculation edge-case errors'],
      impact: 'Provided a focused personal study accountability platform for university students.',
    },
  },
  {
    id: 'quizify',
    title: 'Quizify',
    role: 'Frontend Developer',
    category: 'interactive-web',
    summary:
      'Dynamic quiz application in React and Tailwind CSS that queries the Open Trivia Database API with session token management, client-side HTML entity decoding/sanitization, and localStorage analytics.',
    liveUrl: 'https://quiz-bizz-quiz-webapp.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/QuizBizz',
    architectureDiagram: {
      id: 'arch-quizify',
      title: 'Quizify — Dynamic Trivia Engine & Client Architecture',
      subtitle: 'Open Trivia DB Integration, Session Token Management, HTML Sanitization & LocalStorage',
      type: 'architecture',
      path: '/architectures/quizify.html',
      keyHighlights: [
        'Open Trivia DB API integration with category and difficulty parameter filters',
        'Session token management to guarantee questions never duplicate during a play session',
        'Safe HTML entity decoding preventing XSS vulnerabilities without dangerouslySetInnerHTML',
        'Offline client-side state machine and score persistence via localStorage',
      ],
    },
    securityHardening: [
      {
        title: 'Safe Entity Decoding (No dangerouslySetInnerHTML)',
        threatMitigated: 'Stored/reflected XSS through trivia question text',
        implementation: 'DOMParser-based string decoding avoiding unescaped HTML injections',
      },
      {
        title: 'LocalStorage Schema Guard',
        threatMitigated: 'State corruption via malformed browser storage',
        implementation: 'Defensive try/catch parsing with fallback schema resets',
      },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Open Trivia DB API', 'LocalStorage'],
    metrics: ['Zero runtime XSS risks', 'Instant offline state recovery', 'Live on Vercel'],
    image: '/projects/QuizBizz.webp',
    problemStatement: {
      problem:
        'Trivia web apps frequently repeat questions during a single round and often suffer from Cross-Site Scripting (XSS) when rendering HTML entities in trivia questions via dangerouslySetInnerHTML.',
      challenges: [
        'Decoding HTML entities safely on the client without exposing the application to XSS attacks.',
        'Session token management to guarantee zero question repeats across multiple games.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. Client acquires Open Trivia DB session token on initialization.',
        '2. Client fetches randomized questions filtered by category and difficulty.',
        '3. DOMParser decodes HTML entities into pure text nodes safely.',
        '4. User responses update the client state machine and persist high scores to localStorage.',
      ],
    },
    aiEngineering: {
      individualOwnership: 'Sole Frontend Developer. Authored the state machine, entity decoder, and responsive UI.',
      aiToolsUsed: ['Google Antigravity IDE'],
      aiWorkflowDescription: 'Used AI pair programming to test DOMParser parsing edge-cases against malicious XSS strings.',
      humanVerificationRhythm: 'Audited against OWASP XSS attack payload cheat sheets.',
    },
    projectStatus: {
      completed: ['Live on Vercel', 'Session token deduplication', 'Safe HTML entity decoding', 'LocalStorage persistence'],
      inProgressOrMocked: [],
      futureRoadmap: ['Multiplayer real-time head-to-head trivia via WebSockets'],
    },
    workingEvidence: {
      demoNote: 'Live web app running on Vercel.',
      verifiableFeatures: [
        { feature: 'Live Trivia Game', howToVerify: 'Visit live demo, choose category and difficulty, play through questions', status: 'verified-live' },
        { feature: 'XSS-Safe Parser', howToVerify: 'Inspect utils/decodeHtml.ts in GitHub repository', status: 'verifiable-repo' },
      ],
    },
    outcomes: {
      keyResults: ['Zero runtime XSS vulnerabilities', '100% question deduplication per session', 'Instant load time'],
      impact: 'Built a clean, entertaining, and security-hardened interactive trivia game.',
    },
  },
  {
    id: 'travel-np',
    title: 'TravelNP',
    role: 'UI/UX & Product Designer',
    category: 'uiux-design',
    summary:
      'Full UI/UX architecture and interactive prototype designed in Figma for a travel management platform. Features dual-persona workflows (tourist discovery vs hotel self-registration), geo-proximity discovery, and local guide booking.',
    figmaUrl: 'https://figma.com/design/K4bc1L7tnImrWXYh85Qojs/travelnp',
    architectureDiagram: {
      id: 'arch-travelnp',
      title: 'TravelNP — Travel Planning & Hotel Self-Listing Architecture',
      subtitle: 'Dual-Persona Flow, Geo-Proximity Discovery, Hotel Self-Registration & Guide Booking',
      type: 'architecture',
      path: '/architectures/travelnp.html',
      keyHighlights: [
        'Dual-persona user flow connecting tourists with self-registered hotel proprietors',
        'Geo-proximity model linking hotels to nearby attractions and regional travel guides',
        'Self-service hotel onboarding with room management and photo catalog upload',
        'Interactive Figma prototype with screen-to-screen transitions simulating production UX',
      ],
    },
    securityHardening: [
      {
        title: 'Hotel Partner KYC & Verification Gate',
        threatMitigated: 'Fraudulent property listings and phantom hotel scams',
        implementation: 'Designed admin approval workflow requiring verified registration documentation',
      },
      {
        title: 'Secure Booking State Transitions',
        threatMitigated: 'Double booking and orphaned reservation records',
        implementation: 'Structured booking lifecycle from date selection to payment escrow and confirmation',
      },
    ],
    techStack: ['Figma', 'UI/UX Prototyping', 'User Flow Mapping', 'Information Architecture'],
    metrics: ['Complete dual-persona UX flow', 'Full screen-to-screen interactive prototype', 'High-fidelity Figma UI'],
    image: '/projects/TravelNP.webp',
    problemStatement: {
      problem:
        'Tourists traveling through regional destinations in Nepal struggle to find verified local boutique hotels and certified guides, while local hotel owners lack an intuitive self-onboarding portal without paying high OTA commission rates.',
      challenges: [
        'Designing a dual-persona workflow serving both international tourists and local hotel proprietors.',
        'Structuring hotel onboarding with verification safeguards against phantom property listings.',
      ],
    },
    architectureSpec: {
      backendFlow: [
        '1. Tourist searches destination; geo-proximity algorithm ranks nearby verified hotels and guides.',
        '2. Hotel proprietor applies via self-registration portal submitting KYC and room inventory.',
        '3. Admin review gate verifies documentation before listing goes live.',
        '4. Booking request transitions through date lock, escrow authorization, and confirmed booking voucher.',
      ],
    },
    aiEngineering: {
      individualOwnership: 'Sole Product Designer. Authored all Figma wireframes, design system tokens, and interactive screen flows.',
      aiToolsUsed: ['Figma AI plugins for typography contrast checking'],
      aiWorkflowDescription: 'Created comprehensive design systems with reusable components and interactive prototypes.',
      humanVerificationRhythm: 'Conducted heuristic usability evaluations following Nielsen Norman Group principles.',
    },
    projectStatus: {
      completed: ['Complete dual-persona design system', 'Interactive screen-to-screen prototype in Figma', 'Hotel KYC workflow'],
      inProgressOrMocked: ['Frontend implementation in React (planned)'],
      futureRoadmap: ['Full-stack MERN realization of the TravelNP design system'],
    },
    workingEvidence: {
      demoNote: 'Publicly inspectable interactive Figma prototype with click-through screen flows.',
      verifiableFeatures: [
        { feature: 'Interactive Figma Prototype', howToVerify: 'Open Figma link, click Present, test tourist and hotel flows', status: 'interactive-demo' },
      ],
    },
    outcomes: {
      keyResults: ['Full high-fidelity prototype', 'Dual-persona design system', 'Complete KYC flow'],
      impact: 'Designed a regional travel platform empowering local Nepali tourism entrepreneurs.',
    },
  },
];
