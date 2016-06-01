/*!
* transliterator.js (Jawa-Latin / Javanese Script to Latin)
* https://bennylin.github.com/transliterasijawa
*
* Copyright 2013, Bennylin @bennylin
* Released under the CC-BY-SA.
*
* Date: 11 April 2013 - v 0.5
* Date: 25 Juli 2013 - v 0.6
*
*
*
*/
var java2latn = {
"ꦀ":'',//? -- archaic
"ᬂ":'ng',//cecak
"ᬃ":'r',//layar
"ᬄ":'h',//wignyan
"ᬅ":'A',//swara-A
"ᬇ":'I',//I-Kawi -- archaic
"-":'I',//I
"-":'Ii',//Ii -- archaic
"ᬉ":'U',//U
"ᬋ":'rě',//pa cêrêk
"ᬍ":'lě',//nga lêlêt
"ᬎ":'lěu',//nga lêlêt Raswadi -- archaic
"ᬏ":'E',//E
"ᬐ":'Ai',//Ai
"ᬑ":'O',//O
"ᬓ":'ka',
"ᭅ":'qa',//Ka Sasak
"ᬔ":'kha',//Murda
"ᬕ":'ga',
"ᬖ":'gha',//Murda
"ᬗ":'nga',
"ᬘ":'ca',
"ᬙ":'cha',//Murda
"ᬚ":'ja',
"-":'Nya',//Ja Sasak, Nya Murda
"ᬛ":'jha',//Ja Mahaprana
"ᬜ":'nya',
"ᬝ":'tha',//'ṭa',
"ᬞ":'ṭha',//Murda
"ᬟ":'dha',//'ḍa',
"ᬠ":'ḍha',//Murda
"ᬡ":'ṇa',//Murda
"ᬢ":'ta',
"ᬣ":'tha',//Murda
"ᬤ":'da',
"ᬥ":'dha',//Murda
"ᬦ":'na',
"ᬧ":'pa',
"ᬨ":'pha',//Murda
"ᬩ":'ba',
"ᬪ":'bha',//Murda
"ᬫ":'ma',
"ᬬ":'ya',
"ᬭ":'ra',
"-":'Ra',//Ra Agung
"ᬮ":'la',
"ᬯ":'wa',
"ᬰ":'sha',//Murda
"ᬱ":'ṣa',//Sa Mahaprana
"ᬲ":'sa',
"ᬳ":'a',//could also be "a" or any sandhangan swara
"᬴":'​',//cecak telu -- diganti zero-width joiner (tmp)
"ᭀ":'o',//taling tarung
"ᬵ":'a',
"ᬶ":'i',
"ᬷ":'ii',
"ᬸ":'u',
"ᬹ":'uu',
"ᬾ":'e',
"ᬿ":'ai',
"ᭂ":'ě',
"":'rě',
"":'ya',
"":'ra',
"᭄":'​',//pangkon -- diganti zero-width joiner (tmp)
"꧁":'—',
"꧂":'—',
"꧃":'–',
"꧄":'–',
"꧅":'–',
"᭜":'',
"᭝":'​',//titik dua -- diganti zero-width joiner (tmp)
"᭞":',',
"᭟":'.',
"꧊":'qqq',
"꧋":'–',
"꧌":'–',
"꧍":'–',
"ꧏ":'²',
"᭐":'0',
"᭑":'1',
"᭒":'2',
"᭓":'3',
"᭔":'4',
"᭕":'5',
"᭖":'6',
"᭗":'7',
"᭘":'8',
"᭙":'9',
"꧞":'—',
"꧟":'—',
"​":'#',//zero-width joiner
"​":' '//zero-width space
}
var latn2java = {
//"":'ꦀ',//? -- archaic
"ng":'ᬂ',//cecak
"r":'ᬃ',//layar
"h":'ᬄ',//wignyan
"a":'ᬅ',//swara-A
"i":'ᬇ',//I-Kawi -- archaic
"i":'-',//I
"ii":'-',//Ii -- archaic
"u":'ᬉ',//U
"rê":'ᬋ',//pa cêrêk
"rě":'ᬋ',//pa cěrěk
"lê":'ᬍ',//nga lêlêt
"lě":'ᬍ',//nga lělět
"lêu":'ᬎ',//nga lêlêt Raswadi -- archaic
"lěu":'ᬎ',//nga lělět Raswadi -- archaic
"e":'ᬏ',//E
"ai":'ᬐ',//Ai
"o":'ᬑ',//O
"ka":'ᬓ',
"qa":'ᭅ',//Ka Sasak
"kha":'ᬔ',//Murda
"ga":'ᬕ',
"gha":'ᬖ',//Murda
"nga":'ᬗ',
"ca":'ᬘ',
"cha":'ᬙ',//Murda
"ja":'ᬚ',
"Nya":'-',//Ja Sasak, Nya Murda
"jha":'ᬛ',//Ja Mahaprana
"nya":'ᬜ',
"ṭa":'ᬝ',
"ṭha":'ᬞ',//Murda
"ḍa":'ᬟ',
"ḍha":'ᬠ',//Murda
"ṇa":'ᬡ',//Murda
"ta":'ᬢ',
"tha":'ᬣ',//Murda
"da":'ᬤ',
"dha":'ᬥ',//Murda
"na":'ᬦ',
"pa":'ᬧ',
"pha":'ᬨ',//Murda
"ba":'ᬩ',
"bha":'ᬪ',//Murda
"ma":'ᬫ',
"ya":'ᬬ',
"ra":'ᬭ',
"Ra":'-',//Ra Agung
"la":'ᬮ',
"wa":'ᬯ',
"sha":'ᬰ',//Murda
"ṣa":'ᬱ',//Sa Mahaprana
"sa":'ᬲ',
"ha":'ᬳ',//could also be "a" or any sandhangan swara
"​":'᬴',//cecak telu -- diganti zero-width joiner (tmp)
"o":'ᭀ',//taling tarung
"aa":'ᬵ',
"i":'ᬶ',
"ii":'ᬷ',
"u":'ᬸ',
"uu":'ᬹ',
"e":'ᬾ',
"ai":'ᬿ',
"ê":'ᭂ',
"rê":'',
"ě":'ᭂ',
"rě":'',
"ya":'',
"ra":'',
/*"​":'᭄',//pangkon -- diganti zero-width joiner (tmp)
"":'꧁',
"":'꧂',
"":'꧃',
"":'꧄',
"":'꧅',
"":'᭜',
"":'᭝',*///titik dua
",":'᭞',
".":'᭟',
/*"":'꧊',
"":'꧋',*/
"(":'꧌',
")":'꧍',
//"":'ꧏ',
"0":'᭐',
"1":'᭑',
"2":'᭒',
"3":'᭓',
"4":'᭔',
"5":'᭕',
"6":'᭖',
"7":'᭗',
"8":'᭘',
"9":'᭙',
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
String.prototype.capitalize = function() {
return this.charAt(0).toUpperCase() + this.slice(1);
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
if (regexp_file[str[i]] && regexp_file["ᬃ"] == "r") { //jawa->latin
if (str[i] == "ᬳ") { //ha
if ( i > 0 && (str[i-1] == "ᭂ" || str[i-1] == "ᬾ" || str[i-1] == "ᬶ" || str[i-1] == "ᬵ" || str[i-1] == "ᬸ" || str[i-1] == "ᬅ" || str[i-1] == "ᬏ" || str[i-1] == "-" || str[i-1] == "ᬑ" || str[i-1] == "ᬉ") ) { trans = trans.ganti(j, "h"+regexp_file[str[i]]);j+=2; }
if ( i > 0 && (str[i-1] == "꧊") ) { trans = trans.ganti(j, "H"+regexp_file[str[i]]);j+=2; }
else { trans = trans.ganti(j, regexp_file[str[i]]);j++; }
} else if (i > 0 && str[i] == "ᬭ" && str[i-1] == "ᬃ") { //double rr
trans = trans.ganti(j, "a");j++;
} else if (i > 0 && str[i] == "ᬗ" && str[i-1] == "ᬂ") { //double ngng
trans = trans.ganti(j, "a");j++;
} else if (str[i] == "ᬵ" || str[i] == "ᬶ" || str[i] == "ᬸ" || str[i] == "ᬾ" || str[i] == "ᭂ") {
if (i > 2 && str[i-1] == "ᬳ" && str[i-2] == "ᬳ") { //-hah-
if (str[i] == "ᬵ") trans = trans.ganti3(j,"ā");
else if (str[i] == "ᬶ") trans = trans.ganti3(j,"ai");
else if (str[i] == "ᬸ") trans = trans.ganti3(j,"au");
else if (str[i] == "ᬾ") trans = trans.ganti3(j,"ae");
else if (str[i] == "ᭂ") trans = trans.ganti3(j,"aě");
//str[i] == "ᬶ" || str[i] == "ᬸ" || str[i] == "ᬾ" || str[i] == "ᭂ"
} else if (i > 2 && str[i-1] == "ᬳ") { //-h-
if (str[i] == "ᬵ") trans = trans.ganti3(j,"ā");
else if (str[i] == "ᬶ") trans = trans.ganti3(j,"i");
else if (str[i] == "ᬸ") trans = trans.ganti3(j,"u");
else if (str[i] == "ᬾ") trans = trans.ganti3(j,"e");
else if (str[i] == "ᭂ") trans = trans.ganti3(j,"ě");
j--;
//str[i] == "ᬶ" || str[i] == "ᬸ" || str[i] == "ᬾ" || str[i] == "ᭂ"
}
else if (i > 0 && str[i] == "ᬵ" && str[i-1] == "ᬾ") //-o //2 aksara -> 1 huruf
{ trans = trans.ganti2(j, "o"); }
else if (i > 0 && str[i] == "ᬵ" && str[i-1] == "ᬿ") //-au //2 aksara -> 2 huruf
{ trans = trans.ganti3(j, "au"); }
else if (str[i] == "ᬵ") //-aa
{ trans = trans.ganti(j, "aa"); j++}
else if ( i > 0 && (str[i] == "ᬶ" || str[i] == "ᬸ" || str[i] == "ᬾ" || str[i] == "ᭂ") && (str[i-1] == "ᬅ" || str[i-1] == "ᬏ" || str[i-1] == "-" || str[i-1] == "ᬑ" || str[i-1] == "ᬉ") )
{ trans = trans.ganti(j, regexp_file[str[i]]);j++;}
else
{ trans = trans.ganti2(j, regexp_file[str[i]]); }
} else if (str[i] == "" || str[i] == "" || str[i] == "" || str[i] == "ᬷ" || str[i] == "ᬹ" || str[i] == "ᬿ" || str[i] == "-" || str[i] == "ᬐ") { //1 aksara -> 2 huruf
trans = trans.ganti2(j, regexp_file[str[i]]);j++;
} else if (str[i] == "᬴") {//2 aksara -> 2 huruf
if (i > 0 && str[i-1] == "ᬚ") {
if (i > 1 && str[i-2] == "꧊") { trans = trans.ganti3(j, "Za"); }
else { trans = trans.ganti3(j, "za"); } }
else if (i > 0 && str[i-1] == "ᬧ") {
if (i > 1 && str[i-2] == "꧊") { trans = trans.ganti3(j, "Fa"); }
else { trans = trans.ganti3(j, "fa"); } }
else if (i > 0 && str[i-1] == "ᬯ") {
if (i > 1 && str[i-2] == "꧊") { trans = trans.ganti3(j, "Va"); }
else { trans = trans.ganti3(j, "va"); } }//catatan, "va" biasanya ditulis sama dengan "fa" (dengan pa+cecak telu), variannya adalah wa+cecak telu.
else { trans = trans.ganti2(j, regexp_file[str[i]]); }
} else if (str[i] == "᭄") {
trans = trans.ganti2(j, regexp_file[str[i]]);
} else if (str[i] == "ᬓ" || str[i] == "ᭅ" || str[i] == "ᬔ" || str[i] == "ᬕ" || str[i] == "ᬖ" || str[i] == "ᬘ" || str[i] == "ᬙ" || str[i] == "ᬚ" || str[i] == "ᬛ" || str[i] == "ᬡ" || str[i] == "ᬢ" || str[i] == "ᬣ" || str[i] == "ᬤ" || str[i] == "ᬥ" || str[i] == "ᬦ" || str[i] == "ᬧ" || str[i] == "ᬨ" || str[i] == "ᬩ" || str[i] == "ᬪ" || str[i] == "ᬫ" || str[i] == "ᬬ" || str[i] == "ᬭ" || str[i] == "-" || str[i] == "ᬮ" || str[i] == "ᬯ" || str[i] == "ᬰ" || str[i] == "ᬲ" || str[i] == "ᬋ" || str[i] == "ᬍ" || str[i] == "ᬂ") {
if (i > 0 && str[i-1] == "꧊") {
if (str[i] == "ᭅ") { trans = trans.ganti(j, "Qa");j+=2; }
else if (str[i] == "ᬩ" || str[i] == "ᬪ") { trans = trans.ganti(j, "Ba");j+=2; }
else if (str[i] == "ᬘ" || str[i] == "ᬙ") { trans = trans.ganti(j, "Ca");j+=2; }
else if (str[i] == "ᬤ" || str[i] == "ᬥ") { trans = trans.ganti(j, "Da");j+=2; }
else if (str[i] == "ᬕ" || str[i] == "ᬖ") { trans = trans.ganti(j, "Ga");j+=2; }
else if (str[i] == "ᬚ" || str[i] == "ᬛ") { trans = trans.ganti(j, "Ja");j+=2; }
else if (str[i] == "ᬓ" || str[i] == "ᬔ") { trans = trans.ganti(j, "Ka");j+=2; }
else if (str[i] == "ᬮ") { trans = trans.ganti(j, "La");j+=2; }
else if (str[i] == "ᬫ") { trans = trans.ganti(j, "Ma");j+=2; }
else if (str[i] == "ᬦ" || str[i] == "ᬡ") { trans = trans.ganti(j, "Na");j+=2; }
else if (str[i] == "ᬧ" || str[i] == "ᬨ") { trans = trans.ganti(j, "Pa");j+=2; }
else if (str[i] == "ᬭ" || str[i] == "-") { trans = trans.ganti(j, "Ra");j+=2; }
else if (str[i] == "ᬲ" || str[i] == "ᬰ") { trans = trans.ganti(j, "Sa");j+=2; }
else if (str[i] == "ᬢ" || str[i] == "ᬣ") { trans = trans.ganti(j, "Ta");j+=2; }
else if (str[i] == "ᬯ") { trans = trans.ganti(j, "Wa");j+=2; }
else if (str[i] == "ᬬ") { trans = trans.ganti(j, "Ya");j+=2; }
else { trans.ganti(j, regexp_file[str[i]]);j+=3; }
} else if (str[i] == "ᬔ" || str[i] == "ᬖ" || str[i] == "ᬙ" || str[i] == "ᬛ" || str[i] == "ᬣ" || str[i] == "ᬥ" || str[i] == "ᬨ" || str[i] == "ᬪ" || str[i] == "ᬰ") {//bha, cha, dha, dll.
trans = trans.ganti(j, regexp_file[str[i]]);j+=3;
} else {//ba, ca, da, dll.
trans = trans.ganti(j, regexp_file[str[i]]);j+=2; }
} else if (str[i] == "ᬱ") { //ṣa
trans = trans.ganti(j, regexp_file[str[i]]);j+=2;
} else if (str[i] == "ᬗ" || str[i] == "-" || str[i] == "ᬜ" || str[i] == "ᬝ" || str[i] == "ᬞ" || str[i] == "ᬟ" || str[i] == "ᬠ" || str[i] == "ᬎ") {
if (i > 0 && str[i-1] == "꧊") {
if (str[i] == "ᬗ") { trans = trans.ganti(j, "Nga");j+=3; }
else if (str[i] == "ᬜ" || str[i] == "-") { trans = trans.ganti(j, "Nya");j+=3; }
else if (str[i] == "ᬝ" || str[i] == "ᬞ") { trans = trans.ganti(j, "Tha");j+=3; }
else if (str[i] == "ᬟ" || str[i] == "ᬠ") { trans = trans.ganti(j, "Dha");j+=3; }
else { trans.ganti(j, regexp_file[str[i]]);j+=3; }
} else {
trans = trans.ganti(j, regexp_file[str[i]]);j+=3; }
/*} else if (str[i] == "᭞" || str[i] == "᭟") { // habis titik atau koma diberi spasi
trans = trans.ganti(j, regexp_file[str[i]]+" ");j+=2;*/
} else if (str[i] == "꧊") { //penanda nama diri -- made up for Latin back-compat
trans = trans.ganti(j, "");
} else if (str[i] == " ") {
trans = trans.ganti(j, " ");j++;
} else {
trans = trans.ganti(j, regexp_file[str[i]]);j++;
}
} else if (regexp_file[str[i]] && regexp_file["r"] == "ᬃ") { //latin->jawa
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
