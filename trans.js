/*!
* trans.js
* https://bennylin.github.com/transliterasijawa
*
* Copyright 2013, Bennylin @bennylin
* Dual licensed under the MIT or GPL Version 2 licenses.
* Released under the MIT, BSD, and GPL Licenses.
*
* Date: 9 April 2013 - v 0.3
* Source code by Markandey Singh @markandey
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
    var str = ",.><?/+=-_}{[]*&^%$#@!~`\"\\|:;";
    return findstr(str,a);
}
function isVowel( /*char*/ a) {
    var str = "aeèéiouêx";
   return findstr(str,a);
}
/***************************
Function isSpecial, isHR
cek apakah karakter spesial (bikonsonan/cakra-pengkal/layar-cecak-wignyan)
****************************/
function isSpecial( /*char*/ a) {
    var str = "hgyr"; //untuk bikonsonan th, dh, ng (nga dan cecak), ny, -r- (cakra), -y- (pengkal)
   return findstr(str,a);
}
    
function isHR( /*char*/ a) {
    var str = "hr";//untuk layar dan wignyan
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
    var matramap={
        "aa":'ꦴ',
        "ai":'ꦍ',
        "e":'ꦺ',
        "è":'ꦺ',
        "é":'ꦺ',
        "i":'ꦶ',
        "u":'ꦸ',
        "o":'ꦺꦴ',
        "x":"ꦼ",
        "ê":"ꦼ"
    }
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
        if (str.indexOf("r") == 2) { //cakra
        return {
            "CoreSound": "ꦛꦿ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦛ",
            "len": 2
        };
        }
    } else if (str.indexOf("dh") == 0) { //suku kata diawali 'dh'
        if (str.indexOf("r") == 2) { //cakra
        return {
            "CoreSound": "ꦝꦿ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦝ",
            "len": 2
        };
        }
    } else if (str.indexOf("h") >= 1) { //suku kata memiliki konsonan 'h' yang tidak di awal suku
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
 
 
    if (str.indexOf("ng") == 0) { //suku kata diawali 'ng'
        if (str.indexOf("r") == 2) { //cakra
        return {
            "CoreSound": "ꦔꦿ",
            "len": 3
        };
        } else {
        return {
            "CoreSound": "ꦁ",
            "len": 2
        };
        }
    } else if (str.indexOf("g") >= 1) { //suku kata memiliki konsonan 'g' yang tidak di awal suku
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
 
    if (str.indexOf("ny") == 0) { //suku kata diawali 'ny'
        if (str.indexOf("r") == 2) { //cakra
        return {
            "CoreSound": "ꦚꦿ",
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
    } else if (str.indexOf("r") == 1) { //cakra
        return {
            "CoreSound": "" + GetCoreSound(str[0]).CoreSound + "ꦿ",
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
    var soundmap = "ꦄꦧꦕꦢꦌꦥꦒꦃꦆꦗꦏꦭꦩꦤꦎꦥꦐꦂꦱꦠꦈꦥꦮꦼꦪꦗ";
    var len = 1;
    var h_shift = GetShift(str);

    if (h_shift["CoreSound"] == null) {
        var position = ((str.charCodeAt(0)) - 'a'.charCodeAt(0));
        if (position < soundmap.length && position >= 0) { //position < 26 && position >= dari huruf 'a'
            var coresnd = "" + soundmap[position];
            return {
                "CoreSound": coresnd,
                "len": len
            };
        }
        len = 1;
        return {
            "CoreSound": str,
            "len": len
        };
    } else {
        return h_shift;
    }
}
function GetSpecialSound(str) {
    specialsoundMap={
        "f":"ꦥ꦳",
        "v":"ꦥ꦳",
        "z":"ꦗ꦳",
        "q":"꧀",//pangkon
    }
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
    if (isPunct(c)) {
        return str;
    } else if (isDigit(c)) {
        return "" + ('꧇' + (c - '0'));
    } else if (isHR(str[0])) {
        return "" + GetCoreSound(str).CoreSound; //layar dan wignyan
    } else if (!isVowel(str[0])) {
        return "" + GetCoreSound(str).CoreSound + "꧀";
    } else {
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
    str = SuperTrim(str.toLowerCase());
    if (str == null || str == "") {
        return "";
    }
    var SpecialSound = GetSpecialSound(str);
    if (SpecialSound != null) {
        return SpecialSound;
    }
    if (str.length == 1) {
        return ResolveCharacterSound(str[0]);
    } else {
        var core_sound = GetCoreSound(str);
        var matra = "";
        var konsonan = "";
            if (core_sound.len >= 1) {
                matra = GetMatra(str.substring(core_sound.len)); //aeiou (suku, wulu, pepet, taling, taling tarung, dll.)
            } else {
                matra = ""; }
        if (core_sound.CoreSound == 'ꦛꦿ' || core_sound.CoreSound == 'ꦝꦿ' || core_sound.CoreSound == 'ꦔꦿ' || core_sound.CoreSound == 'ꦚꦿ') { // i.e. nyruput
            konsonan = core_sound.CoreSound;
            if (matra == "꧀") matra = "";
        } else if (core_sound.CoreSound == 'ꦃ' && matra != "꧀") { // wignyan
            konsonan = "ꦲ"; //ha
        } else if (core_sound.CoreSound == 'ꦂ' && matra == "ꦼ") { // pa cerek
            konsonan = "ꦉ"; matra = "";//rê
        } else if (core_sound.CoreSound == 'ꦂ' && matra != "꧀") { // layar
            konsonan = "ꦫ"; //ra
        } else if (core_sound.CoreSound == 'ꦁ' && matra == "꧀") { // cecak
            konsonan = "ꦁ"; matra = "";//cecak
        } else if (core_sound.CoreSound == 'ꦁ' && matra != "꧀") { // cecak
            konsonan = "ꦔ"; //nga
        } else if (findstr(core_sound.CoreSound,'ꦾ') && matra == "꧀") { // pengkal
            konsonan = core_sound.CoreSound; matra = "";//-y-
        } else if (findstr(core_sound.CoreSound,'ꦿ') && matra == "꧀") { // cakra
            konsonan = core_sound.CoreSound; matra = "";//-r-
        } else if (findstr(core_sound.CoreSound,'ꦿ') && matra == "ꦼ") { // cakra keret
            konsonan = "" + GetCoreSound(str[0]).CoreSound + "ꦽ"; matra = "";//-r-
        } else if (core_sound.CoreSound == 'ꦭ' && matra == "ꦼ") { // nga lelet
            konsonan = "ꦊ"; matra = "";//lê
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
    var vowelFlag = false;
    str = SuperTrim(str.toLowerCase());
    while (i < str.length) {
        if (isSpecial(str[i]) && !vowelFlag) {
            //i++;
        } else if ((str[i] == 'h' && vowelFlag) || (!isVowel(str[i]) && i > 0) || (str[i] == ' ') || isPunct(str[i]) || isDigit(str[i]) || ((i - pi) > 5)) {
            if (pi < i) {
                ret += GetSound(str.substring(pi, i)); }
            if (str[i] == ' ') {
                ret += ''; }
            if (isPunct(str[i])) {
             if (str[i] == '.') {
                ret += "꧉";
                pi = i + 1;
             } else if (str[i] == ',') {
                ret += "꧈";
                pi = i + 1;
             } else if (str[i] == '|') {
                ret += "꧋";
                pi = i + 1;
             } else if (str[i] == '(') {
                ret += "꧌";
                pi = i + 1;
             } else if (str[i] == ')') {
                ret += "꧍";
                pi = i + 1;
             } else {
                ret += str[i];
                pi = i + 1;
             }
            } else if (isDigit(str[i])) {
                var digi = "" + (str[i] - '0');
                ret += digi;
                pi = i + 1;
            } else {
                pi = i; }
            vowelFlag = false;
        } else if (isVowel(str[i]) && str[i] != 'h') {
            vowelFlag = true; }
        i++;
    } //endwhile
    if (pi < i) {
        ret += GetSound(str.substring(pi, i)); }
    return SuperTrim(ret);
}
