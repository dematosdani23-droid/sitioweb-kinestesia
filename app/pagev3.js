"use client";
import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// ██  EDITE AQUI  ████████████████████████████████████████████████████████
// ═══════════════════════════════════════════════════════════════════════════
//
//  FOTO DE PERFIL → coloca o arquivo em:  public/fotos/perfil.jpg
//
//  PROJETOS → para cada item:
//    ytUrl   → ID do YouTube  ex: "dQw4w9WgXcQ"
//              (parte final de https://www.youtube.com/watch?v=dQw4w9WgXcQ)
//    photos  → coloca os arquivos em public/fotos/ e lista os caminhos
//              ex: ["/fotos/dmva-1.jpg", "/fotos/dmva-2.jpg"]
//    synopsis→ texto bilíngue  { pt: "...", es: "..." }
//
// ═══════════════════════════════════════════════════════════════════════════

const PROFILE = "/fotos/perfil.jpg";

const PROJECTS = [
  {
    id:"dmva", title:"Donde Me Voy a Encontrar", year:"2025/2026", cat:"direcao",
    roles:["Direção","Edição","Produção"],
    desc:{
      pt:"Curta-metragem de ficção. Co-direção com Mariana Pinheiro de Oliveira e Valentina Conter. Em circulação por festivais brasileiros e argentinos.",
      es:"Cortometraje de ficción. Co-dirección con Mariana Pinheiro de Oliveira y Valentina Conter. En circulación por festivales brasileños y argentinos."
    },
    synopsis:{pt:"", es:""},
    ytUrl:"",
    photos:[],
  },
  {
    id:"ese", title:"El Secreto de los Estradas", year:"2025", cat:"direcao",
    roles:["Direção","Edição","Dir. de Som"],
    desc:{pt:"Curta de terror. Direção, edição e direção de som.", es:"Cortometraje de terror. Dirección, edición y dirección de sonido."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"cds", title:"La Cita de Samer", year:"2025", cat:"direcao",
    roles:["Direção","Montagem","Sound Design"],
    desc:{pt:"Curta de ficção. Direção, montagem e sound design.", es:"Cortometraje de ficción. Dirección, montaje y sound design."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"ced", title:"¿Qué Estamos Discutiendo?", year:"2024", cat:"direcao",
    roles:["Direção","Montagem","Som Direto"],
    desc:{pt:"Curta de ficção. Direção, montagem e som direto.", es:"Cortometraje de ficción. Dirección, montaje y sonido directo."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"lav", title:"A Lavanderia", year:"2026", cat:"som",
    roles:["Dir. de Som","Microfonista","Sound Design"],
    desc:{pt:"Academia do Cinema — Imersão Audiovisual 2026. Direção de som completa.", es:"Academia do Cinema — Inmersión Audiovisual 2026. Dirección de sonido completa."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"ph", title:"Poco Heterodoxo", year:"2025", cat:"som",
    roles:["Dir. de Som","Sound Design"],
    desc:{pt:"Curta de ficção. Diretor de som e sound designer.", es:"Cortometraje de ficción. Director de sonido y sound designer."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"ps", title:"Pequeña Simone", year:"2024", cat:"som",
    roles:["Dir. de Som","Sound Design"],
    desc:{pt:"Curta de ficção. Diretor de som e sound designer.", es:"Cortometraje de ficción. Director de sonido y sound designer."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"tn", title:"Turno da Noite", year:"2026", cat:"som",
    roles:["Microfonista"],
    desc:{pt:"Microfonista de som direto.", es:"Microfonista de sonido directo."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"bvc", title:"Brujas, Viejas y Chorras", year:"2026", cat:"som",
    roles:["Microfonista"],
    desc:{pt:"Microfonista de som direto.", es:"Microfonista de sonido directo."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"siah", title:"Acervo Cacique Siã HuniKuin", year:"2026", cat:"producao",
    roles:["Arquivamento","Curadoria Digital"],
    desc:{pt:"Digitalização e curadoria de acervo histórico audiovisual indígena amazônico.", es:"Digitalización y curaduría de archivo histórico audiovisual indígena amazónico."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"min", title:"MINUSTAH, Haiti", year:"Em produção", cat:"producao",
    roles:["Co-Direção","Produção Executiva"],
    desc:{pt:"Documentário sobre a missão da ONU no Haiti (2004–2017). Target: IDFA / Hot Docs.", es:"Documental sobre la misión de la ONU en Haití (2004–2017). Target: IDFA / Hot Docs."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"vpl", title:"Voy a Perder la Cabeza por tu Amor", year:"2025–2026", cat:"outros",
    roles:["Projeção","Edição"],
    desc:{pt:"Teatro. Chefe de projeção no Resolume Arena e editor.", es:"Teatro. Jefe de proyección en Resolume Arena y editor."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"pen", title:"Penumbra", year:"2025", cat:"outros",
    roles:["Dir. de Fotografia"],
    desc:{pt:"Curta. Diretor de fotografia.", es:"Cortometraje. Director de fotografía."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
  {
    id:"hcn", title:"Homenagem Cine Noir", year:"2024", cat:"outros",
    roles:["Direção","Fotografia"],
    desc:{pt:"Evento cinematográfico.", es:"Evento cinematográfico."},
    synopsis:{pt:"", es:""}, ytUrl:"", photos:[],
  },
];

// ── TRANSLATIONS ─────────────────────────────────────────────────────────────
const UI = {
  pt:{
    tag:"PORTFÓLIO AUDIOVISUAL", subtitle:"Cineasta · Diretor de Som · Produtor Cultural",
    nav:{sobre:"Sobre",filmografia:"Filmografia",servicos:"Serviços",contato:"Contato"},
    cats:{todos:"Todos",direcao:"Direção",som:"Som",producao:"Produção",outros:"Outros"},
    roles:{
      "Direção":"Direção","Edição":"Edição","Produção":"Produção",
      "Dir. de Som":"Dir. de Som","Microfonista":"Microfonista","Sound Design":"Sound Design",
      "Montagem":"Montagem","Som Direto":"Som Direto","Arquivamento":"Arquivamento",
      "Curadoria Digital":"Curadoria Digital","Co-Direção":"Co-Direção",
      "Produção Executiva":"Produção Executiva","Projeção":"Projeção",
      "Dir. de Fotografia":"Dir. de Fotografia","Fotografia":"Fotografia",
    },
    bio:<>Cineasta amapaense formado em Artes Audiovisuais pela <b>Universidad Nacional de La Plata (UNLP)</b>, onde fundou a <b>Kinestesia Producciones Audiovisuales</b>. Atua entre Brasília e La Plata com ampla experiência em produção audiovisual, som direto, sound design e gestão de projetos culturais. Sua obra explora migração, identidade e fronteiras, articulando o cinema emergente <b>amazônico e afro-indígena</b> com colaborações internacionais.</>,
    services:[
      {icon:"🎬",title:"Direção & Fotografia",items:["Direção cinematográfica","Direção de fotografia (DoP)","Operação de câmera"]},
      {icon:"🎙️",title:"Som & Sound Design",items:["Som direto · boom · microfonagem","Sound design","Pós-produção de áudio","Mixagem e edição de diálogos"]},
      {icon:"🎞️",title:"Pós-produção",items:["Edição de vídeo (Premiere / CapCut)","Montagem","Tratamento de cor","Projeção mapeada (Resolume Arena)"]},
      {icon:"🌐",title:"Acessibilidade & Tradução",items:["Legendagem SRT/ASS","Tradução Espanhol ↔ Português","Interpretação simultânea"]},
      {icon:"📋",title:"Gestão & Produção",items:["Produção executiva","Gestão de projetos culturais","Co-produções internacionais","Licitações públicas (Compras.gov/PNCP)"]},
      {icon:"💻",title:"TI & Suporte",items:["Suporte técnico B2B","Infraestrutura e informática"]},
    ],
    contato_btn:"✉ Contato", voltar:"← Voltar", voltar_film:"← Filmografia",
    ver:"Ver projeto →", video:"Vídeo", sinopse:"Sinopse", galeria:"Galeria",
    ficha:"Ficha Técnica", funcoes:"FUNÇÕES", ano:"ANO", cat_label:"CATEGORIA",
    email:"E-mail", whatsapp:"WhatsApp", empresa:"Empresa",
    sobre:"Sobre", filmografia:"Filmografia", servicos:"Serviços", contato:"Contato",
  },
  es:{
    tag:"PORTFOLIO AUDIOVISUAL", subtitle:"Cineasta · Director de Sonido · Productor Cultural",
    nav:{sobre:"Sobre",filmografia:"Filmografía",servicos:"Servicios",contato:"Contacto"},
    cats:{todos:"Todos",direcao:"Dirección",som:"Sonido",producao:"Producción",outros:"Otros"},
    roles:{
      "Direção":"Dirección","Edição":"Edición","Produção":"Producción",
      "Dir. de Som":"Dir. de Sonido","Microfonista":"Microfonista","Sound Design":"Sound Design",
      "Montagem":"Montaje","Som Direto":"Sonido Directo","Arquivamento":"Archivo",
      "Curadoria Digital":"Curaduría Digital","Co-Direção":"Co-Dirección",
      "Produção Executiva":"Producción Ejecutiva","Projeção":"Proyección",
      "Dir. de Fotografia":"Dir. de Fotografía","Fotografia":"Fotografía",
    },
    bio:<>Cineasta brasileño de Amapá, formado en Artes Audiovisuales en la <b>Universidad Nacional de La Plata (UNLP)</b>, donde fundó <b>Kinestesia Producciones Audiovisuales</b>. Trabaja entre Brasilia y La Plata con amplia experiencia en producción audiovisual, sonido directo, sound design y gestión de proyectos culturales. Su obra explora migración, identidad y fronteras, articulando el cine emergente <b>amazónico y afroindígena</b> con colaboraciones internacionales.</>,
    services:[
      {icon:"🎬",title:"Dirección & Fotografía",items:["Dirección cinematográfica","Dirección de fotografía (DoP)","Operación de cámara"]},
      {icon:"🎙️",title:"Sonido & Sound Design",items:["Sonido directo · boom · microfonía","Sound design","Post-producción de audio","Mezcla y edición de diálogos"]},
      {icon:"🎞️",title:"Post-producción",items:["Edición de video (Premiere / CapCut)","Montaje","Corrección de color","Proyección mapeada (Resolume Arena)"]},
      {icon:"🌐",title:"Accesibilidad & Traducción",items:["Subtitulado SRT/ASS","Traducción Español ↔ Portugués","Interpretación simultánea"]},
      {icon:"📋",title:"Gestión & Producción",items:["Producción ejecutiva","Gestión de proyectos culturales","Co-producciones internacionales","Licitaciones públicas"]},
      {icon:"💻",title:"TI & Soporte",items:["Soporte técnico B2B","Infraestructura e informática"]},
    ],
    contato_btn:"✉ Contacto", voltar:"← Volver", voltar_film:"← Filmografía",
    ver:"Ver proyecto →", video:"Video", sinopse:"Sinopsis", galeria:"Galería",
    ficha:"Ficha Técnica", funcoes:"FUNCIONES", ano:"AÑO", cat_label:"CATEGORÍA",
    email:"E-mail", whatsapp:"WhatsApp", empresa:"Empresa",
    sobre:"Sobre", filmografia:"Filmografía", servicos:"Servicios", contato:"Contacto",
  },
};

// ── THEME ─────────────────────────────────────────────────────────────────────
const C={bg:"#090909",surf:"#0f0f0f",card:"#161616",bord:"#222",acc:"#c9a84c",txt:"#ede8df",mut:"#585858"};
const CAT_C={direcao:"#c9a84c",som:"#5fa8c0",producao:"#9370c0",outros:"#5fa87a"};
const CATS=["todos","direcao","som","producao","outros"];
const getYTId=url=>{if(!url)return null;const m=url.match(/(?:v=|youtu\.be\/)([^&?/\s]{11})/);return m?m[1]:(url.trim().length===11?url.trim():null);};

// ── ATOMS ─────────────────────────────────────────────────────────────────────
function Pill({role,lang}){
  const label=UI[lang].roles[role]||role;
  // infer cat from role for color — default to acc
  const catMap={"Direção":"direcao","Edição":"direcao","Produção":"producao","Dir. de Som":"som","Microfonista":"som","Sound Design":"som","Montagem":"direcao","Som Direto":"som","Arquivamento":"producao","Curadoria Digital":"producao","Co-Direção":"direcao","Produção Executiva":"producao","Projeção":"outros","Dir. de Fotografia":"outros","Fotografia":"outros"};
  const c=CAT_C[catMap[role]]||C.acc;
  return <span style={{padding:"1px 7px",borderRadius:99,fontSize:9.5,fontWeight:700,background:c+"1a",color:c,border:`1px solid ${c}33`,letterSpacing:.3}}>{label}</span>;
}
function SHead({children}){
  return <div style={{display:"flex",alignItems:"center",gap:14}}><span style={{color:C.acc,fontWeight:800,fontSize:10.5,letterSpacing:2.5,textTransform:"uppercase",flexShrink:0}}>{children}</span><div style={{flex:1,height:1,background:C.bord}}/></div>;
}
function Hr(){return <div style={{borderTop:`1px solid ${C.bord}`}}/>;}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({photos,index,onClose}){
  const[cur,setCur]=useState(index);
  const[loaded,setLoaded]=useState(false);
  const touchX=useRef(null);
  if(!photos.length)return null;
  const prev=()=>{setLoaded(false);setCur(i=>(i-1+photos.length)%photos.length);};
  const next=()=>{setLoaded(false);setCur(i=>(i+1)%photos.length);};

  // keyboard navigation
  useEffect(()=>{
    const onKey=e=>{
      if(e.key==="ArrowLeft")prev();
      else if(e.key==="ArrowRight")next();
      else if(e.key==="Escape")onClose();
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[cur]);

  // touch/swipe
  const onTouchStart=e=>{ touchX.current=e.touches[0].clientX; };
  const onTouchEnd=e=>{
    if(touchX.current===null)return;
    const dx=e.changedTouches[0].clientX-touchX.current;
    if(Math.abs(dx)>50){ dx<0?next():prev(); }
    touchX.current=null;
  };

  const ArrowBtn=({dir,onClick})=>{
    const[h,sH]=useState(false);
    return(
      <button onClick={e=>{e.stopPropagation();onClick();}}
        onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
        style={{position:"fixed",top:"50%",transform:"translateY(-50%)",
          [dir==="prev"?"left":"right"]:"20px",
          width:52,height:52,borderRadius:"50%",
          background:h?"rgba(255,255,255,.15)":"rgba(255,255,255,.07)",
          border:"1px solid rgba(255,255,255,.2)",
          color:"#fff",fontSize:26,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"background .2s",zIndex:1001,lineHeight:1}}>
        {dir==="prev"?"‹":"›"}
      </button>
    );
  };

  return(
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.97)",zIndex:1000,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

      {/* top bar */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:56,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 24px",background:"rgba(0,0,0,.6)",zIndex:1001}}>
        <span style={{color:"rgba(255,255,255,.5)",fontSize:13}}>
          {cur+1} <span style={{color:"rgba(255,255,255,.25)"}}>/</span> {photos.length}
        </span>
        <button onClick={onClose}
          style={{background:"none",border:"1px solid rgba(255,255,255,.15)",
            color:"rgba(255,255,255,.6)",width:36,height:36,borderRadius:"50%",
            cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",
            justifyContent:"center",lineHeight:1}}>×</button>
      </div>

      {/* image */}
      <div onClick={onClose} style={{width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img key={cur} src={photos[cur]} alt="" onLoad={()=>setLoaded(true)}
          onClick={e=>e.stopPropagation()}
          style={{maxWidth:"88vw",maxHeight:"86vh",objectFit:"contain",
            borderRadius:4,opacity:loaded?1:0,transition:"opacity .25s",
            userSelect:"none",WebkitUserSelect:"none"}}/>
      </div>

      {/* arrows */}
      {photos.length>1&&<><ArrowBtn dir="prev" onClick={prev}/><ArrowBtn dir="next" onClick={next}/></>}

      {/* dot indicators */}
      {photos.length>1&&photos.length<=12&&(
        <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",
          display:"flex",gap:6,zIndex:1001}}>
          {photos.map((_,i)=>(
            <div key={i} onClick={e=>{e.stopPropagation();setLoaded(false);setCur(i);}}
              style={{width:i===cur?20:7,height:7,borderRadius:99,cursor:"pointer",
                background:i===cur?"#c9a84c":"rgba(255,255,255,.25)",
                transition:"all .2s"}}/>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CARD ─────────────────────────────────────────────────────────────────────
function Card({p,lang,onClick}){
  const[h,sH]=useState(false);
  const col=CAT_C[p.cat]||C.acc;
  const cover=p.photos[0]||null;
  const t=UI[lang];
  return(
    <div onClick={onClick} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
      style={{background:C.card,border:`1px solid ${h?col+"66":C.bord}`,borderRadius:10,overflow:"hidden",transition:"border-color .2s,transform .2s",transform:h?"translateY(-3px)":"none",display:"flex",flexDirection:"column",cursor:"pointer"}}>
      <div style={{position:"relative",height:130,background:C.surf,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {cover?<img src={cover} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:34,opacity:.1}}>🎬</span>}
        <span style={{position:"absolute",top:7,right:7,background:"rgba(0,0,0,.85)",color:C.mut,padding:"2px 8px",borderRadius:99,fontSize:9.5}}>{p.year}</span>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:col,opacity:.85}}/>
        {h&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:12,fontWeight:600,letterSpacing:.3}}>{t.ver}</span></div>}
      </div>
      <div style={{padding:"12px 13px 16px",flex:1,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{color:C.txt,fontWeight:700,fontSize:12.5,lineHeight:1.35}}>{p.title}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{p.roles.map(r=><Pill key={r} role={r} lang={lang}/>)}</div>
        <div style={{color:C.mut,fontSize:11,lineHeight:1.65,flex:1}}>{p.desc[lang]}</div>
      </div>
    </div>
  );
}

// ── PROJECT PAGE ─────────────────────────────────────────────────────────────
function ProjectPage({p,lang,onBack}){
  const[lb,setLb]=useState(null);
  const t=UI[lang];
  const col=CAT_C[p.cat]||C.acc;
  const vid=getYTId(p.ytUrl);
  return(
    <div style={{maxWidth:840,margin:"0 auto",padding:"40px 24px 80px"}}>
      {lb!==null&&<Lightbox photos={p.photos} index={lb} onClose={()=>setLb(null)}/>}
      {/* Header */}
      <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:36}}>
        <button onClick={onBack}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.acc+"55";e.currentTarget.style.color=C.txt;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.color=C.mut;}}
          style={{background:"none",border:`1px solid ${C.bord}`,color:C.mut,borderRadius:6,cursor:"pointer",padding:"7px 14px",fontSize:12,flexShrink:0,marginTop:6,transition:"border-color .15s,color .15s"}}>
          {t.voltar}
        </button>
        <div>
          <div style={{color:col,fontSize:10.5,fontWeight:700,letterSpacing:2,marginBottom:7}}>{t.cats[p.cat]?.toUpperCase()}</div>
          <h2 style={{color:C.txt,fontSize:26,fontWeight:800,margin:"0 0 10px",lineHeight:1.2}}>{p.title}</h2>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{color:C.mut,fontSize:12.5}}>{p.year}</span>
            {p.roles.map(r=><Pill key={r} role={r} lang={lang}/>)}
          </div>
        </div>
      </div>

      {/* VIDEO */}
      {vid&&(
        <div style={{marginBottom:48}}>
          <SHead>{t.video}</SHead>
          <div style={{marginTop:16,position:"relative",paddingTop:"56.25%",borderRadius:10,overflow:"hidden",background:"#000"}}>
            <iframe style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}
              src={`https://www.youtube.com/embed/${vid}`} title={p.title} frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
          </div>
        </div>
      )}

      {/* SINOPSE */}
      {p.synopsis[lang]&&(
        <div style={{marginBottom:48}}>
          <SHead>{t.sinopse}</SHead>
          <p style={{color:C.txt,fontSize:13.5,lineHeight:1.9,marginTop:16,whiteSpace:"pre-wrap"}}>{p.synopsis[lang]}</p>
        </div>
      )}

      {/* GALERIA */}
      {p.photos.length>0&&(
        <div style={{marginBottom:48}}>
          <SHead>{t.galeria}</SHead>
          <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {p.photos.map((src,i)=>(
              <div key={i} onClick={()=>setLb(i)}
                style={{aspectRatio:"4/3",background:C.surf,borderRadius:8,overflow:"hidden",cursor:"zoom-in"}}>
                <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s"}}
                  onMouseEnter={e=>e.target.style.transform="scale(1.04)"}
                  onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FICHA */}
      <div style={{paddingTop:32,borderTop:`1px solid ${C.bord}`}}>
        <SHead>{t.ficha}</SHead>
        <div style={{marginTop:20,display:"flex",gap:32,flexWrap:"wrap"}}>
          <div><div style={{color:C.mut,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>{t.funcoes}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{p.roles.map(r=><Pill key={r} role={r} lang={lang}/>)}</div></div>
          <div><div style={{color:C.mut,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>{t.ano}</div><div style={{color:C.txt,fontSize:13}}>{p.year}</div></div>
          <div><div style={{color:C.mut,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>{t.cat_label}</div><div style={{color:col,fontSize:13,fontWeight:600}}>{t.cats[p.cat]}</div></div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio(){
  const[lang,setLang]=useState("pt");
  const[filter,sF]=useState("todos");
  const[activePId,setActive]=useState(null);
  const t=UI[lang];
  const activeProject=activePId?PROJECTS.find(p=>p.id===activePId):null;
  const visible=filter==="todos"?PROJECTS:PROJECTS.filter(p=>p.cat===filter);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return(
    <div style={{background:C.bg,color:C.txt,minHeight:"100vh",fontFamily:"'Inter',system-ui,sans-serif"}}>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:C.bg+"f5",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.bord}`,padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:50}}>
        <span onClick={()=>{setActive(null);}} style={{color:C.acc,fontWeight:800,fontSize:12.5,letterSpacing:2.5,cursor:"pointer"}}>KINESTESIA</span>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {activeProject?(
            <button onClick={()=>setActive(null)} style={{background:"none",border:`1px solid ${C.bord}`,color:C.mut,borderRadius:5,cursor:"pointer",padding:"4px 12px",fontSize:12}}>{t.voltar_film}</button>
          ):(
            [["sobre",t.sobre],["filmografia",t.filmografia],["servicos",t.servicos],["contato",t.contato]].map(([id,l])=>(
              <button key={id} onClick={()=>go(id)} style={{background:"none",border:"none",color:C.mut,cursor:"pointer",fontSize:12,fontWeight:500,padding:"6px 10px",borderRadius:4}}>{l}</button>
            ))
          )}
          {/* LANGUAGE TOGGLE */}
          <div style={{marginLeft:12,display:"flex",borderRadius:6,overflow:"hidden",border:`1px solid ${C.bord}`}}>
            {["pt","es"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{padding:"4px 10px",background:lang===l?C.acc:"transparent",color:lang===l?"#090909":C.mut,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:.5,transition:"all .15s"}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {activeProject?(
        <ProjectPage p={activeProject} lang={lang} onBack={()=>setActive(null)}/>
      ):(
        <>
          {/* HERO */}
          <section id="topo" style={{maxWidth:840,margin:"0 auto",padding:"68px 24px 52px",display:"flex",gap:36,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{width:124,height:124,borderRadius:"50%",overflow:"hidden",border:`2px solid ${C.acc}55`,flexShrink:0,background:C.card}}>
              <img src={PROFILE} alt="Dani Matos" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";}}/>
            </div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{color:C.mut,fontSize:10.5,fontWeight:700,letterSpacing:2.5,marginBottom:10}}>{t.tag}</div>
              <h1 style={{color:C.txt,fontSize:32,fontWeight:800,margin:"0 0 4px",lineHeight:1.15}}>Dani Matos</h1>
              <div style={{color:C.acc,fontSize:13.5,fontWeight:600,marginBottom:14,letterSpacing:.3}}>{t.subtitle}</div>
              <div style={{color:C.mut,fontSize:12.5,lineHeight:1.75}}>Brasília, DF &nbsp;·&nbsp; La Plata, Argentina<br/>Kinestesia Producciones Audiovisuales</div>
              <div style={{marginTop:14,display:"flex",gap:6,flexWrap:"wrap"}}>
                {["🇧🇷 Português","🇦🇷 Español","🇺🇸 English"].map(l=><span key={l} style={{padding:"3px 10px",borderRadius:99,background:"#1c1c1c",color:C.mut,fontSize:11,fontWeight:600}}>{l}</span>)}
              </div>
              <div style={{marginTop:22}}>
                <a href="mailto:danillo.assuncao@gmail.com" style={{padding:"8px 20px",background:C.acc,color:"#090909",borderRadius:6,fontWeight:700,fontSize:12,textDecoration:"none",letterSpacing:.3}}>{t.contato_btn}</a>
              </div>
            </div>
          </section>

          <Hr/>

          {/* SOBRE */}
          <section id="sobre" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px"}}>
            <SHead>{t.sobre}</SHead>
            <p style={{color:C.mut,fontSize:13.5,lineHeight:1.95,maxWidth:620,margin:"20px 0 0"}}>{t.bio}</p>
          </section>

          <Hr/>

          {/* FILMOGRAFIA */}
          <section id="filmografia" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px"}}>
            <SHead>{t.filmografia}</SHead>
            <div style={{display:"flex",gap:6,marginTop:22,marginBottom:26,flexWrap:"wrap"}}>
              {CATS.map(c=>{const col=CAT_C[c]||C.acc;const active=filter===c;return(
                <button key={c} onClick={()=>sF(c)} style={{padding:"5px 14px",borderRadius:99,fontSize:11.5,fontWeight:600,cursor:"pointer",border:"1px solid",transition:"all .15s",background:active?col:"transparent",borderColor:active?col:C.bord,color:active?"#090909":C.mut}}>{t.cats[c]}</button>
              );})}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(192px,1fr))",gap:12}}>
              {visible.map(p=><Card key={p.id} p={p} lang={lang} onClick={()=>setActive(p.id)}/>)}
            </div>
          </section>

          <Hr/>

          {/* SERVIÇOS */}
          <section id="servicos" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px"}}>
            <SHead>{t.servicos}</SHead>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginTop:22}}>
              {t.services.map(s=>(
                <div key={s.title} style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:10,padding:"18px 18px 22px"}}>
                  <div style={{fontSize:22,marginBottom:10}}>{s.icon}</div>
                  <div style={{color:C.txt,fontWeight:700,fontSize:13,marginBottom:10}}>{s.title}</div>
                  {s.items.map(i=><div key={i} style={{color:C.mut,fontSize:12,lineHeight:1.8}}>· {i}</div>)}
                </div>
              ))}
            </div>
          </section>

          <Hr/>

          {/* CONTATO */}
          <section id="contato" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px 80px"}}>
            <SHead>{t.contato}</SHead>
            <div style={{marginTop:22,display:"flex",gap:12,flexWrap:"wrap"}}>
              {[{icon:"✉️",l:t.email,v:"danillo.assuncao@gmail.com",href:"mailto:danillo.assuncao@gmail.com"},
                {icon:"💬",l:t.whatsapp,v:"(61) 98228-6913",href:"https://wa.me/5561982286913"},
                {icon:"🏢",l:t.empresa,v:"Kinestesia Producciones Audiovisuales"}].map(({icon,l,v,href})=>{
                const[h,sH]=useState(false);
                const Tag=href?"a":"div";
                return <Tag key={l} href={href} target="_blank" rel="noopener" onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:C.card,border:`1px solid ${h&&href?C.acc+"66":C.bord}`,borderRadius:10,padding:"15px 18px",textDecoration:"none",display:"flex",gap:12,alignItems:"flex-start",transition:"border-color .2s",cursor:href?"pointer":"default",minWidth:180}}><span style={{fontSize:20}}>{icon}</span><div><div style={{color:C.mut,fontSize:10.5,fontWeight:600,marginBottom:3,letterSpacing:.5}}>{l}</div><div style={{color:C.txt,fontSize:12.5,fontWeight:500}}>{v}</div></div></Tag>;
              })}
            </div>
          </section>

          <footer style={{borderTop:`1px solid ${C.bord}`,padding:"18px 24px",textAlign:"center",color:"#2b2b2b",fontSize:10.5,letterSpacing:1,fontWeight:700}}>
            KINESTESIA PRODUCCIONES AUDIOVISUALES · BRASÍLIA / LA PLATA · {new Date().getFullYear()}
          </footer>
        </>
      )}
    </div>
  );
}
