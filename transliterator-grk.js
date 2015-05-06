/*!
* transliterator.js (OLB Greek (OLBGRK) / OLB Hebrew (OLBHEB) - Unicode and Unicode to OLB Greek/Hebrew transliterator)
* https://bennylin.github.com/
*
* Copyright 2015, Bennylin @bennylin
* Released under the CC-BY-SA.
*
* Date: 5 May 2015 - v 0.9
*
*
*
*
*/

var olbgrk2unicode  = {
"a":"α",
"A":"Α",
"b":"β",
"B":"Β",
"c":"χ",
"C":"Χ",
"d":"δ",
"D":"Δ",
"e":"ε",
"E":"Ε",
"f":"φ",
"F":"Φ",
"g":"γ",
"G":"Γ",
"h":"η",
"H":"Η",
"i":"ι",
"I":"Ι",
"k":"κ",
"K":"Κ",
"l":"λ",
"L":"Λ",
"m":"μ",
"M":"Μ",
"n":"ν",
"N":"Ν",
"o":"ο",
"O":"Ο",
"p":"π",
"P":"Π",
"q":"ψ",
"Q":"Ψ",
"r":"ρ",
"R":"Ρ",
"s":"σ",
"S":"Σ",
"t":"τ",
"T":"Τ",
"u":"υ",
"U":"Υ",
"v":"ς",
"w":"ω",
"W":"Ω",
"x":"ξ",
"X":"Ξ",
"y":"θ",
"Y":"Θ",
"z":"ζ",
"Z":"Ζ"
}

var unicode2olbgrk = {
"α":"a",
"Α":"A",
"β":"b",
"Β":"B",
"χ":"c",
"Χ":"C",
"δ":"d",
"Δ":"D",
"ε":"e",
"Ε":"E",
"φ":"f",
"Φ":"F",
"γ":"g",
"Γ":"G",
"η":"h",
"Η":"H",
"ι":"i",
"Ι":"I",
"κ":"k",
"Κ":"K",
"λ":"l",
"Λ":"L",
"μ":"m",
"Μ":"M",
"ν":"n",
"Ν":"N",
"ο":"o",
"Ο":"O",
"π":"p",
"Π":"P",
"ψ":"q",
"Ψ":"Q",
"ρ":"r",
"Ρ":"R",
"σ":"s",
"Σ":"S",
"τ":"t",
"Τ":"T",
"υ":"u",
"Υ":"U",
"ς":"v",
"ω":"w",
"Ω":"W",
"ξ":"x",
"Ξ":"X",
"θ":"y",
"Θ":"Y",
"ζ":"z",
"Ζ":"Z"
}

var greek2latin = {"","","",","","","X","",""
"α":"a",
"Α":"A",
"β":"b",
"Β":"B",
"χ":"ch",
"Χ":"CH",
"δ":"d",
"Δ":"D",
"ε":"e",
"Ε":"E",
"φ":"f",
"Φ":"F",
"γ":"g",
"Γ":"G",
"η":"ē",
"Η":"Ē",
"ι":"i",
"Ι":"I",
"κ":"k",
"Κ":"K",
"λ":"l",
"Λ":"L",
"μ":"m",
"Μ":"M",
"ν":"n",
"Ν":"N",
"ο":"o",
"Ο":"O",
"π":"p",
"Π":"P",
"ψ":"ps",
"Ψ":"PS",
"ρ":"r",
"Ρ":"R",
"σ":"s",
"Σ":"S",
"τ":"t",
"Τ":"T",
"υ":"u",
"Υ":"U",
"ς":"s̱",
"ω":"ō",
"Ω":"Ō",
"ξ":"x",
"Ξ":"X",
"θ":"th",
"Θ":"TH",
"ζ":"z",
"Ζ":"Z"
}

var olbheb2unicode  = {
"a":"א",
"b":"ב",
"d":"ד",
"e":"ע",
"g":"ג",
"h":"ח",
"j":"ט",
"k":"כ",
"l":"ל",
"m":"מ",
"n":"נ",
"o":"ס",
"p":"פ",
"q":"ק",
"r":"ר",
"s":"ש",
"t":"ת",
"u":"צ",
"v":"ש",
"w":"ו",
"x":"ח",
"y":"י",
"z":"ז",
"K":"ך",
"M":"ם",
"N":"ן",
"P":"ף",
"S":"שׁ",
"U":"ץ",
"V":"שׂ"
}

var unicode2olbgrk = {
"α":"a",
"Α":"A",
"β":"b",
"Β":"B",
"χ":"c",
"Χ":"C",
"δ":"d",
"Δ":"D",
"ε":"e",
"Ε":"E",
"φ":"f",
"Φ":"F",
"γ":"g",
"Γ":"G",
"η":"h",
"Η":"H",
"ι":"i",
"Ι":"I",
"κ":"k",
"Κ":"K",
"λ":"l",
"Λ":"L",
"μ":"m",
"Μ":"M",
"ν":"n",
"Ν":"N",
"ο":"o",
"Ο":"O",
"π":"p",
"Π":"P",
"ψ":"q",
"Ψ":"Q",
"ρ":"r",
"Ρ":"R",
"σ":"s",
"Σ":"S",
"τ":"t",
"Τ":"T",
"υ":"u",
"Υ":"U",
"ς":"v",
"ω":"w",
"Ω":"W",
"ξ":"x",
"Ξ":"X",
"θ":"y",
"Θ":"Y",
"ζ":"z",
"Ζ":"Z"
}

var unicode2olbheb  = {
"א" :"a",
"ב" :"b",
"ד" :"d",
"ע" :"e",
"ג" :"g",
"ח" :"h",
"ט" :"j",
"כ" :"k",
"ל" :"l",
"מ" :"m",
"נ" :"n",
"ס" :"o",
"פ" :"p",
"ק" :"q",
"ר" :"r",
"ש" :"s",
"ת" :"t",
"צ" :"u",
"ש" :"v",
"ו" :"w",
"ח" :"x",
"י" :"y",
"ז" :"z",
"ך" :"K",
"ם" :"M",
"ן" :"N",
"ף" :"P",
"שׁ":"S",//still error
"ץ" :"U",
"שׂ":"V"//still error
}

String.prototype.ganti=function(index, character) {
   return this.substr(0, index) + character;// + this.substr(index+character.length);
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
      if (regexp_file[str[i]] && regexp_file["a"] == "α") { //olbgrk->unicode
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
      } else if (regexp_file[str[i]] && regexp_file["α"] == "a") { //unicode->olbgrk
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
      } else if (regexp_file[str[i]] && regexp_file["χ"] == "ch") { //greek->latin
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
      } else if (regexp_file[str[i]] && regexp_file["a"] == "א") { //olbheb->unicode
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
      } else if (regexp_file[str[i]] && regexp_file["א"] == "a") { //unicode->olbheb
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
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
