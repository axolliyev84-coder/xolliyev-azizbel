/* Butun ilova CSS'i (ABCO dizayn tokenlari .cc / .cc.dark da) */
export const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

.cc{
 --paper:#EBEFF7;--surf:#FFFFFF;--surf2:#EFF3FB;--ink:#15233F;--ink2:#3D4E70;--mut:#51617E;--line:rgba(42,66,117,.13);
 --teal:#E37A1D;--tealD:#C2611A;--tealT:rgba(227,122,29,.10);
 --amber:#C2811E;--amberT:rgba(194,129,30,.12);--green:#1A9E54;--greenT:rgba(26,158,84,.10);--red:#D9483F;--redT:rgba(217,72,63,.09);
 --emerald:#E37A1D;--emerald2:#F0993F;--sky:#2A4275;--amber2:#C2811E;--violet:#3A579A;--rose:#D9483F;
 --card:#FFFFFF;--card2:#FFFFFF;--line2:rgba(42,66,117,.24);--text:#15233F;--muted:#51617E;--subtext:#3D4E70;
 --soft:rgba(42,66,117,.03);--soft2:rgba(42,66,117,.05);--soft3:rgba(42,66,117,.09);--track:rgba(42,66,117,.10);
 --header-bg:rgba(235,239,247,.80);--accent-strong:#C2611A;--noise:.022;--gi-op:.16;--mcta-bg:linear-gradient(0deg,rgba(235,239,247,.96),rgba(235,239,247,.6));
 --frame:linear-gradient(135deg,rgba(227,122,29,.55),rgba(42,66,117,.4) 45%,rgba(240,153,63,.55));
 --inner-hl:inset 0 1px 0 rgba(255,255,255,.7);--shadow-card:0 16px 36px -26px rgba(42,66,117,.22);--dot:rgba(42,66,117,.06);
 --radius:20px;--radius-sm:14px;
 --t-em:#C2611A;--t-sky:#2A4275;--t-amb:#C2811E;--t-vio:#3A579A;--t-rose:#D9483F;
 --em-bg:rgba(227,122,29,.10);--sky-bg:rgba(42,66,117,.10);--amb-bg:rgba(194,129,30,.14);--vio-bg:rgba(58,87,154,.12);--rose-bg:rgba(217,72,63,.10);
 --grad:linear-gradient(135deg,#E37A1D,#C2611A);
 --grad-soft:linear-gradient(180deg,rgba(227,122,29,.06),rgba(227,122,29,.02));
 --gold:linear-gradient(135deg,#C2811E,#9A6A1A);
 --hero-bg:radial-gradient(600px 320px at 88% 6%,rgba(227,122,29,.16),transparent 60%),linear-gradient(160deg,#F5F8FD 0%,#FFFFFF 62%);
 --shadow:0 1px 2px rgba(42,66,117,.05),0 6px 18px rgba(42,66,117,.07);
 --shadow-lg:0 18px 48px rgba(20,40,80,.16);
 --serif:'Golos Text',system-ui,sans-serif;--sans:'Golos Text',system-ui,sans-serif;--mono:'JetBrains Mono',monospace;
 font-family:var(--sans);color:var(--ink);background:
   radial-gradient(900px 500px at 10% -8%,rgba(227,122,29,.10),transparent 60%),
   radial-gradient(820px 520px at 96% 0%,rgba(42,66,117,.07),transparent 55%),
   var(--paper);
 min-height:100vh;-webkit-font-smoothing:antialiased;}
.cc.dark{
 --paper:#0A1022;--surf:#131E3C;--surf2:#1B2A4E;--ink:#EAF0FA;--ink2:#C3D0E4;--mut:#9FB0CE;--line:rgba(255,255,255,.09);
 --teal:#F2913A;--tealD:#FFB570;--tealT:rgba(242,145,58,.14);
 --amber:#F0A93C;--amberT:rgba(240,169,60,.16);--green:#3DD17F;--greenT:rgba(61,209,127,.14);--red:#F2685C;--redT:rgba(242,104,92,.14);
 --emerald:#F2913A;--emerald2:#FFB570;--sky:#3C5BA8;--amber2:#F0A93C;--violet:#86A1E2;--rose:#F2685C;
 --card:#131E3C;--card2:#0E1730;--line2:rgba(255,255,255,.17);--text:#EAF0FA;--muted:#9FB0CE;--subtext:#C3D0E4;
 --soft:rgba(255,255,255,.02);--soft2:rgba(255,255,255,.04);--soft3:rgba(255,255,255,.08);--track:rgba(255,255,255,.07);
 --header-bg:rgba(10,16,34,.72);--accent-strong:#F2913A;--noise:.035;--gi-op:.10;--mcta-bg:linear-gradient(0deg,rgba(10,16,34,.96),rgba(10,16,34,.6));
 --frame:linear-gradient(135deg,rgba(242,145,58,.7),rgba(60,91,168,.5) 45%,rgba(255,181,112,.7));
 --inner-hl:inset 0 1px 0 rgba(255,255,255,.06);--shadow-card:0 16px 38px -26px rgba(0,0,0,.78);--dot:rgba(255,255,255,.05);
 --radius:20px;--radius-sm:14px;
 --t-em:#FFB570;--t-sky:#86A1E2;--t-amb:#F0A93C;--t-vio:#9AB0E0;--t-rose:#F2685C;
 --em-bg:rgba(242,145,58,.14);--sky-bg:rgba(60,91,168,.18);--amb-bg:rgba(240,169,60,.16);--vio-bg:rgba(134,161,226,.16);--rose-bg:rgba(242,104,92,.14);
 --grad:linear-gradient(135deg,#F2913A,#C76A18);
 --grad-soft:linear-gradient(180deg,rgba(242,145,58,.10),rgba(242,145,58,.035));
 --gold:linear-gradient(135deg,#F0A93C,#C2811E);
 --hero-bg:radial-gradient(600px 320px at 88% 6%,rgba(242,145,58,.20),transparent 60%),linear-gradient(160deg,#0E1730 0%,#0A1022 62%);
 --shadow:0 1px 2px rgba(0,0,0,.3),0 10px 28px rgba(0,0,0,.42);
 --shadow-lg:0 22px 56px rgba(0,0,0,.55);
 background:
   radial-gradient(900px 500px at 10% -8%,rgba(242,145,58,.13),transparent 60%),
   radial-gradient(820px 520px at 96% 0%,rgba(60,91,168,.14),transparent 55%),
   radial-gradient(700px 600px at 60% 120%,rgba(42,66,117,.12),transparent 60%),
   var(--paper);}
.cc *{box-sizing:border-box;}
html,body{margin:0;padding:0;}
.cc-feed-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:22px 0 8px;flex-wrap:wrap;}
.cc :focus{outline:none;}
.cc :focus-visible{outline:2px solid var(--teal);outline-offset:2px;}
.cc hr{border:0;border-top:1px solid var(--line);}
.cc-boot{display:flex;gap:10px;align-items:center;justify-content:center;padding:90px;color:var(--ink2);}
.cc-spin{animation:ccspin 1s linear infinite;}
@keyframes ccspin{to{transform:rotate(360deg);}}

/* header */
.cc-top{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 18px;
 background:color-mix(in srgb,var(--paper) 78%,transparent);backdrop-filter:blur(14px) saturate(140%);border-bottom:1px solid var(--line);}
.cc-top-r{display:flex;align-items:center;gap:9px;flex:0 0 auto;position:relative;}
.cc-burger{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:13px;background:var(--surf);border:1px solid var(--line);color:var(--ink);cursor:pointer;box-shadow:var(--shadow);transition:.16s;}
.cc-burger:hover{border-color:var(--teal);color:var(--teal);transform:translateY(-1px);}
.cc-scrollbar{position:fixed;top:0;left:0;right:0;height:3px;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,var(--teal),var(--sky));z-index:90;pointer-events:none;transition:transform .1s linear;}
.cc-menu-head{display:flex;align-items:center;gap:11px;padding:9px 10px 11px;border-bottom:1px solid var(--line);margin-bottom:5px;}
.cc-menu-hi{display:flex;flex-direction:column;line-height:1.25;}
.cc-menu-hi b{font-size:14px;font-weight:700;color:var(--ink);}
.cc-menu-hi small{font-size:11px;color:var(--mut);font-weight:600;letter-spacing:.04em;}
.cc-menu-i.danger{color:var(--red);}
.cc-menu-i.danger:hover{background:var(--redT);color:var(--red);}
.cc-menu-i.danger svg{color:var(--red);}
.cc-brand{display:flex;align-items:center;gap:11px;background:transparent;border:0;cursor:pointer;font-family:var(--sans);}
.cc-brand-m{width:40px;height:40px;border-radius:12px;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;
 box-shadow:0 8px 20px rgba(14,123,102,.4);}
.cc-brand-m.abco-logo{width:auto;height:42px;padding:0 15px;border-radius:999px;background:var(--surf);border:2.5px solid var(--sky);color:var(--teal);font-family:var(--sans);font-weight:900;font-size:18px;letter-spacing:-.05em;box-shadow:var(--shadow);position:relative;overflow:hidden;}
.cc-brand-m.abco-logo::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 32%,rgba(255,255,255,.55) 50%,transparent 68%);transform:translateX(-130%);animation:ccsheen 5s ease-in-out infinite;pointer-events:none;}
@keyframes ccsheen{0%,62%{transform:translateX(-130%);}100%{transform:translateX(130%);}}
.cc-brand-n{font-family:var(--serif);font-size:20px;font-weight:600;display:block;line-height:1;text-align:left;letter-spacing:-.01em;}
.cc-brand-s{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--mut);display:block;margin-top:4px;text-align:left;font-weight:600;}
.cc-brand,.cc-tcard,.cc-act,.cc-card,.cc-acc-h{color:var(--ink);}
.cc-home-btn{display:flex;align-items:center;gap:7px;background:var(--surf);border:1px solid var(--line);border-radius:11px;padding:9px 14px;font-size:13px;font-weight:600;color:var(--ink);cursor:pointer;font-family:var(--sans);box-shadow:var(--shadow);transition:.15s;}
.cc-home-btn:hover{border-color:var(--teal);color:var(--teal);transform:translateY(-1px);}
.cc-icon-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:11px;background:var(--surf);border:1px solid var(--line);color:var(--ink2);cursor:pointer;box-shadow:var(--shadow);transition:.15s;}
.cc-icon-btn:hover{color:var(--teal);border-color:var(--teal);transform:translateY(-1px);}
.cc-icon-btn.sm{width:32px;height:32px;border-radius:9px;box-shadow:none;}
.cc-auth{display:flex;align-items:center;gap:9px;background:var(--surf);border:1px solid var(--line);border-radius:13px;padding:5px 7px 5px 6px;box-shadow:var(--shadow);}
.cc-avatar{width:30px;height:30px;border-radius:9px;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;}
.cc-avatar.sm{width:24px;height:24px;border-radius:7px;font-size:11px;}
.cc-auth-name{font-size:13px;font-weight:600;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

.cc-main{max-width:880px;margin:0 auto;padding:26px 18px 80px;}
.cc-view{animation:ccin .35s ease;}
@keyframes ccin{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}

.cc-kick{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--teal);font-weight:700;}
.cc-h1{font-family:var(--serif);font-size:34px;font-weight:600;letter-spacing:-.02em;margin:7px 0 9px;line-height:1.08;}
.cc-h1.sm{font-size:26px;margin:0;}
.cc-lead,.cc-note-lead{font-size:14.5px;color:var(--ink2);line-height:1.62;}
.cc-note-lead{margin:0 0 18px;}

