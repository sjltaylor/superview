;
// augment.js JavaScript 1.8.5 methods for all, version: 0.3.0
// using snippets from Mozilla - https://developer.mozilla.org/en/JavaScript
// (c) 2011 Oliver Nightingale
//
//  Released under MIT license.
//
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
Array.prototype.every||(Array.prototype.every=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)if(e in b&&!a.call(d,b[e],e,b))return!1;return!0}),Array.prototype.filter||(Array.prototype.filter=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=[],e=arguments[1];for(var f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),Array.prototype.forEach||(Array.prototype.forEach=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)e in b&&a.call(d,b[e],e,b)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(c===0)return-1;var d=0;arguments.length>0&&(d=Number(arguments[1]),d!==d?d=0:d!==0&&d!==Infinity&&d!==-Infinity&&(d=(d>0||-1)*Math.floor(Math.abs(d))));if(d>=c)return-1;var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++)if(e in b&&b[e]===a)return e;return-1}),Array.isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"},Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(c===0)return-1;var d=c;arguments.length>1&&(d=Number(arguments[1]),d!==d?d=0:d!==0&&d!==Infinity&&d!==-Infinity&&(d=(d>0||-1)*Math.floor(Math.abs(d))));var e=d>=0?Math.min(d,c-1):c-Math.abs(d);for(;e>=0;e--)if(e in b&&b[e]===a)return e;return-1}),Array.prototype.map||(Array.prototype.map=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=Array(c),e=arguments[1];for(var f=0;f<c;f++)f in b&&(d[f]=a.call(e,b[f],f,b));return d}),Array.prototype.reduce||(Array.prototype.reduce=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;if(c==0&&arguments.length==1)throw new TypeError;var d=0,e;if(arguments.length>=2)e=arguments[1];else do{if(d in b){e=b[d++];break}if(++d>=c)throw new TypeError}while(!0);while(d<c)d in b&&(e=a.call(undefined,e,b[d],d,b)),d++;return e}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;if(c===0&&arguments.length===1)throw new TypeError;var d=c-1,e;if(arguments.length>=2)e=arguments[1];else do{if(d in this){e=this[d--];break}if(--d<0)throw new TypeError}while(!0);while(d>=0)d in b&&(e=a.call(undefined,e,b[d],d,b)),d--;return e}),Array.prototype.some||(Array.prototype.some=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)if(e in b&&a.call(d,b[e],e,b))return!0;return!1}),Date.now||(Date.now=function(){return+(new Date)}),Date.prototype.toJSON||(Date.prototype.toJSON=Date.prototype.toJSON),Date.prototype.toISOString||(Date.prototype.toISOString=function(){var a=function(b,c){c=c||2;return(b=b+"",b.length===c)?b:a("0"+b,c)};return function(){var b=[this.getUTCFullYear(),a(this.getUTCMonth()+1),a(this.getUTCDate())].join("-"),c=[a(this.getUTCHours()),a(this.getUTCMinutes()),a(this.getUTCSeconds())].join(":")+"."+a(this.getUTCMilliseconds(),3);return[b,c].join("T")+"Z"}}()),Function.prototype.bind||(Function.prototype.bind=function(a){var b=[].slice,c=b.call(arguments,1),d=this,e=function(){},f=function(){return d.apply(this instanceof e?this:a||{},c.concat(b.call(arguments)))};e.prototype=d.prototype,f.prototype=new e;return f}),Object.keys||(Object.keys=function(a){if(a!==Object(a))throw new TypeError("Object.keys called on non-object");var b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}),String.prototype.trim||(String.prototype.trim=function(){var a=/^\s+/,b=/\s+$/;return function(){return this.replace(a,"").replace(b,"")}}())
;
;
// supplement.js JavaScript Extras, version: 0.1.0
// (c) 2011 Oliver Nightingale
//
//  Released under MIT license.
//
/**
 * Namespace
 * @private
 */
