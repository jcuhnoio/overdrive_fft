class t{constructor(){this.listeners={},this.on=this.addEventListener,this.un=this.removeEventListener}addEventListener(t,e,i){if(this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),null==i?void 0:i.once){const i=()=>{this.removeEventListener(t,i),this.removeEventListener(t,e)};return this.addEventListener(t,i),i}return()=>this.removeEventListener(t,e)}removeEventListener(t,e){var i;null===(i=this.listeners[t])||void 0===i||i.delete(e)}once(t,e){return this.on(t,e,{once:!0})}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t}onInit(){}init(t){this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()))}}function i(t,e,i,o,n=3,s=0){if(!t)return()=>{};let r=()=>{};const l=l=>{if(l.button!==s)return;l.preventDefault(),l.stopPropagation();let h=l.clientX,a=l.clientY,u=!1;const d=o=>{o.preventDefault(),o.stopPropagation();const s=o.clientX,r=o.clientY,l=s-h,d=r-a;if(h=s,a=r,u||Math.abs(l)>n||Math.abs(d)>n){const o=t.getBoundingClientRect(),{left:n,top:c}=o;u||(null==i||i(h-n,a-c),u=!0),e(l,d,s-n,r-c)}},c=()=>{u&&(null==o||o()),r()},p=t=>{u&&(t.stopPropagation(),t.preventDefault())},v=t=>{u&&t.preventDefault()};document.addEventListener("pointermove",d),document.addEventListener("pointerup",c),document.addEventListener("pointerout",c),document.addEventListener("pointercancel",c),document.addEventListener("touchmove",v,{passive:!1}),document.addEventListener("click",p,{capture:!0}),r=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",c),document.removeEventListener("pointerout",c),document.removeEventListener("pointercancel",c),document.removeEventListener("touchmove",v),setTimeout((()=>{document.removeEventListener("click",p,{capture:!0})}),10)}};return t.addEventListener("pointerdown",l),()=>{r(),t.removeEventListener("pointerdown",l)}}const o={points:[],lineWidth:4,lineColor:"rgba(0, 0, 255, 0.5)",dragPointSize:10,dragPointFill:"rgba(255, 255, 255, 0.8)",dragPointStroke:"rgba(255, 255, 255, 0.8)"};class n extends t{constructor(t,e){super(),this.options=t,this.polyPoints=new Map;const o=e.clientWidth,n=e.clientHeight,s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.setAttribute("viewBox",`0 0 ${o} ${n}`),s.setAttribute("preserveAspectRatio","none"),s.setAttribute("style","position: absolute; left: 0; top: 0; z-index: 4;"),s.setAttribute("part","envelope"),this.svg=s;const r=document.createElementNS("http://www.w3.org/2000/svg","polyline");r.setAttribute("points",`0,${n} ${o},${n}`),r.setAttribute("stroke",t.lineColor),r.setAttribute("stroke-width",t.lineWidth),r.setAttribute("fill","none"),r.setAttribute("part","polyline"),r.setAttribute("style",t.dragLine?"cursor: row-resize; pointer-events: stroke;":""),s.appendChild(r),e.appendChild(s),t.dragLine&&i(r,((t,e)=>{const{height:i}=s.viewBox.baseVal,{points:o}=r;for(let t=1;t<o.numberOfItems-1;t++){const n=o.getItem(t);n.y=Math.min(i,Math.max(0,n.y+e))}const n=s.querySelectorAll("ellipse");Array.from(n).forEach((t=>{const o=Math.min(i,Math.max(0,Number(t.getAttribute("cy"))+e));t.setAttribute("cy",o.toString())})),this.emit("line-move",e/i)})),s.addEventListener("dblclick",(t=>{const e=s.getBoundingClientRect(),i=t.clientX-e.left,o=t.clientY-e.top;this.emit("point-create",i/e.width,o/e.height)}));{let t;const e=()=>clearTimeout(t);s.addEventListener("touchstart",(i=>{1===i.touches.length?t=window.setTimeout((()=>{i.preventDefault();const t=s.getBoundingClientRect(),e=i.touches[0].clientX-t.left,o=i.touches[0].clientY-t.top;this.emit("point-create",e/t.width,o/t.height)}),500):e()})),s.addEventListener("touchmove",e),s.addEventListener("touchend",e)}}makeDraggable(t,e){i(t,e,(()=>t.style.cursor="grabbing"),(()=>t.style.cursor="grab"),1)}createCircle(t,e){const i=document.createElementNS("http://www.w3.org/2000/svg","ellipse"),o=this.options.dragPointSize/2;return i.setAttribute("rx",o.toString()),i.setAttribute("ry",o.toString()),i.setAttribute("fill",this.options.dragPointFill),this.options.dragPointStroke&&(i.setAttribute("stroke",this.options.dragPointStroke),i.setAttribute("stroke-width","2")),i.setAttribute("style","cursor: grab; pointer-events: all;"),i.setAttribute("part","envelope-circle"),i.setAttribute("cx",t.toString()),i.setAttribute("cy",e.toString()),this.svg.appendChild(i),i}removePolyPoint(t){const e=this.polyPoints.get(t);if(!e)return;const{polyPoint:i,circle:o}=e,{points:n}=this.svg.querySelector("polyline"),s=Array.from(n).findIndex((t=>t.x===i.x&&t.y===i.y));n.removeItem(s),o.remove(),this.polyPoints.delete(t)}addPolyPoint(t,e,i){const{svg:o}=this,{width:n,height:s}=o.viewBox.baseVal,r=t*n,l=s-e*s,h=this.options.dragPointSize/2,a=o.createSVGPoint();a.x=t*n,a.y=s-e*s;const u=this.createCircle(r,l),{points:d}=o.querySelector("polyline"),c=Array.from(d).findIndex((t=>t.x>=r));d.insertItemBefore(a,Math.max(c,1)),this.polyPoints.set(i,{polyPoint:a,circle:u}),this.makeDraggable(u,((t,e)=>{const o=a.x+t,r=a.y+e;if(o<-h||r<-h||o>n+h||r>s+h)return void this.emit("point-dragout",i);const l=Array.from(d).find((t=>t.x>a.x)),c=Array.from(d).findLast((t=>t.x<a.x));l&&o>=l.x||c&&o<=c.x||(a.x=o,a.y=r,u.setAttribute("cx",o.toString()),u.setAttribute("cy",r.toString()),this.emit("point-move",i,o/n,r/s))}))}update(){const{svg:t}=this,e=t.viewBox.baseVal.width/t.clientWidth,i=t.viewBox.baseVal.height/t.clientHeight;t.querySelectorAll("ellipse").forEach((t=>{const o=this.options.dragPointSize/2,n=o*e,s=o*i;t.setAttribute("rx",n.toString()),t.setAttribute("ry",s.toString())}))}destroy(){this.polyPoints.clear(),this.svg.remove()}}class s extends e{constructor(t){super(t),this.polyline=null,this.throttleTimeout=null,this.volume=1,this.points=t.points||[],this.options=Object.assign({},o,t),this.options.lineColor=this.options.lineColor||o.lineColor,this.options.dragPointFill=this.options.dragPointFill||o.dragPointFill,this.options.dragPointStroke=this.options.dragPointStroke||o.dragPointStroke,this.options.dragPointSize=this.options.dragPointSize||o.dragPointSize}static create(t){return new s(t)}addPoint(t){var e;t.id||(t.id=Math.random().toString(36).slice(2));const i=this.points.findLastIndex((e=>e.time<t.time));this.points.splice(i+1,0,t),this.emitPoints();const o=null===(e=this.wavesurfer)||void 0===e?void 0:e.getDuration();o&&this.addPolyPoint(t,o)}removePoint(t){var e;const i=this.points.indexOf(t);i>-1&&(this.points.splice(i,1),null===(e=this.polyline)||void 0===e||e.removePolyPoint(t),this.emitPoints())}getPoints(){return this.points}setPoints(t){this.points.slice().forEach((t=>this.removePoint(t))),t.forEach((t=>this.addPoint(t)))}destroy(){var t;null===(t=this.polyline)||void 0===t||t.destroy(),super.destroy()}getCurrentVolume(){return this.volume}setVolume(t){var e;this.volume=t,null===(e=this.wavesurfer)||void 0===e||e.setVolume(t)}onInit(){var t;if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");const{options:e}=this;e.volume=null!==(t=e.volume)&&void 0!==t?t:this.wavesurfer.getVolume(),this.setVolume(e.volume),this.subscriptions.push(this.wavesurfer.on("decode",(t=>{this.initPolyline(),this.points.forEach((e=>{this.addPolyPoint(e,t)}))})),this.wavesurfer.on("redraw",(()=>{var t;null===(t=this.polyline)||void 0===t||t.update()})),this.wavesurfer.on("timeupdate",(t=>{this.onTimeUpdate(t)})))}emitPoints(){this.throttleTimeout&&clearTimeout(this.throttleTimeout),this.throttleTimeout=setTimeout((()=>{this.emit("points-change",this.points)}),200)}initPolyline(){if(this.polyline&&this.polyline.destroy(),!this.wavesurfer)return;const t=this.wavesurfer.getWrapper();this.polyline=new n(this.options,t),this.subscriptions.push(this.polyline.on("point-move",((t,e,i)=>{var o;const n=(null===(o=this.wavesurfer)||void 0===o?void 0:o.getDuration())||0;t.time=e*n,t.volume=1-i,this.emitPoints()})),this.polyline.on("point-dragout",(t=>{this.removePoint(t)})),this.polyline.on("point-create",((t,e)=>{var i;this.addPoint({time:t*((null===(i=this.wavesurfer)||void 0===i?void 0:i.getDuration())||0),volume:1-e})})),this.polyline.on("line-move",(t=>{var e;this.points.forEach((e=>{e.volume=Math.min(1,Math.max(0,e.volume-t))})),this.emitPoints(),this.onTimeUpdate((null===(e=this.wavesurfer)||void 0===e?void 0:e.getCurrentTime())||0)})))}addPolyPoint(t,e){var i;null===(i=this.polyline)||void 0===i||i.addPolyPoint(t.time/e,t.volume,t)}onTimeUpdate(t){if(!this.wavesurfer)return;let e=this.points.find((e=>e.time>t));e||(e={time:this.wavesurfer.getDuration()||0,volume:0});let i=this.points.findLast((e=>e.time<=t));i||(i={time:0,volume:0});const o=e.time-i.time,n=e.volume-i.volume,s=i.volume+(t-i.time)*(n/o),r=Math.min(1,Math.max(0,s)),l=Math.round(100*r)/100;l!==this.getCurrentVolume()&&(this.setVolume(l),this.emit("volume-change",l))}}export{s as default};
