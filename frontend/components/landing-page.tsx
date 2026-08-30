"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUp,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Folder,
  LayoutGrid,
  Mic,
  Plus,
  QrCode,
  Sparkles,
  Store,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";

const videoUrl =
  "https://cdn.prod.website-files.com/694043d273dceabab479f631%2F6a3273754a991939936cb189_bg-vid%20%281%29_webm.webm";

const tabs = {
  Orders: {
    label: "Every table order, captured and ready for your team in real time.",
    prompt: "Show me all open orders for table 12.",
  },
  Tables: {
    label: "See your floor at a glance and keep every table moving.",
    prompt: "Which tables are ready to be cleared?",
  },
  Insights: {
    label: "Turn your restaurant data into calmer, smarter decisions.",
    prompt: "What sold best across my locations this week?",
  },
};

type TabName = keyof typeof tabs;

function BrandMark() {
  return <QrCode className="bird-mark" aria-hidden="true" strokeWidth={2.2} />;
}

function Logo() {
  return (
    <div className="logo">
      <BrandMark />
      <span>MenuQR</span>
    </div>
  );
}

function WorkspaceSidebar() {
  return (
    <aside className="workspace-sidebar">
      <Logo />
      <nav aria-label="Restaurant management">
        <button className="side-item active">
          <LayoutGrid size={16} /> Overview
        </button>
        <button className="side-item">
          <ClipboardList size={16} /> Live Orders
        </button>
        <button className="side-item">
          <Utensils size={16} /> Menu
        </button>
        <button className="side-item">
          <Store size={16} /> Tables
        </button>
        <button className="side-item">
          <CreditCard size={16} /> Payments
        </button>
      </nav>
      <div className="sidebar-section">
        <div className="section-heading">
          <span>Locations</span>
          <Plus size={14} />
        </div>
        {["Downtown Café", "Riverside Grill", "Airport Kitchen"].map((item) => (
          <button className="side-item" key={item}>
            <Folder size={16} /> {item}
          </button>
        ))}
      </div>
      <div className="sidebar-section recents">
        <div className="section-heading">
          <span>Team</span>
          <Users size={14} />
        </div>
        {["Staff & permissions", "Today's sales", "Kitchen display"].map(
          (item) => (
            <button className="recent-item" key={item}>
              {item}
            </button>
          ),
        )}
      </div>
    </aside>
  );
}

function WorkspacePreview({ prompt }: { prompt: string }) {
  return (
    <motion.div
      className="workspace-frame"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <WorkspaceSidebar />
      <section className="chat-panel">
        <div className="chat-topline">
          <span>Live service · 12 open orders</span>
        </div>
        <div className="chat-content">
          <motion.h2
            key={prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Good morning, Alex.
          </motion.h2>
          <p className="date-label">Tuesday, September 8 · Downtown Café</p>
          <div className="prompt-card">
            <div className="prompt-text">
              {prompt}
              <span className="caret" />
            </div>
            <div className="prompt-actions">
              <button aria-label="Add attachment">
                <Plus size={16} />
              </button>
              <span className="mode">
                Mode <ChevronDown size={14} />
              </span>
              <Mic size={17} />
              <button className="send-button" aria-label="Send">
                <ArrowUp size={17} />
              </button>
            </div>
          </div>
          <div className="connect-row">
            <span>Connect your apps to get better answers</span>
            <div className="app-dots">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="suggestions">
            <button>Show today&apos;s top selling dishes</button>
            <button>Summarize open orders for the kitchen</button>
            <button>Which tables need attention?</button>
            <button>
              <Sparkles size={14} /> More insights
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Orders");
  return (
    <main className="littlebird-page">
      <div className="video-layer" aria-hidden="true">
        <video autoPlay muted loop playsInline>
          <source src={videoUrl} type="video/webm" />
        </video>
      </div>
      <header className="site-header">
        <Logo />
        <nav className="main-nav">
          <a href="#features">Features</a>
          <i />
          <a href="#use-cases">Solutions</a>
          <i />
          <a href="#teams">For restaurants</a>
          <i />
          <a href="#pricing">Pricing</a>
          <i />
          <a href="#company">Resources</a>
        </nav>
        <button className="download-button">
          <QrCode size={18} /> Book a demo
        </button>
      </header>
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>Your restaurant, in sync</h1>
          <p>
            MenuQR brings ordering, POS, tables, payments and every location
            <br className="desktop-break" /> together in one beautifully simple
            platform.
          </p>
          <Link href="/onboarding" className="hero-cta">
            <QrCode size={18} /> Get started for free
          </Link>
        </motion.div>
      </section>
      <section className="product-section" id="features">
        <div className="product-heading">
          <div
            className="tab-switcher"
            role="tablist"
            aria-label="MenuQR dashboard views"
          >
            {(Object.keys(tabs) as TabName[]).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? "selected" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {tabs[activeTab].label}
            </motion.p>
          </AnimatePresence>
        </div>
        <WorkspacePreview prompt={tabs[activeTab].prompt} />
      </section>
    </main>
  );
}
