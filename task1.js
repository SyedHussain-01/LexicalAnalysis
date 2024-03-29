let regexForInt=str=>/^([\+\-]?)[0-9]+$/g.test(str)
let regexForFloat=str=>/^([\+\-]?)[0-9]*\.[0-9]+$/g.test(str)
let regexForId=str=>/^([a-zA-Z\_\$][a-zA-Z0-9\\d\$\_]*)$/g.test(str)
let fs = require("fs");
const data = fs.readFileSync("words.txt", { encoding: "utf-8" }).split("\n");
const {operators,punctuators,breaks,keywords,dataTypes}=require('./breakers.js')
var two="";
var three="";
var checkThree;
var checkTwo;
let curlyBracketCounter = 0;
let wordSplitterArray = [];
let curlyBracketsOpen = false;
var splits=[]
let stringOpen = false;
let backtickString=false;
let multiLineComment = false;
let paranthesisOpen = false;
var uploadToken=(str,lineNo,cp)=>{
  if(str === " "){
    return;
  }
  wordSplitterArray.push(str);
  splits.push({vp:str,cp:cp?cp:"",lineNo})
}
const compare=(data,toCompareWith)=>data.vp==toCompareWith
var temp=""
data.forEach((line,lineNo)=>{
    ++lineNo
    if(!backtickString){
      temp="";
    }
    for (let i= 0; i<line.length; i++) {
        if(line[i]=='"' && !stringOpen && !backtickString && !multiLineComment){
            stringOpen=true;
            // uploadToken(temp,lineNo);
          }
         
          else if (stringOpen && i==line.length-1 && line[i]!=='"' ){
            temp+=line[i]
            uploadToken(temp,lineNo,"invalid token");
            stringOpen=false
            temp=""
          }
          else if(stringOpen && line[i]!='"'){
            temp+=line[i];
          }
          else if(line[i]=='"'&& stringOpen){
            if(line[i-1]!=="\\" ){
            stringOpen=false;
            uploadToken(temp,lineNo,"String")
            temp=""
            }
            else{
              temp=temp.slice(0,temp.length-1)
              temp+=line[i]
            }
          }
          else if(line[i]=="`" && !backtickString && !stringOpen ){
            temp.length>0?uploadToken(temp,lineNo,"String"):false
            temp=""
            backtickString=true
          }
          // else if (backtickString && line[i]!='`'){
          //   temp+=line[i]
          //    if(lineNo==data.length && i==line.length-1){
          //       uploadToken(temp,lineNo,"invalid token");
          //     }
          // }
          // else if(line[i]=='`'&& backtickString){
          //   if(line[i-1]!=="\\"){
          //   backtickString=false;
          //   uploadToken(temp,lineNo,"String")
          //   temp=""
          //   }
          //   else{
          //     temp=temp.slice(0,temp.length-1)
          //     temp+=line[i]
          //   }
          // }
          else if (line[i]=== '(' && !multiLineComment){
            paranthesisOpen = true
            temp+= line[i]
            uploadToken(temp,lineNo)
            temp='';
          }
          else if ( line [i] !== ")" && i === line.length-1 && paranthesisOpen && !multiLineComment){
            temp+=line[i]
            uploadToken(temp,lineNo,"invalid token");
            paranthesisOpen = false;
            temp=""
          }
          else if (line[i]=== ')' && paranthesisOpen && !multiLineComment){
            paranthesisOpen=false;
            temp += line[i]
            uploadToken(temp,lineNo)
            temp=""
          }
          // else if (line[i] === "{"){
          //   curlyBracketCounter = curlyBracketCounter + 1;
          //   curlyBracketsOpen = true;
          //   temp += line[i];
          //   uploadToken(temp,lineNo);
          //   temp ='';
          // }
          // else if (line[i] === "}" && curlyBracketsOpen && lineNo !== data.length){
          //   curlyBracketCounter = curlyBracketCounter - 1;
          //   if(curlyBracketCounter<=0){
          //     curlyBracketsOpen = false;
          //   }
          //   temp += line[i];
          //   uploadToken(temp,lineNo);
          //   temp ='';
          // }
          // else if (line[i] === "}" && curlyBracketsOpen && curlyBracketCounter === 1 ){
          //   curlyBracketCounter = curlyBracketCounter - 1;
          //   curlyBracketsOpen = false;
          //   temp += line[i];
          //   uploadToken(temp,lineNo);
          //   temp ='';
          // }
          // else if (curlyBracketCounter>0 && curlyBracketsOpen && lineNo === data.length ){
          //   curlyBracketsOpen = false;
          //   temp+=line[i]
          //   uploadToken(temp,lineNo,"invalid token");
          //   temp=""
          // }
          // else if (curlyBracketsOpen && line[i] !== '}'){
          //   temp+=line[i];
          // }
          else if (line[i]+line[i+1]=="//" && !stringOpen){
            i=line.length-1
            }
            else if (line[i]+line[i+1]=="/*" && !stringOpen && !multiLineComment){
              multiLineComment = true;
            }
            else if (line[i]+line[i+1] !== '*/' && multiLineComment){
              temp+=line[i];
            }
            else if (line[i]+line[i+1]=== "*/" && multiLineComment){
              temp = "";
              multiLineComment = false;
              i++;
            }
            else if(operators.includes(line[i]+line[i+1]+line[i+2])){
              uploadToken(line[i]+line[i+1]+line[i+2],lineNo)
              i+=2
            }
          else if(operators.includes(line[i]+line[i+1])){
            uploadToken(line[i]+line[i+1],lineNo)
            i+=1
          }
      else{
        temp+=line[i]
         if(breaks.includes(line[i]) || breaks.includes(line[i+1])){
            uploadToken(temp,lineNo)
            temp=""
        }
        else if(i==line.length-1){
            uploadToken(temp,lineNo)
            temp=""
        } 
    }
    // }
}
})
// splits.forEach((data,i)=>{
//   if(splits[i+1]?.cp!="String"){
//     two=data?.vp+splits[i+1]?.vp
//     three=data?.vp+splits[i+1]?.vp+splits[i+2]?.vp
//     checkTwo=operators.includes(two)
//     checkThree=operators.includes(three)
//     if(checkThree){
//         data.vp=three
//         splits.splice(i+1,2)
//     }
//     else if(checkTwo){
//         data.vp=two
//         splits.splice(i+1,1)
//     }
//   }
// })
for(var i=0;i<splits.length;i++){
        if(splits[i].vp==" " && splits[i].cp!="String" || splits[i].vp=="\t"){
        splits.splice(i,1);
        i--
    }
}
splits.forEach((data,i)=>{
    if(data.vp=="." && splits[i+1]?.vp>=0 &&  data.lineNo==splits[i+1].lineNo){
        data.vp=data.vp+splits[i+1].vp
        splits.splice(i+1,1);
    }
})

