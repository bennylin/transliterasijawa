/*!
* trans.js
* https://bennylin.github.com/transliterasijawa
*
* Copyright 2013, Bennylin @bennylin
* Dual licensed under the MIT or GPL Version 2 licenses.
* Released under the MIT, BSD, and GPL Licenses.
*
* Versions:
* 7 Mei 2013 - v 1.0
* 25 Juli 2013 - v 1.1
* 8 May 2015 - v 1.2
* 1 Juni 2016 - v 1.3
* 2020 - v 1.4
*
* Derived with permission from Hindi Transliteration by Markandey Singh @markandey
* http://www.purplegene.com/static/HindiTranslitration.html
*/

var vowelPrev = false;

/***************************
Function SuperTrim, findstr
trim string, menemukan karakter di dalam string
****************************/
function SuperTrim(str) {
    str = str || '';
    ret = str.replace(/^\s*|\s*$/g,'').replace(/\s+/g,' ');
    return ret;
}
function findstr(str,tofind){
    for (var i = 0; i < str.length; i++)
        if (str[i] == tofind)
            return true;
    return false;
}
/***************************
Function isDigit, isPunct, isVowel
cek apakah digit, tanda baca, atau huruf vokal (a, e/è/é, i, o, u, ě/ê, ô, ā/ī/ū/ō)
****************************/
function isDigit( /*char*/ a) {
    var str = "0123456789";
    return findstr(str,a);
}
function isPunct( /*char*/ a) {
    var str = ",.><?/+=-_}{[]*&^%$#@!~`\"\\|:;()";
    return findstr(str,a);
}
function isVowel( /*char*/ a) {
    var str = "AaEeÈèÉéIiOoUuÊêĚěĔĕṚṛXxôâāīūō";
   return findstr(str,a);
}
function isConsonant( /*char*/ a) {
    var str = "BCDfGHJKLMNPRSTVWYZbcdfghjklmnpqrstvwxyzḌḍṆṇṢṣṬṭŊŋÑñɲ";//QXqx are special chars, add engma & enye
   return findstr(str,a);
}
/***************************
Function isSpecial, isHR, isLW
cek apakah karakter spesial (bikonsonan/cakra-pengkal/layar-cecak-wignyan/panjingan)
****************************/
function isSpecial( /*char*/ a) {
    var str = "GgHhRrYyñ"; //untuk bikonsonan th, dh, ng (nga dan cecak), ny, -r- (cakra), -y- (pengkal), jñ (ꦘ)
   return findstr(str,a);
}
    
function isHR( /*char*/ a) {
    var str = "HhRrŊŋ";//untuk layar dan wignyan //1.3 dan cecak ([[:en:w:Engma]])
    return findstr(str,a);
}    

function isLW( /*char*/ a) {
    var str = "LlWw";//untuk panjingan ("ng" dapat diikuti "g", "r"/cakra, "y"/pengkal, dan "w" atau "l"/panjingan)
    return findstr(str,a);
}

