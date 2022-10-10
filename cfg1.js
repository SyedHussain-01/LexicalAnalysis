var fs = require("fs");
const { resolve } = require("path/posix");
const data = fs.readFileSync("output.txt", { encoding: "utf-8" }).split("\n\n\n")
const tokens = data
.slice(0,data.length-1)
.map((data) => {
  return JSON.parse(data);
});
const tokens1=[...tokens,{cp:"$",vp:"$"}]
let regexForId=str=>/^([a-zA-Z\_\$][a-zA-Z0-9\\d\$\_]*)$/g.test(str)
let regexForInt=str=>/^([\+\-]?)[0-9]+$/g.test(str)
// console.log(tokens);
var sstComplete=false;
var i=0;
var cp=()=>tokens[i]?.cp;
var vp=()=>tokens[i]?.vp;
var checkIndex=()=>i<tokens.length;
let variableTable=[];
const checkVariable=(name)=>variableTable.filter(item=>item.name==name);
let functionTable=[];
const checkFunction=(name)=>functionTable.filter(item=>item.name==name);
let classTable=[];
const checkClass=(name)=>classTable.filter(item=>item.name==name);
let attribteTable=[];
const checkAttribute=(name,ClassName)=>attribteTable.filter(item=>item.name==name && item.ClassName==ClassName);
const insertAttribute=(name,type,ClassName)=>{
    checkAtt=checkAttribute(name,ClassName);
    console.log(checkAtt[0]?.type,name,type,ClassName);
    if(checkAtt[0]?.type=="function" && type=="variable"){
        attribteTable=attribteTable.filter(item=>item.name!=name && item.ClassName!=ClassName)
        attribteTable.push({name,type,ClassName})
    }
    else if(checkAtt.length<1){
        attribteTable.push({name,type,ClassName})
    }
}
const insertVariable=(name)=>{
    let checkVar=checkVariable(name);
    let checkFunc=checkFunction(name);
    let checkClss=checkClass(name);
    // if(checkClss.length>0){
    //     throw new Error(`${name} already declared as a class`).message
    // }
    if(checkVar.length<1){
        if(checkFunc.length>0){
            functionTable=functionTable.filter(item=>item.name!=name)
        }
        if(checkClss.length>0){
            // throw new Error(`${name} already declared as a class`).message
            classTable=classTable.filter(item=>item.name!=name)
        }
        variableTable.push({name})
    }
}
const insertFunction=(name)=>{
    let checkVar=checkVariable(name);
    let checkFunc=checkFunction(name);
    let checkClss=checkClass(name);
    if(checkClss.length>0){
        throw new Error(`${name} already declared as a class`).message
    }
    if(checkFunc.length<1){
        if(checkVar.length>0){
            variableTable=variableTable.filter(item=>item.name!=name)
            console.log(variableTable);
        }
        functionTable.push({name})
    }
}
const lookUpFunction=(name)=>{
    let checkFunc=checkFunction(name);
    if(checkFunc.length<1){
        throw new Error(`${name} is not defined`)
    }
}
const lookUpVariable=(name)=>{
    let checkVar=checkVariable(name);
    if(checkVar.length<1){
        throw new Error(`${name} is not defined`)
    }
}
const lookUpClass=(name)=>{
    console.log(name);
    let checkClss=checkClass(name);
    let checkVar=checkVariable(name);
    let checkFunc=checkFunction(name);
    console.log(checkFunc,checkVar,checkClss,"ssssssssssssssssssssss");
    if(checkFunc.length>0 || checkVar.length>0){
        throw new Error(`${name} is not a constructor`)
    }
    if(checkClss.length<1){
        throw new Error(`${name} is not defined................`)
    }

}
const insertClass=(name,parent)=>{
    let checkVar=checkVariable(name);
    let checkFunc=checkFunction(name);
    let checkClss=checkClass(name);
    let checkParent=parent!="none" ? checkClass(parent):false;
    //console.log(checkClss);
    if(checkClss.length>0){
        throw new Error(`${name} already declared as a class.`).message
    }
    else if(checkVar.length>0 || checkFunc.length>0){
        throw new Error(`Identifier ${name} already declared.`).message
    }
    if(checkParent.length<1){
        if(checkVariable(parent).length>0 || checkFunction(parent).length>0 ){
            throw new Error(`${parent} is not a constructor .................................................`).message
        }
        else{
            throw new Error(`${parent} is not defined ......................................................`).message
        }
    }
    else{
        classTable.push({name,parent})
    }
}


