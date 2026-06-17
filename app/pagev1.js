"use client";
import { useState, useRef } from "react";

const CATS = ["todos","direcao","som","producao","outros"];
const CAT_L = {todos:"Todos",direcao:"Direção",som:"Som",producao:"Produção",outros:"Outros"};
const CAT_C = {direcao:"#c9a84c",som:"#5fa8c0",producao:"#9370c0",outros:"#5fa87a"};

const PROJECTS = [
  {id:"dmva",title:"Donde Me Voy a Encontrar",year:"2025/2026",cat:"direcao",roles:["Direção","Edição","Produção"],desc:"Curta-metragem de ficção. Co-direção com Mariana Pinheiro de Oliveira e Valentina Conter. Em circulação por festivais brasileiros e argentinos."},
  {id:"ese",title:"El Secreto de los Estradas",year:"2025",cat:"direcao",roles:["Direção","Edição","Dir. de Som"],desc:"Curta de terror. Direção, edição e direção de som."},
  {id:"cds",title:"La Cita de Samer",year:"2025",cat:"direcao",roles:["Direção","Montagem","Sound Design"],desc:"Curta de ficção. Direção, montagem e sound design."},
  {id:"ced",title:"¿Qué Estamos Discutiendo?",year:"2024",cat:"direcao",roles:["Direção","Montagem","Som Direto"],desc:"Curta de ficção. Direção, montagem e som direto."},
  {id:"lav",title:"A Lavanderia",year:"2026",cat:"som",roles:["Dir. de Som","Microfonista","Sound Design"],desc:"Academia do Cinema — Imersão Audiovisual 2026. Direção de som completa."},
  {id:"ph",title:"Poco Heterodoxo",year:"2025",cat:"som",roles:["Dir. de Som","Sound Design"],desc:"Curta de ficção. Diretor de som e sound designer."},
  {id:"ps",title:"Pequeña Simone",year:"2024",cat:"som",roles:["Dir. de Som","Sound Design"],desc:"Curta de ficção. Diretor de som e sound designer."},
  {id:"tn",title:"Turno da Noite",year:"2026",cat:"som",roles:["Microfonista"],desc:"Microfonista de som direto."},
  {id:"bvc",title:"Brujas, Viejas y Chorras",year:"2026",cat:"som",roles:["Microfonista"],desc:"Microfonista de som direto."},
  {id:"siah",title:"Acervo Cacique Siã HuniKuin",year:"2026",cat:"producao",roles:["Arquivamento","Curadoria Digital"],desc:"Digitalização e curadoria de acervo histórico audiovisual indígena amazônico."},
  {id:"min",title:"MINUSTAH, Haiti",year:"Em produção",cat:"producao",roles:["Co-Direção","Produção Executiva"],desc:"Documentário sobre a missão da ONU no Haiti (2004–2017). Target: IDFA / Hot Docs / Cannes Marché."},
  {id:"vpl",title:"Voy a Perder la Cabeza por tu Amor",year:"2025–2026",cat:"outros",roles:["Projeção","Edição"],desc:"Teatro. Chefe de projeção no Resolume Arena e editor."},
  {id:"pen",title:"Penumbra",year:"2025",cat:"outros",roles:["Dir. de Fotografia"],desc:"Curta. Diretor de fotografia."},
  {id:"hcn",title:"Homenagem Cine Noir",year:"2024",cat:"outros",roles:["Direção","Fotografia"],desc:"Evento cinematográfico."},
];

