// src/data/educationData.ts
import { Cpu, Database, Binary } from 'lucide-react';
import type { CurriculumPillar } from '../types/education';

export const curriculumPillars: readonly CurriculumPillar[] = [
  {
    id: 'systems',
    title: 'Systems & Architecture',
    icon: Cpu,
    modules: [
      {
        code: 'CSC-204',
        name: 'Operating Systems',
        keyTopics: 'Process Scheduling, Memory Management, POSIX Concurrency, Virtual Memory',
        gradeBadge: 'Grade A',
      },
      {
        code: 'CSC-302',
        name: 'Computer Networks',
        keyTopics: 'TCP/IP Stack, OSI Model, Subnetting, Routing Protocols, Socket Programming',
        gradeBadge: 'Grade A',
      },
      {
        code: 'CSC-152',
        name: 'Computer Architecture & Org.',
        keyTopics: 'ALU Design, Instruction Pipelining, Cache Coherence, Assembly Language',
        gradeBadge: 'Grade A',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & Algorithms',
    icon: Database,
    modules: [
      {
        code: 'CSC-201',
        name: 'Data Structures & Algorithms',
        keyTopics: 'Trees, Graphs, Dynamic Programming, Asymptotic Complexity (Big-O)',
        gradeBadge: 'Grade A',
      },
      {
        code: 'CSC-252',
        name: 'Database Management Systems',
        keyTopics: 'Relational Algebra, SQL, Normalization (1NF–BCNF), ACID Transactions',
        gradeBadge: 'Grade A',
      },
      {
        code: 'MTH-154',
        name: 'Discrete Mathematics',
        keyTopics: 'Graph Theory, Combinatorics, Set Theory, Boolean Algebra, Formal Proofs',
        gradeBadge: 'Grade A',
      },
    ],
  },
  {
    id: 'software',
    title: 'Software Engineering',
    icon: Binary,
    modules: [
      {
        code: 'CSC-203',
        name: 'Object-Oriented Programming (Java)',
        keyTopics: 'Polymorphism, Abstraction, Multithreading, Design Patterns, JVM Internals',
        gradeBadge: 'Grade A',
      },
      {
        code: 'CSC-251',
        name: 'Web Technology',
        keyTopics: 'HTTP Protocol, DOM Manipulation, REST APIs, Asynchronous JS, Security',
        gradeBadge: 'Grade A',
      },
      {
        code: 'CSC-301',
        name: 'Software Engineering & SDLC',
        keyTopics: 'Agile Frameworks, UML Modeling, Unit Testing, CI/CD, System Maintenance',
        gradeBadge: 'Grade A',
      },
    ],
  },
];
