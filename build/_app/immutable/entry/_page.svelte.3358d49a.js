import{J as re,S as Q,i as W,s as X,k as h,q as E,a as T,l as _,m as b,r as S,h as v,c as N,n as $,b as C,G as u,K as De,L as ae,M as Pe,u as G,H as P,N as Oe,O as he,y as H,z as R,A as Y,g as V,d as F,P as _e,B as J,I as Z,p as Le,e as ue,v as de,f as fe,o as Xe,w as Ze}from"../chunks/index.d1ca47b7.js";import{w as ve,d as se,r as et}from"../chunks/index.cced8ee5.js";const Ge=()=>{const{subscribe:r,set:e,update:n}=ve(0);return{subscribe:r,increment:t=>n(a=>a+t),decrement:t=>n(a=>a-t>=0?a-t:0),reset:()=>e(0)}},K=Ge(),ne=Ge(),ke=(r,e,n,t)=>(t.activeUpgradeLevel===t.upgradeLevel&&K.decrement(t.currentCost),{...t,activeUpgradeLevel:t.activeUpgradeLevel+1,upgradeLevel:t.activeUpgradeLevel===t.upgradeLevel?t.upgradeLevel+1:t.upgradeLevel,currentCost:t.upgradeLevel>0?t.currentCost+t.currentCost*n:t.currentCost,currentGoodTicker:t.upgradeLevel>0?t.currentGoodTicker+t.currentGoodTicker*r:t.currentGoodTicker,currentBadTicker:t.upgradeLevel>0?t.currentBadTicker+t.currentBadTicker*e:t.currentBadTicker}),we=(r,e,n,t)=>(t.activeUpgradeLevel===t.upgradeLevel&&K.decrement(t.currentCost),{...t,activeUpgradeLevel:t.activeUpgradeLevel+1,upgradeLevel:t.activeUpgradeLevel===t.upgradeLevel?t.upgradeLevel+1:t.upgradeLevel,currentCost:t.activeUpgradeLevel===t.upgradeLevel&&t.upgradeLevel>0?t.currentCost+t.currentCost*n:t.currentCost,currentAdditionNumMod:t.upgradeLevel>0?t.currentAdditionNumMod+e:t.currentAdditionNumMod,currentAdditionSizeMod:t.upgradeLevel>0?t.currentAdditionSizeMod+r:t.currentAdditionSizeMod}),Me=(r,e,n)=>(n.activeUpgradeLevel===n.upgradeLevel&&K.decrement(n.currentCost),{...n,activeUpgradeLevel:n.activeUpgradeLevel-1,currentAdditionNumMod:n.activeUpgradeLevel>0?n.currentAdditionNumMod-e:n.currentAdditionNumMod,currentAdditionSizeMod:n.currentAdditionSizeMod-r}),Ie={additionStart:{itemName:"creates addition",type:"hidden",isAvailable:!0,availableAfter:{itemId:"start",upgradeLevel:0},itemType:"iteratable",upgradeLevel:1,activeUpgradeLevel:1,forced:!1,currentCost:0,currentGoodTicker:0,currentBadTicker:0,currentAdditionNumMod:10,currentAdditionSizeMod:2,IncFunc:r=>r,DecFunc:r=>r},badStart:{itemName:"creates something",type:"hidden",isAvailable:!1,availableAfter:{itemId:"test2",upgradeLevel:1},itemType:"iteratable",upgradeLevel:0,activeUpgradeLevel:0,forced:!0,currentCost:0,currentGoodTicker:0,currentBadTicker:.02,currentAdditionNumMod:0,currentAdditionSizeMod:0,IncFunc:r=>r,DecFunc:r=>r},test1:{itemName:"This one gives you automatic good ticker",type:"plus",isAvailable:!0,availableAfter:{itemId:"start",upgradeLevel:0},itemType:"iteratable",upgradeLevel:0,activeUpgradeLevel:0,forced:!1,currentCost:1,currentGoodTicker:0,currentBadTicker:0,currentAdditionNumMod:0,currentAdditionSizeMod:0,IncFunc:r=>ke(.009,.002,.5,r),DecFunc:r=>r},test2:{itemName:"This gives you bigger numbers to add",type:"plus_minus",isAvailable:!0,availableAfter:{itemId:"test1",upgradeLevel:1},itemType:"iteratable",upgradeLevel:0,activeUpgradeLevel:0,forced:!1,currentCost:1,currentGoodTicker:0,currentAdditionNumMod:20,currentAdditionSizeMod:0,currentBadTicker:0,IncFunc:r=>we(0,20,.5,r),DecFunc:r=>Me(0,20,r)},test3:{itemName:"This gives you more numbers to add",type:"plus_minus",isAvailable:!1,availableAfter:{itemId:"test2",upgradeLevel:10},itemType:"iteratable",upgradeLevel:0,activeUpgradeLevel:0,forced:!1,currentCost:1e3,currentGoodTicker:0,currentAdditionNumMod:0,currentAdditionSizeMod:1,currentBadTicker:0,IncFunc:r=>we(1,0,3,r),DecFunc:r=>Me(1,0,r)},test4:{itemName:"This one gives you automatic good ticker, but more",type:"plus",isAvailable:!1,availableAfter:{itemId:"test2",upgradeLevel:1},itemType:"iteratable",upgradeLevel:0,activeUpgradeLevel:0,forced:!1,currentCost:20,currentGoodTicker:.009,currentBadTicker:.002,currentAdditionNumMod:0,currentAdditionSizeMod:0,IncFunc:r=>ke(.01,.004,.7,r),DecFunc:r=>r}},je=(r,e)=>{const n={...r},t=[];for(const l in r)!r[l].isAvailable&&r[l].availableAfter!==void 0&&r[l].availableAfter.itemId&&r[l].availableAfter.itemId===e&&r[l].availableAfter.upgradeLevel===r[e].upgradeLevel&&(t.push(l),n[l]={...r[l],isAvailable:!0,upgradeLevel:r[l].forced===!0?1:0,activeUpgradeLevel:r[l].forced===!0?1:0});let a={...n};return t.forEach(l=>{a=je(a,l)}),a},tt=(r,e)=>{const n={...r,[e]:{...r[e].IncFunc(r[e])}};return je(n,e)},rt=(r,e)=>({...r,[e]:{...r[e].DecFunc(r[e])}}),nt=()=>{const{subscribe:r,set:e,update:n}=ve(Ie);return{subscribe:r,increment:t=>n(a=>tt(a,t)),decrement:t=>n(a=>rt(a,t)),reset:()=>e(Ie)}},ee=nt(),He=r=>{const{subscribe:e,set:n,update:t}=ve(r);return{subscribe:e,set:n,reset:()=>n(r)}},at=se([ee],([r])=>{let e=0;for(const[n,t]of Object.entries(r))e+=t.currentAdditionSizeMod&&t.activeUpgradeLevel>0?t.currentAdditionSizeMod:0;return e}),st=se([ee],([r])=>{let e=0;for(const[n,t]of Object.entries(r))e+=t.currentAdditionNumMod&&t.activeUpgradeLevel>0?t.currentAdditionNumMod:0;return e}),lt=He(2),it=He(10),ct=se([ee],([r])=>{let e=0;for(const[n,t]of Object.entries(r))e+=t.currentGoodTicker&&t.activeUpgradeLevel>0?t.currentGoodTicker:0;return e}),ot=se([ee],([r])=>{let e=0;for(const[n,t]of Object.entries(r))e+=t.currentBadTicker&&t.activeUpgradeLevel>0?t.currentBadTicker:0;return e}),Re=r=>Math.floor(Math.random()*r),ut=()=>{let r=re(Qe),e=re(ct),n=15;r<n&&K.increment((n-r)*e);let t=re(dt),a=10,l=2,s=re(ot);t<l?ne.increment(s*a):ne.increment(s);let i=75;re(ne)>i&&(K.decrement(re(K)*.5),ne.reset())},Ye=et(new Date,function(e){const n=setInterval(()=>{e(new Date),ut()},50);return function(){clearInterval(n)}}),Je=()=>{let r=new Date;r.setSeconds(r.getSeconds()-6e3);const{subscribe:e,set:n}=ve(r);return{subscribe:e,reset:()=>n(new Date)}},Ke=Je(),ge=Je(),Qe=se([Ye,Ke],([r,e])=>Math.round((r.getTime()-e.getTime())/1e3)),dt=se([Ye,ge],([r,e])=>Math.round((r.getTime()-e.getTime())/1e3));function ft(r){let e,n,t,a,l,s,i,c,o,m,d,g,I,U,z;return{c(){e=h("div"),n=h("h3"),t=E("Enter your answer:"),a=T(),l=h("div"),s=h("input"),i=T(),c=h("button"),o=E("submit"),m=T(),d=h("div"),g=E("Correct answer: "),I=E(r[0]),this.h()},l(p){e=_(p,"DIV",{class:!0});var f=b(e);n=_(f,"H3",{class:!0});var y=b(n);t=S(y,"Enter your answer:"),y.forEach(v),a=N(f),l=_(f,"DIV",{class:!0});var D=b(l);s=_(D,"INPUT",{type:!0,class:!0}),i=N(D),c=_(D,"BUTTON",{class:!0});var M=b(c);o=S(M,"submit"),M.forEach(v),D.forEach(v),m=N(f),d=_(f,"DIV",{class:!0});var x=b(d);g=S(x,"Correct answer: "),I=S(x,r[0]),x.forEach(v),f.forEach(v),this.h()},h(){$(n,"class","svelte-xyu4rc"),$(s,"type","number"),$(s,"class","svelte-xyu4rc"),$(c,"class","svelte-xyu4rc"),$(l,"class","answer-input svelte-xyu4rc"),$(d,"class","correct-answer svelte-xyu4rc"),$(e,"class","answer-container svelte-xyu4rc")},m(p,f){C(p,e,f),u(e,n),u(n,t),u(e,a),u(e,l),u(l,s),De(s,r[1]),u(l,i),u(l,c),u(c,o),u(e,m),u(e,d),u(d,g),u(d,I),U||(z=[ae(s,"input",r[3]),ae(s,"keydown",r[4]),ae(c,"click",r[2])],U=!0)},p(p,[f]){f&2&&Pe(s.value)!==p[1]&&De(s,p[1]),f&1&&G(I,p[0])},i:P,o:P,d(p){p&&v(e),U=!1,Oe(z)}}}function vt(r,e,n){const t=he();let{correctAnswer:a=0}=e,l="";function s(){t("checkAnswer",{userAnswer:l}),n(1,l="")}function i(){l=Pe(this.value),n(1,l)}const c=o=>o.key==="Enter"&&s();return r.$$set=o=>{"correctAnswer"in o&&n(0,a=o.correctAnswer)},[a,l,s,i,c]}class We extends Q{constructor(e){super(),W(this,e,vt,ft,X,{correctAnswer:0})}}function Ee(r,e,n){const t=r.slice();return t[6]=e[n],t[8]=n,t}function pt(r){let e,n;return{c(){e=h("span"),n=E("+"),this.h()},l(t){e=_(t,"SPAN",{class:!0});var a=b(e);n=S(a,"+"),a.forEach(v),this.h()},h(){$(e,"class","plus svelte-fl602x")},m(t,a){C(t,e,a),u(e,n)},d(t){t&&v(e)}}}function Se(r){let e,n,t=r[6]+"",a,l=r[8]!==0&&pt();return{c(){l&&l.c(),e=T(),n=h("span"),a=E(t),this.h()},l(s){l&&l.l(s),e=N(s),n=_(s,"SPAN",{class:!0});var i=b(n);a=S(i,t),i.forEach(v),this.h()},h(){$(n,"class","addend svelte-fl602x")},m(s,i){l&&l.m(s,i),C(s,e,i),C(s,n,i),u(n,a)},p(s,i){i&1&&t!==(t=s[6]+"")&&G(a,t)},d(s){l&&l.d(s),s&&v(e),s&&v(n)}}}function mt(r){let e,n,t,a,l,s=r[0],i=[];for(let c=0;c<s.length;c+=1)i[c]=Se(Ee(r,s,c));return a=new We({props:{correctAnswer:r[1]}}),a.$on("checkAnswer",r[2]),{c(){e=h("div"),n=h("div");for(let c=0;c<i.length;c+=1)i[c].c();t=T(),H(a.$$.fragment),this.h()},l(c){e=_(c,"DIV",{class:!0});var o=b(e);n=_(o,"DIV",{class:!0});var m=b(n);for(let d=0;d<i.length;d+=1)i[d].l(m);m.forEach(v),t=N(o),R(a.$$.fragment,o),o.forEach(v),this.h()},h(){$(n,"class","addends svelte-fl602x"),$(e,"class","equation-container svelte-fl602x")},m(c,o){C(c,e,o),u(e,n);for(let m=0;m<i.length;m+=1)i[m].m(n,null);u(e,t),Y(a,e,null),l=!0},p(c,[o]){if(o&1){s=c[0];let d;for(d=0;d<s.length;d+=1){const g=Ee(c,s,d);i[d]?i[d].p(g,o):(i[d]=Se(g),i[d].c(),i[d].m(n,null))}for(;d<i.length;d+=1)i[d].d(1);i.length=s.length}const m={};o&2&&(m.correctAnswer=c[1]),a.$set(m)},i(c){l||(V(a.$$.fragment,c),l=!0)},o(c){F(a.$$.fragment,c),l=!1},d(c){c&&v(e),_e(i,c),J(a)}}}function ht(r,e,n){let t,a;Z(r,st,o=>n(3,t=o)),Z(r,at,o=>n(4,a=o));let l=[],s=0;const i=()=>{n(1,s=0),n(0,l=[]);for(let o=0;o<a;o++){let m=Re(t);n(1,s+=m),l.push(m)}};return i(),[l,s,o=>{s===o.detail.userAnswer?(K.increment(s),Ke.reset()):(alert(`bad add ${s}`),ge.reset()),i()}]}class _t extends Q{constructor(e){super(),W(this,e,ht,mt,X,{})}}function gt(r){let e,n,t=Math.floor(r[0])+"",a;return{c(){e=h("h1"),n=E("Your Dino Population: "),a=E(t)},l(l){e=_(l,"H1",{});var s=b(e);n=S(s,"Your Dino Population: "),a=S(s,t),s.forEach(v)},m(l,s){C(l,e,s),u(e,n),u(e,a)},p(l,[s]){s&1&&t!==(t=Math.floor(l[0])+"")&&G(a,t)},i:P,o:P,d(l){l&&v(e)}}}function bt(r,e,n){let t;return Z(r,K,a=>n(0,t=a)),[t]}class $t extends Q{constructor(e){super(),W(this,e,bt,gt,X,{})}}function At(r){let e,n,t,a=Math.floor(r[0])+"",l;return{c(){e=h("h1"),n=E(`Lava level:\r
  `),t=h("span"),l=E(a),this.h()},l(s){e=_(s,"H1",{});var i=b(e);n=S(i,`Lava level:\r
  `),t=_(i,"SPAN",{class:!0,style:!0});var c=b(t);l=S(c,a),c.forEach(v),i.forEach(v),this.h()},h(){$(t,"class","bad-counter"),Le(t,"color",Te(Math.floor(r[0]),75))},m(s,i){C(s,e,i),u(e,n),u(e,t),u(t,l)},p(s,[i]){i&1&&a!==(a=Math.floor(s[0])+"")&&G(l,a),i&1&&Le(t,"color",Te(Math.floor(s[0]),75))},i:P,o:P,d(s){s&&v(e)}}}function Te(r,e){const n=Math.min(Math.floor(r/e*255),255),t=Math.min(Math.floor((1-r/e)*255),255);return`rgb(${n}, ${t}, 0)`}function yt(r,e,n){let t;return Z(r,ne,a=>n(0,t=a)),[t]}class Dt extends Q{constructor(e){super(),W(this,e,yt,At,X,{})}}function Ne(r,e,n){const t=r.slice();return t[6]=e[n],t[8]=n,t}function Lt(r){let e,n;return{c(){e=h("span"),n=E("-"),this.h()},l(t){e=_(t,"SPAN",{class:!0});var a=b(e);n=S(a,"-"),a.forEach(v),this.h()},h(){$(e,"class","plus svelte-1tq842f")},m(t,a){C(t,e,a),u(e,n)},d(t){t&&v(e)}}}function Ue(r){let e,n,t=r[6]+"",a,l=r[8]!==0&&Lt();return{c(){l&&l.c(),e=T(),n=h("span"),a=E(t),this.h()},l(s){l&&l.l(s),e=N(s),n=_(s,"SPAN",{class:!0});var i=b(n);a=S(i,t),i.forEach(v),this.h()},h(){$(n,"class","addend svelte-1tq842f")},m(s,i){l&&l.m(s,i),C(s,e,i),C(s,n,i),u(n,a)},p(s,i){i&1&&t!==(t=s[6]+"")&&G(a,t)},d(s){l&&l.d(s),s&&v(e),s&&v(n)}}}function kt(r){let e,n,t,a,l,s=r[0],i=[];for(let c=0;c<s.length;c+=1)i[c]=Ue(Ne(r,s,c));return a=new We({props:{correctAnswer:r[1]}}),a.$on("checkAnswer",r[2]),{c(){e=h("div"),n=h("div");for(let c=0;c<i.length;c+=1)i[c].c();t=T(),H(a.$$.fragment),this.h()},l(c){e=_(c,"DIV",{class:!0});var o=b(e);n=_(o,"DIV",{class:!0});var m=b(n);for(let d=0;d<i.length;d+=1)i[d].l(m);m.forEach(v),t=N(o),R(a.$$.fragment,o),o.forEach(v),this.h()},h(){$(n,"class","addends svelte-1tq842f"),$(e,"class","equation-container svelte-1tq842f")},m(c,o){C(c,e,o),u(e,n);for(let m=0;m<i.length;m+=1)i[m].m(n,null);u(e,t),Y(a,e,null),l=!0},p(c,[o]){if(o&1){s=c[0];let d;for(d=0;d<s.length;d+=1){const g=Ne(c,s,d);i[d]?i[d].p(g,o):(i[d]=Ue(g),i[d].c(),i[d].m(n,null))}for(;d<i.length;d+=1)i[d].d(1);i.length=s.length}const m={};o&2&&(m.correctAnswer=c[1]),a.$set(m)},i(c){l||(V(a.$$.fragment,c),l=!0)},o(c){F(a.$$.fragment,c),l=!1},d(c){c&&v(e),_e(i,c),J(a)}}}function wt(r,e,n){let t,a;Z(r,lt,o=>n(3,t=o)),Z(r,it,o=>n(4,a=o));let l=[],s=0;const i=()=>{n(0,l=[]);for(let o=0;o<t;o++)l.push(Re(a));t<=2&&l.sort((o,m)=>m-o);for(let o=0;o<t;o++)n(1,s=o===0?l[o]:s-l[o])};return i(),[l,s,o=>{s===o.detail.userAnswer?ne.decrement(Math.abs(s)):(alert(`bad subtract ${s}`),ge.reset()),i()}]}class Mt extends Q{constructor(e){super(),W(this,e,wt,kt,X,{})}}function It(r){let e,n,t,a=r[0].itemName+"",l,s,i,c=Ve(r[0].currentCost)+"",o,m,d,g,I,U,z,p,f,y,D=r[0].upgradeLevel+"",M,x,A;return{c(){e=h("div"),n=h("div"),t=h("h3"),l=E(a),s=T(),i=h("div"),o=E(c),m=T(),d=h("div"),g=h("button"),I=E("+"),z=T(),p=h("div"),f=h("div"),y=E("current level: "),M=E(D),this.h()},l(k){e=_(k,"DIV",{class:!0});var L=b(e);n=_(L,"DIV",{class:!0});var w=b(n);t=_(w,"H3",{class:!0});var j=b(t);l=S(j,a),j.forEach(v),s=N(w),i=_(w,"DIV",{});var O=b(i);o=S(O,c),O.forEach(v),w.forEach(v),m=N(L),d=_(L,"DIV",{class:!0});var te=b(d);g=_(te,"BUTTON",{class:!0});var le=b(g);I=S(le,"+"),le.forEach(v),te.forEach(v),z=N(L),p=_(L,"DIV",{class:!0});var q=b(p);f=_(q,"DIV",{});var B=b(f);y=S(B,"current level: "),M=S(B,D),B.forEach(v),q.forEach(v),L.forEach(v),this.h()},h(){$(t,"class","item-name"),$(n,"class","item-header"),$(g,"class","item-button"),g.disabled=U=r[1]<r[0].currentCost,$(d,"class","buttons"),$(p,"class","item-info"),$(e,"class","upgrade-item")},m(k,L){C(k,e,L),u(e,n),u(n,t),u(t,l),u(n,s),u(n,i),u(i,o),u(e,m),u(e,d),u(d,g),u(g,I),u(e,z),u(e,p),u(p,f),u(f,y),u(f,M),x||(A=ae(g,"click",r[3]),x=!0)},p(k,[L]){L&1&&a!==(a=k[0].itemName+"")&&G(l,a),L&1&&c!==(c=Ve(k[0].currentCost)+"")&&G(o,c),L&3&&U!==(U=k[1]<k[0].currentCost)&&(g.disabled=U),L&1&&D!==(D=k[0].upgradeLevel+"")&&G(M,D)},i:P,o:P,d(k){k&&v(e),x=!1,A()}}}function Ve(r){return`$${r.toFixed(0)}`}function Et(r,e,n){let t;Z(r,K,i=>n(1,t=i));const a=he();let{itemDetail:l={currentCost:1,itemName:"item name",upgradeLevel:1}}=e;const s=()=>a("increment");return r.$$set=i=>{"itemDetail"in i&&n(0,l=i.itemDetail)},[l,t,a,s]}class St extends Q{constructor(e){super(),W(this,e,Et,It,X,{itemDetail:0})}}function Tt(r){let e,n,t,a=r[0].itemName+"",l,s,i,c=Ce(r[0].currentCost)+"",o,m,d,g,I,U,z,p,f,y,D,M,x,A,k=r[0].activeUpgradeLevel+"",L,w,j=r[0].upgradeLevel>r[0].activeUpgradeLevel?`availible level: ${r[0].upgradeLevel}`:"",O,te,le;return{c(){e=h("div"),n=h("div"),t=h("h3"),l=E(a),s=T(),i=h("div"),o=E(c),m=T(),d=h("div"),g=h("button"),I=E("+"),z=T(),p=h("button"),f=E("-"),D=T(),M=h("div"),x=h("div"),A=E("current level: "),L=E(k),w=T(),O=E(j),this.h()},l(q){e=_(q,"DIV",{class:!0});var B=b(e);n=_(B,"DIV",{class:!0});var ie=b(n);t=_(ie,"H3",{class:!0});var be=b(t);l=S(be,a),be.forEach(v),s=N(ie),i=_(ie,"DIV",{});var $e=b(i);o=S($e,c),$e.forEach(v),ie.forEach(v),m=N(B),d=_(B,"DIV",{class:!0});var ce=b(d);g=_(ce,"BUTTON",{class:!0});var Ae=b(g);I=S(Ae,"+"),Ae.forEach(v),z=N(ce),p=_(ce,"BUTTON",{class:!0});var ye=b(p);f=S(ye,"-"),ye.forEach(v),ce.forEach(v),D=N(B),M=_(B,"DIV",{class:!0});var oe=b(M);x=_(oe,"DIV",{});var pe=b(x);A=S(pe,"current level: "),L=S(pe,k),pe.forEach(v),w=N(oe),O=S(oe,j),oe.forEach(v),B.forEach(v),this.h()},h(){$(t,"class","item-name"),$(n,"class","item-header"),$(g,"class","item-button"),g.disabled=U=r[1]<r[0].currentCost&&r[0].upgradeLevel===r[0].activeUpgradeLevel,$(p,"class","item-button"),p.disabled=y=0>=r[0].activeUpgradeLevel,$(d,"class","buttons"),$(M,"class","item-info"),$(e,"class","upgrade-item")},m(q,B){C(q,e,B),u(e,n),u(n,t),u(t,l),u(n,s),u(n,i),u(i,o),u(e,m),u(e,d),u(d,g),u(g,I),u(d,z),u(d,p),u(p,f),u(e,D),u(e,M),u(M,x),u(x,A),u(x,L),u(M,w),u(M,O),te||(le=[ae(g,"click",r[3]),ae(p,"click",r[4])],te=!0)},p(q,[B]){B&1&&a!==(a=q[0].itemName+"")&&G(l,a),B&1&&c!==(c=Ce(q[0].currentCost)+"")&&G(o,c),B&3&&U!==(U=q[1]<q[0].currentCost&&q[0].upgradeLevel===q[0].activeUpgradeLevel)&&(g.disabled=U),B&1&&y!==(y=0>=q[0].activeUpgradeLevel)&&(p.disabled=y),B&1&&k!==(k=q[0].activeUpgradeLevel+"")&&G(L,k),B&1&&j!==(j=q[0].upgradeLevel>q[0].activeUpgradeLevel?`availible level: ${q[0].upgradeLevel}`:"")&&G(O,j)},i:P,o:P,d(q){q&&v(e),te=!1,Oe(le)}}}function Ce(r){return`$${r.toFixed(0)}`}function Nt(r,e,n){let t;Z(r,K,c=>n(1,t=c));const a=he();let{itemDetail:l={currentCost:1,activeUpgradeLevel:1,upgradeLevel:1,itemName:"item name"}}=e;const s=()=>a("increment"),i=()=>a("decrement");return r.$$set=c=>{"itemDetail"in c&&n(0,l=c.itemDetail)},[l,t,a,s,i]}class Ut extends Q{constructor(e){super(),W(this,e,Nt,Tt,X,{itemDetail:0})}}function xe(r,e,n){const t=r.slice();return t[4]=e[n][0],t[5]=e[n][1],t}function qe(r){let e,n,t,a=r[5].type==="plus"&&Be(r),l=r[5].type==="plus_minus"&&Fe(r);return{c(){a&&a.c(),e=T(),l&&l.c(),n=ue()},l(s){a&&a.l(s),e=N(s),l&&l.l(s),n=ue()},m(s,i){a&&a.m(s,i),C(s,e,i),l&&l.m(s,i),C(s,n,i),t=!0},p(s,i){s[5].type==="plus"?a?(a.p(s,i),i&1&&V(a,1)):(a=Be(s),a.c(),V(a,1),a.m(e.parentNode,e)):a&&(de(),F(a,1,1,()=>{a=null}),fe()),s[5].type==="plus_minus"?l?(l.p(s,i),i&1&&V(l,1)):(l=Fe(s),l.c(),V(l,1),l.m(n.parentNode,n)):l&&(de(),F(l,1,1,()=>{l=null}),fe())},i(s){t||(V(a),V(l),t=!0)},o(s){F(a),F(l),t=!1},d(s){a&&a.d(s),s&&v(e),l&&l.d(s),s&&v(n)}}}function Be(r){let e,n;function t(){return r[1](r[4])}return e=new St({props:{itemDetail:r[5]}}),e.$on("increment",t),{c(){H(e.$$.fragment)},l(a){R(e.$$.fragment,a)},m(a,l){Y(e,a,l),n=!0},p(a,l){r=a;const s={};l&1&&(s.itemDetail=r[5]),e.$set(s)},i(a){n||(V(e.$$.fragment,a),n=!0)},o(a){F(e.$$.fragment,a),n=!1},d(a){J(e,a)}}}function Fe(r){let e,n;function t(){return r[2](r[4])}function a(){return r[3](r[4])}return e=new Ut({props:{itemDetail:r[5]}}),e.$on("increment",t),e.$on("decrement",a),{c(){H(e.$$.fragment)},l(l){R(e.$$.fragment,l)},m(l,s){Y(e,l,s),n=!0},p(l,s){r=l;const i={};s&1&&(i.itemDetail=r[5]),e.$set(i)},i(l){n||(V(e.$$.fragment,l),n=!0)},o(l){F(e.$$.fragment,l),n=!1},d(l){J(e,l)}}}function ze(r){let e,n,t,a=r[5].isAvailable&&qe(r);return{c(){a&&a.c(),e=T(),n=h("br")},l(l){a&&a.l(l),e=N(l),n=_(l,"BR",{})},m(l,s){a&&a.m(l,s),C(l,e,s),C(l,n,s),t=!0},p(l,s){l[5].isAvailable?a?(a.p(l,s),s&1&&V(a,1)):(a=qe(l),a.c(),V(a,1),a.m(e.parentNode,e)):a&&(de(),F(a,1,1,()=>{a=null}),fe())},i(l){t||(V(a),t=!0)},o(l){F(a),t=!1},d(l){a&&a.d(l),l&&v(e),l&&v(n)}}}function Vt(r){let e,n,t=Object.entries(r[0]),a=[];for(let s=0;s<t.length;s+=1)a[s]=ze(xe(r,t,s));const l=s=>F(a[s],1,1,()=>{a[s]=null});return{c(){for(let s=0;s<a.length;s+=1)a[s].c();e=ue()},l(s){for(let i=0;i<a.length;i+=1)a[i].l(s);e=ue()},m(s,i){for(let c=0;c<a.length;c+=1)a[c].m(s,i);C(s,e,i),n=!0},p(s,[i]){if(i&1){t=Object.entries(s[0]);let c;for(c=0;c<t.length;c+=1){const o=xe(s,t,c);a[c]?(a[c].p(o,i),V(a[c],1)):(a[c]=ze(o),a[c].c(),V(a[c],1),a[c].m(e.parentNode,e))}for(de(),c=t.length;c<a.length;c+=1)l(c);fe()}},i(s){if(!n){for(let i=0;i<t.length;i+=1)V(a[i]);n=!0}},o(s){a=a.filter(Boolean);for(let i=0;i<a.length;i+=1)F(a[i]);n=!1},d(s){_e(a,s),s&&v(e)}}}function Ct(r,e,n){let t;return Z(r,ee,i=>n(0,t=i)),[t,i=>ee.increment(i),i=>ee.increment(i),i=>ee.decrement(i)]}class xt extends Q{constructor(e){super(),W(this,e,Ct,Vt,X,{})}}const me=[{direction:"f",nextDirection:"f",scalex:.7,scaley:1,speed:5},{direction:"f",nextDirection:"f",scalex:.7,scaley:1,speed:5},{direction:"f",nextDirection:"b",scalex:.5,scaley:1,speed:7},{direction:"b",nextDirection:"b",scalex:.5,scaley:1,speed:7},{direction:"b",nextDirection:"f",scalex:.9,scaley:1,speed:5},{direction:"f",nextDirection:"f",scalex:.5,scaley:1,speed:7},{direction:"f",nextDirection:"b",scalex:.5,scaley:1,speed:7},{direction:"b",nextDirection:"b",scalex:1.5,scaley:1,speed:5},{direction:"b",nextDirection:"f",scalex:.5,scaley:1.5,speed:6},{direction:"f",nextDirection:"f",scalex:.5,scaley:.5,speed:6},{direction:"f",nextDirection:"f",scalex:.2,scaley:.5,speed:5},{direction:"f",nextDirection:"f",scalex:.2,scaley:.2,speed:5},{direction:"f",nextDirection:"f",scalex:.2,scaley:.5,speed:3},{direction:"f",nextDirection:"f",scalex:0,scaley:0,speed:1},{direction:"f",nextDirection:"f",scalex:.2,scaley:.3,speed:6},{direction:"f",nextDirection:"b",scalex:.2,scaley:.4,speed:4},{direction:"b",nextDirection:"f",scalex:.2,scaley:.2,speed:5},{direction:"f",nextDirection:"b",scalex:.2,scaley:.4,speed:6},{direction:"b",nextDirection:"b",scalex:.5,scaley:.4,speed:5},{direction:"b",nextDirection:"f",scalex:.5,scaley:.3,speed:7}];function qt(r){let e;return{c(){e=h("canvas"),this.h()},l(n){e=_(n,"CANVAS",{width:!0,height:!0,class:!0}),b(e).forEach(v),this.h()},h(){$(e,"width",32),$(e,"height",32),$(e,"class","svelte-pcoodf")},m(n,t){C(n,e,t),r[1](e)},p:P,i:P,o:P,d(n){n&&v(e),r[1](null)}}}function Bt(r,e){for(r=r.toString();r.length<e;)r="0"+r;return r}function Ft(r,e,n){let t;Xe(()=>{const l=(()=>{const p=new Map;return f=>{if(p.has(f))return p.get(f);const y=f*(Math.PI/180),D=Math.sin(y)*(180/Math.PI);return p.set(f,D),D}})(),s=(p,f)=>{const{direction:y,nextDirection:D,scalex:M,scaley:x,speed:A}=f,k=l(p.animation_frame);let L=y==="f";const w={...p};return w.x=w.startx+(w.animation_frame+(L?0:180))*M,w.y=w.starty-k*x,(w.animation_frame>=180&&L||w.animation_frame<=-360&&!L)&&(w.startx=p.x,w.animation_frame=D==="f"?0:-180,w.animation_cycle+=1),w.animation_frame=L?w.animation_frame+A:w.animation_frame-A,w};function i(){const p=Math.random()*1288+20,f=Math.random()*(.5-.09)+.09,y={imgNumber:Math.floor(Math.random()*46),img:new Image,scale:f,startx:p/f,x:p/f,starty:200/f+950,y:200/f+950,opacity:0,animation_frame:0,animation_cycle:Math.floor(Math.random()*me.length),animation_type:"hop"};return y.img.src=`/src/lib/assets/img/dinos/${Bt(y.imgNumber,3)}.png`,y}const c=[],o=t.getContext("2d");let m=requestAnimationFrame(z),d=new Image;d.src="/src/lib/assets/img/backgrounds/forest.png",d.onload=function(){U(d)};let g=0;const I=p=>{if(p>g){let f=Math.floor((p-g)/30);if(f>0){for(let y=0;y<f;y++){const D=i();c.push(D)}g=p,c.sort((y,D)=>y.scale-D.scale)}}else if(p<g&&c.length>0){let f=Math.floor((g-p)/30);g*.6>p&&Math.floor(c.length*.5);for(let y=0;y<f;y++){const D=Math.floor(Math.random()*c.length);c.splice(D,1)}g=p}};K.subscribe(I);function U(p){n(0,t.width=p.width,t),n(0,t.height=p.height,t),o.drawImage(p,0,0)}function z(p){m=requestAnimationFrame(z),o.drawImage(d,0,0);for(let f=0;f<c.length;f++)c[f].animation_frame*(Math.PI/180),c[f].animation_cycle>=me.length&&(c[f].animation_cycle=0),c[f]=s(c[f],me[c[f].animation_cycle]),c[f].opacity=c[f].opacity<1?c[f].opacity+.01:1,o.globalAlpha=c[f].opacity,o.drawImage(c[f].img,c[f].x*c[f].scale,c[f].y*c[f].scale,c[f].img.width*c[f].scale,c[f].img.height*c[f].scale),o.globalAlpha=1}return()=>{cancelAnimationFrame(m)}});function a(l){Ze[l?"unshift":"push"](()=>{t=l,n(0,t)})}return[t,a]}class zt extends Q{constructor(e){super(),W(this,e,Ft,qt,X,{})}}function Pt(r){let e;return{c(){e=E(r[0])},l(n){e=S(n,r[0])},m(n,t){C(n,e,t)},p(n,[t]){t&1&&G(e,n[0])},i:P,o:P,d(n){n&&v(e)}}}function Ot(r,e,n){let t;return Z(r,Qe,a=>n(0,t=a)),[t]}class Gt extends Q{constructor(e){super(),W(this,e,Ot,Pt,X,{})}}function jt(r){let e,n,t,a,l,s,i,c,o,m,d,g,I,U,z,p,f,y,D,M,x;return t=new $t({}),i=new Dt({}),d=new zt({}),U=new _t({}),p=new Mt({}),y=new xt({}),M=new Gt({}),{c(){e=h("div"),n=h("div"),H(t.$$.fragment),a=T(),l=h("div"),s=T(),H(i.$$.fragment),c=T(),o=h("div"),m=h("div"),H(d.$$.fragment),g=T(),I=h("div"),H(U.$$.fragment),z=T(),H(p.$$.fragment),f=T(),H(y.$$.fragment),D=T(),H(M.$$.fragment),this.h()},l(A){e=_(A,"DIV",{class:!0});var k=b(e);n=_(k,"DIV",{class:!0});var L=b(n);R(t.$$.fragment,L),a=N(L),l=_(L,"DIV",{class:!0}),b(l).forEach(v),s=N(L),R(i.$$.fragment,L),L.forEach(v),c=N(k),o=_(k,"DIV",{class:!0});var w=b(o);m=_(w,"DIV",{class:!0});var j=b(m);R(d.$$.fragment,j),j.forEach(v),g=N(w),I=_(w,"DIV",{class:!0});var O=b(I);R(U.$$.fragment,O),z=N(O),R(p.$$.fragment,O),f=N(O),R(y.$$.fragment,O),O.forEach(v),w.forEach(v),k.forEach(v),D=N(A),R(M.$$.fragment,A),this.h()},h(){$(l,"class","separator svelte-maq3rt"),$(n,"class","counters svelte-maq3rt"),$(m,"class","left-column svelte-maq3rt"),$(I,"class","right-column svelte-maq3rt"),$(o,"class","main svelte-maq3rt"),$(e,"class","layout svelte-maq3rt")},m(A,k){C(A,e,k),u(e,n),Y(t,n,null),u(n,a),u(n,l),u(n,s),Y(i,n,null),u(e,c),u(e,o),u(o,m),Y(d,m,null),u(o,g),u(o,I),Y(U,I,null),u(I,z),Y(p,I,null),u(I,f),Y(y,I,null),C(A,D,k),Y(M,A,k),x=!0},p:P,i(A){x||(V(t.$$.fragment,A),V(i.$$.fragment,A),V(d.$$.fragment,A),V(U.$$.fragment,A),V(p.$$.fragment,A),V(y.$$.fragment,A),V(M.$$.fragment,A),x=!0)},o(A){F(t.$$.fragment,A),F(i.$$.fragment,A),F(d.$$.fragment,A),F(U.$$.fragment,A),F(p.$$.fragment,A),F(y.$$.fragment,A),F(M.$$.fragment,A),x=!1},d(A){A&&v(e),J(t),J(i),J(d),J(U),J(p),J(y),A&&v(D),J(M,A)}}}class Yt extends Q{constructor(e){super(),W(this,e,null,jt,X,{})}}export{Yt as default};