const SERVICES = [
  {icon:"🎬",title:"Direção & Fotografia",items:["Direção cinematográfica","Direção de fotografia (DoP)","Operação de câmera"]},
  {icon:"🎙️",title:"Som Direto & Sound Design",items:["Som direto · boom · microfonagem","Sound design","Pós-produção de áudio","Mixagem e edição de diálogos"]},
  {icon:"🎞️",title:"Pós-produção",items:["Edição de vídeo (Premiere / CapCut)","Montagem","Tratamento de cor","Projeção mapeada (Resolume Arena)"]},
  {icon:"🌐",title:"Acessibilidade & Tradução",items:["Legendagem SRT/ASS","Tradução Espanhol ↔ Português","Interpretação simultânea"]},
  {icon:"📋",title:"Gestão & Produção",items:["Produção executiva","Gestão de projetos culturais","Co-produções internacionais","Licitações públicas (Compras.gov/PNCP)"]},
  {icon:"💻",title:"TI & Suporte",items:["Suporte técnico B2B","Infraestrutura e informática"]},
];

const C = {bg:"#090909",surf:"#0f0f0f",card:"#161616",bord:"#222",acc:"#c9a84c",txt:"#ede8df",mut:"#585858",dim:"#222"};
const EMPTY_EXT = {photos:[],ytUrl:"",synopsis:""};

const toB64 = f => new Promise(r=>{const fr=new FileReader();fr.onload=e=>r(e.target.result);fr.readAsDataURL(f)});
const getYTId = url => {
  if(!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/)([^&?/\s]{11})/);
  return m ? m[1] : (url.trim().length===11 ? url.trim() : null);
};

function Pill({label,cat}){
  const c=CAT_C[cat]||C.acc;
  return <span style={{padding:"1px 7px",borderRadius:99,fontSize:9.5,fontWeight:700,background:c+"1a",color:c,border:`1px solid ${c}33`,letterSpacing:.3}}>{label}</span>;
}
function NavBtn({label,onClick}){
  const[h,sH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:"none",border:"none",color:h?C.txt:C.mut,cursor:"pointer",fontSize:12,fontWeight:500,padding:"6px 10px",borderRadius:4,transition:"color .15s"}}>{label}</button>;
}
function SHead({children}){
  return <div style={{display:"flex",alignItems:"center",gap:14}}><span style={{color:C.acc,fontWeight:800,fontSize:10.5,letterSpacing:2.5,textTransform:"uppercase",flexShrink:0}}>{children}</span><div style={{flex:1,height:1,background:C.bord}}/></div>;
}
function Hr(){return <div style={{borderTop:`1px solid ${C.bord}`}}/>;}
function CTile({icon,label,value,href}){
  const[h,sH]=useState(false);
  const Tag=href?"a":"div";
  return <Tag href={href} target="_blank" rel="noopener" onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:C.card,border:`1px solid ${h&&href?C.acc+"66":C.bord}`,borderRadius:10,padding:"15px 18px",textDecoration:"none",display:"flex",gap:12,alignItems:"flex-start",transition:"border-color .2s",cursor:href?"pointer":"default",minWidth:180}}><span style={{fontSize:20}}>{icon}</span><div><div style={{color:C.mut,fontSize:10.5,fontWeight:600,marginBottom:3,letterSpacing:.5}}>{label}</div><div style={{color:C.txt,fontSize:12.5,fontWeight:500}}>{value}</div></div></Tag>;
}
function ImgSlot({src,onChange,h=124}){
  const inp=useRef();
  const[hov,sH]=useState(false);
  return <div onClick={()=>inp.current.click()} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{height:h,width:"100%",background:C.surf,cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>{src?<img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:.35}}><span style={{fontSize:22}}>📷</span><span style={{color:C.mut,fontSize:10}}>Foto</span></div>}{hov&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.6)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5}}><span style={{fontSize:20}}>📷</span><span style={{color:"#fff",fontSize:10}}>{src?"Trocar":"Adicionar"}</span></div>}<input ref={inp} type="file" accept="image/*" style={{display:"none"}} onChange={async e=>{if(e.target.files[0])onChange(await toB64(e.target.files[0]))}}/></div>;
}
function GalleryPhoto({src,onRemove}){
  const[h,sH]=useState(false);
  return(
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{position:"relative",aspectRatio:"4/3",background:C.surf,borderRadius:8,overflow:"hidden"}}>
      <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
      {h&&<button onClick={onRemove} style={{position:"absolute",top:7,right:7,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.82)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,lineHeight:1}}>×</button>}
    </div>
  );
}
function AddPhotoBtn({onFiles}){
  const inp=useRef();
  const[h,sH]=useState(false);
  return(
    <div onClick={()=>inp.current.click()} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{aspectRatio:"4/3",background:C.card,border:`2px dashed ${h?C.acc:C.bord}`,borderRadius:8,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,transition:"border-color .2s"}}>
      <span style={{fontSize:28,color:h?C.acc:C.mut,fontWeight:200,lineHeight:1,transition:"color .2s"}}>+</span>
      <span style={{color:h?C.acc:C.mut,fontSize:11,fontWeight:500,transition:"color .2s"}}>Adicionar fotos</span>
      <input ref={inp} type="file" accept="image/*" multiple style={{display:"none"}} onChange={async e=>{const srcs=await Promise.all([...e.target.files].map(toB64));if(srcs.length)onFiles(srcs);}}/>
    </div>
  );
}
function Card({p,cover,onClick}){
  const[h,sH]=useState(false);
  const col=CAT_C[p.cat]||C.acc;
  return(
    <div onClick={onClick} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:C.card,border:`1px solid ${h?col+"66":C.bord}`,borderRadius:10,overflow:"hidden",transition:"border-color .2s,transform .2s",transform:h?"translateY(-3px)":"none",display:"flex",flexDirection:"column",cursor:"pointer"}}>
      <div style={{position:"relative",height:130,background:C.surf,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {cover?<img src={cover} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:34,opacity:.12}}>🎬</span>}
        <span style={{position:"absolute",top:7,right:7,background:"rgba(0,0,0,.85)",color:C.mut,padding:"2px 8px",borderRadius:99,fontSize:9.5}}>{p.year}</span>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:col,opacity:.85}}/>
        {h&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:12,fontWeight:600,letterSpacing:.3}}>Ver projeto →</span></div>}
      </div>
      <div style={{padding:"12px 13px 16px",flex:1,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{color:C.txt,fontWeight:700,fontSize:12.5,lineHeight:1.35}}>{p.title}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{p.roles.map(r=><Pill key={r} label={r} cat={p.cat}/>)}</div>
        <div style={{color:C.mut,fontSize:11,lineHeight:1.65,flex:1}}>{p.desc}</div>
      </div>
    </div>
  );
}

