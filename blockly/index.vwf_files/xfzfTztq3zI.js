/*!CK:984734061!*//*1394577170,178142495*/

if (self.CavalryLogger) { CavalryLogger.start_js(["\/X+f6"]); }

__d("AppUseTrackerLogger",["AsyncRequest","PageTransitions","Run","copyProperties","isInIframe"],function(a,b,c,d,e,f,g,h,i,j,k){function l(){if(!l.instance)l.instance=this;return l.instance;}j(l,{setup:function(m,n,o,p,q){(new l()).init(m,n,o,p,q);}});j(l.prototype,{instance:null,endpoint:'/ajax/apps/usage_update.php',INITIAL_PING:0,ONGOING_PING:1,DISCOVERY_PING:2,ENDING_PING:3,_application_id:0,_is_game:0,_createRequest:function(m){return new g().setURI(this.endpoint).setMethod('POST').setData({app:this._application_id,is_game:this._is_game,type:m,condition:this._signal_on_page_transition});},init:function(m,n,o,p,q){if(k())return;this.cleanup();h.registerHandler(this.catchPageTransition.bind(this));this._application_id=m;this._is_game=n;this._timers.push(setTimeout(function(){this._createRequest(this.INITIAL_PING).send();var r=this._createRequest(this.ONGOING_PING);this._timers.push(setInterval(r.send.bind(r),p));}.bind(this),o));if(q)this._timers.push(setTimeout(function(){this._createRequest(this.DISCOVERY_PING).send();}.bind(this),q));i.onBeforeUnload(this.onBeforeUnload.bind(this));},catchPageTransition:function(m){this._createRequest(this.ENDING_PING).send();this.cleanup();},onBeforeUnload:function(){this._createRequest(this.ENDING_PING).setOption('asynchronous',false).send();this.cleanup();},cleanup:function(){if(this._timers)for(var m=0;m<this._timers.length;m++)clearInterval(this._timers[m]);this._timers=[];}});e.exports=l;});
__d("XdArbiterBuffer",[],function(a,b,c,d,e,f){if(!a.XdArbiter)a.XdArbiter={_m:[],_p:[],register:function(g,h,i){h=h||((/^apps\./).test(location.hostname)?'canvas':'tab');this._p.push([g,h,i]);return h;},handleMessage:function(g,h){this._m.push([g,h]);}};});
__d("CanvasIFrameLoader",["$","XdArbiterBuffer"],function(a,b,c,d,e,f,g){b('XdArbiterBuffer');var h={loadFromForm:function(i){i.submit();}};e.exports=h;});
__d("PlatformDialog",["Arbiter","DOMEventListener"],function(a,b,c,d,e,f,g,h){var i='platform/dialog/response',j={RESPONSE:i,cancelAsync:function(k,l,m){k.subscribe('cancel',function(){g.inform(i,{identifier:l,response:m});});}};e.exports=j;});
__d("PlatformDialogClient",["Arbiter","AsyncDialog","AsyncRequest","DOMEventListener","guid","PlatformDialog","PopupWindow","QueryString","URI","UserAgent"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=575,r='FB_DIALOG_RESPONSE';h.getLoadingDialog().setWidth(q);j.add(window,'message',function(event){if((/\.facebook\.com$/).test(event.origin)&&new RegExp('^'+r+':').test(event.data))g.inform(l.RESPONSE,JSON.parse(event.data.substr(r.length+1)));});var s={};g.subscribe(l.RESPONSE,function(event,u){var v=u.state;if(s[v]){s[v].callback(u);u.state=s[v].state;delete s[v];}},g.SUBSCRIBE_NEW);var t={async:function(u,v,w){var x=k(),y=v.state;v.state=x;v.redirect_uri=new o('/dialog/return/arbiter').setSubdomain('www').setFragment(n.encode({origin:v.redirect_uri})).getQualifiedURI().toString();v.display='async';s[x]={callback:w||function(){},state:y};h.send(new i('/dialog/'+u).setData(v).setMethod('GET').setReadOnly(true));},popup:function(u,v,w,x,y){var z=k(),aa=w.state;w.state=z;w.client_id=w.app_id=v;w.redirect_uri=new o('/dialog/return/arbiter').setSecure(o.getRequestURI().isSecure()).setSubdomain('www').setFragment(n.encode({origin:w.redirect_uri})).addQueryData(x||{}).addQueryData({relation:'opener',close:true}).toString();w.display=p.mobile()?'touch':'popup';s[z]={callback:y||function(){},state:aa};var ba=o.getRequestURI(),ca=ba.getDomain(),da=ca.replace('developers','www'),ea='https://'+da;m.open(new o(ea+'/dialog/'+u).addQueryData(w).toString(),210,q);}};e.exports=t;});
__d("CanvasNavigationFullScreen",["Arbiter","CSS","cx","Event","FullScreen"],function(a,b,c,d,e,f,g,h,i,j,k){var l=false,m={initLink:function(n,o){if(l){return;}else l=true;h.conditionClass(n,"_4-os",k.isSupported());if(k.isSupported()&&o)setTimeout(o.show.bind(o),500);j.listen(n,'click',this.setFullScreen.bind(null,true));k.subscribe('changed',function(){if(k.isFullScreen()){g.inform('canvas.enter_fullscreen');}else g.inform('canvas.exit_fullscreen');});},isSupported:function(){var n=l&&k.isSupported();return !!n;},getFullScreen:function(){return !!k.isFullScreen();},setFullScreen:function(n){var o=true;if(n){o=k.enableFullScreen(document.documentElement);}else o=k.disableFullScreen();return o;}};e.exports=m;});
__d("JSONRPC",["copyProperties","Log"],function(a,b,c,d,e,f,g,h){function i(j){this._counter=0;this._callbacks={};this.remote=function(k){this._context=k;return this.remote;}.bind(this);this.local={};this._write=j;}g(i.prototype,{stub:function(j){this.remote[j]=function(){var k=Array.prototype.slice.call(arguments),l={jsonrpc:'2.0',method:j};if(typeof k[k.length-1]=='function'){l.id=++this._counter;this._callbacks[l.id]=k.pop();}l.params=k;this._write(JSON.stringify(l),this._context||{method:j});}.bind(this);},read:function(j,k){var l=JSON.parse(j),m=l.id;if(!l.method){if(!this._callbacks[m]){h.warn('Could not find callback %s',m);return;}var n=this._callbacks[m];delete this._callbacks[m];delete l.id;delete l.jsonrpc;n(l);return;}var o=this,p=this.local[l.method],q;if(m){q=function(t,u){var v={jsonrpc:'2.0',id:m};v[t]=u;setTimeout(function(){o._write(JSON.stringify(v),k);},0);};}else q=function(){};if(!p){h.error('Method "%s" has not been defined',l.method);q('error',{code:-32601,message:'Method not found',data:l.method});return;}l.params.push(q.bind(null,'result'));l.params.push(q.bind(null,'error'));try{var s=p.apply(k||null,l.params);if(typeof s!=='undefined')q('result',s);}catch(r){h.error('Invokation of RPC method %s resulted in the error: %s',l.method,r.message);q('error',{code:-32603,message:'Internal error',data:r.message});}}});e.exports=i;});
__d("Queue",["copyProperties"],function(a,b,c,d,e,f,g){var h={};function i(j){"use strict";this._opts=g({interval:0,processor:null},j);this._queue=[];this._stopped=true;}i.prototype._dispatch=function(j){"use strict";if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error('No processor available');}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(this._dispatch.bind(this),this._opts.interval);}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift());};i.prototype.enqueue=function(j){"use strict";if(this._opts.processor&&!this._stopped){this._opts.processor.call(this,j);}else this._queue.push(j);return this;};i.prototype.start=function(j){"use strict";if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this;};i.prototype.isStarted=function(){"use strict";return !this._stopped;};i.prototype.dispatch=function(){"use strict";this._dispatch(true);};i.prototype.stop=function(j){"use strict";this._stopped=true;if(j)clearTimeout(this._timeout);return this;};i.prototype.merge=function(j,k){"use strict";this._queue[k?'unshift':'push'].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this;};i.prototype.getLength=function(){"use strict";return this._queue.length;};i.get=function(j,k){"use strict";var l;if(j in h){l=h[j];}else l=h[j]=new i(k);return l;};i.exists=function(j){"use strict";return j in h;};i.remove=function(j){"use strict";return delete h[j];};e.exports=i;});
__d("XdArbiter",["Arbiter","Log","QueryString","Queue"],function(a,b,c,d,e,f,g,h,i,j){var k=/^apps\./.test(location.hostname)?'canvas':'tab',l={},m=[],n=new j(),o={setRpcHandler:function(q){n.start(q);},handleMessage:function(q,r,s){try{if(typeof q=='string'){if(/^FB_RPC:/.test(q)){n.enqueue([q.substring(7),{origin:r,source:s||l[k]}]);return;}q=JSON.parse(q);}if(!q.method)return;if(typeof q.params=='string')q.params=JSON.parse(q.params);g.inform('Connect.Unsafe.'+q.method,q.params,g.BEHAVIOR_PERSISTENT);}catch(t){}},register:function(q,r,s){var t=r||k;g.inform("XdArbiter/register",{origin:s});l[t]=q;l[s]=q;g.inform('XdArbiter.register',t,g.BEHAVIOR_PERSISTENT);this.scheduleDispatch();return t;},scheduleDispatch:function(){var q=this,r=42;function s(){var t=m.shift();if(t)q.send.apply(q,t);if(m.length)setTimeout(s,r);}setTimeout(s,r);},hasProxy:function(q){var r=q||k;return !!l[r];},send:function(q,r,s){var t=s in l?s:k;r=r||l[t];if(typeof q!=='string')q=i.encode(q);try{r.proxyMessage(q,s);}catch(u){h.debug('XdArbiter: Proxy for %s not available, '+'page might have been navigated: %s',t,u.message);delete l[t];}return true;}},p=a.XdArbiter;a.XdArbiter=o;if(p){if(p._p.length)while(p._p.length)o.register.apply(o,p._p.shift());if(p._m.length)while(p._m.length)o.handleMessage.apply(o,p._m.shift());}e.exports=o;});
__d("PlatformAppController",["Arbiter","AsyncRequest","Bootloader","CanvasNavigationFullScreen","CSS","CurrentUser","Dialog","JSONRPC","PlatformDialogClient","Style","URI","Vector","XdArbiter","ge"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u={test_flow:true,app_requests:true},v,w,x=true,y=0,z=false,aa,ba=false,ca=window._cstart,da=0,ea,fa,ga={},ha=new n(function(sa,ta){s.send('FB_RPC:'+sa,ta.source||t(v).contentWindow.frames['fb_xdm_frame_'+location.protocol.replace(':','')],ta.origin||w);});g.subscribe("XdArbiter/register",function(sa,ta){if(ea&&ta.origin!=w)new h().setURI('/platform/app_owned_url_check/').setData({appid:ea,url:ta.origin}).setHandler(function(ua){var va=ua.getPayload();if(va.allowed)w=ta.origin;}).send();});function ia(sa){var ta=parseInt(sa.x,10),ua=parseInt(sa.y,10);if(ta>=0&&ua>=0)window.scrollTo(ta,ua);}function ja(sa){var ta=t(sa.frame.replace(/_fb_https$/,''));if(ta){k.addClass(ta,'noresize');ta.style.height=sa.height+'px';}}function ka(){var sa=t(v),ta=0,ua=0;while(sa){ta+=parseInt(sa.offsetLeft,10);ua+=parseInt(sa.offsetTop,10);sa=sa.offsetParent;}var va=r.getViewportDimensions(),wa=r.getScrollPosition();return {clientWidth:va.x,clientHeight:va.y,scrollLeft:wa.x,scrollTop:wa.y,offsetLeft:ta,offsetTop:ua};}function la(sa,ta,ua){sa.display='async';function va(ya){if(ya.error_code==1340004){if(l.getID()&&l.getID()!="0"){ta(ya);}else q('/login.php').addQueryData('next',q.getRequestURI().toString()).go();}else ta(ya);}if(!sa.redirect_uri||q(sa.redirect_uri).getOrigin()!=q(this.origin).getOrigin())sa.redirect_uri=this.origin;if(u[sa.method]){o.async(sa.method,sa,va);return;}if(sa.method=='apprequests'){o.async('app_requests',sa,va);return;}var wa;if(sa.method=='permissions.oauth'||sa.method=='permissions.request'||sa.method=='oauth'){if(fa&&fa.useSwissGDP){o.async('oauth',sa,va);return;}sa.method='permissions.request';wa='/connect/uiserver.php';if(sa.scope){sa.perms=sa.scope;delete sa.scope;}}else{if(!sa.method.match(/^[\w\-.]+$/))throw new Error('Malformed method name');wa='/fbml/ajax/dialog/'+sa.method.replace(/\./g,'_');delete sa.method;}delete sa.access_token;delete sa.next;var xa=new h().setMethod('GET').setReadOnly(true).setURI(q(wa).setQueryData(sa));new m().setAsync(xa).setModal(true).setWideDialog(true).show().setCloseHandler(function(ya){ta(ya);});}function ma(sa){z=sa;}function na(sa,ta){ba=sa;aa=ta;}ha.stub('navigate');function oa(sa){if(z){ha.remote.navigate(sa);return true;}return false;}ha.stub('enterFullScreen');g.subscribe('canvas.enter_fullscreen',ha.remote.enterFullScreen);ha.stub('exitFullScreen');g.subscribe('canvas.exit_fullscreen',ha.remote.exitFullScreen);function pa(sa){var ta=sa.time-ca+da;switch(sa.name){case 'StopIframeAppTtiTimer':da=ta;return {time_delta_ms:ta,type:"tti"};case 'StartIframeAppTtiTimer':ca=sa.time;break;case 'RecordIframeAppTti':if(ba)i.loadModules(["CanvasIFrameLogger"],function(ua){ua.log(ta,sa.appId,aa);});return {time_delta_ms:ta,type:"tti"};}}ha.local.setSize=ja;ha.local.getPageInfo=ka;ha.local.scrollTo=ia;ha.local.showDialog=la;ha.local.setNavigationEnabled=ma;ha.local.isFullScreenSupported=j.isSupported;ha.local.getFullScreen=j.getFullScreen;ha.local.logTtiMessage=pa;s.setRpcHandler(function(sa){ha.read.apply(ha,sa);});ha.stub('hidePluginObjects');g.subscribe('layer_shown',function(){if(++y===1)if(x){ha.remote.hidePluginObjects();}else p.set(t('pagelet_canvas_content'),'visibility','hidden');});ha.stub('showPluginObjects');g.subscribe('layer_hidden',function(){if(--y===0){if(x){ha.remote.showPluginObjects();}else p.set(t('pagelet_canvas_content'),'visibility','');}else if(y<0)y=0;});function qa(sa){ga[sa.name]=sa;var ta=t(sa.name);if(ta)v=ta;}var ra={setActiveIframeAndAppID:function(sa,ta,ua){v=sa;w=ta;ea=ua;},setInformAppOnLayerChange:function(sa){x=sa;},setNavigationEnabled:ma,setTtiEnabled:na,handleNavigation:oa,init:qa,getFrameParams:function(sa){return ga[sa];},setConfig:function(sa){fa=sa;}};a.PlatformAppController=ra;e.exports=ra;});
__d("FavIcon",["DOM"],function(a,b,c,d,e,f,g){var h;function i(){if(g.contains(document.head,"link")){var k=g.scry(document.head,"link");k.forEach(function(l){if(l.rel.indexOf('icon')!=-1||l.rel.indexOf('shortcut icon')!=-1)g.remove(l);});}}var j={set:function(k){if(h)g.remove(h);i();h=g.create('link',{type:'image/x-icon',rel:'icon',href:k});g.appendContent(g.find(document,'head'),h);}};e.exports=j;});
__d("PlatformCanvasController",["PlatformAppController","DOMEventListener","URI","CSS","DOM","DocumentTitle","FavIcon","ge","tx","startsWith","AsyncRequest","UserActivity","UIPagelet","PageTransitions"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u='iframe_canvas',v=240000,w=5000,x=60000,y,z,aa,ba,ca,da,ea;function fa(oa){var pa=n('pagelet_canvas_content');j.hide(pa);k.scry(pa,'iframe').forEach(function(qa){qa.src='';});k.setContent(n('canvas_throbber_text'),o._("Loading {app-name}",{'app-name':oa}));}function ga(oa,pa,qa,ra,sa){var ta=n('pagelet_canvas_footer_content'),ua=n('pagelet_canvas_content'),va=n('pagelet_canvas_ip_banner_content');k.setContent(ua,oa);k.setContent(ta,pa);k.setContent(va,sa);j.show(ua);l.set(qa);m.set(ra);}function ha(oa){if(oa.getSubdomain()!='apps')return false;var pa,qa=k.scry(document,'a[data-appname]');for(var ra=0;ra<qa.length;ra++)if(qa[ra].href==oa){pa=qa[ra].getAttribute('data-appname');break;}if(!pa)return false;var sa=oa.getPath().split('/')[1];if(sa=='l.php')return false;fa(pa);if(n('pagelet_canvas_storybox'))new q().setURI(new i('/ajax/canvas/storybox')).setData({fb_app_name:sa}).setMethod('GET').setReadOnly(true).send();var ta=oa.getUnqualifiedURI();new q().setURI(new i('/ajax/canvas.php')).setData({fb_app_name:sa,uri:ta.toString()}).setMethod('GET').setReadOnly(true).setStatusElement('canvas_throbber').setHandler(function(ua){var va=ua.getPayload();j.conditionClass(document.body,'center_fixed_width_app',!va.is_liquid);ga(va.main_html,va.footer_html,va.page_title,va.favicon,va.start_now_banner_markup);t.transitionComplete();}).send();return true;}function ia(oa){if(!p(oa.getPath(),'/'+aa+'/')&&!p(oa.getPath(),'/'+z+'/'))return false;oa=oa.getUnqualifiedURI();oa.setPath('/'+oa.getPath().split('/').slice(2).join('/'));return g.handleNavigation(oa.toString());}function ja(oa){return ia(oa)||ha(oa);}function ka(){var oa=Date.now();if((y>0)&&(oa-ba>=v)){ba=oa;s.loadFromEndpoint('WebEgoPane','pagelet_ego_pane',{pid:9,data:[z,++ca]},{bundle:false});}}r.subscribe(function(){var oa=Date.now();if(oa-ba>=v-w)setTimeout(ka,w);});function la(){var oa=Date.now();if((y>0)&&(oa-da>=x)){da=oa;s.loadFromEndpoint('CanvasShowcaseSliderPagelet','pagelet_canvas_showcase',{pid:129,data:[z,++ea]},{bundle:false});}}function ma(oa,pa,qa,ra,sa){y=qa;ba=Date.now();ca=0;da=Date.now();ea=0;if(z&&z!==oa)ka();z=oa;aa=pa;var ta=n(u);g.setConfig(sa);if(ta)h.add(ta,'load',function(){g.setNavigationEnabled(false);});if(sa&&sa.displayShowcase)setInterval(la,x);g.setInformAppOnLayerChange(!ra);g.setNavigationEnabled(false);t.registerHandler(ja);}var na={setup:ma};e.exports=na;});