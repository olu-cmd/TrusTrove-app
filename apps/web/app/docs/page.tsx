'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { TopStatusBar } from '@/components/shared/TopStatusBar';
import { 
  BookOpen, 
  Terminal, 
  ExternalLink, 
  FileText, 
  Cpu, 
  Building2, 
  Coins, 
  Code2, 
  Users, 
  Search 
} from 'lucide-react';

interface DocItem {
  title: string;
  path: string;
  description: string;
}

interface DocSection {
  title: string;
  icon: React.ReactNode;
  items: DocItem[];
}

export default function DocsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const baseGitBookUrl = 'https://trustrove.gitbook.io/trustrove';

  const sections: DocSection[] = [
    {
      title: 'Introduction',
      icon: <BookOpen className="w-4 h-4 text-primary" />,
      items: [
        { title: 'What is TrusTrove?', path: '/introduction/what-is-trusttrove', description: 'Overview of the protocol and participant roles.' },
        { title: 'The Problem', path: '/introduction/the-problem', description: 'The traditional trade finance gap and bank limitations.' },
        { title: 'How It Works', path: '/introduction/how-it-works', description: 'Step-by-step transaction flow from creation to repayment.' }
      ]
    },
    {
      title: 'Protocol Core',
      icon: <FileText className="w-4 h-4 text-primary" />,
      items: [
        { title: 'Invoice Lifecycle', path: '/protocol/invoice-lifecycle', description: 'The states and state-transitions of on-chain invoices.' },
        { title: 'Liquidity Pool', path: '/protocol/liquidity-pool', description: 'Share mechanics, utilization rate, and LP deposit/withdrawal.' },
        { title: 'Registry', path: '/protocol/registry', description: 'Verifying SME and buyer profiles.' },
        { title: 'Economic Model', path: '/protocol/economic-model', description: 'Calculations for discount APR and LP yield.' }
      ]
    },
    {
      title: 'Smart Contracts',
      icon: <Cpu className="w-4 h-4 text-primary" />,
      items: [
        { title: 'Overview', path: '/smart-contracts/overview', description: 'Contract dependencies, call graphs, and addresses on Testnet.' },
        { title: 'registry_contract', path: '/smart-contracts/registry-contract', description: 'API definition for the profile registry.' },
        { title: 'invoice_contract', path: '/smart-contracts/invoice-contract', description: 'API definition for managing invoice assets.' },
        { title: 'escrow_contract', path: '/smart-contracts/escrow-contract', description: 'API definition for safe-guarding funds.' },
        { title: 'pool_contract', path: '/smart-contracts/pool-contract', description: 'API definition for liquidity pool management.' }
      ]
    },
    {
      title: 'For SMEs',
      icon: <Building2 className="w-4 h-4 text-primary" />,
      items: [
        { title: 'Getting Started', path: '/for-smes/getting-started', description: 'Setting up Freighter, testnet XLM, and registering as an SME.' },
        { title: 'Create Your First Invoice', path: '/for-smes/create-your-first-invoice', description: 'Filling in detail parameters and listing for financing.' },
        { title: 'Understanding the Discount', path: '/for-smes/understanding-the-discount', description: 'How to calculate your discount rate vs traditional factoring.' }
      ]
    },
    {
      title: 'For Liquidity Providers',
      icon: <Coins className="w-4 h-4 text-primary" />,
      items: [
        { title: 'Getting Started', path: '/for-lps/getting-started', description: 'How to connect Freighter and deposit testnet USDC.' },
        { title: 'Deposit USDC', path: '/for-lps/deposit-usdc', description: 'A step-by-step guide to depositing funds to the pool.' },
        { title: 'Understanding Yield', path: '/for-lps/understanding-yield', description: 'How LP yields accrue, utilization, default risks, and audit notes.' }
      ]
    },
    {
      title: 'Developer Guide',
      icon: <Code2 className="w-4 h-4 text-primary" />,
      items: [
        { title: 'Local Setup', path: '/developer-guide/local-setup', description: 'Cloning, pnpm, Docker postgres, and running indexer/frontend.' },
        { title: 'Environment Variables', path: '/developer-guide/environment-variables', description: 'Configuring local env keys and contract addresses.' },
        { title: 'SDK Reference', path: '/developer-guide/sdk-reference', description: 'TypeScript clients for invoking Soroban contracts.' },
        { title: 'Indexer API Reference', path: '/developer-guide/indexer-api-reference', description: 'Go REST endpoints for querying invoices and pool stats.' }
      ]
    },
    {
      title: 'Contributing',
      icon: <Users className="w-4 h-4 text-primary" />,
      items: [
        { title: 'How to Contribute', path: '/contributing/how-to-contribute', description: 'Finding issues, branch naming, commit format, and Wave bounty details.' }
      ]
    }
  ];

  // Filter sections and items based on search query
  const filteredSections = sections.map(section => {
    const matchingItems = section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...section, items: matchingItems };
  }).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-black">
      {/* Top Status Bar */}
      <TopStatusBar />
      
      {/* Main navigation */}
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 relative">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a2330_1px,transparent_1px),linear-gradient(to_bottom,#1a2330_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 opacity-20 pointer-events-none" />

        {/* Directory Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold font-mono tracking-widest uppercase rounded">
              DOCUMENTATION DIRECTORY
            </span>
            <h1 className="text-3xl font-extrabold font-mono tracking-tight text-white uppercase">
              TRUSTROVE KNOWLEDGE BASE
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Access the official GitBook documentation for the TrusTrove trade finance protocol. Select any document below to view it directly on the hosted knowledge base.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0c131a] border border-border hover:border-primary/50 focus:border-primary text-slate-200 text-xs font-mono rounded outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-[#080d14]/85 border border-border rounded-lg p-5 font-mono flex flex-col justify-between transition-all duration-300 hover:border-border/80"
            >
              <div>
                {/* Section Header */}
                <div className="flex items-center gap-2 border-b border-border/40 pb-3 mb-4">
                  {section.icon}
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest">
                    {section.title}
                  </h2>
                </div>

                {/* Section Items */}
                <ul className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      <a 
                        href={`${baseGitBookUrl}${item.path}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-3 text-slate-300 group-hover:text-primary transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-bold block tracking-wide">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-500 block leading-normal group-hover:text-slate-400 transition-colors">
                            {item.description}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 mt-0.5 opacity-30 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {filteredSections.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-border rounded-lg bg-[#080d14]/40">
              <span className="font-mono text-xs text-slate-600">NO DOCUMENTS MATCHING "{searchQuery.toUpperCase()}" FOUND</span>
            </div>
          )}
        </div>

        {/* GitBook direct banner */}
        <div className="bg-[#0c1420] border border-border/80 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-md text-primary hidden sm:block">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                TrusTrove GitBook Root
              </h3>
              <p className="text-xs text-slate-500 leading-normal max-w-xl">
                Looking for the main page of the GitBook space? Open the root link to browse the full nested index on the hosted platform.
              </p>
            </div>
          </div>
          <a
            href={baseGitBookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-[#0d131a] text-xs font-bold uppercase rounded transition-colors font-mono"
          >
            <span>Visit GitBook Space</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>
    </div>
  );
}
