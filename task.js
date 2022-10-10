let operators = [
  "=",
  "==",
  "===",
  "!==",
  "<=",
  ">=",
  "/=",
  "*=",
  "+=",
  "-=",
  "++",
  "--",
  "&&",
  "||",
  "+",
  "-",
  "*",
  "/",
  ">",
  "<",
  "!"
];
let punctuators = [
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  ".",
  ",",
  ";",
  ":",
  '"',
  "'",
];
let keywords = [
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "interface",
  "instanceof",
  "in",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "super",
  "switch",
  "static",
  "this",
  "throw",
  "try",
  "true",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
];
let regexForInt=new RegExp(/^([\+\-]?)[0-9]+$/g)
let regexForFloat=new RegExp(/^([\+\-]?)[0-9]*\.[0-9]+$/g)
let regexForId=new RegExp(/^([a-zA-Z\_\$][a-zA-Z0-9\\d\$\_]*)$/g)
// console.log(regexForId.test("a"))
let breaks = [...operators, ...punctuators, ...keywords," "];
let temp = "";
let words = [];
let stringOpen = false;
let backtickString=false
let floatStarted=false;
let signNumber=false
let iscomment=false 
let fs = require("fs");
let cp="";
var lineNo = 0;
const data = fs.readFileSync("words.txt", { encoding: "utf-8" }).split("\n");
for (var j = 0; j < data.length; j++) {
  lineNo=j+1;
  stringOpen=false
  iscomment=false
  if(!backtickString){
  temp=""
  }
  var linedata = data[j];
  for (var i = 0; i < linedata.length; i++) {
      
      if(linedata[i]=='"' && !stringOpen && !backtickString){
        stringOpen=true;
      }
     
      else if (stringOpen && i==linedata.length-1 && linedata[i]!=='"' ){
        temp+=linedata[i]
        words.push({word:temp,lineNo,cp:'invalid token'})
        stringOpen=false
        temp=""
      }
      else if(stringOpen && linedata[i]!='"'){
        temp+=linedata[i];
      }
      else if(linedata[i]=='"'&& stringOpen){
        if(linedata[i-1]!=="\\" ){
        stringOpen=false;
        words.push({word:temp,lineNo,cp:"String"})
        temp=""
        }
        else{
          temp=temp.slice(0,temp.length-1)
          temp+=linedata[i]
        }
      }
      else if(linedata[i]=="`" && !backtickString && !stringOpen ){
        backtickString=true
      }
      // else if(i==data[data.length-1].length && backtickString && data[data.length-1][data[data.length-1].length-1]!="`" ){
      //   temp+=linedata[i]
      //   words.push({word:temp,lineNo,cp:'invalid token'})
      //   backtickString=false
      //   temp=""
      // }
      else if (backtickString && linedata[i]!='`'){
        temp+=linedata[i];
      }
      else if(linedata[i]=='`'&& backtickString){
        if(linedata[i-1]!=="\\"){
        backtickString=false;
        words.push({word:temp,lineNo,cp:"String"})
        temp=""
        }
        else{
          temp=temp.slice(0,temp.length-1)
          temp+=linedata[i]
        }
      }
      
      else if(linedata[i]=="-" && linedata[i+1]!="-" && (linedata[i+1]>=0 || linedata[i+1]==".") && !linedata[i-1]>=0  || linedata[i]=="+" && linedata[i+1]!="+" && linedata[i+1]>=0 && !linedata[i-1]>=0  ){
        signNumber=true
        temp+=linedata[i]+linedata[i+1]
        i++
        if(i==linedata.length-1){
          words.push({ word: temp, lineNo,cp:"Number"});
        }
      }
      else if(linedata[i]>=0 && signNumber|| linedata[i]<=0 && signNumber ){
        temp+=linedata[i]
        if(i==linedata.length-1){
          words.push({ word: temp, lineNo,cp:"Number"});
        }
      }
      else if(!linedata[i]>=0  && signNumber|| !linedata[i]<=0 && signNumber ){
        signNumber=false
        words.push({word:temp,lineNo,cp:"Number"})
        temp=""
        --i
      }
      else if (linedata[i]=="."){
        floatStarted=true
        if(words[words.length-1].word>=0 && floatStarted||words[words.length-1].word<=0 && floatStarted ){
          temp+=words[words.length-1].word+"."
          words.pop()
        }
        else if(linedata[i+1]>=0){
          temp+="."
        }
        else{
          words.push({word:".",lineNo,cp:'.'})
          floatStarted=false
          temp=""
        }
      }
      
      
      else if (linedata[i]+linedata[i+1]=="//" && !stringOpen){
          i=linedata.length-1
      }
      
      else{

          if (linedata[i] !== " ") {

        if(operators.includes(linedata[i]+linedata[i+1]+linedata[i+2])){
            var triple=linedata[i]+linedata[i+1]+linedata[i+2]
            words.push({ word:triple , lineNo,cp:"relatonal operator"});
            temp = "";
            i+=2

        }
        else if(operators.includes(linedata[i]+linedata[i+1])){
            if(linedata[i]+linedata[i+1]=="==" || linedata[i]+linedata[i+1]==">="|| linedata[i]+linedata[i+1]==">"|| linedata[i]+linedata[i+1]=="<"||linedata[i]+linedata[i+1]=="<="||linedata[i]+linedata[i+1]=="!="){
              cp="relational operator"
            }
            else if(linedata[i]+linedata[i+1]=="-="|| linedata[i]+linedata[i+1]=="*="||linedata[i]+linedata[i+1]=="/="||linedata[i]+linedata[i+1]=="+="){
              cp="assignment operators"

            }
            else if(linedata[i]+linedata[i+1]=="++"||linedata[i]+linedata[i+1]=="--"){
              cp="inc dec"
            }
            else if(linedata[i]+linedata[i+1]=="&&"||linedata[i]+linedata[i+1]=="||"){
              cp="logical operator"
            }
            words.push({ word:linedata[i]+linedata[i+1], lineNo, cp:cp});
            temp = "";
            cp=''
            i++
        }
        else if(temp=="!"){
          cp="not operator"
          words.push({ word:temp, lineNo, cp:cp});
          temp = "";
          i--
        }
      else{
        temp += linedata[i];
        
        if(breaks.includes(linedata[i+1]) || i==linedata.length-1){
          var regexId=regexForId.test(temp);
          console.log(regexId,temp,i);
          if(keywords.includes(temp)){
            if(temp=="true"||temp=="false")cp="bool"
            else cp=temp
          }
          else if(regexId){
            cp="Id"
           }
          else if(punctuators.includes(temp)){
            cp=temp
          }
          // else if(temp=="true" ||temp=="false"){
          //   cp="bool"
          // }
          else if(temp=="="){
            cp="="
          }
          else if(temp=="-"||temp=="+"){
            cp="PM"
          }
          else if(temp=="*"||temp=="/"||temp=="%"){
            cp="MDM"
          }
          else if(regexForInt.test(parseInt(temp)) || regexForFloat.test(parseFloat(temp))){
            cp="Number"
          }
         
          words.push({ word: temp, lineNo,cp});
          temp=""
          cp=""
        }
        else if (breaks.includes(temp) || breaks.includes(linedata[i + 1])) {
         if(temp=="true" ||temp=="false"){
           cp="bool"
         }
          else 
          if(regexForId.test(temp)){
              cp="Id"
            }
            else
             if(keywords.includes(temp)){
              cp="keywords"
            }
            else if(punctuators.includes(temp)){
              cp=temp
            }
            else if(temp=="="){
              cp="="
            }
            else if(temp=="-"||temp=="+"||temp=="*"||temp=="/"){
              cp="arithmetic operator"
            }
            else if(regexForInt.test(temp) || regexForFloat.test(temp)){
              cp="Number"
            }
            else if(temp=="!"){
              cp="not operator"
            }
            else if(temp==">" || temp=="<"){
              cp="relational operator"
            }
            else{
              cp="invalid token"
            }
            
            
          words.push({ word: temp, lineNo,cp});
          temp = "";
          cp=""
          
      }
      // else if (i==linedata.length-1){
      //    if(regexForId.test(temp)){
      //     cp="Id"
      //   }
      //   else if(regexForInt.test(temp) || regexForFloat.test(temp)){
      //     cp="Number"
      //   }
      //   else if(temp==">" || temp=="<"){
      //     cp="relational operator"
      //   }
      //   else{
      //     cp="invalid token1"
      //   }
      //     words.push({ word: temp, lineNo,cp});
      //     temp=""
      // }
      
    }
    }
  }
}
}
// console.log(words);
fs.writeFileSync('output.txt','')
words.forEach((word)=>{
  fs.appendFileSync('output.txt',JSON.stringify({classpart:word.cp , valuepart:word.word , lineNO:word.lineNo}))
  fs.appendFileSync('output.txt',"\n")
})
fs.appendFileSync('output.txt',JSON.stringify({classpart:"endMarker",valuepart:"endMarker",lineNO:data.length}))
fs.appendFileSync('output.txt',"\n")

