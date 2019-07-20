
/**
 * The code below uses open source software. Please visit the URL below for an overview of the licenses:
 * http://js.api.here.com/v3/3.1.0.2/HERE_NOTICE
 */

H.util.eval("function Op(a){var b=a.ownerDocument;b=b.documentElement||b.body.parentNode||b.body;try{var c=a.getBoundingClientRect()}catch(d){c={top:0,right:0,bottom:0,left:0,height:0,width:0}}return{x:c.left+(\"number\"===typeof window.pageXOffset?window.pageXOffset:b.scrollLeft),y:c.top+(\"number\"===typeof window.pageYOffset?window.pageYOffset:b.scrollTop)}}var Pp=/Edge\\/\\d+/.test(navigator.appVersion),Qp=Function(\"return this\")();function Rp(a,b,c,d,e,f,g){Rp.l.constructor.call(this,a);this.pointers=b;this.changedPointers=c;this.targetPointers=d;this.currentPointer=e;this.originalEvent=g;this.target=f}u(Rp,Fc);r(\"H.mapevents.Event\",Rp);function Sp(a,b,c,d,e,f){if(isNaN(a))throw Error(\"x needs to be a number\");if(isNaN(b))throw Error(\"y needs to be a number\");if(isNaN(c))throw Error(\"pointer must have an id\");this.viewportX=a;this.viewportY=b;this.target=null;this.id=c;this.type=d;this.dragTarget=null;this.a=this.button=Nb(e)?e:-1;this.buttons=Nb(f)?f:0}r(\"H.mapevents.Pointer\",Sp);\nfunction Tp(a,b,c){if(isNaN(b))throw Error(\"x needs to be a number\");if(isNaN(c))throw Error(\"y needs to be a number\");a.viewportX=b;a.viewportY=c}Sp.prototype.Cm=function(){return this.a};Sp.prototype.getLastChangedButton=Sp.prototype.Cm;function Up(a,b){a.a=b;a.buttons|=Sp.prototype.b[+b]||0}function Vp(a,b){a.a=b;a.buttons&=~(Sp.prototype.b[+b]||0)}Sp.prototype.b=[1,4,2];var Wp={NONE:-1,LEFT:0,MIDDLE:1,RIGHT:2};Sp.Button=Wp;function Xp(a){this.a=a instanceof Array?a.slice(0):[]}n=Xp.prototype;n.clear=function(){this.a.splice(0,this.a.length)};n.length=function(){return this.a.length};n.indexOf=function(a){for(var b=this.a.length;b--;)if(this.a[b].id===a)return b;return-1};function Yp(a,b){b=a.indexOf(b);return-1!==b?a.a[b]:null}n.remove=function(a){a=this.indexOf(a);return-1!==a?this.a.splice(a,1)[0]:null};function Zp(a,b){for(var c=a.a.length,d=[];c--;)a.a[c].type!==b&&d.push(a.a[c]);a.a=d}\nfunction $p(a,b){for(var c=a.a.length;c--;)if(a.a[c].dragTarget===b)return!0;return!1}n.push=function(a){if(a instanceof Sp)return this.a.push(a);throw Error(\"list needs a pointer\");};n.Xa=function(){return this.a};n.clone=function(){return new Xp(this.a)};function aq(a,b,c){c=c||{};if(!(a instanceof Q))throw Error(\"events: map instance required\");if(!(b instanceof Array))throw Error(\"events: map array required\");Bc.call(this);this.Yg=c.Yg||300;this.oj=c.oj||50;this.kl=c.kl||50;this.ll=c.ll||500;this.Lh=c.Lh||900;this.bk=c.bk||50;this.map=a;this.o=this.map.za;this.j=this.o.element;this.D=b;this.a=new Xp;this.b=new Xp;this.g={};this.c=null;this.v=!0;this.Y={};this.m={};this.i=null;this.xe=z(this.xe,this);this.A={pointerdown:this.Ul,pointermove:this.Vl,\npointerup:this.Wl,pointercancel:this.Tl};bq(this)}u(aq,Bc);function bq(a,b){var c,d=a.D.length;for(c=0;c<d;c++){var e=a.D[c];var f=e.listener;\"function\"===typeof f&&(b?(e.target||a.j).removeEventListener(e.Pa,f):(e.target||a.j).addEventListener(e.Pa,f))}}function cq(a,b,c){var d;if(\"function\"===typeof a.A[b]){\"pointermove\"!==b&&(a.v=!0);var e=0;for(d=a.b.length();e<d;e++){var f=a.b.a[e];a.j.contains(c.target)?dq(a,f,a.uj.bind(a,c,b,f)):a.uj(c,b,f,null)}}a.b.clear()}n=aq.prototype;\nn.uj=function(a,b,c,d){eq(c.id,this.Y);this.A[b].call(this,c,d,a)};function dq(a,b,c){if(a.c===b)c(b.target);else{var d=a.o;var e=b.viewportX;b=b.viewportY;if(0>e||0>b||e>=d.width||b>=d.height)c(x);else{var f=a.map;f.Qd(e,b,function(a){c(a||f)})}}}\nn.Wl=function(a,b,c){a.target=b;fq(this,a,c);gq(this,b,\"pointerup\",c,a);\"mouse\"!==a.type&&gq(this,b,\"pointerleave\",c,a);b=this.g[a.id];var d={x:a.viewportX,y:a.viewportY},e=c.timeStamp,f=a.target,g=this.i;b&&b.target===f&&b.Qg.Ya(d)<this.kl&&e-b.Oi<this.ll?(gq(this,f,\"tap\",c,a),g&&g.target===f&&e-g.Oi<this.Yg?g.Qg.Ya({x:a.viewportX,y:a.viewportY})<this.oj&&(gq(this,f,\"dbltap\",c,a),this.i=null):this.i={target:f,Qg:new F(a.viewportX,a.viewportY),Oi:c.timeStamp}):this.i=null;this.g={};eq(a.id,this.m)};\nfunction fq(a,b,c){b===a.c&&(gq(a,b.dragTarget,\"dragend\",c,b),a.c=null,eq(b.id,a.Y));b.dragTarget=null}n.xe=function(a,b){var c=this;gq(this,a.dragTarget,\"drag\",b,a);eq(a.id,this.Y);this.Y[a.id]=setTimeout(function(){c.xe(a,b)},150)};function eq(a,b){b[a]&&(clearTimeout(b[a]),delete b[a])}\nfunction hq(a,b,c){var d=b.target,e=new F(b.viewportX,b.viewportY),f=b.id;eq(f,a.m);a.m[f]=setTimeout(function(){d&&d===b.target&&e.Ya({x:b.viewportX,y:b.viewportY})<a.bk&&(gq(a,d,\"longpress\",c,b),delete a.g[b.id])},a.Lh)}\nn.Vl=function(a,b,c){var d=a.dragTarget,e=a.id;var f=a.target;a.target=b;f!==b&&(gq(this,f,\"pointerleave\",c,a),gq(this,b,\"pointerenter\",c,a));d?this.c?this.xe(a,c):this.v?this.v=!1:(this.c=a,gq(this,d,\"dragstart\",c,a),this.xe(a,c),delete this.g[e],this.v=!0):(!this.c||this.c&&this.c.dragTarget!==b&&this.c.dragTarget!==this.map)&&gq(this,b,\"pointermove\",c,a)};\nn.Ul=function(a,b,c){var d=!(/^(?:mouse|pen)$/.test(a.type)&&0!==c.button);if(b){a.target=b;this.g[a.id]={Qg:new F(a.viewportX,a.viewportY),target:a.target,Oi:c.timeStamp};\"mouse\"!==a.type&&gq(this,b,\"pointerenter\",c,a);var e=gq(this,b,\"pointerdown\",c,a);!this.c&&d&&(b.draggable&&!$p(this.a,b)?a.dragTarget=b:!this.map.draggable||e.defaultPrevented||$p(this.a,this.map)||(a.dragTarget=this.map));hq(this,a,c)}};\nn.Tl=function(a,b,c){a.target=null;b?(gq(this,b,\"pointerleave\",c,a),gq(this,b,\"pointercancel\",c,a)):gq(this,this.map,\"pointercancel\",c,a);fq(this,a,c);this.g={};eq(a.id,this.m)};function gq(a,b,c,d,e){if(b&&\"function\"===typeof b.dispatchEvent){var f=Rp;var g=a.a.Xa(),h=a.b.Xa();a=a.a;var k,l=a.a.length,m=[];for(k=0;k<l;k++)a.a[k].target===b&&m.push(a.a[k]);f=new f(c,g,h,m,e,b,d);e.button=/^(?:longpress|(?:dbl)?tap|pointer(?:down|up))$/.test(c)?e.a:Wp.NONE;b.dispatchEvent(f)}return f}\nn.s=function(){bq(this,!0);this.a.clear();this.b.clear();var a=this.Y,b;for(b in a)eq(b,a);a=this.m;for(var c in a)eq(c,a);this.c=this.g=this.i=this.map=this.b=this.a=this.D=this.O=null;Bc.prototype.s.call(this)};function iq(a){this.f=z(this.f,this);aq.call(this,a,[{Pa:\"touchstart\",listener:this.f},{Pa:\"touchmove\",listener:this.f},{Pa:\"touchend\",listener:this.f},{Pa:\"touchcancel\",listener:this.f}]);this.I={touchstart:\"pointerdown\",touchmove:\"pointermove\",touchend:\"pointerup\",touchcancel:\"pointercancel\"};this.u=(a=(a=a.j)?a.J():null)?Array.prototype.slice.call(a.querySelectorAll(\"a\"),0):[]}u(iq,aq);\niq.prototype.f=function(a){var b=a.touches,c=this.a.length(),d;if(\"touchstart\"===a.type&&c>=b.length){c=this.a.clone();for(d=b.length;d--;)c.remove(b[d].identifier);for(d=c.length();d--;)this.a.remove(c.a[d].id);this.b=c;cq(this,\"pointercancel\",a);this.b.clear()}if(this.I[a.type]){b=Op(this.o.element);c=a.type;d=a.changedTouches;var e=d.length,f;this.b.clear();for(f=0;f<e;f++){var g=d[f];var h=Yp(this.a,g.identifier);var k=g.pageX-b.x;var l=g.pageY-b.y;if(h)if(\"touchmove\"===c){g=Math.abs(h.viewportX-\nk);var m=Math.abs(h.viewportY-l);if(1<g||1<m||1===g&&1===m)Tp(h,k,l),this.b.push(h)}else\"touchend\"===c&&(this.a.remove(h.id),this.b.push(h),Vp(h,Wp.LEFT));else h=new Sp(k,l,g.identifier,\"touch\",Wp.LEFT,1),this.a.push(h),this.b.push(h)}cq(this,this.I[a.type],a);-1===this.u.indexOf(a.target)&&a.preventDefault()}};iq.prototype.s=function(){this.u=null;aq.prototype.s.call(this)};function jq(a){var b=kq(this);(window.PointerEvent||window.MSPointerEvent)&&b.push({Pa:\"MSHoldVisual\",listener:\"prevent\"});aq.call(this,a,b)}u(jq,aq);function kq(a){var b=!!window.PointerEvent,c,d,e=[];a.f=z(a.f,a);\"MSPointerDown MSPointerMove MSPointerUp MSPointerCancel MSPointerOut MSPointerOver\".split(\" \").forEach(function(f){c=f.toLowerCase().replace(/ms/g,\"\");d=b?c:f;e.push({Pa:d,listener:a.f,target:\"MSPointerUp\"===f||\"MSPointerMove\"===f?window:null})});return e}var lq={2:\"touch\",3:\"pen\",4:\"mouse\"};\njq.prototype.f=function(a){var b=window.PointerEvent?a.type:a.type.toLowerCase().replace(/ms/g,\"\"),c=Op(this.j),d=Yp(this.a,a.pointerId),e=a.pageX-c.x;c=a.pageY-c.y;var f=lq[a.pointerType]||a.pointerType;Pp&&\"rtl\"===w.getComputedStyle(this.o.element).direction&&(e-=(w.devicePixelRatio-1)*this.o.width);if(!(d||b in{pointerup:1,pointerout:1,pointercancel:1}||\"touch\"===f&&\"pointerdown\"!==b)){d={x:e,y:c};var g=a.pointerType;\"number\"===typeof g&&(g=lq[g]);d=new Sp(d.x,d.y,a.pointerId,g,a.button,a.buttons);\nthis.a.push(d)}d&&(b in{pointerup:1,pointercancel:1}?(\"touch\"===f&&this.a.remove(d.id),Vp(d,a.button)):\"pointerdown\"===b&&(\"touch\"===a.pointerType&&(Zp(this.a,\"mouse\"),Zp(this.a,\"pen\")),Up(d,a.button)),this.b.push(d),\"pointermove\"!==b?(Tp(d,e,c),cq(this,\"pointerout\"===b||\"pointerover\"===b?\"pointermove\":b,a)):d.viewportX===e&&d.viewportY===c||a.target===document.documentElement||(Tp(d,e,c),cq(this,b,a)));this.b.clear()};function mq(a,b,c,d){mq.l.constructor.call(this,\"contextmenu\");this.items=[];this.viewportX=a;this.viewportY=b;this.target=c;this.originalEvent=d}u(mq,Fc);r(\"H.mapevents.ContextMenuEvent\",mq);function nq(a){this.xh=z(this.xh,this);this.zh=z(this.zh,this);this.yh=z(this.yh,this);this.u=!1;this.f=-1;this.I=0;nq.l.constructor.call(this,a,[{Pa:\"contextmenu\",listener:this.xh},{target:a,Pa:\"longpress\",listener:this.zh},{target:a,Pa:\"dbltap\",listener:this.yh}])}u(nq,aq);n=nq.prototype;n.zh=function(a){var b=a.currentPointer;\"touch\"===b.type&&1===a.pointers.length&&oq(this,b.viewportX,b.viewportY,a.originalEvent,a.target)};n.yh=function(a){\"touch\"===a.currentPointer.type&&(this.I=Date.now())};\nn.xh=function(a){var b=this;-1===this.f?this.f=setTimeout(function(){var c=Op(b.j),d=a.pageX-c.x;c=a.pageY-c.y;b.f=-1;oq(b,d,c,a)},this.Yg):(clearInterval(this.f),this.f=-1);a.preventDefault()};function oq(a,b,c,d,e){var f=a.map,g=Date.now()-a.I;e?!a.u&&g>a.Lh&&(a.u=!0,e.dispatchEvent(new mq(b,c,e,d)),re(f.J(),a.Wi,a.tj,!1,a)):f.Qd(b,c,a.Fn.bind(a,b,c,d))}n.Fn=function(a,b,c,d){d=d&&wa(d.dispatchEvent)?d:this.map;oq(this,a,b,c,d)};n.Wi=[\"mousedown\",\"touchstart\",\"pointerdown\",\"wheel\"];\nn.tj=function(){this.u&&(this.u=!1,this.map.dispatchEvent(new Fc(\"contextmenuclose\",this.map)))};n.s=function(){var a=this.map.J();clearInterval(this.f);a&&ye(a,this.Wi,this.tj,!1,this);aq.prototype.s.call(this)};function pq(a,b,c,d,e){pq.l.constructor.call(this,\"wheel\");this.delta=a;this.viewportX=b;this.viewportY=c;this.target=d;this.originalEvent=e}u(pq,Fc);r(\"H.mapevents.WheelEvent\",pq);function qq(a){var b=\"onwheel\"in document;this.K=b;this.I=(b?\"d\":\"wheelD\")+\"elta\";this.f=z(this.f,this);qq.l.constructor.call(this,a,[{Pa:(b?\"\":\"mouse\")+\"wheel\",listener:this.f}]);this.u=this.map.za}u(qq,aq);\nqq.prototype.f=function(a){if(!a.sl){var b=Op(this.j);var c=a.pageX-b.x;b=a.pageY-b.y;var d=this.I,e=a[d+(d+\"Y\"in a?\"Y\":\"\")],f;Pp&&\"rtl\"===w.getComputedStyle(this.u.element).direction&&(c-=(w.devicePixelRatio-1)*this.u.width);if(e){var g=Math.abs;var h=g(e);e=(!(f=a[d+\"X\"])||3<=h/g(f))&&(!(f=a[d+\"Z\"])||3<=h/g(f))?((0<e)-(0>e))*(this.K?1:-1):0}c=new pq(e,c,b,null,a);c.delta&&(a.stopImmediatePropagation(),a.preventDefault(),this.map.Qd(c.viewportX,c.viewportY,this.L.bind(this,c)))}};\nqq.prototype.L=function(a,b){var c=a.target=b||this.map,d,e;setTimeout(function(){c.dispatchEvent(a);a.f||(d=a.originalEvent,e=new w.WheelEvent(\"wheel\",d),e.sl=1,d.target.dispatchEvent(e))},0)};function rq(a){var b=window;this.f=z(this.f,this);aq.call(this,a,[{Pa:\"mousedown\",listener:this.f},{Pa:\"mousemove\",listener:this.f,target:b},{Pa:\"mouseup\",listener:this.f,target:b},{Pa:\"mouseover\",listener:this.f},{Pa:\"mouseout\",listener:this.f},{Pa:\"dragstart\",listener:this.u}])}u(rq,aq);\nrq.prototype.f=function(a){var b=a.type,c=Op(this.j);c={x:a.pageX-c.x,y:a.pageY-c.y};var d;(d=this.a.a[0])||(d=new Sp(c.x,c.y,1,\"mouse\"),this.a.push(d));this.b.push(d);Tp(d,c.x,c.y);/^mouse(?:move|over|out)$/.test(b)?cq(this,\"pointermove\",a):(/^mouse(down|up)$/.test(b)&&(c=a.which-1,\"up\"===Qp.RegExp.$1?Vp(d,c):Up(d,c)),cq(this,b.replace(\"mouse\",\"pointer\"),a));this.b.clear()};rq.prototype.u=function(a){a.preventDefault()};function sq(a){var b=a.za.element.style;if(-1!==tq.indexOf(a))throw Error(\"InvalidArgument: map is already in use\");this.a=a;tq.push(a);b.msTouchAction=b.touchAction=\"none\";window.PointerEvent||window.MSPointerEvent?this.c=new jq(this.a):(this.c=new iq(this.a),this.b=new rq(this.a));this.g=new qq(this.a);this.f=new nq(this.a);this.a.Jb(this.F,this);Bc.call(this)}u(sq,Bc);r(\"H.mapevents.MapEvents\",sq);sq.prototype.c=null;sq.prototype.b=null;sq.prototype.g=null;sq.prototype.f=null;var tq=[];Zb(tq);\nsq.prototype.F=function(){this.a=null;this.c.F();this.g.F();this.f.F();this.b&&this.b.F();tq.splice(tq.indexOf(this.a),1);Bc.prototype.F.call(this)};sq.prototype.dispose=sq.prototype.F;sq.prototype.gm=function(){return this.a};sq.prototype.getAttachedMap=sq.prototype.gm;function uq(a,b){var c;if(-1!==vq.indexOf(a))throw new C(uq,0,\"events are already used\");b=b||{};Bc.call(this);this.a=c=a.a;this.i=a;vq.push(a);c.draggable=!0;this.j=b.kinetics||{duration:600,Jd:vl};this.m=b.modifierKey||\"Alt\";this.enable(b.enabled);this.c=c.za;this.f=this.c.element;this.g=0;c.addEventListener(\"dragstart\",this.Vh,!1,this);c.addEventListener(\"drag\",this.hk,!1,this);c.addEventListener(\"dragend\",this.Uh,!1,this);c.addEventListener(\"wheel\",this.Ak,!1,this);c.addEventListener(\"dbltap\",\nthis.vk,!1,this);c.addEventListener(\"pointermove\",this.ik,!1,this);qe(this.f,\"contextmenu\",this.gk,!1,this);a.Jb(this.F,this)}u(uq,Bc);r(\"H.mapevents.Behavior\",uq);var vq=[];Zb(vq);uq.prototype.b=0;uq.DRAGGING=1;uq.WHEELZOOM=4;uq.DBLTAPZOOM=8;uq.FRACTIONALZOOM=16;uq.Feature={PANNING:1,PINCH_ZOOM:2,WHEEL_ZOOM:4,DBL_TAP_ZOOM:8,FRACTIONAL_ZOOM:16,HEADING:64,TILT:32};function wq(a,b){if(a!==+a||a%1||0>a||2147483647<a)throw new C(b,0,\"integer in range [0...0x7FFFFFFF] required\");}\nuq.prototype.disable=function(a){var b=this.b;a!==A?(wq(a,this.disable),b^=b&a):b=0;this.c.endInteraction(!0);this.b=b;this.a.draggable=0<(b&1)};uq.prototype.disable=uq.prototype.disable;uq.prototype.enable=function(a){var b=this.b;a!==A?(wq(a,this.enable),b|=a&127):b=127;this.b=b;this.a.draggable=0<(b&1)};uq.prototype.enable=uq.prototype.enable;uq.prototype.isEnabled=function(a){wq(a,this.isEnabled);return a===(this.b&a)};uq.prototype.isEnabled=uq.prototype.isEnabled;\nfunction xq(a,b){var c=0,d=a.m,e,f=b.originalEvent;f.getModifierState?e=f.getModifierState(d):e=!!f[d.replace(/^Control$/,\"ctrl\").toLowerCase()+\"Key\"];(b=e&&\"touch\"!==b.currentPointer.type)?(a.b&32&&(c|=Mk.TILT),a.b&64&&(c|=Mk.HEADING)):(a.b&2&&(c|=Mk.ZOOM),a.b&1&&(c|=Mk.COORD));return c}function yq(a){var b=a.pointers;a=b[0];b=b[1];a=[a.viewportX,a.viewportY];b&&a.push(b.viewportX,b.viewportY);return a}n=uq.prototype;n.tk=0;\nn.Vh=function(a){var b=xq(this,a);if(this.tk=b){var c=this.c;a=yq(a);c.startInteraction(b,this.j);c.interaction.apply(c,a);if(this.b&4&&!(this.b&16)&&(b=a[0],c=a[1],this.g)){a=this.a.nb();var d=(0>this.g?Nc:Mc)(a);a!==d&&(this.g=0,zq(this,a,d,b,c))}}};n.hk=function(a){var b=xq(this,a);if(this.tk!==b)\"pointerout\"!==a.originalEvent.type&&\"pointerover\"!==a.originalEvent.type&&(this.Uh(a),this.Vh(a));else if(b){b=this.c;var c=yq(a);b.interaction.apply(b,c);a.originalEvent.preventDefault()}};\nn.Uh=function(a){xq(this,a)&&this.c.endInteraction(!this.j)};function zq(a,b,c,d,e){a=a.a.b;if(isNaN(+b))throw Error(\"start zoom needs to be a number\");if(isNaN(+c))throw Error(\"to zoom needs to be a number\");0!==+c-+b&&(a.startControl(null,d,e),a.control(0,0,6,0,0,0),a.endControl(!0,function(a){a.zoom=c}))}\nn.Ak=function(a){if(!a.defaultPrevented&&this.b&4){var b=a.delta;var c=this.a.nb();var d=this.a;var e=d.sc().type;d=this.b&16?c-b:(0>-b?Nc:Mc)(c)-b;if(e===qm.P2D||e===qm.WEBGL)zq(this,c,d,a.viewportX,a.viewportY),this.g=b;a.preventDefault()}};n.ik=function(){};\nn.vk=function(a){var b=a.currentPointer,c=this.a.nb(),d=a.currentPointer.type,e=this.a.sc().type;(e===qm.P2D||e===qm.WEBGL)&&this.b&8&&(a=\"mouse\"===d?0===a.originalEvent.button?-1:1:0<a.pointers.length?1:-1,a=this.b&16?c-a:(0>-a?Nc:Mc)(c)-a,zq(this,c,a,b.viewportX,b.viewportY))};n.gk=function(a){return this.b&8?(a.preventDefault(),!1):!0};\nn.F=function(){var a=this.a;a&&(a.draggable=!1,a.removeEventListener(\"dragstart\",this.Vh,!1,this),a.removeEventListener(\"drag\",this.hk,!1,this),a.removeEventListener(\"dragend\",this.Uh,!1,this),a.removeEventListener(\"wheel\",this.Ak,!1,this),a.removeEventListener(\"dbltap\",this.vk,!1,this),a.removeEventListener(\"pointermove\",this.ik,!1,this),this.a=null);this.f&&(this.f.style.msTouchAction=\"\",ye(this.f,\"contextmenu\",this.gk,!1,this),this.f=null);this.j=this.c=null;vq.splice(vq.indexOf(this.i),1);Bc.prototype.F.call(this)};\nuq.prototype.dispose=uq.prototype.F;r(\"H.mapevents.buildInfo\",function(){return of(\"mapsjs-mapevents\",\"1.0.2\",\"6e1bcdc\")});\n");