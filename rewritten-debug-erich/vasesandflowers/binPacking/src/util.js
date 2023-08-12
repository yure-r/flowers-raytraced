
// import ClipperLib from 'clipper-lib'
import Vector from './math/vector.js'
import IndexedVector from './math/indexed_vector.js'
import Polygon from './math/polygon.js'
import BoundingBox from './math/bounding_box.js'


!function(){"use strict";console.log("INIT CLIPPER.JS");var t,e,i,n,o={};o.version="6.4.2.2",o.use_lines=!0,o.use_xyz=!1;var r=!1;if("undefined"!=typeof module&&module.exports?(module.exports=o,r=!0):("function"==typeof define&&define.amd&&define(o),"undefined"!=typeof document?window.ClipperLib=o:self.ClipperLib=o),r){var s="chrome";t="Netscape"}else{var s=navigator.userAgent.toString().toLowerCase();t=navigator.appName}var l={};-1!=s.indexOf("chrome")&&-1==s.indexOf("chromium")?l.chrome=1:l.chrome=0,-1!=s.indexOf("chromium")?l.chromium=1:l.chromium=0,-1!=s.indexOf("safari")&&-1==s.indexOf("chrome")&&-1==s.indexOf("chromium")?l.safari=1:l.safari=0,-1!=s.indexOf("firefox")?l.firefox=1:l.firefox=0,-1!=s.indexOf("firefox/17")?l.firefox17=1:l.firefox17=0,-1!=s.indexOf("firefox/15")?l.firefox15=1:l.firefox15=0,-1!=s.indexOf("firefox/3")?l.firefox3=1:l.firefox3=0,-1!=s.indexOf("opera")?l.opera=1:l.opera=0,-1!=s.indexOf("msie 10")?l.msie10=1:l.msie10=0,-1!=s.indexOf("msie 9")?l.msie9=1:l.msie9=0,-1!=s.indexOf("msie 8")?l.msie8=1:l.msie8=0,-1!=s.indexOf("msie 7")?l.msie7=1:l.msie7=0,-1!=s.indexOf("msie ")?l.msie=1:l.msie=0,o.biginteger_used=null;function p(t,e,i){o.biginteger_used=1,null!=t&&("number"==typeof t&&void 0===e?this.fromInt(t):"number"==typeof t?this.fromNumber(t,e,i):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}function u(){return new p(null,void 0,void 0)}"Microsoft Internet Explorer"==t?(p.prototype.am=function t(e,i,n,o,r,s){for(var l=32767&i,p=i>>15;--s>=0;){var u=32767&this[e],h=this[e++]>>15,a=p*u+h*l;r=((u=l*u+((32767&a)<<15)+n[o]+(1073741823&r))>>>30)+(a>>>15)+p*h+(r>>>30),n[o++]=1073741823&u}return r},e=30):"Netscape"!=t?(p.prototype.am=function t(e,i,n,o,r,s){for(;--s>=0;){var l=i*this[e++]+n[o]+r;r=Math.floor(l/67108864),n[o++]=67108863&l}return r},e=26):(p.prototype.am=function t(e,i,n,o,r,s){for(var l=16383&i,p=i>>14;--s>=0;){var u=16383&this[e],h=this[e++]>>14,a=p*u+h*l;r=((u=l*u+((16383&a)<<14)+n[o]+r)>>28)+(a>>14)+p*h,n[o++]=268435455&u}return r},e=28),p.prototype.DB=e,p.prototype.DM=(1<<e)-1,p.prototype.DV=1<<e,p.prototype.FV=4503599627370496,p.prototype.F1=52-e,p.prototype.F2=2*e-52;var h=[];for(n=0,i=48;n<=9;++n)h[i++]=n;for(n=10,i=97;n<36;++n)h[i++]=n;for(n=10,i=65;n<36;++n)h[i++]=n;function a(t){return"0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)}function f(t,e){var i=h[t.charCodeAt(e)];return null==i?-1:i}function P(t){var e=u();return e.fromInt(t),e}function d(t){var e,i=1;return 0!=(e=t>>>16)&&(t=e,i+=16),0!=(e=t>>8)&&(t=e,i+=8),0!=(e=t>>4)&&(t=e,i+=4),0!=(e=t>>2)&&(t=e,i+=2),0!=(e=t>>1)&&(t=e,i+=1),i}function m(t){this.m=t}function y(t){return t}function $(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function c(t,e){return t&e}function v(t,e){return t|e}function C(t,e){return t^e}function x(t,e){return t&~e}function I(t){if(0==t)return -1;var e=0;return(65535&t)==0&&(t>>=16,e+=16),(255&t)==0&&(t>>=8,e+=8),(15&t)==0&&(t>>=4,e+=4),(3&t)==0&&(t>>=2,e+=2),(1&t)==0&&++e,e}function _(t){for(var e=0;0!=t;)t&=t-1,++e;return e}function L(){}function E(t){return t}function T(t){this.r2=u(),this.q3=u(),p.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t),this.m=t}function g(t){return t}m.prototype.convert=function t(e){return e.s<0||e.compareTo(this.m)>=0?e.mod(this.m):e},m.prototype.revert=y,m.prototype.reduce=function t(e){e.divRemTo(this.m,null,e)},m.prototype.mulTo=function t(e,i,n){e.multiplyTo(i,n),this.reduce(n)},m.prototype.sqrTo=function t(e,i){e.squareTo(i),this.reduce(i)},$.prototype.convert=function t(e){var i=u();return e.abs().dlShiftTo(this.m.t,i),i.divRemTo(this.m,null,i),e.s<0&&i.compareTo(p.ZERO)>0&&this.m.subTo(i,i),i},$.prototype.revert=function t(e){var i=u();return e.copyTo(i),this.reduce(i),i},$.prototype.reduce=function t(e){for(;e.t<=this.mt2;)e[e.t++]=0;for(var i=0;i<this.m.t;++i){var n=32767&e[i],o=n*this.mpl+((n*this.mph+(e[i]>>15)*this.mpl&this.um)<<15)&e.DM;for(n=i+this.m.t,e[n]+=this.m.am(0,o,e,i,0,this.m.t);e[n]>=e.DV;)e[n]-=e.DV,e[++n]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)},$.prototype.mulTo=function t(e,i,n){e.multiplyTo(i,n),this.reduce(n)},$.prototype.sqrTo=function t(e,i){e.squareTo(i),this.reduce(i)},p.prototype.copyTo=function t(e){for(var i=this.t-1;i>=0;--i)e[i]=this[i];e.t=this.t,e.s=this.s},p.prototype.fromInt=function t(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+this.DV:this.t=0},p.prototype.fromString=function t(e,i){if(16==i)n=4;else if(8==i)n=3;else if(256==i)n=8;else if(2==i)n=1;else if(32==i)n=5;else if(4==i)n=2;else{this.fromRadix(e,i);return}this.t=0,this.s=0;for(var n,o=e.length,r=!1,s=0;--o>=0;){var l=8==n?255&e[o]:f(e,o);if(l<0){"-"==e.charAt(o)&&(r=!0);continue}r=!1,0==s?this[this.t++]=l:s+n>this.DB?(this[this.t-1]|=(l&(1<<this.DB-s)-1)<<s,this[this.t++]=l>>this.DB-s):this[this.t-1]|=l<<s,(s+=n)>=this.DB&&(s-=this.DB)}8==n&&(128&e[0])!=0&&(this.s=-1,s>0&&(this[this.t-1]|=(1<<this.DB-s)-1<<s)),this.clamp(),r&&p.ZERO.subTo(this,this)},p.prototype.clamp=function t(){for(var e=this.s&this.DM;this.t>0&&this[this.t-1]==e;)--this.t},p.prototype.dlShiftTo=function t(e,i){var n;for(n=this.t-1;n>=0;--n)i[n+e]=this[n];for(n=e-1;n>=0;--n)i[n]=0;i.t=this.t+e,i.s=this.s},p.prototype.drShiftTo=function t(e,i){for(var n=e;n<this.t;++n)i[n-e]=this[n];i.t=Math.max(this.t-e,0),i.s=this.s},p.prototype.lShiftTo=function t(e,i){var n,o=e%this.DB,r=this.DB-o,s=(1<<r)-1,l=Math.floor(e/this.DB),p=this.s<<o&this.DM;for(n=this.t-1;n>=0;--n)i[n+l+1]=this[n]>>r|p,p=(this[n]&s)<<o;for(n=l-1;n>=0;--n)i[n]=0;i[l]=p,i.t=this.t+l+1,i.s=this.s,i.clamp()},p.prototype.rShiftTo=function t(e,i){i.s=this.s;var n=Math.floor(e/this.DB);if(n>=this.t){i.t=0;return}var o=e%this.DB,r=this.DB-o,s=(1<<o)-1;i[0]=this[n]>>o;for(var l=n+1;l<this.t;++l)i[l-n-1]|=(this[l]&s)<<r,i[l-n]=this[l]>>o;o>0&&(i[this.t-n-1]|=(this.s&s)<<r),i.t=this.t-n,i.clamp()},p.prototype.subTo=function t(e,i){for(var n=0,o=0,r=Math.min(e.t,this.t);n<r;)o+=this[n]-e[n],i[n++]=o&this.DM,o>>=this.DB;if(e.t<this.t){for(o-=e.s;n<this.t;)o+=this[n],i[n++]=o&this.DM,o>>=this.DB;o+=this.s}else{for(o+=this.s;n<e.t;)o-=e[n],i[n++]=o&this.DM,o>>=this.DB;o-=e.s}i.s=o<0?-1:0,o<-1?i[n++]=this.DV+o:o>0&&(i[n++]=o),i.t=n,i.clamp()},p.prototype.multiplyTo=function t(e,i){var n=this.abs(),o=e.abs(),r=n.t;for(i.t=r+o.t;--r>=0;)i[r]=0;for(r=0;r<o.t;++r)i[r+n.t]=n.am(0,o[r],i,r,0,n.t);i.s=0,i.clamp(),this.s!=e.s&&p.ZERO.subTo(i,i)},p.prototype.squareTo=function t(e){for(var i=this.abs(),n=e.t=2*i.t;--n>=0;)e[n]=0;for(n=0;n<i.t-1;++n){var o=i.am(n,i[n],e,2*n,0,1);(e[n+i.t]+=i.am(n+1,2*i[n],e,2*n+1,o,i.t-n-1))>=i.DV&&(e[n+i.t]-=i.DV,e[n+i.t+1]=1)}e.t>0&&(e[e.t-1]+=i.am(n,i[n],e,2*n,0,1)),e.s=0,e.clamp()},p.prototype.divRemTo=function t(e,i,n){var o=e.abs();if(!(o.t<=0)){var r=this.abs();if(r.t<o.t){null!=i&&i.fromInt(0),null!=n&&this.copyTo(n);return}null==n&&(n=u());var s=u(),l=this.s,h=e.s,a=this.DB-d(o[o.t-1]);a>0?(o.lShiftTo(a,s),r.lShiftTo(a,n)):(o.copyTo(s),r.copyTo(n));var f=s.t,P=s[f-1];if(0!=P){var m=P*(1<<this.F1)+(f>1?s[f-2]>>this.F2:0),y=this.FV/m,$=(1<<this.F1)/m,c=1<<this.F2,v=n.t,C=v-f,x=null==i?u():i;for(s.dlShiftTo(C,x),n.compareTo(x)>=0&&(n[n.t++]=1,n.subTo(x,n)),p.ONE.dlShiftTo(f,x),x.subTo(s,s);s.t<f;)s[s.t++]=0;for(;--C>=0;){var I=n[--v]==P?this.DM:Math.floor(n[v]*y+(n[v-1]+c)*$);if((n[v]+=s.am(0,I,n,C,0,f))<I)for(s.dlShiftTo(C,x),n.subTo(x,n);n[v]<--I;)n.subTo(x,n)}null!=i&&(n.drShiftTo(f,i),l!=h&&p.ZERO.subTo(i,i)),n.t=f,n.clamp(),a>0&&n.rShiftTo(a,n),l<0&&p.ZERO.subTo(n,n)}}},p.prototype.invDigit=function t(){if(this.t<1)return 0;var e=this[0];if((1&e)==0)return 0;var i=3&e;return(i=(i=(i=(i=i*(2-(15&e)*i)&15)*(2-(255&e)*i)&255)*(2-((65535&e)*i&65535))&65535)*(2-e*i%this.DV)%this.DV)>0?this.DV-i:-i},p.prototype.isEven=function t(){return(this.t>0?1&this[0]:this.s)==0},p.prototype.exp=function t(e,i){if(e>4294967295||e<1)return p.ONE;var n=u(),o=u(),r=i.convert(this),s=d(e)-1;for(r.copyTo(n);--s>=0;)if(i.sqrTo(n,o),(e&1<<s)>0)i.mulTo(o,r,n);else{var l=n;n=o,o=l}return i.revert(n)},p.prototype.toString=function t(e){if(this.s<0)return"-"+this.negate().toString(e);if(16==e)i=4;else if(8==e)i=3;else if(2==e)i=1;else if(32==e)i=5;else{if(4!=e)return this.toRadix(e);i=2}var i,n,o=(1<<i)-1,r=!1,s="",l=this.t,p=this.DB-l*this.DB%i;if(l-- >0)for(p<this.DB&&(n=this[l]>>p)>0&&(r=!0,s=a(n));l>=0;)p<i?(n=(this[l]&(1<<p)-1)<<i-p,n|=this[--l]>>(p+=this.DB-i)):(n=this[l]>>(p-=i)&o,p<=0&&(p+=this.DB,--l)),n>0&&(r=!0),r&&(s+=a(n));return r?s:"0"},p.prototype.negate=function t(){var e=u();return p.ZERO.subTo(this,e),e},p.prototype.abs=function t(){return this.s<0?this.negate():this},p.prototype.compareTo=function t(e){var i=this.s-e.s;if(0!=i)return i;var n=this.t;if(0!=(i=n-e.t))return this.s<0?-i:i;for(;--n>=0;)if(0!=(i=this[n]-e[n]))return i;return 0},p.prototype.bitLength=function t(){return this.t<=0?0:this.DB*(this.t-1)+d(this[this.t-1]^this.s&this.DM)},p.prototype.mod=function t(e){var i=u();return this.abs().divRemTo(e,null,i),this.s<0&&i.compareTo(p.ZERO)>0&&e.subTo(i,i),i},p.prototype.modPowInt=function t(e,i){var n;return n=e<256||i.isEven()?new m(i):new $(i),this.exp(e,n)},p.ZERO=P(0),p.ONE=P(1),L.prototype.convert=E,L.prototype.revert=E,L.prototype.mulTo=function t(e,i,n){e.multiplyTo(i,n)},L.prototype.sqrTo=function t(e,i){e.squareTo(i)},T.prototype.convert=function t(e){if(e.s<0||e.t>2*this.m.t)return e.mod(this.m);if(0>e.compareTo(this.m))return e;var i=u();return e.copyTo(i),this.reduce(i),i},T.prototype.revert=g,T.prototype.reduce=function t(e){for(e.drShiftTo(this.m.t-1,this.r2),e.t>this.m.t+1&&(e.t=this.m.t+1,e.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);0>e.compareTo(this.r2);)e.dAddOffset(1,this.m.t+1);for(e.subTo(this.r2,e);e.compareTo(this.m)>=0;)e.subTo(this.m,e)},T.prototype.mulTo=function t(e,i,n){e.multiplyTo(i,n),this.reduce(n)},T.prototype.sqrTo=function t(e,i){e.squareTo(i),this.reduce(i)};var X=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],Y=67108864/X[X.length-1];p.prototype.chunkSize=function t(e){return Math.floor(Math.LN2*this.DB/Math.log(e))},p.prototype.toRadix=function t(e){if(null==e&&(e=10),0==this.signum()||e<2||e>36)return"0";var i=this.chunkSize(e),n=Math.pow(e,i),o=P(n),r=u(),s=u(),l="";for(this.divRemTo(o,r,s);r.signum()>0;)l=(n+s.intValue()).toString(e).substr(1)+l,r.divRemTo(o,r,s);return s.intValue().toString(e)+l},p.prototype.fromRadix=function t(e,i){this.fromInt(0),null==i&&(i=10);for(var n=this.chunkSize(i),o=Math.pow(i,n),r=!1,s=0,l=0,u=0;u<e.length;++u){var h=f(e,u);if(h<0){"-"==e.charAt(u)&&0==this.signum()&&(r=!0);continue}l=i*l+h,++s>=n&&(this.dMultiply(o),this.dAddOffset(l,0),s=0,l=0)}s>0&&(this.dMultiply(Math.pow(i,s)),this.dAddOffset(l,0)),r&&p.ZERO.subTo(this,this)},p.prototype.fromNumber=function t(e,i,n){if("number"==typeof i){if(e<2)this.fromInt(1);else for(this.fromNumber(e,n),this.testBit(e-1)||this.bitwiseTo(p.ONE.shiftLeft(e-1),v,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(i);)this.dAddOffset(2,0),this.bitLength()>e&&this.subTo(p.ONE.shiftLeft(e-1),this)}else{var o=[],r=7&e;o.length=(e>>3)+1,i.nextBytes(o),r>0?o[0]&=(1<<r)-1:o[0]=0,this.fromString(o,256)}},p.prototype.bitwiseTo=function t(e,i,n){var o,r,s=Math.min(e.t,this.t);for(o=0;o<s;++o)n[o]=i(this[o],e[o]);if(e.t<this.t){for(r=e.s&this.DM,o=s;o<this.t;++o)n[o]=i(this[o],r);n.t=this.t}else{for(r=this.s&this.DM,o=s;o<e.t;++o)n[o]=i(r,e[o]);n.t=e.t}n.s=i(this.s,e.s),n.clamp()},p.prototype.changeBit=function t(e,i){var n=p.ONE.shiftLeft(e);return this.bitwiseTo(n,i,n),n},p.prototype.addTo=function t(e,i){for(var n=0,o=0,r=Math.min(e.t,this.t);n<r;)o+=this[n]+e[n],i[n++]=o&this.DM,o>>=this.DB;if(e.t<this.t){for(o+=e.s;n<this.t;)o+=this[n],i[n++]=o&this.DM,o>>=this.DB;o+=this.s}else{for(o+=this.s;n<e.t;)o+=e[n],i[n++]=o&this.DM,o>>=this.DB;o+=e.s}i.s=o<0?-1:0,o>0?i[n++]=o:o<-1&&(i[n++]=this.DV+o),i.t=n,i.clamp()},p.prototype.dMultiply=function t(e){this[this.t]=this.am(0,e-1,this,0,0,this.t),++this.t,this.clamp()},p.prototype.dAddOffset=function t(e,i){if(0!=e){for(;this.t<=i;)this[this.t++]=0;for(this[i]+=e;this[i]>=this.DV;)this[i]-=this.DV,++i>=this.t&&(this[this.t++]=0),++this[i]}},p.prototype.multiplyLowerTo=function t(e,i,n){var o,r=Math.min(this.t+e.t,i);for(n.s=0,n.t=r;r>0;)n[--r]=0;for(o=n.t-this.t;r<o;++r)n[r+this.t]=this.am(0,e[r],n,r,0,this.t);for(o=Math.min(e.t,i);r<o;++r)this.am(0,e[r],n,r,0,i-r);n.clamp()},p.prototype.multiplyUpperTo=function t(e,i,n){--i;var o=n.t=this.t+e.t-i;for(n.s=0;--o>=0;)n[o]=0;for(o=Math.max(i-this.t,0);o<e.t;++o)n[this.t+o-i]=this.am(i-o,e[o],n,0,0,this.t+o-i);n.clamp(),n.drShiftTo(1,n)},p.prototype.modInt=function t(e){if(e<=0)return 0;var i=this.DV%e,n=this.s<0?e-1:0;if(this.t>0){if(0==i)n=this[0]%e;else for(var o=this.t-1;o>=0;--o)n=(i*n+this[o])%e}return n},p.prototype.millerRabin=function t(e){var i=this.subtract(p.ONE),n=i.getLowestSetBit();if(n<=0)return!1;var o=i.shiftRight(n);(e=e+1>>1)>X.length&&(e=X.length);for(var r=u(),s=0;s<e;++s){r.fromInt(X[Math.floor(fxrand()*X.length)]);var l=r.modPow(o,this);if(0!=l.compareTo(p.ONE)&&0!=l.compareTo(i)){for(var h=1;h++<n&&0!=l.compareTo(i);)if(0==(l=l.modPowInt(2,this)).compareTo(p.ONE))return!1;if(0!=l.compareTo(i))return!1}}return!0},p.prototype.clone=function t(){var e=u();return this.copyTo(e),e},p.prototype.intValue=function t(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return -1}else if(1==this.t)return this[0];else if(0==this.t)return 0;return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},p.prototype.byteValue=function t(){return 0==this.t?this.s:this[0]<<24>>24},p.prototype.shortValue=function t(){return 0==this.t?this.s:this[0]<<16>>16},p.prototype.signum=function t(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},p.prototype.toByteArray=function t(){var e=this.t,i=[];i[0]=this.s;var n,o=this.DB-e*this.DB%8,r=0;if(e-- >0)for(o<this.DB&&(n=this[e]>>o)!=(this.s&this.DM)>>o&&(i[r++]=n|this.s<<this.DB-o);e>=0;)o<8?(n=(this[e]&(1<<o)-1)<<8-o,n|=this[--e]>>(o+=this.DB-8)):(n=this[e]>>(o-=8)&255,o<=0&&(o+=this.DB,--e)),(128&n)!=0&&(n|=-256),0==r&&(128&this.s)!=(128&n)&&++r,(r>0||n!=this.s)&&(i[r++]=n);return i},p.prototype.equals=function t(e){return 0==this.compareTo(e)},p.prototype.min=function t(e){return 0>this.compareTo(e)?this:e},p.prototype.max=function t(e){return this.compareTo(e)>0?this:e},p.prototype.and=function t(e){var i=u();return this.bitwiseTo(e,c,i),i},p.prototype.or=function t(e){var i=u();return this.bitwiseTo(e,v,i),i},p.prototype.xor=function t(e){var i=u();return this.bitwiseTo(e,C,i),i},p.prototype.andNot=function t(e){var i=u();return this.bitwiseTo(e,x,i),i},p.prototype.not=function t(){for(var e=u(),i=0;i<this.t;++i)e[i]=this.DM&~this[i];return e.t=this.t,e.s=~this.s,e},p.prototype.shiftLeft=function t(e){var i=u();return e<0?this.rShiftTo(-e,i):this.lShiftTo(e,i),i},p.prototype.shiftRight=function t(e){var i=u();return e<0?this.lShiftTo(-e,i):this.rShiftTo(e,i),i},p.prototype.getLowestSetBit=function t(){for(var e=0;e<this.t;++e)if(0!=this[e])return e*this.DB+I(this[e]);return this.s<0?this.t*this.DB:-1},p.prototype.bitCount=function t(){for(var e=0,i=this.s&this.DM,n=0;n<this.t;++n)e+=_(this[n]^i);return e},p.prototype.testBit=function t(e){var i=Math.floor(e/this.DB);return i>=this.t?0!=this.s:(this[i]&1<<e%this.DB)!=0},p.prototype.setBit=function t(e){return this.changeBit(e,v)},p.prototype.clearBit=function t(e){return this.changeBit(e,x)},p.prototype.flipBit=function t(e){return this.changeBit(e,C)},p.prototype.add=function t(e){var i=u();return this.addTo(e,i),i},p.prototype.subtract=function t(e){var i=u();return this.subTo(e,i),i},p.prototype.multiply=function t(e){var i=u();return this.multiplyTo(e,i),i},p.prototype.divide=function t(e){var i=u();return this.divRemTo(e,i,null),i},p.prototype.remainder=function t(e){var i=u();return this.divRemTo(e,null,i),i},p.prototype.divideAndRemainder=function t(e){var i=u(),n=u();return this.divRemTo(e,i,n),[i,n]},p.prototype.modPow=function t(e,i){var n,o,r=e.bitLength(),s=P(1);if(r<=0)return s;n=r<18?1:r<48?3:r<144?4:r<768?5:6,o=r<8?new m(i):i.isEven()?new T(i):new $(i);var l=[],p=3,h=n-1,a=(1<<n)-1;if(l[1]=o.convert(this),n>1){var f=u();for(o.sqrTo(l[1],f);p<=a;)l[p]=u(),o.mulTo(f,l[p-2],l[p]),p+=2}var y,c,v=e.t-1,C=!0,x=u();for(r=d(e[v])-1;v>=0;){for(r>=h?y=e[v]>>r-h&a:(y=(e[v]&(1<<r+1)-1)<<h-r,v>0&&(y|=e[v-1]>>this.DB+r-h)),p=n;(1&y)==0;)y>>=1,--p;if((r-=p)<0&&(r+=this.DB,--v),C)l[y].copyTo(s),C=!1;else{for(;p>1;)o.sqrTo(s,x),o.sqrTo(x,s),p-=2;p>0?o.sqrTo(s,x):(c=s,s=x,x=c),o.mulTo(x,l[y],s)}for(;v>=0&&(e[v]&1<<r)==0;)o.sqrTo(s,x),c=s,s=x,x=c,--r<0&&(r=this.DB-1,--v)}return o.revert(s)},p.prototype.modInverse=function t(e){var i=e.isEven();if(this.isEven()&&i||0==e.signum())return p.ZERO;for(var n=e.clone(),o=this.clone(),r=P(1),s=P(0),l=P(0),u=P(1);0!=n.signum();){for(;n.isEven();)n.rShiftTo(1,n),i?(r.isEven()&&s.isEven()||(r.addTo(this,r),s.subTo(e,s)),r.rShiftTo(1,r)):s.isEven()||s.subTo(e,s),s.rShiftTo(1,s);for(;o.isEven();)o.rShiftTo(1,o),i?(l.isEven()&&u.isEven()||(l.addTo(this,l),u.subTo(e,u)),l.rShiftTo(1,l)):u.isEven()||u.subTo(e,u),u.rShiftTo(1,u);n.compareTo(o)>=0?(n.subTo(o,n),i&&r.subTo(l,r),s.subTo(u,s)):(o.subTo(n,o),i&&l.subTo(r,l),u.subTo(s,u))}return 0!=o.compareTo(p.ONE)?p.ZERO:u.compareTo(e)>=0?u.subtract(e):0>u.signum()&&(u.addTo(e,u),0>u.signum())?u.add(e):u},p.prototype.pow=function t(e){return this.exp(e,new L)},p.prototype.gcd=function t(e){var i=this.s<0?this.negate():this.clone(),n=e.s<0?e.negate():e.clone();if(0>i.compareTo(n)){var o=i;i=n,n=o}var r=i.getLowestSetBit(),s=n.getLowestSetBit();if(s<0)return i;for(r<s&&(s=r),s>0&&(i.rShiftTo(s,i),n.rShiftTo(s,n));i.signum()>0;)(r=i.getLowestSetBit())>0&&i.rShiftTo(r,i),(r=n.getLowestSetBit())>0&&n.rShiftTo(r,n),i.compareTo(n)>=0?(i.subTo(n,i),i.rShiftTo(1,i)):(n.subTo(i,n),n.rShiftTo(1,n));return s>0&&n.lShiftTo(s,n),n},p.prototype.isProbablePrime=function t(e){var i,n=this.abs();if(1==n.t&&n[0]<=X[X.length-1]){for(i=0;i<X.length;++i)if(n[0]==X[i])return!0;return!1}if(n.isEven())return!1;for(i=1;i<X.length;){for(var o=X[i],r=i+1;r<X.length&&o<Y;)o*=X[r++];for(o=n.modInt(o);i<r;)if(o%X[i++]==0)return!1}return n.millerRabin(e)},p.prototype.square=function t(){var e=u();return this.squareTo(e),e};var N=p;N.prototype.IsNegative=function(){return -1==this.compareTo(N.ZERO)},N.op_Equality=function(t,e){return 0==t.compareTo(e)},N.op_Inequality=function(t,e){return 0!=t.compareTo(e)},N.op_GreaterThan=function(t,e){return t.compareTo(e)>0},N.op_LessThan=function(t,e){return 0>t.compareTo(e)},N.op_Addition=function(t,e){return new N(t,void 0,void 0).add(new N(e,void 0,void 0))},N.op_Subtraction=function(t,e){return new N(t,void 0,void 0).subtract(new N(e,void 0,void 0))},N.Int128Mul=function(t,e){return new N(t,void 0,void 0).multiply(new N(e,void 0,void 0))},N.op_Division=function(t,e){return t.divide(e)},N.prototype.ToDouble=function(){return parseFloat(this.toString())};var O=function(t,e){var i;if(void 0===Object.getOwnPropertyNames){for(i in e.prototype)(void 0===t.prototype[i]||t.prototype[i]===Object.prototype[i])&&(t.prototype[i]=e.prototype[i]);for(i in e)void 0===t[i]&&(t[i]=e[i]);t.$baseCtor=e}else{for(var n=Object.getOwnPropertyNames(e.prototype),o=0;o<n.length;o++)void 0===Object.getOwnPropertyDescriptor(t.prototype,n[o])&&Object.defineProperty(t.prototype,n[o],Object.getOwnPropertyDescriptor(e.prototype,n[o]));for(i in e)void 0===t[i]&&(t[i]=e[i]);t.$baseCtor=e}};o.Path=function(){return[]},o.Path.prototype.push=Array.prototype.push,o.Paths=function(){return[]},o.Paths.prototype.push=Array.prototype.push,o.DoublePoint=function(){var t=arguments;this.X=0,this.Y=0,1===t.length?(this.X=t[0].X,this.Y=t[0].Y):2===t.length&&(this.X=t[0],this.Y=t[1])},o.DoublePoint0=function(){this.X=0,this.Y=0},o.DoublePoint0.prototype=o.DoublePoint.prototype,o.DoublePoint1=function(t){this.X=t.X,this.Y=t.Y},o.DoublePoint1.prototype=o.DoublePoint.prototype,o.DoublePoint2=function(t,e){this.X=t,this.Y=e},o.DoublePoint2.prototype=o.DoublePoint.prototype,o.PolyNode=function(){this.m_Parent=null,this.m_polygon=new o.Path,this.m_Index=0,this.m_jointype=0,this.m_endtype=0,this.m_Childs=[],this.IsOpen=!1},o.PolyNode.prototype.IsHoleNode=function(){for(var t=!0,e=this.m_Parent;null!==e;)t=!t,e=e.m_Parent;return t},o.PolyNode.prototype.ChildCount=function(){return this.m_Childs.length},o.PolyNode.prototype.Contour=function(){return this.m_polygon},o.PolyNode.prototype.AddChild=function(t){var e=this.m_Childs.length;this.m_Childs.push(t),t.m_Parent=this,t.m_Index=e},o.PolyNode.prototype.GetNext=function(){return this.m_Childs.length>0?this.m_Childs[0]:this.GetNextSiblingUp()},o.PolyNode.prototype.GetNextSiblingUp=function(){return null===this.m_Parent?null:this.m_Index===this.m_Parent.m_Childs.length-1?this.m_Parent.GetNextSiblingUp():this.m_Parent.m_Childs[this.m_Index+1]},o.PolyNode.prototype.Childs=function(){return this.m_Childs},o.PolyNode.prototype.Parent=function(){return this.m_Parent},o.PolyNode.prototype.IsHole=function(){return this.IsHoleNode()},o.PolyTree=function(){this.m_AllPolys=[],o.PolyNode.call(this)},o.PolyTree.prototype.Clear=function(){for(var t=0,e=this.m_AllPolys.length;t<e;t++)this.m_AllPolys[t]=null;this.m_AllPolys.length=0,this.m_Childs.length=0},o.PolyTree.prototype.GetFirst=function(){return this.m_Childs.length>0?this.m_Childs[0]:null},o.PolyTree.prototype.Total=function(){var t=this.m_AllPolys.length;return t>0&&this.m_Childs[0]!==this.m_AllPolys[0]&&t--,t},O(o.PolyTree,o.PolyNode),o.Math_Abs_Int64=o.Math_Abs_Int32=o.Math_Abs_Double=function(t){return Math.abs(t)},o.Math_Max_Int32_Int32=function(t,e){return Math.max(t,e)},l.msie||l.opera||l.safari?o.Cast_Int32=function(t){return 0|t}:o.Cast_Int32=function(t){return~~t},void 0===Number.toInteger&&(Number.toInteger=null),l.chrome?o.Cast_Int64=function(t){return t<-2147483648||t>2147483647?t<0?Math.ceil(t):Math.floor(t):~~t}:l.firefox&&"function"==typeof Number.toInteger?o.Cast_Int64=function(t){return Number.toInteger(t)}:l.msie7||l.msie8?o.Cast_Int64=function(t){return parseInt(t,10)}:l.msie?o.Cast_Int64=function(t){return t<-2147483648||t>2147483647?t<0?Math.ceil(t):Math.floor(t):0|t}:o.Cast_Int64=function(t){return t<0?Math.ceil(t):Math.floor(t)},o.Clear=function(t){t.length=0},o.PI=3.141592653589793,o.PI2=6.283185307179586,o.IntPoint=function(){var t=arguments,e=t.length;if(this.X=0,this.Y=0,o.use_xyz){if(this.Z=0,3===e)this.X=t[0],this.Y=t[1],this.Z=t[2];else if(2===e)this.X=t[0],this.Y=t[1],this.Z=0;else if(1===e){if(t[0]instanceof o.DoublePoint){var i=t[0];this.X=o.Clipper.Round(i.X),this.Y=o.Clipper.Round(i.Y),this.Z=0}else{var n=t[0];void 0===n.Z&&(n.Z=0),this.X=n.X,this.Y=n.Y,this.Z=n.Z}}else this.X=0,this.Y=0,this.Z=0}else if(2===e)this.X=t[0],this.Y=t[1];else if(1===e){if(t[0]instanceof o.DoublePoint){var i=t[0];this.X=o.Clipper.Round(i.X),this.Y=o.Clipper.Round(i.Y)}else{var n=t[0];this.X=n.X,this.Y=n.Y}}else this.X=0,this.Y=0},o.IntPoint.op_Equality=function(t,e){return t.X===e.X&&t.Y===e.Y},o.IntPoint.op_Inequality=function(t,e){return t.X!==e.X||t.Y!==e.Y},o.IntPoint0=function(){this.X=0,this.Y=0,o.use_xyz&&(this.Z=0)},o.IntPoint0.prototype=o.IntPoint.prototype,o.IntPoint1=function(t){this.X=t.X,this.Y=t.Y,o.use_xyz&&(void 0===t.Z?this.Z=0:this.Z=t.Z)},o.IntPoint1.prototype=o.IntPoint.prototype,o.IntPoint1dp=function(t){this.X=o.Clipper.Round(t.X),this.Y=o.Clipper.Round(t.Y),o.use_xyz&&(this.Z=0)},o.IntPoint1dp.prototype=o.IntPoint.prototype,o.IntPoint2=function(t,e,i){this.X=t,this.Y=e,o.use_xyz&&(void 0===i?this.Z=0:this.Z=i)},o.IntPoint2.prototype=o.IntPoint.prototype,o.IntRect=function(){var t=arguments,e=t.length;if(4===e)this.left=t[0],this.top=t[1],this.right=t[2],this.bottom=t[3];else if(1===e){var i=t[0];this.left=i.left,this.top=i.top,this.right=i.right,this.bottom=i.bottom}else this.left=0,this.top=0,this.right=0,this.bottom=0},o.IntRect0=function(){this.left=0,this.top=0,this.right=0,this.bottom=0},o.IntRect0.prototype=o.IntRect.prototype,o.IntRect1=function(t){this.left=t.left,this.top=t.top,this.right=t.right,this.bottom=t.bottom},o.IntRect1.prototype=o.IntRect.prototype,o.IntRect4=function(t,e,i,n){this.left=t,this.top=e,this.right=i,this.bottom=n},o.IntRect4.prototype=o.IntRect.prototype,o.ClipType={ctIntersection:0,ctUnion:1,ctDifference:2,ctXor:3},o.PolyType={ptSubject:0,ptClip:1},o.PolyFillType={pftEvenOdd:0,pftNonZero:1,pftPositive:2,pftNegative:3},o.JoinType={jtSquare:0,jtRound:1,jtMiter:2},o.EndType={etOpenSquare:0,etOpenRound:1,etOpenButt:2,etClosedLine:3,etClosedPolygon:4},o.EdgeSide={esLeft:0,esRight:1},o.Direction={dRightToLeft:0,dLeftToRight:1},o.TEdge=function(){this.Bot=new o.IntPoint0,this.Curr=new o.IntPoint0,this.Top=new o.IntPoint0,this.Delta=new o.IntPoint0,this.Dx=0,this.PolyTyp=o.PolyType.ptSubject,this.Side=o.EdgeSide.esLeft,this.WindDelta=0,this.WindCnt=0,this.WindCnt2=0,this.OutIdx=0,this.Next=null,this.Prev=null,this.NextInLML=null,this.NextInAEL=null,this.PrevInAEL=null,this.NextInSEL=null,this.PrevInSEL=null},o.IntersectNode=function(){this.Edge1=null,this.Edge2=null,this.Pt=new o.IntPoint0},o.MyIntersectNodeSort=function(){},o.MyIntersectNodeSort.Compare=function(t,e){var i=e.Pt.Y-t.Pt.Y;return i>0?1:i<0?-1:0},o.LocalMinima=function(){this.Y=0,this.LeftBound=null,this.RightBound=null,this.Next=null},o.Scanbeam=function(){this.Y=0,this.Next=null},o.Maxima=function(){this.X=0,this.Next=null,this.Prev=null},o.OutRec=function(){this.Idx=0,this.IsHole=!1,this.IsOpen=!1,this.FirstLeft=null,this.Pts=null,this.BottomPt=null,this.PolyNode=null},o.OutPt=function(){this.Idx=0,this.Pt=new o.IntPoint0,this.Next=null,this.Prev=null},o.Join=function(){this.OutPt1=null,this.OutPt2=null,this.OffPt=new o.IntPoint0},o.ClipperBase=function(){this.m_MinimaList=null,this.m_CurrentLM=null,this.m_edges=[],this.m_UseFullRange=!1,this.m_HasOpenPaths=!1,this.PreserveCollinear=!1,this.m_Scanbeam=null,this.m_PolyOuts=null,this.m_ActiveEdges=null},o.ClipperBase.horizontal=-9007199254740992,o.ClipperBase.Skip=-2,o.ClipperBase.Unassigned=-1,o.ClipperBase.tolerance=1e-20,o.ClipperBase.loRange=47453132,o.ClipperBase.hiRange=0xfffffffffffff,o.ClipperBase.near_zero=function(t){return t>-o.ClipperBase.tolerance&&t<o.ClipperBase.tolerance},o.ClipperBase.IsHorizontal=function(t){return 0===t.Delta.Y},o.ClipperBase.prototype.PointIsVertex=function(t,e){var i=e;do{if(o.IntPoint.op_Equality(i.Pt,t))return!0;i=i.Next}while(i!==e);return!1},o.ClipperBase.prototype.PointOnLineSegment=function(t,e,i,n){return n?t.X===e.X&&t.Y===e.Y||t.X===i.X&&t.Y===i.Y||t.X>e.X==t.X<i.X&&t.Y>e.Y==t.Y<i.Y&&N.op_Equality(N.Int128Mul(t.X-e.X,i.Y-e.Y),N.Int128Mul(i.X-e.X,t.Y-e.Y)):t.X===e.X&&t.Y===e.Y||t.X===i.X&&t.Y===i.Y||t.X>e.X==t.X<i.X&&t.Y>e.Y==t.Y<i.Y&&(t.X-e.X)*(i.Y-e.Y)==(i.X-e.X)*(t.Y-e.Y)},o.ClipperBase.prototype.PointOnPolygon=function(t,e,i){for(var n=e;;){if(this.PointOnLineSegment(t,n.Pt,n.Next.Pt,i))return!0;if((n=n.Next)===e)break}return!1},o.ClipperBase.prototype.SlopesEqual=o.ClipperBase.SlopesEqual=function(){var t,e,i,n,r,s,l,p=arguments,u=p.length;return 3===u?(t=p[0],e=p[1],l=p[2])?N.op_Equality(N.Int128Mul(t.Delta.Y,e.Delta.X),N.Int128Mul(t.Delta.X,e.Delta.Y)):o.Cast_Int64(t.Delta.Y*e.Delta.X)===o.Cast_Int64(t.Delta.X*e.Delta.Y):4===u?(i=p[0],n=p[1],r=p[2],l=p[3])?N.op_Equality(N.Int128Mul(i.Y-n.Y,n.X-r.X),N.Int128Mul(i.X-n.X,n.Y-r.Y)):o.Cast_Int64((i.Y-n.Y)*(n.X-r.X))-o.Cast_Int64((i.X-n.X)*(n.Y-r.Y))==0:(i=p[0],n=p[1],r=p[2],s=p[3],l=p[4])?N.op_Equality(N.Int128Mul(i.Y-n.Y,r.X-s.X),N.Int128Mul(i.X-n.X,r.Y-s.Y)):o.Cast_Int64((i.Y-n.Y)*(r.X-s.X))-o.Cast_Int64((i.X-n.X)*(r.Y-s.Y))==0},o.ClipperBase.SlopesEqual3=function(t,e,i){return i?N.op_Equality(N.Int128Mul(t.Delta.Y,e.Delta.X),N.Int128Mul(t.Delta.X,e.Delta.Y)):o.Cast_Int64(t.Delta.Y*e.Delta.X)===o.Cast_Int64(t.Delta.X*e.Delta.Y)},o.ClipperBase.SlopesEqual4=function(t,e,i,n){return n?N.op_Equality(N.Int128Mul(t.Y-e.Y,e.X-i.X),N.Int128Mul(t.X-e.X,e.Y-i.Y)):o.Cast_Int64((t.Y-e.Y)*(e.X-i.X))-o.Cast_Int64((t.X-e.X)*(e.Y-i.Y))==0},o.ClipperBase.SlopesEqual5=function(t,e,i,n,r){return r?N.op_Equality(N.Int128Mul(t.Y-e.Y,i.X-n.X),N.Int128Mul(t.X-e.X,i.Y-n.Y)):o.Cast_Int64((t.Y-e.Y)*(i.X-n.X))-o.Cast_Int64((t.X-e.X)*(i.Y-n.Y))==0},o.ClipperBase.prototype.Clear=function(){this.DisposeLocalMinimaList();for(var t=0,e=this.m_edges.length;t<e;++t){for(var i=0,n=this.m_edges[t].length;i<n;++i)this.m_edges[t][i]=null;o.Clear(this.m_edges[t])}o.Clear(this.m_edges),this.m_UseFullRange=!1,this.m_HasOpenPaths=!1},o.ClipperBase.prototype.DisposeLocalMinimaList=function(){for(;null!==this.m_MinimaList;){var t=this.m_MinimaList.Next;this.m_MinimaList=null,this.m_MinimaList=t}this.m_CurrentLM=null},o.ClipperBase.prototype.RangeTest=function(t,e){e.Value?(t.X>o.ClipperBase.hiRange||t.Y>o.ClipperBase.hiRange||-t.X>o.ClipperBase.hiRange||-t.Y>o.ClipperBase.hiRange)&&o.Error("Coordinate outside allowed range in RangeTest()."):(t.X>o.ClipperBase.loRange||t.Y>o.ClipperBase.loRange||-t.X>o.ClipperBase.loRange||-t.Y>o.ClipperBase.loRange)&&(e.Value=!0,this.RangeTest(t,e))},o.ClipperBase.prototype.InitEdge=function(t,e,i,n){t.Next=e,t.Prev=i,t.Curr.X=n.X,t.Curr.Y=n.Y,o.use_xyz&&(t.Curr.Z=n.Z),t.OutIdx=-1},o.ClipperBase.prototype.InitEdge2=function(t,e){t.Curr.Y>=t.Next.Curr.Y?(t.Bot.X=t.Curr.X,t.Bot.Y=t.Curr.Y,o.use_xyz&&(t.Bot.Z=t.Curr.Z),t.Top.X=t.Next.Curr.X,t.Top.Y=t.Next.Curr.Y,o.use_xyz&&(t.Top.Z=t.Next.Curr.Z)):(t.Top.X=t.Curr.X,t.Top.Y=t.Curr.Y,o.use_xyz&&(t.Top.Z=t.Curr.Z),t.Bot.X=t.Next.Curr.X,t.Bot.Y=t.Next.Curr.Y,o.use_xyz&&(t.Bot.Z=t.Next.Curr.Z)),this.SetDx(t),t.PolyTyp=e},o.ClipperBase.prototype.FindNextLocMin=function(t){for(var e;;){for(;o.IntPoint.op_Inequality(t.Bot,t.Prev.Bot)||o.IntPoint.op_Equality(t.Curr,t.Top);)t=t.Next;if(t.Dx!==o.ClipperBase.horizontal&&t.Prev.Dx!==o.ClipperBase.horizontal)break;for(;t.Prev.Dx===o.ClipperBase.horizontal;)t=t.Prev;for(e=t;t.Dx===o.ClipperBase.horizontal;)t=t.Next;if(t.Top.Y!==t.Prev.Bot.Y){e.Prev.Bot.X<t.Bot.X&&(t=e);break}}return t},o.ClipperBase.prototype.ProcessBound=function(t,e){var i,n,r=t;if(r.OutIdx===o.ClipperBase.Skip){if(t=r,e){for(;t.Top.Y===t.Next.Bot.Y;)t=t.Next;for(;t!==r&&t.Dx===o.ClipperBase.horizontal;)t=t.Prev}else{for(;t.Top.Y===t.Prev.Bot.Y;)t=t.Prev;for(;t!==r&&t.Dx===o.ClipperBase.horizontal;)t=t.Next}if(t===r)r=e?t.Next:t.Prev;else{t=e?r.Next:r.Prev;var s=new o.LocalMinima;s.Next=null,s.Y=t.Bot.Y,s.LeftBound=null,s.RightBound=t,t.WindDelta=0,r=this.ProcessBound(t,e),this.InsertLocalMinima(s)}return r}if(t.Dx===o.ClipperBase.horizontal&&((i=e?t.Prev:t.Next).Dx===o.ClipperBase.horizontal?i.Bot.X!==t.Bot.X&&i.Top.X!==t.Bot.X&&this.ReverseHorizontal(t):i.Bot.X!==t.Bot.X&&this.ReverseHorizontal(t)),i=t,e){for(;r.Top.Y===r.Next.Bot.Y&&r.Next.OutIdx!==o.ClipperBase.Skip;)r=r.Next;if(r.Dx===o.ClipperBase.horizontal&&r.Next.OutIdx!==o.ClipperBase.Skip){for(n=r;n.Prev.Dx===o.ClipperBase.horizontal;)n=n.Prev;n.Prev.Top.X>r.Next.Top.X&&(r=n.Prev)}for(;t!==r;)t.NextInLML=t.Next,t.Dx===o.ClipperBase.horizontal&&t!==i&&t.Bot.X!==t.Prev.Top.X&&this.ReverseHorizontal(t),t=t.Next;t.Dx===o.ClipperBase.horizontal&&t!==i&&t.Bot.X!==t.Prev.Top.X&&this.ReverseHorizontal(t),r=r.Next}else{for(;r.Top.Y===r.Prev.Bot.Y&&r.Prev.OutIdx!==o.ClipperBase.Skip;)r=r.Prev;if(r.Dx===o.ClipperBase.horizontal&&r.Prev.OutIdx!==o.ClipperBase.Skip){for(n=r;n.Next.Dx===o.ClipperBase.horizontal;)n=n.Next;(n.Next.Top.X===r.Prev.Top.X||n.Next.Top.X>r.Prev.Top.X)&&(r=n.Next)}for(;t!==r;)t.NextInLML=t.Prev,t.Dx===o.ClipperBase.horizontal&&t!==i&&t.Bot.X!==t.Next.Top.X&&this.ReverseHorizontal(t),t=t.Prev;t.Dx===o.ClipperBase.horizontal&&t!==i&&t.Bot.X!==t.Next.Top.X&&this.ReverseHorizontal(t),r=r.Prev}return r},o.ClipperBase.prototype.AddPath=function(t,e,i){o.use_lines?i||e!==o.PolyType.ptClip||o.Error("AddPath: Open paths must be subject."):i||o.Error("AddPath: Open paths have been disabled.");var n,r=t.length-1;if(i)for(;r>0&&o.IntPoint.op_Equality(t[r],t[0]);)--r;for(;r>0&&o.IntPoint.op_Equality(t[r],t[r-1]);)--r;if(i&&r<2||!i&&r<1)return!1;for(var s=[],l=0;l<=r;l++)s.push(new o.TEdge);var p=!0;s[1].Curr.X=t[1].X,s[1].Curr.Y=t[1].Y,o.use_xyz&&(s[1].Curr.Z=t[1].Z);var u={Value:this.m_UseFullRange};this.RangeTest(t[0],u),this.m_UseFullRange=u.Value,u.Value=this.m_UseFullRange,this.RangeTest(t[r],u),this.m_UseFullRange=u.Value,this.InitEdge(s[0],s[1],s[r],t[0]),this.InitEdge(s[r],s[0],s[r-1],t[r]);for(var l=r-1;l>=1;--l)u.Value=this.m_UseFullRange,this.RangeTest(t[l],u),this.m_UseFullRange=u.Value,this.InitEdge(s[l],s[l+1],s[l-1],t[l]);for(var h=s[0],a=h,f=h;;){if(a.Curr===a.Next.Curr&&(i||a.Next!==h)){if(a===a.Next)break;a===h&&(h=a.Next),f=a=this.RemoveEdge(a);continue}if(a.Prev===a.Next)break;if(i&&o.ClipperBase.SlopesEqual4(a.Prev.Curr,a.Curr,a.Next.Curr,this.m_UseFullRange)&&(!this.PreserveCollinear||!this.Pt2IsBetweenPt1AndPt3(a.Prev.Curr,a.Curr,a.Next.Curr))){a===h&&(h=a.Next),f=a=(a=this.RemoveEdge(a)).Prev;continue}if((a=a.Next)===f||!i&&a.Next===h)break}if(!i&&a===a.Next||i&&a.Prev===a.Next)return!1;i||(this.m_HasOpenPaths=!0,h.Prev.OutIdx=o.ClipperBase.Skip),a=h;do this.InitEdge2(a,e),a=a.Next,p&&a.Curr.Y!==h.Curr.Y&&(p=!1);while(a!==h);if(p){if(i)return!1;a.Prev.OutIdx=o.ClipperBase.Skip;var P=new o.LocalMinima;for(P.Next=null,P.Y=a.Bot.Y,P.LeftBound=null,P.RightBound=a,P.RightBound.Side=o.EdgeSide.esRight,P.RightBound.WindDelta=0;a.Bot.X!==a.Prev.Top.X&&this.ReverseHorizontal(a),a.Next.OutIdx!==o.ClipperBase.Skip;)a.NextInLML=a.Next,a=a.Next;return this.InsertLocalMinima(P),this.m_edges.push(s),!0}this.m_edges.push(s);var d=null;for(o.IntPoint.op_Equality(a.Prev.Bot,a.Prev.Top)&&(a=a.Next);(a=this.FindNextLocMin(a))!==d;){null===d&&(d=a);var P=new o.LocalMinima;P.Next=null,P.Y=a.Bot.Y,a.Dx<a.Prev.Dx?(P.LeftBound=a.Prev,P.RightBound=a,n=!1):(P.LeftBound=a,P.RightBound=a.Prev,n=!0),P.LeftBound.Side=o.EdgeSide.esLeft,P.RightBound.Side=o.EdgeSide.esRight,i?P.LeftBound.Next===P.RightBound?P.LeftBound.WindDelta=-1:P.LeftBound.WindDelta=1:P.LeftBound.WindDelta=0,P.RightBound.WindDelta=-P.LeftBound.WindDelta,(a=this.ProcessBound(P.LeftBound,n)).OutIdx===o.ClipperBase.Skip&&(a=this.ProcessBound(a,n));var m=this.ProcessBound(P.RightBound,!n);m.OutIdx===o.ClipperBase.Skip&&(m=this.ProcessBound(m,!n)),P.LeftBound.OutIdx===o.ClipperBase.Skip?P.LeftBound=null:P.RightBound.OutIdx===o.ClipperBase.Skip&&(P.RightBound=null),this.InsertLocalMinima(P),n||(a=m)}return!0},o.ClipperBase.prototype.AddPaths=function(t,e,i){for(var n=!1,o=0,r=t.length;o<r;++o)this.AddPath(t[o],e,i)&&(n=!0);return n},o.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3=function(t,e,i){return!(o.IntPoint.op_Equality(t,i)||o.IntPoint.op_Equality(t,e)||o.IntPoint.op_Equality(i,e))&&(t.X!==i.X?e.X>t.X==e.X<i.X:e.Y>t.Y==e.Y<i.Y)},o.ClipperBase.prototype.RemoveEdge=function(t){t.Prev.Next=t.Next,t.Next.Prev=t.Prev;var e=t.Next;return t.Prev=null,e},o.ClipperBase.prototype.SetDx=function(t){t.Delta.X=t.Top.X-t.Bot.X,t.Delta.Y=t.Top.Y-t.Bot.Y,0===t.Delta.Y?t.Dx=o.ClipperBase.horizontal:t.Dx=t.Delta.X/t.Delta.Y},o.ClipperBase.prototype.InsertLocalMinima=function(t){if(null===this.m_MinimaList)this.m_MinimaList=t;else if(t.Y>=this.m_MinimaList.Y)t.Next=this.m_MinimaList,this.m_MinimaList=t;else{for(var e=this.m_MinimaList;null!==e.Next&&t.Y<e.Next.Y;)e=e.Next;t.Next=e.Next,e.Next=t}},o.ClipperBase.prototype.PopLocalMinima=function(t,e){return e.v=this.m_CurrentLM,null!==this.m_CurrentLM&&this.m_CurrentLM.Y===t&&(this.m_CurrentLM=this.m_CurrentLM.Next,!0)},o.ClipperBase.prototype.ReverseHorizontal=function(t){var e=t.Top.X;t.Top.X=t.Bot.X,t.Bot.X=e,o.use_xyz&&(e=t.Top.Z,t.Top.Z=t.Bot.Z,t.Bot.Z=e)},o.ClipperBase.prototype.Reset=function(){if(this.m_CurrentLM=this.m_MinimaList,null!==this.m_CurrentLM){this.m_Scanbeam=null;for(var t=this.m_MinimaList;null!==t;){this.InsertScanbeam(t.Y);var e=t.LeftBound;null!==e&&(e.Curr.X=e.Bot.X,e.Curr.Y=e.Bot.Y,o.use_xyz&&(e.Curr.Z=e.Bot.Z),e.OutIdx=o.ClipperBase.Unassigned),null!==(e=t.RightBound)&&(e.Curr.X=e.Bot.X,e.Curr.Y=e.Bot.Y,o.use_xyz&&(e.Curr.Z=e.Bot.Z),e.OutIdx=o.ClipperBase.Unassigned),t=t.Next}this.m_ActiveEdges=null}},o.ClipperBase.prototype.InsertScanbeam=function(t){if(null===this.m_Scanbeam)this.m_Scanbeam=new o.Scanbeam,this.m_Scanbeam.Next=null,this.m_Scanbeam.Y=t;else if(t>this.m_Scanbeam.Y){var e=new o.Scanbeam;e.Y=t,e.Next=this.m_Scanbeam,this.m_Scanbeam=e}else{for(var i=this.m_Scanbeam;null!==i.Next&&t<=i.Next.Y;)i=i.Next;if(t===i.Y)return;var n=new o.Scanbeam;n.Y=t,n.Next=i.Next,i.Next=n}},o.ClipperBase.prototype.PopScanbeam=function(t){return null===this.m_Scanbeam?(t.v=0,!1):(t.v=this.m_Scanbeam.Y,this.m_Scanbeam=this.m_Scanbeam.Next,!0)},o.ClipperBase.prototype.LocalMinimaPending=function(){return null!==this.m_CurrentLM},o.ClipperBase.prototype.CreateOutRec=function(){var t=new o.OutRec;return t.Idx=o.ClipperBase.Unassigned,t.IsHole=!1,t.IsOpen=!1,t.FirstLeft=null,t.Pts=null,t.BottomPt=null,t.PolyNode=null,this.m_PolyOuts.push(t),t.Idx=this.m_PolyOuts.length-1,t},o.ClipperBase.prototype.DisposeOutRec=function(t){var e=this.m_PolyOuts[t];e.Pts=null,e=null,this.m_PolyOuts[t]=null},o.ClipperBase.prototype.UpdateEdgeIntoAEL=function(t){null===t.NextInLML&&o.Error("UpdateEdgeIntoAEL: invalid call");var e=t.PrevInAEL,i=t.NextInAEL;return t.NextInLML.OutIdx=t.OutIdx,null!==e?e.NextInAEL=t.NextInLML:this.m_ActiveEdges=t.NextInLML,null!==i&&(i.PrevInAEL=t.NextInLML),t.NextInLML.Side=t.Side,t.NextInLML.WindDelta=t.WindDelta,t.NextInLML.WindCnt=t.WindCnt,t.NextInLML.WindCnt2=t.WindCnt2,(t=t.NextInLML).Curr.X=t.Bot.X,t.Curr.Y=t.Bot.Y,t.PrevInAEL=e,t.NextInAEL=i,o.ClipperBase.IsHorizontal(t)||this.InsertScanbeam(t.Top.Y),t},o.ClipperBase.prototype.SwapPositionsInAEL=function(t,e){if(t.NextInAEL!==t.PrevInAEL&&e.NextInAEL!==e.PrevInAEL){if(t.NextInAEL===e){var i=e.NextInAEL;null!==i&&(i.PrevInAEL=t);var n=t.PrevInAEL;null!==n&&(n.NextInAEL=e),e.PrevInAEL=n,e.NextInAEL=t,t.PrevInAEL=e,t.NextInAEL=i}else if(e.NextInAEL===t){var o=t.NextInAEL;null!==o&&(o.PrevInAEL=e);var r=e.PrevInAEL;null!==r&&(r.NextInAEL=t),t.PrevInAEL=r,t.NextInAEL=e,e.PrevInAEL=t,e.NextInAEL=o}else{var s=t.NextInAEL,l=t.PrevInAEL;t.NextInAEL=e.NextInAEL,null!==t.NextInAEL&&(t.NextInAEL.PrevInAEL=t),t.PrevInAEL=e.PrevInAEL,null!==t.PrevInAEL&&(t.PrevInAEL.NextInAEL=t),e.NextInAEL=s,null!==e.NextInAEL&&(e.NextInAEL.PrevInAEL=e),e.PrevInAEL=l,null!==e.PrevInAEL&&(e.PrevInAEL.NextInAEL=e)}null===t.PrevInAEL?this.m_ActiveEdges=t:null===e.PrevInAEL&&(this.m_ActiveEdges=e)}},o.ClipperBase.prototype.DeleteFromAEL=function(t){var e=t.PrevInAEL,i=t.NextInAEL;(null!==e||null!==i||t===this.m_ActiveEdges)&&(null!==e?e.NextInAEL=i:this.m_ActiveEdges=i,null!==i&&(i.PrevInAEL=e),t.NextInAEL=null,t.PrevInAEL=null)},o.Clipper=function(t){void 0===t&&(t=0),this.m_PolyOuts=null,this.m_ClipType=o.ClipType.ctIntersection,this.m_Scanbeam=null,this.m_Maxima=null,this.m_ActiveEdges=null,this.m_SortedEdges=null,this.m_IntersectList=null,this.m_IntersectNodeComparer=null,this.m_ExecuteLocked=!1,this.m_ClipFillType=o.PolyFillType.pftEvenOdd,this.m_SubjFillType=o.PolyFillType.pftEvenOdd,this.m_Joins=null,this.m_GhostJoins=null,this.m_UsingPolyTree=!1,this.ReverseSolution=!1,this.StrictlySimple=!1,o.ClipperBase.call(this),this.m_Scanbeam=null,this.m_Maxima=null,this.m_ActiveEdges=null,this.m_SortedEdges=null,this.m_IntersectList=[],this.m_IntersectNodeComparer=o.MyIntersectNodeSort.Compare,this.m_ExecuteLocked=!1,this.m_UsingPolyTree=!1,this.m_PolyOuts=[],this.m_Joins=[],this.m_GhostJoins=[],this.ReverseSolution=(1&t)!=0,this.StrictlySimple=(2&t)!=0,this.PreserveCollinear=(4&t)!=0,o.use_xyz&&(this.ZFillFunction=null)},o.Clipper.ioReverseSolution=1,o.Clipper.ioStrictlySimple=2,o.Clipper.ioPreserveCollinear=4,o.Clipper.prototype.Clear=function(){0!==this.m_edges.length&&(this.DisposeAllPolyPts(),o.ClipperBase.prototype.Clear.call(this))},o.Clipper.prototype.InsertMaxima=function(t){var e=new o.Maxima;if(e.X=t,null===this.m_Maxima)this.m_Maxima=e,this.m_Maxima.Next=null,this.m_Maxima.Prev=null;else if(t<this.m_Maxima.X)e.Next=this.m_Maxima,e.Prev=null,this.m_Maxima=e;else{for(var i=this.m_Maxima;null!==i.Next&&t>=i.Next.X;)i=i.Next;if(t===i.X)return;e.Next=i.Next,e.Prev=i,null!==i.Next&&(i.Next.Prev=e),i.Next=e}},o.Clipper.prototype.Execute=function(){var t=arguments,e=t.length,i=t[1]instanceof o.PolyTree;if(4!==e||i){if(4===e&&i){var n=t[0],r=t[1],s=t[2],l=t[3];if(this.m_ExecuteLocked)return!1;this.m_ExecuteLocked=!0,this.m_SubjFillType=s,this.m_ClipFillType=l,this.m_ClipType=n,this.m_UsingPolyTree=!0;try{var p=this.ExecuteInternal();p&&this.BuildResult2(r)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=!1}return p}if(2!==e||i){if(2===e&&i){var n=t[0],r=t[1];return this.Execute(n,r,o.PolyFillType.pftEvenOdd,o.PolyFillType.pftEvenOdd)}}else{var n=t[0],u=t[1];return this.Execute(n,u,o.PolyFillType.pftEvenOdd,o.PolyFillType.pftEvenOdd)}}else{var n=t[0],u=t[1],s=t[2],l=t[3];if(this.m_ExecuteLocked)return!1;this.m_HasOpenPaths&&o.Error("Error: PolyTree struct is needed for open path clipping."),this.m_ExecuteLocked=!0,o.Clear(u),this.m_SubjFillType=s,this.m_ClipFillType=l,this.m_ClipType=n,this.m_UsingPolyTree=!1;try{var p=this.ExecuteInternal();p&&this.BuildResult(u)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=!1}return p}},o.Clipper.prototype.FixHoleLinkage=function(t){if(null!==t.FirstLeft&&(t.IsHole===t.FirstLeft.IsHole||null===t.FirstLeft.Pts)){for(var e=t.FirstLeft;null!==e&&(e.IsHole===t.IsHole||null===e.Pts);)e=e.FirstLeft;t.FirstLeft=e}},o.Clipper.prototype.ExecuteInternal=function(){try{this.Reset(),this.m_SortedEdges=null,this.m_Maxima=null;var t,e,i,n={},o={};if(!this.PopScanbeam(n))return!1;for(this.InsertLocalMinimaIntoAEL(n.v);this.PopScanbeam(o)||this.LocalMinimaPending();){if(this.ProcessHorizontals(),this.m_GhostJoins.length=0,!this.ProcessIntersections(o.v))return!1;this.ProcessEdgesAtTopOfScanbeam(o.v),n.v=o.v,this.InsertLocalMinimaIntoAEL(n.v)}for(e=0,i=this.m_PolyOuts.length;e<i;e++)t=this.m_PolyOuts[e],null===t.Pts||t.IsOpen||(t.IsHole^this.ReverseSolution)!=this.Area$1(t)>0||this.ReversePolyPtLinks(t.Pts);for(this.JoinCommonEdges(),e=0,i=this.m_PolyOuts.length;e<i;e++)t=this.m_PolyOuts[e],null!==t.Pts&&(t.IsOpen?this.FixupOutPolyline(t):this.FixupOutPolygon(t));return this.StrictlySimple&&this.DoSimplePolygons(),!0}finally{this.m_Joins.length=0,this.m_GhostJoins.length=0}},o.Clipper.prototype.DisposeAllPolyPts=function(){for(var t=0,e=this.m_PolyOuts.length;t<e;++t)this.DisposeOutRec(t);o.Clear(this.m_PolyOuts)},o.Clipper.prototype.AddJoin=function(t,e,i){var n=new o.Join;n.OutPt1=t,n.OutPt2=e,n.OffPt.X=i.X,n.OffPt.Y=i.Y,o.use_xyz&&(n.OffPt.Z=i.Z),this.m_Joins.push(n)},o.Clipper.prototype.AddGhostJoin=function(t,e){var i=new o.Join;i.OutPt1=t,i.OffPt.X=e.X,i.OffPt.Y=e.Y,o.use_xyz&&(i.OffPt.Z=e.Z),this.m_GhostJoins.push(i)},o.Clipper.prototype.SetZ=function(t,e,i){null!==this.ZFillFunction&&0===t.Z&&null!==this.ZFillFunction&&(o.IntPoint.op_Equality(t,e.Bot)?t.Z=e.Bot.Z:o.IntPoint.op_Equality(t,e.Top)?t.Z=e.Top.Z:o.IntPoint.op_Equality(t,i.Bot)?t.Z=i.Bot.Z:o.IntPoint.op_Equality(t,i.Top)?t.Z=i.Top.Z:this.ZFillFunction(e.Bot,e.Top,i.Bot,i.Top,t))},o.Clipper.prototype.InsertLocalMinimaIntoAEL=function(t){for(var e,i,n={};this.PopLocalMinima(t,n);){e=n.v.LeftBound,i=n.v.RightBound;var r=null;if(null===e?(this.InsertEdgeIntoAEL(i,null),this.SetWindingCount(i),this.IsContributing(i)&&(r=this.AddOutPt(i,i.Bot))):null===i?(this.InsertEdgeIntoAEL(e,null),this.SetWindingCount(e),this.IsContributing(e)&&(r=this.AddOutPt(e,e.Bot)),this.InsertScanbeam(e.Top.Y)):(this.InsertEdgeIntoAEL(e,null),this.InsertEdgeIntoAEL(i,e),this.SetWindingCount(e),i.WindCnt=e.WindCnt,i.WindCnt2=e.WindCnt2,this.IsContributing(e)&&(r=this.AddLocalMinPoly(e,i,e.Bot)),this.InsertScanbeam(e.Top.Y)),null!==i&&(o.ClipperBase.IsHorizontal(i)?(null!==i.NextInLML&&this.InsertScanbeam(i.NextInLML.Top.Y),this.AddEdgeToSEL(i)):this.InsertScanbeam(i.Top.Y)),null!==e&&null!==i){if(null!==r&&o.ClipperBase.IsHorizontal(i)&&this.m_GhostJoins.length>0&&0!==i.WindDelta)for(var s=0,l=this.m_GhostJoins.length;s<l;s++){var p=this.m_GhostJoins[s];this.HorzSegmentsOverlap(p.OutPt1.Pt.X,p.OffPt.X,i.Bot.X,i.Top.X)&&this.AddJoin(p.OutPt1,r,p.OffPt)}if(e.OutIdx>=0&&null!==e.PrevInAEL&&e.PrevInAEL.Curr.X===e.Bot.X&&e.PrevInAEL.OutIdx>=0&&o.ClipperBase.SlopesEqual5(e.PrevInAEL.Curr,e.PrevInAEL.Top,e.Curr,e.Top,this.m_UseFullRange)&&0!==e.WindDelta&&0!==e.PrevInAEL.WindDelta){var u=this.AddOutPt(e.PrevInAEL,e.Bot);this.AddJoin(r,u,e.Top)}if(e.NextInAEL!==i){if(i.OutIdx>=0&&i.PrevInAEL.OutIdx>=0&&o.ClipperBase.SlopesEqual5(i.PrevInAEL.Curr,i.PrevInAEL.Top,i.Curr,i.Top,this.m_UseFullRange)&&0!==i.WindDelta&&0!==i.PrevInAEL.WindDelta){var u=this.AddOutPt(i.PrevInAEL,i.Bot);this.AddJoin(r,u,i.Top)}var h=e.NextInAEL;if(null!==h)for(;h!==i;)this.IntersectEdges(i,h,e.Curr),h=h.NextInAEL}}}},o.Clipper.prototype.InsertEdgeIntoAEL=function(t,e){if(null===this.m_ActiveEdges)t.PrevInAEL=null,t.NextInAEL=null,this.m_ActiveEdges=t;else if(null===e&&this.E2InsertsBeforeE1(this.m_ActiveEdges,t))t.PrevInAEL=null,t.NextInAEL=this.m_ActiveEdges,this.m_ActiveEdges.PrevInAEL=t,this.m_ActiveEdges=t;else{for(null===e&&(e=this.m_ActiveEdges);null!==e.NextInAEL&&!this.E2InsertsBeforeE1(e.NextInAEL,t);)e=e.NextInAEL;t.NextInAEL=e.NextInAEL,null!==e.NextInAEL&&(e.NextInAEL.PrevInAEL=t),t.PrevInAEL=e,e.NextInAEL=t}},o.Clipper.prototype.E2InsertsBeforeE1=function(t,e){return e.Curr.X!==t.Curr.X?e.Curr.X<t.Curr.X:e.Top.Y>t.Top.Y?e.Top.X<o.Clipper.TopX(t,e.Top.Y):t.Top.X>o.Clipper.TopX(e,t.Top.Y)},o.Clipper.prototype.IsEvenOddFillType=function(t){return t.PolyTyp===o.PolyType.ptSubject?this.m_SubjFillType===o.PolyFillType.pftEvenOdd:this.m_ClipFillType===o.PolyFillType.pftEvenOdd},o.Clipper.prototype.IsEvenOddAltFillType=function(t){return t.PolyTyp===o.PolyType.ptSubject?this.m_ClipFillType===o.PolyFillType.pftEvenOdd:this.m_SubjFillType===o.PolyFillType.pftEvenOdd},o.Clipper.prototype.IsContributing=function(t){var e,i;switch(t.PolyTyp===o.PolyType.ptSubject?(e=this.m_SubjFillType,i=this.m_ClipFillType):(e=this.m_ClipFillType,i=this.m_SubjFillType),e){case o.PolyFillType.pftEvenOdd:if(0===t.WindDelta&&1!==t.WindCnt)return!1;break;case o.PolyFillType.pftNonZero:if(1!==Math.abs(t.WindCnt))return!1;break;case o.PolyFillType.pftPositive:if(1!==t.WindCnt)return!1;break;default:if(-1!==t.WindCnt)return!1}switch(this.m_ClipType){case o.ClipType.ctIntersection:switch(i){case o.PolyFillType.pftEvenOdd:case o.PolyFillType.pftNonZero:return 0!==t.WindCnt2;case o.PolyFillType.pftPositive:return t.WindCnt2>0;default:return t.WindCnt2<0}case o.ClipType.ctUnion:switch(i){case o.PolyFillType.pftEvenOdd:case o.PolyFillType.pftNonZero:return 0===t.WindCnt2;case o.PolyFillType.pftPositive:return t.WindCnt2<=0;default:return t.WindCnt2>=0}case o.ClipType.ctDifference:if(t.PolyTyp===o.PolyType.ptSubject)switch(i){case o.PolyFillType.pftEvenOdd:case o.PolyFillType.pftNonZero:return 0===t.WindCnt2;case o.PolyFillType.pftPositive:return t.WindCnt2<=0;default:return t.WindCnt2>=0}else switch(i){case o.PolyFillType.pftEvenOdd:case o.PolyFillType.pftNonZero:return 0!==t.WindCnt2;case o.PolyFillType.pftPositive:return t.WindCnt2>0;default:return t.WindCnt2<0}case o.ClipType.ctXor:if(0===t.WindDelta)switch(i){case o.PolyFillType.pftEvenOdd:case o.PolyFillType.pftNonZero:return 0===t.WindCnt2;case o.PolyFillType.pftPositive:return t.WindCnt2<=0;default:return t.WindCnt2>=0}}return!0},o.Clipper.prototype.SetWindingCount=function(t){for(var e=t.PrevInAEL;null!==e&&(e.PolyTyp!==t.PolyTyp||0===e.WindDelta);)e=e.PrevInAEL;if(null===e){var i=t.PolyTyp===o.PolyType.ptSubject?this.m_SubjFillType:this.m_ClipFillType;0===t.WindDelta?t.WindCnt=i===o.PolyFillType.pftNegative?-1:1:t.WindCnt=t.WindDelta,t.WindCnt2=0,e=this.m_ActiveEdges}else if(0===t.WindDelta&&this.m_ClipType!==o.ClipType.ctUnion)t.WindCnt=1,t.WindCnt2=e.WindCnt2,e=e.NextInAEL;else if(this.IsEvenOddFillType(t)){if(0===t.WindDelta){for(var n=!0,r=e.PrevInAEL;null!==r;)r.PolyTyp===e.PolyTyp&&0!==r.WindDelta&&(n=!n),r=r.PrevInAEL;t.WindCnt=n?0:1}else t.WindCnt=t.WindDelta;t.WindCnt2=e.WindCnt2,e=e.NextInAEL}else e.WindCnt*e.WindDelta<0?Math.abs(e.WindCnt)>1?e.WindDelta*t.WindDelta<0?t.WindCnt=e.WindCnt:t.WindCnt=e.WindCnt+t.WindDelta:t.WindCnt=0===t.WindDelta?1:t.WindDelta:0===t.WindDelta?t.WindCnt=e.WindCnt<0?e.WindCnt-1:e.WindCnt+1:e.WindDelta*t.WindDelta<0?t.WindCnt=e.WindCnt:t.WindCnt=e.WindCnt+t.WindDelta,t.WindCnt2=e.WindCnt2,e=e.NextInAEL;if(this.IsEvenOddAltFillType(t))for(;e!==t;)0!==e.WindDelta&&(t.WindCnt2=0===t.WindCnt2?1:0),e=e.NextInAEL;else for(;e!==t;)t.WindCnt2+=e.WindDelta,e=e.NextInAEL},o.Clipper.prototype.AddEdgeToSEL=function(t){null===this.m_SortedEdges?(this.m_SortedEdges=t,t.PrevInSEL=null,t.NextInSEL=null):(t.NextInSEL=this.m_SortedEdges,t.PrevInSEL=null,this.m_SortedEdges.PrevInSEL=t,this.m_SortedEdges=t)},o.Clipper.prototype.PopEdgeFromSEL=function(t){if(t.v=this.m_SortedEdges,null===t.v)return!1;var e=t.v;return this.m_SortedEdges=t.v.NextInSEL,null!==this.m_SortedEdges&&(this.m_SortedEdges.PrevInSEL=null),e.NextInSEL=null,e.PrevInSEL=null,!0},o.Clipper.prototype.CopyAELToSEL=function(){var t=this.m_ActiveEdges;for(this.m_SortedEdges=t;null!==t;)t.PrevInSEL=t.PrevInAEL,t.NextInSEL=t.NextInAEL,t=t.NextInAEL},o.Clipper.prototype.SwapPositionsInSEL=function(t,e){if((null!==t.NextInSEL||null!==t.PrevInSEL)&&(null!==e.NextInSEL||null!==e.PrevInSEL)){if(t.NextInSEL===e){var i=e.NextInSEL;null!==i&&(i.PrevInSEL=t);var n=t.PrevInSEL;null!==n&&(n.NextInSEL=e),e.PrevInSEL=n,e.NextInSEL=t,t.PrevInSEL=e,t.NextInSEL=i}else if(e.NextInSEL===t){var i=t.NextInSEL;null!==i&&(i.PrevInSEL=e);var n=e.PrevInSEL;null!==n&&(n.NextInSEL=t),t.PrevInSEL=n,t.NextInSEL=e,e.PrevInSEL=t,e.NextInSEL=i}else{var i=t.NextInSEL,n=t.PrevInSEL;t.NextInSEL=e.NextInSEL,null!==t.NextInSEL&&(t.NextInSEL.PrevInSEL=t),t.PrevInSEL=e.PrevInSEL,null!==t.PrevInSEL&&(t.PrevInSEL.NextInSEL=t),e.NextInSEL=i,null!==e.NextInSEL&&(e.NextInSEL.PrevInSEL=e),e.PrevInSEL=n,null!==e.PrevInSEL&&(e.PrevInSEL.NextInSEL=e)}null===t.PrevInSEL?this.m_SortedEdges=t:null===e.PrevInSEL&&(this.m_SortedEdges=e)}},o.Clipper.prototype.AddLocalMaxPoly=function(t,e,i){this.AddOutPt(t,i),0===e.WindDelta&&this.AddOutPt(e,i),t.OutIdx===e.OutIdx?(t.OutIdx=-1,e.OutIdx=-1):t.OutIdx<e.OutIdx?this.AppendPolygon(t,e):this.AppendPolygon(e,t)},o.Clipper.prototype.AddLocalMinPoly=function(t,e,i){if(o.ClipperBase.IsHorizontal(e)||t.Dx>e.Dx?(n=this.AddOutPt(t,i),e.OutIdx=t.OutIdx,t.Side=o.EdgeSide.esLeft,e.Side=o.EdgeSide.esRight,s=(r=t).PrevInAEL===e?e.PrevInAEL:r.PrevInAEL):(n=this.AddOutPt(e,i),t.OutIdx=e.OutIdx,t.Side=o.EdgeSide.esRight,e.Side=o.EdgeSide.esLeft,s=(r=e).PrevInAEL===t?t.PrevInAEL:r.PrevInAEL),null!==s&&s.OutIdx>=0&&s.Top.Y<i.Y&&r.Top.Y<i.Y){var n,r,s,l=o.Clipper.TopX(s,i.Y),p=o.Clipper.TopX(r,i.Y);if(l===p&&0!==r.WindDelta&&0!==s.WindDelta&&o.ClipperBase.SlopesEqual5(new o.IntPoint2(l,i.Y),s.Top,new o.IntPoint2(p,i.Y),r.Top,this.m_UseFullRange)){var u=this.AddOutPt(s,i);this.AddJoin(n,u,r.Top)}}return n},o.Clipper.prototype.AddOutPt=function(t,e){if(t.OutIdx<0){var i=this.CreateOutRec();i.IsOpen=0===t.WindDelta;var n=new o.OutPt;return i.Pts=n,n.Idx=i.Idx,n.Pt.X=e.X,n.Pt.Y=e.Y,o.use_xyz&&(n.Pt.Z=e.Z),n.Next=n,n.Prev=n,i.IsOpen||this.SetHoleState(t,i),t.OutIdx=i.Idx,n}var i=this.m_PolyOuts[t.OutIdx],r=i.Pts,s=t.Side===o.EdgeSide.esLeft;if(s&&o.IntPoint.op_Equality(e,r.Pt))return r;if(!s&&o.IntPoint.op_Equality(e,r.Prev.Pt))return r.Prev;var n=new o.OutPt;return n.Idx=i.Idx,n.Pt.X=e.X,n.Pt.Y=e.Y,o.use_xyz&&(n.Pt.Z=e.Z),n.Next=r,n.Prev=r.Prev,n.Prev.Next=n,r.Prev=n,s&&(i.Pts=n),n},o.Clipper.prototype.GetLastOutPt=function(t){var e=this.m_PolyOuts[t.OutIdx];return t.Side===o.EdgeSide.esLeft?e.Pts:e.Pts.Prev},o.Clipper.prototype.SwapPoints=function(t,e){var i=new o.IntPoint1(t.Value);t.Value.X=e.Value.X,t.Value.Y=e.Value.Y,o.use_xyz&&(t.Value.Z=e.Value.Z),e.Value.X=i.X,e.Value.Y=i.Y,o.use_xyz&&(e.Value.Z=i.Z)},o.Clipper.prototype.HorzSegmentsOverlap=function(t,e,i,n){var o;return t>e&&(o=t,t=e,e=o),i>n&&(o=i,i=n,n=o),t<n&&i<e},o.Clipper.prototype.SetHoleState=function(t,e){for(var i=t.PrevInAEL,n=null;null!==i;)i.OutIdx>=0&&0!==i.WindDelta&&(null===n?n=i:n.OutIdx===i.OutIdx&&(n=null)),i=i.PrevInAEL;null===n?(e.FirstLeft=null,e.IsHole=!1):(e.FirstLeft=this.m_PolyOuts[n.OutIdx],e.IsHole=!e.FirstLeft.IsHole)},o.Clipper.prototype.GetDx=function(t,e){return t.Y===e.Y?o.ClipperBase.horizontal:(e.X-t.X)/(e.Y-t.Y)},o.Clipper.prototype.FirstIsBottomPt=function(t,e){for(var i=t.Prev;o.IntPoint.op_Equality(i.Pt,t.Pt)&&i!==t;)i=i.Prev;var n=Math.abs(this.GetDx(t.Pt,i.Pt));for(i=t.Next;o.IntPoint.op_Equality(i.Pt,t.Pt)&&i!==t;)i=i.Next;var r=Math.abs(this.GetDx(t.Pt,i.Pt));for(i=e.Prev;o.IntPoint.op_Equality(i.Pt,e.Pt)&&i!==e;)i=i.Prev;var s=Math.abs(this.GetDx(e.Pt,i.Pt));for(i=e.Next;o.IntPoint.op_Equality(i.Pt,e.Pt)&&i!==e;)i=i.Next;var l=Math.abs(this.GetDx(e.Pt,i.Pt));return Math.max(n,r)===Math.max(s,l)&&Math.min(n,r)===Math.min(s,l)?this.Area(t)>0:n>=s&&n>=l||r>=s&&r>=l},o.Clipper.prototype.GetBottomPt=function(t){for(var e=null,i=t.Next;i!==t;)i.Pt.Y>t.Pt.Y?(t=i,e=null):i.Pt.Y===t.Pt.Y&&i.Pt.X<=t.Pt.X&&(i.Pt.X<t.Pt.X?(e=null,t=i):i.Next!==t&&i.Prev!==t&&(e=i)),i=i.Next;if(null!==e)for(;e!==i;)for(this.FirstIsBottomPt(i,e)||(t=e),e=e.Next;o.IntPoint.op_Inequality(e.Pt,t.Pt);)e=e.Next;return t},o.Clipper.prototype.GetLowermostRec=function(t,e){null===t.BottomPt&&(t.BottomPt=this.GetBottomPt(t.Pts)),null===e.BottomPt&&(e.BottomPt=this.GetBottomPt(e.Pts));var i=t.BottomPt,n=e.BottomPt;if(i.Pt.Y>n.Pt.Y)return t;if(i.Pt.Y<n.Pt.Y)return e;if(i.Pt.X<n.Pt.X)return t;if(i.Pt.X>n.Pt.X)return e;if(i.Next===i)return e;else if(n.Next===n)return t;else if(this.FirstIsBottomPt(i,n))return t;else return e},o.Clipper.prototype.OutRec1RightOfOutRec2=function(t,e){do if((t=t.FirstLeft)===e)return!0;while(null!==t);return!1},o.Clipper.prototype.GetOutRec=function(t){for(var e=this.m_PolyOuts[t];e!==this.m_PolyOuts[e.Idx];)e=this.m_PolyOuts[e.Idx];return e},o.Clipper.prototype.AppendPolygon=function(t,e){var i,n=this.m_PolyOuts[t.OutIdx],r=this.m_PolyOuts[e.OutIdx];i=this.OutRec1RightOfOutRec2(n,r)?r:this.OutRec1RightOfOutRec2(r,n)?n:this.GetLowermostRec(n,r);var s=n.Pts,l=s.Prev,p=r.Pts,u=p.Prev;t.Side===o.EdgeSide.esLeft?e.Side===o.EdgeSide.esLeft?(this.ReversePolyPtLinks(p),p.Next=s,s.Prev=p,l.Next=u,u.Prev=l,n.Pts=u):(u.Next=s,s.Prev=u,p.Prev=l,l.Next=p,n.Pts=p):e.Side===o.EdgeSide.esRight?(this.ReversePolyPtLinks(p),l.Next=u,u.Prev=l,p.Next=s,s.Prev=p):(l.Next=p,p.Prev=l,s.Prev=u,u.Next=s),n.BottomPt=null,i===r&&(r.FirstLeft!==n&&(n.FirstLeft=r.FirstLeft),n.IsHole=r.IsHole),r.Pts=null,r.BottomPt=null,r.FirstLeft=n;var h=t.OutIdx,a=e.OutIdx;t.OutIdx=-1,e.OutIdx=-1;for(var f=this.m_ActiveEdges;null!==f;){if(f.OutIdx===a){f.OutIdx=h,f.Side=t.Side;break}f=f.NextInAEL}r.Idx=n.Idx},o.Clipper.prototype.ReversePolyPtLinks=function(t){var e,i;if(null!==t){e=t;do i=e.Next,e.Next=e.Prev,e.Prev=i,e=i;while(e!==t)}},o.Clipper.SwapSides=function(t,e){var i=t.Side;t.Side=e.Side,e.Side=i},o.Clipper.SwapPolyIndexes=function(t,e){var i=t.OutIdx;t.OutIdx=e.OutIdx,e.OutIdx=i},o.Clipper.prototype.IntersectEdges=function(t,e,i){var n,r,s,l,p,u,h,a,f=t.OutIdx>=0,P=e.OutIdx>=0;if(o.use_xyz&&this.SetZ(i,t,e),o.use_lines&&(0===t.WindDelta||0===e.WindDelta)){0===t.WindDelta&&0===e.WindDelta||(t.PolyTyp===e.PolyTyp&&t.WindDelta!==e.WindDelta&&this.m_ClipType===o.ClipType.ctUnion?0===t.WindDelta?P&&(this.AddOutPt(t,i),f&&(t.OutIdx=-1)):f&&(this.AddOutPt(e,i),P&&(e.OutIdx=-1)):t.PolyTyp!==e.PolyTyp&&(0===t.WindDelta&&1===Math.abs(e.WindCnt)&&(this.m_ClipType!==o.ClipType.ctUnion||0===e.WindCnt2)?(this.AddOutPt(t,i),f&&(t.OutIdx=-1)):0===e.WindDelta&&1===Math.abs(t.WindCnt)&&(this.m_ClipType!==o.ClipType.ctUnion||0===t.WindCnt2)&&(this.AddOutPt(e,i),P&&(e.OutIdx=-1))));return}if(t.PolyTyp===e.PolyTyp){if(this.IsEvenOddFillType(t)){var d=t.WindCnt;t.WindCnt=e.WindCnt,e.WindCnt=d}else t.WindCnt+e.WindDelta===0?t.WindCnt=-t.WindCnt:t.WindCnt+=e.WindDelta,e.WindCnt-t.WindDelta==0?e.WindCnt=-e.WindCnt:e.WindCnt-=t.WindDelta}else this.IsEvenOddFillType(e)?t.WindCnt2=0===t.WindCnt2?1:0:t.WindCnt2+=e.WindDelta,this.IsEvenOddFillType(t)?e.WindCnt2=0===e.WindCnt2?1:0:e.WindCnt2-=t.WindDelta;switch(t.PolyTyp===o.PolyType.ptSubject?(n=this.m_SubjFillType,s=this.m_ClipFillType):(n=this.m_ClipFillType,s=this.m_SubjFillType),e.PolyTyp===o.PolyType.ptSubject?(r=this.m_SubjFillType,l=this.m_ClipFillType):(r=this.m_ClipFillType,l=this.m_SubjFillType),n){case o.PolyFillType.pftPositive:p=t.WindCnt;break;case o.PolyFillType.pftNegative:p=-t.WindCnt;break;default:p=Math.abs(t.WindCnt)}switch(r){case o.PolyFillType.pftPositive:u=e.WindCnt;break;case o.PolyFillType.pftNegative:u=-e.WindCnt;break;default:u=Math.abs(e.WindCnt)}if(f&&P)0!==p&&1!==p||0!==u&&1!==u||t.PolyTyp!==e.PolyTyp&&this.m_ClipType!==o.ClipType.ctXor?this.AddLocalMaxPoly(t,e,i):(this.AddOutPt(t,i),this.AddOutPt(e,i),o.Clipper.SwapSides(t,e),o.Clipper.SwapPolyIndexes(t,e));else if(f)(0===u||1===u)&&(this.AddOutPt(t,i),o.Clipper.SwapSides(t,e),o.Clipper.SwapPolyIndexes(t,e));else if(P)(0===p||1===p)&&(this.AddOutPt(e,i),o.Clipper.SwapSides(t,e),o.Clipper.SwapPolyIndexes(t,e));else if((0===p||1===p)&&(0===u||1===u)){switch(s){case o.PolyFillType.pftPositive:h=t.WindCnt2;break;case o.PolyFillType.pftNegative:h=-t.WindCnt2;break;default:h=Math.abs(t.WindCnt2)}switch(l){case o.PolyFillType.pftPositive:a=e.WindCnt2;break;case o.PolyFillType.pftNegative:a=-e.WindCnt2;break;default:a=Math.abs(e.WindCnt2)}if(t.PolyTyp!==e.PolyTyp)this.AddLocalMinPoly(t,e,i);else if(1===p&&1===u)switch(this.m_ClipType){case o.ClipType.ctIntersection:h>0&&a>0&&this.AddLocalMinPoly(t,e,i);break;case o.ClipType.ctUnion:h<=0&&a<=0&&this.AddLocalMinPoly(t,e,i);break;case o.ClipType.ctDifference:(t.PolyTyp===o.PolyType.ptClip&&h>0&&a>0||t.PolyTyp===o.PolyType.ptSubject&&h<=0&&a<=0)&&this.AddLocalMinPoly(t,e,i);break;case o.ClipType.ctXor:this.AddLocalMinPoly(t,e,i)}else o.Clipper.SwapSides(t,e)}},o.Clipper.prototype.DeleteFromSEL=function(t){var e=t.PrevInSEL,i=t.NextInSEL;(null!==e||null!==i||t===this.m_SortedEdges)&&(null!==e?e.NextInSEL=i:this.m_SortedEdges=i,null!==i&&(i.PrevInSEL=e),t.NextInSEL=null,t.PrevInSEL=null)},o.Clipper.prototype.ProcessHorizontals=function(){for(var t={};this.PopEdgeFromSEL(t);)this.ProcessHorizontal(t.v)},o.Clipper.prototype.GetHorzDirection=function(t,e){t.Bot.X<t.Top.X?(e.Left=t.Bot.X,e.Right=t.Top.X,e.Dir=o.Direction.dLeftToRight):(e.Left=t.Top.X,e.Right=t.Bot.X,e.Dir=o.Direction.dRightToLeft)},o.Clipper.prototype.ProcessHorizontal=function(t){var e={Dir:null,Left:null,Right:null};this.GetHorzDirection(t,e);for(var i=e.Dir,n=e.Left,r=e.Right,s=0===t.WindDelta,l=t,p=null;null!==l.NextInLML&&o.ClipperBase.IsHorizontal(l.NextInLML);)l=l.NextInLML;null===l.NextInLML&&(p=this.GetMaximaPair(l));var u=this.m_Maxima;if(null!==u){if(i===o.Direction.dLeftToRight){for(;null!==u&&u.X<=t.Bot.X;)u=u.Next;null!==u&&u.X>=l.Top.X&&(u=null)}else{for(;null!==u.Next&&u.Next.X<t.Bot.X;)u=u.Next;u.X<=l.Top.X&&(u=null)}}for(var h=null;;){for(var a=t===l,f=this.GetNextInAEL(t,i);null!==f;){if(null!==u){if(i===o.Direction.dLeftToRight)for(;null!==u&&u.X<f.Curr.X;)t.OutIdx>=0&&!s&&this.AddOutPt(t,new o.IntPoint2(u.X,t.Bot.Y)),u=u.Next;else for(;null!==u&&u.X>f.Curr.X;)t.OutIdx>=0&&!s&&this.AddOutPt(t,new o.IntPoint2(u.X,t.Bot.Y)),u=u.Prev}if(i===o.Direction.dLeftToRight&&f.Curr.X>r||i===o.Direction.dRightToLeft&&f.Curr.X<n||f.Curr.X===t.Top.X&&null!==t.NextInLML&&f.Dx<t.NextInLML.Dx)break;if(t.OutIdx>=0&&!s){o.use_xyz&&(i===o.Direction.dLeftToRight?this.SetZ(f.Curr,t,f):this.SetZ(f.Curr,f,t)),h=this.AddOutPt(t,f.Curr);for(var P=this.m_SortedEdges;null!==P;){if(P.OutIdx>=0&&this.HorzSegmentsOverlap(t.Bot.X,t.Top.X,P.Bot.X,P.Top.X)){var d=this.GetLastOutPt(P);this.AddJoin(d,h,P.Top)}P=P.NextInSEL}this.AddGhostJoin(h,t.Bot)}if(f===p&&a){t.OutIdx>=0&&this.AddLocalMaxPoly(t,p,t.Top),this.DeleteFromAEL(t),this.DeleteFromAEL(p);return}if(i===o.Direction.dLeftToRight){var m=new o.IntPoint2(f.Curr.X,t.Curr.Y);this.IntersectEdges(t,f,m)}else{var m=new o.IntPoint2(f.Curr.X,t.Curr.Y);this.IntersectEdges(f,t,m)}var y=this.GetNextInAEL(f,i);this.SwapPositionsInAEL(t,f),f=y}if(null===t.NextInLML||!o.ClipperBase.IsHorizontal(t.NextInLML))break;(t=this.UpdateEdgeIntoAEL(t)).OutIdx>=0&&this.AddOutPt(t,t.Bot),e={Dir:i,Left:n,Right:r},this.GetHorzDirection(t,e),i=e.Dir,n=e.Left,r=e.Right}if(t.OutIdx>=0&&null===h){h=this.GetLastOutPt(t);for(var P=this.m_SortedEdges;null!==P;){if(P.OutIdx>=0&&this.HorzSegmentsOverlap(t.Bot.X,t.Top.X,P.Bot.X,P.Top.X)){var d=this.GetLastOutPt(P);this.AddJoin(d,h,P.Top)}P=P.NextInSEL}this.AddGhostJoin(h,t.Top)}if(null!==t.NextInLML){if(t.OutIdx>=0){if(h=this.AddOutPt(t,t.Top),0===(t=this.UpdateEdgeIntoAEL(t)).WindDelta)return;var $=t.PrevInAEL,y=t.NextInAEL;if(null!==$&&$.Curr.X===t.Bot.X&&$.Curr.Y===t.Bot.Y&&0===$.WindDelta&&$.OutIdx>=0&&$.Curr.Y>$.Top.Y&&o.ClipperBase.SlopesEqual3(t,$,this.m_UseFullRange)){var d=this.AddOutPt($,t.Bot);this.AddJoin(h,d,t.Top)}else if(null!==y&&y.Curr.X===t.Bot.X&&y.Curr.Y===t.Bot.Y&&0!==y.WindDelta&&y.OutIdx>=0&&y.Curr.Y>y.Top.Y&&o.ClipperBase.SlopesEqual3(t,y,this.m_UseFullRange)){var d=this.AddOutPt(y,t.Bot);this.AddJoin(h,d,t.Top)}}else t=this.UpdateEdgeIntoAEL(t)}else t.OutIdx>=0&&this.AddOutPt(t,t.Top),this.DeleteFromAEL(t)},o.Clipper.prototype.GetNextInAEL=function(t,e){return e===o.Direction.dLeftToRight?t.NextInAEL:t.PrevInAEL},o.Clipper.prototype.IsMinima=function(t){return null!==t&&t.Prev.NextInLML!==t&&t.Next.NextInLML!==t},o.Clipper.prototype.IsMaxima=function(t,e){return null!==t&&t.Top.Y===e&&null===t.NextInLML},o.Clipper.prototype.IsIntermediate=function(t,e){return t.Top.Y===e&&null!==t.NextInLML},o.Clipper.prototype.GetMaximaPair=function(t){return o.IntPoint.op_Equality(t.Next.Top,t.Top)&&null===t.Next.NextInLML?t.Next:o.IntPoint.op_Equality(t.Prev.Top,t.Top)&&null===t.Prev.NextInLML?t.Prev:null},o.Clipper.prototype.GetMaximaPairEx=function(t){var e=this.GetMaximaPair(t);return null!==e&&e.OutIdx!==o.ClipperBase.Skip&&(e.NextInAEL!==e.PrevInAEL||o.ClipperBase.IsHorizontal(e))?e:null},o.Clipper.prototype.ProcessIntersections=function(t){if(null===this.m_ActiveEdges)return!0;try{if(this.BuildIntersectList(t),0===this.m_IntersectList.length)return!0;if(!(1===this.m_IntersectList.length||this.FixupIntersectionOrder()))return!1;this.ProcessIntersectList()}catch(e){this.m_SortedEdges=null,this.m_IntersectList.length=0,o.Error("ProcessIntersections error")}return this.m_SortedEdges=null,!0},o.Clipper.prototype.BuildIntersectList=function(t){if(null!==this.m_ActiveEdges){var e=this.m_ActiveEdges;for(this.m_SortedEdges=e;null!==e;)e.PrevInSEL=e.PrevInAEL,e.NextInSEL=e.NextInAEL,e.Curr.X=o.Clipper.TopX(e,t),e=e.NextInAEL;for(var i=!0;i&&null!==this.m_SortedEdges;){for(i=!1,e=this.m_SortedEdges;null!==e.NextInSEL;){var n=e.NextInSEL,r=new o.IntPoint0;if(e.Curr.X>n.Curr.X){this.IntersectPoint(e,n,r),r.Y<t&&(r=new o.IntPoint2(o.Clipper.TopX(e,t),t));var s=new o.IntersectNode;s.Edge1=e,s.Edge2=n,s.Pt.X=r.X,s.Pt.Y=r.Y,o.use_xyz&&(s.Pt.Z=r.Z),this.m_IntersectList.push(s),this.SwapPositionsInSEL(e,n),i=!0}else e=n}if(null!==e.PrevInSEL)e.PrevInSEL.NextInSEL=null;else break}this.m_SortedEdges=null}},o.Clipper.prototype.EdgesAdjacent=function(t){return t.Edge1.NextInSEL===t.Edge2||t.Edge1.PrevInSEL===t.Edge2},o.Clipper.IntersectNodeSort=function(t,e){return e.Pt.Y-t.Pt.Y},o.Clipper.prototype.FixupIntersectionOrder=function(){this.m_IntersectList.sort(this.m_IntersectNodeComparer),this.CopyAELToSEL();for(var t=this.m_IntersectList.length,e=0;e<t;e++){if(!this.EdgesAdjacent(this.m_IntersectList[e])){for(var i=e+1;i<t&&!this.EdgesAdjacent(this.m_IntersectList[i]);)i++;if(i===t)return!1;var n=this.m_IntersectList[e];this.m_IntersectList[e]=this.m_IntersectList[i],this.m_IntersectList[i]=n}this.SwapPositionsInSEL(this.m_IntersectList[e].Edge1,this.m_IntersectList[e].Edge2)}return!0},o.Clipper.prototype.ProcessIntersectList=function(){for(var t=0,e=this.m_IntersectList.length;t<e;t++){var i=this.m_IntersectList[t];this.IntersectEdges(i.Edge1,i.Edge2,i.Pt),this.SwapPositionsInAEL(i.Edge1,i.Edge2)}this.m_IntersectList.length=0};var S=function(t){return t<0?Math.ceil(t-.5):Math.round(t)},A=function(t){return t<0?Math.ceil(t-.5):Math.floor(t+.5)},B=function(t){return t<0?-Math.round(Math.abs(t)):Math.round(t)},D=function(t){return t<0?(t-=.5)<-2147483648?Math.ceil(t):0|t:(t+=.5)>2147483647?Math.floor(t):0|t};l.msie?o.Clipper.Round=S:l.chromium?o.Clipper.Round=B:l.safari?o.Clipper.Round=D:o.Clipper.Round=A,o.Clipper.TopX=function(t,e){return e===t.Top.Y?t.Top.X:t.Bot.X+o.Clipper.Round(t.Dx*(e-t.Bot.Y))},o.Clipper.prototype.IntersectPoint=function(t,e,i){if(i.X=0,i.Y=0,t.Dx===e.Dx){i.Y=t.Curr.Y,i.X=o.Clipper.TopX(t,i.Y);return}if(0===t.Delta.X)i.X=t.Bot.X,o.ClipperBase.IsHorizontal(e)?i.Y=e.Bot.Y:(r=e.Bot.Y-e.Bot.X/e.Dx,i.Y=o.Clipper.Round(i.X/e.Dx+r));else if(0===e.Delta.X)i.X=e.Bot.X,o.ClipperBase.IsHorizontal(t)?i.Y=t.Bot.Y:(n=t.Bot.Y-t.Bot.X/t.Dx,i.Y=o.Clipper.Round(i.X/t.Dx+n));else{n=t.Bot.X-t.Bot.Y*t.Dx;var n,r,s=((r=e.Bot.X-e.Bot.Y*e.Dx)-n)/(t.Dx-e.Dx);i.Y=o.Clipper.Round(s),Math.abs(t.Dx)<Math.abs(e.Dx)?i.X=o.Clipper.Round(t.Dx*s+n):i.X=o.Clipper.Round(e.Dx*s+r)}if(i.Y<t.Top.Y||i.Y<e.Top.Y){if(t.Top.Y>e.Top.Y)return i.Y=t.Top.Y,i.X=o.Clipper.TopX(e,t.Top.Y),i.X<t.Top.X;i.Y=e.Top.Y,Math.abs(t.Dx)<Math.abs(e.Dx)?i.X=o.Clipper.TopX(t,i.Y):i.X=o.Clipper.TopX(e,i.Y)}i.Y>t.Curr.Y&&(i.Y=t.Curr.Y,Math.abs(t.Dx)>Math.abs(e.Dx)?i.X=o.Clipper.TopX(e,i.Y):i.X=o.Clipper.TopX(t,i.Y))},o.Clipper.prototype.ProcessEdgesAtTopOfScanbeam=function(t){for(var e=this.m_ActiveEdges;null!==e;){var i=this.IsMaxima(e,t);if(i){var n=this.GetMaximaPairEx(e);i=null===n||!o.ClipperBase.IsHorizontal(n)}if(i){this.StrictlySimple&&this.InsertMaxima(e.Top.X);var r=e.PrevInAEL;this.DoMaxima(e),e=null===r?this.m_ActiveEdges:r.NextInAEL}else{if(this.IsIntermediate(e,t)&&o.ClipperBase.IsHorizontal(e.NextInLML)?((e=this.UpdateEdgeIntoAEL(e)).OutIdx>=0&&this.AddOutPt(e,e.Bot),this.AddEdgeToSEL(e)):(e.Curr.X=o.Clipper.TopX(e,t),e.Curr.Y=t),o.use_xyz&&(e.Top.Y===t?e.Curr.Z=e.Top.Z:e.Bot.Y===t?e.Curr.Z=e.Bot.Z:e.Curr.Z=0),this.StrictlySimple){var r=e.PrevInAEL;if(e.OutIdx>=0&&0!==e.WindDelta&&null!==r&&r.OutIdx>=0&&r.Curr.X===e.Curr.X&&0!==r.WindDelta){var s=new o.IntPoint1(e.Curr);o.use_xyz&&this.SetZ(s,r,e);var l=this.AddOutPt(r,s),p=this.AddOutPt(e,s);this.AddJoin(l,p,s)}}e=e.NextInAEL}}for(this.ProcessHorizontals(),this.m_Maxima=null,e=this.m_ActiveEdges;null!==e;){if(this.IsIntermediate(e,t)){var l=null;e.OutIdx>=0&&(l=this.AddOutPt(e,e.Top));var r=(e=this.UpdateEdgeIntoAEL(e)).PrevInAEL,u=e.NextInAEL;if(null!==r&&r.Curr.X===e.Bot.X&&r.Curr.Y===e.Bot.Y&&null!==l&&r.OutIdx>=0&&r.Curr.Y===r.Top.Y&&o.ClipperBase.SlopesEqual5(e.Curr,e.Top,r.Curr,r.Top,this.m_UseFullRange)&&0!==e.WindDelta&&0!==r.WindDelta){var p=this.AddOutPt(ePrev2,e.Bot);this.AddJoin(l,p,e.Top)}else if(null!==u&&u.Curr.X===e.Bot.X&&u.Curr.Y===e.Bot.Y&&null!==l&&u.OutIdx>=0&&u.Curr.Y===u.Top.Y&&o.ClipperBase.SlopesEqual5(e.Curr,e.Top,u.Curr,u.Top,this.m_UseFullRange)&&0!==e.WindDelta&&0!==u.WindDelta){var p=this.AddOutPt(u,e.Bot);this.AddJoin(l,p,e.Top)}}e=e.NextInAEL}},o.Clipper.prototype.DoMaxima=function(t){var e=this.GetMaximaPairEx(t);if(null===e){t.OutIdx>=0&&this.AddOutPt(t,t.Top),this.DeleteFromAEL(t);return}for(var i=t.NextInAEL;null!==i&&i!==e;)this.IntersectEdges(t,i,t.Top),this.SwapPositionsInAEL(t,i),i=t.NextInAEL;-1===t.OutIdx&&-1===e.OutIdx?(this.DeleteFromAEL(t),this.DeleteFromAEL(e)):t.OutIdx>=0&&e.OutIdx>=0?(t.OutIdx>=0&&this.AddLocalMaxPoly(t,e,t.Top),this.DeleteFromAEL(t),this.DeleteFromAEL(e)):o.use_lines&&0===t.WindDelta?(t.OutIdx>=0&&(this.AddOutPt(t,t.Top),t.OutIdx=o.ClipperBase.Unassigned),this.DeleteFromAEL(t),e.OutIdx>=0&&(this.AddOutPt(e,t.Top),e.OutIdx=o.ClipperBase.Unassigned),this.DeleteFromAEL(e)):o.Error("DoMaxima error")},o.Clipper.ReversePaths=function(t){for(var e=0,i=t.length;e<i;e++)t[e].reverse()},o.Clipper.Orientation=function(t){return o.Clipper.Area(t)>=0},o.Clipper.prototype.PointCount=function(t){if(null===t)return 0;var e=0,i=t;do e++,i=i.Next;while(i!==t);return e},o.Clipper.prototype.BuildResult=function(t){o.Clear(t);for(var e=0,i=this.m_PolyOuts.length;e<i;e++){var n=this.m_PolyOuts[e];if(null!==n.Pts){var r=n.Pts.Prev,s=this.PointCount(r);if(!(s<2)){for(var l=Array(s),p=0;p<s;p++)l[p]=r.Pt,r=r.Prev;t.push(l)}}}},o.Clipper.prototype.BuildResult2=function(t){t.Clear();for(var e=0,i=this.m_PolyOuts.length;e<i;e++){var n=this.m_PolyOuts[e],r=this.PointCount(n.Pts);if((!n.IsOpen||!(r<2))&&(n.IsOpen||!(r<3))){this.FixHoleLinkage(n);var s=new o.PolyNode;t.m_AllPolys.push(s),n.PolyNode=s,s.m_polygon.length=r;for(var l=n.Pts.Prev,p=0;p<r;p++)s.m_polygon[p]=l.Pt,l=l.Prev}}for(var e=0,i=this.m_PolyOuts.length;e<i;e++){var n=this.m_PolyOuts[e];null!==n.PolyNode&&(n.IsOpen?(n.PolyNode.IsOpen=!0,t.AddChild(n.PolyNode)):null!==n.FirstLeft&&null!==n.FirstLeft.PolyNode?n.FirstLeft.PolyNode.AddChild(n.PolyNode):t.AddChild(n.PolyNode))}},o.Clipper.prototype.FixupOutPolyline=function(t){for(var e=t.Pts,i=e.Prev;e!==i;)if(e=e.Next,o.IntPoint.op_Equality(e.Pt,e.Prev.Pt)){e===i&&(i=e.Prev);var n=e.Prev;n.Next=e.Next,e.Next.Prev=n,e=n}e===e.Prev&&(t.Pts=null)},o.Clipper.prototype.FixupOutPolygon=function(t){var e=null;t.BottomPt=null;for(var i=t.Pts,n=this.PreserveCollinear||this.StrictlySimple;;){if(i.Prev===i||i.Prev===i.Next){t.Pts=null;return}if(o.IntPoint.op_Equality(i.Pt,i.Next.Pt)||o.IntPoint.op_Equality(i.Pt,i.Prev.Pt)||o.ClipperBase.SlopesEqual4(i.Prev.Pt,i.Pt,i.Next.Pt,this.m_UseFullRange)&&(!n||!this.Pt2IsBetweenPt1AndPt3(i.Prev.Pt,i.Pt,i.Next.Pt)))e=null,i.Prev.Next=i.Next,i.Next.Prev=i.Prev,i=i.Prev;else if(i===e)break;else null===e&&(e=i),i=i.Next}t.Pts=i},o.Clipper.prototype.DupOutPt=function(t,e){var i=new o.OutPt;return i.Pt.X=t.Pt.X,i.Pt.Y=t.Pt.Y,o.use_xyz&&(i.Pt.Z=t.Pt.Z),i.Idx=t.Idx,e?(i.Next=t.Next,i.Prev=t,t.Next.Prev=i,t.Next=i):(i.Prev=t.Prev,i.Next=t,t.Prev.Next=i,t.Prev=i),i},o.Clipper.prototype.GetOverlap=function(t,e,i,n,o){return t<e?i<n?(o.Left=Math.max(t,i),o.Right=Math.min(e,n)):(o.Left=Math.max(t,n),o.Right=Math.min(e,i)):i<n?(o.Left=Math.max(e,i),o.Right=Math.min(t,n)):(o.Left=Math.max(e,n),o.Right=Math.min(t,i)),o.Left<o.Right},o.Clipper.prototype.JoinHorz=function(t,e,i,n,r,s){var l=t.Pt.X>e.Pt.X?o.Direction.dRightToLeft:o.Direction.dLeftToRight,p=i.Pt.X>n.Pt.X?o.Direction.dRightToLeft:o.Direction.dLeftToRight;if(l===p)return!1;if(l===o.Direction.dLeftToRight){for(;t.Next.Pt.X<=r.X&&t.Next.Pt.X>=t.Pt.X&&t.Next.Pt.Y===r.Y;)t=t.Next;s&&t.Pt.X!==r.X&&(t=t.Next),e=this.DupOutPt(t,!s),o.IntPoint.op_Inequality(e.Pt,r)&&((t=e).Pt.X=r.X,t.Pt.Y=r.Y,o.use_xyz&&(t.Pt.Z=r.Z),e=this.DupOutPt(t,!s))}else{for(;t.Next.Pt.X>=r.X&&t.Next.Pt.X<=t.Pt.X&&t.Next.Pt.Y===r.Y;)t=t.Next;s||t.Pt.X===r.X||(t=t.Next),e=this.DupOutPt(t,s),o.IntPoint.op_Inequality(e.Pt,r)&&((t=e).Pt.X=r.X,t.Pt.Y=r.Y,o.use_xyz&&(t.Pt.Z=r.Z),e=this.DupOutPt(t,s))}if(p===o.Direction.dLeftToRight){for(;i.Next.Pt.X<=r.X&&i.Next.Pt.X>=i.Pt.X&&i.Next.Pt.Y===r.Y;)i=i.Next;s&&i.Pt.X!==r.X&&(i=i.Next),n=this.DupOutPt(i,!s),o.IntPoint.op_Inequality(n.Pt,r)&&((i=n).Pt.X=r.X,i.Pt.Y=r.Y,o.use_xyz&&(i.Pt.Z=r.Z),n=this.DupOutPt(i,!s))}else{for(;i.Next.Pt.X>=r.X&&i.Next.Pt.X<=i.Pt.X&&i.Next.Pt.Y===r.Y;)i=i.Next;s||i.Pt.X===r.X||(i=i.Next),n=this.DupOutPt(i,s),o.IntPoint.op_Inequality(n.Pt,r)&&((i=n).Pt.X=r.X,i.Pt.Y=r.Y,o.use_xyz&&(i.Pt.Z=r.Z),n=this.DupOutPt(i,s))}return l===o.Direction.dLeftToRight===s?(t.Prev=i,i.Next=t,e.Next=n,n.Prev=e):(t.Next=i,i.Prev=t,e.Prev=n,n.Next=e),!0},o.Clipper.prototype.JoinPoints=function(t,e,i){var n=t.OutPt1,r=new o.OutPt,s=t.OutPt2,l=new o.OutPt,p=t.OutPt1.Pt.Y===t.OffPt.Y;if(p&&o.IntPoint.op_Equality(t.OffPt,t.OutPt1.Pt)&&o.IntPoint.op_Equality(t.OffPt,t.OutPt2.Pt)){if(e!==i)return!1;for(r=t.OutPt1.Next;r!==n&&o.IntPoint.op_Equality(r.Pt,t.OffPt);)r=r.Next;var u=r.Pt.Y>t.OffPt.Y;for(l=t.OutPt2.Next;l!==s&&o.IntPoint.op_Equality(l.Pt,t.OffPt);)l=l.Next;return u!==l.Pt.Y>t.OffPt.Y&&(u?(r=this.DupOutPt(n,!1),l=this.DupOutPt(s,!0),n.Prev=s,s.Next=n,r.Next=l,l.Prev=r,t.OutPt1=n,t.OutPt2=r,!0):(r=this.DupOutPt(n,!0),l=this.DupOutPt(s,!1),n.Next=s,s.Prev=n,r.Prev=l,l.Next=r,t.OutPt1=n,t.OutPt2=r,!0))}if(p){for(r=n;n.Prev.Pt.Y===n.Pt.Y&&n.Prev!==r&&n.Prev!==s;)n=n.Prev;for(;r.Next.Pt.Y===r.Pt.Y&&r.Next!==n&&r.Next!==s;)r=r.Next;if(r.Next===n||r.Next===s)return!1;for(l=s;s.Prev.Pt.Y===s.Pt.Y&&s.Prev!==l&&s.Prev!==r;)s=s.Prev;for(;l.Next.Pt.Y===l.Pt.Y&&l.Next!==s&&l.Next!==n;)l=l.Next;if(l.Next===s||l.Next===n)return!1;var h,a={Left:null,Right:null};if(!this.GetOverlap(n.Pt.X,r.Pt.X,s.Pt.X,l.Pt.X,a))return!1;var f=a.Left,P=a.Right,d=new o.IntPoint0;return n.Pt.X>=f&&n.Pt.X<=P?(d.X=n.Pt.X,d.Y=n.Pt.Y,o.use_xyz&&(d.Z=n.Pt.Z),h=n.Pt.X>r.Pt.X):s.Pt.X>=f&&s.Pt.X<=P?(d.X=s.Pt.X,d.Y=s.Pt.Y,o.use_xyz&&(d.Z=s.Pt.Z),h=s.Pt.X>l.Pt.X):r.Pt.X>=f&&r.Pt.X<=P?(d.X=r.Pt.X,d.Y=r.Pt.Y,o.use_xyz&&(d.Z=r.Pt.Z),h=r.Pt.X>n.Pt.X):(d.X=l.Pt.X,d.Y=l.Pt.Y,o.use_xyz&&(d.Z=l.Pt.Z),h=l.Pt.X>s.Pt.X),t.OutPt1=n,t.OutPt2=s,this.JoinHorz(n,r,s,l,d,h)}for(r=n.Next;o.IntPoint.op_Equality(r.Pt,n.Pt)&&r!==n;)r=r.Next;var m=r.Pt.Y>n.Pt.Y||!o.ClipperBase.SlopesEqual4(n.Pt,r.Pt,t.OffPt,this.m_UseFullRange);if(m){for(r=n.Prev;o.IntPoint.op_Equality(r.Pt,n.Pt)&&r!==n;)r=r.Prev;if(r.Pt.Y>n.Pt.Y||!o.ClipperBase.SlopesEqual4(n.Pt,r.Pt,t.OffPt,this.m_UseFullRange))return!1}for(l=s.Next;o.IntPoint.op_Equality(l.Pt,s.Pt)&&l!==s;)l=l.Next;var y=l.Pt.Y>s.Pt.Y||!o.ClipperBase.SlopesEqual4(s.Pt,l.Pt,t.OffPt,this.m_UseFullRange);if(y){for(l=s.Prev;o.IntPoint.op_Equality(l.Pt,s.Pt)&&l!==s;)l=l.Prev;if(l.Pt.Y>s.Pt.Y||!o.ClipperBase.SlopesEqual4(s.Pt,l.Pt,t.OffPt,this.m_UseFullRange))return!1}return r!==n&&l!==s&&r!==l&&(e!==i||m!==y)&&(m?(r=this.DupOutPt(n,!1),l=this.DupOutPt(s,!0),n.Prev=s,s.Next=n,r.Next=l,l.Prev=r,t.OutPt1=n,t.OutPt2=r,!0):(r=this.DupOutPt(n,!0),l=this.DupOutPt(s,!1),n.Next=s,s.Prev=n,r.Prev=l,l.Next=r,t.OutPt1=n,t.OutPt2=r,!0))},o.Clipper.GetBounds=function(t){for(var e=0,i=t.length;e<i&&0===t[e].length;)e++;if(e===i)return new o.IntRect(0,0,0,0);var n=new o.IntRect;for(n.left=t[e][0].X,n.right=n.left,n.top=t[e][0].Y,n.bottom=n.top;e<i;e++)for(var r=0,s=t[e].length;r<s;r++)t[e][r].X<n.left?n.left=t[e][r].X:t[e][r].X>n.right&&(n.right=t[e][r].X),t[e][r].Y<n.top?n.top=t[e][r].Y:t[e][r].Y>n.bottom&&(n.bottom=t[e][r].Y);return n},o.Clipper.prototype.GetBounds2=function(t){var e=t,i=new o.IntRect;for(i.left=t.Pt.X,i.right=t.Pt.X,i.top=t.Pt.Y,i.bottom=t.Pt.Y,t=t.Next;t!==e;)t.Pt.X<i.left&&(i.left=t.Pt.X),t.Pt.X>i.right&&(i.right=t.Pt.X),t.Pt.Y<i.top&&(i.top=t.Pt.Y),t.Pt.Y>i.bottom&&(i.bottom=t.Pt.Y),t=t.Next;return i},o.Clipper.PointInPolygon=function(t,e){var i=0,n=e.length;if(n<3)return 0;for(var o=e[0],r=1;r<=n;++r){var s=r===n?e[0]:e[r];if(s.Y===t.Y&&(s.X===t.X||o.Y===t.Y&&s.X>t.X==o.X<t.X))return -1;if(o.Y<t.Y!=s.Y<t.Y){if(o.X>=t.X){if(s.X>t.X)i=1-i;else{var l=(o.X-t.X)*(s.Y-t.Y)-(s.X-t.X)*(o.Y-t.Y);if(0===l)return -1;l>0==s.Y>o.Y&&(i=1-i)}}else if(s.X>t.X){var l=(o.X-t.X)*(s.Y-t.Y)-(s.X-t.X)*(o.Y-t.Y);if(0===l)return -1;l>0==s.Y>o.Y&&(i=1-i)}}o=s}return i},o.Clipper.prototype.PointInPolygon=function(t,e){var i=0,n=e,o=t.X,r=t.Y,s=e.Pt.X,l=e.Pt.Y;do{var p=(e=e.Next).Pt.X,u=e.Pt.Y;if(u===r&&(p===o||l===r&&p>o==s<o))return -1;if(l<r!=u<r){if(s>=o){if(p>o)i=1-i;else{var h=(s-o)*(u-r)-(p-o)*(l-r);if(0===h)return -1;h>0==u>l&&(i=1-i)}}else if(p>o){var h=(s-o)*(u-r)-(p-o)*(l-r);if(0===h)return -1;h>0==u>l&&(i=1-i)}}s=p,l=u}while(n!==e);return i},o.Clipper.prototype.Poly2ContainsPoly1=function(t,e){var i=t;do{var n=this.PointInPolygon(i.Pt,e);if(n>=0)return n>0;i=i.Next}while(i!==t);return!0},o.Clipper.prototype.FixupFirstLefts1=function(t,e){for(var i,n,r=0,s=this.m_PolyOuts.length;r<s;r++)i=this.m_PolyOuts[r],n=o.Clipper.ParseFirstLeft(i.FirstLeft),null!==i.Pts&&n===t&&this.Poly2ContainsPoly1(i.Pts,e.Pts)&&(i.FirstLeft=e)},o.Clipper.prototype.FixupFirstLefts2=function(t,e){for(var i,n,r=e.FirstLeft,s=0,l=this.m_PolyOuts.length;s<l;s++)null!==(i=this.m_PolyOuts[s]).Pts&&i!==e&&i!==t&&((n=o.Clipper.ParseFirstLeft(i.FirstLeft))===r||n===t||n===e)&&(this.Poly2ContainsPoly1(i.Pts,t.Pts)?i.FirstLeft=t:this.Poly2ContainsPoly1(i.Pts,e.Pts)?i.FirstLeft=e:(i.FirstLeft===t||i.FirstLeft===e)&&(i.FirstLeft=r))},o.Clipper.prototype.FixupFirstLefts3=function(t,e){for(var i,n,r=0,s=this.m_PolyOuts.length;r<s;r++)i=this.m_PolyOuts[r],n=o.Clipper.ParseFirstLeft(i.FirstLeft),null!==i.Pts&&n===t&&(i.FirstLeft=e)},o.Clipper.ParseFirstLeft=function(t){for(;null!==t&&null===t.Pts;)t=t.FirstLeft;return t},o.Clipper.prototype.JoinCommonEdges=function(){for(var t=0,e=this.m_Joins.length;t<e;t++){var i,n=this.m_Joins[t],o=this.GetOutRec(n.OutPt1.Idx),r=this.GetOutRec(n.OutPt2.Idx);null!==o.Pts&&null!==r.Pts&&!o.IsOpen&&!r.IsOpen&&(i=o===r?o:this.OutRec1RightOfOutRec2(o,r)?r:this.OutRec1RightOfOutRec2(r,o)?o:this.GetLowermostRec(o,r),this.JoinPoints(n,o,r)&&(o===r?(o.Pts=n.OutPt1,o.BottomPt=null,(r=this.CreateOutRec()).Pts=n.OutPt2,this.UpdateOutPtIdxs(r),this.Poly2ContainsPoly1(r.Pts,o.Pts)?(r.IsHole=!o.IsHole,r.FirstLeft=o,this.m_UsingPolyTree&&this.FixupFirstLefts2(r,o),(r.IsHole^this.ReverseSolution)==this.Area$1(r)>0&&this.ReversePolyPtLinks(r.Pts)):this.Poly2ContainsPoly1(o.Pts,r.Pts)?(r.IsHole=o.IsHole,o.IsHole=!r.IsHole,r.FirstLeft=o.FirstLeft,o.FirstLeft=r,this.m_UsingPolyTree&&this.FixupFirstLefts2(o,r),(o.IsHole^this.ReverseSolution)==this.Area$1(o)>0&&this.ReversePolyPtLinks(o.Pts)):(r.IsHole=o.IsHole,r.FirstLeft=o.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(o,r))):(r.Pts=null,r.BottomPt=null,r.Idx=o.Idx,o.IsHole=i.IsHole,i===r&&(o.FirstLeft=r.FirstLeft),r.FirstLeft=o,this.m_UsingPolyTree&&this.FixupFirstLefts3(r,o))))}},o.Clipper.prototype.UpdateOutPtIdxs=function(t){var e=t.Pts;do e.Idx=t.Idx,e=e.Prev;while(e!==t.Pts)},o.Clipper.prototype.DoSimplePolygons=function(){for(var t=0;t<this.m_PolyOuts.length;){var e=this.m_PolyOuts[t++],i=e.Pts;if(null!==i&&!e.IsOpen)do{for(var n=i.Next;n!==e.Pts;){if(o.IntPoint.op_Equality(i.Pt,n.Pt)&&n.Next!==i&&n.Prev!==i){var r=i.Prev,s=n.Prev;i.Prev=s,s.Next=i,n.Prev=r,r.Next=n,e.Pts=i;var l=this.CreateOutRec();l.Pts=n,this.UpdateOutPtIdxs(l),this.Poly2ContainsPoly1(l.Pts,e.Pts)?(l.IsHole=!e.IsHole,l.FirstLeft=e,this.m_UsingPolyTree&&this.FixupFirstLefts2(l,e)):this.Poly2ContainsPoly1(e.Pts,l.Pts)?(l.IsHole=e.IsHole,e.IsHole=!l.IsHole,l.FirstLeft=e.FirstLeft,e.FirstLeft=l,this.m_UsingPolyTree&&this.FixupFirstLefts2(e,l)):(l.IsHole=e.IsHole,l.FirstLeft=e.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(e,l)),n=i}n=n.Next}i=i.Next}while(i!==e.Pts)}},o.Clipper.Area=function(t){if(!Array.isArray(t))return 0;var e=t.length;if(e<3)return 0;for(var i=0,n=0,o=e-1;n<e;++n)i+=(t[o].X+t[n].X)*(t[o].Y-t[n].Y),o=n;return-(.5*i)},o.Clipper.prototype.Area=function(t){var e=t;if(null===t)return 0;var i=0;do i+=(t.Prev.Pt.X+t.Pt.X)*(t.Prev.Pt.Y-t.Pt.Y),t=t.Next;while(t!==e);return .5*i},o.Clipper.prototype.Area$1=function(t){return this.Area(t.Pts)},o.Clipper.SimplifyPolygon=function(t,e){var i=[],n=new o.Clipper(0);return n.StrictlySimple=!0,n.AddPath(t,o.PolyType.ptSubject,!0),n.Execute(o.ClipType.ctUnion,i,e,e),i},o.Clipper.SimplifyPolygons=function(t,e){void 0===e&&(e=o.PolyFillType.pftEvenOdd);var i=[],n=new o.Clipper(0);return n.StrictlySimple=!0,n.AddPaths(t,o.PolyType.ptSubject,!0),n.Execute(o.ClipType.ctUnion,i,e,e),i},o.Clipper.DistanceSqrd=function(t,e){var i=t.X-e.X,n=t.Y-e.Y;return i*i+n*n},o.Clipper.DistanceFromLineSqrd=function(t,e,i){var n=e.Y-i.Y,o=i.X-e.X,r=n*e.X+o*e.Y;return(r=n*t.X+o*t.Y-r)*r/(n*n+o*o)},o.Clipper.SlopesNearCollinear=function(t,e,i,n){return Math.abs(t.X-e.X)>Math.abs(t.Y-e.Y)?t.X>e.X==t.X<i.X?o.Clipper.DistanceFromLineSqrd(t,e,i)<n:e.X>t.X==e.X<i.X?o.Clipper.DistanceFromLineSqrd(e,t,i)<n:o.Clipper.DistanceFromLineSqrd(i,t,e)<n:t.Y>e.Y==t.Y<i.Y?o.Clipper.DistanceFromLineSqrd(t,e,i)<n:e.Y>t.Y==e.Y<i.Y?o.Clipper.DistanceFromLineSqrd(e,t,i)<n:o.Clipper.DistanceFromLineSqrd(i,t,e)<n},o.Clipper.PointsAreClose=function(t,e,i){var n=t.X-e.X,o=t.Y-e.Y;return n*n+o*o<=i},o.Clipper.ExcludeOp=function(t){var e=t.Prev;return e.Next=t.Next,t.Next.Prev=e,e.Idx=0,e},o.Clipper.CleanPolygon=function(t,e){void 0===e&&(e=1.415);var i=t.length;if(0===i)return[];for(var n=Array(i),r=0;r<i;++r)n[r]=new o.OutPt;for(var r=0;r<i;++r)n[r].Pt=t[r],n[r].Next=n[(r+1)%i],n[r].Next.Prev=n[r],n[r].Idx=0;for(var s=e*e,l=n[0];0===l.Idx&&l.Next!==l.Prev;)o.Clipper.PointsAreClose(l.Pt,l.Prev.Pt,s)?(l=o.Clipper.ExcludeOp(l),i--):o.Clipper.PointsAreClose(l.Prev.Pt,l.Next.Pt,s)?(o.Clipper.ExcludeOp(l.Next),l=o.Clipper.ExcludeOp(l),i-=2):o.Clipper.SlopesNearCollinear(l.Prev.Pt,l.Pt,l.Next.Pt,s)?(l=o.Clipper.ExcludeOp(l),i--):(l.Idx=1,l=l.Next);i<3&&(i=0);for(var p=Array(i),r=0;r<i;++r)p[r]=new o.IntPoint1(l.Pt),l=l.Next;return n=null,p},o.Clipper.CleanPolygons=function(t,e){for(var i=Array(t.length),n=0,r=t.length;n<r;n++)i[n]=o.Clipper.CleanPolygon(t[n],e);return i},o.Clipper.Minkowski=function(t,e,i,n){var r=n?1:0,s=t.length,l=e.length,p=[];if(i)for(var u=0;u<l;u++){for(var h=Array(s),a=0,f=t.length,P=t[a];a<f;P=t[++a])h[a]=new o.IntPoint2(e[u].X+P.X,e[u].Y+P.Y);p.push(h)}else for(var u=0;u<l;u++){for(var h=Array(s),a=0,f=t.length,P=t[a];a<f;P=t[++a])h[a]=new o.IntPoint2(e[u].X-P.X,e[u].Y-P.Y);p.push(h)}for(var d=[],u=0;u<l-1+r;u++)for(var a=0;a<s;a++){var m=[];m.push(p[u%l][a%s]),m.push(p[(u+1)%l][a%s]),m.push(p[(u+1)%l][(a+1)%s]),m.push(p[u%l][(a+1)%s]),o.Clipper.Orientation(m)||m.reverse(),d.push(m)}return d},o.Clipper.MinkowskiSum=function(t,e,i){if(e[0]instanceof Array){for(var n=e,r=new o.Paths,s=new o.Clipper,l=0;l<n.length;++l){var p=o.Clipper.Minkowski(t,n[l],!0,i);if(s.AddPaths(p,o.PolyType.ptSubject,!0),i){var u=o.Clipper.TranslatePath(n[l],t[0]);s.AddPath(u,o.PolyType.ptClip,!0)}}return s.Execute(o.ClipType.ctUnion,r,o.PolyFillType.pftNonZero,o.PolyFillType.pftNonZero),r}var u=e,n=o.Clipper.Minkowski(t,u,!0,i),s=new o.Clipper;return s.AddPaths(n,o.PolyType.ptSubject,!0),s.Execute(o.ClipType.ctUnion,n,o.PolyFillType.pftNonZero,o.PolyFillType.pftNonZero),n},o.Clipper.TranslatePath=function(t,e){for(var i=new o.Path,n=0;n<t.length;n++)i.push(new o.IntPoint2(t[n].X+e.X,t[n].Y+e.Y));return i},o.Clipper.MinkowskiDiff=function(t,e){var i=o.Clipper.Minkowski(t,e,!1,!0),n=new o.Clipper;return n.AddPaths(i,o.PolyType.ptSubject,!0),n.Execute(o.ClipType.ctUnion,i,o.PolyFillType.pftNonZero,o.PolyFillType.pftNonZero),i},o.Clipper.PolyTreeToPaths=function(t){var e=[];return o.Clipper.AddPolyNodeToPaths(t,o.Clipper.NodeType.ntAny,e),e},o.Clipper.AddPolyNodeToPaths=function(t,e,i){var n=!0;switch(e){case o.Clipper.NodeType.ntOpen:return;case o.Clipper.NodeType.ntClosed:n=!t.IsOpen}t.m_polygon.length>0&&n&&i.push(t.m_polygon);for(var r=0,s=t.Childs(),l=s.length,p=s[r];r<l;p=s[++r])o.Clipper.AddPolyNodeToPaths(p,e,i)},o.Clipper.OpenPathsFromPolyTree=function(t){for(var e=new o.Paths,i=0,n=t.ChildCount();i<n;i++)t.Childs()[i].IsOpen&&e.push(t.Childs()[i].m_polygon);return e},o.Clipper.ClosedPathsFromPolyTree=function(t){var e=new o.Paths;return o.Clipper.AddPolyNodeToPaths(t,o.Clipper.NodeType.ntClosed,e),e},O(o.Clipper,o.ClipperBase),o.Clipper.NodeType={ntAny:0,ntOpen:1,ntClosed:2},o.ClipperOffset=function(t,e){void 0===t&&(t=2),void 0===e&&(e=o.ClipperOffset.def_arc_tolerance),this.m_destPolys=new o.Paths,this.m_srcPoly=new o.Path,this.m_destPoly=new o.Path,this.m_normals=[],this.m_delta=0,this.m_sinA=0,this.m_sin=0,this.m_cos=0,this.m_miterLim=0,this.m_StepsPerRad=0,this.m_lowest=new o.IntPoint0,this.m_polyNodes=new o.PolyNode,this.MiterLimit=t,this.ArcTolerance=e,this.m_lowest.X=-1},o.ClipperOffset.two_pi=6.28318530717959,o.ClipperOffset.def_arc_tolerance=.25,o.ClipperOffset.prototype.Clear=function(){o.Clear(this.m_polyNodes.Childs()),this.m_lowest.X=-1},o.ClipperOffset.Round=o.Clipper.Round,o.ClipperOffset.prototype.AddPath=function(t,e,i){var n=t.length-1;if(!(n<0)){var r=new o.PolyNode;if(r.m_jointype=e,r.m_endtype=i,i===o.EndType.etClosedLine||i===o.EndType.etClosedPolygon)for(;n>0&&o.IntPoint.op_Equality(t[0],t[n]);)n--;r.m_polygon.push(t[0]);for(var s=0,l=0,p=1;p<=n;p++)o.IntPoint.op_Inequality(r.m_polygon[s],t[p])&&(s++,r.m_polygon.push(t[p]),(t[p].Y>r.m_polygon[l].Y||t[p].Y===r.m_polygon[l].Y&&t[p].X<r.m_polygon[l].X)&&(l=s));if((i!==o.EndType.etClosedPolygon||!(s<2))&&(this.m_polyNodes.AddChild(r),i===o.EndType.etClosedPolygon)){if(this.m_lowest.X<0)this.m_lowest=new o.IntPoint2(this.m_polyNodes.ChildCount()-1,l);else{var u=this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];(r.m_polygon[l].Y>u.Y||r.m_polygon[l].Y===u.Y&&r.m_polygon[l].X<u.X)&&(this.m_lowest=new o.IntPoint2(this.m_polyNodes.ChildCount()-1,l))}}}},o.ClipperOffset.prototype.AddPaths=function(t,e,i){for(var n=0,o=t.length;n<o;n++)this.AddPath(t[n],e,i)},o.ClipperOffset.prototype.FixOrientations=function(){if(this.m_lowest.X>=0&&!o.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))for(var t=0;t<this.m_polyNodes.ChildCount();t++){var e=this.m_polyNodes.Childs()[t];(e.m_endtype===o.EndType.etClosedPolygon||e.m_endtype===o.EndType.etClosedLine&&o.Clipper.Orientation(e.m_polygon))&&e.m_polygon.reverse()}else for(var t=0;t<this.m_polyNodes.ChildCount();t++){var e=this.m_polyNodes.Childs()[t];e.m_endtype!==o.EndType.etClosedLine||o.Clipper.Orientation(e.m_polygon)||e.m_polygon.reverse()}},o.ClipperOffset.GetUnitNormal=function(t,e){var i=e.X-t.X,n=e.Y-t.Y;if(0===i&&0===n)return new o.DoublePoint2(0,0);var r=1/Math.sqrt(i*i+n*n);return i*=r,n*=r,new o.DoublePoint2(n,-i)},o.ClipperOffset.prototype.DoOffset=function(t){if(this.m_destPolys=[],this.m_delta=t,o.ClipperBase.near_zero(t)){for(var e=0;e<this.m_polyNodes.ChildCount();e++){var i=this.m_polyNodes.Childs()[e];i.m_endtype===o.EndType.etClosedPolygon&&this.m_destPolys.push(i.m_polygon)}return}this.MiterLimit>2?this.m_miterLim=2/(this.MiterLimit*this.MiterLimit):this.m_miterLim=.5;var n=3.14159265358979/Math.acos(1-(f=this.ArcTolerance<=0?o.ClipperOffset.def_arc_tolerance:this.ArcTolerance>Math.abs(t)*o.ClipperOffset.def_arc_tolerance?Math.abs(t)*o.ClipperOffset.def_arc_tolerance:this.ArcTolerance)/Math.abs(t));this.m_sin=Math.sin(o.ClipperOffset.two_pi/n),this.m_cos=Math.cos(o.ClipperOffset.two_pi/n),this.m_StepsPerRad=n/o.ClipperOffset.two_pi,t<0&&(this.m_sin=-this.m_sin);for(var e=0;e<this.m_polyNodes.ChildCount();e++){var i=this.m_polyNodes.Childs()[e];this.m_srcPoly=i.m_polygon;var r=this.m_srcPoly.length;if(0!==r&&(!(t<=0)||!(r<3)&&i.m_endtype===o.EndType.etClosedPolygon)){if(this.m_destPoly=[],1===r){if(i.m_jointype===o.JoinType.jtRound)for(var s=1,l=0,p=1;p<=n;p++){this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[0].X+s*t),o.ClipperOffset.Round(this.m_srcPoly[0].Y+l*t)));var u=s;s=s*this.m_cos-this.m_sin*l,l=u*this.m_sin+l*this.m_cos}else for(var s=-1,l=-1,p=0;p<4;++p)this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[0].X+s*t),o.ClipperOffset.Round(this.m_srcPoly[0].Y+l*t))),s<0?s=1:l<0?l=1:s=-1;this.m_destPolys.push(this.m_destPoly);continue}this.m_normals.length=0;for(var p=0;p<r-1;p++)this.m_normals.push(o.ClipperOffset.GetUnitNormal(this.m_srcPoly[p],this.m_srcPoly[p+1]));if(i.m_endtype===o.EndType.etClosedLine||i.m_endtype===o.EndType.etClosedPolygon?this.m_normals.push(o.ClipperOffset.GetUnitNormal(this.m_srcPoly[r-1],this.m_srcPoly[0])):this.m_normals.push(new o.DoublePoint1(this.m_normals[r-2])),i.m_endtype===o.EndType.etClosedPolygon){for(var h=r-1,p=0;p<r;p++)h=this.OffsetPoint(p,h,i.m_jointype);this.m_destPolys.push(this.m_destPoly)}else if(i.m_endtype===o.EndType.etClosedLine){for(var h=r-1,p=0;p<r;p++)h=this.OffsetPoint(p,h,i.m_jointype);this.m_destPolys.push(this.m_destPoly),this.m_destPoly=[];for(var a=this.m_normals[r-1],p=r-1;p>0;p--)this.m_normals[p]=new o.DoublePoint2(-this.m_normals[p-1].X,-this.m_normals[p-1].Y);this.m_normals[0]=new o.DoublePoint2(-a.X,-a.Y),h=0;for(var p=r-1;p>=0;p--)h=this.OffsetPoint(p,h,i.m_jointype);this.m_destPolys.push(this.m_destPoly)}else{for(var f,P,h=0,p=1;p<r-1;++p)h=this.OffsetPoint(p,h,i.m_jointype);if(i.m_endtype===o.EndType.etOpenButt){var p=r-1;P=new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[p].X+this.m_normals[p].X*t),o.ClipperOffset.Round(this.m_srcPoly[p].Y+this.m_normals[p].Y*t)),this.m_destPoly.push(P),P=new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[p].X-this.m_normals[p].X*t),o.ClipperOffset.Round(this.m_srcPoly[p].Y-this.m_normals[p].Y*t)),this.m_destPoly.push(P)}else{var p=r-1;h=r-2,this.m_sinA=0,this.m_normals[p]=new o.DoublePoint2(-this.m_normals[p].X,-this.m_normals[p].Y),i.m_endtype===o.EndType.etOpenSquare?this.DoSquare(p,h):this.DoRound(p,h)}for(var p=r-1;p>0;p--)this.m_normals[p]=new o.DoublePoint2(-this.m_normals[p-1].X,-this.m_normals[p-1].Y);this.m_normals[0]=new o.DoublePoint2(-this.m_normals[1].X,-this.m_normals[1].Y),h=r-1;for(var p=h-1;p>0;--p)h=this.OffsetPoint(p,h,i.m_jointype);i.m_endtype===o.EndType.etOpenButt?(P=new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[0].X-this.m_normals[0].X*t),o.ClipperOffset.Round(this.m_srcPoly[0].Y-this.m_normals[0].Y*t)),this.m_destPoly.push(P),P=new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[0].X+this.m_normals[0].X*t),o.ClipperOffset.Round(this.m_srcPoly[0].Y+this.m_normals[0].Y*t)),this.m_destPoly.push(P)):(h=1,this.m_sinA=0,i.m_endtype===o.EndType.etOpenSquare?this.DoSquare(0,1):this.DoRound(0,1)),this.m_destPolys.push(this.m_destPoly)}}}},o.ClipperOffset.prototype.Execute=function(){var t=arguments;if(t[0]instanceof o.PolyTree){var e=t[0],i=t[1];e.Clear(),this.FixOrientations(),this.DoOffset(i);var n=new o.Clipper(0);if(n.AddPaths(this.m_destPolys,o.PolyType.ptSubject,!0),i>0)n.Execute(o.ClipType.ctUnion,e,o.PolyFillType.pftPositive,o.PolyFillType.pftPositive);else{var r=o.Clipper.GetBounds(this.m_destPolys),s=new o.Path;if(s.push(new o.IntPoint2(r.left-10,r.bottom+10)),s.push(new o.IntPoint2(r.right+10,r.bottom+10)),s.push(new o.IntPoint2(r.right+10,r.top-10)),s.push(new o.IntPoint2(r.left-10,r.top-10)),n.AddPath(s,o.PolyType.ptSubject,!0),n.ReverseSolution=!0,n.Execute(o.ClipType.ctUnion,e,o.PolyFillType.pftNegative,o.PolyFillType.pftNegative),1===e.ChildCount()&&e.Childs()[0].ChildCount()>0){var l=e.Childs()[0];e.Childs()[0]=l.Childs()[0],e.Childs()[0].m_Parent=e;for(var p=1;p<l.ChildCount();p++)e.AddChild(l.Childs()[p])}else e.Clear()}}else{var e=t[0],i=t[1];o.Clear(e),this.FixOrientations(),this.DoOffset(i);var n=new o.Clipper(0);if(n.AddPaths(this.m_destPolys,o.PolyType.ptSubject,!0),i>0)n.Execute(o.ClipType.ctUnion,e,o.PolyFillType.pftPositive,o.PolyFillType.pftPositive);else{var r=o.Clipper.GetBounds(this.m_destPolys),s=new o.Path;s.push(new o.IntPoint2(r.left-10,r.bottom+10)),s.push(new o.IntPoint2(r.right+10,r.bottom+10)),s.push(new o.IntPoint2(r.right+10,r.top-10)),s.push(new o.IntPoint2(r.left-10,r.top-10)),n.AddPath(s,o.PolyType.ptSubject,!0),n.ReverseSolution=!0,n.Execute(o.ClipType.ctUnion,e,o.PolyFillType.pftNegative,o.PolyFillType.pftNegative),e.length>0&&e.splice(0,1)}}},o.ClipperOffset.prototype.OffsetPoint=function(t,e,i){if(this.m_sinA=this.m_normals[e].X*this.m_normals[t].Y-this.m_normals[t].X*this.m_normals[e].Y,1>Math.abs(this.m_sinA*this.m_delta)){if(this.m_normals[e].X*this.m_normals[t].X+this.m_normals[t].Y*this.m_normals[e].Y>0)return this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+this.m_normals[e].X*this.m_delta),o.ClipperOffset.Round(this.m_srcPoly[t].Y+this.m_normals[e].Y*this.m_delta))),e}else this.m_sinA>1?this.m_sinA=1:this.m_sinA<-1&&(this.m_sinA=-1);if(this.m_sinA*this.m_delta<0)this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+this.m_normals[e].X*this.m_delta),o.ClipperOffset.Round(this.m_srcPoly[t].Y+this.m_normals[e].Y*this.m_delta))),this.m_destPoly.push(new o.IntPoint1(this.m_srcPoly[t])),this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+this.m_normals[t].X*this.m_delta),o.ClipperOffset.Round(this.m_srcPoly[t].Y+this.m_normals[t].Y*this.m_delta)));else switch(i){case o.JoinType.jtMiter:var n=1+(this.m_normals[t].X*this.m_normals[e].X+this.m_normals[t].Y*this.m_normals[e].Y);n>=this.m_miterLim?this.DoMiter(t,e,n):this.DoSquare(t,e);break;case o.JoinType.jtSquare:this.DoSquare(t,e);break;case o.JoinType.jtRound:this.DoRound(t,e)}return e=t},o.ClipperOffset.prototype.DoSquare=function(t,e){var i=Math.tan(Math.atan2(this.m_sinA,this.m_normals[e].X*this.m_normals[t].X+this.m_normals[e].Y*this.m_normals[t].Y)/4);this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+this.m_delta*(this.m_normals[e].X-this.m_normals[e].Y*i)),o.ClipperOffset.Round(this.m_srcPoly[t].Y+this.m_delta*(this.m_normals[e].Y+this.m_normals[e].X*i)))),this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+this.m_delta*(this.m_normals[t].X+this.m_normals[t].Y*i)),o.ClipperOffset.Round(this.m_srcPoly[t].Y+this.m_delta*(this.m_normals[t].Y-this.m_normals[t].X*i))))},o.ClipperOffset.prototype.DoMiter=function(t,e,i){var n=this.m_delta/i;this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+(this.m_normals[e].X+this.m_normals[t].X)*n),o.ClipperOffset.Round(this.m_srcPoly[t].Y+(this.m_normals[e].Y+this.m_normals[t].Y)*n)))},o.ClipperOffset.prototype.DoRound=function(t,e){for(var i,n=Math.atan2(this.m_sinA,this.m_normals[e].X*this.m_normals[t].X+this.m_normals[e].Y*this.m_normals[t].Y),r=Math.max(o.Cast_Int32(o.ClipperOffset.Round(this.m_StepsPerRad*Math.abs(n))),1),s=this.m_normals[e].X,l=this.m_normals[e].Y,p=0;p<r;++p)this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+s*this.m_delta),o.ClipperOffset.Round(this.m_srcPoly[t].Y+l*this.m_delta))),i=s,s=s*this.m_cos-this.m_sin*l,l=i*this.m_sin+l*this.m_cos;this.m_destPoly.push(new o.IntPoint2(o.ClipperOffset.Round(this.m_srcPoly[t].X+this.m_normals[t].X*this.m_delta),o.ClipperOffset.Round(this.m_srcPoly[t].Y+this.m_normals[t].Y*this.m_delta)))},o.Error=function(t){try{throw Error(t)}catch(e){alert(e.message)}},o.JS={},o.JS.AreaOfPolygon=function(t,e){return e||(e=1),o.Clipper.Area(t)/(e*e)},o.JS.AreaOfPolygons=function(t,e){e||(e=1);for(var i=0,n=0;n<t.length;n++)i+=o.Clipper.Area(t[n]);return i/(e*e)},o.JS.BoundsOfPath=function(t,e){return o.JS.BoundsOfPaths([t],e)},o.JS.BoundsOfPaths=function(t,e){e||(e=1);var i=o.Clipper.GetBounds(t);return i.left/=e,i.bottom/=e,i.right/=e,i.top/=e,i},o.JS.Clean=function(t,e){if(!(t instanceof Array))return[];var i,n,r,s,l,p,u,h=t[0]instanceof Array,t=o.JS.Clone(t);if("number"!=typeof e||null===e)return o.Error("Delta is not a number in Clean()."),t;if(0===t.length||1===t.length&&0===t[0].length||e<0)return t;h||(t=[t]);for(var a=t.length,f=[],P=0;P<a;P++)if(0!==(i=(n=t[P]).length)){if(i<3){r=n,f.push(r);continue}for(u=1,r=n,s=e*e,l=n[0],p=1;u<i;u++)!((n[u].X-l.X)*(n[u].X-l.X)+(n[u].Y-l.Y)*(n[u].Y-l.Y)<=s)&&(r[p]=n[u],l=n[u],p++);l=n[p-1],(n[0].X-l.X)*(n[0].X-l.X)+(n[0].Y-l.Y)*(n[0].Y-l.Y)<=s&&p--,p<i&&r.splice(p,i-p),r.length&&f.push(r)}return!h&&f.length?f=f[0]:h||0!==f.length?h&&0===f.length&&(f=[[]]):f=[],f},o.JS.Clone=function(t){if(!(t instanceof Array)||0===t.length)return[];if(1===t.length&&0===t[0].length)return[[]];var e=t[0]instanceof Array;e||(t=[t]);var i,n,o,r,s=t.length,l=Array(s);for(n=0;n<s;n++){for(o=0,r=Array(i=t[n].length);o<i;o++)r[o]={X:t[n][o].X,Y:t[n][o].Y};l[n]=r}return e||(l=l[0]),l},o.JS.Lighten=function(t,e){if(!(t instanceof Array))return[];if("number"!=typeof e||null===e)return o.Error("Tolerance is not a number in Lighten()."),o.JS.Clone(t);if(0===t.length||1===t.length&&0===t[0].length||e<0)return o.JS.Clone(t);var i,n,r,s,l,p,u,h,a,f,P,d,m,y,$,c,v,C=t[0]instanceof Array;C||(t=[t]);var x=t.length,I=e*e,_=[];for(i=0;i<x;i++)if(0!==(p=(r=t[i]).length)){for(s=0;s<1e6;s++){for(l=[],r[(p=r.length)-1].X!==r[0].X||r[p-1].Y!==r[0].Y?(d=1,r.push({X:r[0].X,Y:r[0].Y}),p=r.length):d=0,P=[],n=0;n<p-2;n++)u=r[n],a=r[n+1],h=r[n+2],c=u.X,v=u.Y,m=h.X-c,y=h.Y-v,(0!==m||0!==y)&&(($=((a.X-c)*m+(a.Y-v)*y)/(m*m+y*y))>1?(c=h.X,v=h.Y):$>0&&(c+=m*$,v+=y*$)),(f=(m=a.X-c)*m+(y=a.Y-v)*y)<=I&&(P[n+1]=1,n++);for(l.push({X:r[0].X,Y:r[0].Y}),n=1;n<p-1;n++)P[n]||l.push({X:r[n].X,Y:r[n].Y});if(l.push({X:r[p-1].X,Y:r[p-1].Y}),d&&r.pop(),P.length)r=l;else break}l[(p=l.length)-1].X===l[0].X&&l[p-1].Y===l[0].Y&&l.pop(),l.length>2&&_.push(l)}return C||(_=_[0]),void 0===_&&(_=[]),_},o.JS.PerimeterOfPath=function(t,e,i){if(void 0===t)return 0;var n,o,r=Math.sqrt,s=0,l=0,p=0,u=0,h=0,a=t.length;if(a<2)return 0;for(e&&(t[a]=t[0],a++);--a;)l=(n=t[a]).X,p=n.Y,s+=r((l-(u=(o=t[a-1]).X))*(l-u)+(p-(h=o.Y))*(p-h));return e&&t.pop(),s/i},o.JS.PerimeterOfPaths=function(t,e,i){i||(i=1);for(var n=0,r=0;r<t.length;r++)n+=o.JS.PerimeterOfPath(t[r],e,i);return n},o.JS.ScaleDownPath=function(t,e){var i,n;for(e||(e=1),i=t.length;i--;)(n=t[i]).X=n.X/e,n.Y=n.Y/e},o.JS.ScaleDownPaths=function(t,e){var i,n,o;for(e||(e=1),i=t.length;i--;)for(n=t[i].length;n--;)(o=t[i][n]).X=o.X/e,o.Y=o.Y/e},o.JS.ScaleUpPath=function(t,e){var i,n,o=Math.round;for(e||(e=1),i=t.length;i--;)(n=t[i]).X=o(n.X*e),n.Y=o(n.Y*e)},o.JS.ScaleUpPaths=function(t,e){var i,n,o,r=Math.round;for(e||(e=1),i=t.length;i--;)for(n=t[i].length;n--;)(o=t[i][n]).X=r(o.X*e),o.Y=r(o.Y*e)},o.ExPolygons=function(){return[]},o.ExPolygon=function(){this.outer=null,this.holes=null},o.JS.AddOuterPolyNodeToExPolygons=function(t,e){var i,n,r,s,l,p,u=new o.ExPolygon;u.outer=t.Contour();var h=t.Childs(),a=h.length;for(r=0,u.holes=Array(a);r<a;r++)for(s=0,i=h[r],u.holes[r]=i.Contour(),p=(l=i.Childs()).length;s<p;s++)n=l[s],o.JS.AddOuterPolyNodeToExPolygons(n,e);e.push(u)},o.JS.ExPolygonsToPaths=function(t){var e,i,n,r,s=new o.Paths;for(e=0,n=t.length;e<n;e++)for(s.push(t[e].outer),i=0,r=t[e].holes.length;i<r;i++)s.push(t[e].holes[i]);return s},o.JS.PolyTreeToExPolygons=function(t){var e,i,n,r,s=new o.ExPolygons;for(i=0,r=(n=t.Childs()).length;i<r;i++)e=n[i],o.JS.AddOuterPolyNodeToExPolygons(e,s);return s}}();

// console.log(window.ClipperLib)
// const ClipperLib = window.ClipperLib
const TOL = 1e-9

const clipperScale = 1e7
const clipperThreshold = 0.0001 * clipperScale

const toClipperCoordinates = function(points) {
  let result = points.map(p => {
    return {
      X: p.x * clipperScale,
      Y: p.y * clipperScale
    }
  })
  return result
}

const toNestCoordinates = function(path) {
  return path.map(p => {
    return new Vector(p.X / clipperScale, p.Y / clipperScale)
  })
}

const approximately = function (a, b, tolerance) {
  if (!tolerance) {
    tolerance = TOL
  }
  return (Math.abs(a - b) < tolerance)
}

const bounds = function(points) {
  let minX = Number.MAX_VALUE, maxX = Number.MIN_VALUE
  let minY = Number.MAX_VALUE, maxY = Number.MIN_VALUE

  points.forEach(p => {
    minX = Math.min(p.x, minX)
    minY = Math.min(p.y, minY)
    maxX = Math.max(p.x, maxX)
    maxY = Math.max(p.y, maxY)
  })

  return new BoundingBox(
    new Vector(minX, minY),
    new Vector(maxX, maxY)
  )
}

// returns true if p lies on the line segment defined by AB, but not at any endpoints
// may need work!
const onSegment = function (A, B, p) {

  // vertical line
  if (approximately(A.x, B.x) && approximately(p.x, A.x)) {
    if (!approximately(p.y, B.y) && !approximately(p.y, A.y) && p.y < Math.max(B.y, A.y) && p.y > Math.min(B.y, A.y)) {
      return true
    }
    else {
      return false
    }
  }

  // horizontal line
  if (approximately(A.y, B.y) && approximately(p.y, A.y)) {
    if (!approximately(p.x, B.x) && !approximately(p.x, A.x) && p.x < Math.max(B.x, A.x) && p.x > Math.min(B.x, A.x)) {
      return true
    }
    else {
      return false
    }
  }

  // range check
  if ((p.x < A.x && p.x < B.x) || (p.x > A.x && p.x > B.x) || (p.y < A.y && p.y < B.y) || (p.y > A.y && p.y > B.y)) {
    return false
  }

  // exclude end points
  if ((approximately(p.x, A.x) && approximately(p.y, A.y)) || (approximately(p.x, B.x) && approximately(p.y, B.y))) {
    return false;
  }

  const cross = (p.y - A.y) * (B.x - A.x) - (p.x - A.x) * (B.y - A.y)

  if (Math.abs(cross) > TOL) {
    return false
  }

  const dot = (p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)

  if (dot < 0 || approximately(dot, 0)) {
    return false
  }

  const len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)

  if (dot > len2 || approximately(dot, len2)) {
    return false
  }

  return true
}

const pointInPolygon = function (point, polygon) {
  if (!polygon || polygon.points.length < 3) {
    return null
  }

  let inside = false

  for (let n = polygon.points.length, i = 0, j = n - 1; i < n; j = i++) {
    let pi = polygon.points[i].add(polygon.offset)
    let pj = polygon.points[j].add(polygon.offset)

    if(pi.approximately(point)) {
      return null // no result
    }

    if (onSegment(pi, pj, point)) {
      return null // exactly on the segment
    }

    if (pi.approximately(pj)) {
      // ignore very small lines
      continue
    }

    let intersected = ((pi.y > point.y) != (pj.y > point.y)) && (point.x < (pj.x - pi.x) * (point.y - pi.y) / (pj.y - pi.y) + pi.x)
    if (intersected) {
      inside = !inside
    }
  }

  return inside
}

const pointDistance = function (p, s1, s2, normal, infinite) {
  normal = normal.normalize()

  let dir = normal.perpendicular()

  let pdot = p.dot(dir)
  let s1dot = s1.dot(dir)
  let s2dot = s2.dot(dir)

  let pdotnorm = p.dot(normal)
  let s1dotnorm = s1.dot(normal)
  let s2dotnorm = s2.dot(normal)

  if (!infinite) {
    if (((pdot < s1dot || approximately(pdot, s1dot)) && (pdot < s2dot || approximately(pdot, s2dot))) || ((pdot > s1dot || approximately(pdot, s1dot)) && (pdot > s2dot || approximately(pdot, s2dot)))) {
      return null // dot doesn't collide with segment, or lies directly on the vertex
    }
    if ((approximately(pdot, s1dot) && approximately(pdot, s2dot)) && (pdotnorm > s1dotnorm && pdotnorm > s2dotnorm)) {
      return Math.min(pdotnorm - s1dotnorm, pdotnorm - s2dotnorm)
    }
    if ((approximately(pdot, s1dot) && approximately(pdot, s2dot)) && (pdotnorm < s1dotnorm && pdotnorm < s2dotnorm)) {
      return -Math.min(s1dotnorm - pdotnorm, s2dotnorm - pdotnorm)
    }
  }

  return -(pdotnorm - s1dotnorm + (s1dotnorm - s2dotnorm) * (s1dot - pdot) / (s1dot - s2dot))
}

const segmentDistance = function (A, B, E, F, direction) {
  // console.log(A, B, E, F, direction)

  let normal = direction.perpendicular()

  let dotA = A.dot(normal)
  let dotB = B.dot(normal)
  let dotE = E.dot(normal)
  let dotF = F.dot(normal)

  let crossA = A.cross(direction)
  let crossB = B.cross(direction)
  let crossE = E.cross(direction)
  let crossF = F.cross(direction)

  let ABmin = Math.min(dotA, dotB)
  let ABmax = Math.max(dotA, dotB)

  let EFmax = Math.max(dotE, dotF)
  let EFmin = Math.min(dotE, dotF)

  // segments that will merely touch at one point
  if (approximately(ABmax, EFmin) || approximately(ABmin, EFmax)) {
    return null
  }

  // segments miss eachother completely
  if (ABmax < EFmin || ABmin > EFmax) {
    return null
  }

  let overlap
  if ((ABmax > EFmax && ABmin < EFmin) || (EFmax > ABmax && EFmin < ABmin)) {
    overlap = 1
  }
  else {
    let minMax = Math.min(ABmax, EFmax)
    let maxMin = Math.max(ABmin, EFmin)

    let maxMax = Math.max(ABmax, EFmax)
    let minMin = Math.min(ABmin, EFmin)

    overlap = (minMax - maxMin) / (maxMax - minMin)
  }

  let ae = E.sub(A)
  let ab = B.sub(A)
  let af = F.sub(A)
  let ef = E.sub(F)

  let crossABE = ae.cross(ab)
  let crossABF = af.cross(ab)

  // lines are colinear
  if (approximately(crossABE, 0) && approximately(crossABF, 0)) {
    let ABnorm = ab.perpendicular().normalize()
    let EFnorm = ef.perpendicular().normalize()

    // segment normals must point in opposite directions

    if (Math.abs(ABnorm.cross(EFnorm)) < TOL && ABnorm.dot(EFnorm) < 0) {
      // normal of AB segment must point in same direction as given direction vector
      let normdot = ABnorm.dot(direction)
      // the segments merely slide along eachother
      if (approximately(normdot, 0)) {
        return null
      }

      if (normdot < 0) {
        return 0
      }
    }

    return null
  }

  let distances = []

  let reverse = direction.negative()

  // coincident points
  if (approximately(dotA, dotE)) {
    distances.push(crossA - crossE);
  }
  else if (approximately(dotA, dotF)) {
    distances.push(crossA - crossF);
  }
  else if (dotA > EFmin && dotA < EFmax) {
    let d = pointDistance(A, E, F, reverse)
    if (d !== null && approximately(d, 0)) { //  A currently touches EF, but AB is moving away from EF
      var dB = pointDistance(B, E, F, reverse, true)
      if (dB < 0 || approximately(dB * overlap, 0)) {
        d = null
      }
    }
    if (d !== null) {
      distances.push(d)
    }
  }

  if (approximately(dotB, dotE)) {
    distances.push(crossB - crossE)
  }
  else if (approximately(dotB, dotF)) {
    distances.push(crossB - crossF)
  }
  else if (dotB > EFmin && dotB < EFmax) {
    let d = pointDistance(B, E, F, reverse)
    if (d !== null && approximately(d, 0)) { // crossA>crossB A currently touches EF, but AB is moving away from EF
      var dA = pointDistance(A, E, F, reverse, true)
      if (dA < 0 || approximately(dA * overlap, 0)) {
        d = null
      }
    }
    if (d !== null) {
      distances.push(d)
    }
  }

  if (dotE > ABmin && dotE < ABmax) {
    let d = pointDistance(E, A, B, direction)
    if (d !== null && approximately(d, 0)) { // crossF<crossE A currently touches EF, but AB is moving away from EF
      let dF = pointDistance(F, A, B, direction, true)
      if (dF < 0 || approximately(dF * overlap, 0)) {
        d = null
      }
    }
    if (d !== null) {
      distances.push(d)
    }
  }

  if (dotF > ABmin && dotF < ABmax) {
    let d = pointDistance(F, A, B, direction)
    if (d !== null && approximately(d, 0)) { // && crossE<crossF A currently touches EF, but AB is moving away from EF
      let dE = pointDistance(E, A, B, direction, true)
      if (dE < 0 || approximately(dE * overlap, 0)) {
        d = null
      }
    }
    if (d !== null) {
      distances.push(d)
    }
  }

  if (distances.length <= 0) {
    return null
  }

  let min = Math.min.apply(Math, distances)
  return min
}

const polygonSlideDistance = function (A, B, direction, ignoreNegative) {
  let AP = A.points.slice(0)
  let BP = B.points.slice(0)

  // close the loop for polygons
  if (AP[0] != AP[AP.length - 1]) {
    AP.push(AP[0])
  }

  if (BP[0] != BP[BP.length - 1]) {
    BP.push(BP[0]);
  }

  let distance = null
  let dir = direction.normalize()

  for (var i = 0; i < BP.length - 1; i++) {
    for (var j = 0; j < AP.length - 1; j++) {
      let A1 = AP[j].add(A.offset)
      let A2 = AP[j + 1].add(A.offset)
      let B1 = BP[i].add(B.offset)
      let B2 = BP[i + 1].add(B.offset)
      if (A1.approximately(A2) || B1.approximately(B2)) {
        continue
      }

      let d = segmentDistance(A1, A2, B1, B2, dir)
      if (d !== null && (distance === null || d < distance)) {
        if (!ignoreNegative || d > 0 || approximately(d, 0)) {
          distance = d
        }
      }
    }
  }

  return distance
}

// project each point of B onto A in the given direction, and return the 
const polygonProjectionDistance = function (A, B, direction) {
  let AP = A.points.slice(0)
  let BP = B.points.slice(0)

  // close the loop for polygons
  if (AP[0] != AP[AP.length - 1]) {
    AP.push(AP[0]);
  }

  if (BP[0] != BP[BP.length - 1]) {
    BP.push(BP[0]);
  }

  let distance = null

  for (var i = 0; i < BP.length; i++) {
    // the shortest/most negative projection of B onto A
    let minProjection = null

    for (var j = 0; j < AP.length - 1; j++) {
      let p = BP[i].add(B.offset)
      let s1 = AP[j].add(A.offset)
      let s2 = AP[j + 1].add(A.offset)

      let s12 = s2.sub(s1)
      if (Math.abs(s12.cross(direction)) < TOL) {
        continue
      }

      // project point, ignore edge boundaries
      let d = pointDistance(p, s1, s2, direction)
      if (d !== null && (minProjection === null || d < minProjection)) {
        minProjection = d
      }
    }

    if (minProjection !== null && (distance === null || minProjection > distance)) {
      distance = minProjection
    }
  }

  return distance
}

const lineIntersect = function (A, B, E, F, infinite) {
  let a1 = B.y - A.y;
  let b1 = A.x - B.x;
  let c1 = B.x * A.y - A.x * B.y;
  let a2 = F.y - E.y;
  let b2 = E.x - F.x;
  let c2 = F.x * E.y - E.x * F.y;

  let denom = a1 * b2 - a2 * b1;

  let x = (b1 * c2 - b2 * c1) / denom
  let y = (a2 * c1 - a1 * c2) / denom

  if (!isFinite(x) || !isFinite(y)) {
    return null
  }

  // lines are colinear
  /*var crossABE = (E.y - A.y) * (B.x - A.x) - (E.x - A.x) * (B.y - A.y);
  var crossABF = (F.y - A.y) * (B.x - A.x) - (F.x - A.x) * (B.y - A.y);
  if(_almostEqual(crossABE,0) && _almostEqual(crossABF,0)){
    return null;
  }*/

  if (!infinite) {
    // coincident points do not count as intersecting
    if (Math.abs(A.x - B.x) > TOL && ((A.x < B.x) ? x < A.x || x > B.x : x > A.x || x < B.x)) return null
    if (Math.abs(A.y - B.y) > TOL && ((A.y < B.y) ? y < A.y || y > B.y : y > A.y || y < B.y)) return null

    if (Math.abs(E.x - F.x) > TOL && ((E.x < F.x) ? x < E.x || x > F.x : x > E.x || x < F.x)) return null
    if (Math.abs(E.y - F.y) > TOL && ((E.y < F.y) ? y < E.y || y > F.y : y > E.y || y < F.y)) return null
  }

  return new Vector(x, y)
}

const intersect = function (A, B) {
  let AP = A.points.slice(0)
  let BP = B.points.slice(0)

  for (let i = 0, n = AP.length; i < n - 1; i++) {
    for (let j = 0, m = BP.length; j < m - 1; j++) {
      let a1 = AP[i].add(A.offset)
      let a2 = AP[i + 1].add(A.offset)
      let b1 = BP[j].add(B.offset)
      let b2 = BP[j + 1].add(B.offset)

      let prevbindex = (j == 0) ? m - 1 : j - 1
      let prevaindex = (i == 0) ? n - 1 : i - 1
      let nextbindex = (j + 1 == m - 1) ? 0 : j + 2
      let nextaindex = (i + 1 == n - 1) ? 0 : i + 2

      // go even further back if we happen to hit on a loop end point
      if (BP[prevbindex] == BP[j] || BP[prevbindex].approximately(BP[j])) {
        prevbindex = (prevbindex == 0) ? m - 1 : prevbindex - 1
      }

      if (AP[prevaindex] == AP[i] || AP[prevaindex].approximately(AP[i])) {
        prevaindex = (prevaindex == 0) ? n - 1 : prevaindex - 1
      }

      // go even further forward if we happen to hit on a loop end point
      if (BP[nextbindex] == BP[j + 1] || BP[nextbindex].approximately(BP[j + 1])) {
        nextbindex = (nextbindex == m - 1) ? 0 : nextbindex + 1
      }

      if (AP[nextaindex] == AP[i + 1] || AP[nextaindex].approximately(AP[i + 1])) {
        nextaindex = (nextaindex == n - 1) ? 0 : nextaindex + 1
      }

      let a0 = AP[prevaindex].add(A.offset)
      let b0 = BP[prevbindex].add(B.offset)

      let a3 = AP[nextaindex].add(A.offset)
      let b3 = BP[nextbindex].add(B.offset)

      if (onSegment(a1, a2, b1) || a1.approximately(b1)) {
        let b0in = pointInPolygon(b0, A)
        let b2in = pointInPolygon(b2, A)
        if ((b0in === true && b2in === false) || (b0in === false && b2in === true)) {
          return true
        }
        else {
          continue;
        }
      }

      if (onSegment(a1, a2, b2) || a2.approximately(b2)) {
        // if a point is on a segment, it could intersect or it could not. Check via the neighboring points
        let b1in = pointInPolygon(b1, A)
        let b3in = pointInPolygon(b3, A)
        if ((b1in === true && b3in === false) || (b1in === false && b3in === true)) {
          return true
        }
        else {
          continue
        }
      }

      if (onSegment(b1, b2, a1) || a1.approximately(b2)) {
        // if a point is on a segment, it could intersect or it could not. Check via the neighboring points
        let a0in = pointInPolygon(a0, B)
        let a2in = pointInPolygon(a2, B)

        if ((a0in === true && a2in === false) || (a0in === false && a2in === true)) {
          return true
        }
        else {
          continue
        }
      }

      if (onSegment(b1, b2, a2) || a2.approximately(b1)) {
        // if a point is on a segment, it could intersect or it could not. Check via the neighboring points
        let a1in = pointInPolygon(a1, B)
        let a3in = pointInPolygon(a3, B)

        if ((a1in === true && a3in === false) || (a1in === false && a3in === true)) {
          return true
        }
        else {
          continue
        }
      }

      let p = lineIntersect(b1, b2, a1, a2)

      if (p !== null) {
        return true
      }
    }
  }

  return false
}

// searches for an arrangement of A and B such that they do not overlap
// if an NFP is given, only search for startpoints that have not already been traversed in the given NFP
const searchStartPoint = function(A, B, inside, NFP) {
  // clone arrays
  let AP = A.points.slice(0)
  let BP = B.points.slice(0)
  // console.log('searchStartPoint', AP, BP)

  // close the loop for polygons
  if (AP[0] != AP[AP.length - 1]) {
    AP.push(AP[0]);
  }

  if (BP[0] != BP[BP.length - 1]) {
    BP.push(BP[0]);
  }

  for (let i = 0; i < AP.length - 1; i++) {
    if (!AP[i].marked) {
      AP[i].mark()

      for (let j = 0; j < BP.length; j++) {
        B.offset.set(AP[i].sub(BP[j]))

        let Binside = null
        for (var k = 0; k < BP.length; k++) {
          let inpoly = pointInPolygon(BP[k].add(B.offset), A);
          if (inpoly !== null) {
            Binside = inpoly
            break;
          }
        }

        if (Binside === null) { // A and B are the same
          return null
        }

        let startPoint = B.offset.clone()
        if (((Binside && inside) || (!Binside && !inside)) && !intersect(A, B) && !inNfp(startPoint, NFP)) {
          return startPoint
        }

        // slide B along vector
        let v = AP[i + 1].sub(AP[i])

        let d1 = polygonProjectionDistance(A, B, v)
        let d2 = polygonProjectionDistance(B, A, v.negative())

        let d = null

        // todo: clean this up
        if (d1 === null && d2 === null) {
          // nothing
        }
        else if (d1 === null) {
          d = d2
        }
        else if (d2 === null) {
          d = d1
        }
        else {
          d = Math.min(d1, d2)
        }

        // only slide until no longer negative
        // todo: clean this up
        if (d !== null && !approximately(d, 0) && d > 0) {
        }
        else {
          continue
        }

        let vd2 = v.squaredLength()

        if (d * d < vd2 && !approximately(d * d, vd2)) {
          var vd = Math.sqrt(vd2)
          v = v.multiplyScalar(d / vd)
        }

        B.offset.add(v)

        for (let k = 0; k < BP.length; k++) {
          let inpoly = pointInPolygon(BP[k].add(B.offset), A)
          if (inpoly !== null) {
            Binside = inpoly
            break
          }
        }

        startPoint = B.offset.clone()
        if (((Binside && inside) || (!Binside && !inside)) && !intersect(A, B) && !inNfp(startPoint, NFP)) {
          return startPoint
        }
      }
    }
  }

  // returns true if point already exists in the given nfp
  return null;
}

const inNfp = function (p, nfp) {
  if (!nfp || nfp.length == 0) {
    return false;
  }

  for (let i = 0, n = nfp.length; i < n; i++) {
    for (let j = 0, m = nfp[i].points.length; j < m; j++) {
      if (p.approximately(nfp[i].points[j])) {
        return true;
      }
    }
  }

  return false
}

// interior NFP for the case where A is a rectangle (Bin)
const noFitRectanglePolygon = function (A, B) {
  let abb = A.bounds()
  let bbb = B.bounds()

  // Returns null if B is larger than A
  if (
    (bbb.max.x - bbb.min.x > abb.max.x - abb.min.x) || 
    (bbb.max.y - bbb.min.y > abb.max.y - abb.min.y)
  ) {
    return null
  }

  let p0 = new Vector(abb.min.x - bbb.min.x, abb.min.y - bbb.min.y)
  let p1 = new Vector(abb.max.x - bbb.max.x, abb.min.y - bbb.min.y)
  let p2 = new Vector(abb.max.x - bbb.max.x, abb.max.y - bbb.max.y)
  let p3 = new Vector(abb.min.x - bbb.min.x, abb.max.y - bbb.max.y)

  return new Polygon([
    B.points[0].add(p0),
    B.points[0].add(p1),
    B.points[0].add(p2),
    B.points[0].add(p3)
  ])
}

// given a static polygon A and a movable polygon B, compute a no fit polygon by orbiting B about A
// if the inside flag is set, B is orbited inside of A rather than outside
// if the edges flag is set, all edges of A are explored for NFPs - multiple 
const noFitPolygon = function (A, B, inside = false, edges = false, debug = false) {

  // Initialize all vertices
  // and get ref to min y of A, max y of B
  let minA = A.points[0].y
  let minAindex = 0

  let maxB = B.points[0].y
  let maxBindex = 0

  const la = A.points.length
  const lb = B.points.length

  for (let i = 1; i < la; i++) {
    A.points[i].unmark()
    if (A.points[i].y < minA) {
      minA = A.points[i].y
      minAindex = i
    }
  }

  for (let i = 1; i < lb; i++) {
    B.points[i].unmark()
    if (B.points[i].y > maxB) {
      maxB = B.points[i].y
      maxBindex = i
    }
  }

  let startPoint = null

  if (!inside) {
    // shift B such that the bottom-most point of B is at the top-most point of A. This guarantees an initial placement with no intersections
    startPoint = A.points[minAindex].sub(B.points[maxBindex])
  }
  else {
    // no reliable heuristic for inside
    startPoint = searchStartPoint(A.clone(), B.clone(), true)
  }

  let result = []

  while (startPoint !== null) {
    // console.log('while start', startPoint, B.offset.clone())
    B.offset.set(startPoint)

    // maintain a list of touching points/edges
    let prevVector = null // keep track of previous vector

    let reference = B.points[0].add(B.offset)
    let NFP = [reference.clone()]
    let start = reference.clone()

    let iterations = 0
    const limit = 10 * (la + lb)

    while ((iterations++) < limit) { // sanity check, prevent infinite loop
      let touching = []

      // find touching vertices/edges
      for (let i = 0; i < la; i++) {
        let nexti = (i === la - 1) ? 0 : i + 1
        for (let j = 0; j < lb; j++) {
          let nextj = (j === lb - 1) ? 0 : j + 1
          let bj = B.points[j].add(B.offset)
          if (A.points[i].approximately(bj)) {
            touching.push({ type: 0, A: i, B: j })
          }
          else if (onSegment(A.points[i], A.points[nexti], bj)) {
            touching.push({ type: 1, A: nexti, B: j })
          }
          else if (onSegment(bj, B.points[nextj].add(B.offset), A.points[i])) {
            touching.push({ type: 2, A: i, B: nextj })
          }
        }
      }

      // generate translation vectors from touching vertices/edges
      let vectors = []
      for (let i = 0, tl = touching.length; i < tl; i++) {
        let vertexA = A.points[touching[i].A]
        vertexA.mark()

        // adjacent A vertices
        let prevAindex = touching[i].A - 1
        let nextAindex = touching[i].A + 1

        prevAindex = (prevAindex < 0) ? la - 1 : prevAindex // loop
        nextAindex = (nextAindex >= la) ? 0 : nextAindex // loop

        let prevA = A.points[prevAindex]
        let nextA = A.points[nextAindex]

        // adjacent B vertices
        let vertexB = B.points[touching[i].B]

        let prevBindex = touching[i].B - 1
        let nextBindex = touching[i].B + 1

        prevBindex = (prevBindex < 0) ? lb - 1 : prevBindex // loop
        nextBindex = (nextBindex >= lb) ? 0 : nextBindex // loop

        let prevB = B.points[prevBindex]
        let nextB = B.points[nextBindex]

        switch (touching[i].type) {
          case 0: {
            let va1 = prevA.sub(vertexA)
            let va2 = nextA.sub(vertexA)

            // B vectors need to be inverted
            let vb1 = vertexB.sub(prevB)
            let vb2 = vertexB.sub(nextB)

            vectors.push(new IndexedVector(va1.x, va1.y, vertexA, prevA))
            vectors.push(new IndexedVector(va2.x, va2.y, vertexA, nextA))
            vectors.push(new IndexedVector(vb1.x, vb1.y, prevB, vertexB))
            vectors.push(new IndexedVector(vb2.x, vb2.y, nextB, vertexB))

            break
          }
          case 1: {
            var vb = vertexB.add(B.offset)
            let va1 = vertexA.sub(vb)
            let va2 = prevA.sub(vb)
            vectors.push(new IndexedVector(va1.x, va1.y, prevA, vertexA))
            vectors.push(new IndexedVector(va2.x, va2.y, vertexA, prevA))
            break
          }
          case 2: {
            let va1 = vertexA.sub(vertexB.add(B.offset))
            let va2 = vertexA.sub(prevB.add(B.offset))
            vectors.push(new IndexedVector(va1.x, va1.y, prevB, vertexB))
            vectors.push(new IndexedVector(va2.x, va2.y, vertexB, prevB))
          }
        }
      }

      // todo: there should be a faster way to reject vectors that will cause immediate intersection. For now just check them all

      let translate = null
      let maxd = 0

      for (let i = 0, n = vectors.length; i < n; i++) {
        if (vectors[i].x == 0 && vectors[i].y == 0) {
          continue
        }

        // if this vector points us back to where we came from, ignore it.
        // ie cross product = 0, dot product < 0
        if (prevVector && vectors[i].dot(prevVector) < 0) {
          // compare magnitude with unit vectors
          let unitVector = vectors[i].normalize()
          let prevUnitVector = prevVector.normalize()

          // we need to scale down to unit vectors to normalize vector length. Could also just do a tan here
          if (Math.abs(unitVector.cross(prevUnitVector)) < 1e-8) {
            continue
          }
        }

        let d = polygonSlideDistance(A, B, vectors[i], true)
        let vecd2 = vectors[i].squaredLength()
        if (d === null || d * d > vecd2) {
          d = Math.sqrt(vecd2)
        }

        if (d !== null && d > maxd) {
          maxd = d
          translate = vectors[i]
        }
      }

      if (translate === null || approximately(maxd, 0)) {
        // didn't close the loop, something went wrong here
        NFP = null
        break
      }

      translate.start.mark()
      translate.end.mark()

      // trim
      let vlength2 = translate.squaredLength()
      let maxd2 = maxd * maxd
      if (maxd2 < vlength2 && !approximately(maxd2, vlength2)) {
        let scale = Math.sqrt(maxd2 / vlength2)
        translate = translate.multiplyScalar(scale)
      }

      prevVector = translate.clone()
      reference = reference.add(translate)

      if (reference.approximately(start)) {
        // we've made a full loop
        break
      }

      // if A and B start on a touching horizontal line, the end point may not be the start point
      let looped = false;

      if (NFP.length > 0) {
        for (let i = 0; i < NFP.length - 1; i++) {
          if (reference.approximately(NFP[i])) {
            looped = true
          }
        }
      }

      if (looped) {
        // we've made a full loop
        break
      }

      NFP.push(reference.clone())

      B.offset = B.offset.add(translate)
    }

    if (NFP && NFP.length > 0) {
      // const offset = B.points[0]
      // NFP.map(p => p.sub(offset))
      // result.push(NFP)
      result.push(new Polygon(NFP))
    }

    if (!edges) {
      // only get outer NFP or first inner NFP
      break
    }

    startPoint = searchStartPoint(A.clone(), B.clone(), inside, result)
  }

  return result
}

const minkowskiDifference = function (A, B) {
  let Ac = toClipperCoordinates(A.points)
  let Bc = toClipperCoordinates(B.points)

  for (let i = 0; i < Bc.length; i++) {
    Bc[i].X *= -1
    Bc[i].Y *= -1
  }

  let solution = ClipperLib.Clipper.MinkowskiSum(Ac, Bc, true)

  let minArea = Number.MAX_VALUE
  let minPolygon = undefined

  for (let i = 0, n = solution.length; i < n; i++) {
    let points = toNestCoordinates(solution[i])
    let polygon = new Polygon(points)
    let area = polygon.area()
    if (area < minArea) {
      minArea = area
      minPolygon = polygon
    }
  }

  const offset = B.points[0]
  return [ minPolygon.translate(offset.x, offset.y) ]
}

// http://www.angusj.com/delphi/clipper/documentation/Docs/Units/ClipperLib/Classes/ClipperOffset/_Body.htm
const offsetPolygon = function (polygon, offset, miterLimit = 2.5, curveTolerance = 1.0) {
  if (approximately(offset, 0)) return polygon

  let clipper = new ClipperLib.ClipperOffset(miterLimit, curveTolerance * clipperScale)

  let path = toClipperCoordinates(polygon.points)
  clipper.AddPath(path, ClipperLib.JoinType.jtSquare, ClipperLib.EndType.etClosedPolygon)

  let paths = new ClipperLib.Paths()
  clipper.Execute(paths, offset * clipperScale)

  // Keep polygon properties
  let cloned = polygon.clone()

  let points = toNestCoordinates(paths[0])
  cloned.points = points

  return cloned
}

const createUniqueKey = function (A, B, inside) {
  return JSON.stringify({
    A: A.toString(),
    B: B.toString(),
    inside: inside
  })
}

export {
  approximately,
  bounds,
  clipperScale, clipperThreshold,
  toClipperCoordinates,
  toNestCoordinates,
  noFitRectanglePolygon,
  noFitPolygon,
  minkowskiDifference,
  offsetPolygon,
  createUniqueKey
}
