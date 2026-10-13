// src/data/aiCounterpartsData.ts
import type { AICounterpart } from '../types/aiCounterparts';

export const initialAICounterparts: readonly AICounterpart[] = [
  {
    id: 'query-vs-vector',
    traditionalConcept: 'Exact SQL / Keyword Search',
    aiCounterpart: 'Semantic Retrieval & Vector Embeddings',
    description:
      'Replacing lexical keyword matching with high-dimensional vector representations that capture semantic intent, topic nuances, and synonymous concepts.',
    traditionalExample: 'SELECT * FROM feedback WHERE text LIKE "%bug%"',
    aiExample: 'cosine_similarity(query_embedding, feedback_embeddings)',
    loopImplementation:
      'In Project LOOP, customer feedback is embedded so questions in "Ask LOOP" match relevant feedback even when exact terminology differs.',
  },
  {
    id: 'cache-vs-semantic-cache',
    traditionalConcept: 'Key-Value Cache (Redis)',
    aiCounterpart: 'Semantic Cache & KV Prompt Caching',
    description:
      'Instead of caching only bit-for-bit identical query strings, semantic caching reuses LLM responses for semantically equivalent prompts, cutting API latency and token cost.',
    traditionalExample: 'redis.get(hash(queryString))',
    aiExample: 'vectorIndex.search(promptEmbedding, threshold=0.92)',
    loopImplementation:
      'Repetitive analyst inquiries on customer sentiment reuse cached summary vectors to keep P95 response times under 150ms.',
  },
  {
    id: 'control-flow-vs-prompt-chain',
    traditionalConcept: 'Deterministic Controllers & Rules',
    aiCounterpart: 'Prompt Chains & Function / Tool Calling',
    description:
      'Replacing brittle if/else trees with structured prompt engineering and schema-enforced tool calling where LLMs dynamically select APIs based on user requests.',
    traditionalExample: 'if (topic === "billing") routeToBilling()',
    aiExample: 'gemini.generateContent({ tools: [queryDBTool, exportVOCTool] })',
    loopImplementation:
      'Project LOOP uses Gemini function schemas so natural language prompts in "Ask LOOP" can trigger exact feedback aggregation queries.',
  },
  {
    id: 'sessions-vs-context-window',
    traditionalConcept: 'HTTP Sessions & Stateful Cookies',
    aiCounterpart: 'Context Window & Sliding Memory Management',
    description:
      'Managing conversation context within finite token budgets using sliding windows, hierarchical memory, and token summarization.',
    traditionalExample: 'req.session.userId = user.id',
    aiExample: 'messages.slice(-maxTurns).concat(systemPromptSummary)',
    loopImplementation:
      'Ask LOOP implements sliding context memory so users can ask follow-up questions without exceeding model context bounds.',
  },
  {
    id: 'etl-vs-rag',
    traditionalConcept: 'ETL & Batch Normalization',
    aiCounterpart: 'RAG Ingestion (Chunking, Embedding, Indexing)',
    description:
      'Transforming raw unstructured customer input into tokenized chunks, generating dense embeddings, and storing them for contextual retrieval.',
    traditionalExample: 'stream.pipe(csvParser).pipe(dbWriter)',
    aiExample: 'chunker(text, size=500) -> embed(chunks) -> vectorStore.upsert()',
    loopImplementation:
      'Project LOOP CSV bulk importer processes thousands of feedback entries into normalized sentiment records.',
  },
  {
    id: 'sqli-vs-prompt-injection',
    traditionalConcept: 'SQL Injection & XSS Sanitization',
    aiCounterpart: 'Prompt Injection Defense & Guardrails',
    description:
      'Securing LLM systems against jailbreaks, system-prompt leakage, and unauthorized tool execution through input boundaries and schema-enforced JSON outputs.',
    traditionalExample: 'db.query("SELECT * FROM u WHERE id = ?", [id])',
    aiExample: 'gemini.generateContent({ responseSchema: VOCReportSchema })',
    loopImplementation:
      'Strict response schema enforcement prevents hallucinated keys and defends against untrusted feedback payloads.',
  },
];