/* hero */
.cc-hero{position:relative;margin-bottom:24px;padding:30px 26px;border-radius:22px;overflow:hidden;
 background:var(--grad-soft);border:1px solid var(--line);box-shadow:var(--shadow);}
.cc-hero-glow{position:absolute;right:-60px;top:-70px;width:230px;height:230px;border-radius:50%;background:var(--grad);filter:blur(60px);opacity:.12;pointer-events:none;}
.cc-hero-ic{position:absolute;right:18px;bottom:-14px;display:flex;gap:13px;align-items:flex-end;color:var(--teal);opacity:.10;pointer-events:none;}
.cc-hero-tags{position:relative;display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}
.cc-hero-tags span{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:var(--tealD);background:var(--surf);border:1px solid var(--line);border-radius:20px;padding:5px 11px;box-shadow:var(--shadow);}
.cc-hero-tags span svg{color:var(--teal);}
.cc-hero .cc-lead{max-width:560px;position:relative;}
.cc-hero .cc-h1{position:relative;}

/* stats */
.cc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;}
.cc-stat{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:15px 16px;display:flex;flex-direction:column;gap:2px;box-shadow:var(--shadow);}
.cc-stat svg{color:var(--teal);}
.cc-stat b{font-family:var(--serif);font-size:24px;font-weight:600;margin-top:7px;letter-spacing:-.01em;}
.cc-stat small{font-size:11px;color:var(--mut);font-weight:500;}

/* topic cards */
.cc-topics{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px;}
.cc-tcard{position:relative;text-align:left;background:var(--surf);border:1px solid var(--line);border-radius:18px;padding:20px;cursor:pointer;font-family:var(--sans);overflow:hidden;box-shadow:var(--shadow);transition:transform .16s,box-shadow .16s,border-color .16s;}
.cc-tcard::before{content:"";position:absolute;left:0;top:0;height:3px;width:100%;background:var(--grad);opacity:0;transition:.2s;}
.cc-tcard:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);border-color:transparent;}
.cc-tcard:hover::before{opacity:1;}
.cc-tcard-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;}
.cc-tcode{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--tealD);background:var(--tealT);padding:4px 10px;border-radius:8px;letter-spacing:.02em;}
.cc-tcode.big{font-size:13px;}
.cc-tcard-arr{color:var(--mut);transition:.2s;}
.cc-tcard:hover .cc-tcard-arr{color:var(--teal);transform:translateX(3px);}
.cc-tcard-title{font-family:var(--serif);font-size:20px;font-weight:600;line-height:1.18;margin-bottom:6px;letter-spacing:-.01em;}
.cc-tcard-meta{font-size:12px;color:var(--mut);margin-bottom:13px;font-weight:500;}
.cc-tcard-foot{display:flex;justify-content:space-between;font-size:11.5px;color:var(--ink2);margin-top:9px;font-weight:600;}
.cc-track{height:7px;background:var(--surf2);border-radius:20px;overflow:hidden;}
.cc-track-f{height:100%;background:var(--grad);border-radius:20px;transition:width .4s ease;}

/* action buttons (home) */
.cc-actions{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.cc-act{display:flex;align-items:center;gap:14px;text-align:left;background:var(--surf);border:1px solid var(--line);border-radius:18px;padding:18px;cursor:pointer;font-family:var(--sans);color:var(--ink);box-shadow:var(--shadow);transition:.16s;}
.cc-act:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);}
.cc-act>svg:first-child{width:42px;height:42px;padding:10px;border-radius:12px;background:var(--tealT);color:var(--teal);flex:none;}
.cc-act.amber>svg:first-child{background:var(--amberT);color:var(--amber);}
.cc-act>div{flex:1;}
.cc-act b{display:block;font-size:15px;font-weight:700;}
.cc-act small{display:block;font-size:12px;color:var(--mut);margin-top:3px;}
.cc-act>svg:last-child{color:var(--mut);}

/* back + topic head */
.cc-back{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:var(--ink2);font-size:13.5px;font-weight:600;cursor:pointer;font-family:var(--sans);margin-bottom:16px;padding:4px 0;}
.cc-back:hover{color:var(--teal);}
.cc-thead{display:flex;align-items:center;gap:13px;margin-bottom:18px;flex-wrap:wrap;}
.cc-thead-ic{color:var(--teal);}
.cc-thead-ic.amber{color:var(--amber);}

/* tabs */
.cc-tabs{display:flex;gap:6px;background:var(--surf);border:1px solid var(--line);border-radius:14px;padding:6px;margin-bottom:22px;overflow-x:auto;box-shadow:var(--shadow);}
.cc-tab{display:flex;align-items:center;gap:7px;white-space:nowrap;background:transparent;border:0;border-radius:10px;padding:10px 15px;font-size:13.5px;font-weight:600;color:var(--ink2);cursor:pointer;font-family:var(--sans);transition:.15s;}
.cc-tab:hover{color:var(--ink);background:var(--surf2);}
.cc-tab.on{background:var(--grad);color:#fff;box-shadow:0 6px 16px rgba(14,123,102,.34);}
.cc-tab-ic{display:flex;}

/* accordion (theory) */
.cc-acc{display:flex;flex-direction:column;gap:11px;}
.cc-acc-i{background:var(--surf);border:1px solid var(--line);border-radius:15px;overflow:hidden;box-shadow:var(--shadow);}
.cc-acc-i.open{border-color:color-mix(in srgb,var(--teal) 35%,var(--line));}
.cc-acc-h{width:100%;display:flex;align-items:center;gap:13px;background:transparent;border:0;padding:16px 18px;cursor:pointer;font-family:var(--sans);text-align:left;color:var(--ink);}
.cc-acc-n{width:28px;height:28px;flex:none;border-radius:9px;background:var(--tealT);color:var(--tealD);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;font-family:var(--mono);}
.cc-acc-i.open .cc-acc-n{background:var(--grad);color:#fff;}
.cc-acc-t{flex:1;font-weight:700;font-size:15px;}
.cc-acc-c{color:var(--mut);transition:transform .2s;}
.cc-acc-i.open .cc-acc-c{transform:rotate(180deg);color:var(--teal);}
.cc-acc-b{padding:4px 18px 18px;border-top:1px solid var(--line);}

/* content blocks */
.cc-p{font-size:14.5px;line-height:1.7;color:var(--ink2);margin:12px 0;}
.cc-ul,.cc-ol{margin:10px 0;padding-left:20px;font-size:14.5px;line-height:1.7;color:var(--ink2);}
.cc-ul li,.cc-ol li{margin:6px 0;}
.cc-ul li::marker{color:var(--teal);}
.cc-ol li::marker{color:var(--teal);font-weight:700;}
.cc-call{display:flex;gap:10px;align-items:flex-start;border-radius:13px;padding:13px 15px;margin:14px 0;font-size:13.5px;line-height:1.6;}
.cc-call svg{flex:none;margin-top:2px;}
.cc-call.note{background:var(--tealT);color:var(--ink2);border:1px solid color-mix(in srgb,var(--teal) 22%,transparent);}
.cc-call.note svg{color:var(--teal);}
.cc-call.warn{background:var(--amberT);color:var(--ink2);border:1px solid color-mix(in srgb,var(--amber) 26%,transparent);}
.cc-call.warn svg{color:var(--amber);}
.cc-call b{color:var(--ink);}
.cc-formula{display:flex;align-items:center;gap:10px;background:var(--surf2);border:1px dashed color-mix(in srgb,var(--teal) 32%,var(--line));border-radius:11px;padding:12px 15px;margin:13px 0;font-family:var(--mono);font-size:14px;font-weight:600;color:var(--ink);}
.cc-formula svg{color:var(--teal);flex:none;}
.cc-def{display:flex;flex-wrap:wrap;gap:6px;align-items:baseline;padding:11px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.6;color:var(--ink2);}
.cc-def-t{font-weight:700;color:var(--ink);font-family:var(--serif);font-size:15.5px;}
.cc-def-d{color:var(--mut);}

/* flashcards */
.cc-cards-top{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--ink2);margin-bottom:11px;font-weight:600;}
.cc-switch{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--mut);cursor:pointer;font-weight:500;}
.cc-switch input{accent-color:var(--teal);width:15px;height:15px;}
.cc-card{position:relative;width:100%;min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;
 background:var(--surf);border:1px solid var(--line);border-radius:22px;padding:34px 26px;margin:14px 0;cursor:pointer;font-family:var(--sans);box-shadow:var(--shadow);transition:.18s;}
.cc-card:hover{box-shadow:var(--shadow-lg);}
.cc-card.flip{background:var(--grad-soft);border-color:color-mix(in srgb,var(--teal) 30%,var(--line));}
.cc-card.done{border-color:color-mix(in srgb,var(--green) 45%,var(--line));}
/* 3D flip fleshkart */
.cc-card3d{position:relative;width:100%;min-height:240px;margin:14px 0;cursor:pointer;perspective:1500px;font-family:var(--sans);}
.cc-card3d:focus-visible{outline:2px solid var(--teal);outline-offset:3px;border-radius:22px;}
.cc-card3d-in{position:relative;width:100%;min-height:240px;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.2,.85,.25,1);}
.cc-card3d.flip .cc-card3d-in{transform:rotateY(180deg);}
.cc-card-face{position:absolute;inset:0;width:100%;min-height:240px;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;border-radius:22px;padding:40px 26px;border:1px solid var(--line);box-shadow:var(--shadow);overflow:auto;}
.cc-card-front{background:var(--surf);}
.cc-card-back{background:var(--grad);border-color:transparent;transform:rotateY(180deg);}
.cc-card-back .cc-card-tx{color:#fff;}
.cc-card-back .cc-card-tag{color:rgba(255,255,255,.92);}
.cc-card3d.done .cc-card-front{border-color:color-mix(in srgb,var(--green) 50%,var(--line));}
.cc-card3d:hover .cc-card-face{box-shadow:var(--shadow-lg);}
.cc-card-tag{position:absolute;top:16px;left:18px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);font-weight:700;}
.cc-card-tx{font-family:var(--serif);font-size:21px;line-height:1.36;font-weight:500;color:var(--ink);max-width:560px;}
.cc-card-hint{position:absolute;bottom:16px;font-size:11.5px;color:var(--mut);}
.cc-card-act{display:flex;gap:10px;justify-content:center;margin-top:4px;}
.cc-card-nav{display:flex;gap:10px;justify-content:center;margin-top:14px;}
.cc-mini{width:42px;height:42px;border-radius:12px;background:var(--surf);border:1px solid var(--line);color:var(--ink2);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);transition:.15s;}
.cc-mini:hover{color:var(--teal);border-color:var(--teal);transform:translateY(-1px);}

