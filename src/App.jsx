import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  BookOpen, Layers, Calculator, ClipboardList, Sparkles, GraduationCap,
  Check, X, RotateCcw, ArrowRight, ArrowLeft, RefreshCw, Loader2, Home,
  Lightbulb, AlertTriangle, ChevronDown, Eye, EyeOff, Trophy, Target,
  FileText, Brain, CheckCircle2, XCircle, Send, ListChecks, Award, PenTool,
  Sun, Moon, LogIn, LogOut, Gauge, Flame, Star, PieChart, DollarSign, BarChart3,
  Landmark, Scale, Coins, Percent, Receipt, TrendingUp, Building2, Trash2,
  Menu, User, Clock, MessageSquare
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fmt, TOPICS, TMAP, HARD_PROBLEMS, EXAM_PROBLEMS, EXAM_TEST_POOL } from "./course-data.js";
import { PREP_VARIANTS, PREP_PASS, PREP_PROB_PTS, PREP_MOTO } from "./exam-variants.js";
import { CSS } from "./app-css.js";

/* ===================== STORAGE (localStorage) ===================== */
const PKEY = "mscfo_course_v1";
const TKEY = "mscfo_theme_v1";
const UKEY = "mscfo_user_v1";
function sGet(k){ try{ return Promise.resolve(localStorage.getItem(k)); }catch{ return Promise.resolve(null); } }
function sSet(k,v){ try{ localStorage.setItem(k,v); }catch{} return Promise.resolve(); }

/* ===================== AI ===================== */
async function callAI(prompt, ground, maxTokens=900){
  // Kalit serverda (api/chat.js) saqlanadi — brauzerga umuman chiqmaydi.
  // Foydalanuvchi ismini ham yuboramiz: server kunlik limitni shu bo'yicha hisoblaydi.
  let user="";
  try{ const u=JSON.parse(localStorage.getItem(UKEY)||"null"); user=(u&&u.name)||""; }catch{}
  const res = await fetch("/api/chat",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ prompt, ground, maxTokens, user })
  });
  if(res.status===429||res.status===403){ let m=""; try{ m=(await res.json()).error; }catch{} throw new Error(m||"Лимит запросов исчерпан. Попробуйте позже."); }
  if(!res.ok) throw new Error("API "+res.status);
  const data = await res.json();
  return data.text || "";
}
function parseArr(t){
  const c=t.replace(/```json/gi,"").replace(/```/g,"").trim();
  try{return JSON.parse(c);}catch{}
  const s=c.indexOf("["),e=c.lastIndexOf("]");
  if(s!==-1&&e>s){try{return JSON.parse(c.slice(s,e+1));}catch{}}
  return [];
}
/* ===================== ANALYTICS (admin tracking) ===================== */
function sendEvent(payload){ try{ fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),keepalive:true}); }catch{} }
function progStats(prog){ let cards=0,sum=0,n=0; for(const t of TOPICS){ const p=prog&&prog[t.id]; if(p&&p.cardsKnown) cards+=p.cardsKnown.length; sum+=(p&&p.quizBest)||0; n++; } return {cards, avg: n?Math.round(sum/n):0}; }
function fmtTime(ts){ if(!ts) return "—"; const d=new Date(ts), now=new Date(); const hm=d.toTimeString().slice(0,5);
  if(d.toDateString()===now.toDateString()) return "сегодня, "+hm;
  const y=new Date(now); y.setDate(now.getDate()-1); if(d.toDateString()===y.toDateString()) return "вчера, "+hm;
  return d.getDate().toString().padStart(2,"0")+"."+(d.getMonth()+1).toString().padStart(2,"0")+", "+hm; }

/* ===================== ACTIVITY (реальная геймификация: серия дней, цель, неделя) ===================== */
const AKEY = "mscfo_act_v1";       // { "2026-06-19": 3, ... } — учебных действий за день
const DAY_GOAL = 5;                 // цель: 5 учебных действий в день
function actGet(){ try{ return JSON.parse(localStorage.getItem(AKEY)||"{}")||{}; }catch{ return {}; } }
function dayKey(d){ d=d||new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function recordActivity(){ try{ const m=actGet(); const k=dayKey(); m[k]=(m[k]||0)+1; localStorage.setItem(AKEY,JSON.stringify(m)); }catch{} }
function todayCount(){ return actGet()[dayKey()]||0; }
function getStreak(){ const m=actGet(); let s=0; const d=new Date();
  if(!(m[dayKey(d)]>0)) d.setDate(d.getDate()-1);           // сегодня ещё нет активности → считаем со вчера
  while(m[dayKey(d)]>0){ s++; d.setDate(d.getDate()-1); }
  return s; }
function getWeek(){ const m=actGet(); const L=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]; const out=[]; const t=new Date();
  for(let i=6;i>=0;i--){ const d=new Date(t); d.setDate(t.getDate()-i); out.push({label:L[d.getDay()],count:m[dayKey(d)]||0,today:i===0}); }
  return out; }
function weekDelta(){ const m=actGet(); const t=new Date(); let cur=0,prev=0;
  for(let i=0;i<7;i++){ const d=new Date(t); d.setDate(t.getDate()-i); cur+=m[dayKey(d)]||0; }
  for(let i=7;i<14;i++){ const d=new Date(t); d.setDate(t.getDate()-i); prev+=m[dayKey(d)]||0; }
  if(prev<=0) return null;
  return Math.round((cur-prev)/prev*100); }

/* ===================== CONTENT (из материалов студента) ===================== */
const SRC = "Курс «Сертифицированный главный бухгалтер» (АВСО) — ваши конспекты, тесты, Excel и решения";

/* ---- helper block kinds: p, ul, ol, def, note, warn, formula ---- */

/* ===================== SMALL UI ===================== */
function Block({b}){
  if(b.k==="p") return <p className="cc-p">{b.v}</p>;
  if(b.k==="ul") return <ul className="cc-ul">{b.v.map((x,i)=><li key={i}>{x}</li>)}</ul>;
  if(b.k==="ol") return <ol className="cc-ol">{b.v.map((x,i)=><li key={i}>{x}</li>)}</ol>;
  if(b.k==="note") return <div className="cc-call note"><Lightbulb size={15}/><div><b>Дополнение.</b> {b.v}</div></div>;
  if(b.k==="warn") return <div className="cc-call warn"><AlertTriangle size={15}/><div><b>Внимание.</b> {b.v}</div></div>;
  if(b.k==="formula") return <div className="cc-formula"><Calculator size={15}/><span>{b.v}</span></div>;
  if(b.k==="def") return <div className="cc-def"><span className="cc-def-t">{b.term}</span><span className="cc-def-d">—</span><span>{b.v}</span></div>;
  return null;
}
function Track({v}){ return <div className="cc-track"><div className="cc-track-f" style={{width:v+"%"}}/></div>; }