function isCJ( /*char*/ a) {
    var str = "CcJj";//untuk anuswara -nj- dan -nc-
    return findstr(str,a);
}
/***************************
Function GetMatra
apabila huruf vokal, return matra (sandhangan swara)
****************************/
function GetMatra(str) {
    var i = 0;
    if (str.length < 1) {
        return "꧀";
    }
    while (str[i] == 'h') {
        i++;
        if (i >= str.length) {
            break;
        }
    }
    if (i < str.length) {
        str = str.substring(i);
    }
    var matramap1={ "ā":"ꦴ", "â":"ꦴ", "e":'ꦺ', "è":'ꦺ', "é":'ꦺ', "i":'ꦶ', "ī":"ꦷ", "o":'ꦺꦴ', "u":'ꦸ', "ū":"ꦹ", "x":"ꦼ", "ě":"ꦼ", "ĕ":"ꦼ", "ê":"ꦼ", "ō":"ꦼꦴ", "ô":"",
     "A":'ꦄ', "E":'ꦌ', "È":'ꦌ', "É":'ꦌ', "I":'ꦆ', "U":'ꦈ', "O":'ꦎ', "X":"ꦄꦼ", "Ě":"ꦄꦼ", "Ê":"ꦄꦼ", "ṛ":"ꦽ",
     "aa":'ꦴ', "ai":'ꦻ', "au":'ꦻꦴ', "ii":'ꦷ', "uu":'ꦹ'}
    var matramap2={ "ā":"ꦴ", "â":"ꦴ", "e":'ꦼ', "è":'ꦺ', "é":'ꦺ', "i":'ꦶ', "ī":"ꦷ", "u":'ꦸ', "ū":"ꦹ", "o":'ꦺꦴ', "x":"ꦼ", "ě":"ꦼ", "ĕ":"ꦼ", "ê":"ꦼ", "ô":"", "ō":"ꦼꦴ",
     "A":'ꦄ', "E":'ꦄꦼ', "È":'ꦌ', "É":'ꦌ', "I":'ꦆ', "U":'ꦈ', "O":'ꦎ', "X":"ꦄꦼ", "Ě":"ꦄꦼ", "Ê":"ꦄꦼ", "ṛ":"ꦽ",
     "aa":'ꦴ', "ai":'ꦻ', "au":'ꦻꦴ', "ii":'ꦷ', "uu":'ꦹ'}
    var matramap, mode;
    var modeTranslit = document.getElementsByName("mode");
    for(var rad in modeTranslit) {
      if(modeTranslit[rad].checked)
        mode = modeTranslit[rad].value;
    }
    if(mode == "kopas")
    matramap = matramap2;
    else //if(mode == "ketik")
    matramap = matramap1;

    if(matramap[str]!==undefined){
        return matramap[str];
    }
    return "";
}
/***************************
Function GetShift
Quick TOC: 
1. ends with 'h' -- th: thr, thl, thw, thy; dh: dhr, dhl, dhw, dhy; hy,hh, rh, kh, gh, ch, jh, ṭh, th: thr, thl; dh: dhr, dhl; hy,hh, rh, kh, gh, ch, jh, ṭh, ḍh, ph, bh, sh, h
2. ends with 'g' -- ng: ngr, ngy, nggr, nggl, nggw, nggy, ngg, ngng, ngl, njr, ngw; rg, hg, gg, g
3. ends with 'y' -- ny: nyr, nyl; ry, dhy, thy, y
4. ends with 'r', panjingan 'l'/'w' -- hr, rr, nggr; ll, rl, hl; rw, hw, ngw
5. ends with 'c', and 'j' -- nc: ncr, ncl; rc; nj: njr, njl; rj;
6. ends with 'ñ' -- jñ: jny
apabila huruf bikonsonan, return karakter khusus
TODO: masih case sensitive, mis "RR" masih tidak betul
****************************/
function GetShift(str) {
    str = str.toLowerCase();
    if (str.indexOf("th") == 0) { //suku kata diawali 'th'
        if (str.indexOf("thr") == 0) { //cakra
        return { "CoreSound": "ꦛꦿ", "len": 3 };
        } else if (str.indexOf("thl") == 0) { //thl
        return { "CoreSound": "ꦛ꧀ꦭ", "len": 3 };
    } else if (str.indexOf("thy") == 0) { //thy -- ...
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦛꦾ", "len": 3  };
    } else if (str.indexOf("thw") == 0) { //thw -- ...
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦛ꧀ꦮ", "len": 3  };
        } else {
        return { "CoreSound": "ꦛ", "len": 2 };
        }
    } else if (str.indexOf("dh") == 0) { //suku kata diawali 'dh'
        if (str.indexOf("dhr") == 0) { //cakra
        return { "CoreSound": "ꦝꦿ", "len": 3 };
        } else if (str.indexOf("dhl") == 0) { //dhl
        return { "CoreSound": "ꦝ꧀ꦭ", "len": 3 };
    } else if (str.indexOf("dhy") == 0) { //dhy -- dhyaksa
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦝꦾ", "len": 3  };
    } else if (str.indexOf("dhw") == 0) { //dhw -- dhwani
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦝ꧀ꦮ", "len": 3  };
        } else {
        return { "CoreSound": "ꦝ", "len": 2 };
        }
    } else if (str.indexOf("hy") == 0) { //hyang
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦲꦾ", "len": 2 };
    } else if (str.indexOf("hh") == 0) { //hh
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦃꦲ", "len": 2  };
    } else if (str.indexOf("rh") == 0) { //rh (kata berakhiran r diikuti kata berawalan h
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦂꦲ", "len": 2  };
    } else if (str.indexOf("kh") == 0) { //kh (aksara murda)
        return { "CoreSound":  "ꦑ", "len": 2  };
    } else if (str.indexOf("gh") == 0) { //gh (aksara murda)
        return { "CoreSound":  "ꦓ", "len": 2  };
    } else if (str.indexOf("ch") == 0) { //ch (aksara murda)
        return { "CoreSound":  "ꦖ", "len": 2  };
    } else if (str.indexOf("jh") == 0) { //jh (aksara murda)
        return { "CoreSound":  "ꦙ", "len": 2  };
    } else if (str.indexOf("ṭh") == 0) { //ṭh (aksara murda)
        return { "CoreSound":  "ꦜ", "len": 2  };
    } else if (str.indexOf("ḍh") == 0) { //ḍh (aksara murda)
        return { "CoreSound":  "ꦞ", "len": 2  };
    } else if (str.indexOf("ph") == 0) { //ph (aksara murda)
        return { "CoreSound":  "ꦦ", "len": 2  };
    } else if (str.indexOf("bh") == 0) { //bh (aksara murda)
        return { "CoreSound":  "ꦨ", "len": 2  };
    } else if (str.indexOf("sh") == 0) { //sh (aksara murda)
        return { "CoreSound":  "ꦯ", "len": 2  };
    } else if (str.indexOf("h") == 1) { //h
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦲ", "len": 2 };
    } else if (str.indexOf("h") > 1) { //suku kata memiliki konsonan 'h' yang tidak di awal suku
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound = sound + ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }
 
    //nga
    if (str.indexOf("ng") == 0) { //suku kata diawali 'ng'
        if (str.indexOf("ngr") == 0) { //cakra
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔꦿ", "len": 3 };
        } else if (str.indexOf("ngy") == 0) { //pengkal
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔꦾ", "len": 3 };
        } else if (str.indexOf("nggr") == 0) { //nggronjal
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦒꦿ", "len": 4 };
        } else if (str.indexOf("nggl") == 0) { //nggl-
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦒ꧀ꦭ", "len": 4 };
        } else if (str.indexOf("nggw") == 0) { //nggw-, munggwing
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦒ꧀ꦮ", "len": 4 };
        } else if (str.indexOf("nggy") == 0) { //nggy-, anggyat
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦒꦾ", "len": 4 };
        } else if (str.indexOf("ngg") == 0) { //ngg
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦒ", "len": 3 };/*
        } else if (str.indexOf("ngng") == 0) { //ngng
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦔ", "len": 4 };*/
        } else if (str.indexOf("ngl") == 0) { //ngl, e.g. ngluwari
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦭ", "len": 3 };
        } else if (str.indexOf("ngw") == 0) { //ngw, e.g. ngwiru
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦔ꧀ꦮ", "len": 3 };
        } else {
        return { "CoreSound": "ꦁ", "len": 2 };
        }
    } else if (str.indexOf("rg") == 0) { //'rg', e.g. amarga
        return { "CoreSound": "ꦂꦒ", "len": 2 };
    } else if (str.indexOf("hg") == 0) { //'hg', e.g. dahgene
        return { "CoreSound": "ꦃꦒ", "len": 2 };
    } else if (str.indexOf("gg") == 0) { //'gg', e.g. root word ends with 'g' with suffix starts with vocal
        return { "CoreSound": "ꦒ꧀ꦒ", "len": 2 };
    } else if (str.indexOf("g") == 1) { //g
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦒ", "len": 2 };
    } else if (str.indexOf("g") > 1) { //suku kata memiliki konsonan 'g' yang tidak di awal suku
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound = sound + ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }
 
    if (str.indexOf("jñ") == 0) { //suku kata diawali 'jñ'
        return { "CoreSound": "ꦘ", "len": 2 };
    }
    if (str.indexOf("jny") == 0) { //suku kata diawali 'jñ'
        return { "CoreSound": "ꦘ", "len": 3 };// still not working, 22 Jan 19
    }
    //nya
    if (str.indexOf("ny") == 0) { //suku kata diawali 'ny'
        if (str.indexOf("nyr") == 0) { //cakra
        return { "CoreSound": "ꦚꦿ", "len": 3 };
        } else if (str.indexOf("nyl") == 0) { //nyl, e.g. nylonong
        return { "CoreSound": "ꦚ꧀ꦭ", "len": 3 };
        } else {
        return { "CoreSound": "ꦚ", "len": 2 };
        }
    } else if (str.indexOf("ry") == 0) { //'ry', e.g. Suryati, Wiryadi
        if (str.indexOf("ryy") == 0) {
        return { "CoreSound": "ꦂꦪꦾ", "len": 3 };
        } else {
        return { "CoreSound": "ꦂꦪ", "len": 2 };
        }
    } else if (str.indexOf("yy") == 0) { //'yy', e.g. Duryyodhana (Jawa Kuno)
        return { "CoreSound": "ꦪꦾ", "len": 2 };
    } else if (str.indexOf("qy") == 0) { //qy -- only pengkal
        return { "CoreSound": "ꦾ", "len": 1  };
    } else if (str.indexOf("y") == 1) { //pengkal
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦾ", "len": 2 };
    } else if (str.indexOf("y") > 1) { //suku kata memiliki konsonan 'y' yang tidak di awal suku
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound += ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }

    if (str.indexOf("hr") == 0) { //hr-
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦃꦿ", "len": 2 };
    } else if (str.indexOf("rr") == 0) { //rr -- no cakra
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦂꦫ", "len": 2  };
    } else if (str.indexOf("wr") == 0) { //wr -- panjingan + cakra
        return { "CoreSound": "" + "ꦮꦿ", "len": 2  };
    } else if (str.indexOf("qr") == 0) { //qr -- only cakra
        return { "CoreSound": "ꦿ", "len": 1  };
    } else if (str.indexOf("r") == 1) { //cakra
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦿ", "len": 2 };
    } else if (str.indexOf("r") > 1) { //suku kata memiliki konsonan 'r' yang tidak di awal suku
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound += ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }

   //panjingan -l
   if (str.indexOf("ll") == 0) { //ll
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦭ꧀ꦭ", "len": 2  };
    } else if (str.indexOf("rl") == 0) { //rl (kata berakhiran r diikuti kata berawalan l
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦂꦭ", "len": 2  };
    } else if (str.indexOf("hl") == 0) { //hl 
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦃꦭ", "len": 2  };
    } else if (str.indexOf("ql") == 0) { //only panjingan
        return { "CoreSound": "꧀ꦭ", "len": 2 };
    } else if (str.indexOf("l") == 1) { //l
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦭ", "len": 2 };
    } else if (str.indexOf("l") > 1) { //suku kata memiliki konsonan 'l' yang tidak di awal suku//panjingan
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound = sound + ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }

   //panjingan -w
   if (str.indexOf("rw") == 0) { //rw
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦂꦮ", "len": 2  };//error untuk 'rwi', 'rwab'
    } else if (str.indexOf("hw") == 0) { //hw 
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦃꦮ", "len": 2  }; //ꦲ꧀ꦮ
    } else if (str.indexOf("qw") == 0) { //only panjingan
        return { "CoreSound": "꧀ꦮ", "len": 2 };
    } else if (str.indexOf("w") == 1) { //w
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦮ", "len": 2 };
    } else if (str.indexOf("w") > 1) { //suku kata memiliki konsonan 'w' yang tidak di awal suku//panjingan
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound = sound + ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }

   if (str.indexOf("nc") == 0) { //nc
      if (str.indexOf("ncr") == 0) { //ncr -- kencrung
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦚ꧀ꦕꦿ", "len": 3  };
      } else if (str.indexOf("ncl") == 0) { //ncl -- kinclong
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦚ꧀ꦕ꧀ꦭ", "len": 3  };
      } else {
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦚ꧀ꦕ", "len": 2  };
      }
    } else if (str.indexOf("rc") == 0) { //rc -- arca
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦂꦕ", "len": 2  };
    } else if (str.indexOf("c") == 1) { //c
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦕ", "len": 2 };
    } else if (str.indexOf("c") > 1) {
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound = sound + ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }

   if (str.indexOf("nj") == 0) { //nj
      if (str.indexOf("njr") == 0) { //njr -- anjrah
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦚ꧀ꦗꦿ", "len": 3  };
      } else if (str.indexOf("njl") == 0) { //njl -- anjlog
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦚ꧀ꦗ꧀ꦭ", "len": 3  };
      } else {
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦚ꧀ꦗ", "len": 2  };
      }
    } else if (str.indexOf("rj") == 0) { //'rj'
        return { "CoreSound": "ꦂꦗ", "len": 2 };
    } else if (str.indexOf("j") == 1) { //j
        return { "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦗ", "len": 2 };
    } else if (str.indexOf("j") > 1) {
        var sound = "";
        var len = 0;
        var index = 0;
        for (index = 0; index < str.length; index++) {
            var c = str[index];
            if (!isVowel(c)) {
                sound = sound + ResolveCharacterSound(c);
                len++;
            }
            else {
                break;
            }
        }
        return { "CoreSound": sound, "len": len };
    }

    return { "CoreSound": null, "len": 1 };
}
/***************************
Function GetCoreSound, GetSpecialSound
return aksara nglegana maupun aksara istimewa (f/v/z/pangkon)
****************************/
function GetCoreSound(str) {
    var consonantMap1 = {
        "A":"ꦄ", //A
        "B":"ꦧ", //B
        "C":"ꦕ", //C
        "D":"ꦢ", //D
        "E":"ꦌ", //E
        "F":"ꦥ꦳", //F
        "G":"ꦒ", //G
        "H":"ꦲ", //H
        "I":"ꦆ", //I
        "J":"ꦗ", //J
        "K":"ꦏ", //K
        "L":"ꦭ", //L
        "M":"ꦩ", //M
        "N":"ꦤ", //N
        "O":"ꦎ", //O
        "P":"ꦥ", //P
        "Q":"꧀", //Q
        "R":"ꦂ", //R
        "S":"ꦱ", //S
        "T":"ꦠ", //T
        "U":"ꦈ", //U
        "V":"ꦮ꦳", //V
        "W":"ꦮ", //W
        "X":"ꦼ", //X
        "Y":"ꦪ", //Y
        "Z":"ꦗ꦳", //Z
        "a":"ꦲ", //a
        "b":"ꦧ", //b
        "c":"ꦕ", //c
        "d":"ꦢ", //d
        "e":"ꦲꦺ", //e
        "f":"ꦥ꦳", //f
        "g":"ꦒ", //g
        "h":"ꦃ", //h
        "i":"ꦲꦶ", //i
        "j":"ꦗ", //j
        "k":"ꦏ", //k
        "l":"ꦭ", //l
        "m":"ꦩ", //m
        "n":"ꦤ", //n
        "o":"ꦲꦺꦴ", //o
        "p":"ꦥ", //p
        "q":"꧀", //q
        "r":"ꦂ", //r
        "s":"ꦱ", //s
        "ś":"ꦯ", //ś
        "t":"ꦠ", //t
        "u":"ꦲꦸ", //u
        "v":"ꦮ꦳", //v
        "w":"ꦮ", //w
        "x":"ꦲꦼ", //x
        "y":"ꦪ", //y
        "z":"ꦗ꦳", //z
        "È":"ꦌ", //È
        "É":"ꦌ", //É
        "Ê":"ꦄꦼ", //Ê
        "Ě":"ꦄꦼ", //Ě
        "è":"ꦲꦺ", //è
        "é":"ꦲꦺ", //é
        "ê":"ꦲꦼ", //ê
        "ě":"ꦲꦼ", //ě
        "ô":"ꦲ", //ô
        "ñ":"ꦚ", //enye
        "ṇ":"ꦟ",
        "ḍ":"ꦝ",
        "ṭ":"ꦛ",
        "ṣ":"ꦰ",
        "ṛ":"ꦽ"
    }
    var consonantMap2 = {
        "A":"ꦄ", //A
        "B":"ꦨ", //B
        "C":"ꦖ", //C
        "D":"ꦣ", //D
        "E":"ꦌ", //E
        "F":"ꦦ꦳", //F
        "G":"ꦓ", //G
        "H":"ꦲ꦳", //H
        "I":"ꦆ", //I
        "J":"ꦙ", //J
        "K":"ꦑ", //K
        "L":"ꦭ", //L
        "M":"ꦩ", //M
        "N":"ꦟ", //N
        "O":"ꦎ", //O
        "P":"ꦦ", //P
        "Q":"꧀", //Q
        "R":"ꦬ", //R
        "ś":"ꦯ", //ś
        "S":"ꦯ", //S
        "T":"ꦡ", //T
        "U":"ꦈ", //U
        "V":"ꦮ꦳", //V
        "W":"ꦮ", //W
        "X":"ꦼ", //X
        "Y":"ꦪ", //Y
        "Z":"ꦗ꦳", //Z
        "a":"ꦄ", //a
        "b":"ꦧ", //b
        "c":"ꦕ", //c
        "d":"ꦢ", //d
        "e":"ꦌ", //e
        "f":"ꦥ꦳", //f
        "g":"ꦒ", //g
        "h":"ꦃ", //h
        "i":"ꦆ", //i
        "j":"ꦗ", //j
        "k":"ꦏ", //k
        "l":"ꦭ", //l
        "m":"ꦩ", //m
        "n":"ꦤ", //n
        "o":"ꦎ", //o
        "p":"ꦥ", //p
        "q":"꧀", //q
        "r":"ꦂ", //r
        "s":"ꦱ", //s
        "ś":"ꦯ", //ś
        "t":"ꦠ", //t
        "u":"ꦈ", //u
        "v":"ꦮ꦳", //v
        "w":"ꦮ", //w
        "x":"ꦼ", //x
        "ĕ":"ꦼ", //ĕ
        "ě":"ꦼ", //ě
        "ê":"ꦼ", //ê
        "ū":"ꦹ", //ū
        "y":"ꦪ", //y
        "z":"ꦗ꦳", //z
        "È":"ꦌ", //È
        "É":"ꦌ", //É
        "Ê":"ꦄꦼ", //Ê
        "Ě":"ꦄꦼ", //Ě
        "è":"ꦌ", //è
        "é":"ꦌ", //é
        "ṇ":"ꦟ",
        "ḍ":"ꦝ",
        "ṭ":"ꦛ",
        "ṣ":"ꦰ",
        "ṛ":"ꦽ"
    }
    var consonantMap, murda;
    var modeMurda = document.getElementsByName("murda");
    for(var rad in modeMurda) {
      if(modeMurda[rad].checked)
        murda = modeMurda[rad].value;
    }
    if(murda == "pakai")
    consonantMap = consonantMap2;
    else //if(murda == "tidak")
    consonantMap = consonantMap1;

    var h_shift = GetShift(str);
    var core = str;

    if (h_shift["CoreSound"] == null) {

        if (consonantMap[str.charAt(0)]) core = consonantMap[str.charAt(0)];
        return {
            "CoreSound": core,
            "len": 1
        };
    } else {
        return h_shift;
    }
}
function GetSpecialSound(str) {
    specialsoundMap = { "f":"ꦥ꦳꧀", "v":"ꦮ꦳꧀", "z":"ꦗ꦳꧀", "ś":"ꦯ", "q":"꧀"/*pangkon*/ }
    if(specialsoundMap[str]!==undefined){
        return specialsoundMap[str];
    }
    return null;
}
/***************************
Function ResolveCharacterSound
return tanda baca, digit, vokal, maupun nglegana+pangkon
****************************/
function ResolveCharacterSound( /*char*/ c) {
    var str = "" + c;
    var len = 0;
    if (isDigit(c)) {
        return "" + ('꧇' + (c - '0'));
    } else if (isHR(str[0])) {
        return "" + GetCoreSound(str).CoreSound; //layar dan wignyan
    } else if (isCJ(str[1])) {
        return "" + GetCoreSound(str).CoreSound + "꧀"; //anuswara
    } else if (isConsonant(str[0])) {
        return "" + GetCoreSound(str).CoreSound + "꧀";
    } else { //if (isVowel(str[0])) {
        return "" + GetCoreSound(str).CoreSound;
    }
/**/
}
/***************************
Function GetSound
fungsi yang mentransliterasi masing-masing suku kata
****************************/
function GetSound(str) {
    var len = 0;
    str = SuperTrim(str);
    if (str == null || str == "") {
        return "";
    } 
        var SpecialSound = GetSpecialSound(str);
    
    if (SpecialSound != null && str.length == 1) {
        return SpecialSound;
    } 
    if (str.length == 1) {
        return ResolveCharacterSound(str[0]);
    } else {
        var core_sound = GetCoreSound(str);
        //return "1"+core_sound.CoreSound+"2";
        var matra = "";
        var konsonan = "";
            if (core_sound.len >= 1) {
                matra = GetMatra(str.substring(core_sound.len)); //aeiou (suku, wulu, pepet, taling, taling tarung, dll.)
                /*if () {

                } else {

                }*/
            } else {
                matra = ""; }

        if (str.indexOf("nggr") == 0) { //nggr-
            if (vowelPrev) konsonan = "ꦁꦒꦿ";//<vowel>nggr-, e.g. panggrahita
            else konsonan = "ꦔ꧀ꦒꦿ";//<nonvowel>nggr-, i.e. nggronjal
        } else if (str.indexOf("nggl") == 0) { //nggl-
            konsonan = "ꦔ꧀ꦒ꧀ꦭ";
        } else if (str.indexOf("nggw") == 0) { //nggw-
            konsonan = "ꦔ꧀ꦒ꧀ꦮ";
        } else if (str.indexOf("nggy") == 0) { //nggy-
            konsonan = "ꦔ꧀ꦒꦾ";
        } else if (str.indexOf("ngg") == 0) { //ngg-
            if (vowelPrev) konsonan = "ꦁꦒ";//<vowel>ngg-, e.g. tunggal
            else konsonan = "ꦔ꧀ꦒ";//<nonvowel>ngg-, i.e. nggambar
        } else if (str.indexOf("ngl") == 0) { //ngl-
            konsonan = "ꦔ꧀ꦭ";
        } else if (str.indexOf("ngw") == 0) { //ngw-
            konsonan = "ꦔ꧀ꦮ";
        } else if (str.indexOf("ncl") == 0) { //ncl-
            konsonan = "ꦚ꧀ꦕ꧀ꦭ";
        } else if (str.indexOf("ncr") == 0) { //ncr-
            konsonan = "ꦚ꧀ꦕꦿ";
        } else if (str.indexOf("njl") == 0) { //njl-
            konsonan = "ꦚ꧀ꦗ꧀ꦭ";
        } else if (str.indexOf("njr") == 0) { //njr-
            konsonan = "ꦚ꧀ꦗꦿ";
        } else if (str.indexOf("ngg") == 0) { //ngg-
            if (vowelPrev) konsonan = "ꦁꦒ";//<vowel>ngg-, e.g. tunggal
            else konsonan = "ꦔ꧀ꦒ";//<nonvowel>ngg-, i.e. nggambar
        } else if (core_sound.CoreSound == "ꦤꦚ꧀ꦕ꧀ꦭ") { // -ncl-
            konsonan = "ꦚ꧀ꦕ꧀ꦭ";//-ncl-
        } else if (core_sound.CoreSound == "ꦤꦚ꧀ꦕꦿ") { // -ncr-
            konsonan = "ꦚ꧀ꦕꦿ";//-ncr-*/
        } else if (core_sound.CoreSound == "ꦤꦚ꧀ꦕ") { // -nc-
            konsonan = "ꦚ꧀ꦕ";//-nyc-/*
        } else if (core_sound.CoreSound == "ꦤꦚ꧀ꦗ꧀ꦭ") { // -njl-
            konsonan = "ꦚ꧀ꦗ꧀ꦭ";//-njl-
        } else if (core_sound.CoreSound == "ꦤꦚ꧀ꦗꦿ") { // -njr-
            konsonan = "ꦚ꧀ꦗꦿ";//-njr-*/
        } else if (core_sound.CoreSound == "ꦤꦚ꧀ꦗ") { // -nj-
            konsonan = "ꦚ꧀ꦗ";//-nyj-
        } else if (core_sound.CoreSound == "ꦢꦝ꧀ꦮ") { // -dhw-
            konsonan = "ꦝ꧀ꦮ";//-dhw-
        } else if (core_sound.CoreSound == "ꦢꦝꦾ") { // -dhy-
            konsonan = "ꦝꦾ";//-dhy-
        } else if (core_sound.CoreSound == "ꦠꦛ꧀ꦮ") { // -thw-
            konsonan = "ꦛ꧀ꦮ";//-dhw-
        } else if (core_sound.CoreSound == "ꦠꦛꦾ") { // -thy-
            konsonan = "ꦛꦾ";//-dhy-
        } else if (findstr(core_sound.CoreSound,'ꦾ') && matra == "꧀") { // pengkal
            konsonan = core_sound.CoreSound; matra = "";//-y-
        } else if (findstr(core_sound.CoreSound,'ꦿ') && matra == "꧀") { // cakra
            konsonan = core_sound.CoreSound; matra = "";//-r-
        } else if (findstr(core_sound.CoreSound,'ꦿ') && matra == "ꦼ") { // cakra keret
            if ((str[0] == "n" && str[1] == "y") || ((str[0] == "t" || str[0] == "d") && str[1] == "h")) {
               konsonan = GetCoreSound(str[0]+str[1]).CoreSound + "ꦽ"; matra = "";//nyrê-, thrê-, dhrê-
            } else if (str[0] == "n" && str[1] == "g") {
               if (str[2] == "g") konsonan = "ꦔ꧀ꦒꦽ"; else konsonan = "ꦔꦽ"; matra = "";//nggrê-/ngrê-
            } else { konsonan = GetCoreSound(str[0]).CoreSound + "ꦽ"; matra = "";//-rê- 
            }
        } else if (findstr(core_sound.CoreSound, 'ꦭ') && matra == "ꦼ") { // nga lelet
            if ((str[0] == "n" && str[1] == "y") || ((str[0] == "t" || str[0] == "d") && str[1] == "h")) {
               konsonan = GetCoreSound(str[0]+str[1]).CoreSound + "꧀ꦭꦼ"; matra = "";//nylê-, thlê-, dhlê-
            } else if (str[0] == "n" && str[1] == "g") {
               if (str[2] == "g") konsonan = "ꦔ꧀ꦒ꧀ꦭꦼ"; else konsonan = "ꦔ꧀ꦭꦼ"; matra = "";//ngglê-/nglê-
            } else if (str[0] == "l") {
               konsonan = "ꦊ"; matra = "";//-lê- 
            } else { konsonan = GetCoreSound(str[0]).CoreSound + "꧀ꦭꦼ"; matra = "";//-lê- 
            }
        } else if (core_sound.CoreSound == 'ꦛꦿ' || core_sound.CoreSound == 'ꦝꦿ' || core_sound.CoreSound == 'ꦔꦿ' || core_sound.CoreSound == 'ꦚꦿ') { // i.e. nyruput
            konsonan = core_sound.CoreSound;
            if (matra == "꧀") matra = "";
        } else if (core_sound.CoreSound == "ꦭꦭ꧀ꦭ") { // -ll-
            konsonan = "ꦭ꧀ꦭ";//double -l-
        } else if (core_sound.CoreSound == "ꦂꦂꦫ") { // -rr-
            konsonan = "ꦂꦫ";//double -r-
        } else if (core_sound.CoreSound == "ꦂꦂꦲ") { // -rh-
            konsonan = "ꦂꦲ";//-rh-
        } else if (core_sound.CoreSound == "ꦂꦂꦭ") { // -rl-
            konsonan = "ꦂꦭ";//-rl-
        } else if (core_sound.CoreSound == "ꦂꦂꦮ") { // -rw-
            if (vowelPrev) konsonan = "ꦂꦮ";//-rw- -- arwana
            else konsonan = "ꦫ꧀ꦮ";//rw- -- rwa/rwi/rwab
        } else if (core_sound.CoreSound == "ꦂꦂꦕ") { // -rc-
            konsonan = "ꦂꦕ";//-rc-
        } else if (core_sound.CoreSound == "ꦃꦃꦲ") { // -hh-
            konsonan = "ꦃꦲ";//double -h-
        } else if (core_sound.CoreSound == "ꦃꦃꦭ") { // -hl-
            if (vowelPrev) konsonan = "ꦃꦭ";//-hl-
            else konsonan = "ꦲ꧀ꦭ";//hlam
        } else if (core_sound.CoreSound == "ꦃꦃꦮ") { // -hw-
            if (vowelPrev) konsonan = "ꦃꦮ";//-hw-
            else konsonan = "ꦲ꧀ꦮ";//hwab,hwan
        } else if (core_sound.CoreSound == "ꦃꦲꦾ") { // -hy-
            if (vowelPrev) konsonan = "ꦃꦪ";//sembahyang
            else konsonan = "ꦲꦾ";//hyang/*
        } else if (core_sound.CoreSound == "ꦃꦃꦽ") { // hrx-
            konsonan = "ꦲꦿ";//hrx-
        } else if (core_sound.CoreSound == "ꦃꦃꦿ") { // hr-
            if (matra == "ꦼ") konsonan = "ꦲꦽ";//hr-
            else konsonan = "ꦲꦿ";//hr-
        } else if (core_sound.CoreSound == "ꦃꦲꦿ") { // hr-
            if (matra == "ꦼ") konsonan = "ꦲꦽ";//hr-
            else konsonan = "ꦲꦿ";//hr-
        } else if (core_sound.CoreSound == 'ꦃ' && matra == "꧀") { // wignyan - 12 April
            konsonan = "ꦲ"; //ha
        } else if (core_sound.CoreSound == 'ꦃ' && matra != "꧀") { // wignyan
            konsonan = "ꦲ"; //ha
        } else if (core_sound.CoreSound == 'ꦂ' && matra == "ꦼ") { // pa cerek
            konsonan = "ꦉ"; matra = "";//rê
        } else if (core_sound.CoreSound == 'ꦂ' && matra != "꧀") { // layar
            konsonan = "ꦫ"; //ra
        } else if (core_sound.CoreSound == 'ꦁ' && matra != "꧀") { // cecak
            konsonan = "ꦔ"; //nga
        } else if (core_sound.CoreSound == 'ꦁ' && matra == "꧀") { // cecak
            konsonan = "ꦁ"; matra = "";//cecak
        } else {
            konsonan = core_sound.CoreSound; 
        }
        return "" + konsonan + matra;
    }
}
/***************************
Function DoTransliterate
fungsi utama yang dipanggil (main function)
****************************/
function DoTransliterate(str) {
    var i = 0;
    var ret = "";
    var pi = 0; //?offset
    var vowelFlag = false, angkaFlag = false, cecakFlag=false; 
    var angka = {"0":'꧐',"1":'꧑',"2":'꧒',"3":'꧓',"4":'꧔',"5":'꧕',"6":'꧖',"7":'꧗',"8":'꧘',"9":'꧙'}
    str = SuperTrim(str);

    while (i < str.length) {
        if (i > 0 && isVowel(str[i]) && isVowel(str[i-1])) { //deal with words that start with multiple vocals
           if ((str[i-1] == 'a' && str[i] == 'a') || (str[i-1] == 'i' && str[i] == 'i') || (str[i-1] == 'u' && str[i] == 'u') || (str[i-1] == 'a' && str[i] == 'i') || (str[i-1] == 'a' && str[i] == 'u')) {//specials
               if (i == 1 || (i > 1 && !isConsonant(str[i-2]))) { //for example if starts with 'ai-'
                   str = str.substring(0, i)+'h'+str.substring(i, str.length);
              }
               //else, do nothing, look in matramap table
           } else if ((str[i-1] == 'e' || str[i-1] == 'è' || str[i-1] == 'é') && (str[i] == 'a' || str[i] == 'o')) {//-y-
               str = str.substring(0, i)+'y'+str.substring(i, str.length);
           } else if ((str[i-1] == 'i') && (str[i] == 'a' || str[i] == 'e' || str[i] == 'è' || str[i] == 'é' || str[i] == 'o' || str[i] == 'u')) {//-y-
               str = str.substring(0, i)+'y'+str.substring(i, str.length);
           } else if ((str[i-1] == 'o') && (str[i] == 'a' || str[i] == 'e' || str[i] == 'è' || str[i] == 'é')) {//-w-
               str = str.substring(0, i)+'w'+str.substring(i, str.length);
           } else if ((str[i-1] == 'u') && (str[i] == 'a' || str[i] == 'e' || str[i] == 'è' || str[i] == 'é' || str[i] == 'i' || str[i] == 'o')) {//-y-
               str = str.substring(0, i)+'w'+str.substring(i, str.length);
           } else {
               str = str.substring(0, i)+'h'+str.substring(i, str.length);
           }
        }
        if ((isSpecial(str[i]) || isLW(str[i]) || isCJ(str[i])) && !vowelFlag) {
            //i++;
        } else if ((str[i] == 'h' && vowelFlag) || (!isVowel(str[i]) && i > 0) || (str[i] == ' ') || isPunct(str[i]) || isDigit(str[i]) || ((i - pi) > 5)) {
            if (!isDigit(str[i]) && angkaFlag) { //turn off the flag
                ret+="꧇​";// with zws
                angkaFlag = false;
            }
            if (pi < i) {
                if (cecakFlag && GetSound(str.substring(pi, i)) == "ꦁ") {
                    cecakFlag = false; 
                    ret += "ꦔ꧀ꦔ"; 
                } else if (!cecakFlag && GetSound(str.substring(pi, i)) == "ꦁ") { 
                    cecakFlag = true; 
                    ret += "ꦁ"; 
                } else {
                    cecakFlag = false; 
                    ret += GetSound(str.substring(pi, i)); 
                }
            }
            if (str[i] == ' ') { 
                    var spasi, modeSpasi;
                    var pakaiSpasi = document.getElementsByName("spasi");
                    for(var rad in pakaiSpasi) {
                      if(pakaiSpasi[rad].checked)
                        modeSpasi = pakaiSpasi[rad].value;
                    }
                    if(modeSpasi == "without") {
                    spasi = ''; }
                    else { //if(mode == "with")
                    spasi = '​'; // zero-width space 
                    //spasi = ' '; }//hair space http://en.wikipedia.org/wiki/Space_(punctuation)#Spaces_in_Unicode
                    }
                ret += spasi; }
            if (isPunct(str[i])) {
             if (str[i] == '.') {
                ret += "꧉​"; //titik+zero-width space
                pi = i + 1; 
             } else if (str[i] == ',') {
                ret += "꧈​"; //koma+zero-width space
                pi = i + 1; 
             } else if (str[i] == '|') {
                ret += "꧋"; pi = i + 1;
             } else if (str[i] == '(') {
                ret += "꧌"; pi = i + 1;
             } else if (str[i] == ')') {
                ret += "꧍​"; pi = i + 1;// with zws
             } else if (str[i] == '-') {//tanda hubung
                ret += "​"; pi = i + 1;
             } else if (str[i] == '?' || str[i] == '!' || str[i] == '"' || str[i] == "'") {//tanda tanya/seru/petik
                ret += "​"; //zero-width space
                pi = i + 1;
             } else {
                ret += str[i]; pi = i + 1;
             }
            } else if (isDigit(str[i])) {
                if (!angkaFlag) ret+="꧇";
                ret += angka[str[i]];
                angkaFlag = true;
                pi = i + 1;
            } else {
                pi = i; }
            vowelFlag = false;
        } else if (isVowel(str[i]) && str[i] != 'h') {
            if (!isDigit(str[i]) && angkaFlag) { //turn off the flag
                ret+="꧇​"; //with zws
                angkaFlag = false;
            }
            vowelFlag = true; 
        }
        if (pi > 0 && isVowel(str[pi-1])) {//<vowel>ngg
            vowelPrev = true;
        }
        else vowelPrev = false;
        i++;
    } //endwhile
    if (pi < i) {
        ret += GetSound(str.substring(pi, i)); }
    return SuperTrim(ret);
}