splits.forEach((data,i)=>{
  if(data.vp?.includes('.') && data.vp>=0 && splits[i-1]?.vp>=0 && !splits[i-1]?.vp.includes('.') && data.lineNo==splits[i-1].lineNo ){
      splits[i-1].vp=splits[i-1]?.vp+data.vp
      splits.splice(i,1)
    }
})
splits.forEach((data,i)=>{
  if(data.vp=="." && splits[i-1]?.vp>=0 && !splits[i-1]?.vp.includes('.') && data.lineNo==splits[i-1].lineNo){
      data.vp=splits[i-1].vp+data.vp
      regexForFloat(data.cp)?data.cp="Number":data.cp="invalid Token"
      splits.splice(i-1,1);

  }
})


splits.forEach((data,i)=>{
    if(data.cp==""){
        if(compare(data,"true") || compare(data,"false") ) data.cp="boolean"
        else if(compare(data,"++")||compare(data,"--")) data.cp="inc_dec"
        else if(compare(data,"=")) data.cp="="
        else if(compare(data,"*")||compare(data,"/")||compare(data,"%")) data.cp="MDM"
        else if(compare(data,"+")||compare(data,"-")) data.cp="PM"
        else if(compare(data,"!")) data.cp="!"
        else if(compare(data,"<=")||compare(data,">=")||compare(data,"==")||compare(data,"!=")||compare(data,">")||compare(data,"<")||compare(data,"!==")||compare(data,"===")) data.cp ="ROP"
        else if(compare(data,"+=")||compare(data,"-=")||compare(data,"/=")||compare(data,"*=")||compare(data,"%=")) data.cp="CO"
        else if(compare(data,"||") || compare(data,"&&") ) data.cp="logical operator"
        else if(regexForFloat(data.vp)) data.cp="Float"
        else if(regexForInt(data.vp)) data.cp="Integer"
        else if(punctuators.includes(data.vp) || keywords.includes(data.vp) || dataTypes.includes(data.vp)) data.cp=data.vp
        else if(regexForId(data.vp)) data.cp="Id"
        else data.cp="invalid"

    }
})
splits.forEach((data,i)=>{
  if(data.cp=="PM" && splits[i+1].vp>=0 && (splits[i-1].cp=="="||splits[i-1].cp=="CO")){
    data.vp=data.vp+splits[i+1].vp
    if(regexForFloat(data.vp)){
      data.cp = "Float";
    }
    else if (regexForInt(data.vp)){
      data.cp = "Integer";
    }
    if(data.vp.includes("+")){
      data.vp=data.vp.slice(1,data.vp.length)
    }
    splits.splice(i+1,1)

  }
})

fs.writeFileSync('output.txt','')
splits.forEach(data=>{
    fs.appendFileSync('output.txt',JSON.stringify({vp:data.vp,cp:data.cp,lineNo:data.lineNo}))
    fs.appendFileSync('output.txt',"\n")
    fs.appendFileSync('output.txt',"\n")
    fs.appendFileSync('output.txt',"\n")
})
// fs.appendFileSync('output.txt',JSON.stringify({vp:"endMarker",cp:"endMarker",lineNo:data.length-1}))
console.log(splits);
console.log(wordSplitterArray)