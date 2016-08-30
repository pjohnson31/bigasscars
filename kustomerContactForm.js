var kustomerFormHookToken;
//UA PARSER from https://github.com/faisalman/ua-parser-js/blob/master/dist/ua-parser.min.js
(function(window,undefined){"use strict";var LIBVERSION="0.7.10",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",STR_TYPE="string",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded";var util={extend:function(regexes,extensions){var margedRegexes={};for(var i in regexes){if(extensions[i]&&extensions[i].length%2===0){margedRegexes[i]=extensions[i].concat(regexes[i])}else{margedRegexes[i]=regexes[i]}}return margedRegexes},has:function(str1,str2){if(typeof str1==="string"){return str2.toLowerCase().indexOf(str1.toLowerCase())!==-1}else{return false}},lowerize:function(str){return str.toLowerCase()},major:function(version){return typeof version===STR_TYPE?version.split(".")[0]:undefined}};var mapper={rgx:function(){var result,i=0,j,k,p,q,matches,match,args=arguments;while(i<args.length&&!matches){var regex=args[i],props=args[i+1];if(typeof result===UNDEF_TYPE){result={};for(p in props){if(props.hasOwnProperty(p)){q=props[p];if(typeof q===OBJ_TYPE){result[q[0]]=undefined}else{result[q]=undefined}}}}j=k=0;while(j<regex.length&&!matches){matches=regex[j++].exec(this.getUA());if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length==2){if(typeof q[1]==FUNC_TYPE){result[q[0]]=q[1].call(this,match)}else{result[q[0]]=q[1]}}else if(q.length==3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){result[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{result[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length==4){result[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{result[q]=match?match:undefined}}}}i+=2}return result},str:function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(util.has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(util.has(map[i],str)){return i===UNKNOWN?undefined:i}}return str}};var maps={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}};var regexes={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[NAME,VERSION],[/(OPiOS)[\/\s]+([\w\.]+)/i],[[NAME,"Opera Mini"],VERSION],[/\s(opr)\/([\w\.]+)/i],[[NAME,"Opera"],VERSION],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],[NAME,VERSION],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[NAME,"IE"],VERSION],[/(edge)\/((\d+)?[\w\.]+)/i],[NAME,VERSION],[/(yabrowser)\/([\w\.]+)/i],[[NAME,"Yandex"],VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(qqbrowser)[\/\s]?([\w\.]+)/i],[NAME,VERSION],[/(uc\s?browser)[\/\s]?([\w\.]+)/i,/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,/JUC.+(ucweb)[\/\s]?([\w\.]+)/i],[[NAME,"UCBrowser"],VERSION],[/(dolfin)\/([\w\.]+)/i],[[NAME,"Dolphin"],VERSION],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[NAME,"Chrome"],VERSION],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],[VERSION,[NAME,"Android Browser"]],[/FBAV\/([\w\.]+);/i],[VERSION,[NAME,"Facebook"]],[/fxios\/([\w\.-]+)/i],[VERSION,[NAME,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[VERSION,NAME],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,mapper.str,maps.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape)\/([\w\.-]+)/i],[[NAME,"Netscape"],VERSION],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[NAME,VERSION]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,util.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[ARCHITECTURE,/ower/,"",util.lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[ARCHITECTURE,util.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/applecoremedia\/[\w\.]+ \((ipad)/],[MODEL,[VENDOR,"Apple"],[TYPE,TABLET]],[/(apple\s{0,1}tv)/i],[[MODEL,"Apple TV"],[VENDOR,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],[MODEL,[VENDOR,"Amazon"],[TYPE,TABLET]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[[MODEL,mapper.str,maps.device.amazon.model],[VENDOR,"Amazon"],[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[MODEL,VENDOR,[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);/i],[MODEL,[VENDOR,"Apple"],[TYPE,MOBILE]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/\(bb10;\s(\w+)/i],[MODEL,[VENDOR,"BlackBerry"],[TYPE,MOBILE]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],[MODEL,[VENDOR,"Asus"],[TYPE,TABLET]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[VENDOR,"Sony"],[MODEL,"Xperia Tablet"],[TYPE,TABLET]],[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],[[VENDOR,"Sony"],[MODEL,"Xperia Phone"],[TYPE,MOBILE]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/android.+;\s(shield)\sbuild/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation\s[34portablevi]+)/i],[MODEL,[VENDOR,"Sony"],[TYPE,CONSOLE]],[/(sprint\s(\w+))/i],[[VENDOR,mapper.str,maps.device.sprint.vendor],[MODEL,mapper.str,maps.device.sprint.model],[TYPE,MOBILE]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/(nexus\s9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[MODEL,[VENDOR,"Microsoft"],[TYPE,CONSOLE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,"Microsoft"],[TYPE,MOBILE]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i,/(nexus\s[6])/i],[MODEL,[VENDOR,"Motorola"],[TYPE,MOBILE]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[MODEL,[VENDOR,"Motorola"],[TYPE,TABLET]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,TABLET]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,MOBILE]],[/(samsung);smarttv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,SMARTTV]],[/sie-(\w+)*/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[VENDOR,"Nokia"],MODEL,[TYPE,MOBILE]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[VENDOR,"LG"],MODEL,[TYPE,TABLET]],[/(lg) netcast\.tv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],[MODEL,[VENDOR,"LG"],[TYPE,MOBILE]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/linux;.+((jolla));/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/((pebble))app\/[\d\.]+\s/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/android.+;\s(glass)\s\d/i],[MODEL,[VENDOR,"Google"],[TYPE,WEARABLE]],[/android.+(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],[[MODEL,/_/g," "],[VENDOR,"Xiaomi"],[TYPE,MOBILE]],[/\s(tablet)[;\/\s]/i,/\s(mobile)[;\/\s]/i],[[TYPE,util.lowerize],VENDOR,MODEL]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[VERSION,[NAME,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[NAME,VERSION],[/rv\:([\w\.]+).*(gecko)/i],[VERSION,NAME]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[NAME,VERSION],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[NAME,[VERSION,mapper.str,maps.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,mapper.str,maps.os.windows.version]],[/\((bb)(10);/i],[[NAME,"BlackBerry"],VERSION],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[NAME,VERSION],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[NAME,"Symbian"],VERSION],[/\((series40);/i],[NAME],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[NAME,"Firefox OS"],VERSION],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[NAME,VERSION],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[NAME,"Chromium OS"],VERSION],[/(sunos)\s?([\w\.]+\d)*/i],[[NAME,"Solaris"],VERSION],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[NAME,VERSION],[/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],[[NAME,"iOS"],[VERSION,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[NAME,"Mac OS"],[VERSION,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[NAME,VERSION]]};var UAParser=function(uastring,extensions){if(!(this instanceof UAParser)){return new UAParser(uastring,extensions).getResult()}var ua=uastring||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:EMPTY);var rgxmap=extensions?util.extend(regexes,extensions):regexes;this.getBrowser=function(){var browser=mapper.rgx.apply(this,rgxmap.browser);browser.major=util.major(browser.version);return browser};this.getCPU=function(){return mapper.rgx.apply(this,rgxmap.cpu)};this.getDevice=function(){return mapper.rgx.apply(this,rgxmap.device)};this.getEngine=function(){return mapper.rgx.apply(this,rgxmap.engine)};this.getOS=function(){return mapper.rgx.apply(this,rgxmap.os)};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return ua};this.setUA=function(uastring){ua=uastring;return this};return this};UAParser.VERSION=LIBVERSION;UAParser.BROWSER={NAME:NAME,MAJOR:MAJOR,VERSION:VERSION};UAParser.CPU={ARCHITECTURE:ARCHITECTURE};UAParser.DEVICE={MODEL:MODEL,VENDOR:VENDOR,TYPE:TYPE,CONSOLE:CONSOLE,MOBILE:MOBILE,SMARTTV:SMARTTV,TABLET:TABLET,WEARABLE:WEARABLE,EMBEDDED:EMBEDDED};UAParser.ENGINE={NAME:NAME,VERSION:VERSION};UAParser.OS={NAME:NAME,VERSION:VERSION};if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{if(typeof define===FUNC_TYPE&&define.amd){define("ua-parser-js",[],function(){return UAParser})}else{window.UAParser=UAParser}}var $=window.jQuery||window.Zepto;if(typeof $!==UNDEF_TYPE){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(uastring){parser.setUA(uastring);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}})(typeof window==="object"?window:this);
//END Include
var parser = new UAParser();
var uaParserResults = parser.getResult();
console.log
var contactFormHTML = '<a onclick="toggleKustomerContactForm();return false;" class="material-icons help-circle-outline" id="kustomerContactButton" href="#">help</a> \
<div id="kustomerContactFormContainer"> \
  <form id="kustomerContactForm" action=""> \
    <a href="#" onclick="toggleKustomerContactForm();return false;" class="material-icons" id="kustomerCollapseForm">close</a> \
    <div id="kustomerFormContainer"> \
    <h4>Contact Us</h4> \
    <fieldset> \
      <input id="kustomerName" placeholder="Your name" name="customerName" type="text" tabindex="1" onchange="processFieldData(event);" required autofocus> \
      <label class="kustomerFormError hidden" for="kustomerName" id="customerNameRequiredLabel">Name is required</label> \
    </fieldset> \
    <fieldset> \
      <input placeholder="Your Email Address" name="customerEmail" type="email" tabindex="2" onchange="processFieldData(event);" required> \
      <label class="kustomerFormError hidden" id="customerEmailRequiredLabel">Email is required</label> \
      <label class="kustomerFormError hidden" id="customerEmailInvalidLabel">Invaild Email</label> \
    </fieldset> \
    <fieldset> \
      <input placeholder="Your Phone Number (optional)" name="customerPhone" type="tel" tabindex="3" onchange="processFieldData(event);"> \
      <label class="kustomerFormError hidden" id="customerPhoneRequiredLabel">Invaild Phone - Must be 10 digits (numbers only)</label> \
    </fieldset> \
    <fieldset> \
      <input placeholder="Subject" type="text" name="subject" tabindex="4" onchange="processFieldData(event);" required> \
      <label class="kustomerFormError hidden" id="subjectRequiredLabel">Subject is required</label> \
    </fieldset> \
    <fieldset> \
      <textarea placeholder="Type your message here...." name="message" tabindex="5" onchange="processFieldData(event);" type="text" required></textarea> \
      <label class="kustomerFormError hidden" id="messageRequiredLabel">Message is required</label> \
    </fieldset> \
    <fieldset> \
      <button name="submit" type="submit" id="contact-submit" data-submit="...Sending" onclick="sendMsg();return false;">Send</button> \
    </fieldset> \
    <fieldset class="kustomerHidden" style="display:none;"> \
    <input placeholder="browser" type="hidden" name="browser" value="' + uaParserResults.browser.name + '"> \
    <input placeholder="browserVersion" type="hidden" name="browserVersion" value="' + uaParserResults.browser.version + '"> \
    <input placeholder="os" type="hidden" name="os" value="' + uaParserResults.os.name + '"> \
    <input placeholder="osVersion" type="hidden" name="osVersion" value="' + uaParserResults.os.version + '"> \
    <input placeholder="currPage" type="hidden" name="currPage" value="' + document.location.href + '"> \
    </fieldset> \
    </div> \
  </form> \
</div>';


function displayKustomerContactForm(kustomerToken) {
  kustomerFormHookToken = kustomerToken;
  document.addEventListener("DOMContentLoaded", function(event) {

  var kustomerContactForm = document.createElement('div');
  kustomerContactForm.innerHTML = '<div id="kustomerContact" class="collapsed">' + contactFormHTML + '</div>';
  document.body.appendChild(kustomerContactForm);
});
}

function resetForm(){
  document.getElementById("kustomerContact").innerHTML = contactFormHTML;
}


function toggleKustomerContactForm(){
 if(document.getElementById("kustomerContact").className == "collapsed"){
   document.getElementById("kustomerContact").className = "expanded";
 }
 else {
   document.getElementById("kustomerContact").className = "collapsed";
   resetForm();
 }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhone(phone) {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(email);
    //To Do: validate phone
    return true;
}
function processFormData() {
    var jsonData = {};
    var missingRequired = false;
    var fieldName, fieldValue;
    var elem = document.getElementById('kustomerContactForm').elements;
    for(var i = 0; i < elem.length; i++) {
      fieldName = elem[i].name;
      fieldValue = elem[i].value;
        if(elem[i].type == 'text'||elem[i].type == 'textarea'){
          if(elem[i].value.length > 0){
            document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
            jsonData[fieldName] = fieldValue;
          } else if (elem[i].required){
               missingRequired = true;
               document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
          }
        } else if (elem[i].type == 'hidden'){
          if(elem[i].value.length > 0){
            jsonData[fieldName] = fieldValue;
          } else if (elem[i].required){
             missingRequired = true;
             document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
             document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
          }
        } else if (elem[i].type == 'email'){
          if(elem[i].value.length > 0){
            document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
            document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
            if(!validateEmail(elem[i].value)){
              missingRequired = true;
              document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
              document.getElementById(fieldName+'InvalidLabel').classList.remove("hidden");
            }
            jsonData[fieldName] = fieldValue;
          } else if (elem[i].required){
             missingRequired = true;
             document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
             document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
          }
        } else if (elem[i].type == 'tel'){
          if(elem[i].value.length > 0){
            document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
            document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
            if(!validatePhone(elem[i].value)){
              missingRequired = true;
              document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
              document.getElementById(fieldName+'InvalidLabel').classList.remove("hidden");
            }
            jsonData[fieldName] = fieldValue;
          } else if (elem[i].required){
             missingRequired = true;
             document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
             document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
          }
        }

        // fieldType = elem[i].type;
        // fieldValue = elem[i].value;
        // jsonData += {fieldType: fieldValue};
    }
//IF REQUIRED FIELDS ARE NOT SET SHOW ALL MESSAGE

//ELSE SUBMIT FORMDATA
return({"formError":missingRequired, "formData": jsonData});
}




function processFieldData(fieldEvent) {
  var fieldObj = event.currentTarget;
  var fieldName = fieldObj.name;
  var fieldValue = fieldObj.value;
          if(fieldObj.type == 'text'||fieldObj.type == 'textarea'){
          if(fieldObj.value.length > 0){
            document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
          } else if (fieldObj.required){
               document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
          }
        } else if (fieldObj.type == 'email'){
          if(fieldObj.value.length > 0){
            document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
            document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
            if(!validateEmail(fieldObj.value)){
              document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
              document.getElementById(fieldName+'InvalidLabel').classList.remove("hidden");
            }
          } else if (fieldObj.required){
             document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
             document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
          }
        } else if (fieldObj.type == 'tel'){
          if(fieldObj.value.length > 0){
            document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
            document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
            if(!validatePhone(fieldObj.value)){
              document.getElementById(fieldName+'RequiredLabel').classList.add("hidden");
              document.getElementById(fieldName+'InvalidLabel').classList.remove("hidden");
            }
          } else if (fieldObj.required){
             document.getElementById(fieldName+'RequiredLabel').classList.remove("hidden");
             document.getElementById(fieldName+'InvalidLabel').classList.add("hidden");
          }
        }

        // fieldType = elem[i].type;
        // fieldValue = elem[i].value;
        // jsonData += {fieldType: fieldValue};
//IF REQUIRED FIELDS ARE NOT SET SHOW ALL MESSAGE

//ELSE SUBMIT FORMDATA

}



function sendMsg() {
  var formResults = processFormData();
  if(formResults.formError == false){
  xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://api.kustomerapp.com/v1/hooks/form/'+kustomerFormHookToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onload = function() {
      if (xhr.status !== 200) {
          alert('Request failed.  Returned status of ' + xhr.status);
          document.getElementById("kustomerFormContainer").innerHTML = '<div id="kustomerMsgError">There was an error and we are unable to send your message at this time.  Please try again later.</div>'; //SHOW MESSAGE THAT IT HAS BEEN SENT
          //SHOW ERROR MESSAGE


      } else {
        document.getElementById("kustomerFormContainer").innerHTML = '<div id="kustomerMsgSent">Thank you for contacting us.  We have received your message and will respond shortly.</div>'; //SHOW MESSAGE THAT IT HAS BEEN SENT
        console.log(JSON.stringify(xhr.response));
      }
  };
  xhr.send(JSON.stringify(formResults.formData));
}
}
