import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const starter = { name: 'ABYXO', ticker: '$ABYXO', tagline: 'Small Creature. Deep Chaos.', description: 'A tiny force from the deepest part of the internet. Join the crew and explore the abyss.', accent: '#9af6d6', link: 'https://feel.cash', socials: '@yourcommunity', banner: 'DEEP SEA COMMUNITY' };
function App() {
  const [page, setPage] = useState(starter);
  const [active, setActive] = useState('Overview');
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const update = (key, value) => { setPage(p => ({...p, [key]: value})); setSaved(false); };
  const copySlug = async () => { try { await navigator.clipboard.writeText(`feelpage.pages.dev/${page.name.toLowerCase().replace(/[^a-z0-9-]/g,'-')}`); setSaved(true); } catch { setSaved(false); } };
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand-mark">F</span><span>FEEL<span className="brand-light"> PAGE</span></span></a>
      <div className="workspace"><div className="avatar">FP</div><div><b>Creator workspace</b><small>Free plan</small></div><span className="chevron">⌄</span></div>
      <div className="nav-label">WORKSPACE</div>
      {['Overview','Page editor','Appearance','Connections'].map((item,i)=><button key={item} className={`nav-item ${active===item?'selected':''}`} onClick={()=>setActive(item)}><span className="nav-icon">{['◫','✎','◈','↗'][i]}</span>{item}</button>)}
      <div className="sidebar-bottom"><div className="help-card"><div className="help-orb">✦</div><b>Make your page yours</b><p>Tell your story, bring your community together.</p><button onClick={()=>setActive('Page editor')}>Open editor <span>↗</span></button></div><div className="profile"><div className="profile-pic">M</div><div><b>Creator</b><small>Personal account</small></div><span className="dots">•••</span></div></div>
    </aside>
    <main className="main" id="top">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div><div className="top-actions"><span className="status"><i/> All changes local</span><button className="btn btn-ghost" onClick={()=>setPreview(!preview)}>{preview?'Back to editor':'Preview page'}</button><button className="btn btn-primary" onClick={copySlug}>{saved?'Copied!':'Publish page'} <span>↗</span></button></div></header>
      <section className="content">
        <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR COMMUNITY, YOUR SPACE</div><h1>Make it feel <em>like yours.</em></h1><p className="intro">A home for your coin, creator brand, and community. No code, just your vibe.</p></div><div className="page-chip"><span className="tiny-live"/> PAGE BUILDER <b>01</b></div></div>
        <div className="stats"><div className="stat"><span>PAGE STATUS</span><strong><i className="stat-dot"/> Draft</strong><small>Ready when you are</small></div><div className="stat"><span>YOUR PAGE</span><strong>/{page.name.toLowerCase().replace(/[^a-z0-9-]/g,'-')}</strong><small>Unique community URL</small></div><div className="stat"><span>PAGE SECTIONS</span><strong>04 <small className="muted">/ 06</small></strong><small>Build out your story</small></div></div>
        {preview ? <div className="preview-wrap"><div className="preview-top"><span>LIVE PREVIEW</span><button onClick={()=>setPreview(false)}>✕ Close preview</button></div><CommunityPage page={page}/></div> : <div className="builder-grid">
          <section className="editor-card"><div className="card-heading"><div><div className="section-kicker">01 / PAGE CONTENT</div><h2>Build your page</h2><p>Start with the essentials. You can refine everything later.</p></div><span className="edit-icon">✎</span></div>
            <label>Community name<input value={page.name} onChange={e=>update('name',e.target.value)} placeholder="Your project name"/></label>
            <div className="field-row"><label>Ticker / handle<input value={page.ticker} onChange={e=>update('ticker',e.target.value)} placeholder="$TICKER"/></label><label>Accent color<div className="color-input"><input type="color" value={page.accent} onChange={e=>update('accent',e.target.value)}/><span>{page.accent.toUpperCase()}</span></div></label></div>
            <label>Headline<input value={page.tagline} onChange={e=>update('tagline',e.target.value)} placeholder="A short line that says it all"/></label>
            <label>About your community<textarea rows="4" value={page.description} onChange={e=>update('description',e.target.value)} placeholder="What should visitors know?"/></label>
            <label>Feel.cash link<input value={page.link} onChange={e=>update('link',e.target.value)} placeholder="https://feel.cash/your-coin"/></label>
            <label>Social links<input value={page.socials} onChange={e=>update('socials',e.target.value)} placeholder="X, Telegram, Discord..."/></label>
            <div className="editor-footer"><span><span className="save-dot"/> Draft autosaved in this session</span><button className="btn btn-primary" onClick={()=>setPreview(true)}>Preview changes <span>→</span></button></div>
          </section>
          <aside className="right-column"><div className="card-heading mini-heading"><div><div className="section-kicker">02 / YOUR DESIGN</div><h2>Page preview</h2></div><span className="view-label">DESKTOP</span></div><CommunityPage page={page}/><div className="tip-card"><div className="tip-icon">✦</div><div><b>Small details, big feel.</b><p>Add a clear story and your main community links so visitors know where to go next.</p></div></div></aside>
        </div>}
        <footer className="page-footer"><span>FEEL PAGE <b>·</b> CREATOR TOOLS</span><span>Built for communities on feel.cash</span></footer>
      </section>
    </main>
  </div>;
}
function CommunityPage({page}) { return <div className="community-card" style={{'--accent':page.accent}}><div className="community-banner"><span>{page.banner}</span><div className="banner-lines"/><div className="banner-glow"/></div><div className="community-body"><div className="coin-avatar">{page.name.slice(0,1).toUpperCase()||'F'}</div><div className="community-title"><h3>{page.name||'Your community'}</h3><span>{page.ticker||'$TICKER'}</span></div><p className="community-tagline">{page.tagline||'Your community tagline goes here.'}</p><p className="community-description">{page.description||'Introduce your community to the world.'}</p><div className="community-links"><span>{page.socials||'Social links'}</span><b>↗</b></div><a className="community-cta" href={page.link||'#'} target="_blank" rel="noreferrer">Explore on Feel.cash <span>↗</span></a><div className="community-foot"><span>COMMUNITY PAGE</span><span>POWERED BY FEEL PAGE</span></div></div></div> }

createRoot(document.getElementById('root')).render(<App/>);