const functionCall=()=>{
    if(cp()=="call"){
        i++
        if(cp()=="Id"){
            i++
            if(cp()=="("){
                i++
                if(PL()){

                    i++
                    if(cp()==")"){
                        i++
                        if(opt1()){
                            i++
                            if(cp()===";"){
                                return true
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    return false
}
}
const assign=()=>{
    // console.log("assign shuru.....................//a/a/a/aa/a/a/a/a/a/",sstComplete);
    // if(functionCall()){
    //     // console.log("function call done",sstComplete);
    //     return true
    // }
    var res=i
    if(OE(res)){
        i++
        if(cp()==";"){
            // console.log("OE; done",sstComplete);
            return true
        }
    }
    i=res
    // if(inc_dec()){
    //     //console.log("inc se shuru assign me",cp());
    //     i++
    //     // //console.log("inc se shuru assign me",cp());
    //     if(F1()){
    //         //console.log("assign me f1 hogaya");
    //         i++
    //         if(cp()===";"){
    //             return true
    //         }
    //         else{
    //             sstComplete=false
    //             return false
    //         }
    //     }
    //     else{
    //         sstComplete=false
    //         return false
    //     }
    // }
    // if(cp()=="String" || cp()=="boolean",cp()=="Number"){
    //     i++
    //     if(cp()===";"){
    //         return true
    //     }
    //     else{
    //         sstComplete=false
    //         return false
    //     }
    // }
    // if(cp()=="!"){
    //     i++
    //     if(F()){
    //         i++
    //         if(cp()===";"){
    //             return true
    //         }
    //         else{
    //             sstComplete=false
    //             return false
    //         }
    //     }
    //     else{
    //         sstComplete=false
    //         return false
    //     }
    // }
    // if(cp()=="new"){
    //     //console.log("new assign me ");
    //     i++
    //     if(cp()=="Id"){
            // lookUpClass(vp())
    //         i++
    //         if(cp()=="("){
    //             i++
    //             if(PL()){
    //                 i++
    //                 if(cp()==")"){
    //                     i++
    //                     if(opt1()){
    //                         i++
    //                         if(F2()){
    //                             i++
    //                             if(cp()===";"){
    //                                 return true
    //                             }
    //                             else{
    //                                 sstComplete=false
    //                                 return false
    //                             }
    //                         }
    //                         else{
    //                             sstComplete=false
    //                             return false
    //                         }
    //                     }
    //                     else{
    //                         sstComplete=false
    //                         return false
    //                     }
    //                 }
    //                 else{
    //                     sstComplete=false
    //                     return false
    //                 }
    //             }
    //             else{
    //                 sstComplete=false
    //                 return false
    //             }
    //         }
    //         else{
    //             sstComplete=false
    //             return false
    //         }
    //     }
    //     else{
    //         sstComplete=false
    //         return false
    //     }
    // }
    if((cp()=="this" || cp()=="Id" )&& This()){
        console.log("this hogaya assign me",cp());
        let type=cp()=="."?"this":"none"
        i++
        if(cp()=="Id"){
            type!="this"?insertVariable(vp()):false
            // console.log("assifn me this. k baad ID",vp());
            i++
            if(opt()){
                i++
                if(assign1()){
                    //console.log("assign1 hogaya assign me.");
                    return true
                }
                else{
                    //console.log("assign1 nahi hua assign me");
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        // console.log("assign shuru nahi hua 1111111111",sstComplete);
        return false
    }
}
const assign2=()=>{
    // console.log("Assign1",variable);
    if(assign_op()){
        //console.log("assign op hogaya assign1 me");
        i++
        if(OE()){
            //console.log("assig1 me OE hoagyaaaaaaaaaaaaaaaaaaaaaa");
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(F2(variable,type)){
        i++
        if(cp()===";"){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    else {
        sstComplete=false
        return false
    }
}
const assign1=(variable,type)=>{
    // console.log("Assign1",variable);
    if(assign_op()){
        //console.log("assign op hogaya assign1 me");
        i++
        if(OE()){
            //console.log("assig1 me OE hoagyaaaaaaaaaaaaaaaaaaaaaa");
            i++
            if(cp()===";"){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(F2(variable,type)){
        i++
        if(cp()===";"){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    else {
        sstComplete=false
        return false
    }
}

const assign_op=()=>{
    if(cp()=="=" || cp()=="CO"){
        return true
    }
    else{
        return false
    }
}
const opt=()=>{
    // console.log("opt start ",cp());
    if(cp()=="."){
        //console.log("opt ka .",cp());
        i++
        if(cp()=="Id"){
            //console.log("opt ka .Id");
            i++
            if(opt()){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            // console.log("opt k id k sath . match nahi hua");
            // i=res
            sstComplete=false
            return false
        }
    }
    if(cp()=="["){
        // console.log("[[[[[[[[[[[[[[");
        i++
        if(OE()){
            i++
            // console.log("OEEEEEEEEEEEEEEEEE");
            if(cp()=="]"){
                i++
                if(arr1()){
                    i++
                    if(cp()=="."){
                        i++
                        if(cp()=="Id"){
                            i++
                            if(opt()){
                                return true
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="("){
        //console.log("opt ka (",cp());
        i++
        if(PL()){
            //console.log("opt ka (PL",cp());
           i++
           if(cp()==")"){
               i++
            //    console.log("opt ka (PL))))))))))))))))",cp());
               if(cp()=="."){
                    i++
                    if(cp()=="Id"){
                        i++
                        if(opt()){
                            return true
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
            else{
                 sstComplete=false
                 return false
             }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        // console.log("opt ka else true k sath",cp(),i);
        return true
    }
}
const arr=()=>{
    // console.log("arr");
    if(cp()=="["){
        // console.log("arr me [ hogaya",cp());
        i++
        if(OE()){
            // console.log("oe hogaya arr k [ me",cp());
            i++
            if(cp()=="]"){
                i++
                if(arr1()){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                // console.log("] match nahi hua arr me else hy");
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        return false
    }
}
const opt1=(N)=>{
    // console.log("opt1 me",cp(),sstComplete);
    if(cp()=="("){
        i++
        if(PL()){
            // console.log("pl",sstComplete);
            i++
            if(cp()==")"){
                i++
                if(opt2(N,"function")){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(opt1(N,"variable")){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(arr()){
        i++
        if(opt2()){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        N?lookUpVariable(N):false
        i--
        return true
    }
}
const opt2=(N,T)=>{
    console.log(N,T);
    T=="variable"?console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa"):false
    T=="function"?lookUpFunction(N):false
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(opt1()){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        console.log("T");
        i--
        return true
    }
}
const arr1=()=>{
    if(cp()=="["){
        i++
        if(OE()){
            i++
            if(cp()=="]"){
                i++
                if(arr1()){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const dec=()=>{
    //console.log("dec start")
    if(cp()=="var"){
        //console.log("dec k andar var",i,cp())
        i++
        if(cp()=="Id"){
            insertVariable(vp())
            //console.log("dec k andar var k andar Id",i,cp())
            i++
            if(init()){
                i++
                if(list()){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else return false
}
const init=()=>{
    if(cp()=="="){
         //console.log("init k andar =",i,cp())
        i++
        if(OE()){
            return true
        }
        else{
            return false
        }
    }
    else{
        i--
        return true
    }
}
const list=()=>{
    if(cp()==";"){
         //console.log("list k andar ;",i,cp())
        return true
    }
    if(cp()==","){
         //console.log("list k andar ,",i,cp())
        i++
        if(cp()=="Id"){
         //console.log("list k andar Id",i,cp())
            i++
            if(init()){
                i++
                if(list()){
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}
const inc_dec=()=>{
    if(cp()=="inc_dec")return true
    else {
       return false
    }
}
const This=()=>{
    if(cp()=="this"){
        i++
        if(cp()==".")return true
    }
    else{
        i--
        return true
    }
}
const OE=()=>{
    if(AE()){
        i++
        if(OE1()){
         //console.log("OE k OE1 me",cp(),i)
            return true
        }
    }
    else {
        // sstComplete=false
        return false
    }
}
const OE1=()=>{
    if(vp()=="||"){
        i++
        if(AE()){
            i++
            if(OE1()){
                return true
            }
        }
    }
    else{
        //console.log("return OE1 me",cp())
        i--
        return true
    }
}
const AE=()=>{
    if(RE()){
        i++
        if(AE1()){
            return true
        }
    }
    else{
        // console.log("AE ka elseeeeeeeeeeeeeee",sstComplete);
         return false
        }
}
const AE1=()=>{
    if(vp()=="&&"){
        i++
        if(RE()){
            i++
            if(AE1()){
                return true
            }
        }
    }
    else{
        //console.log("return AE1 me",cp())
        i--
        return true
    }
}
const RE=()=>{
    if(SE()){
        i++
        if(RE1()){
            return true
        }
        else return false
    }
    else return false
}
const RE1=()=>{
    if(cp()=="ROP"){
        i++
        if(SE()){
            i++
            if(RE1()){
                return true
            }
        }
    }
    else{
        //console.log("return RE1 me",cp())
        i--
        return true
    }
}
const SE=()=>{
    if(E()){
        i++
        if(SE1()){
            return true
        }
    }
    return false
}
const SE1=()=>{
    if(cp()=="SO"){
        i++
        if(E()){
            i++
            if(SE1()){
                return true
            }
            return false
        }
        return false
    }
    if(cp()=="="|| cp()=="CO"){
        return false
    }
    else{
        //console.log("return SE1 me",cp())
        i--
        return true
    }
}
const E=()=>{
    if(T()){
        //console.log("E k baad T",cp())
        i++
        if(E1()){
            //console.log(cp(),"jhh");
            return true
        }
    
    }
    else return false
}
const E1=()=>{
    if(cp()=="PM"){
        //console.log("E1 k andar PM",i)
        i++
        if(T()){
            i++
            if(E1())return true
        }
        else{
            // console.log("E1 nahi huaaaaaaaaaaaaaaaaa",sstComplete);
            return false
        }
    }
    else{
        // console.log("E1 ka else",cp())
        i--
        return true
    }
}
const T=()=>{
    // console.log("T ka start",vp());
    if(F()){
        // console.log("T k andar F hogaya",vp())/
        i++
        if(T1()){
            // console.log("t11111111111111111111",sstComplete);
            return true
        }
    }
    else {
        // console.log("T ka elseeeeeeeeeeeeeeeeeeeeeeeeeeeeee",sstComplete);
        return false
    }
}
const T1=()=>{
    if(cp()=="MDM"){
        //console.log("MDM");
        i++
        if(F()){
            // console.log("F hoagaa");
            i++
            if(T1()){
                return true
            }
        }
    }
    else{
        // console.log("T1 ka else",cp(),sstComplete)
        i--
        // console.log("T1 ka else",cp(),sstComplete)
        return true
    }
}
const F=()=>{
    // console.log("F ka start",cp(),sstComplete);
    if(cp()=="inc_dec"){
        // console.log("F k andar inc_dec",i,cp(),vp(),sstComplete)
        i++
        if(F1()){
            // console.log("F me f1 hogaya",vp());
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    // console.log("F me inc_dec nahi hua",sstComplete,cp());
    if(cp()=="new"){
        // console.log("new in F");
        i++
        if(cp()=="Id"){
            // console.log("new ID in F");
            lookUpClass(vp())
            i++
            if(cp()=="("){
        //console.log("new a( in F");
                i++
                if(PL()){
                    i++
        //console.log("new a(a in F next token is",cp());

                    if(cp()==")"){
        //console.log("new a() in F");
                        i++
                        if(opt1()){
                            i++
                            if(F2()){
                                return true
                            }
                            else {
                                sstComplete=false
                                return false 
                            }
                        }
                        else {
                            sstComplete=false
                            return false 
                        }
                    }
                    else{
                        sstComplete=false;
                        return false
                    }
                }
                else{
                    sstComplete=false;
                    return false
                }
            }
            else{
                sstComplete=false;
                return false
            }
        }
        else{
            sstComplete=false;
            return false
        }
    }
    //console.log("F me new nahi hua",sstComplete,cp());
    if(cp()=="Number" || cp()=="String" || cp()=="boolean") {
        //console.log("F k andar Number",i,cp())
        return true
    }
    //console.log("F me const nahi hua",sstComplete,cp());
    if(vp()=="!"){
        i++
        if(F())return true
    }
    if((cp()=="Id" ||cp()=="this") && This()){
        // console.log("1111111111111111111",vp());
        i++
        if(cp()=="Id"){
            N=vp()
           i++
           if(opt1(N)){
            //    console.log("F me opt hogaya//////////////////////////////////",cp(),sstComplete);
               i++
               if(F2()){
                //    console.log("F2 hogyaa",sstComplete);
                   return true
               }
               else{
                sstComplete=false
                return false
            }
           }
           else{
            sstComplete=false
            return false
        }
    }
    
    }
    else{
        // console.log("f ka else.........................",cp(),sstComplete);
        return false
    }
}
const F1=()=>{
    //console.log("F1 me",cp(),sstComplete);
    if(cp()=="new"){
        //console.log("new F1 me................................................",sstComplete);
        i++
        if(cp()=="Id"){
            //console.log("new Id f1 me",cp());
            lookUpClass(vp())
            i++
            if(cp()=="("){
            //console.log("new Id () f1 me",cp());
                i++
                if(PL()){
                    i++
                    if(cp()==")"){
                        i++
                        if(opt1()){
                            return true
                        }
                        else {
                            sstComplete=false
                            return false 
                        }
                    }
                    else {
                        sstComplete=false
                        return false 
                    }
                }
                else {
                    sstComplete=false
                    return false 
                }
            }
            else {
                sstComplete=false
                return false 
            }
        }
        else {
            sstComplete=false
            return false 
        }
    }
    if(This()){
        i++
        if(cp()=="Id"){
            if(tokens[i-1]?.cp!="."){
                // lookUpVariable(vp())
            }
            //console.log("this.id in f1");
            i++
            if(opt1()){
                // console.log("F1 me opt1",vp());
                return true
            }
            else {
                sstComplete=false
                return false 
            }
        }
        else {
            sstComplete=false
            return false 
        }
    }
    else {
        sstComplete=false
        return false 
    }
}
const F2=()=>{
    if(inc_dec()){
        // type!="this"?lookUpVariable(variable):false
        return true
    }
    else{
        i--
        return true
    }
}
const Z=()=>{
    if(cp()=="."){
        //console.log("z k andar .",i,cp())
        i++
        if(cp()=="Id"){
        //console.log("z k andar . k aagy id",i,vp())
            i++
            if(R1()){
                return true    
            }
            else{
                //console.log("z false hogaya   aaaaaaaaaaaaa");
                sstComplete=false
                 return false
                }
        }
        else{
            sstComplete=true
             return false
            }
    }
    if(cp()=="["){
        //console.log("z k andar [ match",cp(),i);
        i++
        if(OE()){
            //console.log("z k andar [ k nadar number",cp(),i)
            i++
            if(cp()=="]"){
                //console.log("z k andar [ ka close ]",cp(),i)
                i++
                //console.log(R1());
                if(R1()) return true
                else return false
                    
            }
            else return false
        }
        else return false
    }
    if(cp()=="("){
        //console.log("( matched 2")
        i++
        if(PL()){
            i++
            if(cp()==")"){
                i++
                //console.log(") matched 2")
                if(R2()){
                    return true
                }
                else return false
            }
            else return false
            
        }
        else return false
    }
    if(X1()) return true
    else {
        i--
        //console.log("Z ka return",cp());
         return true
        }
        
    
}
var X1=()=>{
    return false
}
const R1=()=>{
    if(cp()=="."){
        //console.log("R1 me .");
        i++
        if(cp()=="Id"){
            i++
            if(Z()){
                // //console.log("z yahan call hua")
                return true
            }
        }
    }
    if(cp()=="["){
        //console.log("R1 me [");
        i++
        //console.log(OE());
        if(OE()){
            //console.log("z k andar [ k nadar number")
            i++
            if(cp()=="]"){
                i++
                if(Z()) return true
            }
            else return false
        }
        else{
            return false
        }
    }
    if(cp()=="("){
        //console.log("( matched 3")
        i++
        if(PL()){
            i++
            if(cp()==")"){
                //console.log(") matched 3")
                i++
                    if(Z()){
                        return true
                    }
                    else return false
            }
            else return false
        }
        else return false
    }
    else{
        i--
        //console.log("R1 ka else",cp())
        return true
    }
}
const R2=()=>{
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(B()){
                return true
            }
        }
    }
    else{
        i--
        return true
    }
}
const B=()=>{
    if(Z2()){
        return true
    }
    if(Xd()){
        return true
    }
}
const Z2=()=>{
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(R1d()){
                return true
            }
        }
    }
    if(cp()=="["){
        i++
        if(cp()=="Number" || cp()=="Id"){
        //console.log("z k andar [ k nadar number")
            i++
            if(cp()=="]"){
        //console.log("z k andar [ ka close ]")
                i++
                if(cp()=="."){
        //console.log("z k andar [1] k baad .")
                    i++
                    if(cp()=="Id"){
                        if(R1d()) return true
                    }
                }
            }
        }
    }
    if(cp()=="("){
        //console.log("( matched 4")
        i++
        if(PL()){
            i++
            if(cp()==")"){
        //console.log(") matched 4")
                i++
                if(R1d()){
                    return true
                }
            }
        }
    }
    else{
        i--
        return true
    }


}
const R1d=()=>{
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(Z2()){
                return true
            }
        }
    }
}
const PL=()=>{
    //console.log("pl",cp(),sstComplete)
    if(OE()){
        // console.log("OE pl me 111111111111111111111111111111",sstComplete)
        i++
        if(PL1()){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    else 
    {
        i--
        // console.log("PL return ",cp(),sstComplete);
        return true
    }
    // else{
    //     //console.log("pl ka else with fals");
    //     return false
    // }

}
const PL1=()=>{
    if(cp()==","){
        //console.log("pl1 me ,");
        i++
        if(OE()){
            i++
            if(PL1()){
            return true
            }
        }
    }
    else{
        i--
        return true
    }
}
const param=()=>{
    if(cp()=="Id"){
        //console.log("param Id",cp());
        i++
        if(P1()){
            return true
        }
    }
    else{
        //console.log("param empty",cp(),i);
        i--
        return true
    }
}
const P1=()=>{
    if(cp()=="="){
        //console.log("id=");
        i++
        if(OE()){
            //console.log("id=OE");
            i++
            if(P2()){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
             sstComplete=false
             return false
            }
    }
    if(P2()){
        return true
    }
}
const P2=()=>{
    if(cp()==","){
        //console.log("id,");
        i++
        if(cp()=="Id"){
            //console.log("id=id");
            i++
            if(P1()){
                return true
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const IF_ELSE=()=>{
    if(cp()=="if"){
        //console.log("if");
        i++
        if(cp()=="("){
            //console.log("if(");
            i++
            if(OE()){
                //console.log("if(OE",cp(),i,vp());
                i++
                if(cp()==")"){
                    //console.log("if(OE)")
                    i++
                    if(body1()){
                        i++
                        if(ELSE_IF()){
                            return true
                        }
                    }
                    else {
                        sstComplete=false
                        return false
                    }

                }
            else {
                //console.log(") if ka not accpeted");
            sstComplete=false
            return false
        }
            }
        else {
            sstComplete=false
            return false
        }
        }
        else{
            sstComplete=false 
            return false
        }
    }
    else return false
}
const body=()=>{
    if(cp()=="{"){
        //console.log("body ka {",cp())
        i++
        if(MST()){
            //console.log("P{{{{{{{{{{",cp())
            return true
        }
    }
    return false
}
const body1=()=>{
    //console.log("body 1 started");
    if(cp()==";"){
        return true
    }
    if(SST()){
        return true
    }
    if(body()){
        i++
        if(cp()=="}"){
            //console.log("sssnsnsnsnsnsns1",cp())
            return true
        }
        else {
            sstComplete=false
            return false
        }
    }
    else{
        sstComplete=false
        return false
    }
}
const ELSE_IF=()=>{
    if(cp()=="else"){
        //console.log("else if ka else",cp())
        i++
        if(ELSE_IF1()){
        //console.log("else if ka else if1",cp())
            return true
        }
        else{
            sstComplete=false
             return false
            }
    }
    // else if(!sstComplete){
    //     // i--
    //     return false
    // }

    else{
        i--
        return true
    }
}
const ELSE_IF1=()=>{
    if(IF_ELSE()){
        //console.log("else if1 ka if else",cp())
        return true
    }
    if(body1()){
        //console.log("else if1 ki body",cp())
        return true
    }
    else return false
}
const SUPER=(extending)=>{
    console.log(extending,cp());
    if(cp()=="super"){
        i++
        if(cp()=="("){
            i++
            if(PL()){
                i++
                if(cp()==")"){
                    if(!extending){
                        throw new Error("Unexpected super call here")
                    }
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        if(extending){
            throw new Error("must call super within child class").message
        }
        return false
    }
}
const SST=()=>{
    //console.log("sst ka shuru check sst complete",cp(),sstComplete);
    if(sstComplete && SUPER()){
        return true
    }
    if(sstComplete && FOR()){
        return true
    }
    // console.log("sstttttttttttttttttttttttt after for",sstComplete);
    if(sstComplete && IF_ELSE()){
        // console.log("if done in sst");
        return true
    }
    // console.log("sstttttttttttttttttttttttt after Ifelse",sstComplete);
    if(sstComplete && DO_WHILE()){
        return true
    }
    // console.log("sstttttttttttttttttttttttt after do_while",sstComplete);

    if(sstComplete && WHILE()){
        //console.log("while done in sst");
        return true
    }
    // console.log("sstttttttttttttttttttttttt after while",sstComplete);
    if(sstComplete && dec()){
        console.log("dec done in sst",vp());
        return true
    }
    // console.log("sstttttttttttttttttttttttt after dec",sstComplete);
    if(sstComplete && CLASS()){
        //console.log("class done in sst",sstComplete);
        return true
    }
    // console.log("sstttttttttttttttttttttttt after class",sstComplete);
    if(sstComplete && FUNCTION()){
        // console.log("fucntion done in sst",sstComplete);
        return true
    }
    // console.log("sstttttttttttttttttttttttt after function",sstComplete);
    if(sstComplete && assign()){
        // console.log("asign hogaya sst me ......................................................");
        sstComplete=true
        return true
    }
    // console.log("sstttttttttttttttttttttttt after assign",sstComplete);

    // console.log("sstttttttttttttttttttttttt after Ifelse",sstComplete);

    // if(sstComplete && /)
    if(sstComplete &&CONTINUE()){
        return true
    }
    if(sstComplete && BREAK()){
        return true
    }
    if(sstComplete && Return()){
        return true
    }

    if(sstComplete && SWITCH()){
        console.log("switch hogaya");
        return true
    }
    else{
        // console.log("sst ka else",cp(),sstComplete);
        return false
    }
}
const BREAK=()=>{
    if(cp()=="break"){
        i++
        console.log("break",vp());
        if(cp()==";"){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    return false
}
const CONTINUE=()=>{
    if(cp()=="continue"){
        i++
        if(cp()==";"){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    return false
}

const SWITCH=()=>{
    if(cp()=="switch"){
        i++
        if(cp()=="("){
            i++
            if(OE()){
                i++
                if(cp()==")"){
                    i++
                    if(switch_body()){
                        return true
                    }
                    else{ 
                        sstComplete=false
                        return false
                    }
                }
                else{ 
                    sstComplete=false
                    return false
                }
            }
            else{ 
                sstComplete=false
                return false
            }
        }
        else{ 
            sstComplete=false
            return false
        }
    }
}
const switch_body=()=>{
    if(cp()=="{"){
        i++
        if(cases()){
            i++
            if(DEFAULT()){
                i++
                if(cp()=="}"){
                    return true
                }
                else{ 
                    sstComplete=false
                    return false
                }
            }
            else{ 
                sstComplete=false
                return false
            }
        }
        else{ 
            sstComplete=false
            return false
        }
    }
    return false
}
const cases=()=>{
    if(cp()=="case"){
        i++
        if(OE()){
            i++
            if(cp()==":"){
                i++
                if(MST()){
                    i++
                    if(cases()){
                        return true
                    }
                    else{ 
                        sstComplete=false
                        return false
                    }
                }
                else{ 
                    sstComplete=false
                    return false
                }
            }
            else{ 
                sstComplete=false
                return false
            }
        }
        else{ 
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const DEFAULT=()=>{
    if(cp()=="default"){
        i++
        if(cp()==":"){
            i++
            if(MST()){
                return true
            }
            else{ 
                sstComplete=false
                return false
            }
        }
        else{ 
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const MST=()=>{
    //console.log("mst start ",cp());
    sstComplete=true
    if(SST()){
        //console.log("mst me sst hogaya",cp(),i);
        i++
        if(MST()){
            //console.log("mst doneeeeeeeeeeeee",sstComplete);
            return true
        }
    }
    else if(!sstComplete){
       //console.log("mst ka else with sst not completed",cp(),sstComplete);
       return false
   }
   else{
       //console.log("mst ka else sst hogaya");
       i--
       return true
   }
    
}
const K=()=>{
    if(Z()){
        return true
    }
    if(cp()=="="){
        i++
        if(OE()){
            return true
        }
    }
}
const WHILE=()=>{
    if(cp()=="while"){
        //console.log('while')
        i++
        if(cp()=="("){
        //console.log('while(')
            i++
            if(OE()){
        //console.log('while(OE')
                i++
                if(cp()==")"){
                //console.log("while(OE)")
                    i++
                    if(body1()){
                        //console.log("body1 in while");
                        return true
                    }
                    else{
                         sstComplete=false
                         return false
                    }
                }
                else{
                    sstComplete=false
                    return false
               }
            }
            else{
                sstComplete=false
                return false
           }
        }
        else{ 
            sstComplete=false
            return false
        }
        
    }
    else{
        return false
   }
}
const DO_WHILE=()=>{
    if(cp()=="do"){
        //console.log("do");
        i++
        if(body1()){
            //console.log("do{}",cp());
            i++
            if(cp()=="while"){
                //console.log("do{}while",cp());
                i++
            if(cp()=="("){
                //console.log("do{}while(");
                i++
                if(OE()){
                    //console.log("do{}while(a");
                    i++
                    if(cp()==")"){
                        //console.log("do{}while(a)");
                        return true
                    }
                    else{
                        sstComplete=false
                        return false
                   }
                }
                else{
                    sstComplete=false
                    return false
               }
            }
            else{
                sstComplete=false
                return false
           }
        }
        else{
            sstComplete=false
            return false
       }
    }
    else{
        sstComplete=false
        return false
    }
    }
    else{
        return false
   }
}
const FUNCTION=()=>{
    if(cp()=="function"){
        // console.log("function");
        i++
        if(cp()=="Id"){
            insertFunction(vp())
            //console.log("function a");
            i++
            if(cp()=="("){
                //console.log("function a(");
                i++
                if(param()){
                    //console.log("function a(a,b",cp(),i);
                    i++
                    if(cp()==")"){
                        //console.log("function a(a,b)",cp(),i);
                        i++
                        if(cp()=="{"){
                            // console.log("function a(a,b){");
                            i++
                            if(MST()){
                            // console.log("function a(a,b){");
                                i++
                                if(cp()=="}"){
                                    // console.log("function a(a,b){}");
                                    return true
                                }
                                else sstComplete=false
                            }
                            else sstComplete=false
                        }
                        else sstComplete=false
                    }
                    else sstComplete=false
            }
            else sstComplete=false
        }
        else sstComplete=false
    }
    else sstComplete=false
}
else{
    return false
}
}
const c1=()=>{
    if(cp()==";"){
        //console.log(cp(),";;;;;;;;;;;;;;;;;");
        return true
    }
    if(dec()){
        return true
    }
    if(assign()){
        return true
    }
    return false
}
const c2=()=>{
    if(OE()){
        return true
    }
    else{
        i--
        return true
    }
}
const c3=()=>{
    var res=i
    if(OE()){
        return true
    }
    i=res
    if((cp()=="this" || cp()=="Id" )&& This()){
        // console.log("this hogaya assign me",cp());
        let type=cp()=="."?"this":"none"
        i++
        if(cp()=="Id"){
            insertVariable(vp())
            // console.log("assifn me this. k baad ID");
            i++
            if(opt()){
                i++
                if(assign2()){
                    //console.log("assign1 hogaya assign me.");
                    return true
                }
                else{
                    //console.log("assign1 nahi hua assign me");
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
// const c3=()=>{
//     if(inc_dec()){
//         i++
//         if(F1()){
//            return true
//         }
//         else{
//             sstComplete=false
//             return false
//         }
//     }
//     if(cp()=="String" || cp()=="boolean",cp()=="Number"){
//         return true
//     }
//     if(cp()=="!"){
//         i++
//         if(F()){
//             return true
//         }
//         else{
//             sstComplete=false
//             return false
//         }
//     }
//     if(cp()=="new"){
//         i++
//         if(cp()=="Id"){
//             i++
//             if(cp()=="("){
//                 i++
//                 if(PL()){
//                     i++
//                     if(cp()==")"){
//                         i++
//                         if(opt()){
//                             i++
//                             if(F2()){
//                                 return true
//                             }
//                             else{
//                                 sstComplete=false
//                                 return false
//                             }
//                         }
//                         else{
//                             sstComplete=false
//                             return false
//                         }
//                     }
//                     else{
//                         sstComplete=false
//                         return false
//                     }
//                 }
//                 else{
//                     sstComplete=false
//                     return false
//                 }
//             }
//             else{
//                 sstComplete=false
//                 return false
//             }
//         }
//         else{
//             sstComplete=false
//             return false
//         }
//     }
//     if((cp()=="this" || cp()=="Id" )&& This()){
//         //console.log("this hogaya assign me");
//         i++
//         if(cp()=="Id"){
//             //console.log("assifn me this. k baad ID");
//             i++
//             if(opt()){
//                 //console.log("opt hogaya assign me");
//                 i++
//                 if(assign_op()){
//                     i++
//                     if(OE()){
//                         return false
//                     }
//                     else{
//                         //console.log("assign1 nahi hua assign me");
//                         sstComplete=false
//                         return false
//                     }
//                 }
//                 if(F2()){
//                     return true
//                 }
//                 else{
//                     //console.log("assign1 nahi hua assign me");
//                     sstComplete=false
//                     return false
//                 }
//             }
//             else{
//                 sstComplete=false
//                 return false
//             }
//         }
//         else{
//             sstComplete=false
//             return false
//         }
//     }
//     else{
//         i--
//         return true
//     }
// }
const FOR=()=>{
    if(cp()=="for"){
        //console.log("for",cp(),i);
        i++
        if(cp()=="("){
            //console.log("for(",cp());
            i++
            if(c1()){
                //console.log("for(var a=10;)",cp());
                i++
                if(c2()){
                    //console.log("for(a=10;a<10)",cp());
                    i++
                    if(cp()==";"){
                        //console.log("for(a=10;a<10;)",cp());
                        i++
                        if(c3()){
                            //console.log("for(a=10;a<10;a++",cp());
                            i++
                            if(cp()==")"){
                                //console.log("for(a=10;a<10;a++)",cp());
                                i++
                                if(body1()){
                                   return true
                                }
                                else{
                                    sstComplete=false
                                    return false
                                }
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        return false
    }
}
const CLASS=()=>{
    // console.log("class me enter");
    if(cp()=="class"){
        // console.log("class",cp());
        i++
        if(cp()=="Id"){
            let child=vp()
            i++
            if(Extend(child)){

                //console.log("class entends id",cp());
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            //console.log("class ki id match nahi hi",cp(),sstComplete);
            return false
        }
    }
    return false
}
const Extend=(child)=>{
    // console.log("extends me agye", cp(),child);
    if(cp()=="extends"){
        i++
        // console.log("extends matched hone k baad ",cp());
        if(cp()=="Id"){
            // console.log("extend d");
            insertClass(child,vp())
            i++
            if(Class_Body(true,child)){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            // console.log("Id may");
            sstComplete=false
            return false
        }
    }
    else{
        insertClass(child,"none")
        //console.log("extend else return true");
        if(Class_Body(false,child)){
            return true
        }
    }
}
const Class_Body=(extending,ClassName)=>{
    // console.log("class body me enter",cp(),extending,ClassName);
    if(cp()=="{"){
        // console.log("class body ka {",cp());
        i++
        if(Statement(ClassName)){
            i++
            if(Constructor(extending)){
                i++
                if(Statement(ClassName)){
                    i++
                    if(cp()=="}"){
                        return true
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        sstComplete=false
        return false
    }
}
const Statement=(ClassName)=>{
    if(cp()==";"){
        return true
    }
    if(cp()=="Id"){
        // console.log("class body k statement me id",cp());
        Name=vp()
        i++
        if(Statement1(Name,ClassName)){
            return true
        }
        else{
            sstComplete=false
            return false
        }        
    }
    else{
        i--
        return true
    }
}
const Statement1=(Name,ClassName)=>{
    // console.log("statment1 me agye",cp(),ClassName);
    if(cp()=="("){
        i++
        if(param()){
            i++
            if(cp()==")"){
                insertAttribute(Name,"function",ClassName)
                i++
                if(cp()=="{"){
                    i++
                    if(MST()){
                        i++
                        if(cp()=="}"){
                            i++
                            if(Statement(ClassName)){
                                return true
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="="){
        insertAttribute(Name,"variable",ClassName)
        i++
        if(OE()){
            i++
            if(cp()==";"){
                i++
                if(Statement(ClassName)){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()==";"){
        return true
    }
    else{
        i--
        return true
    }
}
const Constructor=(extending)=>{
    if(cp()=="constructor"){
        i++
        if(cp()=="("){
            i++
            if(param()){
                i++
                if(cp()==")"){
                    i++
                    if(cp()=="{"){
                        i++
                        // console.log("extending...............................................",extending,cp());
                        if(SUPER(extending)){
                        // console.log("extending...............................................",extending);
                            i++
                            if(MST()){
                                i++
                                if(cp()=="}"){
                                return true
                            }
                            else{
                                sstComplete=false
                                return false
                        }
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                        }
                        if(MST()){
                        // console.log("extending...............................................",extending,cp());
                            i++
                            if(cp()=="}"){
                            return true
                        }
                        else{
                            sstComplete=false
                            return false
                            }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const Return=()=>{
    if(cp()=="return"){
        i++
        if(OE()){
            i++
            if(cp()==";"){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        return false
    }
}
const MAIN=()=>{
    if(cp()=="MAIN"){
        //console.log("main",cp());
        i++
        if(cp()=="("){
            //console.log("main (",cp());
            i++
            if(cp()==")"){
                //console.log("main ()",cp());
                i++
                if(cp()=="{"){
                    //console.log("main (){",cp());
                    i++
                    //console.log("jeje");
                    if(MST()){
                        i++
                        if(cp()=="}"){
                            return true
                        }
                        else return false
                    }
                    else return false
                }
                else return false
            }
            else return false
        }
        else return false
    }
    else return false
}
if(MAIN()){
    // console.log(tokens1[i]);
    if(tokens1[i+1].cp!="$"){
        console.log(`syntax error at line ${tokens[i+1]?.lineNo}`)
    }
    else{
        console.log("Syntax is correct");
    }
}
else{
    console.log(`syntax error at line ${tokens[i-1]?.lineNo ?tokens[i-1]?.lineNo:1}  ${cp()+"="+vp() ,i}`);
}

console.log("class",classTable,"function",functionTable,"variable",variableTable,"attribute Table",attribteTable);