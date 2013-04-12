/*!
* transliterator.js (Jawa-Latin / Javanese Script to Latin)
* https://bennylin.github.com/transliterasijawa
*
* Copyright 2013, Bennylin @bennylin
* Released under the CC-BY-SA.
*
* Date: 12 April 2013 - v 0.6
*
*
*
*/
var java2latn = {
"ꦀ":'',//? -- archaic
"ꦁ":'ng',//cecak
"ꦂ":'r',//layar
"ꦃ":'h',//wignyan
"ꦄ":'a',//swara-A
"ꦅ":'i',//I-Kawi -- archaic
"ꦆ":'i',//I
"ꦇ":'ii',//Ii -- archaic
"ꦈ":'u',//U
"ꦉ":'rê',//pa cêrêk
"ꦊ":'lê',//nga lêlêt
"ꦋ":'lêu',//nga lêlêt Raswadi -- archaic
"ꦌ":'e',//E
"ꦍ":'ai',//Ai
"ꦎ":'o',//O

"ꦏ":'ka',
"ꦐ":'qa',//Ka Sasak
"ꦑ":'Ka',//Murda
"ꦒ":'ga',
"ꦓ":'Ga',//Murda
"ꦔ":'nga',
"ꦕ":'ca',
"ꦖ":'Ca',//Murda
"ꦗ":'ja',
"ꦘ":'Nya',//Ja Sasak, Nya Murda
"ꦙ":'Ja',//Ja Mahaprana
"ꦚ":'nya',
"ꦛ":'tha',
"ꦜ":'Tha',//Murda
"ꦝ":'dha',
"ꦞ":'Dha',//Murda
"ꦟ":'Na',//Murda
"ꦠ":'ta',
"ꦡ":'Ta',//Murda
"ꦢ":'da',
"ꦣ":'Da',//Murda
"ꦤ":'na',
"ꦥ":'pa',
"ꦦ":'Pa',//Murda
"ꦧ":'ba',
"ꦨ":'Ba',//Murda
"ꦩ":'ma',
"ꦪ":'ya',
"ꦫ":'ra',
"ꦬ":'Ra',//Ra Agung
"ꦭ":'la',
"ꦮ":'wa',
"ꦯ":'Sa',//Murda
"ꦰ":'Sha',//Sa Mahaprana
"ꦱ":'sa',
"ꦲ":'ha',//could also be "a" or any sandhangan swara

"꦳":'​',//cecak telu -- diganti zero-width joiner (tmp)
"ꦺꦴ":'o',//taling tarung
"ꦴ":'aa',
"ꦶ":'i',
"ꦷ":'ii',
"ꦸ":'u',
"ꦹ":'uu',
"ꦺ":'e',
"ꦻ":'ai',
"ꦼ":'ê',
"ꦽ":'rê',
"ꦾ":'ya',
"ꦿ":'ra',

"꧀":'​',//pangkon -- diganti zero-width joiner (tmp)

"꧁":'',
"꧂":'',
"꧃":'',
"꧄":'',
"꧅":'',
"꧆":'',
"꧇":'​',//titik dua -- diganti zero-width joiner (tmp)
"꧈":',',
"꧉":'.',
"꧊":'',
"꧋":'',
"꧌":'(',
"꧍":')',
"ꧏ":'',
"꧐":'0',
"꧑":'1',
"꧒":'2',
"꧓":'3',
"꧔":'4',
"꧕":'5',
"꧖":'6',
"꧗":'7',
"꧘":'8',
"꧙":'9',
"꧞":'',
"꧟":'',
"​":'#',//zero-width joiner
"​":' '//zero-width space
}

