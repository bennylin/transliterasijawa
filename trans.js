/*!
* trans.js
* https://bennylin.github.com/transliterasijawa
*
* Copyright 2013, Bennylin @bennylin
* Dual licensed under the MIT or GPL Version 2 licenses.
* Released under the MIT, BSD, and GPL Licenses.
*
* Date: 15 April 2013 - v 0.8
*
*
*
* Derived from Hindi Transliteration by Markandey Singh @markandey
* http://www.purplegene.com/static/HindiTranslitration.html
*/
 
/***************************
Function SuperTrim, findstr
trim string, menemukan karakter di dalam string
****************************/
function SuperTrim(str) {
    return str.replace(/^\s*|\s*$/g,'').replace(/\s+/g,' ');
}
function findstr(str,tofind){
    for (var i = 0; i < str.length; i++)
        if (str[i] == tofind)
            return true;
    return false;
}
/***************************
Function isDigit, isPunct, isVowel
cek apakah digit, tanda baca, atau huruf vokal (a, e/è/é, i, o, u, ê)
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
    var str = "AaEeÈèÉéIiOoUuÊêXx";
   return findstr(str,a);
}
function isConsonant( /*char*/ a) {
    var str = "BCDfGHJKLMNPRSTVWYZbcdfghjklmnpqrstvwxyz";//QXqx are special chars
   return findstr(str,a);
}
/***************************
Function isSpecial, isHR, isLW
cek apakah karakter spesial (bikonsonan/cakra-pengkal/layar-cecak-wignyan/panjingan)
****************************/
function isSpecial( /*char*/ a) {
    var str = "GgHhRrYy"; //untuk bikonsonan th, dh, ng (nga dan cecak), ny, -r- (cakra), -y- (pengkal)
   return findstr(str,a);
}
    
function isHR( /*char*/ a) {
    var str = "HhRr";//untuk layar dan wignyan
    return findstr(str,a);
}    