/* ===================== APP ===================== */
export default function App(){
  const [view,setView]=useState("home");          // home | topic | hw | exam | prep
  const [topicId,setTopicId]=useState("ias16");
  const [tab,setTab]=useState("theory");
  const [prog,setProg]=useState({});
  const [ready,setReady]=useState(false);
  const [theme,setTheme]=useState("light");
  const [user,setUser]=useState(null);
  const [nameDraft,setNameDraft]=useState("");
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState(null);        // null | account | recent | feedback
  const [nameEdit,setNameEdit]=useState("");
  const [fbText,setFbText]=useState("");
  const [fbSent,setFbSent]=useState(false);

  useEffect(()=>{(async()=>{ const raw=await sGet(PKEY); if(raw){try{setProg(JSON.parse(raw));}catch{}} setReady(true); })();},[]);
  useEffect(()=>{ try{ const t=localStorage.getItem(TKEY); if(t==="dark"||t==="light") setTheme(t);
    const u=localStorage.getItem(UKEY); if(u){ try{ setUser(JSON.parse(u)); }catch{} } }catch{} },[]);
  const visitSent = useRef(false);
  const scrollbarRef = useRef(null);
  useEffect(()=>{
    const onScroll=()=>{ const h=document.documentElement; const max=h.scrollHeight-h.clientHeight; const p=max>0?Math.min(1,Math.max(0,h.scrollTop/max)):0; if(scrollbarRef.current) scrollbarRef.current.style.transform="scaleX("+p+")"; };
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll,{passive:true});
    onScroll();
    return ()=>{ window.removeEventListener("scroll",onScroll); window.removeEventListener("resize",onScroll); };
  },[]);
  useEffect(()=>{ try{ document.title="ABCO Academy — курс МСФО"; }catch{} },[]);
  useEffect(()=>{ try{ const bg = theme==="dark" ? "#0A1022" : "#EBEFF7"; document.documentElement.style.background=bg; document.body.style.background=bg; document.body.style.margin="0"; }catch{} },[theme]);
  useEffect(()=>{ if(ready && user && !visitSent.current){ visitSent.current=true; recordActivity(); const s=progStats(prog); sendEvent({u:user.name,t:"login",d:"",cards:s.cards,avg:s.avg}); } },[ready,user]);
  useEffect(()=>{ window.scrollTo(0,0); },[view,topicId]);
  useEffect(()=>{ try{ var d=document.documentElement; d.style.backgroundColor = theme==="dark"?"#0A1022":"#EBEFF7"; d.style.colorScheme = theme==="dark"?"dark":"light"; }catch{} },[theme]);

  const save=useCallback(async(p)=>{ setProg(p); await sSet(PKEY,JSON.stringify(p)); },[]);
  function tp(id){ return prog[id]||{cardsKnown:[],quizBest:0,hw:{}}; }
  function setTP(id,patch){ const cur=tp(id); save({...prog,[id]:{...cur,...patch}}); }
  function toggleTheme(){ const nt=theme==="dark"?"light":"dark"; setTheme(nt); try{localStorage.setItem(TKEY,nt);}catch{} }
  function doLogin(){ const n=nameDraft.trim(); if(!n) return; const u={name:n.slice(0,24)}; setUser(u); try{localStorage.setItem(UKEY,JSON.stringify(u));}catch{} setNameDraft(""); }
  function logout(){ visitSent.current=false; setUser(null); try{localStorage.removeItem(UKEY);}catch{} }
  function track(type,detail){ if(!user) return; recordActivity(); const s=progStats(prog); sendEvent({u:user.name,t:type,d:detail||"",cards:s.cards,avg:s.avg}); }
  function openModal(m){ setMenuOpen(false); if(m==="account") setNameEdit((user&&user.name)||""); if(m==="feedback"){ setFbText(""); setFbSent(false); } setModal(m); }
  function saveName(){ const n=nameEdit.trim(); if(!n) return; const u={...(user||{}),name:n.slice(0,24)}; setUser(u); try{localStorage.setItem(UKEY,JSON.stringify(u));}catch{} }
  function sendFeedback(){ const t=fbText.trim(); if(!t) return; const s=progStats(prog); sendEvent({u:(user&&user.name)||"—",t:"feedback",d:t.slice(0,1000),cards:s.cards,avg:s.avg}); setFbSent(true); }

  const rootCls = "cc"+(theme==="dark"?" dark":"");
  const adminRoute = typeof window!=="undefined" && (/\/admin\/?$/.test(window.location.pathname) || window.location.hash==="#admin");

  if(adminRoute) return <><style>{CSS}</style><div className={rootCls}><AdminView theme={theme} toggleTheme={toggleTheme}/></div></>;

  if(!ready) return <><style>{CSS}</style><div className={rootCls}><div className="cc-boot"><Loader2 size={20} className="cc-spin"/> Загрузка…</div></div></>;

  if(!user) return (<>
    <style>{CSS}</style>
    <div className={rootCls}>
      <div className="cc-gate">
        <div className="cc-gate-bg"/>
        <button className="cc-icon-btn cc-gate-th" onClick={toggleTheme} title="Сменить тему" aria-label="Сменить тему">{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>
        <div className="cc-gate-card">
          <div className="cc-gate-logo"><Sparkles size={28}/></div>
          <h1 className="cc-gate-t">ABCO Academy</h1>
          <p className="cc-gate-s">Интерактивный курс МСФО: теория, карточки, разобранные задачи, тесты и ИИ-репетитор. Войдите, чтобы начать — введите имя, и ваш прогресс сохранится.</p>
          <input className="cc-modal-in" placeholder="Ваше имя" value={nameDraft} maxLength={24} autoFocus
            onChange={e=>setNameDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
          <button className="cc-btn primary cc-modal-go" disabled={!nameDraft.trim()} onClick={doLogin}><LogIn size={16}/> Войти</button>
        </div>
      </div>
    </div>
  </>);

  const topic = TMAP[topicId];

  return(<>
    <style>{CSS}</style>
    <div className={rootCls}>
      <div className="cc-scrollbar" ref={scrollbarRef} aria-hidden="true"/>
      <header className="cc-top">
        <button className="cc-brand" onClick={()=>setView("home")}>
          <span className="cc-brand-m abco-logo">abco</span>
          <span><span className="cc-brand-n">ABCO Academy</span><span className="cc-brand-s">MCFO курс · ИИ-репетитор</span></span>
        </button>
        <div className="cc-top-r">
          <div className="cc-menu-wrap">
            <button className="cc-burger" onClick={()=>setMenuOpen(o=>!o)} title="Меню" aria-label="Меню" aria-expanded={menuOpen}>{menuOpen?<X size={19}/>:<Menu size={19}/>}</button>
            {menuOpen && <>
              <div className="cc-menu-back" onClick={()=>setMenuOpen(false)}/>
              <div className="cc-menu" role="menu">
                <div className="cc-menu-head"><span className="cc-avatar">{user.name.charAt(0).toUpperCase()}</span><div className="cc-menu-hi"><b>{user.name}</b><small>Ученик</small></div></div>
                <button className="cc-menu-i" onClick={()=>{openModal("account");setMenuOpen(false);}}><User size={16}/> Аккаунт</button>
                <button className="cc-menu-i" onClick={()=>{openModal("recent");setMenuOpen(false);}}><Clock size={16}/> Недавно добавленные</button>
                {view!=="home" && <button className="cc-menu-i" onClick={()=>{setView("home");setMenuOpen(false);}}><Home size={16}/> В главное меню</button>}
                <button className="cc-menu-i" onClick={()=>{openModal("feedback");setMenuOpen(false);}}><MessageSquare size={16}/> Сообщить об ошибке</button>
                <button className="cc-menu-i" onClick={toggleTheme}>{theme==="dark"?<Sun size={16}/>:<Moon size={16}/>} {theme==="dark"?"Светлая тема":"Тёмная тема"}</button>
                <button className="cc-menu-i danger" onClick={()=>{logout();setMenuOpen(false);}}><LogOut size={16}/> Выйти</button>
              </div>
            </>}
          </div>
        </div>
      </header>

      {view==="home" && <HomeView prog={prog} tp={tp} user={user} open={(id,tabName)=>{setTopicId(id);setTab(tabName||"theory");setView("topic");track("topic",(TMAP[id]||{}).code||id);}} goHw={()=>setView("hw")} goExam={()=>setView("exam")} goPrep={()=>setView("prep")}/>}
      {view==="topic" && <TopicView topic={topic} tab={tab} setTab={setTab} tp={tp} setTP={setTP} goHome={()=>setView("home")} track={track}/>}
      {view==="hw" && <HomeworkHub goHome={()=>setView("home")}/>}
      {view==="exam" && <ExamView prog={prog} save={save} track={track} goHome={()=>setView("home")}/>}
      {view==="prep" && <PrepView prog={prog} save={save} track={track} goHome={()=>setView("home")} openTopic={(id)=>{setTopicId(id);setTab("theory");setView("topic");track("topic",(TMAP[id]||{}).code||id);}}/>}

      {modal && <div className="cc-mov" onClick={()=>setModal(null)}>
        <div className="cc-mcard" onClick={e=>e.stopPropagation()}>
          <button className="cc-mx" onClick={()=>setModal(null)} aria-label="Закрыть"><X size={18}/></button>

          {modal==="account" && <>
            <div className="cc-mhead"><span className="cc-avatar lg">{((user&&user.name)||"?").charAt(0).toUpperCase()}</span>
              <div><div className="cc-mtitle">Аккаунт</div><div className="cc-msub">{user&&user.name}</div></div></div>
            <label className="cc-mlabel">Имя</label>
            <input className="cc-modal-in" style={{textAlign:"left"}} value={nameEdit} maxLength={24}
              onChange={e=>setNameEdit(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveName()}/>
            <div className="cc-mrow">
              <button className="cc-btn primary" style={{flex:1}} disabled={!nameEdit.trim()||nameEdit.trim()===(user&&user.name)} onClick={saveName}><Check size={16}/> Сохранить</button>
              <button className="cc-btn dno" onClick={()=>{ setModal(null); logout(); }}><LogOut size={16}/> Выйти</button>
            </div>
          </>}

          {modal==="recent" && <>
            <div className="cc-mtitle" style={{marginBottom:4}}>Недавно добавленные</div>
            <div className="cc-msub" style={{marginBottom:14}}>Новые разделы и темы курса — последние сверху.</div>
            <div className="cc-rlist">
              <button className="cc-ritem" onClick={()=>{ setModal(null); setView("prep"); }}>
                <span className="cc-rico"><Target size={16}/></span>
                <span className="cc-rmid"><span className="cc-rtitle">Подготовка к экзамену</span><span className="cc-rmeta">{PREP_VARIANTS.length} вариантов · таймер · проверка ИИ</span></span>
                <span className="cc-rnew">новое</span>
                <ArrowRight size={15}/>
              </button>
              {[...TOPICS].reverse().slice(0,6).map((t)=>{ const n=(t.theory||[]).length; const w=(n%10===1&&n%100!==11)?"урок":((n%10>=2&&n%10<=4&&(n%100<10||n%100>=20))?"урока":"уроков"); return (
                <button className="cc-ritem" key={t.id} onClick={()=>{ setModal(null); setTopicId(t.id); setTab("theory"); setView("topic"); track("topic",(TMAP[t.id]||{}).code||t.id); }}>
                  <span className="cc-rico"><BookOpen size={16}/></span>
                  <span className="cc-rmid"><span className="cc-rtitle">{t.title}</span><span className="cc-rmeta">{t.code} · {n} {w}</span></span>
                  <ArrowRight size={15}/>
                </button>
              ); })}
            </div>
          </>}

          {modal==="feedback" && (fbSent ? <div className="cc-mok">
              <span className="cc-mok-ic"><CheckCircle2 size={28}/></span>
              <div className="cc-mtitle">Спасибо!</div>
              <div className="cc-msub" style={{margin:"6px 0 18px"}}>Ваше сообщение отправлено. Мы исправим это в ближайшее время.</div>
              <button className="cc-btn primary cc-modal-go" onClick={()=>setModal(null)}>Закрыть</button>
            </div> : <>
              <div className="cc-mtitle" style={{marginBottom:4}}>Сообщить об ошибке</div>
              <div className="cc-msub" style={{marginBottom:12}}>Если вы нашли ошибку или неточность — напишите нам, и мы исправим.</div>
              <textarea className="cc-mta" placeholder="Опишите ошибку или замечание…" value={fbText} maxLength={1000} autoFocus onChange={e=>setFbText(e.target.value)}/>
              <button className="cc-btn primary cc-modal-go" disabled={!fbText.trim()} onClick={sendFeedback}><Send size={16}/> Отправить</button>
            </>)}

        </div>
      </div>}
    </div>
  </>);
}

/* ---------- HOME ---------- */
const SCENE=[
  {l:"4%",t:"14%",s:48,c:"--emerald2",o:.18,a:"flA 15s",d:"-2s",I:TrendingUp},
  {l:"11%",t:"54%",s:42,c:"--sky",o:.16,a:"flB 19s",d:"-6s",I:BarChart3},
  {l:"7%",t:"82%",s:40,c:"--amber2",o:.15,a:"flC 16s",d:"-3s",I:DollarSign},
  {l:"21%",t:"30%",s:34,c:"--violet",o:.15,a:"flB 22s",d:"-9s",I:PieChart},
  {l:"30%",t:"72%",s:38,c:"--emerald2",o:.15,a:"flA 18s",d:"-5s",I:FileText},
  {l:"42%",t:"10%",s:34,c:"--sky",o:.15,a:"flC 20s",d:"-1s",I:Calculator},
  {l:"50%",t:"46%",s:30,c:"--amber2",o:.13,a:"flB 17s",d:"-11s",I:Receipt},
  {l:"60%",t:"78%",s:42,c:"--violet",o:.15,a:"flA 21s",d:"-4s",I:Scale},
  {l:"69%",t:"20%",s:40,c:"--emerald2",o:.16,a:"flC 14s",d:"-7s",I:TrendingUp},
  {l:"78%",t:"60%",s:36,c:"--sky",o:.15,a:"flB 23s",d:"-2.5s",I:Coins},
  {l:"88%",t:"16%",s:42,c:"--amber2",o:.16,a:"flA 16s",d:"-8s",I:Landmark},
  {l:"92%",t:"50%",s:34,c:"--violet",o:.15,a:"flC 19s",d:"-5.5s",I:Percent},
  {l:"84%",t:"84%",s:38,c:"--emerald2",o:.15,a:"flB 15s",d:"-10s",I:TrendingUp},
  {l:"36%",t:"90%",s:32,c:"--sky",o:.13,a:"flA 20s",d:"-3.5s",I:BarChart3},
  {l:"54%",t:"26%",s:30,c:"--amber2",o:.13,a:"flC 18s",d:"-12s",I:Coins},
  {l:"17%",t:"8%",s:30,c:"--violet",o:.13,a:"flB 21s",d:"-1.5s",I:Layers},
];

/* 3D tilt: sichqoncha pozitsiyasiga qarab kartani egadi (ABCO 3D effekti) */
function tiltMove(e){ const el=e.currentTarget; const r=el.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
  el.style.transform='perspective(900px) rotateX('+((0.5-py)*7).toFixed(2)+'deg) rotateY('+((px-0.5)*9).toFixed(2)+'deg) translateY(-4px)';
  el.style.setProperty('--mx',(px*100).toFixed(1)+'%'); el.style.setProperty('--my',(py*100).toFixed(1)+'%'); }
function tiltLeave(e){ e.currentTarget.style.transform=''; }

/* ---------- 3D scroll showcase (framer-motion) ---------- */
function ScrollShowcase({pct=0}){
  const ref=useRef(null);
  const nTopics=TOPICS.length;
  const nCards=TOPICS.reduce((s,t)=>s+t.cards.length,0);
  const nQuiz=TOPICS.reduce((s,t)=>s+t.quiz.length,0);
  const codes=TOPICS.map(t=>t.code).filter(c=>/^(IAS|IFRS)/i.test(c));
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","center center"]});
  const [mob,setMob]=useState(false);
  useEffect(()=>{const c=()=>setMob(window.innerWidth<=768);c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c);},[]);
  const rotate=useTransform(scrollYProgress,[0,1],[16,0]);
  const scale=useTransform(scrollYProgress,[0,1],mob?[0.92,1]:[1.04,1]);
  const ty=useTransform(scrollYProgress,[0,1],[44,0]);
  return(
    <section className="ss" ref={ref}>
      <motion.div className="ss-head" style={{y:ty}}>
        <span className="ss-eyebrow"><Sparkles size={13}/> Один курс — всё включено</span>
        <h3>Всё для подготовки <span className="grad">в одном месте</span></h3>
        <p>Конспекты, карточки, разобранные задачи, тесты и ИИ-репетитор — в одном приложении.</p>
      </motion.div>
      <div className="ss-stage">
        <motion.div className="ss-card" style={{rotateX:rotate,scale}}>
          <div className="ss-screen">
            <div className="ss-bar"><span className="ss-logo">abco</span><span className="ss-win"><i/><i/><i/></span></div>
            <div className="ss-grid">
              <div className="ss-main">
                <span className="ss-tag">КУРС МСФО · ABCO</span>
                <h4>Осваивайте <span className="grad">МСФО</span> каждый день</h4>
                <div className="ss-chips">{codes.map((c,i)=><span key={i}>{c}</span>)}</div>
                <div className="ss-rows">
                  {[["Конспекты",nTopics+" тем"],["Карточки",nCards+" шт"],["Тесты",nQuiz+" вопросов"]].map((r,i)=>(
                    <div className="ss-row" key={i}><span className="ss-rdot"/><b>{r[0]}</b><span>{r[1]}</span></div>
                  ))}
                </div>
              </div>
              <div className="ss-side">
                <div className="ss-ring"><span>{pct}%</span><small>прогресс</small></div>
                <span className="ss-b3d s1" aria-hidden="true">abco</span>
                <span className="ss-b3d s2" aria-hidden="true">abco</span>
                <span className="ss-b3d s3" aria-hidden="true">abco</span>
                <span className="ss-b3d s4" aria-hidden="true">abco</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomeView({prog,tp,user,open,goHw,goExam,goPrep}){
  const ref=useRef(null);
  const COL=["em","sky","amb","vio"];
  const dl=n=>{const a=n%100,b=n%10; if(a>10&&a<20)return"дней"; if(b===1)return"день"; if(b>=2&&b<=4)return"дня"; return"дней";};

  // ---- РЕАЛЬНЫЕ данные (никаких выдуманных чисел) ----
  const totalCards=TOPICS.reduce((s,t)=>s+t.cards.length,0);
  const knownCards=TOPICS.reduce((s,t)=>s+tp(t.id).cardsKnown.length,0);
  const avgQuiz=Math.round(TOPICS.reduce((s,t)=>s+tp(t.id).quizBest,0)/TOPICS.length);
  const maxQuiz=Math.max(0,...TOPICS.map(t=>tp(t.id).quizBest));
  const hwTotal=TOPICS.reduce((s,t)=>s+t.homeworks.length,0);
  const hwDone=TOPICS.reduce((s,t)=>s+Object.keys(tp(t.id).hw||{}).length,0);
  const topicsStarted=TOPICS.filter(t=>tp(t.id).cardsKnown.length>0||tp(t.id).quizBest>0).length;
  const coursePct=totalCards?Math.round(knownCards/totalCards*100):0;
  const CIRC=465;
  const streak=getStreak();
  const today=todayCount();
  const goalPct=Math.min(Math.round(today/DAY_GOAL*100),100);
  const week=getWeek();
  const wkMax=Math.max(1,...week.map(d=>d.count));
  let hotIdx=0; week.forEach((d,i)=>{ if(d.count>week[hotIdx].count) hotIdx=i; });
  if(week[hotIdx].count===0) hotIdx=-1;
  const delta=weekDelta();
  const nextTopic=(TOPICS.find(t=>tp(t.id).cardsKnown.length<t.cards.length)||TOPICS[0]).id;

  const STAT=[
    {c:"em", glow:true, I:<Layers size={19}/>,        num:knownCards,    suf:"", lab:"/"+totalCards+" карточек выучено", bar:coursePct},
    {c:"amb",I:<Gauge size={19}/>,                     num:avgQuiz,       suf:"%",lab:"средний балл теста",            bar:avgQuiz},
    {c:"sky",I:<ClipboardList size={19}/>,             num:hwDone,        suf:"", lab:"/"+hwTotal+" домашних сделано",   bar:hwTotal?Math.round(hwDone/hwTotal*100):0},
    {c:"vio",I:<BookOpen size={19}/>,                  num:topicsStarted, suf:"", lab:"/"+TOPICS.length+" темы начаты",   bar:Math.round(topicsStarted/TOPICS.length*100)},
  ];

  useEffect(()=>{
    const root=ref.current; if(!root) return;
    const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease=p=>1-Math.pow(1-p,3);
    const rp=root.querySelector("#ccringp"), rv=root.querySelector("#ccringv");
    if(reduce){
      if(rp) rp.style.strokeDashoffset=CIRC-CIRC*coursePct/100;
      if(rv) rv.textContent=coursePct+"%";
      root.querySelectorAll("[data-c]").forEach(el=>{ el.textContent=el.dataset.c+(el.dataset.suf||""); });
      root.querySelectorAll(".pbar i,.bar i,.gt i").forEach(i=>{ i.style.width=(i.dataset.w||0)+"%"; });
      root.querySelectorAll(".bars .bk i").forEach(i=>{ i.style.height=(i.dataset.h||0)+"%"; });
      return;
    }
    const rafs=[]; let t0=null;
    const animRing=ts=>{ if(!t0)t0=ts; const p=Math.min((ts-t0)/1100,1),e=ease(p);
      if(rp) rp.style.strokeDashoffset=CIRC-(CIRC*coursePct/100)*e;
      if(rv) rv.textContent=Math.round(coursePct*e)+"%";
      if(p<1) rafs.push(requestAnimationFrame(animRing)); };
    rafs.push(requestAnimationFrame(animRing));
    root.querySelectorAll("[data-c]").forEach(el=>{
      const to=+el.dataset.c, suf=el.dataset.suf||""; let s=null;
      const a=ts=>{ if(!s)s=ts; const p=Math.min((ts-s)/900,1); el.textContent=Math.round(to*ease(p))+suf; if(p<1) rafs.push(requestAnimationFrame(a)); };
      rafs.push(requestAnimationFrame(a));
    });
    const timer=setTimeout(()=>{
      root.querySelectorAll(".pbar i,.bar i,.gt i").forEach(i=>{ i.style.width=(i.dataset.w||0)+"%"; });
      root.querySelectorAll(".bars .bk i").forEach(i=>{ i.style.height=(i.dataset.h||0)+"%"; });
    },300);
    return ()=>{ rafs.forEach(cancelAnimationFrame); clearTimeout(timer); };
  },[coursePct]);

  return(<>
    <div className="cc-scene" aria-hidden="true">
      {SCENE.map((f,i)=>(
        <div key={i} className="cc-fi" style={{left:f.l,top:f.t,width:f.s,height:f.s,color:"var("+f.c+")",opacity:f.o,animation:f.a+" ease-in-out infinite",animationDelay:f.d}}>
          <f.I/>
        </div>
      ))}
    </div>

    <main className="cc-main ccx" ref={ref}>
      <section className="hero frame reveal">
        <div className="hero-l">
          <div className="eyebrow"><span className="dot"></span>{user ? "С возвращением, "+user.name : "Учебный курс"}</div>
          <h2>Осваивайте <span className="grad">МСФО</span> каждый день</h2>
          <p>Курс «Сертифицированный главный бухгалтер» (ABCO): конспекты, карточки, разобранные задачи, тесты и ИИ-репетитор — всё в одном месте.</p>
          <div className="cta-row">
            <button className="btn btn-primary" onClick={()=>open(nextTopic)}>Продолжить обучение <ArrowRight size={18}/></button>
            <button className="btn btn-ghost" onClick={()=>open(nextTopic,"tutor")}><Sparkles size={18}/> Спросить ИИ-репетитора</button>
          </div>
          <div className="chips">
            <span className="chip amb"><Flame size={15}/> {streak>0 ? streak+" "+dl(streak)+" подряд" : "Начни серию сегодня"}</span>
            {maxQuiz>0 && <span className="chip em"><Star size={15}/> Лучший тест: {maxQuiz}%</span>}
            <span className="chip"><Target size={15}/> Цель: {DAY_GOAL} занятий в день</span>
          </div>
        </div>
        <div className="ring-card">
          <div className="ring">
            <img src="/3d/coin.webp?v=7" className="abco-3d p1" alt="" aria-hidden="true" loading="lazy"/>
            <img src="/3d/cap.webp?v=7" className="abco-3d p4" alt="" aria-hidden="true" loading="lazy"/>
            <img src="/3d/chart.webp?v=7" className="abco-3d p2" alt="" aria-hidden="true" loading="lazy"/>
            <img src="/3d/scale.webp?v=7" className="abco-3d p3" alt="" aria-hidden="true" loading="lazy"/>
            <svg width="170" height="170" viewBox="0 0 170 170">
              <circle className="rtrack" cx="85" cy="85" r="74" fill="none" strokeWidth="12"/>
              <circle id="ccringp" cx="85" cy="85" r="74" fill="none" stroke="url(#ccg)" strokeWidth="12" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC}/>
              <defs><linearGradient id="ccg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F2913A"/><stop offset="1" stopColor="#3C5BA8"/></linearGradient></defs>
            </svg>
            <div className="pct"><b id="ccringv">0%</b><small>прогресс курса</small></div>
          </div>
          <div className="streak"><Flame size={16}/> {streak>0 ? streak+" "+dl(streak)+" подряд" : "Серия дней: 0"}</div>
          <div className="goal">
            <div className="gl"><span>Цель дня</span><span>{Math.min(today,DAY_GOAL)} / {DAY_GOAL}</span></div>
            <div className="gt"><i data-w={goalPct} style={{width:0}}/></div>
          </div>
        </div>
      </section>

      <div className="abco-marquee-wrap reveal" style={{animationDelay:".06s"}}>
        <span className="abco-mq-label">Готовим к сертификациям</span>
        <div className="abco-mq"><div className="abco-mq-row">
          {["ACCA DipIFR","CIPA","CFA","IAS / IFRS","CIMA","МСФО PRO","ACCA DipIFR","CIPA","CFA","IAS / IFRS","CIMA","МСФО PRO"].map((c,i)=>(
            <span key={i} className="abco-cert"><span className="abco-cert-dot"/>{c}</span>
          ))}
        </div></div>
      </div>

      <section className="ai frame reveal" style={{animationDelay:".08s"}} onClick={()=>open(nextTopic,"tutor")} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
        <div className="aic"><Sparkles size={27}/></div>
        <div className="atxt">
          <h4>ИИ-репетитор всегда рядом</h4>
          <p>Объяснит проводку, разберёт задачу по МСФО и проверит твой открытый ответ — на русском, по программе курса.</p>
        </div>
        <div className="ago"><button className="btn btn-primary" onClick={(e)=>{e.stopPropagation();open(nextTopic,"tutor");}}>Спросить <ArrowRight size={18}/></button></div>
      </section>

      <ScrollShowcase pct={coursePct}/>

      <div className="sec-head"><h3>Ваша статистика</h3></div>
      <section className="stats">
        {STAT.map((s,i)=>(
          <div className={"stat reveal"+(s.glow?" glow-em":"")} style={{animationDelay:(.05+i*.05)+"s"}} key={i} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
            <div className="stat-top"><div className={"ic e-"+s.c}>{s.I}</div></div>
            <b data-c={s.num} data-suf={s.suf}>0{s.suf}</b><span>{s.lab}</span>
            <div className="bar"><i className={"f-"+s.c} data-w={s.bar} style={{width:0}}/></div>
          </div>
        ))}
      </section>

      <section className="spark reveal" style={{animationDelay:".12s"}}>
        <div className="sh"><b>Активность за неделю</b>{delta!==null && <span><TrendingUp size={13}/> {delta>=0?"+":""}{delta}% к прошлой неделе</span>}</div>
        <div className="bars">
          {week.map((d,i)=>(
            <div className={"col"+(i===hotIdx?" hot":"")} key={i}>
              <div className="bk"><i data-h={Math.round(d.count/wkMax*100)} style={{height:0}}/></div>
              <div className="dl">{d.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="sec-head"><h3>Темы курса</h3></div>
      <section className="grid">
        {TOPICS.map((t,i)=>{
          const p=tp(t.id); const c=COL[i%COL.length];
          const cardPct=Math.round(p.cardsKnown.length/t.cards.length*100);
          const done=p.cardsKnown.length>=t.cards.length;
          return(
            <div key={t.id} className={"mod "+c+" reveal"} style={{animationDelay:(.05+i*.05)+"s"}} onClick={()=>open(t.id)} onMouseMove={tiltMove} onMouseLeave={tiltLeave}><span className="mod-light" aria-hidden="true"/>
              <div className="mod-top"><span className={"badge b-"+c}>{t.code.toUpperCase()}</span><span className="arrow"><ArrowRight size={18}/></span></div>
              <h4>{t.title}</h4>
              <div className="meta">{t.theory.length} разд. · {t.cards.length} карточек · {t.quiz.length} тестов</div>
              <div className="pwrap"><div className="pbar"><i className={"f-"+c} data-w={cardPct} style={{width:0}}/></div><span className="pval" data-c={cardPct} data-suf="%">0%</span></div>
              <div className="mod-foot">
                {done ? <span className="ok"><Check size={14}/> {p.cardsKnown.length} / {t.cards.length} карточек</span> : <span>{p.cardsKnown.length} / {t.cards.length} карточек</span>}
                <span className={p.quizBest>0&&p.quizBest<50?"warn":""}>тест {p.quizBest}%</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="two three">
        <div className="wide" onClick={goHw} onMouseMove={tiltMove} onMouseLeave={tiltLeave}><div className="wic e-sky"><PenTool size={24}/></div><div><h4>Домашние задания</h4><p>Все задачи для самостоятельного решения</p></div><span className="wgo"><ArrowRight size={20}/></span></div>
        <div className="wide" onClick={goExam} onMouseMove={tiltMove} onMouseLeave={tiltLeave}><div className="wic e-amb"><Trophy size={24}/></div><div><h4>Экзамен</h4><p>Задачи с решениями и смешанные тесты</p></div><span className="wgo"><ArrowRight size={20}/></span></div>
        <div className="wide" onClick={goPrep} onMouseMove={tiltMove} onMouseLeave={tiltLeave}><div className="wic e-vio"><Target size={24}/></div><div><h4>Подготовка к экзамену</h4><p>Готовность по темам и пробный экзамен с таймером</p></div><span className="wgo"><ArrowRight size={20}/></span></div>
      </section>
    </main>

    <div className="cc-mcta"><button className="btn btn-primary" onClick={()=>open(nextTopic)}>Продолжить обучение <ArrowRight size={18}/></button></div>
  </>);
}

/* ---------- TOPIC ---------- */
function TopicView({topic,tab,setTab,tp,setTP,goHome,track}){
  const p=tp(topic.id);
  const TABS=[["theory","Теория",<BookOpen size={16}/>],["cards","Карточки",<Layers size={16}/>],["tasks","Задачи",<Calculator size={16}/>],["quiz","Тест",<ClipboardList size={16}/>],["tutor","Репетитор",<Sparkles size={16}/>]];
  return(
    <main className="cc-main">
      <button className="cc-back" onClick={goHome}><ArrowLeft size={15}/> В главное меню</button>
      <div className="cc-thead">
        <span className="cc-tcode big">{topic.code}</span>
        <h1 className="cc-h1 sm">{topic.title}</h1>
      </div>
      <nav className="cc-tabs">
        {TABS.map(([k,l,ic])=><button key={k} className={"cc-tab"+(tab===k?" on":"")} onClick={()=>setTab(k)}><span className="cc-tab-ic">{ic}</span>{l}</button>)}
      </nav>
      {tab==="theory" && <Theory topic={topic}/>}
      {tab==="cards" && <Cards topic={topic} p={p} setTP={setTP}/>}
      {tab==="tasks" && <Tasks topic={topic}/>}
      {tab==="quiz" && <Quiz topic={topic} p={p} setTP={setTP} track={track}/>}
      {tab==="tutor" && <Tutor topic={topic}/>}
    </main>
  );
}

function Theory({topic}){
  const [open,setOpen]=useState(1);
  return(
    <div className="cc-view">
      <p className="cc-note-lead">Разделы из вашего конспекта. Голубые врезки «Дополнение» — пояснения сверх конспекта.</p>
      <div className="cc-acc">
        {topic.theory.map(s=>(
          <div key={s.n} className={"cc-acc-i"+(open===s.n?" open":"")}>
            <button className="cc-acc-h" onClick={()=>setOpen(open===s.n?0:s.n)}>
              <span className="cc-acc-n">{s.n}</span><span className="cc-acc-t">{s.title}</span><ChevronDown size={18} className="cc-acc-c"/>
            </button>
            {open===s.n && <div className="cc-acc-b">{s.blocks.map((b,i)=><Block key={i} b={b}/>)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cards({topic,p,setTP}){
  const cards=topic.cards;
  const [onlyNew,setOnlyNew]=useState(false);
  const known=new Set(p.cardsKnown);
  const pool=useMemo(()=> onlyNew? cards.map((c,i)=>i).filter(i=>!known.has(i)) : cards.map((c,i)=>i), [onlyNew,p.cardsKnown,topic.id]);
  const [pos,setPos]=useState(0);
  const [flip,setFlip]=useState(false);
  useEffect(()=>{setPos(0);setFlip(false);},[onlyNew,topic.id]);
  if(pool.length===0) return <div className="cc-view"><div className="cc-empty"><Trophy size={26}/><p>Все карточки этой темы выучены! Снимите фильтр, чтобы повторить.</p><button className="cc-btn ghost" onClick={()=>setOnlyNew(false)}>Показать все</button></div></div>;
  const idx=pool[pos%pool.length]; const [f,b]=cards[idx];
  function rate(ok){ const n=new Set(p.cardsKnown); if(ok)n.add(idx); else n.delete(idx); setTP(topic.id,{cardsKnown:[...n]}); setFlip(false); setPos(x=>x+1); }
  return(
    <div className="cc-view">
      <div className="cc-cards-top">
        <span>Карточка {(pos%pool.length)+1} из {pool.length}</span>
        <label className="cc-switch"><input type="checkbox" checked={onlyNew} onChange={e=>setOnlyNew(e.target.checked)}/> только невыученные</label>
      </div>
      <Track v={Math.round(p.cardsKnown.length/cards.length*100)}/>
      <div className={"cc-card3d"+(flip?" flip":"")+(known.has(idx)?" done":"")} onClick={()=>setFlip(!flip)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setFlip(!flip);}}}>
        <div className="cc-card3d-in">
          <div className="cc-card-face cc-card-front">
            <div className="cc-card-tag">Вопрос</div>
            <div className="cc-card-tx">{f}</div>
            <div className="cc-card-hint">Нажмите, чтобы перевернуть</div>
          </div>
          <div className="cc-card-face cc-card-back">
            <div className="cc-card-tag">Ответ</div>
            <div className="cc-card-tx">{b}</div>
          </div>
        </div>
      </div>
      <div className="cc-card-act">
        {!flip ? <button className="cc-btn ghost" onClick={()=>setFlip(true)}><Eye size={16}/> Показать ответ</button>
        : <><button className="cc-btn dno" onClick={()=>rate(false)}><X size={16}/> Не знал</button><button className="cc-btn yes" onClick={()=>rate(true)}><Check size={16}/> Знал</button></>}
      </div>
      <div className="cc-card-nav">
        <button className="cc-mini" onClick={()=>{setFlip(false);setPos(x=>(x-1+pool.length)%pool.length);}}><ArrowLeft size={15}/></button>
        <button className="cc-mini" onClick={()=>{setTP(topic.id,{cardsKnown:[]});setPos(0);setFlip(false);}} title="Сбросить"><RotateCcw size={15}/></button>
        <button className="cc-mini" onClick={()=>{setFlip(false);setPos(x=>x+1);}}><ArrowRight size={15}/></button>
      </div>
    </div>
  );
}

function Tasks({topic}){
  return(
    <div className="cc-view">
      <p className="cc-note-lead">Разобранные задачи из вашего курса. Решения скрыты — сначала попробуйте сами. Домашние задания вынесены в отдельный раздел (кнопка «Темы» → «Домашние задания»), а полный банк задач и тестов — в разделе «Экзамен».</p>
      {topic.examples.map((ex,i)=><ExampleCard key={i} ex={ex}/>)}
    </div>
  );
}
function ExampleCard({ex}){
  const [show,setShow]=useState(false);
  return(
    <div className="cc-task">
      <div className="cc-task-h"><Calculator size={16}/><span>{ex.title}</span></div>
      <p className="cc-task-c">{ex.problem}</p>
      {!show ? <button className="cc-btn ghost" onClick={()=>setShow(true)}><Eye size={16}/> Показать решение</button>
      : <div className="cc-sol">
          {ex.steps.map((s,i)=><div key={i} className="cc-step"><span className="cc-step-n">{i+1}</span><div><b>{s[0]}.</b> {s[1]}</div></div>)}
          <div className="cc-ans"><Check size={16}/> {ex.answer}</div>
          <button className="cc-btn ghost sm" onClick={()=>setShow(false)}><EyeOff size={15}/> Скрыть</button>
        </div>}
    </div>
  );
}

function Quiz({topic,p,setTP,track}){
  const QUIZ=topic.quiz;
  const [stage,setStage]=useState("intro"); const [idx,setIdx]=useState(0);
  const [res,setRes]=useState(QUIZ.map(()=>null)); const [draft,setDraft]=useState(""); const [ev,setEv]=useState(false);
  function start(){setStage("run");setIdx(0);setRes(QUIZ.map(()=>null));setDraft("");}
  const q=QUIZ[idx], r=res[idx];
  function mcq(c){ setRes(a=>a.map((x,i)=>i===idx?{correct:c===q.correct,choice:c}:x)); }
  async function chk(){ if(!draft.trim())return; setEv(true);
    try{ const t=await callAI(`Вопрос: "${q.q}"\nОбразец: "${q.sample}"\nОтвет студента: "${draft.trim()}"\nОцени 0-100, кратко прокомментируй. Верни ТОЛЬКО JSON: [{"ball":<0-100>,"fikr":"..."}]`,topic.ground,500);
      const o=parseArr(t)[0]||{}; const sc=Math.max(0,Math.min(100,Number(o.ball)||0));
      setRes(a=>a.map((x,i)=>i===idx?{open:true,given:draft.trim(),score:sc,correct:sc>=60,fb:o.fikr||""}:x));
    }catch(e){ setRes(a=>a.map((x,i)=>i===idx?{open:true,given:draft.trim(),score:0,correct:false,fb:(e&&e.message)||"Не удалось оценить."}:x)); }
    finally{setEv(false);}
  }
  function next(){ setDraft(""); if(idx+1>=QUIZ.length){ const c=res.filter(x=>x&&x.correct).length; const pct=Math.round(c/QUIZ.length*100); if(pct>p.quizBest) setTP(topic.id,{quizBest:pct}); if(track) track("quiz",topic.code+": "+pct+"%"); setStage("done"); } else setIdx(idx+1); }

  if(stage==="intro") return <div className="cc-view"><div className="cc-quiz-i"><ClipboardList size={28}/><h2>Тест: {topic.title}</h2><p>{QUIZ.length} вопросов из вашего курса. Лучший результат: <b>{p.quizBest}%</b>.</p><button className="cc-btn primary" onClick={start}><ArrowRight size={16}/> Начать</button></div></div>;
  if(stage==="done"){ const c=res.filter(x=>x&&x.correct).length; const pct=Math.round(c/QUIZ.length*100);
    return <div className="cc-view"><div className="cc-done"><div className="cc-done-p">{pct}%</div><h2>{pct>=80?"Отлично!":pct>=60?"Хорошо":"Повторите теорию"}</h2><p>{c} из {QUIZ.length} верно</p><div className="cc-done-a"><button className="cc-btn amber" onClick={start}><RefreshCw size={16}/> Заново</button><button className="cc-btn ghost" onClick={()=>setStage("intro")}>Назад</button></div></div></div>;
  }
  return(
    <div className="cc-view">
      <div className="cc-quiz-top">Вопрос {idx+1} / {QUIZ.length}</div>
      <Track v={Math.round(idx/QUIZ.length*100)}/>
      <div className="cc-q">{q.q}</div>
      {!q.open && q.options ? (
        <>
          <div className="cc-opts">{q.options.map((o,i)=>{ let cls="cc-opt"; if(r){ if(i===q.correct)cls+=" right"; else if(i===r.choice)cls+=" wrong"; }
            return <button key={i} className={cls} disabled={!!r} onClick={()=>mcq(i)}><span className="cc-opt-k">{String.fromCharCode(1040+i)}</span><span>{o}</span></button>; })}</div>
          {r && <div className={"cc-fb "+(r.correct?"good":"bad")}><b>{r.correct?"Верно!":"Неверно."}</b> {q.explain}</div>}
        </>
      ):(
        <>
          <textarea className="cc-ta" placeholder="Ваш ответ…" value={r?r.given:draft} disabled={!!r} onChange={e=>setDraft(e.target.value)}/>
          {!r ? <button className="cc-btn primary" disabled={ev||!draft.trim()} onClick={chk}>{ev?<span className="cc-sp"><Loader2 size={15} className="cc-spin"/> ИИ оценивает…</span>:<><Send size={15}/> Проверить</>}</button>
          : <div className={"cc-fb "+(r.correct?"good":r.score>=40?"mid":"bad")}><b>Балл: {r.score}/100.</b> {r.fb}<div className="cc-sample"><b>Образец:</b> {q.sample}</div></div>}
        </>
      )}
      {r && <div className="cc-qnav"><button className="cc-btn primary" onClick={next}>{idx+1>=QUIZ.length?<>Завершить <Trophy size={15}/></>:<>Далее <ArrowRight size={15}/></>}</button></div>}
    </div>
  );
}

function Tutor({topic}){
  const [q,setQ]=useState(""); const [log,setLog]=useState([]); const [busy,setBusy]=useState(false);
  async function ask(text){ const Q=(text||q).trim(); if(!Q||busy)return; setLog(l=>[...l,{r:"u",t:Q}]); setQ(""); setBusy(true);
    try{ const a=await callAI(Q,topic.ground,900); setLog(l=>[...l,{r:"a",t:a}]); }catch(e){ setLog(l=>[...l,{r:"a",t:(e&&e.message)||"Не удалось получить ответ."}]); } finally{setBusy(false);} }
  return(
    <div className="cc-view">
      <p className="cc-note-lead">ИИ-репетитор отвечает по теме «{topic.title}», опираясь на ваш курс.</p>
      <div className="cc-chat">
        {log.map((m,i)=><div key={i} className={"cc-msg "+m.r}>{m.r==="a"&&<div className="cc-msg-ic"><Sparkles size={13}/></div>}<div className="cc-msg-b">{m.t}</div></div>)}
        {busy&&<div className="cc-msg a"><div className="cc-msg-ic"><Sparkles size={13}/></div><div className="cc-msg-b"><Loader2 size={15} className="cc-spin"/></div></div>}
      </div>
      <div className="cc-ask"><input className="cc-ask-in" placeholder={"Вопрос по теме "+topic.code+"…"} value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()}/><button className="cc-btn primary" disabled={busy||!q.trim()} onClick={()=>ask()}><Send size={16}/></button></div>
    </div>
  );
}

/* ---------- HOMEWORK HUB ---------- */
function HomeworkHub({goHome}){
  return(
    <main className="cc-main">
      <button className="cc-back" onClick={goHome}><ArrowLeft size={15}/> В главное меню</button>
      <div className="cc-thead"><PenTool size={22} className="cc-thead-ic"/><h1 className="cc-h1 sm">Домашние задания</h1></div>
      <p className="cc-note-lead">Все задачи для самостоятельного решения, по темам. Сначала решите, потом раскройте решение.</p>
      {TOPICS.map(t=> t.homeworks.length>0 && (
        <div key={t.id} className="cc-hw-group">
          <div className="cc-hw-gh"><span className="cc-tcode">{t.code}</span> {t.title}</div>
          {t.homeworks.map(hw=> hw.kind==="classify" ? <ClassifyHW key={hw.id} hw={hw}/> : hw.kind==="fill" ? <FillHW key={hw.id} hw={hw}/> : <SolveHW key={hw.id} hw={hw}/> )}
        </div>
      ))}
    </main>
  );
}
function SolveHW({hw}){
  const [show,setShow]=useState(false);
  return(
    <div className="cc-task hw">
      <div className="cc-task-h hw"><FileText size={16}/><span>{hw.title}</span></div>
      <p className="cc-task-c">{hw.cond}</p>
      {!show ? <button className="cc-btn ghost" onClick={()=>setShow(true)}><Eye size={16}/> Показать решение</button>
      : <div className="cc-sol">{hw.steps.map((s,i)=><div key={i} className="cc-step"><span className="cc-step-n">{i+1}</span><div><b>{s[0]}.</b> {s[1]}</div></div>)}<div className="cc-ans"><Check size={16}/> {hw.answer}</div><button className="cc-btn ghost sm" onClick={()=>setShow(false)}><EyeOff size={15}/> Скрыть</button></div>}
    </div>
  );
}
function FillHW({hw}){
  const [open,setOpen]=useState(false);
  return(
    <div className="cc-task hw">
      <div className="cc-task-h hw"><FileText size={16}/><span>{hw.title}</span></div>
      <p className="cc-task-c">{hw.cond}</p>
      {!open ? <button className="cc-btn ghost" onClick={()=>setOpen(true)}><Eye size={16}/> Показать ответы</button>
      : <><div className="cc-fill">{hw.items.map((it,i)=><div key={i} className="cc-fill-row"><b>{it[0]}</b><span>{it[1]}</span></div>)}</div><button className="cc-btn ghost sm" onClick={()=>setOpen(false)}><EyeOff size={15}/> Скрыть</button></>}
    </div>
  );
}
function ClassifyHW({hw}){
  const [ans,setAns]=useState(hw.lines.map(()=>null)); const [checked,setChecked]=useState(false);
  const right=hw.lines.filter((l,i)=>ans[i]===l.correct).length;
  return(
    <div className="cc-task hw">
      <div className="cc-task-h hw"><FileText size={16}/><span>{hw.title}</span><span className="cc-badge">ваша работа</span></div>
      <p className="cc-task-c">{hw.cond}</p>
      {hw.graded && <div className="cc-call note"><Check size={15}/><div>{hw.graded}</div></div>}
      <div className="cc-hwt">
        <div className="cc-hwt-r head"><span>Вид затрат</span><span>Сумма</span><span>Выбор</span></div>
        {hw.lines.map((l,i)=>{ const ok=ans[i]===l.correct; return(
          <div key={i} className={"cc-hwt-r"+(checked?(ok?" ok":" bad"):"")}>
            <span className="c1">{l.label}</span><span className="c2">{fmt(l.amount)}</span>
            <span className="c3"><button className={"cc-seg"+(ans[i]==="in"?" sel":"")+(checked&&l.correct==="in"?" right":"")} disabled={checked} onClick={()=>!checked&&setAns(a=>a.map((x,j)=>j===i?"in":x))}>Вкл.</button><button className={"cc-seg"+(ans[i]==="out"?" sel":"")+(checked&&l.correct==="out"?" right":"")} disabled={checked} onClick={()=>!checked&&setAns(a=>a.map((x,j)=>j===i?"out":x))}>Нет</button></span>
          </div>); })}
      </div>
      {!checked ? <button className="cc-btn primary" disabled={ans.some(a=>a===null)} onClick={()=>setChecked(true)}><CheckCircle2 size={16}/> Проверить</button>
      : <div className="cc-hw-res">
          <div className="cc-hw-sc">Верно {right} из {hw.lines.length}</div>
          {hw.lines.map((l,i)=> ans[i]!==l.correct && <div key={i} className="cc-hw-fix"><XCircle size={14}/> <b>{l.label}:</b> {l.note}</div>)}
          <div className="cc-ans"><Check size={16}/> Итог: {fmt(hw.answerIn)} включается, {fmt(hw.answerOut)} — нет.</div>
          <button className="cc-btn ghost sm" onClick={()=>{setChecked(false);setAns(hw.lines.map(()=>null));}}>Решить заново</button>
        </div>}
    </div>
  );
}

/* ---------- EXAM: Задачи + Тесты ---------- */
function ExamView({prog,save,track,goHome}){
  const [mode,setMode]=useState("problems");
  return(
    <main className="cc-main">
      <button className="cc-back" onClick={goHome}><ArrowLeft size={15}/> В главное меню</button>
      <div className="cc-exam-hero">
        <div className="cc-exam-badge"><Award size={22}/></div>
        <div>
          <h1 className="cc-h1 sm">Экзамен</h1>
          <p className="cc-exam-sub">Полный банк задач с решениями и смешанные тесты по всем темам курса.</p>
        </div>
      </div>
      <div className="cc-seg-tabs">
        <button className={"cc-seg-tab"+(mode==="problems"?" on":"")} onClick={()=>setMode("problems")}><Calculator size={16}/> Задачи</button>
        <button className={"cc-seg-tab"+(mode==="tests"?" on":"")} onClick={()=>setMode("tests")}><ClipboardList size={16}/> Тесты</button>
      </div>
      {mode==="problems" ? <ExamProblems/> : <ExamTests prog={prog} save={save} track={track}/>}
    </main>
  );
}

function ExamProblems(){
  const [code,setCode]=useState("all");
  const [lvl,setLvl]=useState("all");
  const codes=["all",...TOPICS.map(t=>t.code)];
  const list=EXAM_PROBLEMS.filter(p=>(code==="all"||p.code===code)&&(lvl==="all"||p.level===lvl));
  const hardN=HARD_PROBLEMS.length;
  return(
    <div className="cc-view">
      <p className="cc-note-lead">Все задачи курса собраны здесь: разобранные примеры, домашние задачи и {hardN} новых усложнённых задач с полными решениями. Сначала решите сами — потом раскройте решение.</p>
      <div className="cc-filters">
        <div className="cc-chips">{codes.map(c=><button key={c} className={"cc-chip"+(code===c?" on":"")} onClick={()=>setCode(c)}>{c==="all"?"Все темы":c}</button>)}</div>
        <div className="cc-chips">
          <button className={"cc-chip"+(lvl==="all"?" on":"")} onClick={()=>setLvl("all")}>Все уровни</button>
          <button className={"cc-chip"+(lvl==="база"?" on":"")} onClick={()=>setLvl("база")}>База</button>
          <button className={"cc-chip lvl"+(lvl==="сложно"?" on":"")} onClick={()=>setLvl("сложно")}><Flame size={13}/> Сложно</button>
        </div>
      </div>
      <div className="cc-prob-count">{list.length} задач</div>
      {list.map((p)=><ProblemCard key={p.code+"-"+p._i} p={p}/>)}
    </div>
  );
}
function ProblemCard({p}){
  const [show,setShow]=useState(false);
  return(
    <div className="cc-prob">
      <div className="cc-prob-h">
        <span className="cc-tcode">{p.code}</span>
        <span className="cc-prob-t">{p.title}</span>
        <span className={"cc-lvl"+(p.level==="сложно"?" hard":"")}>{p.level==="сложно"?"сложно":"база"}</span>
      </div>
      <p className="cc-prob-c">{p.problem}</p>
      {!show ? <button className="cc-btn ghost" onClick={()=>setShow(true)}><Eye size={16}/> Показать решение</button>
      : <div className="cc-sol">
          {p.steps.map((s,i)=><div key={i} className="cc-step"><span className="cc-step-n">{i+1}</span><div><b>{s[0]}.</b> {s[1]}</div></div>)}
          <div className="cc-ans"><Check size={16}/> {p.answer}</div>
          <button className="cc-btn ghost sm" onClick={()=>setShow(false)}><EyeOff size={15}/> Скрыть</button>
        </div>}
    </div>
  );
}

function ExamTests({prog,save,track}){
  const pool=EXAM_TEST_POOL;
  const [stage,setStage]=useState("intro"); const [count,setCount]=useState(20);
  const [qs,setQs]=useState([]); const [idx,setIdx]=useState(0); const [res,setRes]=useState([]);
  const examBest=prog.examBest||0;
  function start(n){ const k=Math.min(n,pool.length); const sh=[...pool].sort(()=>Math.random()-0.5).slice(0,k); setQs(sh); setRes(sh.map(()=>null)); setIdx(0); setStage("run"); }
  if(stage==="intro") return(
    <div className="cc-view">
      <div className="cc-quiz-i">
        <Award size={28}/>
        <h2>Смешанный тест</h2>
        <p>Банк из <b>{pool.length}</b> вопросов по всем темам ({TOPICS.map(t=>t.code).join(", ")}). Лучший результат: <b>{examBest}%</b>.</p>
        <div className="cc-len">
          <span className="cc-len-l">Сколько вопросов?</span>
          <div className="cc-len-opts">
            {[10,20,40].map(n=><button key={n} className={"cc-len-b"+(count===n?" on":"")} onClick={()=>setCount(n)}>{n}</button>)}
            <button className={"cc-len-b"+(count>=pool.length?" on":"")} onClick={()=>setCount(pool.length)}>Все</button>
          </div>
        </div>
        <button className="cc-btn amber" onClick={()=>start(count)}><ArrowRight size={16}/> Начать тест</button>
      </div>
    </div>
  );
  const q=qs[idx], r=res[idx];
  function mcq(c){ setRes(a=>a.map((x,i)=>i===idx?{correct:c===q.correct,choice:c}:x)); }
  function next(){ if(idx+1>=qs.length){ const c=res.filter(x=>x&&x.correct).length; const pct=Math.round(c/qs.length*100); if(pct>examBest) save({...prog,examBest:pct}); if(track) track("exam",pct+"%"); setStage("done"); } else setIdx(idx+1); }
  if(stage==="done"){ const c=res.filter(x=>x&&x.correct).length; const pct=Math.round(c/qs.length*100);
    return <div className="cc-view"><div className="cc-done"><div className="cc-done-p">{pct}%</div><h2>{pct>=80?"Отличный результат!":pct>=60?"Неплохо":"Нужно повторить"}</h2><p>{c} из {qs.length} верно</p><div className="cc-done-a"><button className="cc-btn amber" onClick={()=>setStage("intro")}><RefreshCw size={16}/> Ещё раз</button></div></div></div>;
  }
  return(
    <div className="cc-view">
      <div className="cc-quiz-top">Тест · вопрос {idx+1} / {qs.length} <span className="cc-exam-code">{q.code}</span></div>
      <Track v={Math.round(idx/qs.length*100)}/>
      <div className="cc-q">{q.q}</div>
      <div className="cc-opts">{q.options.map((o,i)=>{ let cls="cc-opt"; if(r){ if(i===q.correct)cls+=" right"; else if(i===r.choice)cls+=" wrong"; }
        return <button key={i} className={cls} disabled={!!r} onClick={()=>mcq(i)}><span className="cc-opt-k">{String.fromCharCode(1040+i)}</span><span>{o}</span></button>; })}</div>
      {r && <div className={"cc-fb "+(r.correct?"good":"bad")}><b>{r.correct?"Верно!":"Неверно."}</b> {q.explain}</div>}
      {r && <div className="cc-qnav"><button className="cc-btn amber" onClick={next}>{idx+1>=qs.length?<>Завершить <Trophy size={15}/></>:<>Далее <ArrowRight size={15}/></>}</button></div>}
    </div>
  );
}

/* ===================== ПОДГОТОВКА К ЭКЗАМЕНУ (ma'lumotlar: exam-variants.js) ===================== */
function fmtMMSS(s){ s=Math.max(0,Math.round(s)); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }
// Variantlarda javob pozitsiyalari o'zgarmas bo'lib qolmasligi uchun har imtihonda variantlar tasodifiy aralashtiriladi
function shuffleOpts(q){ const idx=q.options.map((_,i)=>i).sort(()=>Math.random()-0.5); return {...q, options: idx.map(i=>q.options[i]), correct: idx.indexOf(q.correct)}; }

function PrepView({prog,save,track,goHome}){
  return(
    <main className="cc-main">
      <button className="cc-back" onClick={goHome}><ArrowLeft size={15}/> В главное меню</button>
      <div className="cc-exam-hero">
        <div className="cc-exam-badge"><Target size={22}/></div>
        <div>
          <h1 className="cc-h1 sm">Подготовка к экзамену</h1>
          <p className="cc-exam-sub">{PREP_VARIANTS.length} экзаменационных вариантов — от среднего до максимального. Тесты + письменные задачи, общий таймер, проверка решений ИИ. Ответы показываются после завершения. Порог сдачи — {PREP_PASS}%.</p>
        </div>
      </div>
      <PrepExam prog={prog} save={save} track={track}/>
    </main>
  );
}

function PrepExam({prog,save,track}){
  const [v,setV]=useState(PREP_VARIANTS[0]);
  const [stage,setStage]=useState("intro");   // intro | run | grading | done
  const [tab,setTab]=useState("tests");
  const [tQs,setTQs]=useState([]);            // joriy urinish uchun aralashtirilgan testlar
  const [tAns,setTAns]=useState([]);
  const [pAns,setPAns]=useState([]);
  const [left,setLeft]=useState(0);
  const [confirmFin,setConfirmFin]=useState(false);
  const [ai,setAi]=useState(null);            // [{ball,fikr}] yoki null (AI ishlamadi)
  const [aiFail,setAiFail]=useState(false);
  const [cnt,setCnt]=useState(3);             // start oldidan 3·2·1 sanoq
  const [moto,setMoto]=useState(0);           // motivatsion so'z indeksi
  const doneRef=useRef(false);

  function start(vv){
    setV(vv); doneRef.current=false;
    setTQs(vv.tests.map(shuffleOpts)); setTAns(vv.tests.map(()=>null)); setPAns(vv.problems.map(()=>""));
    setLeft(vv.minutes*60); setTab("tests"); setConfirmFin(false); setAi(null); setAiFail(false);
    setCnt(3); setStage("count");
  }
  useEffect(()=>{ if(stage!=="intro") return; const t=setInterval(()=>setMoto(m=>(m+1)%PREP_MOTO.length),5000); return ()=>clearInterval(t); },[stage]);
  useEffect(()=>{ if(stage!=="count") return; const t=setInterval(()=>setCnt(c=>c-1),850); return ()=>clearInterval(t); },[stage]);
  useEffect(()=>{ if(stage==="count" && cnt<0) setStage("run"); },[cnt,stage]); // sanoq tugadi — imtihon boshlanadi
  useEffect(()=>{ if(stage!=="run") return; const t=setInterval(()=>setLeft(s=>s-1),1000); return ()=>clearInterval(t); },[stage]);
  useEffect(()=>{ if(stage==="run" && left<=0 && tAns.length) finish(); },[left,stage]); // vaqt tugadi — avto-yakun

  async function finish(){
    if(doneRef.current) return; doneRef.current=true;
    setStage("grading");
    let res=null, fail=false;
    const answered=pAns.map(a=>(a||"").trim());
    if(answered.some(a=>a)){
      try{
        const parts=v.problems.map((p,i)=>(
          "ЗАДАЧА "+(i+1)+" ("+p.code+"). "+p.problem+
          "\nЭталонное решение: "+p.steps.map(s=>s[0]+": "+s[1]).join(" | ")+
          "\nИтоговый ответ эталона: "+p.answer+
          "\nРешение студента: "+(answered[i]||"— (ответ не дан)")
        )).join("\n\n");
        const t=await callAI(
          "Ты — строгий, но справедливый экзаменатор по МСФО. Проверь письменные решения студента по "+v.problems.length+" задачам. ГЛАВНОЕ: правильность ИТОГОВЫХ ЧИСЕЛ и хода решения (метод, формулы, проводки). Сверь каждое число студента с эталоном — прямо укажи, какие числа верны, а какие нет и каким должно быть верное число. Оформление, стиль и порядок слов не важны; засчитывай верные числа, даже если они записаны иначе (с пробелами, без валюты). Балл за задачу: от 0 до "+PREP_PROB_PTS+" (0 — нет решения или всё неверно; "+PREP_PROB_PTS+" — метод и все ключевые числа верны; промежуточный балл — за частично верное решение).\n\n"+parts+
          "\n\nВерни ТОЛЬКО JSON-массив из "+v.problems.length+" объектов строго по порядку задач: [{\"n\":1,\"ball\":<0-"+PREP_PROB_PTS+">,\"fikr\":\"краткий разбор по-русски: какие числа/шаги верны, где именно ошибка и верное значение\"}]",
          "Экзамен по курсу МСФО (IAS 2, IAS 16, IAS 23, IAS 37, IAS 38, IAS 40). Точная проверка чисел и метода в письменных решениях.",
          1900
        );
        const arr=parseArr(t);
        if(Array.isArray(arr)&&arr.length){
          res=v.problems.map((_,i)=>{
            const g=arr.find(x=>x&&+x.n===i+1)||arr[i]||{};
            let b=Math.max(0,Math.min(PREP_PROB_PTS,Math.round(+g.ball||0)));
            if(!answered[i]) b=0;
            return {ball:b,fikr:answered[i]?String(g.fikr||""):"Ответ не дан."};
          });
        } else fail=true;
      }catch(e){ fail=true; }
    } else {
      res=v.problems.map(()=>({ball:0,fikr:"Ответ не дан."}));
    }
    setAi(res); setAiFail(fail&&!res);
    const tPts=tQs.reduce((s,q,i)=>s+(tAns[i]===q.correct?1:0),0);
    const pPts=res?res.reduce((s,r)=>s+r.ball,0):0;
    const maxP=v.tests.length+(res?v.problems.length*PREP_PROB_PTS:0);
    const pct=maxP?Math.round((tPts+pPts)/maxP*100):0;
    const used=v.minutes*60-Math.max(0,left);
    save({...prog,prepBest:Math.max(prog.prepBest||0,pct),prepLog:[{d:Date.now(),v:v.id,pct,t:used},...(prog.prepLog||[])].slice(0,8)});
    if(track) track("exam","подготовка "+v.title+" "+pct+"%");
    setStage("done");
  }

  if(stage==="intro"){
    const bestByV={};
    (prog.prepLog||[]).forEach(l=>{ bestByV[l.v]=Math.max(bestByV[l.v]||0,l.pct); });
    return(
      <div className="cc-view">
        <div className="cc-pvi-moto"><Flame size={16}/><span className="cc-pvi-moto-t" key={moto}>{PREP_MOTO[moto]}</span></div>
        <div className="cc-pvi-rules">
          <span><ClipboardList size={14}/> 20 тестов · по 1 баллу</span>
          <span><Calculator size={14}/> 5 задач · по {PREP_PROB_PTS} балла · проверяет ИИ</span>
          <span><Clock size={14}/> 40 минут на всё</span>
          <span><Trophy size={14}/> порог сдачи {PREP_PASS}%</span>
        </div>
        <div className="cc-pvi-grid">
          {PREP_VARIANTS.map((vv,i)=>(
            <div className="cc-pvi-card" key={vv.id} style={{animationDelay:(i*0.07)+"s"}}>
              <div className="cc-pvi-head"><Award size={18}/><b>{vv.title}</b><span className="cc-pv-lvl">{vv.level}</span></div>
              <p>{vv.tests.length} тестов + {vv.problems.length} задач · {vv.minutes} минут</p>
              {bestByV[vv.id]!==undefined && <span className={"cc-pvi-best "+(bestByV[vv.id]>=PREP_PASS?"ok":"no")}>{bestByV[vv.id]>=PREP_PASS?<CheckCircle2 size={13}/>:<RotateCcw size={13}/>} лучший результат: {bestByV[vv.id]}%</span>}
              <button className="cc-btn amber" onClick={()=>start(vv)}><ArrowRight size={15}/> Начать</button>
            </div>
          ))}
        </div>
        {(prog.prepLog||[]).length>0 && (
          <div className="cc-prep-log">
            <h4><ListChecks size={15}/> Последние попытки</h4>
            {(prog.prepLog||[]).map((l,i)=>(
              <div key={i} className="cc-prep-log-r"><span>{new Date(l.d).toLocaleDateString("ru-RU")}</span><span>{l.v}</span><span><Clock size={12}/> {fmtMMSS(l.t)}</span><b className={l.pct>=PREP_PASS?"ok":"bad"}>{l.pct}%</b></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if(stage==="count") return(
    <div className="cc-view">
      <div className="cc-pvi-count">
        <div className="cc-pvi-count-n" key={cnt}>{cnt>0?cnt:"Вперёд!"}</div>
        <p>{cnt>0?v.title+" · приготовьтесь…":"Таймер запущен — удачи!"}</p>
      </div>
    </div>
  );

  if(stage==="grading") return(
    <div className="cc-view"><div className="cc-quiz-i"><Loader2 size={28} className="cc-spin"/><h2>Проверка…</h2><p>ИИ проверяет ваши решения задач: сверяет итоговые числа и ход решения с эталоном. Обычно это занимает 10–20 секунд — не закрывайте страницу.</p></div></div>
  );

  if(stage==="done"){
    const tPts=tQs.reduce((s,q,i)=>s+(tAns[i]===q.correct?1:0),0);
    const pPts=ai?ai.reduce((s,r)=>s+r.ball,0):0;
    const maxP=v.tests.length+(ai?v.problems.length*PREP_PROB_PTS:0);
    const pct=maxP?Math.round((tPts+pPts)/maxP*100):0;
    const passed=pct>=PREP_PASS;
    const used=v.minutes*60-Math.max(0,left);
    return(
      <div className="cc-view">
        <div className="cc-done">
          <div className="cc-done-p">{pct}%</div>
          <h2>{passed?"Экзамен сдан!":"Экзамен не сдан"}</h2>
          {!passed && <p className="cc-pv-failnote">Результат ниже порога {PREP_PASS}%. Разберите ошибки ниже, повторите слабые темы и попробуйте ещё раз.</p>}
          <p>Тесты: <b>{tPts} / {v.tests.length}</b>{ai && <> · Задачи (ИИ): <b>{pPts} / {v.problems.length*PREP_PROB_PTS}</b></>} · время {fmtMMSS(used)} из {v.minutes}:00</p>
          {aiFail && <p className="cc-pv-failnote">Не удалось проверить задачи через ИИ (сеть или дневной лимит) — процент рассчитан только по тестам.</p>}
          <div className="cc-done-a"><button className="cc-btn amber" onClick={()=>setStage("intro")}><RefreshCw size={16}/> Ещё раз</button></div>
        </div>
        <div className="cc-prep-mist">
          <h4><ListChecks size={15}/> Разбор тестов</h4>
          {tQs.map((q,i)=>{
            const ok=tAns[i]===q.correct;
            return(
              <div className="cc-prep-m" key={i}>
                <div className="cc-prep-mq"><span className="cc-pv-num">{i+1}</span> <span className="cc-exam-code">{q.code}</span> {q.q}</div>
                <div className={"cc-prep-ma "+(ok?"good":"bad")}>{ok?<CheckCircle2 size={13}/>:<XCircle size={13}/>} Ваш ответ: {tAns[i]===null||tAns[i]===undefined?"— (нет ответа)":q.options[tAns[i]]}</div>
                {!ok && <div className="cc-prep-ma good"><CheckCircle2 size={13}/> Верно: {q.options[q.correct]}</div>}
                <div className="cc-prep-mex">{q.explain}</div>
              </div>
            );
          })}
        </div>
        <div className="cc-prep-mist">
          <h4><Calculator size={15}/> Разбор задач{ai?" — оценка ИИ":""}</h4>
          {v.problems.map((p,i)=>(
            <div className="cc-prep-m" key={i}>
              <div className="cc-prep-mq"><span className="cc-pv-num">{i+1}</span> <span className="cc-exam-code">{p.code}</span> {p.title}{ai && <span className={"cc-pv-ball "+(ai[i].ball>=PREP_PROB_PTS*0.75?"g":ai[i].ball>=PREP_PROB_PTS*0.5?"m":"w")}>{ai[i].ball} / {PREP_PROB_PTS}</span>}</div>
              {(pAns[i]||"").trim() ? <div className="cc-pv-stud"><b>Ваше решение:</b> {pAns[i]}</div> : <div className="cc-prep-ma bad"><XCircle size={13}/> Ответ не дан</div>}
              {ai && ai[i].fikr && <div className="cc-prep-mex"><b>Разбор ИИ:</b> {ai[i].fikr}</div>}
              <div className="cc-pv-ref">
                <b>Эталонное решение:</b>
                {p.steps.map((s,j)=><div className="cc-pv-step" key={j}><b>{s[0]}.</b> {s[1]}</div>)}
                <div className="cc-pv-refans"><b>Ответ:</b> {p.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tDone=tAns.filter(a=>a!==null).length;
  const pDone=pAns.filter(a=>(a||"").trim()).length;
  const allDone=tDone===v.tests.length && pDone===v.problems.length;
  return(
    <div className="cc-view">
      <div className="cc-pv-top">
        <span className={"cc-prep-timer"+(left<=300?" danger":"")}><Clock size={13}/> {fmtMMSS(left)}</span>
        <span className="cc-pv-cnt">Тесты: <b>{tDone}/{v.tests.length}</b> · Задачи: <b>{pDone}/{v.problems.length}</b></span>
      </div>
      <div className="cc-seg-tabs">
        <button className={"cc-seg-tab"+(tab==="tests"?" on":"")} onClick={()=>setTab("tests")}><ClipboardList size={16}/> Тесты ({v.tests.length})</button>
        <button className={"cc-seg-tab"+(tab==="problems"?" on":"")} onClick={()=>setTab("problems")}><Calculator size={16}/> Задачи ({v.problems.length})</button>
      </div>
      {tab==="tests" ? (
        <div className="cc-pv-list">
          {tQs.map((q,i)=>(
            <div className="cc-pv-q" key={i}>
              <div className="cc-pv-qh"><span className="cc-pv-num">{i+1}</span><span className="cc-exam-code">{q.code}</span></div>
              <div className="cc-pv-qt">{q.q}</div>
              <div className="cc-opts">{q.options.map((o,j)=>(
                <button key={j} className={"cc-opt"+(tAns[i]===j?" sel":"")} onClick={()=>setTAns(a=>a.map((x,k)=>k===i?j:x))}><span className="cc-opt-k">{String.fromCharCode(1040+j)}</span><span>{o}</span></button>
              ))}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cc-pv-list">
          <p className="cc-note-lead">Пишите ход решения и итоговые числа — ИИ сверит именно числа и метод с эталоном.</p>
          {v.problems.map((p,i)=>(
            <div className="cc-pv-q" key={i}>
              <div className="cc-pv-qh"><span className="cc-pv-num">{i+1}</span><span className="cc-exam-code">{p.code}</span><b className="cc-pv-pt">{p.title}</b></div>
              <div className="cc-pv-prob">{p.problem}</div>
              <textarea className="cc-ta" maxLength={1500} placeholder="Ваше решение: шаги и итоговые числа…" value={pAns[i]} onChange={e=>{const val=e.target.value; setPAns(a=>a.map((x,k)=>k===i?val:x));}}/>
            </div>
          ))}
        </div>
      )}
      <div className="cc-pv-fin">
        {confirmFin && !allDone
          ? <div className="cc-pv-warn"><span><AlertTriangle size={15}/> Не отвечено: тесты — {v.tests.length-tDone}, задачи — {v.problems.length-pDone}. Завершить всё равно?</span>
              <div className="cc-pv-warn-a"><button className="cc-btn amber" onClick={finish}>Да, завершить</button><button className="cc-btn" onClick={()=>setConfirmFin(false)}>Продолжить экзамен</button></div>
            </div>
          : <button className="cc-btn amber" onClick={()=>{ if(allDone) finish(); else setConfirmFin(true); }}><Trophy size={16}/> Завершить экзамен</button>}
      </div>
    </div>
  );
}

/* ===================== ADMIN PANEL ===================== */
function AdminView({theme,toggleTheme}){
  const [pass,setPass]=useState(""); const [authed,setAuthed]=useState(false);
  const [data,setData]=useState({events:[],db:true});
  const [err,setErr]=useState(""); const [busy,setBusy]=useState(false); const [loaded,setLoaded]=useState(null); const [clearing,setClearing]=useState(false);
  async function load(k){ if(!k.trim()) return; setBusy(true); setErr("");
    try{ const r=await fetch("/api/admin",{headers:{"x-admin-key":k}});
      if(r.status===401){ setErr("Неверный пароль"); setBusy(false); return; }
      if(!r.ok){ setErr("Ошибка сервера ("+r.status+")"); setBusy(false); return; }
      const d=await r.json(); setData(d); setAuthed(true); setLoaded(new Date());
    }catch{ setErr("Нет соединения"); } finally{ setBusy(false); }
  }
  async function clearHistory(){
    if(typeof window!=="undefined" && !window.confirm("Удалить всю историю активности учеников? Это действие необратимо.")) return;
    setClearing(true); setErr("");
    try{ const r=await fetch("/api/admin",{method:"DELETE",headers:{"x-admin-key":pass}});
      if(r.ok){ await load(pass); } else { setErr("Не удалось очистить ("+r.status+")"); }
    }catch{ setErr("Нет соединения"); } finally{ setClearing(false); }
  }
  if(!authed) return (
    <div className="cc-gate">
      <div className="cc-gate-bg"/>
      <button className="cc-icon-btn cc-gate-th" onClick={toggleTheme} aria-label="Сменить тему">{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>
      <div className="cc-gate-card">
        <div className="cc-gate-logo"><Sparkles size={28}/></div>
        <h1 className="cc-gate-t">ABCO Academy · Админ</h1>
        <p className="cc-gate-s">Введите пароль преподавателя, чтобы посмотреть активность учеников.</p>
        <input className="cc-modal-in" type="password" placeholder="Пароль" value={pass} autoFocus
          onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(pass)}/>
        {err && <div className="cc-fb bad" style={{marginBottom:12,textAlign:"center"}}>{err}</div>}
        <button className="cc-btn primary cc-modal-go" disabled={busy||!pass.trim()} onClick={()=>load(pass)}>{busy?<span className="cc-sp"><Loader2 size={15} className="cc-spin"/> Вход…</span>:<><LogIn size={16}/> Войти</>}</button>
      </div>
    </div>
  );
  const events=data.events||[];
  const byUser={};
  for(const e of events){ const u=e.u||"—"; if(!byUser[u]) byUser[u]={u,first:e.ts||Date.now(),last:0,logins:0,topics:0,tests:0,best:0,cards:0,seen:false};
    const a=byUser[u]; a.last=Math.max(a.last,e.ts||0); if(e.ts) a.first=Math.min(a.first,e.ts);
    if(e.t==="login") a.logins++;
    if(e.t==="topic") a.topics++;
    if(e.t==="quiz"||e.t==="exam"){ a.tests++; const m=/(\d+)%/.exec(e.d||""); if(m) a.best=Math.max(a.best,+m[1]); }
    if(!a.seen){ a.cards=e.cards||0; a.seen=true; }
  }
  const users=Object.values(byUser).sort((x,y)=>y.last-x.last);
  const now=Date.now(); const startToday=new Date(); startToday.setHours(0,0,0,0);
  const todayActive=users.filter(u=>u.last>=startToday.getTime()).length;
  const weekActive=users.filter(u=>u.last>=now-7*864e5).length;
  const totalLogins=users.reduce((s,u)=>s+u.logins,0);
  const testsDone=events.filter(e=>e.t==="quiz"||e.t==="exam").length;
  const withTests=users.filter(u=>u.tests>0);
  const avgScore=withTests.length?Math.round(withTests.reduce((s,u)=>s+u.best,0)/withTests.length):0;
  const dow=["вс","пн","вт","ср","чт","пт","сб"];
  const t0=new Date(); t0.setHours(0,0,0,0); const days=[];
  for(let i=6;i>=0;i--){ const d=new Date(t0); d.setDate(t0.getDate()-i); days.push({ts:d.getTime(),label:dow[d.getDay()],count:0}); }
  for(const e of events){ const t=e.ts||0; for(const day of days){ if(t>=day.ts&&t<day.ts+864e5){ day.count++; break; } } }
  const maxDay=Math.max(1,...days.map(d=>d.count));
  const tc={}; for(const e of events){ if(e.t==="topic"){ const k=e.d||"—"; tc[k]=(tc[k]||0)+1; } }
  const topTopics=Object.entries(tc).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxTopic=Math.max(1,...topTopics.map(x=>x[1]));
  const TICON={login:<LogIn size={15}/>,topic:<BookOpen size={15}/>,quiz:<ClipboardList size={15}/>,exam:<Award size={15}/>,feedback:<MessageSquare size={15}/>};
  const TTXT={login:"вошёл(ла) в систему",topic:"открыл(а) тему",quiz:"тест",exam:"экзамен",feedback:"сообщил(а) об ошибке:"};
  return(<>
    <header className="cc-top">
      <div className="cc-brand" style={{cursor:"default"}}>
        <span className="cc-brand-m abco-logo">abco</span>
        <span><span className="cc-brand-n">ABCO Academy · админ</span><span className="cc-brand-s">панель преподавателя</span></span>
      </div>
      <div className="cc-top-r">
        {loaded && <span className="cc-adm-upd">обновлено {loaded.toTimeString().slice(0,5)}</span>}
        <button className="cc-icon-btn" onClick={()=>load(pass)} disabled={busy} title="Обновить" aria-label="Обновить"><RefreshCw size={16} className={busy?"cc-spin":""}/></button>
        <button className="cc-icon-btn" onClick={toggleTheme} aria-label="Сменить тему">{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>
      </div>
    </header>
    <main className="cc-main">
      {!data.db && <div className="cc-call warn" style={{marginBottom:16}}><AlertTriangle size={15}/><div><b>База ещё не подключена.</b> Данные не сохраняются. Подключите хранилище в Vercel → Storage.</div></div>}
      <div className="cc-astats">
        <div className="cc-stat"><Target size={16}/><b>{users.length}</b><small>учеников</small></div>
        <div className="cc-stat"><CheckCircle2 size={16}/><b>{todayActive}</b><small>сегодня</small></div>
        <div className="cc-stat"><RefreshCw size={16}/><b>{weekActive}</b><small>за неделю</small></div>
        <div className="cc-stat"><LogIn size={16}/><b>{totalLogins}</b><small>всего входов</small></div>
        <div className="cc-stat"><ClipboardList size={16}/><b>{testsDone}</b><small>тестов сдано</small></div>
        <div className="cc-stat"><Trophy size={16}/><b>{avgScore}%</b><small>ср. балл</small></div>
      </div>
      {(()=>{ const fb=events.filter(e=>e.t==="feedback"); return fb.length>0 ? (
        <div className="cc-fbsec">
          <div className="cc-note-lead" style={{margin:"0 0 8px"}}><MessageSquare size={15} style={{verticalAlign:"-2px",marginRight:6,color:"var(--amber)"}}/>Сообщения об ошибках · {fb.length}</div>
          <div className="cc-adm-feed">
            {fb.slice(0,40).map((e,i)=>(
              <div className="cc-adm-fi" key={i}>
                <span className="cc-adm-ic" style={{color:"var(--amber)"}}><MessageSquare size={15}/></span>
                <span className="cc-adm-ft"><b>{e.u}</b> — {e.d}</span>
                <span className="cc-adm-fts">{fmtTime(e.ts)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null; })()}
      {events.length===0 ? <div className="cc-empty"><Brain size={26}/><p>Пока нет данных. Как только ученики начнут заходить, здесь появится их активность — входы, открытые темы и результаты тестов.</p></div> :
      <>
        <div className="cc-adm-two">
          <div className="cc-apanel">
            <div className="cc-apanel-t"><Target size={15}/> Активность за 7 дней</div>
            <div className="cc-bars">{days.map((d,i)=>(
              <div className="cc-bar" key={i}><span className="cc-bar-n">{d.count||""}</span><span className="cc-bar-v" style={{height:Math.round(d.count/maxDay*70)+"%"}}/><span className="cc-bar-l">{d.label}</span></div>
            ))}</div>
          </div>
          <div className="cc-apanel">
            <div className="cc-apanel-t"><BookOpen size={15}/> Популярные темы</div>
            {topTopics.length===0 ? <div style={{fontSize:13,color:"var(--mut)"}}>Темы ещё не открывали.</div> :
             topTopics.map(([k,v])=>(
              <div className="cc-trow" key={k}><span className="cc-trow-l">{k}</span><span className="cc-trow-bar"><span className="cc-trow-fill" style={{width:Math.round(v/maxTopic*100)+"%"}}/></span><span className="cc-trow-n">{v}</span></div>
            ))}
          </div>
        </div>
        <div className="cc-note-lead" style={{margin:"4px 0 8px"}}>Ученики · {users.length}</div>
        <div className="cc-adm-tbl">
          <div className="cc-adm-r head"><span>Ученик</span><span>Посл. вход</span><span className="n">Входов</span><span className="n">Тем</span><span className="n">Тестов</span><span className="n">Балл</span><span className="n">Карточки</span></div>
          {users.map(u=>(
            <div className="cc-adm-r" key={u.u}>
              <span className="cc-adm-u"><span className="cc-avatar sm">{(u.u[0]||"?").toUpperCase()}</span>{u.u}</span>
              <span className="cc-adm-d">{fmtTime(u.last)}</span>
              <span className="n">{u.logins}</span><span className="n">{u.topics}</span><span className="n">{u.tests}</span>
              <span className="n"><b style={{color:u.best>=80?"var(--green)":u.best>=60?"var(--amber)":"var(--ink2)"}}>{u.tests?u.best+"%":"—"}</b></span>
              <span className="n">{u.cards}/41</span>
            </div>
          ))}
        </div>
        <div className="cc-feed-head"><span className="cc-note-lead" style={{margin:0}}>Последние действия</span><button className="cc-btn ghost sm" disabled={clearing||events.length===0} onClick={clearHistory} title="Очистить всю историю">{clearing?<span className="cc-sp"><Loader2 size={14} className="cc-spin"/> Очистка…</span>:<><Trash2 size={14}/> Очистить историю</>}</button></div>
        <div className="cc-adm-feed">
          {events.slice(0,30).map((e,i)=>(
            <div className="cc-adm-fi" key={i}>
              <span className="cc-adm-ic">{TICON[e.t]||<BookOpen size={15}/>}</span>
              <span className="cc-adm-ft"><b>{e.u}</b> — {TTXT[e.t]||e.t}{e.d?(" "+e.d):""}</span>
              <span className="cc-adm-fts">{fmtTime(e.ts)}</span>
            </div>
          ))}
        </div>
      </>}
    </main>
  </>);
}

/* ===================== CSS ===================== */
