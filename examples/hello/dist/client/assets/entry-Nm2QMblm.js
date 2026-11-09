import{C as e,S as t,b as n,n as r,p as i,s as a,t as o,x as s,y as c}from"./chunk-CliGGW0c.js";import{t as l}from"./chunk-CjuVY21J.js";import"./chunk-BXjSMHnu.js";const u=e=>{let t=(e,t)=>typeof e==`function`?e():e===void 0?t:e,r=e=>{if(e!==void 0)return typeof e==`number`?`${e}px`:e},i=()=>t(e.variant,`text`),a=()=>t(e.animated,!0),o=()=>t(e.lines,1),l=()=>t(e.class,``),d=()=>t(e.style,{}),f=()=>t(e.theme,void 0),p=()=>t(e.width,void 0),m=()=>t(e.height,void 0),h=()=>{let e=p();return e===void 0?i()===`circular`?`40px`:`100%`:r(e)},g=()=>{let e=m();if(e!==void 0)return r(e);let t=i();return t===`text`?`1em`:t===`circular`?`40px`:t===`card`?`180px`:`100px`},_=()=>({display:`flex`,flexDirection:`column`,gap:`8px`,...d()}),v=()=>({width:h(),height:g(),...d()});return s(c,{children:[()=>{let t=i(),r=o();return t===`text`&&r>1?n(`div`,{class:()=>`skeleton-container ${l()}`,style:_,children:Array.from({length:r}).map((t,i)=>n(u,{variant:`text`,width:()=>{let e=p();return i===r-1&&!e?`70%`:e},height:e.height,animated:e.animated,theme:e.theme},i))}):n(`div`,{class:()=>`skeleton-base skeleton-${t} ${a()?`skeleton-animated`:``} ${f()?`skeleton-theme-${f()}`:``} ${l()}`,style:v})},n(`style`,{children:`
        .skeleton-base {
          display: inline-block;
          background-color: var(--skeleton-bg, #e2e8f0);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .skeleton-text {
          border-radius: 4px;
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }

        .skeleton-circular {
          border-radius: 50%;
        }

        .skeleton-rectangular {
          border-radius: 0px;
        }

        .skeleton-rounded {
          border-radius: 8px;
        }

        .skeleton-card {
          border-radius: 12px;
        }

        .skeleton-animated::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            var(--skeleton-shine-a, rgba(255, 255, 255, 0.4)) 20%,
            var(--skeleton-shine-b, rgba(255, 255, 255, 0.6)) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: skeleton-shimmer 1.5s infinite;
          content: '';
        }

        @keyframes skeleton-shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        /* theme="dark" força escuro */
        .skeleton-theme-dark {
          --skeleton-bg: #2d3748;
          --skeleton-shine-a: rgba(255, 255, 255, 0.08);
          --skeleton-shine-b: rgba(255, 255, 255, 0.16);
        }

        /* sem theme: segue o sistema. theme="light" fica de fora e usa o padrão claro */
        @media (prefers-color-scheme: dark) {
          .skeleton-base:not(.skeleton-theme-light):not(.skeleton-theme-dark) {
            --skeleton-bg: #2d3748;
            --skeleton-shine-a: rgba(255, 255, 255, 0.08);
            --skeleton-shine-b: rgba(255, 255, 255, 0.16);
          }
        }
      `})]})},d=(...e)=>t(`actions/index`,`somar`,e);var f=/* @__PURE__ */ e({HydrateComponet:()=>p,HydrateComponetChildClient:()=>m,HydrateComponetErrorDigito:()=>h});const p=()=>{let[e,t]=a(0);return i(()=>{console.log(e())}),/* @__PURE__ */ n(`div`,{onClick:()=>{d(5,10).then(e=>t(e))},children:`Hydrate Render`})},m=()=>/* @__PURE__ */ s(`div`,{children:[/* @__PURE__ */ n(`div`,{children:`Hydrate Render Filho`}),/* @__PURE__ */ n(u,{theme:`light`,animated:!0,variant:`rectangular`}),/* @__PURE__ */ n(l,{})]}),h=()=>/* @__PURE__ */ n(c,{children:/* @__PURE__ */ n(`div`,{children:`Hydrate Render`})});typeof p==`function`&&o(p,`components/hydrate`,`HydrateComponet`,`hydrate`),typeof m==`function`&&o(m,`components/hydrate`,`HydrateComponetChildClient`,`hydrate`),typeof h==`function`&&o(h,`components/hydrate`,`HydrateComponetErrorDigito`,`hydrate`),r(`components/hydrate`,f);