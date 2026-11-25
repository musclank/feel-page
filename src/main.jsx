import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const starter = { name: 'ABYXO', ticker: '$ABYXO', tagline: 'Small Creature. Deep Chaos.', description: 'A tiny force from the deepest part of the internet. Join the crew and explore the abyss.', accent: '#9af6d6', link: 'https://feel.cash', socials: '@yourcommunity', banner: 'DEEP SEA COMMUNITY', bannerImage: '', sections: { about: true, token: true, socials: true, cta: true } };
const STORAGE_KEY = 'feel-page-draft-v1';
function getSharedPage() {
  try {
    const raw = new URLSearchParams(window.location.search).get('page');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function App() {
  const sharedPage = getSharedPage();
  const [page, setPage] = useState(() => {
    if (sharedPage) return { ...starter, ...sharedPage };
    try { return { ...starter, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return starter; }
  });
  const [active, setActive] = useState('Overview');
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState('Draft saved on this device');
  useEffect(() => {
    if (!sharedPage) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(page)); setMessage('Draft saved on this device'); }
      catch { setMessage('Draft is only in this session'); }
    }
  }, [page, sharedPage]);
  const update = (key, value) => { setPage(p => ({ ...p, [key]: value })); setMessage('Saving draft…'); };
  const shareUrl = () => window.location.origin + window.location.pathname + '?page=' + encodeURIComponent(JSON.stringify(page));
  const copyShare = async () => {
    try { await navigator.clipboard.writeText(shareUrl()); setMessage('Share link copied'); }
    catch { setMessage('Copy failed — use your browser share/copy option'); }
  };
  if (sharedPage) return <div className="public-page"><div className="public-top"><a className="brand" href={window.location.pathname}><span className="brand-mark">F</span><span>FEEL<span className="brand-light"> PAGE</span></span></a><span>COMMUNITY PAGE PREVIEW</span></div><div className="public-content"><CommunityPage page={page}/><a className="public-edit" href={window.location.pathname}>Create your own page with FEEL PAGE ↗</a></div></div>;
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand-mark">F</span><span>FEEL<span className="brand-light"> PAGE</span></span></a>
      <div className="workspace"><div className="avatar">FP</div><div><b>Creator workspace</b><small>Free plan</small></div><span className="chevron">⌄</span></div>
      <div className="nav-label">WORKSPACE</div>
      {['Overview','Page editor','Appearance','Connections'].map((item,i)=><button key={item} className={'nav-item '+(active===item?'selected':'')} onClick={()=>setActive(item)}><span className="nav-icon">{['◫','✎','◈','↗'][i]}</span>{item}</button>)}
      <div className="sidebar-bottom"><div className="help-card"><div className="help-orb">✦</div><b>Make your page yours</b><p>Tell your story, bring your community together.</p><button onClick={()=>setActive('Page editor')}>Open editor <span>↗</span></button></div><div className="profile"><div className="profile-pic">M</div><div><b>Creator</b><small>Personal account</small></div><span className="dots">•••</span></div></div>
    </aside>
    <main className="main" id="top">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div><div className="top-actions"><span className="status"><i/> {message}</span><button className="btn btn-ghost" onClick={()=>setPreview(!preview)}>{preview?'Back to editor':'Preview page'}</button><button className="btn btn-primary" onClick={copyShare}>{message==='Share link copied'?'Link copied':'Share page'} <span>↗</span></button></div></header>
      <section className="content">
        <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR COMMUNITY, YOUR SPACE</div><h1>Make it feel <em>like yours.</em></h1><p className="intro">A home for your coin, creator brand, and community. No code, just your vibe.</p></div><div className="page-chip"><span className="tiny-live"/> PAGE BUILDER <b>01</b></div></div>
        <div className="stats"><div className="stat"><span>PAGE STATUS</span><strong><i className="stat-dot"/> Draft</strong><small>Saved on this device</small></div><div className="stat"><span>YOUR PAGE</span><strong>/{page.name.toLowerCase().replace(/[^a-z0-9-]/g,'-')}</strong><small>Suggested page slug</small></div><div className="stat"><span>PAGE SECTIONS</span><strong>{Object.values(page.sections||{about:true,token:true,socials:true,cta:true}).filter(Boolean).length} <small className="muted">/ 04</small></strong><small>Build out your story</small></div></div>
        {preview ? <div className="preview-wrap"><div className="preview-top"><span>LIVE PREVIEW</span><button onClick={()=>setPreview(false)}>✕ Close preview</button></div><CommunityPage page={page}/><button className="btn btn-primary share-preview" onClick={copyShare}>Copy shareable preview link ↗</button></div> : <div className="builder-grid">
          <section className="editor-card"><div className="card-heading"><div><div className="section-kicker">01 / PAGE CONTENT</div><h2>Build your page</h2><p>Start with the essentials. You can refine everything later.</p></div><span className="edit-icon">✎</span></div>
            <label>Community name<input value={page.name} onChange={e=>update('name',e.target.value)} placeholder="Your project name"/></label>
            <div className="field-row"><label>Ticker / handle<input value={page.ticker} onChange={e=>update('ticker',e.target.value)} placeholder="$TICKER"/></label><label>Accent color<div className="color-input"><input type="color" value={page.accent} onChange={e=>update('accent',e.target.value)}/><span>{page.accent.toUpperCase()}</span></div></label></div>
            <label>Headline<input value={page.tagline} onChange={e=>update('tagline',e.target.value)} placeholder="A short line that says it all"/></label>
            <label>About your community<textarea rows="4" value={page.description} onChange={e=>update('description',e.target.value)} placeholder="What should visitors know?"/></label>\n            <div className="field-row"><label>Banner label<input value={page.banner} onChange={e=>update('banner',e.target.value)} placeholder="COMMUNITY / PROJECT"/></label><label>Banner image URL<input value={page.bannerImage||''} onChange={e=>update('bannerImage',e.target.value)} placeholder="https://... (optional)"/></label></div>
            <label>Feel.cash link<input value={page.link} onChange={e=>update('link',e.target.value)} placeholder="https://feel.cash/your-coin"/></label>
            <label>Social links<input value={page.socials} onChange={e=>update('socials',e.target.value)} placeholder="X, Telegram, Discord..."/></label>\n            <div className="section-controls"><div className="section-controls-head"><b>Page sections</b><span>SHOW / HIDE</span></div>{[['about','About'],['token','Token info'],['socials','Community links'],['cta','Feel.cash button']].map(([key,label])=><label className="section-toggle" key={key}><span>{label}</span><input type="checkbox" checked={page.sections?.[key] !== false} onChange={e=>update('sections',{...page.sections,[key]:e.target.checked})}/></label>)}</div>
            <div className="editor-footer"><span><span className="save-dot"/> {message}</span><button className="btn btn-primary" onClick={()=>setPreview(true)}>Preview changes <span>→</span></button></div>
          </section>
          <aside className="right-column"><div className="card-heading mini-heading"><div><div className="section-kicker">02 / YOUR DESIGN</div><h2>Page preview</h2></div><span className="view-label">DESKTOP</span></div><CommunityPage page={page}/><div className="tip-card"><div className="tip-icon">✦</div><div><b>Small details, big feel.</b><p>Add a clear story and your main community links so visitors know where to go next.</p></div></div></aside>
        </div>}
        <footer className="page-footer"><span>FEEL PAGE <b>·</b> CREATOR TOOLS</span><span>Built for communities on feel.cash</span></footer>
      </section>
    </main>
  </div>;
}
function CommunityPage({page}) { const bannerStyle = page.bannerImage && /^https:\/\//i.test(page.bannerImage) ? { backgroundImage: `linear-gradient(90deg, #101a22aa, #101a22aa), url("${page.bannerImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}; return <div className="community-card" style={{'--accent':page.accent}}><div className="community-banner" style={bannerStyle}><span>{page.banner||'COMMUNITY PAGE'}</span><div className="banner-lines"/><div className="banner-glow"/></div><div className="community-body"><div className="coin-avatar">{page.name.slice(0,1).toUpperCase()||'F'}</div><div className="community-title"><h3>{page.name||'Your community'}</h3>{page.sections?.token !== false && <span>{page.ticker||'$TICKER'}</span>}</div>{page.sections?.about !== false && <><p className="community-tagline">{page.tagline||'Your community tagline goes here.'}</p><p className="community-description">{page.description||'Introduce your community to the world.'}</p></>}{page.sections?.socials !== false && <div className="community-links"><span>{page.socials||'Social links'}</span><b>↗</b></div>}{page.sections?.cta !== false && <a className="community-cta" href={page.link||'#'} target="_blank" rel="noreferrer">Explore on Feel.cash <span>↗</span></a>}<div className="community-foot"><span>COMMUNITY PAGE</span><span>POWERED BY FEEL PAGE</span></div></div></div> }
createRoot(document.getElementById('root')).render(<App/>);