/* buttons */
.cc-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid var(--line);background:var(--surf);color:var(--ink);border-radius:12px;padding:11px 18px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:var(--sans);transition:.15s;box-shadow:var(--shadow);}
.cc-btn:hover{transform:translateY(-1px);}
.cc-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.cc-btn.primary{background:var(--grad);border-color:transparent;color:#fff;box-shadow:0 8px 20px rgba(14,123,102,.34);}
.cc-btn.amber{background:var(--gold);border-color:transparent;color:#fff;box-shadow:0 8px 18px rgba(162,118,30,.3);}
.cc-btn.ghost{background:var(--surf);color:var(--ink2);}
.cc-btn.ghost:hover{color:var(--teal);border-color:var(--teal);}
.cc-btn.ghost.sm{padding:8px 13px;font-size:12.5px;box-shadow:none;}
.cc-btn.yes{background:var(--green);border-color:transparent;color:#fff;box-shadow:0 8px 18px rgba(43,164,92,.3);}
.cc-btn.dno{background:var(--surf);color:var(--red);border-color:color-mix(in srgb,var(--red) 35%,var(--line));}
.cc-sp{display:inline-flex;align-items:center;gap:8px;}

/* tasks / problems */
.cc-task,.cc-prob{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow);}
.cc-task-h{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;margin-bottom:10px;color:var(--ink);}
.cc-task-h svg{color:var(--teal);flex:none;}
.cc-task-h.hw svg{color:var(--amber);}
.cc-task-c,.cc-prob-c{font-size:14px;line-height:1.66;color:var(--ink2);margin:0 0 14px;}
.cc-sol{margin-top:14px;border-top:1px dashed var(--line);padding-top:14px;animation:ccin .3s ease;}
.cc-step{display:flex;gap:11px;margin:10px 0;font-size:13.8px;line-height:1.6;color:var(--ink2);}
.cc-step-n{width:24px;height:24px;flex:none;border-radius:8px;background:var(--tealT);color:var(--tealD);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;font-family:var(--mono);}
.cc-step b{color:var(--ink);}
.cc-ans{display:flex;gap:9px;align-items:flex-start;background:var(--greenT);border:1px solid color-mix(in srgb,var(--green) 30%,transparent);border-radius:12px;padding:13px 15px;margin-top:14px;font-size:13.8px;font-weight:600;color:var(--ink);line-height:1.55;}
.cc-ans svg{color:var(--green);flex:none;margin-top:2px;}
.cc-badge{font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--amber);background:var(--amberT);padding:3px 9px;border-radius:20px;margin-left:auto;}

/* problem header + level */
.cc-prob-h{display:flex;align-items:center;gap:10px;margin-bottom:11px;flex-wrap:wrap;}
.cc-prob-t{font-weight:700;font-size:14.5px;color:var(--ink);flex:1;min-width:140px;}
.cc-lvl{font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--green);background:var(--greenT);padding:3px 9px;border-radius:20px;}
.cc-lvl.hard{color:var(--amber);background:var(--amberT);}

