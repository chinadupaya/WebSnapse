(this.webpackJsonpthesis=this.webpackJsonpthesis||[]).push([[0],{119:function(e,t,n){},121:function(e,t,n){},122:function(e,t,n){},155:function(e,t,n){},160:function(e,t){},162:function(e,t){},187:function(e,t,n){"use strict";n.r(t);var r,a=n(0),o=n.n(a),i=n(14),s=n.n(i),c=(n(119),n(73)),l=n(26),u=n(113),d=n(10),j=n.n(d),h=n(19),b=n(8),f=n(38),p=(n(121),n(122),n(103)),O=n(59),g=n(194),x=n(195),m=n(196),v=n(209),y=n(104),w=n(199),k=n(112),S=n(200),N=n(105),C=n(210),E=n(197),I=n(198),M=n(201),R=n(202),T=n(203),D=n(204),J=n(205),_=n(206),L=n(207),A=n(74),H=n(87),F=n.n(H),B=n(17),P=[{selector:".snapse-node, .snapse-output",style:{"font-family":"Computer Modern","background-opacity":"0","padding-top":"0","border-width":0,"text-halign":"left","text-valign":"top",color:"black",content:"data(label)"}},{selector:".snapse-node__rules, .snapse-node__output",style:(r={"font-family":"Computer Modern","font-style":"italic","background-color":"white","border-width":1,events:"no","text-wrap":"wrap","text-halign":"center","text-valign":"center"},Object(B.a)(r,"text-wrap","wrap"),Object(B.a)(r,"content","data(label)"),Object(B.a)(r,"height",150),Object(B.a)(r,"shape","roundrectangle"),Object(B.a)(r,"width",100),r)},{selector:".snapse-node__time, .snapse-node__spike",style:{"font-family":"Computer Modern","background-opacity":"0","text-halign":"center","text-valign":"center",content:"data(label)",events:"no",height:15,shape:"roundrectangle",width:50}},{selector:"edge",style:{"font-family":"Computer Modern","curve-style":"bezier","target-arrow-shape":"triangle","text-background-color":"white","text-background-shape":"rectangle",width:1}},{selector:".edge--triggering",style:{"line-color":"magenta","line-style":"dashed","target-arrow-color":"magenta",width:3}}],G=n(48),z=n.n(G);var q=function(){var e=Object(a.useRef)(null);return Object(a.useEffect)((function(){var t,n=e.current,r=0;return function e(){r++,n&&n.edges().animate({style:{"line-dash-offset":-r}}),t=requestAnimationFrame(e)}(),function(){t&&cancelAnimationFrame(t)}}),[]),[e,function(t){e.current=t}]},K=function(e,t,n,r,a){return[{data:{rootId:e,id:"".concat(e),label:"".concat(e.includes("-")?e.substr(0,e.indexOf("-")):e)},classes:"snapse-output",position:{x:0,y:0}},{data:{rootId:e,id:"".concat(e,"-output"),parent:e,label:r},classes:"snapse-node__output",position:{x:t,y:n}},{data:{rootId:e,id:"".concat(e,"-spike"),parent:e,label:a},classes:"snapse-node__spike",position:{x:t,y:n+40}}]},U=function(e){var t=/(a+)(\(*a*\)*)(\+*\**)\/(a+)->(a+);([0-9]+)/.exec(e)||/(a+)(\+*\**)\/(a+)->(0);(0)/.exec(e);return console.log(t),t},W=function(e,t,n){return{data:{id:e+"-"+t,source:e,target:t},classes:n}},X=function(e){for(var t=e.split(" "),n=0,r=0;r<t.length;r++)null!=U(t[r])?n+=1:console.log("invalidRule",t[r]);return n==t.length?1:0},Q=n(192),V=n(1),Y=function(e){var t=e.neurons,n=e.onEdgeCreate,r=e.handleChangePosition,o=e.headless,i=q(),s=Object(b.a)(i,2),c=s[0],l=s[1];var u=function(e){var t,n,r,a,o,i,s={nodes:[],edges:[]};for(var c in e){var l=e[c];if(l.isOutput){var u=K(l.id,l.position.x,l.position.y,l.bitstring,0);s.nodes.push(u[0]),s.nodes.push(u[1]),s.nodes.push(u[2])}else{var d=(t=l.id,n=l.position.x,r=l.position.y,a=l.rules,o=l.spikes,i=l.delay,[{data:{id:t,label:"".concat(t.includes("-")?t.substr(0,t.indexOf("-")):t)},position:{x:n,y:r},classes:"snapse-node"},{data:{id:t+"-rules",parent:t,label:a.replace(/ /g,"\n")},position:{x:n,y:r},classes:"snapse-node__rules"},{data:{id:t+"-spike",parent:t,label:"".concat(0==o?"\u03bb":o)},position:{x:n,y:r-60},classes:"snapse-node__spike"},{data:{id:t+"-time",parent:t,label:i},position:{x:n,y:r+90},classes:"snapse-node__time"}]);s.nodes.push(d[0]),s.nodes.push(d[1]),s.nodes.push(d[2]),s.nodes.push(d[3])}if(l.out)for(var j=0;j<l.out.length;j++)if(l.delay<0){console.log(l.delay);var h,b=Object(f.a)(l.out);try{for(b.s();!(h=b.n()).done;){h.value;var p=W(l.id,l.out[j]," edge--triggering");s.edges.push(p)}}catch(g){b.e(g)}finally{b.f()}}else{var O=W(l.id,l.out[j],"");s.edges.push(O)}}return s}(t);return Object(a.useEffect)((function(){if(!o){var e=c.current;e&&(e.on("mouseup",".snapse-node, .snapse-output",(function(e){console.log("change position",e.target.id()),r(e.position,e.target.id())})),e.gridGuide({guidelinesStyle:{strokeStyle:"black",horizontalDistColor:"#ff0000",verticalDistColor:"green",initPosAlignmentColor:"#0000ff"}}),e.edgehandles({handleNodes:".snapse-node",preview:!1,loopAllowed:function(){return!1},edgeType:function(e,t){return"flat"},complete:n}))}}),[c,o]),o?Object(V.jsx)("div",{id:"cyHeadless"}):Object(V.jsxs)("div",{style:{width:"100%",height:"100%"},children:[Object(V.jsxs)(y.a,{className:"center-graph-button",variant:"secondary",onClick:function(){var e=c.current;e&&(e.center(),e.fit(),e.zoom({level:.8,position:{x:100,y:100}}))},children:[Object(V.jsx)(Q.a,{})," ","Center Graph"]}),Object(V.jsx)(F.a,{cy:l,elements:F.a.normalizeElements(u),style:{width:"100%",height:"100%"},stylesheet:P})]})},Z=n(49),$=n.n(Z),ee=n(39);function te(e){/(a+)(\+*\**)\/(a+)->(a+);([0-9]+)/.exec(e);var t=/(a+)(\(*a*\)*)(\+*\**)\/(a+)->(a+);([0-9]+)/.exec(e),n=/(a+)(\(*a*\)*)(\+*\**)\/(a+)->(0);(0)/.exec(e);if(t){var r=Object(b.a)(t,7),a=r[1],o=r[2],i=r[3],s=r[4],c=r[5],l=r[6],u=parseInt(l,10);return[a.length,o.length-2,i,s.length,c.length,u]}if(n){var d=Object(b.a)(n,7),j=d[1],h=d[2],f=d[3],p=d[4];d[5],d[6];return[j.length,h.length-2,f,p.length,0,0]}return!1}function ne(e,t,n,r){if("+"==n){if(t>0)return(r-e)%t==0&&r-e>=t;if(r>=e)return!0}else if("*"==n){if(t>0)return(r-e)%t==0;if(r>=e-1)return!0}else if(r==e)return!0;return!1}function re(e,t,n,r,a){var o=Object(ee.a)(e,(function(e){var t={},o=[],i={},s=!0;for(var c in e){if(!(C=e[c]).currentRule&&!C.isOutput){delete e[C.id].currentRule;for(var l=C.rules.split(" "),u=[],d=0;d<l.length;d++){var j=te(l[d]),h=Object(b.a)(j,6),p=h[0],O=h[1],g=h[2],x=h[3],m=h[4],v=h[5];ne(p,O,g,C.spikes)&&(u.push(l[d]),s=!1)}if(1==u.length){e[C.id].currentRule=u[0],e[C.id].chosenRule=u[0];var y=te(u[0]),w=Object(b.a)(y,6);p=w[0],O=w[1],g=w[2],x=w[3],m=w[4],v=w[5];e[C.id].delay=v}else if(1==n&&u.length>1){var k=Math.floor(Math.random()*u.length),S=te(u[k]),N=Object(b.a)(S,6);p=N[0],O=N[1],g=N[2],x=N[3],m=N[4],v=N[5];e[C.id].currentRule=u[k],e[C.id].chosenRule=u[k],e[C.id].delay=v}else 0==n&&u.length>1&&(i[C.id]=u)}}if(Object.keys(i).length>0)r(i);else{for(var c in e){var C;if((C=e[c]).currentRule){if(s=!1,C.delay>=0){var E=C.delay.valueOf();E--,e[C.id].delay=E}if(console.log(C.delay),C.delay<0){var I=te(C.currentRule),M=Object(b.a)(I,6),R=(p=M[0],O=M[1],g=M[2],x=M[3],m=M[4],v=M[5],C.spikes.valueOf());R-=x,e[C.id].spikes=R;var T,D=C.out,J=Object(f.a)(D);try{for(J.s();!(T=J.n()).done;){var _=T.value;t[_]=_ in t?t[_]+m:m}}catch(F){J.e(F)}finally{J.f()}delete e[C.id].currentRule}}else C.isOutput?(o.push(C.id),c in t||(t[c]=0)):-1==C.delay&&(e[C.id].delay=0)}for(var L in t){var A=e[L].spikes.valueOf();if(A+=t[L],e[L].spikes=A,e[L].isOutput){var H="".concat(e[L].bitstring).concat(t[L]||"0");e[L].bitstring=H}}s&&a()}}));return localStorage.setItem(t+"sec",JSON.stringify(o)),o}function ae(e){return console.log("back step automata"),JSON.parse(localStorage.getItem(e+"sec"))}var oe,ie,se,ce=n(208),le=function(e){var t=e.showChooseRuleModal,n=e.handleCloseChooseRuleModal,r=e.rules,o=e.handleChosenRules,i=Object(O.a)({}),s=Object(b.a)(i,2),c=s[0],l=s[1];function u(e,t){l((function(n){for(var r in n)r==t&&(n[r]=e.target.value)}))}Object(a.useEffect)((function(){l((function(e){for(var t in r)e[t]=r[t][0]}))}),[r]);for(var d=function(e,t){var n=t.map((function(e){return Object(V.jsx)("option",{value:e,children:e},e)}));return Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{children:e}),Object(V.jsx)(v.a.Control,{as:"select",value:c[e],onChange:function(t){return u(t,e)},children:n})]})},j=Object.keys(r),h=[],f=0;f<j.length;f++)console.log(f),h.push(d(j[f],r[j[f]]));return Object(V.jsxs)(ce.a,{show:t,onHide:n,backdrop:"static",keyboard:!1,children:[Object(V.jsx)(ce.a.Header,{children:Object(V.jsx)(ce.a.Title,{children:"Choose Rule Form"})}),Object(V.jsx)(ce.a.Body,{children:Object(V.jsxs)(v.a,{onSubmit:function(e){e.preventDefault(),o(c)},children:[h,Object(V.jsx)(y.a,{type:"submit",children:"Submit"})]})})]})},ue=function(e,t){return t.reset?{id:"",startingSpikes:0,rules:""}:Object(l.a)(Object(l.a)({},e),{},Object(B.a)({},t.name,t.value))},de={id:"",rules:"",startingSpikes:0},je=function(e){var t=e.showNewNodeModal,n=e.handleCloseModal,r=e.handleNewNode,o=e.handleError,i=function(){n()},s=Object(a.useReducer)(ue,de),c=Object(b.a)(s,2),l=c[0],u=c[1],d=Object(a.useState)(!1),j=Object(b.a)(d,2),h=(j[0],j[1]),f=function(e){u({name:e.target.name,value:e.target.value})};return Object(V.jsxs)(ce.a,{show:t,onHide:i,children:[Object(V.jsx)(ce.a.Header,{closeButton:!0,children:Object(V.jsx)(ce.a.Title,{children:"Create New Node"})}),Object(V.jsx)(ce.a.Body,{children:Object(V.jsxs)(v.a,{onSubmit:function(e){e.preventDefault();var t="".concat(l.id,"-").concat($.a.generate());if(X(l.rules)){console.log("All rules valid"),i(),h(!0),setTimeout((function(){h(!1),u({reset:!0})}),3e3);var n={id:t,position:{x:100,y:100},rules:l.rules,startingSpikes:parseInt(l.startingSpikes),delay:0,spikes:parseInt(l.startingSpikes),isOutput:!1,out:[]};r(n)}else console.log("One or more of the rules is invalid"),o("One or more of the rules is invalid"),i()},"data-testid":"new-node-form",children:[Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{htmlFor:"node-name",children:"Node Name"}),Object(V.jsx)(v.a.Control,{required:!0,id:"node-name",name:"id",type:"text",placeholder:"n0",value:l.id,onChange:f})]}),Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{htmlFor:"node-rules",children:"Node Rules"}),Object(V.jsx)(v.a.Control,{id:"node-rules",required:!0,name:"rules",type:"text",placeholder:"a/a->a;0 aa/a->a;1",value:l.rules,onChange:f}),Object(V.jsx)(v.a.Text,{className:"text-muted",children:"Enter valid rules only. Separate each rule with a space."})]}),Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{htmlFor:"starting-spikes",children:"Starting Spike Number"}),Object(V.jsx)(v.a.Control,{id:"starting-spikes",required:!0,name:"startingSpikes",type:"number",value:l.startingSpikes,onChange:f})]}),Object(V.jsx)(y.a,{variant:"secondary",onClick:i,children:"Close"})," "," ",Object(V.jsx)(y.a,{type:"submit",variant:"primary","data-testid":"new-node-submit-button",children:"Save Changes"})]})})]})},he=function(e,t){return t.reset?{id:""}:Object(l.a)(Object(l.a)({},e),{},Object(B.a)({},t.name,t.value))},be={id:""},fe=function(e){var t=e.showNewOutputModal,n=e.handleCloseNewOutputModal,r=e.handleNewOutput,o=(e.handleError,function(){n()}),i=Object(a.useReducer)(he,be),s=Object(b.a)(i,2),c=s[0],l=s[1],u=Object(a.useState)(!1),d=Object(b.a)(u,2),j=(d[0],d[1]);return Object(V.jsxs)(ce.a,{show:t,onHide:o,children:[Object(V.jsx)(ce.a.Header,{closeButton:!0,children:Object(V.jsx)(ce.a.Title,{children:"Create New Node"})}),Object(V.jsx)(ce.a.Body,{children:Object(V.jsxs)(v.a,{onSubmit:function(e){e.preventDefault();var t="".concat(c.id,"-").concat($.a.generate());o(),j(!0),setTimeout((function(){j(!1),l({reset:!0})}),3e3),r({id:t,position:{x:300,y:300},isOutput:!0,spikes:0,bitstring:" "})},children:[Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{children:"Output Node Name"}),Object(V.jsx)(v.a.Control,{required:!0,name:"id",type:"text",placeholder:"n0",value:c.id,onChange:function(e){console.log(e.target.value),console.log(e.target.name),l({name:e.target.name,value:e.target.value})}})]}),Object(V.jsx)(y.a,{variant:"secondary",onClick:o,children:"Close"})," "," ",Object(V.jsx)(y.a,{type:"submit",variant:"primary",children:"Save Changes"})]})})]})},pe=function(e){var t=e.showEditModal,n=e.handleCloseEditModal,r=e.handleEditNode,o=e.handleError,i=e.neurons,s=Object(a.useState)(""),c=Object(b.a)(s,2),l=c[0],u=c[1],d=Object(a.useState)(""),j=Object(b.a)(d,2),h=j[0],f=j[1],p=Object(a.useState)(0),O=Object(b.a)(p,2),g=O[0],x=O[1],m=function(){n()};Object(a.useEffect)((function(){!function(){var e=Object.keys(i).reduce((function(e,t){return i[t].isOutput||(e[t]=i[t]),e}),{}),t=Object.keys(e);u(t[0]),f(e[t[0]].rules),x(e[t[0]].startingSpikes)}()}),[]);var w=Object.keys(i).reduce((function(e,t){return i[t].isOutput||(e[t]=i[t]),e}),{}),k=Object.keys(w).map((function(e){return Object(V.jsx)("option",{value:e,children:e},e)}));return Object(V.jsxs)(ce.a,{show:t,onHide:m,children:[Object(V.jsx)(ce.a.Header,{closeButton:!0,children:Object(V.jsx)(ce.a.Title,{children:"Edit Node"})}),Object(V.jsx)(ce.a.Body,{children:Object(V.jsxs)(v.a,{onSubmit:function(e){e.preventDefault(),console.log(l,h,g),l?X(h)?(console.log("All rules valid"),m(),setTimeout((function(){u(""),f(""),x(0)}),3e3),r(l,h,g)):(console.log("One or more of the rules is invalid"),o("One or more of the rules is invalid")):o("Please select a node to edit")},"data-testid":"edit-node-form",children:[Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{children:"Select node to edit"}),Object(V.jsx)(v.a.Control,{required:!0,"data-testid":"select-option",as:"select",value:l,onChange:function(e){var t=e.target.value;u(e.target.value),f(i[t].rules),x(i[t].startingSpikes)},children:k})]}),Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{htmlFor:"node-rules",children:"Node Rules"}),Object(V.jsx)(v.a.Control,{id:"node-rules",required:!0,name:"rules",type:"text",placeholder:"a/a->a;0 aa/a->a;1",value:h,onChange:function(e){f(e.target.value)}}),Object(V.jsx)(v.a.Text,{className:"text-muted",children:"Enter valid rules only. Separate each rule with a space."})]}),Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{htmlFor:"startingSpikes",children:"Starting Spike Number"}),Object(V.jsx)(v.a.Control,{id:"startingSpikes",required:!0,name:"startingSpikes",type:"number",placeholder:"0",value:g,onChange:function(e){return x(e.target.value)}})]}),Object(V.jsx)(y.a,{variant:"secondary",onClick:m,children:"Close"})," "," ",Object(V.jsx)(y.a,{type:"submit",variant:"primary","data-testid":"edit-node-submit-button",children:"Save Changes"})]})})]})},Oe=function(e){var t=e.showDeleteModal,n=e.handleCloseDeleteModal,r=e.handleDeleteNode,o=(e.handleError,e.neurons),i=Object(a.useState)(""),s=Object(b.a)(i,2),c=s[0],l=s[1],u=function(){n()},d=Object.keys(o).map((function(e){return Object(V.jsx)("option",{value:e,children:e},e)})),j=Object.keys(o)[0];return Object(V.jsxs)(ce.a,{show:t,onHide:u,children:[Object(V.jsx)(ce.a.Header,{closeButton:!0,children:Object(V.jsx)(ce.a.Title,{children:"Delete Node"})}),Object(V.jsx)(ce.a.Body,{children:Object(V.jsxs)(v.a,{onSubmit:function(e){console.log("NeuronId",c),e.preventDefault(),""!==c?(u(),setTimeout((function(){l("")}),3e3),r(c)):(u(),setTimeout((function(){l("")}),3e3),r(j))},children:[Object(V.jsxs)(v.a.Group,{children:[Object(V.jsx)(v.a.Label,{children:"Select node to delete"}),Object(V.jsx)(v.a.Control,{as:"select",value:c,onChange:function(e){l(e.target.value)},children:d})]}),Object(V.jsx)(y.a,{variant:"secondary",onClick:u,children:"Close"})," "," ",Object(V.jsx)(y.a,{type:"submit",variant:"danger",children:"Delete neuron"})]})})]})},ge=n(193),xe=(n(155),function(e){return Object(V.jsx)("td",{children:e})}),me=function(e,t){return Object(V.jsx)("tr",{children:e},"time-"+t)},ve=function(e){var t=e.time,n=e.showChoiceHistoryModal,r=e.handleCloseHoiceHistoryModal,a=JSON.parse(localStorage.getItem(t-1+"sec")),o=Object(V.jsx)("td",{children:"There are no neurons"});a&&(o=Object.keys(a).map((function(e){return Object(V.jsx)("th",{children:e},e)})));for(var i=[],s=0;s<t;s++){var c=[];c.push(xe(s));var l=JSON.parse(localStorage.getItem(s+"sec"));for(var u in l)l[u].chosenRule?c.push(xe(l[u].chosenRule)):c.push(xe("No chosen rule"));i.push(me(c,s)),c=[]}return Object(V.jsx)(ce.a,{show:n,onHide:r,className:"custom-choice-history-modal",children:Object(V.jsxs)(ge.a,{striped:!0,bordered:!0,hover:!0,"data-testid":"choice-history-table",children:[Object(V.jsx)("thead",{children:Object(V.jsxs)("tr",{children:[Object(V.jsx)("th",{children:"Time"}),o]})}),Object(V.jsx)("tbody",{children:i})]})})},ye=n(88),we=n.n(ye),ke=n(85),Se=n(11),Ne=n(106),Ce=function(){var e=Object(a.useState)(!1),t=Object(b.a)(e,2),n=t[0],r=t[1],o="Are you sure you want to exit without saving your system?";return Object(a.useEffect)((function(){return window.onbeforeunload=n&&function(){return o},function(){window.onbeforeunload=null}}),[n]),[Object(V.jsx)(Se.a,{when:n,message:o}),function(){return r(!0)},function(){return r(!1)}]},Ee={compact:!0,ignoreComment:!0,spaces:4,sanitize:!1};function Ie(e,t){var n=Object(a.useRef)(!1),r=Object(a.useRef)(t),o=document.getElementsByTagName("input");Object(a.useEffect)((function(){var e,t=Object(f.a)(o);try{for(t.s();!(e=t.n()).done;){var r=e.value;r.addEventListener("focusin",(function(){n.current=!0,console.log("fOCUS ON ME")})),r.addEventListener("input",(function(){n.current=!0,console.log("fOCUS ON ME 2")})),r.addEventListener("focus",(function(){n.current=!0,console.log("fOCUS ON ME 3")}),!0),r.addEventListener("focusout",(function(){n.current=!1}))}}catch(a){t.e(a)}finally{t.f()}})),Object(a.useEffect)((function(){r.current=t})),Object(a.useEffect)((function(){function t(t){console.log("isFocus ".concat(n.current)),t.code===e&&0==n.current&&(console.log("handleKeyDown isFocus: ".concat(n.current)),console.log("Key pressed: "+t.code),r.current(t))}return document.addEventListener("keydown",(function(e){"Space"===e.code&&0==n&&e.preventDefault()})),document.addEventListener("keydown",function(e,t){var n;return function(){for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];n&&clearTimeout(n),n=setTimeout((function(){t.apply(void 0,a),n=null}),e)}}(300,t)),function(){return document.removeEventListener("keydown",t)}}),[e])}var Me=Object(A.c)(oe||(oe=Object(c.a)(["\n  from {\n    transform: scaleX(100%);\n  }\n\n  to {\n    transform: scaleX(0%);\n  }\n"]))),Re=A.b.div(ie||(ie=Object(c.a)(["\n  ","\n  background-color: #c44569;\n  height: 4px;\n  transform-origin: left center;\n  margin-bottom: 2px;\n"])),(function(e){return e.isPlaying&&Object(A.a)(se||(se=Object(c.a)(["\n      animation: "," 3s linear; \n    "])),Me)})),Te=function(){var e=Object(O.a)(null!=window.localStorage.getItem("originalNeurons")?JSON.parse(window.localStorage.getItem("originalNeurons")):{n1:{id:"n1",position:{x:50,y:50},rules:"a+/a->a;2",startingSpikes:1,delay:0,spikes:1,isOutput:!1,out:["n2"]},n2:{id:"n2",position:{x:200,y:50},rules:"a/a->a;1",startingSpikes:0,delay:0,spikes:0,isOutput:!1,out:["n3"]},n3:{id:"n3",position:{x:400,y:50},rules:"a/a->a;0",startingSpikes:1,delay:0,spikes:1,isOutput:!1,out:["n4"]},n4:{id:"n4",position:{x:400,y:200},isOutput:!0,spikes:0,bitstring:" "}}),t=Object(b.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(0),i=Object(b.a)(o,2),s=i[0],c=i[1],d=Object(a.useState)(!0),f=Object(b.a)(d,2),A=f[0],H=f[1],F=Object(a.useState)(""),B=Object(b.a)(F,2),P=B[0],G=B[1],z=Ce(),q=Object(b.a)(z,3),K=q[0],U=q[1],W=q[2],X=Object(a.useState)(!1),Q=Object(b.a)(X,2),Z=Q[0],$=Q[1],ee=Object(a.useState)(!1),ne=Object(b.a)(ee,2),oe=ne[0],ie=ne[1],se=Object(a.useState)(!1),ce=Object(b.a)(se,2),ue=ce[0],de=ce[1],he=Object(a.useState)(!1),be=Object(b.a)(he,2),ge=be[0],xe=be[1],me=Object(a.useState)(!1),ye=Object(b.a)(me,2),Me=ye[0],Te=ye[1],De=Object(a.useState)(!1),Je=Object(b.a)(De,2),_e=Je[0],Le=Je[1],Ae=Object(a.useState)(!1),He=Object(b.a)(Ae,2),Fe=He[0],Be=He[1],Pe=Object(a.useState)(!1),Ge=Object(b.a)(Pe,2),ze=Ge[0],qe=Ge[1],Ke=Object(a.useState)(""),Ue=Object(b.a)(Ke,2),We=Ue[0],Xe=Ue[1],Qe=Object(a.useState)(0),Ve=Object(b.a)(Qe,2),Ye=Ve[0],Ze=Ve[1],$e=function(){return de(!1)},et=function(){qe(!0),Be(!1),console.log("alert from simulationEnd"),alert("Simulation has ended.")},tt=function(e){Xe(e),setTimeout((function(){Xe("")}),3e3)},nt=function(){var e=Object(h.a)(j.a.mark((function e(t,n){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("newEdge",t,n),e.next=3,r((function(e){var r=Object(u.a)(e[t].out);r.push(n),e[t].out=r}));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),rt=function(){var e=Object(h.a)(j.a.mark((function e(t,n){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r((function(e){e[n].position=t})),U(!0);case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();function at(){return(at=Object(h.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r((function(e){e[t.id]=t}));case 2:U(!0),window.localStorage.setItem("originalNeurons",JSON.stringify(JSON.parse(JSON.stringify(n))));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ot(){return(ot=Object(h.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r((function(e){e[t.id]=t}));case 2:U(!0),window.localStorage.setItem("originalNeurons",JSON.stringify(JSON.parse(JSON.stringify(n))));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function it(){return(it=Object(h.a)(j.a.mark((function e(t,a,o){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r((function(e){e[t].startingSpikes=o,e[t].spikes=o,e[t].rules=a}));case 2:U(!0),window.localStorage.setItem("originalNeurons",JSON.stringify(JSON.parse(JSON.stringify(n))));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function st(){return(st=Object(h.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("handleDeleteNode",t),e.next=3,r((function(e){for(var n in e){var r=e[n];if(!r.isOutput){r.out;var a=r.out.filter((function(e){return e!==t}));e[n].out=a}}delete e[t]}));case 3:U(!0),window.localStorage.setItem("originalNeurons",JSON.stringify(JSON.parse(JSON.stringify(n))));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ct=function(){r((function(e){return JSON.parse(window.localStorage.getItem("originalNeurons"))})),c(0),Be(!1),qe(!1);var e=window.localStorage.getItem("originalNeurons");window.localStorage.clear(),window.localStorage.setItem("originalNeurons",e)},lt=Object(a.useState)({}),ut=Object(b.a)(lt,2),dt=ut[0],jt=ut[1],ht=function(){var e=Object(h.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,jt(t);case 2:console.log(t),de(!0),de&&Be(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),bt=function(){var e=Object(h.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0==s&&(console.log("Time is: "+s),window.localStorage.setItem("originalNeurons",JSON.stringify(JSON.parse(JSON.stringify(n)))),console.log("Original neurons on time = 1 ",window.localStorage.getItem("originalNeurons"))),ze){e.next=7;break}return e.next=4,r((function(e){return re(e,s,A,ht,et)}));case 4:c((function(e){return e+1})),e.next=8;break;case 7:alert("Simulation has ended.");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ft=function(){var e=Object(h.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(s>1)){e.next=9;break}return t=s.valueOf(),qe(!1),e.next=5,r((function(e){return ae(t-2)}));case 5:return e.next=7,c((function(e){return e-1}));case 7:e.next=10;break;case 9:1==s&&ct();case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useRef)(n).current=n;var pt=Object(a.useRef)(bt);return pt.current=function(){bt(),Ze((function(e){return e+1}))},Object(a.useEffect)((function(){if(Fe)var e=setInterval((function(){pt.current()}),3e3);return function(){return clearInterval(e)}}),[Fe,pt]),Object(a.useEffect)((function(){ue&&console.log("showChooseRuleModal is true")}),[]),Ie("Space",(function(){console.log("Space Pressed"),Be((function(e){return!e}))})),Ie("ArrowLeft",(function(){console.log("Left Key Pressed"),ft()})),Ie("ArrowRight",(function(){console.log("Right Key Pressed"),ze||pt.current()})),Object(V.jsx)(ke.a,{children:Object(V.jsx)(Se.d,{children:Object(V.jsx)(Se.b,{path:"/",children:Object(V.jsxs)(x.a,{children:[We&&Object(V.jsx)(m.a,{variant:"danger",children:We}),Object(V.jsxs)(p.slide,{children:[Object(V.jsx)(v.a,{children:Object(V.jsx)(v.a.File,{id:"custom-file",label:P||"Load file...",custom:!0,onChange:function(e){!function(t){var n=t.files[0];if(qe(!1),n.type&&-1===n.type.indexOf("text/xml"))tt("File is not a xml file");else{var a=new FileReader,o=function(){var t=Object(h.a)(j.a.mark((function t(n,r){var a,o,s,c,l,u;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{r._parent,a=Object.keys(r._parent),o=a.length,s=a[o-1],(c=r._parent[s]).length>0?(l=c,u=c.length-1,l[u]=n):"out"==s?r._parent[s]=[n]:"bitstring"==s?(console.log("bitstring"),r._parent[s]=""):r._parent[s]=i(n)}catch(e){}case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();a.addEventListener("load",function(){var e=Object(h.a)(j.a.mark((function e(t){var a,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={compact:!0,trim:!0,ignoreDeclaration:!0,ignoreInstruction:!0,ignoreAttributes:!0,ignoreComment:!0,ignoreCdata:!0,ignoreDoctype:!0,textFn:o},e.next=3,we.a.xml2js(t.target.result,a);case 3:return i=e.sent,console.log(i.content),e.next=7,r((function(e){return i.content}));case 7:return e.next=9,r((function(e){for(var t in e)e[t].bitstring&&(console.log(e[t].bitstring),e[t].bitstring=" "),e[t].out&&console.log(t,typeof e[t].out,e[t].out)}));case 9:window.localStorage.setItem("originalNeurons",JSON.stringify(i.content)),G(n.name);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a.readAsText(n),c(0)}function i(e){var t=Number(e);if(!isNaN(t))return t;var n=e.toLowerCase();return"true"===n||"false"!==n&&e}}(e.target)}})}),Object(V.jsx)("div",{children:Object(V.jsxs)(y.a,{variant:"primary",disabled:s>0,onClick:function(){var e={content:n},t=we.a.json2xml(e,Ee),r=new Blob([t],{type:"text/xml;charset=utf-8"});Object(Ne.saveAs)(r,Date().toString()+"-Neurons.xmp"),W()},children:[Object(V.jsx)(E.a,{})," ","Save"]})}),Object(V.jsx)("div",{children:Object(V.jsxs)(y.a,{variant:"primary",onClick:function(){return Te(!0)},children:[Object(V.jsx)(I.a,{})," ","Choice History"]})}),Object(V.jsx)("div",{children:Object(V.jsxs)(w.a,{id:"file-dropdown",title:"Download samples",children:[Object(V.jsx)(k.a.Item,{href:"./samples/3k+3 spiker.xmp",download:!0,children:"3k+3 Spiker"}),Object(V.jsx)(k.a.Item,{href:"./samples/bitadder.xmp",download:!0,children:"Bitadder"}),Object(V.jsx)(k.a.Item,{href:"./samples/increasing comparator.xmp",download:!0,children:"Increasing Comparator"}),Object(V.jsx)(k.a.Item,{href:"./samples/naturally even.xmp",download:!0,children:"Naturally Even"}),Object(V.jsx)(k.a.Item,{href:"./samples/naturally greater one.xmp",download:!0,children:"Naturally Greater One"})]})})]}),Object(V.jsxs)("div",{children:[Object(V.jsx)("div",{style:{textAlign:"center"},children:Object(V.jsx)("h1",{style:{fontWeight:"700"},className:"text-primary",children:"WebSnapse"})}),Object(V.jsxs)(S.a,{children:[Object(V.jsx)(N.a,{children:Object(V.jsxs)("div",{children:[Object(V.jsx)(v.a,{children:Object(V.jsx)(v.a.Group,{id:"formGridCheckbox",children:Object(V.jsxs)(S.a,{children:[Object(V.jsx)(N.a,{sm:6,children:Object(V.jsx)(v.a.Check,{type:"checkbox",label:"Pseudorandom",defaultChecked:A,onChange:function(){H(!A)}})}),Object(V.jsx)(N.a,{sm:1,style:{textAlign:"left"},children:Object(V.jsx)(C.a,{placement:"right",delay:{show:250,hide:400},overlay:function(e){return Object(V.jsx)(g.a,Object(l.a)(Object(l.a)({id:"button-tooltip"},e),{},{children:"Pseudorandom will allow the system to decide which rule will be executed. Unchecking it will let you decide."}))},children:Object(V.jsx)(M.a,{})})})]})})}),0==s?Object(V.jsx)("div",{}):Object(V.jsxs)("div",{style:{backgroundColor:"#778beb",color:"white",borderRadius:"10px",padding:"0.5em"},children:[Object(V.jsx)(R.a,{color:"white",size:30})," ",Object(V.jsx)("strong",{children:"Time:"})," ",0==s?"Start playing!":s]})]})}),Object(V.jsxs)(N.a,{children:[Object(V.jsxs)("div",{className:"snapse-controls",style:{textAlign:"center",marginBottom:"0.8em"},children:[Object(V.jsx)(y.a,{variant:"link",onClick:ft,children:Object(V.jsx)(T.a,{})})," ",Object(V.jsxs)("div",{style:{display:"inline-block"},children:[Object(V.jsx)(Re,{isPlaying:Fe},Ye),Object(V.jsx)(y.a,{size:"lg",className:"snapse-controls-play",onClick:function(){ze?alert("Simulation has ended."):(console.log("isPlaying before ".concat(Fe)),Be((function(e){return!e})),console.log("isPlaying after ".concat(Fe)))},children:Fe?Object(V.jsx)(D.a,{}):Object(V.jsx)(J.a,{})})]})," "," ",Object(V.jsx)(y.a,{variant:"link",onClick:function(){return bt()},children:Object(V.jsx)(_.a,{})})," "]}),Object(V.jsx)("div",{style:{textAlign:"center"},children:Object(V.jsxs)(k.a,{children:[Object(V.jsxs)(k.a.Toggle,{id:"dropdown-basic",children:[Object(V.jsx)(L.a,{})," ","Node Actions"]}),Object(V.jsxs)(k.a.Menu,{children:[Object(V.jsx)(k.a.Item,{children:Object(V.jsx)(y.a,{variant:"link",size:"sm",className:"node-actions text-primary",onClick:function(){return $(!0)},disabled:s>0,children:"New Node"})}),Object(V.jsx)(k.a.Item,{children:Object(V.jsx)(y.a,{variant:"link",size:"sm",className:"node-actions text-primary",onClick:function(){return ie(!0)},disabled:s>0,children:"New Output Node"})}),Object(V.jsx)(k.a.Item,{children:Object(V.jsx)(y.a,{variant:"link",size:"sm",className:"node-actions text-info",onClick:function(){return xe(!0)},disabled:s>0,children:"Edit"})}),Object(V.jsx)(k.a.Item,{children:Object(V.jsx)(y.a,{variant:"link",size:"sm",className:"node-actions text-danger",onClick:function(){return Le(!0)},disabled:s>0,children:"Delete"})})]})]})})]}),Object(V.jsxs)(N.a,{style:{textAlign:"right"},children:[Object(V.jsx)(y.a,{variant:"danger",onClick:ct,children:"Restart"})," "]})]})]}),Object(V.jsx)("hr",{}),Object(V.jsx)(Y,{neurons:n,onEdgeCreate:function(e,t,n){nt(e.id(),t.id()),n.remove()},handleChangePosition:rt,headless:!1}),Object(V.jsx)(ve,{time:s,showChoiceHistoryModal:Me,handleCloseHoiceHistoryModal:function(){return Te(!1)}}),Object(V.jsx)(je,{showNewNodeModal:Z,handleCloseModal:function(){return $(!1)},handleNewNode:function(e){return at.apply(this,arguments)},handleError:tt}),Object(V.jsx)(fe,{showNewOutputModal:oe,handleCloseNewOutputModal:function(){return ie(!1)},handleNewOutput:function(e){return ot.apply(this,arguments)},handleError:tt}),Object(V.jsx)(pe,{showEditModal:ge,handleCloseEditModal:function(){return xe(!1)},handleEditNode:function(e,t,n){return it.apply(this,arguments)},handleError:tt,neurons:n}),Object(V.jsx)(Oe,{showDeleteModal:_e,handleCloseDeleteModal:function(){return Le(!1)},handleDeleteNode:function(e){return st.apply(this,arguments)},handleError:tt,neurons:n}),Object(V.jsx)(le,{showChooseRuleModal:ue,handleCloseChooseRuleModal:$e,rules:dt,handleChosenRules:function(e){$e(),r((function(t){for(var n in t)for(var r in e)if(n==r){var a=te(e[r]),o=Object(b.a)(a,6),i=(o[0],o[1],o[2],o[3],o[4],o[5]);t[n].delay=i,t[n].currentRule=e[r],t[n].chosenRule=e[r]}})),Be(!0)}}),K]})})})})},De=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,211)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),o(e),i(e)}))},Je=n(110),_e=n.n(Je),Le=n(111),Ae=n.n(Le);z.a.use(_e.a),z.a.use(Ae.a),s.a.render(Object(V.jsx)(o.a.StrictMode,{children:Object(V.jsx)(Te,{})}),document.getElementById("root")),De()}},[[187,1,2]]]);
//# sourceMappingURL=main.e3125bae.chunk.js.map