(function(){function e(e){if(!e)return;if(!e.length)return;let t=Object.prototype.toString,n=[];for(let r=0;r<e.length;r++){typeName=t.call(e[r]).toLowerCase().split(" ")[1];if(0<=typeName.indexOf("number")){if(e[r]<256){n.push(128);n.push(e[r])}else if(e[r]>255&&e[r]<65536){n.push(129);let t=new DataView(new Uint16Array([e[r]]).buffer);n.push(t.getUint8(1));n.push(t.getUint8(0))}else if(e[r]>65535&&e[r]<4294967296){n.push(130);let t=new DataView(new Uint32Array([e[r]]).buffer);for(let e=3;e>-1;e--)n.push(t.getUint8(e))}else if(e[r]>=4294967296){n.push(131);let t=e[r],i=new DataView(new Uint32Array([4294967295&t]).buffer);t=parseInt(t/4294967295);let f=new DataView(new Uint32Array([4294967295&t]).buffer),l=[];for(let e=0;e<4;e++)l.push(i.getUint8(e));for(let e=0;e<4;e++)l.push(f.getUint8(e));l.reverse();for(let e of l)n.push(e)}}else if(0<=typeName.indexOf("object")){n.push(132);e[r]=(new TextEncoder).encode(JSON.stringify(e[r]));let t=new DataView(new Uint32Array([e[r].length]).buffer);for(let e=3;e>-1;e--)n.push(t.getUint8(e));for(let t of e[r])n.push(t)}else if(0<=typeName.indexOf("uint8array")){n.push(133);let t=new DataView(new Uint32Array([e[r].length]).buffer);for(let e=3;e>-1;e--)n.push(t.getUint8(e));for(let t of e[r])n.push(t)}else if(0<=typeName.indexOf("string")){n.push(134);e[r]=(new TextEncoder).encode(e[r]);let t=new DataView(new Uint32Array([e[r].length]).buffer);for(let e=3;e>-1;e--)n.push(t.getUint8(e));for(let t of e[r])n.push(t)}else{n.push(135);e[r]=(new TextEncoder).encode(JSON.stringify(e[r]));let t=new DataView(new Uint32Array([e[r].length]).buffer);for(let e=3;e>-1;e--)n.push(t.getUint8(e));for(let t of e[r])n.push(t)}}return new Uint8Array(n).buffer}function t(e,t,n,r,i){if(!e)return;if(!e.byteLength)return;let f=[],l=new DataView(e);for(let n=0;n<e.byteLength;)if(128^l.getUint8(n))if(129^l.getUint8(n))if(130^l.getUint8(n))if(131^l.getUint8(n))if(132^l.getUint8(n))if(133^l.getUint8(n))if(134^l.getUint8(n)){if(135^l.getUint8(n))return f;{n++;let e=l.getUint32(n);n+=4;let t=new Uint8Array(e);for(let r=0;r<e;r++)t[r]=l.getUint8(n++);t=(new TextDecoder).decode(t);try{t=JSON.parse(t);f.push(t)}catch(e){f.push(t)}}}else{n++;let e=l.getUint32(n);n+=4;let t=new Uint8Array(e);for(let r=0;r<e;r++)t[r]=l.getUint8(n++);t=(new TextDecoder).decode(t);f.push(t)}else{n++;let t=l.getUint32(n);n+=4;if(i&&t+n>e.byteLength){f.push({offset:n,length:t});break}let r=new Uint8Array(t);for(let e=0;e<t;e++)r[e]=l.getUint8(n++);i?f.push({data:r,offset:n-t-1,length:t}):f.push(r)}else{n++;let e=l.getUint32(n);n+=4;let t={offset:n},r=new Uint8Array(e);for(let t=0;t<e;t++)r[t]=l.getUint8(n++);r=(new TextDecoder).decode(r);try{r=JSON.parse(r);if(i){t.data=r;t.length=e;f.push(t)}else f.push(r)}catch(e){f.push(r)}}else{n++;let e=BigInt(0),r=new Uint32Array(2);for(let e=0;e<4;e++){r[0]=r[0]+l.getUint8(n+e);e<3&&(r[0]<<=8)}for(let e=4;e<8;e++){r[1]=r[1]+l.getUint8(n+e);e<7&&(r[1]<<=8)}e+=BigInt(r[0]);e<<=BigInt(32);e+=BigInt(r[1]);t&&(e=Number(e));i?f.push({data:e,offset:n,length:8}):f.push(e);n+=8}else{n++;i?f.push({data:f.push(l.getUint32(n)),offset:n,length:4}):f.push(l.getUint32(n));n+=4}else{n++;i?f.push({data:l.getUint16(n),offset:n,length:2}):f.push(l.getUint16(n));n+=2}else{n++;if(i){f.push({data:l.getUint8(n),offset:n,length:1});n++}else f.push(l.getUint8(n++));if(r)break}if(!n)return f;if(!n.length)return f;let s={};for(let e=0;e<n.length;e++)e>f.length-1?s[n[e]]=null:s[n[e]]=f[e];return s}if("object"==typeof window){window.createArrayBuffer=e;window.decodeArrayBuffer=t}else module.exports={createArrayBuffer:e,decodeArrayBuffer:t}})();