/* filters / chips */
.cc-filters{display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
.cc-chips{display:flex;flex-wrap:wrap;gap:8px;}
.cc-chip{display:inline-flex;align-items:center;gap:6px;background:var(--surf);border:1px solid var(--line);border-radius:20px;padding:7px 14px;font-size:12.5px;font-weight:600;color:var(--ink2);cursor:pointer;font-family:var(--sans);transition:.15s;box-shadow:var(--shadow);}
.cc-chip:hover{color:var(--teal);border-color:var(--teal);}
.cc-chip.on{background:var(--grad);border-color:transparent;color:#fff;box-shadow:0 6px 14px rgba(14,123,102,.3);}
.cc-chip.lvl.on{background:var(--gold);box-shadow:0 6px 14px rgba(162,118,30,.28);}
.cc-prob-count{font-size:12px;color:var(--mut);font-weight:600;margin:2px 0 14px;}

/* exam hero + seg tabs */
.cc-exam-hero{display:flex;align-items:center;gap:15px;margin-bottom:20px;padding:22px;border-radius:20px;background:var(--grad-soft);border:1px solid var(--line);box-shadow:var(--shadow);}
.cc-exam-badge{width:52px;height:52px;flex:none;border-radius:15px;background:var(--gold);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 22px rgba(162,118,30,.32);}
.cc-exam-sub{font-size:13.5px;color:var(--ink2);margin:5px 0 0;line-height:1.5;}
.cc-seg-tabs{display:flex;gap:6px;background:var(--surf);border:1px solid var(--line);border-radius:14px;padding:6px;margin-bottom:22px;box-shadow:var(--shadow);}
.cc-seg-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:transparent;border:0;border-radius:10px;padding:12px;font-size:14px;font-weight:700;color:var(--ink2);cursor:pointer;font-family:var(--sans);transition:.15s;}
.cc-seg-tab:hover{color:var(--ink);background:var(--surf2);}
.cc-seg-tab.on{background:var(--grad);color:#fff;box-shadow:0 6px 16px rgba(14,123,102,.34);}

/* length selector */
.cc-len{margin:6px 0 18px;display:flex;flex-direction:column;gap:9px;align-items:center;}
.cc-len-l{font-size:13px;color:var(--mut);font-weight:600;}
.cc-len-opts{display:flex;gap:8px;}
.cc-len-b{min-width:48px;padding:9px 14px;border-radius:11px;background:var(--surf);border:1px solid var(--line);color:var(--ink2);font-weight:700;font-size:13.5px;cursor:pointer;font-family:var(--sans);transition:.15s;}
.cc-len-b:hover{border-color:var(--teal);color:var(--teal);}
.cc-len-b.on{background:var(--grad);border-color:transparent;color:#fff;box-shadow:0 6px 14px rgba(14,123,102,.3);}

/* quiz */
.cc-quiz-i,.cc-done{display:flex;flex-direction:column;align-items:center;text-align:center;gap:13px;background:var(--surf);border:1px solid var(--line);border-radius:20px;padding:42px 28px;box-shadow:var(--shadow);}
.cc-quiz-i>svg,.cc-done>svg{color:var(--teal);}
.cc-quiz-i h2,.cc-done h2{font-family:var(--serif);font-size:23px;font-weight:600;margin:0;}
.cc-quiz-i p,.cc-done p{font-size:14px;color:var(--ink2);margin:0;max-width:460px;line-height:1.6;}
.cc-done-p{font-family:var(--serif);font-size:60px;font-weight:700;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;line-height:1;}
.cc-done-a{display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;justify-content:center;}
.cc-quiz-top{font-size:13px;font-weight:700;color:var(--ink2);margin-bottom:11px;display:flex;align-items:center;gap:10px;}
.cc-exam-code{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--tealD);background:var(--tealT);padding:3px 8px;border-radius:7px;}
/* --- Подготовка к экзамену --- */
.cc-prep-hero{display:flex;gap:22px;align-items:center;background:var(--surf);border:1px solid var(--line);border-radius:20px;padding:24px 26px;box-shadow:var(--shadow);margin-bottom:18px;flex-wrap:wrap;}
.cc-prep-ring{width:118px;height:118px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;}
.cc-prep-ring-in{width:90px;height:90px;border-radius:50%;background:var(--surf);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;}
.cc-prep-ring-in b{font-size:23px;font-weight:800;color:var(--ink);font-family:var(--sans);font-variant-numeric:tabular-nums;}
.cc-prep-ring-in span{font-size:10.5px;color:var(--ink2);}
.cc-prep-vt{flex:1;min-width:230px;}
.cc-prep-vt h3{margin:0 0 6px;font-size:18px;font-weight:800;color:var(--ink);font-family:var(--sans);}
.cc-prep-vt p{margin:0 0 13px;font-size:13.5px;color:var(--ink2);line-height:1.55;}
.cc-prep-acts{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
.cc-prep-best{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;color:var(--tealD);background:var(--tealT);padding:7px 12px;border-radius:999px;}
.cc-prep-list{display:flex;flex-direction:column;gap:8px;}
.cc-prep-row{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surf);border:1px solid var(--line);border-radius:14px;cursor:pointer;text-align:left;font-family:var(--sans);transition:.15s;box-shadow:var(--shadow);width:100%;}
.cc-prep-row:hover{border-color:var(--teal);transform:translateY(-1px);}
.cc-prep-row.static{cursor:default;box-shadow:none;} .cc-prep-row.static:hover{border-color:var(--line);transform:none;}
.cc-prep-name{flex:1;font-size:13.5px;font-weight:600;color:var(--ink);min-width:120px;}
.cc-prep-weak{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:var(--rose);background:var(--rose-bg);padding:4px 8px;border-radius:999px;flex:none;}
.cc-prep-bar{width:130px;height:8px;border-radius:99px;background:var(--line);overflow:hidden;flex:none;}
.cc-prep-bar i{display:block;height:100%;border-radius:99px;transition:width .5s ease;}
.cc-prep-bar i.g{background:linear-gradient(90deg,#3FA46A,#2C7A4D);}
.cc-prep-bar i.m{background:linear-gradient(90deg,#F0A93C,#C2811E);}
.cc-prep-bar i.w{background:linear-gradient(90deg,var(--rose),#A33232);}
.cc-prep-pct{width:46px;text-align:right;font-size:13px;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums;flex:none;}
.cc-prep-timer{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:13px;font-weight:700;color:var(--tealD);background:var(--tealT);padding:5px 11px;border-radius:999px;font-variant-numeric:tabular-nums;}
.cc-prep-timer.danger{color:#fff;background:var(--rose);animation:prepblink 1s steps(2) infinite;}
@keyframes prepblink{50%{opacity:.55;}}
.cc-opt.sel{border-color:var(--teal);background:var(--tealT);}
.cc-prep-nav{display:flex;gap:10px;justify-content:space-between;}
.cc-prep-hint{font-size:12px;color:var(--ink2);text-align:center;margin-top:10px;}
.cc-prep-time{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--ink2);font-weight:600;}
.cc-prep-brk,.cc-prep-mist,.cc-prep-log{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:18px 20px;box-shadow:var(--shadow);margin-top:16px;}
.cc-prep-brk h4,.cc-prep-mist h4,.cc-prep-log h4{margin:0 0 12px;font-size:14px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:7px;font-family:var(--sans);}
.cc-prep-brk .cc-prep-list{gap:6px;}
.cc-prep-m+.cc-prep-m{border-top:1px solid var(--line);}
.cc-prep-m{padding:13px 0 4px;}
.cc-prep-mq{font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:8px;line-height:1.5;}
.cc-prep-ma{display:flex;align-items:flex-start;gap:7px;font-size:13px;margin:4px 0;line-height:1.45;}
.cc-prep-ma.bad{color:var(--rose);} .cc-prep-ma.good{color:#2C7A4D;}
.cc.dark .cc-prep-ma.good{color:#5BC98C;}
.cc-prep-mex{font-size:12.5px;color:var(--ink2);margin:8px 0 10px;line-height:1.5;background:var(--tealT);border-radius:10px;padding:9px 12px;}
.cc-prep-log-r{display:flex;gap:14px;align-items:center;font-size:13px;color:var(--ink2);padding:8px 0;border-top:1px solid var(--line);font-variant-numeric:tabular-nums;}
.cc-prep-log-r span{display:inline-flex;align-items:center;gap:5px;}
.cc-prep-log-r b{margin-left:auto;font-size:13.5px;}
.cc-prep-log-r b.ok{color:#2C7A4D;} .cc.dark .cc-prep-log-r b.ok{color:#5BC98C;}
.cc-prep-log-r b.bad{color:var(--rose);}
/* --- imtihon varianti (Подготовка к экзамену) --- */
.cc-pv-top{position:sticky;top:74px;z-index:6;display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:var(--surf);border:1px solid var(--line);border-radius:13px;padding:9px 14px;box-shadow:var(--shadow);margin-bottom:14px;}
.cc-pv-cnt{font-size:12.5px;color:var(--ink2);font-weight:600;}
.cc-pv-cnt b{color:var(--ink);}
.cc-pv-list{display:flex;flex-direction:column;gap:14px;}
.cc-pv-q{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:16px 18px;box-shadow:var(--shadow);}
.cc-pv-qh{display:flex;align-items:center;gap:9px;margin-bottom:10px;flex-wrap:wrap;}
.cc-pv-pt{font-size:14px;color:var(--ink);font-family:var(--sans);}
.cc-pv-num{min-width:26px;height:26px;padding:0 4px;border-radius:8px;background:var(--tealT);color:var(--tealD);font-weight:800;font-size:12.5px;display:inline-flex;align-items:center;justify-content:center;flex:none;font-family:var(--mono);}
.cc-pv-qt{font-size:14px;font-weight:700;color:var(--ink);line-height:1.55;margin-bottom:11px;}
.cc-pv-prob{font-size:13.5px;color:var(--ink);line-height:1.65;margin-bottom:11px;white-space:pre-line;}
.cc-pv-q .cc-ta{margin-bottom:0;}
.cc-pv-fin{margin-top:18px;display:flex;justify-content:center;}
.cc-pv-fin>.cc-btn{padding:13px 26px;font-size:14px;}
.cc-pv-warn{background:var(--rose-bg);border:1px solid var(--rose);border-radius:14px;padding:14px 18px;font-size:13.5px;color:var(--ink);display:flex;flex-direction:column;gap:11px;align-items:center;text-align:center;width:100%;}
.cc-pv-warn span{display:inline-flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:center;}
.cc-pv-warn-a{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
.cc-pv-lvl{font-size:12px;font-weight:700;color:var(--tealD);background:var(--tealT);border-radius:999px;padding:4px 10px;vertical-align:middle;margin-left:6px;}
.cc-pv-ball{margin-left:auto;font-family:var(--mono);font-size:12px;font-weight:800;border-radius:999px;padding:4px 10px;flex:none;}
.cc-pv-ball.g{background:rgba(63,164,106,.15);color:#2C7A4D;} .cc.dark .cc-pv-ball.g{color:#5BC98C;}
.cc-pv-ball.m{background:var(--amb-bg);color:var(--amber2);}
.cc-pv-ball.w{background:var(--rose-bg);color:var(--rose);}
.cc-pv-stud{font-size:13px;color:var(--ink);border:1px dashed var(--line);border-radius:10px;padding:10px 13px;margin:8px 0;line-height:1.6;white-space:pre-wrap;}
.cc-pv-stud b{display:block;margin-bottom:4px;}
.cc-pv-studtxt{margin-top:8px;}
/* imtihon: rasm yuklash */
.cc-imgrow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px;}
.cc-imgbtn{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--tealD);background:var(--tealT);border:1px solid var(--teal);border-radius:11px;padding:9px 14px;cursor:pointer;font-family:var(--sans);transition:.15s;}
.cc-imgbtn:hover{background:var(--teal);color:#fff;}
.cc-imgbtn.busy{opacity:.7;cursor:default;}
.cc-imgprev{display:inline-flex;align-items:center;gap:9px;}
.cc-imgthumb{width:52px;height:52px;object-fit:cover;border-radius:9px;border:1px solid var(--line);box-shadow:var(--shadow);}
.cc-imgthumb.lg{width:auto;max-width:min(260px,100%);height:auto;max-height:200px;object-fit:contain;display:block;margin:6px 0;cursor:zoom-in;}
.cc-imgdel{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;color:var(--red);background:var(--redT);border:none;border-radius:9px;padding:6px 10px;cursor:pointer;font-family:var(--sans);}
.cc-imgdel:hover{background:var(--red);color:#fff;}
.cc-pv-ref{margin-top:10px;border-top:1px dashed var(--line);padding-top:10px;font-size:13px;color:var(--ink2);line-height:1.6;}
.cc-pv-ref>b{color:var(--ink);display:block;margin-bottom:6px;}
.cc-pv-step{margin:4px 0;} .cc-pv-step b{color:var(--ink);}
.cc-pv-refans{margin-top:8px;background:var(--tealT);border-radius:10px;padding:9px 12px;color:var(--ink);}
.cc-pv-failnote{color:var(--rose);font-weight:600;font-size:13px;}
/* intro: motivatsiya + variant kartalari + countdown */
.cc-pvi-moto{display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(135deg,rgba(227,122,29,.12),rgba(42,66,117,.10));border:1px solid rgba(227,122,29,.28);border-radius:14px;padding:13px 18px;margin-bottom:14px;color:var(--tealD);font-weight:700;font-size:14px;text-align:center;}
.cc-pvi-moto-t{animation:pviFade .6s ease;}
@keyframes pviFade{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}
.cc-pvi-rules{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:18px;}
.cc-pvi-rules span{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink2);background:var(--surf);border:1px solid var(--line);border-radius:999px;padding:7px 13px;}
.cc-pvi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:14px;}
.cc-pvi-card{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:9px;animation:pviUp .5s ease both;transition:transform .15s ease,border-color .2s ease,box-shadow .2s ease;}
.cc-pvi-card:hover{transform:translateY(-3px);border-color:var(--teal);box-shadow:0 14px 30px -12px rgba(227,122,29,.3);}
@keyframes pviUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.cc-pvi-head{display:flex;align-items:center;gap:8px;color:var(--tealD);}
.cc-pvi-head b{font-size:16px;font-weight:800;color:var(--ink);font-family:var(--sans);}
.cc-pvi-head .cc-pv-lvl{margin-left:auto;}
.cc-pvi-card p{margin:0;font-size:12.5px;color:var(--ink2);}
.cc-pvi-best{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;border-radius:999px;padding:4px 10px;width:fit-content;}
.cc-pvi-best.ok{background:rgba(63,164,106,.15);color:#2C7A4D;} .cc.dark .cc-pvi-best.ok{color:#5BC98C;}
.cc-pvi-best.no{background:var(--amb-bg);color:var(--amber2);}
.cc-pvi-card .cc-btn{margin-top:auto;justify-content:center;}
.cc-pvi-count{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:72px 20px;background:var(--surf);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow);text-align:center;}
.cc-pvi-count-n{font-size:64px;font-weight:900;font-family:var(--sans);color:var(--tealD);animation:pviPop .8s cubic-bezier(.2,1.4,.4,1) both;}
@keyframes pviPop{0%{opacity:0;transform:scale(.4);}60%{transform:scale(1.15);}100%{opacity:1;transform:scale(1);}}
.cc-pvi-count p{margin:0;color:var(--ink2);font-size:14px;}
@media(prefers-reduced-motion:reduce){.cc-pvi-card,.cc-pvi-moto-t,.cc-pvi-count-n{animation:none;}}
.cc-q{font-family:var(--serif);font-size:20px;font-weight:600;line-height:1.36;margin:16px 0 18px;letter-spacing:-.01em;}
.cc-opts{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
.cc-opt{display:flex;align-items:center;gap:12px;text-align:left;background:var(--surf);border:1.5px solid var(--line);border-radius:13px;padding:14px 16px;font-size:14px;font-weight:500;color:var(--ink);cursor:pointer;font-family:var(--sans);transition:.14s;box-shadow:var(--shadow);}
.cc-opt:hover:not(:disabled){border-color:var(--teal);transform:translateY(-1px);}
.cc-opt:disabled{cursor:default;}
.cc-opt-k{width:27px;height:27px;flex:none;border-radius:8px;background:var(--surf2);color:var(--ink2);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;font-family:var(--mono);}
.cc-opt.right{border-color:var(--green);background:var(--greenT);}
.cc-opt.right .cc-opt-k{background:var(--green);color:#fff;}
.cc-opt.wrong{border-color:var(--red);background:var(--redT);}
.cc-opt.wrong .cc-opt-k{background:var(--red);color:#fff;}
.cc-fb{border-radius:13px;padding:14px 16px;font-size:13.5px;line-height:1.6;color:var(--ink2);margin-bottom:6px;}
.cc-fb b{color:var(--ink);}
.cc-fb.good{background:var(--greenT);border:1px solid color-mix(in srgb,var(--green) 30%,transparent);}
.cc-fb.bad{background:var(--redT);border:1px solid color-mix(in srgb,var(--red) 30%,transparent);}
.cc-fb.mid{background:var(--amberT);border:1px solid color-mix(in srgb,var(--amber) 30%,transparent);}
.cc-sample{margin-top:9px;padding-top:9px;border-top:1px dashed var(--line);font-size:13px;}
.cc-ta{width:100%;min-height:120px;resize:vertical;background:var(--surf);border:1.5px solid var(--line);border-radius:13px;padding:14px;font-size:14px;font-family:var(--sans);color:var(--ink);margin-bottom:13px;line-height:1.6;}
.cc-ta:focus{outline:none;border-color:var(--teal);}
.cc-qnav{margin-top:14px;display:flex;justify-content:flex-end;}

/* tutor chat */
.cc-chat{display:flex;flex-direction:column;gap:13px;min-height:220px;background:var(--surf);border:1px solid var(--line);border-radius:18px;padding:18px;margin-bottom:13px;box-shadow:var(--shadow);}
.cc-msg{display:flex;gap:10px;max-width:88%;}
.cc-msg.u{align-self:flex-end;flex-direction:row-reverse;}
.cc-msg-ic{width:28px;height:28px;flex:none;border-radius:9px;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;}
.cc-msg-b{font-size:14px;line-height:1.62;padding:11px 15px;border-radius:14px;white-space:pre-wrap;}
.cc-msg.a .cc-msg-b{background:var(--surf2);color:var(--ink);border-top-left-radius:5px;}
.cc-msg.u .cc-msg-b{background:var(--grad);color:#fff;border-top-right-radius:5px;}
.cc-ask{display:flex;gap:10px;}
.cc-ask-in{flex:1;background:var(--surf);border:1.5px solid var(--line);border-radius:13px;padding:13px 16px;font-size:14px;font-family:var(--sans);color:var(--ink);}
.cc-ask-in:focus{outline:none;border-color:var(--teal);}

/* empty */
.cc-empty{display:flex;flex-direction:column;align-items:center;gap:13px;text-align:center;background:var(--surf);border:1px dashed var(--line);border-radius:18px;padding:48px 28px;color:var(--ink2);box-shadow:var(--shadow);}
.cc-empty svg{color:var(--teal);}
.cc-empty p{font-size:14px;max-width:420px;margin:0;line-height:1.6;}

/* homework */
.cc-hw-group{margin-bottom:26px;}
.cc-hw-gh{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:13px;}
.cc-fill{display:flex;flex-direction:column;gap:1px;border-radius:13px;overflow:hidden;border:1px solid var(--line);margin-bottom:13px;}
.cc-fill-row{display:grid;grid-template-columns:160px 1fr;gap:12px;padding:12px 15px;background:var(--surf);font-size:13.5px;line-height:1.55;}
.cc-fill-row:nth-child(even){background:var(--surf2);}
.cc-fill-row b{color:var(--ink);font-family:var(--serif);font-size:14.5px;}
.cc-fill-row span{color:var(--ink2);}
.cc-hwt{border:1px solid var(--line);border-radius:13px;overflow:hidden;margin-bottom:14px;}
.cc-hwt-r{display:grid;grid-template-columns:1fr 90px 140px;gap:10px;align-items:center;padding:11px 14px;font-size:13.5px;border-top:1px solid var(--line);}
.cc-hwt-r:first-child{border-top:0;}
.cc-hwt-r.head{background:var(--surf2);font-weight:700;font-size:12px;color:var(--mut);text-transform:uppercase;letter-spacing:.04em;}
.cc-hwt-r.ok{background:var(--greenT);}
.cc-hwt-r.bad{background:var(--redT);}
.cc-hwt-r .c2{font-family:var(--mono);font-weight:600;}
.cc-hwt-r .c3{display:flex;gap:6px;}
.cc-seg{flex:1;padding:7px 9px;border-radius:8px;background:var(--surf);border:1px solid var(--line);font-size:12.5px;font-weight:600;color:var(--ink2);cursor:pointer;font-family:var(--sans);transition:.14s;}
.cc-seg.sel{background:var(--grad);border-color:transparent;color:#fff;}
.cc-seg.right{outline:2px solid var(--green);outline-offset:1px;}
.cc-hw-res{animation:ccin .3s ease;}
.cc-hw-sc{font-weight:700;font-size:15px;margin-bottom:10px;color:var(--ink);}
.cc-hw-fix{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:var(--ink2);margin:7px 0;line-height:1.5;}
.cc-hw-fix svg{color:var(--red);flex:none;margin-top:2px;}
.cc-hw-fix b{color:var(--ink);}

/* gate (login) */
.cc-gate{position:relative;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;overflow:hidden;}
.cc-gate-bg{position:absolute;inset:0;background:
   radial-gradient(620px 360px at 28% 16%,rgba(14,123,102,.18),transparent 60%),
   radial-gradient(560px 340px at 80% 86%,rgba(176,140,60,.12),transparent 60%);pointer-events:none;}
.cc-gate-th{position:absolute;top:20px;right:20px;}
.cc-gate-card{position:relative;width:100%;max-width:404px;background:var(--surf);border:1px solid var(--line);border-radius:24px;padding:38px 32px;text-align:center;box-shadow:var(--shadow-lg);}
.cc-gate-logo{width:62px;height:62px;margin:0 auto 18px;border-radius:18px;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 30px rgba(14,123,102,.42);}
.cc-gate-t{font-family:var(--serif);font-size:28px;font-weight:600;margin:0 0 10px;letter-spacing:-.01em;}
.cc-gate-s{font-size:13.5px;color:var(--ink2);line-height:1.6;margin:0 0 22px;}
.cc-modal-in{width:100%;background:var(--surf2);border:1.5px solid var(--line);border-radius:13px;padding:14px 16px;font-size:15px;font-family:var(--sans);color:var(--ink);margin-bottom:13px;text-align:center;}
.cc-modal-in:focus{outline:none;border-color:var(--teal);background:var(--surf);}
.cc-modal-go{width:100%;padding:14px;font-size:15px;}

/* admin */
.cc-astats{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:22px;}
.cc-adm-upd{font-size:11.5px;color:var(--mut);font-weight:600;}
.cc-adm-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px;}
.cc-apanel{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:var(--shadow);}
.cc-apanel-t{display:flex;align-items:center;gap:8px;font-weight:700;font-size:13.5px;margin-bottom:16px;color:var(--ink);}
.cc-apanel-t svg{color:var(--teal);}
.cc-bars{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;height:110px;}
.cc-bar{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;height:100%;}
.cc-bar-n{font-size:11px;font-weight:700;color:var(--ink2);}
.cc-bar-v{width:100%;max-width:34px;min-height:4px;background:var(--grad);border-radius:7px 7px 3px 3px;transition:height .4s;}
.cc-bar-l{font-size:11px;color:var(--mut);font-weight:600;}
.cc-trow{display:grid;grid-template-columns:64px 1fr 32px;gap:10px;align-items:center;margin:9px 0;font-size:13px;}
.cc-trow-l{font-family:var(--mono);font-weight:700;color:var(--tealD);font-size:12px;}
.cc-trow-bar{height:8px;background:var(--surf2);border-radius:20px;overflow:hidden;}
.cc-trow-fill{display:block;height:100%;background:var(--grad);border-radius:20px;}
.cc-trow-n{text-align:right;font-weight:700;color:var(--ink2);}
.cc-adm-tbl{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:6px;box-shadow:var(--shadow);}
.cc-adm-r{display:grid;grid-template-columns:1.6fr 1.1fr .7fr .6fr .7fr .7fr .9fr;gap:8px;align-items:center;padding:12px 15px;font-size:13px;border-top:1px solid var(--line);background:var(--surf);}
.cc-adm-r:first-child{border-top:0;}
.cc-adm-r.head{background:var(--surf2);font-weight:700;font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.04em;}
.cc-adm-r .n{text-align:right;font-family:var(--mono);font-weight:600;}
.cc-adm-u{display:flex;align-items:center;gap:9px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cc-adm-d{color:var(--ink2);font-size:12.5px;}
/* admin: Подготовка к экзамену natijalari */
.cc-prow{display:flex;align-items:center;gap:12px;padding:11px 0;border-top:1px solid var(--line);flex-wrap:wrap;}
.cc-prow:first-of-type{border-top:none;}
.cc-prow .cc-adm-u{min-width:150px;}
.cc-prow-meta{font-size:12.5px;color:var(--mut);white-space:nowrap;}
.cc-atts{display:flex;gap:6px;flex-wrap:wrap;margin-left:auto;justify-content:flex-end;}
.cc-att{font-family:var(--mono);font-size:11.5px;font-weight:700;padding:4px 9px;border-radius:999px;cursor:default;}
.cc-att.ok{background:var(--greenT);color:var(--green);}
.cc-att.no{background:var(--redT);color:var(--red);}
@media(max-width:640px){ .cc-atts{margin-left:0;width:100%;justify-content:flex-start;} }
.cc-adm-feed{display:flex;flex-direction:column;gap:1px;border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);}
.cc-adm-fi{display:flex;align-items:center;gap:11px;padding:11px 15px;background:var(--surf);font-size:13px;}
.cc-adm-fi:nth-child(even){background:var(--surf2);}
.cc-adm-ic{width:30px;height:30px;flex:none;border-radius:9px;background:var(--tealT);color:var(--teal);display:flex;align-items:center;justify-content:center;}
.cc-adm-ft{flex:1;color:var(--ink2);}
.cc-adm-ft b{color:var(--ink);}
.cc-adm-fts{font-size:11.5px;color:var(--mut);white-space:nowrap;}

/* responsive */
@media(max-width:680px){
 .cc-h1{font-size:28px;}
 .cc-stats{grid-template-columns:repeat(2,1fr);}
 .cc-topics{grid-template-columns:1fr;}
 .cc-actions{grid-template-columns:1fr;}
 .cc-adm-two{grid-template-columns:1fr;}
 .cc-astats{grid-template-columns:repeat(3,1fr);}
 .cc-htxt{display:none;}
 .cc-auth-name{display:none;}
 .cc-adm-tbl{overflow-x:auto;}
 .cc-adm-r{grid-template-columns:1.4fr 1fr .6fr .6fr .6fr .6fr .8fr;min-width:540px;}
 .cc-fill-row{grid-template-columns:1fr;gap:3px;}
}

/* ===== design polish (additive, complements existing design) ===== */
html,body{margin:0;padding:0;}
.cc-tcard{position:relative;overflow:hidden;}
.cc-tcard::after{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--grad);transform:scaleX(0);transform-origin:left;transition:transform .28s ease;}
.cc-tcard:hover::after{transform:scaleX(1);}
.cc-tcard:hover .cc-tcode{transform:translateX(2px);transition:transform .18s ease;}
.cc-stat{transition:transform .18s ease;}
.cc-stat:hover{transform:translateY(-2px);}
.cc-act:hover .cc-act-ic,.cc-act:hover svg:first-child{transform:scale(1.08);transition:transform .18s ease;}

/* ===== premium home (concept) ===== */
.cc-hero{display:grid;grid-template-columns:1fr auto;gap:30px;align-items:center;background:var(--hero-bg);border:1px solid var(--line);}
.cc-hero-l{position:relative;z-index:1;min-width:0;}
.cc-grad{background:linear-gradient(100deg,#F2913A,#3C5BA8 60%,#86A1E2);-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc-cta-row{display:flex;flex-wrap:wrap;gap:11px;margin-top:18px;}
.cc-cta-row .cc-btn{font-size:14px;padding:13px 20px;}
.cc-ring-card{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;flex:none;}
.cc-ring{position:relative;width:150px;height:150px;}
.cc-rtrack{stroke:var(--surf2);}
.cc-rprog{transition:stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1);}
.cc-ring-v{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.cc-ring-v b{font-family:var(--serif);font-size:32px;font-weight:700;line-height:1;color:var(--ink);letter-spacing:-.02em;}
.cc-ring-v small{font-size:11px;color:var(--mut);margin-top:5px;}
.cc-stat{flex-direction:column;align-items:flex-start;gap:3px;}
.cc-stat-ic{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;}
.cc-stat .cc-stat-ic svg{color:inherit;}
.cc-stat b{margin-top:0;}
.cc-stat.em .cc-stat-ic{background:var(--em-bg);color:var(--t-em);}
.cc-stat.sky .cc-stat-ic{background:var(--sky-bg);color:var(--t-sky);}
.cc-stat.amb .cc-stat-ic{background:var(--amb-bg);color:var(--t-amb);}
.cc-stat.vio .cc-stat-ic{background:var(--vio-bg);color:var(--t-vio);}
.cc-tcard::after{display:none;}
.cc-tcard::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;height:auto;opacity:1;background:var(--teal);border-radius:4px 0 0 4px;transition:none;}
.cc-tcard.em::before{background:var(--emerald);} .cc-tcard.sky::before{background:var(--sky);} .cc-tcard.amb::before{background:var(--amber);} .cc-tcard.vio::before{background:var(--violet);}
.cc-tcard.em:hover{box-shadow:0 24px 48px -24px color-mix(in srgb,var(--emerald) 55%,transparent);}
.cc-tcard.sky:hover{box-shadow:0 24px 48px -24px color-mix(in srgb,var(--sky) 55%,transparent);}
.cc-tcard.amb:hover{box-shadow:0 24px 48px -24px color-mix(in srgb,var(--amber) 50%,transparent);}
.cc-tcard.vio:hover{box-shadow:0 24px 48px -24px color-mix(in srgb,var(--violet) 55%,transparent);}
.cc-tcode.em{background:var(--em-bg);color:var(--t-em);} .cc-tcode.sky{background:var(--sky-bg);color:var(--t-sky);} .cc-tcode.amb{background:var(--amb-bg);color:var(--t-amb);} .cc-tcode.vio{background:var(--vio-bg);color:var(--t-vio);}
.cc-track-f.em{background:linear-gradient(90deg,#F2913A,#E37A1D);} .cc-track-f.sky{background:linear-gradient(90deg,#3C5BA8,#2A4275);} .cc-track-f.amb{background:linear-gradient(90deg,#F0A93C,#C2811E);} .cc-track-f.vio{background:linear-gradient(90deg,#86A1E2,#3A579A);}
.cc-act.sky>svg:first-child{background:var(--sky-bg);color:var(--t-sky);}
@media(max-width:680px){
 .cc-hero{grid-template-columns:1fr;gap:20px;}
 .cc-ring-card{order:-1;align-self:flex-start;}
 .cc-ring{width:116px;height:116px;}
 .cc-ring-v b{font-size:24px;}
 .cc-cta-row .cc-btn{flex:1;justify-content:center;}
}

/* ===== v2/v3 polish (premium depth, a11y) ===== */
.cc-stat b,.cc-ring-v b,.cc-done-p,.cc-tcard-foot,.cc-quiz-top{font-variant-numeric:tabular-nums;}
.cc-rprog{filter:drop-shadow(0 0 6px color-mix(in srgb,var(--emerald) 55%,transparent));}
.cc.dark .cc-stat,.cc.dark .cc-tcard,.cc.dark .cc-act,.cc.dark .cc-acc-i,.cc.dark .cc-card,.cc.dark .cc-apanel,.cc.dark .cc-task{box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.05);}
.cc-hero::after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,var(--emerald),var(--sky),var(--violet));opacity:.5;z-index:1;}
@media (prefers-reduced-motion: reduce){ .cc *,.cc *::before,.cc *::after{animation:none!important;transition:none!important;} }

/* ============================================================
   v4 — ЖИВОЙ премиум-редизайн главной (scoped под .ccx)
   ============================================================ */
.cc-main.ccx{position:relative;z-index:1;max-width:1180px;}

/* живой фон: плавающие иконки + аврора + зерно */
.cc-scene{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.cc-scene::after{content:"";position:absolute;inset:0;background:radial-gradient(500px 360px at 20% 18%,rgba(227,122,29,.10),transparent 60%),radial-gradient(520px 380px at 82% 30%,rgba(134,161,226,.09),transparent 60%);filter:blur(8px);animation:ccaurora 20s ease-in-out infinite;}
.cc-scene::before{content:"";position:absolute;inset:0;opacity:var(--noise);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.cc-fi{position:absolute;}
.cc-fi svg{width:100%;height:100%;stroke-width:1.6;}
@keyframes ccaurora{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(2.5%,1.8%) scale(1.04);}}
@keyframes flA{0%,100%{transform:translateY(0) rotate(-6deg);}50%{transform:translateY(-26px) rotate(6deg);}}
@keyframes flB{0%,100%{transform:translate(0,0) rotate(5deg);}50%{transform:translate(-18px,-20px) rotate(-6deg);}}
@keyframes flC{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(22px) scale(1.08);}}

/* градиентная рамка */
.ccx .frame{position:relative;}
.ccx .frame::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:var(--frame);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;z-index:1;}

/* hero */
.ccx .hero{margin-top:4px;border-radius:var(--radius);overflow:hidden;position:relative;background:var(--hero-bg);box-shadow:var(--inner-hl),var(--shadow-card);padding:44px 46px;display:grid;grid-template-columns:1fr auto;gap:38px;align-items:center;transition:background .35s ease;}
.ccx .hero::after{content:"";position:absolute;right:-40px;bottom:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(134,161,226,.18),transparent 65%);pointer-events:none;}
.ccx .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:16px;}
.ccx .eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--emerald2);box-shadow:0 0 10px var(--emerald2);}
.ccx .hero h2{font-family:'Golos Text',sans-serif;font-size:clamp(28px,4.2vw,48px);font-weight:800;line-height:1.04;letter-spacing:-1.5px;margin-bottom:16px;}
.ccx .hero h2 .grad{background:linear-gradient(100deg,#C2611A,#F0993F 25%,#FFB570 50%,#F0993F 75%,#C2611A);background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ccshimmer 4.5s linear infinite;}
@keyframes ccshimmer{to{background-position:220% center;}}
/* suzuvchi "abco" pillalar */
.ccx .ring-card .abco-3d{position:absolute;width:62px;height:62px;object-fit:contain;z-index:3;pointer-events:none;filter:drop-shadow(0 10px 16px rgba(20,30,60,.3));}
.ccx .ring .abco-3d.p1{top:-18px;left:-18px;width:52px;height:52px;animation:ccfloatp 6s ease-in-out infinite;}
.ccx .ring .abco-3d.p4{top:-18px;right:-18px;width:52px;height:52px;animation:ccfloatp 7s ease-in-out infinite reverse;}
.ccx .ring .abco-3d.p2{bottom:-12px;left:-14px;width:48px;height:48px;animation:ccfloatp 8s ease-in-out infinite;}
.ccx .ring .abco-3d.p3{bottom:-12px;right:-14px;width:50px;height:50px;animation:ccfloatp 8.5s ease-in-out infinite reverse;}
@keyframes ccfloatp{0%,100%{transform:translateY(0) rotate(-3deg);}50%{transform:translateY(-13px) rotate(3deg);}}
/* 3D scroll showcase (framer-motion) */
.ccx .ss{max-width:1060px;margin:58px auto 10px;padding:0 4px;}
.ccx .ss-head{text-align:center;max-width:640px;margin:0 auto 30px;will-change:transform;}
.ccx .ss-eyebrow{display:inline-flex;align-items:center;gap:7px;font:700 12px/1 'Golos Text',sans-serif;letter-spacing:.04em;text-transform:uppercase;color:var(--teal);background:rgba(227,122,29,.12);border:1px solid rgba(227,122,29,.26);padding:7px 13px;border-radius:999px;margin-bottom:16px;}
.ccx .ss-head h3{font:800 clamp(23px,3.8vw,37px)/1.12 'Golos Text',sans-serif;color:var(--text);margin:0 0 12px;letter-spacing:-.02em;}
.ccx .ss-head p{font:400 15px/1.6 'Golos Text',sans-serif;color:var(--muted);margin:0;}
.ccx .ss-stage{perspective:1300px;}
.ccx .ss-card{transform-style:preserve-3d;transform-origin:50% 0%;border-radius:26px;padding:11px;background:linear-gradient(160deg,rgba(255,255,255,.12),rgba(255,255,255,.02));border:1px solid var(--frame);box-shadow:0 42px 92px -32px rgba(12,20,45,.62),0 14px 32px -14px rgba(12,20,45,.4);will-change:transform;}
.ccx .ss-screen{position:relative;overflow:hidden;border-radius:18px;min-height:300px;background:linear-gradient(155deg,#27407A 0%,#172A54 56%,#0E1A37 100%);}
.ccx .ss-screen::before{content:"";position:absolute;inset:0;background:radial-gradient(62% 80% at 86% 6%,rgba(227,122,29,.22),transparent 60%);pointer-events:none;animation:ssGlow 5.5s ease-in-out infinite;}
@keyframes ssGlow{0%,100%{opacity:.65;}50%{opacity:1;}}
.ccx .ss-bar{position:relative;display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:1px solid rgba(255,255,255,.08);}
.ccx .ss-logo{font:900 15px/1 'Golos Text',sans-serif;letter-spacing:.06em;color:#F4A24A;border:2px solid rgba(244,162,74,.45);border-radius:999px;padding:5px 13px;}
.ccx .ss-win{display:inline-flex;gap:6px;}
.ccx .ss-win i{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.22);}
.ccx .ss-win i:first-child{background:#F2913A;}
.ccx .ss-grid{position:relative;display:grid;grid-template-columns:1.25fr .9fr;gap:18px;padding:24px 26px 28px;align-items:center;}
.ccx .ss-tag{display:inline-block;font:700 11px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#9DB0D8;margin-bottom:12px;}
.ccx .ss-main h4{font:800 clamp(19px,2.5vw,29px)/1.16 'Golos Text',sans-serif;color:#fff;margin:0 0 16px;letter-spacing:-.01em;}
.ccx .ss-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
.ccx .ss-chips span{font:600 12px/1 'JetBrains Mono',monospace;color:#DCE6FA;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 10px;}
.ccx .ss-rows{display:flex;flex-direction:column;gap:10px;}
.ccx .ss-row{display:flex;align-items:center;gap:10px;font:500 13.5px/1 'Golos Text',sans-serif;color:#C5D2EC;}
.ccx .ss-row b{color:#fff;font-weight:700;}
.ccx .ss-row span:last-child{margin-left:auto;color:#8FA2CC;font-size:12.5px;}
.ccx .ss-rdot{width:8px;height:8px;border-radius:50%;background:#F2913A;box-shadow:0 0 10px rgba(242,145,58,.7);flex:none;}
.ccx .ss-side{position:relative;display:flex;align-items:center;justify-content:center;min-height:204px;}
.ccx .ss-ring{position:relative;width:150px;height:150px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:conic-gradient(#F2913A 0% 51%,rgba(255,255,255,.13) 51% 100%);box-shadow:0 14px 40px -10px rgba(242,145,58,.4);animation:ssRingPulse 3.6s ease-in-out infinite;}
@keyframes ssRingPulse{0%,100%{box-shadow:0 14px 40px -10px rgba(242,145,58,.35);}50%{box-shadow:0 16px 54px -8px rgba(242,145,58,.6);}}
.ccx .ss-ring span{animation:ssNum 3.6s ease-in-out infinite;}
@keyframes ssNum{0%,100%{transform:scale(1);}50%{transform:scale(1.05);}}
.ccx .ss-row .ss-rdot{animation:ssDot 2.4s ease-in-out infinite;}
.ccx .ss-row:nth-child(2) .ss-rdot{animation-delay:.5s;}
.ccx .ss-row:nth-child(3) .ss-rdot{animation-delay:1s;}
@keyframes ssDot{0%,100%{box-shadow:0 0 8px rgba(242,145,58,.6);transform:scale(1);}50%{box-shadow:0 0 16px rgba(242,145,58,1);transform:scale(1.25);}}
.ccx .ss-ring::before{content:"";position:absolute;inset:13px;border-radius:50%;background:#15244C;}
.ccx .ss-ring span{position:relative;font:800 31px/1 'Golos Text',sans-serif;color:#fff;}
.ccx .ss-ring small{position:relative;font:500 11px/1 'Golos Text',sans-serif;color:#9DB0D8;margin-top:5px;}
/* suzuvchi 3D abco belgilar (CSS chuqurlik + bevel + porlash) */
.ccx .ss-b3d{position:absolute;z-index:3;display:inline-flex;align-items:center;justify-content:center;font:900 14px/1 'Golos Text',sans-serif;letter-spacing:.05em;color:#F6A24E;background:linear-gradient(152deg,#34528F 0%,#1C2F5C 56%,#12224A 100%);border:2px solid rgba(244,162,74,.55);border-radius:999px;padding:9px 15px;overflow:hidden;text-shadow:0 1px 1px rgba(0,0,0,.4);box-shadow:0 3px 0 #101D3E,0 6px 0 #0B1530,0 12px 22px rgba(5,10,28,.5),inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 7px rgba(0,0,0,.32);}
.ccx .ss-b3d::after{content:"";position:absolute;top:0;left:-70%;width:55%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-18deg);animation:b3dshine 3.4s ease-in-out infinite;}
@keyframes b3dshine{0%,58%{left:-70%;}100%{left:140%;}}
.ccx .ss-b3d.s1{top:2px;left:-10px;font-size:14px;animation:ccfloatp 6s ease-in-out infinite;}
.ccx .ss-b3d.s2{top:-12px;right:-10px;font-size:12px;padding:8px 13px;animation:ccfloatp 7s ease-in-out infinite reverse;}
.ccx .ss-b3d.s3{bottom:16px;left:-12px;font-size:12px;padding:8px 13px;animation:ccfloatp 8s ease-in-out infinite;}
.ccx .ss-b3d.s4{bottom:-8px;right:-6px;font-size:14px;animation:ccfloatp 8.5s ease-in-out infinite reverse;}
.ccx .ss-b3d.s2::after{animation-delay:.6s;}
.ccx .ss-b3d.s3::after{animation-delay:1.2s;}
.ccx .ss-b3d.s4::after{animation-delay:1.8s;}
@media(max-width:768px){
  .ccx .ss{margin:42px auto 4px;}
  .ccx .ss-grid{grid-template-columns:1fr;gap:4px;padding:20px;}
  .ccx .ss-side{min-height:172px;margin-top:10px;}
  .ccx .ss-ring{width:130px;height:130px;}
  .ccx .ss-ring span{font-size:27px;}
}
@media(prefers-reduced-motion:reduce){
  .ccx .ss-b3d,.ccx .ss-b3d::after,.ccx .ss-ring,.ccx .ss-ring span,.ccx .ss-row .ss-rdot,.ccx .ss-screen::before{animation:none;}
}
/* sertifikat marquee */
.ccx .abco-marquee-wrap{margin-top:16px;display:flex;align-items:center;gap:18px;border-radius:var(--radius-sm);padding:14px 18px;background:var(--card2);border:1px solid var(--line);box-shadow:var(--inner-hl),var(--shadow-card);overflow:hidden;}
.ccx .abco-mq-label{flex:0 0 auto;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);}
.ccx .abco-mq{flex:1;min-width:0;overflow:hidden;-webkit-mask:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);}
.ccx .abco-mq-row{display:flex;gap:30px;width:max-content;animation:ccmarquee 24s linear infinite;}
@keyframes ccmarquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.ccx .abco-cert{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--subtext);white-space:nowrap;font-family:'JetBrains Mono',monospace;}
.ccx .abco-cert-dot{width:7px;height:7px;border-radius:50%;background:var(--teal);flex:0 0 auto;}
.ccx .hero p{font-size:16px;line-height:1.6;color:var(--subtext);max-width:560px;margin-bottom:28px;}
.ccx .chips{display:flex;gap:10px;flex-wrap:wrap;margin:28px 0 0;}
.ccx .chip{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;padding:8px 15px;border-radius:999px;border:1px solid var(--line2);background:var(--soft2);color:var(--text);}
.ccx .chip.amb{color:var(--t-amb);background:rgba(240,169,60,.12);}
.ccx .chip.em{color:var(--t-em);background:rgba(227,122,29,.12);}
.ccx .cta-row{display:flex;gap:16px;flex-wrap:wrap;align-items:center;}
.ccx .btn{font-family:'Golos Text',sans-serif;font-weight:700;font-size:15px;border:none;cursor:pointer;border-radius:13px;padding:14px 24px;display:inline-flex;align-items:center;gap:9px;transition:.22s;color:var(--text);}
.ccx .btn-primary{background:linear-gradient(135deg,#F2913A,#C76A18);color:#fff;box-shadow:0 12px 30px -8px rgba(227,122,29,.65);}
.ccx .btn-primary:hover{transform:translateY(-2px);box-shadow:0 18px 40px -8px rgba(227,122,29,.8);}
.ccx .btn-ghost{background:var(--soft2);color:var(--text);border:1px solid var(--line2);}
.ccx .btn-ghost:hover{background:var(--soft3);}
.ccx .quick{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:22px;}
.ccx .q-label{font-size:11px;color:var(--muted);font-weight:700;letter-spacing:.12em;text-transform:uppercase;}
.ccx .tag{display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:600;color:var(--subtext);padding:3px 2px;cursor:pointer;transition:.2s;border-bottom:1.5px solid transparent;}
.ccx .tag .d{width:8px;height:8px;border-radius:50%;}
.ccx .tag:hover{color:var(--text);border-bottom-color:var(--line2);}

/* ring */
.ccx .ring-card{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;}
.ccx .ring-card::before{content:"";position:absolute;top:-14px;width:210px;height:210px;border-radius:50%;
  background:radial-gradient(closest-side,var(--dot) 1px,transparent 1.4px) 0 0/16px 16px;
  -webkit-mask:radial-gradient(closest-side,#000 60%,transparent 78%);mask:radial-gradient(closest-side,#000 60%,transparent 78%);opacity:.7;pointer-events:none;}
.ccx .ring{position:relative;width:170px;height:170px;z-index:1;}
.ccx .ring svg{transform:rotate(-90deg);width:100%;height:100%;display:block;}
.ccx .rtrack{stroke:var(--track);}
.ccx #ccringp{filter:drop-shadow(0 0 7px rgba(242,145,58,.55));transition:stroke-dashoffset .2s linear;}
.ccx .ring .pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
.ccx .ring .pct b{font-family:'Golos Text',sans-serif;font-size:38px;font-weight:800;line-height:1;color:var(--text);font-variant-numeric:tabular-nums;transform:translateY(.1em);}
.ccx .ring .pct small{position:absolute;top:62%;left:0;right:0;text-align:center;font-size:12px;color:var(--muted);letter-spacing:.05em;}
.ccx .streak{display:inline-flex;align-items:center;gap:7px;font-size:13px;color:var(--t-amb);font-weight:700;margin-top:12px;}
.ccx .goal{width:180px;margin-top:6px;}
.ccx .goal .gl{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);font-weight:600;margin-bottom:5px;letter-spacing:.04em;}
.ccx .goal .gt{height:6px;border-radius:99px;background:var(--track);overflow:hidden;}
.ccx .goal .gt i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#F2913A,#3C5BA8);transition:width 1.2s cubic-bezier(.4,0,.2,1);}

/* AI spotlight */
.ccx .ai{position:relative;overflow:hidden;margin-top:18px;border-radius:var(--radius);padding:22px 26px;display:flex;align-items:center;gap:20px;cursor:pointer;background:linear-gradient(135deg,rgba(242,145,58,.16),rgba(60,91,168,.10) 70%);box-shadow:var(--inner-hl),var(--shadow-card);transition:transform .12s ease;transform-style:preserve-3d;}
/* tugma/karta bosish (press) feedback + tilt yorug'ligi */
.ccx .btn:active,.cc-btn:active,.cc-burger:active,.cc-menu-i:active,.cc-mini:active{transform:scale(.96);}
.ccx .stat .mod-light,.ccx .wide .mod-light{display:none;}
.ccx .btn,.ccx .tag,.ccx .mod,.ccx .wide,.ccx .stat,.ccx .ai,.cc-card3d{touch-action:manipulation;}
.ccx .ai:hover{transform:translateY(-3px);}
.ccx .ai::before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,.16) 50%,transparent 68%);transform:translateX(-130%);}
.ccx .ai:hover::before{animation:ccsweep 1.1s ease;}
@keyframes ccsweep{to{transform:translateX(130%);}}
.ccx .ai .aic{width:54px;height:54px;flex-shrink:0;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,#F2913A,#C2611A);box-shadow:0 10px 30px -8px rgba(227,122,29,.7);color:#fff;}
.ccx .ai .atxt{flex:1;min-width:0;}
.ccx .ai h4{font-family:'Golos Text',sans-serif;font-size:18px;font-weight:700;margin-bottom:4px;color:var(--text);}
.ccx .ai p{font-size:13.5px;color:var(--subtext);line-height:1.45;}
.ccx .ai .ago{flex-shrink:0;}

/* sections */
.ccx .sec-head{display:flex;align-items:baseline;justify-content:space-between;margin:38px 4px 16px;}
.ccx .sec-head h3{font-family:'Golos Text',sans-serif;font-size:15px;font-weight:700;letter-spacing:.02em;color:var(--text);}

/* stats */
.ccx .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.ccx .stat{position:relative;border-radius:var(--radius-sm);padding:18px 18px 16px;background:var(--card);border:1px solid var(--line);box-shadow:var(--inner-hl),var(--shadow-card);overflow:hidden;transition:transform .12s ease,box-shadow .25s ease,border-color .25s ease;transform-style:preserve-3d;}
.ccx .stat:hover{transform:translateY(-3px);border-color:var(--line2);}
.ccx .stat-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;}
.ccx .stat .ic{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;}
.ccx .stat b{font-family:'Golos Text',sans-serif;font-size:30px;font-weight:800;display:block;line-height:1;letter-spacing:-1px;color:var(--text);font-variant-numeric:tabular-nums;}
.ccx .stat span{font-size:13px;color:var(--muted);font-weight:500;}
.ccx .stat .bar{height:5px;border-radius:99px;background:var(--track);margin-top:13px;overflow:hidden;}
.ccx .stat .bar i{display:block;height:100%;border-radius:99px;width:0;transition:width 1.1s cubic-bezier(.4,0,.2,1);}
.ccx .glow-em{box-shadow:var(--inner-hl),var(--shadow-card),inset 0 0 0 1px rgba(227,122,29,.18),0 0 40px -22px var(--emerald);}
.ccx .e-em{background:rgba(227,122,29,.13);color:var(--t-em);} .ccx .f-em{background:linear-gradient(90deg,#F2913A,#E37A1D);}
.ccx .e-sky{background:rgba(60,91,168,.13);color:var(--t-sky);} .ccx .f-sky{background:linear-gradient(90deg,#3C5BA8,#2A4275);}
.ccx .e-amb{background:rgba(240,169,60,.14);color:var(--t-amb);} .ccx .f-amb{background:linear-gradient(90deg,#F0A93C,#C2811E);}
.ccx .e-vio{background:rgba(134,161,226,.15);color:var(--t-vio);} .ccx .f-vio{background:linear-gradient(90deg,#86A1E2,#3A579A);}

/* weekly sparkline */
.ccx .spark{margin-top:14px;border-radius:var(--radius-sm);padding:16px 18px;background:var(--card2);border:1px solid var(--line);box-shadow:var(--inner-hl),var(--shadow-card);}
.ccx .spark .sh{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;}
.ccx .spark .sh b{font-size:13px;font-weight:700;color:var(--text);}
.ccx .spark .sh span{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--t-em);font-weight:700;}
.ccx .bars{display:flex;align-items:flex-end;gap:10px;height:56px;}
.ccx .bars .col{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;}
.ccx .bars .bk{width:100%;max-width:26px;height:44px;border-radius:7px;background:var(--track);display:flex;align-items:flex-end;overflow:hidden;}
.ccx .bars .bk i{display:block;width:100%;height:0;border-radius:7px;background:linear-gradient(180deg,#F2913A,#E37A1D);transition:height 1s cubic-bezier(.4,0,.2,1);}
.ccx .bars .col.hot .bk i{background:linear-gradient(180deg,#F0A93C,#C2811E);}
.ccx .bars .dl{font-size:10.5px;color:var(--muted);font-weight:600;}

/* topic modules */
.ccx .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.ccx .mod{position:relative;border-radius:var(--radius);padding:24px;background:var(--card);border:1px solid var(--line);box-shadow:var(--inner-hl),var(--shadow-card);overflow:hidden;cursor:pointer;transition:transform .12s ease,box-shadow .28s ease,border-color .28s ease;transform-style:preserve-3d;will-change:transform;}
.ccx .mod>*{position:relative;z-index:1;}
.ccx .mod .mod-light{position:absolute;inset:0;z-index:0;border-radius:inherit;background:radial-gradient(240px circle at var(--mx,50%) var(--my,0%),var(--soft3),transparent 55%);opacity:0;transition:opacity .25s;pointer-events:none;}
.ccx .mod:hover .mod-light{opacity:1;}
.ccx .mod::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:4px 0 0 4px;}
.ccx .mod:hover{transform:translateY(-4px);border-color:var(--line2);}
.ccx .mod.em::before{background:var(--emerald);} .ccx .mod.em:hover{box-shadow:var(--inner-hl),0 24px 50px -24px rgba(227,122,29,.5);}
.ccx .mod.sky::before{background:var(--sky);} .ccx .mod.sky:hover{box-shadow:var(--inner-hl),0 24px 50px -24px rgba(60,91,168,.5);}
.ccx .mod.amb::before{background:var(--amber2);} .ccx .mod.amb:hover{box-shadow:var(--inner-hl),0 24px 50px -24px rgba(240,169,60,.45);}
.ccx .mod.vio::before{background:var(--violet);} .ccx .mod.vio:hover{box-shadow:var(--inner-hl),0 24px 50px -24px rgba(134,161,226,.5);}
.ccx .mod-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.ccx .badge{font-family:'Golos Text',sans-serif;font-size:12px;font-weight:800;letter-spacing:.04em;padding:5px 11px;border-radius:8px;}
.ccx .b-em{background:rgba(227,122,29,.14);color:var(--t-em);} .ccx .b-sky{background:rgba(60,91,168,.14);color:var(--t-sky);}
.ccx .b-amb{background:rgba(240,169,60,.16);color:var(--t-amb);} .ccx .b-vio{background:rgba(134,161,226,.16);color:var(--t-vio);}
.ccx .mod h4{font-family:'Golos Text',sans-serif;font-size:21px;font-weight:700;letter-spacing:-.4px;margin-bottom:7px;color:var(--text);}
.ccx .mod .meta{font-size:13px;color:var(--muted);font-weight:500;margin-bottom:18px;}
.ccx .pwrap{display:flex;align-items:center;gap:12px;margin-bottom:9px;}
.ccx .pbar{flex:1;height:7px;border-radius:99px;background:var(--track);overflow:hidden;}
.ccx .pbar i{display:block;height:100%;border-radius:99px;width:0;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
.ccx .pval{font-size:12px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--muted);min-width:34px;text-align:right;}
.ccx .mod-foot{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:var(--muted);font-weight:600;}
.ccx .mod-foot .ok{display:inline-flex;align-items:center;gap:5px;color:var(--t-em);}
.ccx .mod-foot .warn{color:var(--t-amb);}
.ccx .arrow{width:40px;height:40px;border-radius:12px;border:1px solid var(--line2);display:grid;place-items:center;color:var(--text);transition:.2s;}
.ccx .mod:hover .arrow{background:var(--soft3);transform:translateX(3px);}

/* wide action cards */
.ccx .two{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;}
.ccx .two.three{grid-template-columns:repeat(3,1fr);}
@media(max-width:1000px){ .ccx .two.three{grid-template-columns:1fr 1fr;} }
.ccx .wide{display:flex;align-items:center;gap:18px;padding:22px 24px;border-radius:var(--radius);background:var(--card2);border:1px solid var(--line);box-shadow:var(--inner-hl),var(--shadow-card);cursor:pointer;transition:transform .12s ease,box-shadow .25s ease,border-color .25s ease;transform-style:preserve-3d;}
.ccx .wide:hover{transform:translateY(-3px);border-color:var(--line2);}
.ccx .wide .wic{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;flex-shrink:0;}
/* 3D glossy material — ikonka plitkalari (yorug'lik + bevel + soya + hover burilish) */
.ccx .stat .ic,.ccx .wide .wic,.ccx .ai .aic{position:relative;overflow:hidden;}
.ccx .stat .ic > svg,.ccx .wide .wic > svg,.ccx .ai .aic > svg{position:relative;z-index:1;}
.ccx .stat .ic::after,.ccx .wide .wic::after,.ccx .ai .aic::after{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(157deg,rgba(255,255,255,.45),transparent 54%);z-index:0;pointer-events:none;}
.ccx .stat .ic,.ccx .wide .wic{box-shadow:inset 0 1.5px 0 rgba(255,255,255,.5),inset 0 -3px 7px rgba(20,30,60,.10),0 8px 15px -7px rgba(20,30,60,.4);transition:transform .18s cubic-bezier(.34,1.4,.4,1),box-shadow .25s ease;}
.ccx .ai .aic{box-shadow:inset 0 2px 0 rgba(255,255,255,.4),inset 0 -4px 9px rgba(120,45,0,.3),0 12px 26px -8px rgba(227,122,29,.7);transition:transform .2s cubic-bezier(.34,1.4,.4,1);}
.ccx .stat:hover .ic,.ccx .wide:hover .wic{transform:translateY(-2px) scale(1.07) rotate(-4deg);box-shadow:inset 0 1.5px 0 rgba(255,255,255,.55),0 13px 22px -8px rgba(20,30,60,.5);}
.ccx .ai:hover .aic{transform:rotate(-7deg) scale(1.06);}
.ccx .wide h4{font-family:'Golos Text',sans-serif;font-size:17px;font-weight:700;margin-bottom:3px;color:var(--text);}
.ccx .wide p{font-size:13px;color:var(--muted);line-height:1.4;}
.ccx .wide .wgo{margin-left:auto;color:var(--muted);display:flex;} .ccx .wide:hover .wgo{color:var(--text);}

/* mobile sticky CTA */
.cc-mcta{display:none;position:fixed;left:0;right:0;bottom:0;z-index:30;padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:var(--mcta-bg);border-top:1px solid var(--line);backdrop-filter:blur(10px);}
.cc-mcta .btn{width:100%;justify-content:center;font-family:'Golos Text',sans-serif;font-weight:700;font-size:15px;border:none;cursor:pointer;border-radius:13px;padding:14px 24px;display:inline-flex;align-items:center;gap:9px;background:linear-gradient(135deg,#F2913A,#C76A18);color:#fff;box-shadow:0 12px 30px -8px rgba(227,122,29,.65);}

/* reveal-in */
.ccx .reveal{opacity:0;transform:translateY(18px);animation:ccup .6s forwards;}
@keyframes ccup{to{opacity:1;transform:none;}}

@media (prefers-reduced-motion: reduce){
  .cc-fi{animation:none!important;}
  .cc-scene::after{animation:none!important;}
  .ccx .reveal{opacity:1;transform:none;animation:none;}
}

@media(max-width:760px){
  .cc-main.ccx{padding-left:16px;padding-right:16px;}
  .ccx .hero{grid-template-columns:1fr;padding:30px 22px;gap:26px;}
  .ccx .ring-card{order:-1;align-self:start;}
  .ccx .ring{width:128px;height:128px;} .ccx .ring .pct b{font-size:28px;}
  .ccx .goal{width:150px;}
  .ccx .stats{grid-template-columns:repeat(2,1fr);}
  .ccx .grid,.ccx .two,.ccx .two.three{grid-template-columns:1fr;}
  .ccx .ai{flex-wrap:wrap;} .ccx .ai .ago{width:100%;} .ccx .ai .ago .btn{width:100%;justify-content:center;}
  .cc-mcta{display:block;}
  .cc-fi{opacity:.10!important;}
}
/* ===== menu + modal oynalar (qo'shimcha) ===== */
.cc-menu-wrap{position:relative;display:flex;}
.cc-menu-back{position:fixed;inset:0;z-index:40;}
.cc-menu{position:absolute;top:48px;right:0;z-index:41;min-width:238px;background:var(--surf);border:1px solid var(--line);border-radius:14px;padding:6px;box-shadow:var(--shadow-lg);animation:ccpop .16s ease;}
.cc-menu-i{display:flex;align-items:center;gap:11px;width:100%;background:none;border:none;border-radius:10px;padding:11px 12px;font-size:13.5px;font-weight:600;color:var(--ink);cursor:pointer;font-family:var(--sans);text-align:left;transition:.13s;}
.cc-menu-i:hover{background:var(--surf2);color:var(--teal);}
.cc-menu-i svg{color:var(--mut);flex:none;}
.cc-menu-i:hover svg{color:var(--teal);}
.cc-mov{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,11,10,.55);backdrop-filter:blur(3px);animation:ccfade .18s ease;}
.cc-mcard{position:relative;width:100%;max-width:436px;background:var(--surf);border:1px solid var(--line);border-radius:22px;padding:28px 26px;box-shadow:var(--shadow-lg);animation:ccpop .22s ease;max-height:88vh;overflow:auto;}
.cc-mx{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:9px;background:var(--surf2);border:1px solid var(--line);color:var(--mut);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.13s;}
.cc-mx:hover{color:var(--red);border-color:var(--red);}
.cc-mhead{display:flex;align-items:center;gap:13px;margin-bottom:18px;}
.cc-avatar.lg{width:48px;height:48px;border-radius:14px;font-size:20px;}
.cc-mtitle{font-family:var(--serif);font-size:21px;font-weight:600;color:var(--ink);letter-spacing:-.01em;}
.cc-msub{font-size:13px;color:var(--ink2);line-height:1.55;}
.cc-mlabel{display:block;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);margin:0 0 7px 2px;}
.cc-mrow{display:flex;gap:10px;margin-top:6px;}
.cc-mta{width:100%;min-height:122px;resize:vertical;background:var(--surf2);border:1.5px solid var(--line);border-radius:13px;padding:13px 15px;font-size:14.5px;font-family:var(--sans);color:var(--ink);margin-bottom:13px;line-height:1.55;box-sizing:border-box;}
.cc-mta:focus{outline:none;border-color:var(--teal);background:var(--surf);}
.cc-mok{text-align:center;padding:6px 4px 2px;}
.cc-mok-ic{display:flex;width:60px;height:60px;margin:0 auto 14px;align-items:center;justify-content:center;border-radius:50%;background:var(--greenT);color:var(--green);}
.cc-rlist{display:flex;flex-direction:column;gap:8px;max-height:58vh;overflow:auto;}
.cc-ritem{display:flex;align-items:center;gap:12px;background:var(--surf2);border:1px solid var(--line);border-radius:13px;padding:11px 13px;cursor:pointer;font-family:var(--sans);text-align:left;transition:.14s;color:var(--ink);}
.cc-ritem:hover{border-color:var(--teal);transform:translateY(-1px);}
.cc-rico{display:flex;width:36px;height:36px;flex:none;align-items:center;justify-content:center;border-radius:10px;background:var(--grad);color:#fff;}
.cc-rmid{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;}
.cc-rtitle{font-size:14px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cc-rmeta{font-size:11.5px;color:var(--mut);font-weight:500;}
.cc-rnew{font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:var(--grad);border-radius:6px;padding:3px 7px;flex:none;}
.cc-ritem>svg{color:var(--mut);flex:none;}
.cc-fbsec{margin:18px 0 4px;}
@keyframes ccfade{from{opacity:0}to{opacity:1}}
@keyframes ccpop{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}
`;