function ProjectPage({p,ext,onExt,onAddPhotos,onRemovePhoto,onBack}){
  const[ytInput,setYtInput]=useState(ext.ytUrl||"");
  const[editYt,setEditYt]=useState(!ext.ytUrl);
  const[synopsis,setSynopsis]=useState(ext.synopsis||"");
  const[editSyn,setEditSyn]=useState(false);
  const col=CAT_C[p.cat]||C.acc;
  const vid=getYTId(ext.ytUrl);
  const saveYt=()=>{onExt({ytUrl:ytInput});setEditYt(false);};
  const saveSyn=()=>{onExt({synopsis});setEditSyn(false);};
  const cancelSyn=()=>{setSynopsis(ext.synopsis||"");setEditSyn(false);};
  return(
    <div style={{maxWidth:840,margin:"0 auto",padding:"40px 24px 80px"}}>
      <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:36}}>
        <button onClick={onBack} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.acc+"55";e.currentTarget.style.color=C.txt;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.color=C.mut;}} style={{background:"none",border:`1px solid ${C.bord}`,color:C.mut,borderRadius:6,cursor:"pointer",padding:"7px 14px",fontSize:12,flexShrink:0,marginTop:6,transition:"border-color .15s,color .15s"}}>← Voltar</button>
        <div>
          <div style={{color:col,fontSize:10.5,fontWeight:700,letterSpacing:2,marginBottom:7}}>{CAT_L[p.cat]?.toUpperCase()}</div>
          <h2 style={{color:C.txt,fontSize:26,fontWeight:800,margin:"0 0 10px",lineHeight:1.2}}>{p.title}</h2>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{color:C.mut,fontSize:12.5}}>{p.year}</span>
            <span style={{color:C.dim}}>·</span>
            {p.roles.map(r=><Pill key={r} label={r} cat={p.cat}/>)}
          </div>
        </div>
      </div>
      <SHead>Vídeo</SHead>
      <div style={{marginTop:16,marginBottom:40}}>
        {vid&&!editYt?(
          <div>
            <div style={{position:"relative",paddingTop:"56.25%",borderRadius:10,overflow:"hidden",background:"#000"}}>
              <iframe style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} src={`https://www.youtube.com/embed/${vid}`} title={p.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </div>
            <button onClick={()=>setEditYt(true)} style={{marginTop:10,background:"none",border:"none",color:C.mut,cursor:"pointer",fontSize:12,padding:0}}>✏️ Trocar vídeo</button>
          </div>
        ):(
          <div style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:10,padding:"20px"}}>
            <div style={{color:C.mut,fontSize:12,marginBottom:12}}>Cole o link do YouTube</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <input value={ytInput} onChange={e=>setYtInput(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." onKeyDown={e=>e.key==="Enter"&&saveYt()} style={{flex:1,minWidth:200,background:C.surf,border:`1px solid ${C.bord}`,borderRadius:6,color:C.txt,padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
              <button onClick={saveYt} style={{padding:"9px 18px",background:C.acc,color:"#090909",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:13}}>Incorporar</button>
              {ext.ytUrl&&<button onClick={()=>setEditYt(false)} style={{padding:"9px 12px",background:"none",border:`1px solid ${C.bord}`,color:C.mut,borderRadius:6,cursor:"pointer",fontSize:13}}>Cancelar</button>}
            </div>
          </div>
        )}
      </div>
      <SHead>Sinopse & Notas</SHead>
      <div style={{marginTop:16,marginBottom:40}}>
        {editSyn?(
          <div>
            <textarea value={synopsis} onChange={e=>setSynopsis(e.target.value)} rows={6} style={{width:"100%",background:C.card,border:`1px solid ${C.acc}55`,borderRadius:8,color:C.txt,padding:"14px 16px",fontSize:13.5,lineHeight:1.78,outline:"none",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit"}} placeholder="Sinopse, notas de produção, processo criativo..."/>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button onClick={saveSyn} style={{padding:"7px 18px",background:C.acc,color:"#090909",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:12.5}}>Salvar</button>
              <button onClick={cancelSyn} style={{padding:"7px 12px",background:"none",border:`1px solid ${C.bord}`,color:C.mut,borderRadius:6,cursor:"pointer",fontSize:12.5}}>Cancelar</button>
            </div>
          </div>
        ):(
          <div onClick={()=>setEditSyn(true)} onMouseEnter={e=>e.currentTarget.style.borderColor=C.acc+"55"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.bord} style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:10,padding:"16px 18px",cursor:"text",minHeight:90,transition:"border-color .2s"}}>
            {ext.synopsis?<p style={{color:C.txt,fontSize:13.5,lineHeight:1.82,margin:0,whiteSpace:"pre-wrap"}}>{ext.synopsis}</p>:<p style={{color:C.mut,fontSize:13,fontStyle:"italic",margin:0}}>Clique para adicionar sinopse, notas de produção ou processo criativo...</p>}
          </div>
        )}
      </div>
      <SHead>Galeria</SHead>
      <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:48}}>
        {(ext.photos||[]).map((src,i)=><GalleryPhoto key={i} src={src} onRemove={()=>onRemovePhoto(i)}/>)}
        <AddPhotoBtn onFiles={onAddPhotos}/>
      </div>
      <div style={{paddingTop:32,borderTop:`1px solid ${C.bord}`}}>
        <SHead>Ficha Técnica</SHead>
        <div style={{marginTop:20,display:"flex",gap:32,flexWrap:"wrap"}}>
          <div><div style={{color:C.mut,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>FUNÇÕES</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{p.roles.map(r=><Pill key={r} label={r} cat={p.cat}/>)}</div></div>
          <div><div style={{color:C.mut,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>ANO</div><div style={{color:C.txt,fontSize:13}}>{p.year}</div></div>
          <div><div style={{color:C.mut,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>CATEGORIA</div><div style={{color:col,fontSize:13,fontWeight:600}}>{CAT_L[p.cat]}</div></div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio(){
  const[filter,sF]=useState("todos");
  const[extData,setExt]=useState({});
  const[profile,sProf]=useState(null);
  const[activePId,setActivePId]=useState(null);
  const getExt=id=>extData[id]||EMPTY_EXT;
  const onExt=(id,upd)=>setExt(d=>({...d,[id]:{...(d[id]||EMPTY_EXT),...upd}}));
  const addPhotos=(id,srcs)=>setExt(d=>{const c=d[id]||EMPTY_EXT;return{...d,[id]:{...c,photos:[...c.photos,...srcs]}};});
  const removePhoto=(id,idx)=>setExt(d=>{const c=d[id]||EMPTY_EXT;return{...d,[id]:{...c,photos:c.photos.filter((_,i)=>i!==idx)}};});
  const activeProject=activePId?PROJECTS.find(p=>p.id===activePId):null;
  const visible=filter==="todos"?PROJECTS:PROJECTS.filter(p=>p.cat===filter);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return(
    <div style={{background:C.bg,color:C.txt,minHeight:"100vh",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <nav style={{position:"sticky",top:0,zIndex:100,background:C.bg+"f5",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.bord}`,padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:50}}>
        <span onClick={()=>setActivePId(null)} style={{color:C.acc,fontWeight:800,fontSize:12.5,letterSpacing:2.5,cursor:"pointer"}}>KINESTESIA</span>
        <div style={{display:"flex",alignItems:"center",gap:2}}>
          {activeProject?(
            <button onClick={()=>setActivePId(null)} style={{background:"none",border:`1px solid ${C.bord}`,color:C.mut,borderRadius:5,cursor:"pointer",padding:"4px 12px",fontSize:12}}>← Filmografia</button>
          ):(
            [["sobre","Sobre"],["filmografia","Filmografia"],["servicos","Serviços"],["contato","Contato"]].map(([id,l])=><NavBtn key={id} label={l} onClick={()=>go(id)}/>)
          )}
        </div>
      </nav>
      {activeProject?(
        <ProjectPage p={activeProject} ext={getExt(activeProject.id)} onExt={upd=>onExt(activeProject.id,upd)} onAddPhotos={srcs=>addPhotos(activeProject.id,srcs)} onRemovePhoto={idx=>removePhoto(activeProject.id,idx)} onBack={()=>setActivePId(null)}/>
      ):(
        <>
          <section id="topo" style={{maxWidth:840,margin:"0 auto",padding:"68px 24px 52px",display:"flex",gap:36,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{width:124,height:124,borderRadius:"50%",overflow:"hidden",border:`2px solid ${C.acc}55`,flexShrink:0}}><ImgSlot src={profile} onChange={sProf} h={124}/></div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{color:C.mut,fontSize:10.5,fontWeight:700,letterSpacing:2.5,marginBottom:10}}>PORTFÓLIO AUDIOVISUAL</div>
              <h1 style={{color:C.txt,fontSize:32,fontWeight:800,margin:"0 0 4px",lineHeight:1.15}}>Dani Matos</h1>
              <div style={{color:C.acc,fontSize:13.5,fontWeight:600,marginBottom:14,letterSpacing:.3}}>Cineasta · Diretor de Som · Produtor Cultural</div>
              <div style={{color:C.mut,fontSize:12.5,lineHeight:1.75}}>Brasília, DF &nbsp;·&nbsp; La Plata, Argentina<br/>Kinestesia Producciones Audiovisuales</div>
              <div style={{marginTop:14,display:"flex",gap:6,flexWrap:"wrap"}}>
                {["🇧🇷 Português","🇦🇷 Español","🇺🇸 English"].map(l=><span key={l} style={{padding:"3px 10px",borderRadius:99,background:"#1c1c1c",color:C.mut,fontSize:11,fontWeight:600}}>{l}</span>)}
              </div>
              <div style={{marginTop:22}}><a href="mailto:danillo.assuncao@gmail.com" style={{padding:"8px 20px",background:C.acc,color:"#090909",borderRadius:6,fontWeight:700,fontSize:12,textDecoration:"none",letterSpacing:.3}}>✉ Contato</a></div>
            </div>
          </section>
          <Hr/>
          <section id="sobre" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px"}}>
            <SHead>Sobre</SHead>
            <p style={{color:C.mut,fontSize:13.5,lineHeight:1.95,maxWidth:620,margin:"20px 0 0"}}>Cineasta amapaense formado em Artes Audiovisuais pela <span style={{color:C.txt}}>Universidad Nacional de La Plata (UNLP)</span>, onde fundou a <span style={{color:C.acc}}>Kinestesia Producciones Audiovisuales</span>. Atua entre Brasília e La Plata com ampla experiência em produção audiovisual, som direto, sound design e gestão de projetos culturais. Sua obra explora migração, identidade e fronteiras, articulando o cinema emergente <span style={{color:C.txt}}>amazônico e afro-indígena</span> com colaborações internacionais.</p>
          </section>
          <Hr/>
          <section id="filmografia" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px"}}>
            <SHead>Filmografia</SHead>
            <div style={{display:"flex",gap:6,marginTop:22,marginBottom:26,flexWrap:"wrap"}}>
              {CATS.map(c=>{const col=CAT_C[c]||C.acc;const active=filter===c;return <button key={c} onClick={()=>sF(c)} style={{padding:"5px 14px",borderRadius:99,fontSize:11.5,fontWeight:600,cursor:"pointer",border:"1px solid",transition:"all .15s",background:active?col:"transparent",borderColor:active?col:C.bord,color:active?"#090909":C.mut}}>{CAT_L[c]}</button>;})}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(192px,1fr))",gap:12}}>
              {visible.map(p=><Card key={p.id} p={p} cover={(extData[p.id]?.photos||[])[0]} onClick={()=>setActivePId(p.id)}/>)}
            </div>
          </section>
          <Hr/>
          <section id="servicos" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px"}}>
            <SHead>Serviços</SHead>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginTop:22}}>
              {SERVICES.map(s=><div key={s.title} style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:10,padding:"18px 18px 22px"}}><div style={{fontSize:22,marginBottom:10}}>{s.icon}</div><div style={{color:C.txt,fontWeight:700,fontSize:13,marginBottom:10}}>{s.title}</div>{s.items.map(i=><div key={i} style={{color:C.mut,fontSize:12,lineHeight:1.8}}>· {i}</div>)}</div>)}
            </div>
          </section>
          <Hr/>
          <section id="contato" style={{maxWidth:840,margin:"0 auto",padding:"52px 24px 80px"}}>
            <SHead>Contato</SHead>
            <div style={{marginTop:22,display:"flex",gap:12,flexWrap:"wrap"}}>
              <CTile icon="✉️" label="E-mail" value="danillo.assuncao@gmail.com" href="mailto:danillo.assuncao@gmail.com"/>
              <CTile icon="💬" label="WhatsApp" value="(61) 98228-6913" href="https://wa.me/5561982286913"/>
              <CTile icon="🏢" label="Empresa" value="Kinestesia Producciones Audiovisuales"/>
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