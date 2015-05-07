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
"#":"1",
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
"ē":"η",//addition
"Ē":"Η",//addition
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
"ş":"ς",//addition
"w":"ω",
"W":"Ω",
"ō":"ω",//addition
"Ō":"Ω",//addition
"x":"ξ",
"X":"Ξ",
"y":"θ",
"Y":"Θ",
"z":"ζ",
"Z":"Ζ"
}

var unicode2olbgrk = {
"#":"2",
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

var greek2latin = {
"#":"3",
"α":"a",
"Α":"A",
"β":"b",
"Β":"B",
"χ":"ćh",//use c-accute accent, to avoid wrong backtranslit from αρχη->arch->αρχ
"Χ":"ĆH",
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
"ς":"ş",//final sigma, s-cedilla
"ω":"ō",
"Ω":"Ō",
"ξ":"x",
"Ξ":"X",
"θ":"th",
"Θ":"TH",
"ζ":"z",
"Ζ":"Z"
}

var olbheb2unicode  = { //with addition from Society of Biblical Literature's transliteration
"#":"4",
"a":"א",
"ʾ":"א",//addition
"b":"ב",
"d":"ד",
"e":"ע",
"ʿ":"ע",//addition
"g":"ג",
"h":"ח",
"á":"ח",//my addition
"j":"ט",
"ț":"ט",//addition
"k":"כ",
"K":"ך",
"l":"ל",
"m":"מ",
"M":"ם",
"n":"נ",
"N":"ן",
"o":"ס",
"p":"פ",
"P":"ף",
"q":"ק",
"ḱ":"ק",//my addition
"r":"ר",
"s":"שׁ",
"š":"שׁ",//addition
"S":"שׁ",//=s
"t":"ת",
"u":"צ",
"U":"ץ",
"ṣ":"צ",//addition
"v":"שׂ",
"V":"שׂ",//=v
"w":"ו",
"ó":"ו",//my addition
"x":"ח",//=h
"ḥ":"ח",//addition
"y":"י",
"i":"י",//my addition
"z":"ז",
"ׂ":"",
"ׁ":"",
"̣":"",
"̌":"",//caron (š)
"́":"",//accute accent (ś)
"_":""
}

var unicode2olbheb  = {
"#":"5",
"א" :"a",
"ב" :"b",
"ד" :"d",
"ע" :"e",
"ג" :"g",
"ח" :"h",
"ט" :"ț",//j corrected to ț
"כ" :"k",
"ך" :"K",
"ל" :"l",
"מ" :"m",
"ם" :"M",
"נ" :"n",
"ן" :"N",
"ס" :"o",
"פ" :"p",
"ף" :"P",
"ק" :"q",
"ר" :"r",
"ש" :"s",
"שׁ":"s",
"ת" :"t",
"צ" :"u",
"ץ" :"U",
"שׂ":"v",
"ו" :"w",
"ח" :"h",//x = h
"י" :"y",
"ז" :"z"
}

var hebrew2latin  = {
"#":"6",
"א" :"ʾ",
"ב" :"b",
"ד" :"d",
"ע" :"ʿ",
"ג" :"g",
"ח" :"h",
"ט" :"ț",//ṭ (t with dot below) -> ț (t comma)
"כ" :"k",
"ך" :"k",
"ל" :"l",
"מ" :"m",
"ם" :"m",
"נ" :"n",
"ן" :"n",
"ס" :"s",
"פ" :"p",
"ף" :"p",
"ק" :"q",
"ר" :"r",
"שׁ":"š",
"שׂ":"ś",
"ת" :"t",
"צ" :"ṣ",
"ץ" :"ṣ",
"ו" :"w",
"י" :"y",
"ז" :"z"
}

var hebrew2latinAlt  = {
"#":"7",
"א" :"a",
"ב" :"b_",
"ד" :"d_",
"ע" :"e",
"ג" :"g_",
"ח" :"á",//h->á
"ט" :"ț_",
"כ" :"k_",
"ך" :"k_",
"ל" :"l_",
"מ" :"m_",
"ם" :"m_",
"נ" :"n_",
"ן" :"n_",
"ס" :"s_",
"פ" :"p_",
"ף" :"p_",
"ק" :"ḱ_",//q->ḱ
"ר" :"r_",
"שׁ":"š",
"שׂ":"ś",
"ת" :"t_",
"צ" :"ṣ",//ṣ->z
"ץ" :"ṣ",//ṣ->z
"ו" :"ó",//w->ó
"י" :"i",//y->i
"ז" :"z_"
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
    	//olbgrk->unicode (I)
      if (regexp_file[str[i]] && regexp_file["#"] == "1") {
        if (str[i] == "h" && i > 0 && str[i-1] == "ć") {
        	trans = trans.ganti(j-1, "χ");
        } else if ((str[i] == "h" || str[i] == "H") && i > 0 && str[i-1] == "C") {
        	trans = trans.ganti(j-1, "Χ");
        } else if (str[i] == "h" && i > 0 && str[i-1] == "t") {
        	trans = trans.ganti(j-1, "θ");
        } else if ((str[i] == "h" || str[i] == "H") && i > 0 && str[i-1] == "T") {
        	trans = trans.ganti(j-1, "Θ");
        } else if (str[i] == "s" && i > 0 && str[i-1] == "p") {
        	trans = trans.ganti(j-1, "ψ");
        } else if ((str[i] == "s" || str[i] == "S") && i > 0 && str[i-1] == "P") {
        	trans = trans.ganti(j-1, "Ψ");
        } else {
        	trans = trans.ganti(j, regexp_file[str[i]]);j++;
        }
      }
      //unicode->olbgrk (II)
      else if (regexp_file[str[i]] && regexp_file["#"] == "2") {
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
      }
      //unicode greek->latin (III)
      else if (regexp_file[str[i]] && regexp_file["#"] == "3") {
        trans = trans.ganti(j, regexp_file[str[i]]);
        if (str[i] == "χ" || str[i] == "Χ" || str[i] == "ψ" || str[i] == "Ψ" || str[i] == "ς" || str[i] == "θ" || str[i] == "Θ") j += 2;
        else j++;
      }
      //special olbheb->unicode (IV A)
      else if ((str[i] == "̣" || str[i] == "̌" || str[i] == "́" || str[i] == "_") && regexp_file["#"] == "4") {
        if (str[i] == "̣") {
        	trans = trans.ganti(j-3, "צ");j-=2;
        }
        else if (str[i] == "̌") {
        	trans = trans.ganti(j-3, "שׁ");j-=2;
        }
        else if (str[i] == "́" || str[i] == "_") {}
        else {
        	trans = trans.ganti(j, regexp_file[str[i]]);j++;
        	if (str[i] == "s" || str[i] == "v" || str[i] == "S" || str[i] == "V") j += 2;
        	else j++;
        }
      }
      //normal olbheb->unicode (IV B)
      else if (regexp_file[str[i]] && regexp_file["#"] == "4") {
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
        if (str[i] == "s" || str[i] == "v" || str[i] == "S" || str[i] == "V") j += 2;
        else j++;
      }
      //special unicode->olbheb (V A)
      else if ((str[i] == "ׂ" || str[i] == "ׁ" || str[i] == "̣" || str[i] == "̌" || str[i] == "́" || str[i] == "_") && regexp_file["#"] == "5") {
        if (str[i] == "ׂ") {
        	trans = trans.ganti(j-1, "v");j++;
        }
        else if (str[i] == "ׁ" || str[i] == "̣" || str[i] == "̌" || str[i] == "́" || str[i] == "_") {}
        else {
        	trans = trans.ganti(j, regexp_file[str[i]]);j++;
        }
      }
      //normal unicode->olbheb (V B)
      else if (regexp_file[str[i]] && regexp_file["#"] == "5") {
        trans = trans.ganti(j, regexp_file[str[i]]);j++;
      }
      //special hebrew->latin (VI A)
      else if ((str[i] == "ׂ" || str[i] == "ׁ" || str[i] == "̣" || str[i] == "̌" || str[i] == "́" || str[i] == "_") && regexp_file["#"] == "6") {
        if (str[i] == "ׂ") {
        	trans = trans.ganti(j-1, "š");j++;
        }
        else if (str[i] == "ׁ") {
        	trans = trans.ganti(j-1, "ś");j++;
        }
        else if (str[i] == "̣" || str[i] == "̌" || str[i] == "́" || str[i] == "_") {}
        else {
        	trans = trans.ganti(j, regexp_file[str[i]]);j++;
        }
      }
      //normal hebrew->latin Alt (VI B)
      else if (regexp_file[str[i]] && regexp_file["#"] == "6") {
        trans = trans.ganti(j, regexp_file[str[i]]);
        if (str[i] == "ט" || str[i] == "צ" || str[i] == "ץ") {
        	j += 2;
        }
        else j++;
      }
      //special hebrew->latin (VII A)
      else if ((str[i] == "ׂ" || str[i] == "ׁ" || str[i] == "̣" || str[i] == "̌" || str[i] == "́" || str[i] == "_") && regexp_file["#"] == "7") {
        if (str[i] == "ׂ") {
        	trans = trans.ganti(j-1, "š");j++;
        }
        else if (str[i] == "ׁ") {
        	trans = trans.ganti(j-1, "ś");j++;
        }
        else if (str[i] == "̣" || str[i] == "̌" || str[i] == "́") {}
        else {
        	trans = trans.ganti(j, regexp_file[str[i]]);
        	if (str[i] == "א" || str[i] == "ע" || str[i] == "ח" || str[i] == "ו" || str[i] == "י") { j++; }
        	else j += 2;
        }
      }
      //normal hebrew->latin Alt (VII B)
      else if (regexp_file[str[i]] && regexp_file["#"] == "7") {
        trans = trans.ganti(j, regexp_file[str[i]]);
        if (str[i] == "א" || str[i] == "ע" || str[i] == "ח" || str[i] == "ו" || str[i] == "י") { j++; }
        else j += 2;
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