supplement=function(){var a=[],b=function(b,c,d){a.forEach(function(a){a(b,c,d)})},c=function(b){if(typeof b!="function")throw new TypeError;a.push(b)},d=function(a,b,c){this.defineMethod(a,b,a[c])},e=function(a,c,d){if(a[c])return b(a,c,d);typeof Object.defineProperties=="function"?Object.defineProperty(a,c,{value:d,enumerable:!1,configurable:!1}):a[c]=d};return{defineAlias:d,defineMethod:e,onClash:c}}(),supplement.defineMethod(Array,"wrap",function(a){"use strict";if(a==null||a==undefined)return[];if(Array.isArray(a))return a;return[a]}),supplement.defineMethod(Array.prototype,"uniq",function(){"use strict";return this.reduce(function(a,b){a.indexOf(b)===-1&&a.push(b);return a},[])}),supplement.defineMethod(Array,"range",function(a,b){"use strict";if(typeof a!="number"||typeof b!="number")throw new TypeError("Array.range called with no range start or end");var c=[];for(var d=a;d<=b;d++)c.push(d);return c}),supplement.defineMethod(Array.prototype,"detect",function(a,b){"use strict";var c=this.length,d=null;for(var e=0;e<c;e++)if(a.call(b,this[e],e,this)){d=this[e];break}return d}),supplement.defineMethod(Array,"toArray",function(a){"use strict";if(typeof a=="string")throw new TypeError("Array.toArray called on non-arguments");return Array.prototype.slice.call(a,0)}),supplement.defineMethod(Array.prototype,"head",function(){"use strict";return this[0]}),supplement.defineMethod(Array.prototype,"tail",function(){"use strict";return this.slice(1)}),supplement.defineMethod(Array.prototype,"compact",function(){"use strict";return this.filter(function(a){return a!==null&&a!==undefined})}),supplement.defineMethod(Array.prototype,"group",function(a,b){"use strict";if(typeof a!="function")throw new TypeError;return this.reduce(function(c,d,e,f){var g=a.call(b,d,e,f);c[g]||(c[g]=[]),c[g].push(d);return c},{})}),supplement.defineMethod(Array.prototype,"reject",function(a,b){"use strict";if(typeof a!="function")throw new TypeError;return this.reduce(function(c,d,e,f){a.call(b,d,e,f)||c.push(d);return c},[])}),supplement.defineMethod(Array.prototype,"take",function(a){"use strict";if(!a)throw new TypeError;return this.slice(0,a)}),supplement.defineMethod(Array.prototype,"drop",function(a){"use strict";if(!a)throw new TypeError;return this.slice(a)}),supplement.defineMethod(Function.prototype,"singleUse",function(){"use strict";var a=this,b=!1;return function(){if(!b){b=!0;var c=Array.prototype.slice.call(arguments,0);return a.apply(null,c)}}}),supplement.defineMethod(Function.prototype,"curry",function(){"use strict";var a=Array.prototype.slice.call(arguments,0),b=this;return function(){Array.prototype.slice.call(arguments,0).forEach(function(b){a.push(b)});return b.apply(null,a)}}),supplement.defineMethod(Function.prototype,"throttle",function(a){"use strict";var b=this,c,d;return function(){var e=Array.prototype.slice.call(arguments,0);c=new Date,d=d||0;if(!(c-d<a)){d=c;return b.apply(null,e)}}}),supplement.defineMethod(Function.prototype,"debounce",function(a){"use strict";var b=this,c;return function(){var d=Array.prototype.slice.call(arguments,0);clearTimeout(c),c=setTimeout(function(){return b.apply(null,d)},a)}}),supplement.defineMethod(Number.prototype,"times",function(a){"use strict";for(var b=0;b<this;b++)a(b)}),supplement.defineMethod(Number.prototype,"seconds",function(){"use strict";return this*1e3}),supplement.defineAlias(Number.prototype,"second","seconds"),supplement.defineMethod(Number.prototype,"minutes",function(){"use strict";return this.seconds()*60}),supplement.defineAlias(Number.prototype,"minute","minutes"),supplement.defineMethod(Number.prototype,"hours",function(){"use strict";return this.minutes()*60}),supplement.defineAlias(Number.prototype,"hour","hours"),supplement.defineMethod(Number.prototype,"pad",function(a){"use strict";if(typeof a!="number")throw new TypeError;if(a<0)throw new RangeError;var b=this+"";while(Math.floor(a--))b="0"+b;return b}),supplement.defineMethod(Object,"values",function(a){"use strict";if(a!==Object(a))throw new TypeError("Object.values called on non-object");return Object.keys(a).map(function(b){return a[b]})}),supplement.defineMethod(Object,"provide",function(a){"use strict";if(a!==Object(a))throw new TypeError("Object.provide called on non-object");var b=Array.prototype.slice.call(arguments,1),c=a;b.forEach(function(a){if(!c[a])c[a]={};else if(c[a]!==Object(c[a]))throw new TypeError("Object.provide can only add properties to a plain object");c=c[a]});return c})
;
;
/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
(function(){supplement.defineMethod(Array.prototype,"copy",function(){return Array.toArray(this)}),supplement.defineMethod(Array.prototype,"exclude",function(a){var b=this.indexOf(a);if(b>=0)return this.splice(b,1);return this}),supplement.defineMethod(Array.prototype,"remove",function(a){delete this[this.indexOf(a)];return this}),supplement.defineMethod(Array.prototype,"contains",function(a){return!!this.detect(function(b){return b===a})}),supplement.defineMethod(Array.prototype,"isEmpty",function(a){return this.length===0})})()
;
;
function TODO(a){console.warn("TODO"+a?": "+a:"")}function NotImplemented(){throw"Not Implemented"}function deepCopy(a){return jQuery.extend(!0,{},a)}function shallowCopy(a){return jQuery.extend({},a)}function proxyFunction(a,b){return function(){return b.apply(a,arguments)}}function defaultsFor(a,b){return extend(a).with(b)}function overwrite(a){return extend(a,!0)}function extend(a,b){a=a||{};return{"with":function(){Array.toArray(arguments).forEach(function(c){for(var d in c)if(b||typeof a[d]=="undefined")a[d]=c[d]});return a},mixin:function(a){return typeof a=="function"?this.with(new a):this.with(a)}}}function using(){var a=Array.toArray(arguments),b=a.splice(a.length-1,1);if(typeof b=="function")return b.apply(a[0],a)}function uvid(){var a=[],b="0123456789ABCDEF";for(var c=0;c<32;c++)a[c]=b.substr(Math.floor(Math.random()*16),1);a[12]="4",a[16]=b.substr(a[16]&3|8,1);var d=a.join("");return d}override=function(){function b(b,c){for(var d in c)if(typeof b[d]=="function"&&typeof c[d]=="function")b[d]=a(b[d],c[d]);else throw new Error("no function to override: "+d);return b}function a(a,b){return function(){var c=this,d=Array.toArray(arguments);d.unshift(function(){var b=arguments.length>0?Array.toArray(arguments):d.slice(1);return a.apply(c,b)});return b.apply(c,d)}}return function(c,d){if(typeof c=="function"&&typeof d=="function")return a(c,d);return b(c,d)}}()
;
;
/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
delete function(){supplement.defineMethod(String.prototype,"isUpperCase",function(){return this.toLowerCase()!=this}),supplement.defineMethod(String.prototype,"isLowerCase",function(){return this.toUpperCase()!=this}),supplement.defineMethod(String.prototype,"decamelize",function(){var a=[];for(var b=0,c=1;b<this.length;b++,c++){var d=this[b],e=this[c];a.push(d),e&&e.isUpperCase()&&/[a-zA-Z\d]/.test(d)&&a.push(" ")}return a.join("")}),supplement.defineMethod(String.prototype,"startsWith",function(a){return(new RegExp("^"+a)).test(this)}),supplement.defineMethod(String.prototype,"contains",function(a){return(new RegExp(a)).test(this)}),supplement.defineMethod(String.prototype,"endsWith",function(a){return this.substr(a.length)===a}),supplement.defineMethod(String.prototype,"squash",function(){return this.replace(/^\s+|\s+$/g,"")}),supplement.defineMethod(String.prototype,"enquote",function(a){var b=a||"'";return b+this+b}),supplement.defineMethod(String.prototype,"supplant",function(a){return this.replace(/{([^{}]*)}/g,function(b,c){var d=a[c];return typeof d=="string"||typeof d=="number"||typeof d=="boolean"?d:b})})}()
;