var latn2java = {
//"":'ꦀ',//? -- archaic
"ng":'ꦁ',//cecak
"r":'ꦂ',//layar
"h":'ꦃ',//wignyan
"a":'ꦄ',//swara-A
"i":'ꦅ',//I-Kawi -- archaic
"i":'ꦆ',//I
"ii":'ꦇ',//Ii -- archaic
"u":'ꦈ',//U
"rê":'ꦉ',//pa cêrêk
"lê":'ꦊ',//nga lêlêt
"lêu":'ꦋ',//nga lêlêt Raswadi -- archaic
"e":'ꦌ',//E
"ai":'ꦍ',//Ai
"o":'ꦎ',//O

"ka":'ꦏ',
"qa":'ꦐ',//Ka Sasak
"Ka":'ꦑ',//Murda
"ga":'ꦒ',
"Ga":'ꦓ',//Murda
"nga":'ꦔ',
"ca":'ꦕ',
"Ca":'ꦖ',//Murda
"ja":'ꦗ',
"Nya":'ꦘ',//Ja Sasak, Nya Murda
"Ja":'ꦙ',//Ja Mahaprana
"nya":'ꦚ',
"tha":'ꦛ',
"Tha":'ꦜ',//Murda
"dha":'ꦝ',
"Dha":'ꦞ',//Murda
"Na":'ꦟ',//Murda
"ta":'ꦠ',
"Ta":'ꦡ',//Murda
"da":'ꦢ',
"Da":'ꦣ',//Murda
"na":'ꦤ',
"pa":'ꦥ',
"Pa":'ꦦ',//Murda
"ba":'ꦧ',
"Ba":'ꦨ',//Murda
"ma":'ꦩ',
"ya":'ꦪ',
"ra":'ꦫ',
"Ra":'ꦬ',//Ra Agung
"la":'ꦭ',
"wa":'ꦮ',
"Sa":'ꦯ',//Murda
"Sha":'ꦰ',//Sa Mahaprana
"sa":'ꦱ',
"ha":'ꦲ',//could also be "a" or any sandhangan swara

"​":'꦳',//cecak telu -- diganti zero-width joiner (tmp)
"o":'ꦺꦴ',//taling tarung
"aa":'ꦴ',
"i":'ꦶ',
"ii":'ꦷ',
"u":'ꦸ',
"uu":'ꦹ',
"e":'ꦺ',
"ai":'ꦻ',
"ê":'ꦼ',
"rê":'ꦽ',
"ya":'ꦾ',
"ra":'ꦿ',

/*"​":'꧀',//pangkon -- diganti zero-width joiner (tmp)

"":'꧁',
"":'꧂',
"":'꧃',
"":'꧄',
"":'꧅',
"":'꧆',
"":'꧇',*///titik dua
",":'꧈',
".":'꧉',
/*"":'꧊',
"":'꧋',*/
"(":'꧌',
")":'꧍',
//"":'ꧏ',
"0":'꧐',
"1":'꧑',
"2":'꧒',
"3":'꧓',
"4":'꧔',
"5":'꧕',
"6":'꧖',
"7":'꧗',
"8":'꧘',
"9":'꧙',
/*"":'꧞',
"":'꧟',*/
"#":'​',//zero-width joiner
" ":'​'//zero-width space
}