function isLW( /*char*/ a) {
    var str = "LlWw";//untuk panjingan ("ng" dapat diikuti "g", "r"/cakra, "y"/pengkal, dan "w" atau "l"/panjingan)
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
    var matramap={ "aa":'ꦴ', "ai":'ꦍ', "e":'ꦺ', "è":'ꦺ', "é":'ꦺ', "i":'ꦶ', "u":'ꦸ', "o":'ꦺꦴ', "x":"ꦼ", "ê":"ꦼ", "AA":'ꦴ', "AI":'ꦍ', "E":'ꦺ', "È":'ꦺ', "É":'ꦺ', "I":'ꦶ', "U":'ꦸ', "O":'ꦺꦴ', "X":"ꦼ", "Ê":"ꦼ", "Aa":'ꦴ', "Ai":'ꦍ' }
    if(matramap[str]!==undefined){
        return matramap[str];
    }
    return "";
}
/***************************
Function GetShift
apabila huruf bikonsonan, return karakter khusus
****************************/
function GetShift(str) {

    if (str.indexOf("th") == 0) { //suku kata diawali 'th'
        if (str.indexOf("thr") == 0) { //cakra
        return {
            "CoreSound": "ꦛꦿ",
            "len": 3
        };
        } else if (str.indexOf("thl") == 0) { //thl
        return {
            "CoreSound": "ꦛ꧀ꦭ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦛ",
            "len": 2
        };
        }
    } else if (str.indexOf("dh") == 0) { //suku kata diawali 'dh'
        if (str.indexOf("dhr") == 0) { //cakra
        return {
            "CoreSound": "ꦝꦿ",
            "len": 3
        };
        } else if (str.indexOf("dhl") == 0) { //dhl
        return {
            "CoreSound": "ꦝ꧀ꦭ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦝ",
            "len": 2
        };
        }
    } else if (str.indexOf("hy") == 0) { //hyang
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦲꦾ",
            "len": 1
        };
    } else if (str.indexOf("h") == 1) { //h
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦲ",
            "len": 2
        };
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
        return {
            "CoreSound": sound,
            "len": len
        };
    }
 
    //nga
    if (str.indexOf("ng") == 0) { //suku kata diawali 'ng'
        if (str.indexOf("ngr") == 0) { //cakra
        return {
            "CoreSound": "ꦔꦿ",
            "len": 3
        };
        } else if (str.indexOf("ngy") == 0) { //pengkal
        return {
            "CoreSound": "ꦔꦾ",
            "len": 3
        };
        } else if (str.indexOf("ngg") == 0) { //ngg
        return {
            "CoreSound": "ꦔ꧀ꦒ",
            "len": 3
        };
        } else if (str.indexOf("ngl") == 0) { //ngl, e.g. ngluwari
        return {
            "CoreSound": "ꦔ꧀ꦭ",
            "len": 3
        };
        } else if (str.indexOf("ngw") == 0) { //ngw, e.g. ngwiru
        return {
            "CoreSound": "ꦔ꧀ꦮ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦁ",
            "len": 2
        };
        }
    } else if (str.indexOf("rg") == 0) { //'rg', e.g. amarga
        return {
            "CoreSound": "ꦂꦒ",
            "len": 3
        };
    } else if (str.indexOf("g") == 1) { //g
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦒ",
            "len": 2
        };
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
        return {
            "CoreSound": sound,
            "len": len
        };
    }
 
    //nya
    if (str.indexOf("ny") == 0) { //suku kata diawali 'ny'
        if (str.indexOf("nyr") == 0) { //cakra
        return {
            "CoreSound": "ꦚꦿ",
            "len": 3
        };
        } else if (str.indexOf("nyl") == 0) { //nyl, e.g. nylonong
        return {
            "CoreSound": "ꦚ꧀ꦭ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦚ",
            "len": 2
        };
        }
    } else if (str.indexOf("y") == 1) { //pengkal
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦾ",
            "len": 2
        };
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
        return {
            "CoreSound": sound,
            "len": len
        };
    }

    if (str.indexOf("hr") == 0) { //hr-
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦲꦿ",
            "len": 1
        };
    } else if (str.indexOf("r") == 1) { //cakra
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦿ",
            "len": 2
        };
    }

   if (str.indexOf("l") == 1) { //l
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦭ",
            "len": 2
        };
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
        return {
            "CoreSound": sound,
            "len": len
        };
    }

   if (str.indexOf("w") == 1) { //w
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "꧀ꦮ",
            "len": 2
        };
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
        return {
            "CoreSound": sound,
            "len": len
        };
    }
 
    return {
        "CoreSound": null,
        "len": 1
    };
}
/***************************
Function GetCoreSound, GetSpecialSound
return aksara nglegana maupun aksara istimewa (f/v/z/pangkon)
****************************/
function GetCoreSound(str) {
    var consonantMap = {
        "65":"ꦄ", //A
        "66":"ꦨ", //B
        "67":"ꦖ", //C
        "68":"ꦣ", //D
        "69":"ꦌ", //E
        "70":"ꦥ꦳", //F
        "71":"ꦓ", //G
        "72":"ꦃ", //H
        "73":"ꦆ", //I
        "74":"ꦙ", //J
        "75":"ꦑ", //K
        "76":"ꦭ", //L
        "77":"ꦩ", //M
        "78":"ꦟ", //N
        "79":"ꦎ", //O
        "80":"ꦦ", //P
        "81":"꧀", //Q
        "82":"ꦬ", //R
        "83":"ꦯ", //S
        "84":"ꦡ", //T
        "85":"ꦈ", //U
        "86":"ꦮ꦳", //V
        "87":"ꦮ", //W
        "88":"ꦼ", //X
        "89":"ꦪ", //Y
        "90":"ꦗ꦳", //Z
        "97":"ꦄ", //a
        "98":"ꦧ", //b
        "99":"ꦕ", //c
        "100":"ꦢ", //d
        "101":"ꦌ", //e
        "102":"ꦥ꦳", //f
        "103":"ꦒ", //g
        "104":"ꦃ", //h
        "105":"ꦆ", //i
        "106":"ꦗ", //j
        "107":"ꦏ", //k
        "108":"ꦭ", //l
        "109":"ꦩ", //m
        "110":"ꦤ", //n
        "111":"ꦎ", //o
        "112":"ꦥ", //p
        "113":"꧀", //q
        "114":"ꦂ", //r
        "115":"ꦱ", //s
        "116":"ꦠ", //t
        "117":"ꦈ", //u
        "118":"ꦮ꦳", //v
        "119":"ꦮ", //w
        "120":"ꦼ", //x
        "121":"ꦪ", //y
        "122":"ꦗ꦳", //z
        "200":"ꦌ", //È
        "201":"ꦌ", //É
        "202":"ꦄꦼ", //Ê
        "232":"ꦌ", //è
        "233":"ꦌ", //é
        "234":"ꦄꦼ" //ê
    }
    var h_shift = GetShift(str);
    var core = str;

    if (h_shift["CoreSound"] == null) {

        if (consonantMap[str.charCodeAt(0)]) core = consonantMap[str.charCodeAt(0)];
        return {
            "CoreSound": core,
            "len": 1
        };
    } else {
        return h_shift;
    }
}
function GetSpecialSound(str) {
    specialsoundMap = { "f":"ꦥ꦳꧀", "v":"ꦮ꦳꧀", "z":"ꦗ꦳꧀", "q":"꧀",/*pangkon*/ }
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
        //return core_sound.CoreSound+"2";
        var matra = "";
        var konsonan = "";
            if (core_sound.len >= 1) {
                matra = GetMatra(str.substring(core_sound.len)); //aeiou (suku, wulu, pepet, taling, taling tarung, dll.)
                /*if () {

                } else {

                }*/
            } else {
                matra = ""; }
        if (findstr(core_sound.CoreSound,'ꦾ') && matra == "꧀") { // pengkal
            konsonan = core_sound.CoreSound; matra = "";//-y-
        } else if (findstr(core_sound.CoreSound,'ꦿ') && matra == "꧀") { // cakra
            konsonan = core_sound.CoreSound; matra = "";//-r-
        } else if (findstr(core_sound.CoreSound,'ꦿ') && matra == "ꦼ") { // cakra keret
            if ((str[0] == "n" && str[1] == "y") || ((str[0] == "t" || str[0] == "d") && str[1] == "h")) {
               konsonan = GetCoreSound(str[0]+str[1]).CoreSound + "ꦽ"; matra = "";//nyrê-, thrê-, dhrê-
            } else if (str[0] == "n" && str[1] == "g") {
               konsonan = "ꦔꦽ"; matra = "";//ngrê- 
            } else { konsonan = GetCoreSound(str[0]).CoreSound + "ꦽ"; matra = "";//-rê- 
            }
        } else if (findstr(core_sound.CoreSound, 'ꦭ') && matra == "ꦼ") { // nga lelet
            if ((str[0] == "n" && str[1] == "y") || ((str[0] == "t" || str[0] == "d") && str[1] == "h")) {
               konsonan = GetCoreSound(str[0]+str[1]).CoreSound + "꧀ꦊ"; matra = "";//nylê-, thlê-, dhlê-
            } else if (str[0] == "n" && str[1] == "g") {
               konsonan = "ꦔ꧀ꦊ"; matra = "";//nglê-
            } else if (str[0] == "l") {
               konsonan = "ꦊ"; matra = "";//-lê- 
            } else { konsonan = GetCoreSound(str[0]).CoreSound + "꧀ꦊ"; matra = "";//-lê- 
            }
        } else if (core_sound.CoreSound == 'ꦛꦿ' || core_sound.CoreSound == 'ꦝꦿ' || core_sound.CoreSound == 'ꦔꦿ' || core_sound.CoreSound == 'ꦚꦿ') { // i.e. nyruput
            konsonan = core_sound.CoreSound;
            if (matra == "꧀") matra = "";
        } else if (core_sound.CoreSound == "ꦃꦲꦾ") { // hyang
            konsonan = "ꦲꦾ";//hyang
        } else if (core_sound.CoreSound == "ꦃꦲꦿ") { // hr-
            konsonan = "ꦲꦿ";//hr-
        /*} else if (core_sound.CoreSound == "ꦔ꧀ꦒ") { // ngg- //todo: differentiate between nggambar (in front) and tunggal (middle)
            konsonan = "ꦔ꧀ꦒ";//ngg-*/
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
    var pi = 0; //?
    var vowelFlag = false, angkaFlag = false;
    var angka = {"0":'꧐',"1":'꧑',"2":'꧒',"3":'꧓',"4":'꧔',"5":'꧕',"6":'꧖',"7":'꧗',"8":'꧘',"9":'꧙'}
    str = SuperTrim(str);
    while (i < str.length) {
        if ((isSpecial(str[i]) || isLW(str[i])) && !vowelFlag) {
            //i++;
        } else if ((str[i] == 'h' && vowelFlag) || (!isVowel(str[i]) && i > 0) || (str[i] == ' ') || isPunct(str[i]) || isDigit(str[i]) || ((i - pi) > 5)) {
            if (!isDigit(str[i]) && angkaFlag) { //turn off the flag
                ret+="꧇";
                angkaFlag = false;
            }
            if (pi < i) {
                ret += GetSound(str.substring(pi, i)); }
            if (str[i] == ' ') {
                ret += '​'; }
            if (isPunct(str[i])) {
             if (str[i] == '.') {
                ret += "꧉"; pi = i + 1;
             } else if (str[i] == ',') {
                ret += "꧈"; pi = i + 1;
             } else if (str[i] == '|') {
                ret += "꧋"; pi = i + 1;
             } else if (str[i] == '(') {
                ret += "꧌"; pi = i + 1;
             } else if (str[i] == ')') {
                ret += "꧍"; pi = i + 1;
             } else if (str[i] == '-') {//tanda hubung
                ret += "​"; pi = i + 1;
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
                ret+="꧇";
                angkaFlag = false;
            }
            vowelFlag = true; }
        i++;
    } //endwhile
    if (pi < i) {
        ret += GetSound(str.substring(pi, i)); }
    return SuperTrim(ret);
}