String.prototype.ganti=function(index, character) {
   return this.substr(0, index) + character;// + this.substr(index+character.length);
}
String.prototype.ganti2=function(index, character) {
   return this.substr(0, index-1) + character;// + this.substr(index+character.length);
}
String.prototype.ganti3=function(index, character) {
   return this.substr(0, index-2) + character;// + this.substr(index+character.length);
}
function transliterate(regexp_file) {

    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("msie")!=-1) { //IE
       var range = document.selection.createRange()
       txt = range.text;
       if (txt == '') {
         var str = window.document.formText.editSrc.value;
       }else{
         var str = range.text;
       }
    }
    else {
      str = window.document.formText.editSrc.value;
    }

    var trans = str;
    for (var i = 0, j = 0; i < str.length; i++) {
      if (regexp_file[str[i]] && regexp_file["ꦂ"] == "r") { //jawa->latin
        if (str[i] == "ꦴ" || str[i] == "ꦶ" || str[i] == "ꦸ" || str[i] == "ꦺ" || str[i] == "ꦼ") {
          if (str[i] == "ꦴ" && i > 0 && str[i-1] == "ꦺ") { trans = trans.ganti2(j, "o"); }
          else if (str[i] == "ꦴ" && i > 0 && str[i-1] == "ꦻ") { trans = trans.ganti3(j, "au");j++; }
          else if (str[i] == "ꦴ") { trans = trans.ganti2(j, "aa");j++; }
          else { trans = trans.ganti2(j, regexp_file[str[i]]); }
        } else if (str[i] == "ꦽ" || str[i] == "ꦾ" || str[i] == "ꦿ" || str[i] == "ꦷ" || str[i] == "ꦹ" || str[i] == "ꦻ" || str[i] == "ꦇ" || str[i] == "ꦍ") { //2 huruf
          trans = trans.ganti2(j, regexp_file[str[i]]);j++;
        } else if (str[i] == "꦳") {
          if (i > 0 && str[i-1] == "ꦗ") { trans = trans.ganti3(j, "za"); }
          else if (i > 0 && str[i-1] == "ꦥ") { trans = trans.ganti3(j, "fa"); }
          else if (i > 0 && str[i-1] == "ꦮ") { trans = trans.ganti3(j, "va"); }//catatan, "va" biasanya ditulis sama dengan "fa" (dengan pa+cecak telu), variannya adalah wa+cecak telu.
          else { trans = trans.ganti2(j, regexp_file[str[i]]); }
        } else if (str[i] == "꧀") {
          trans = trans.ganti2(j, regexp_file[str[i]]);
        } else if (str[i] == "ꦏ" || str[i] == "ꦐ" || str[i] == "ꦑ" || str[i] == "ꦒ" || str[i] == "ꦓ" || str[i] == "ꦕ" || str[i] == "ꦖ" || str[i] == "ꦗ" || str[i] == "ꦙ" || str[i] == "ꦟ" || str[i] == "ꦠ" || str[i] == "ꦡ" || str[i] == "ꦢ" || str[i] == "ꦣ" || str[i] == "ꦤ" || str[i] == "ꦥ" || str[i] == "ꦦ" || str[i] == "ꦧ" || str[i] == "ꦨ" || str[i] == "ꦩ" || str[i] == "ꦪ" || str[i] == "ꦫ" || str[i] == "ꦬ" || str[i] == "ꦭ" || str[i] == "ꦮ" || str[i] == "ꦯ" || str[i] == "ꦱ" || str[i] == "ꦲ" || str[i] == "ꦉ" || str[i] == "ꦊ" || str[i] == "ꦁ") {
          trans = trans.ganti(j, regexp_file[str[i]]);j+=2;
        } else if (str[i] == "ꦔ" || str[i] == "ꦘ" || str[i] == "ꦚ" || str[i] == "ꦛ" || str[i] == "ꦜ" || str[i] == "ꦝ" || str[i] == "ꦞ" || str[i] == "ꦰ" || str[i] == "ꦋ") {
          trans = trans.ganti(j, regexp_file[str[i]]);j+=3;
        /*} else if (str[i] == "꧈" || str[i] == "꧉") { // habis titik atau koma diberi spasi
          trans = trans.ganti(j, regexp_file[str[i]]+" ");j+=2;*/
        } else if (str[i] == " ") {
          trans = trans.ganti(j, " ");j++;
        } else {
          trans = trans.ganti(j, regexp_file[str[i]]);j++;
        }
      } else if (regexp_file[str[i]] && regexp_file["r"] == "ꦂ") { //latin->jawa
        if (str[i] == "a" && i > 0) {
          trans = trans.ganti(j, " ");j++;
        } else {
          trans = trans.ganti(j, regexp_file[str[i]]);j++;
        }
      } else {
        trans = trans.ganti(j, str[i]);j++;
      }
    }

    if (agt.indexOf("msie")!=-1) { //IE
      if (txt == ''){
        window.document.formText.editSrc.value = trans;
      } else {
        range.text = trans;
        //if (!window.opera) txt = txt.replace(/\r/g,'')
        if (range.moveStart) range.moveStart('character', - txt.length)
        range.select() 
      }
    }
    else {
        window.document.formText.editSrc.value = trans;
    }
    return true;
}
