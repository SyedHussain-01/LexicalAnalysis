var fs = require("fs");
const data = fs.readFileSync("output.txt", { encoding: "utf-8" }).split("\n");
const tokens = data.slice(0, data.length - 1).map((data) => {
  return JSON.parse(data);
});
var ssForBody = [";", "{", "}"];
var ssForBody1 = [
  ";",
  "{",
  "}",
  "++",
  "--",
  "while",
  "do",
  "if",
  "for",
  "function",
  "this.",
  "var",
  "const",
  "let",
  "switch",
  "return",
  "else",
];
var ssForSST = [
  "++",
  "--",
  "while",
  "do",
  "if",
  "for",
  "function",
  "this.",
  "var",
  "const",
  "let",
  "switch",
  "return",
  "else",
];
var ssForMST = [
  "++",
  "--",
  "while",
  "do",
  "if",
  "for",
  "function",
  "this.",
  "var",
  "const",
  "let",
  "switch",
  "return",
];
var ssForWhile = [
  "++",
  "--",
  "while",
  "do",
  "if",
  "for",
  "function",
  "this.",
  "var",
  "const",
  "let",
  "return",
];
//  RT()  NAM() fn_kw() array remain
var ssForP = ["var", "let", "const"];
var i = 0;
// const start = () => {
  function isID() {
    if (tokens[i].classpart == "Id") return true;
    else return false;
  }
  const DT = () => {
    if (tokens[i].classpart == "var") {
      return true;
    }
    if (tokens[i].classpart == "let") {
      return true;
    }
    if (tokens[i].classpart == "const") {
      return true;
    }
    return false;
  };

  const constant = () => {
    if (tokens[i].classpart == "Nuumber") {
      return true;
    }
    if (tokens[i].classpart == "String") {
      return true;
    }
    if (tokens[i].classpart == "bool") {
      return true;
    }
    return false;
  };
  const Class = () => {
    if (tokens[i].classpart == "class") {
      i++;
      if (tokens[i].classpart == "Id") {
        i++;
        if (extendss()) {
          i++;
          if (classBody()) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const extendss = () => {
    if (tokens[i].classpart == "extends") {
      i++;
      if (tokens[i].classpart == "Id") {
        return true;
      }
    }
  };
  const classBody = () => {
    if (tokens[i].classpart == "{") {
      i++;
      if (constructor()) {
        i++;
        if (MST()) {
          i++;
          if (tokens[i].classpart == "}") {
            return true;
          }
        }
      }
    }
  };
  const assign_op = () => {
    if (tokens[i].classpart == "=") {
      return true;
    }
    if (compound_assignment()) {
      return true;
    }
    return false;
  };

  const assign_st = () => {
    if (tokens[i].classpart == "Id") {
      i++;
      if (opt()) {
        i++;
        if (assign_op()) {
          i++;
          if (exp()) {
            return true;
          }
        }
      }
    }

    return false;
  };
  const switch_st = () => {
    if (tokens[i].classpart == "switch") {
      i++;
      if (tokens[i].classpart == "(") {
        index++;
        if (exp()) {
          i++;
          if (tokens[i].classpart == ")") {
            i++;
            if (tokens[i].classpart == "{") {
              i++;
              if (switch_opt()) {
                i++;
                if (tokens[i].classpart == "}") {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  };

  const switch_opt = () => {
    if (switch_opt2()) {
      i++;
      if (tokens[i].classpart == "default") {
        index++;
        if (tokens[i].classpart == ":") {
          i++;
          if (MST()) {
            return true;
          }
        }
      }
    }

    if (tokens[i].classpart == "default") {
      i++;
      if (tokens[i].classpart == ":") {
        i++;
        if (MST()) {
          return true;
        }
      }
    }

    return false;
  };
  const switch_opt2 = () => {
    if (tokens[i].classpart == "case") {
      i++;
      if (switch_const()) {
        i++;
        if (tokens[i].classpart == ":") {
          i++;
          if (MST()) {
            i++;
            if (switch_opt2()) {
              i++;
              if (switch_opt()) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };

  const switch_opt3 = () => {
    if (switch_opt2()) {
      i++;
      if (switch_opt3()) {
        return true;
      }
    }
    if (tokens[i].classpart == "default" || tokens[i].classpart == "case") {
      index--;
      return true;
    }
    return false;
  };

  const switch_opt4 = () => {
    if (tokens[i].classpart == "case") {
      i--;
      return true;
    }
    if (tokens[i].classpart == "break") {
      return true;
    }
    return false;
  };
  const MST = () => {
    if (SST()) {
      i++;
      if (MST()) {
        return true;
      }
    }
    // if(tokens[i].classpart=="}" || tokens[i].classpart=="break" || tokens[i].classpart=="case"|| tokens[i].classpart=="return")
    // {
    //     i--;
    //     return true;
    // }
    return false;
  };
  const dec = () => {
    if (DT()) {
        console.log("check dt in dec",i)
        i++;
      if (tokens[i].classpart == "Id") {
        console.log("check dt in dec",i)
        i++;
        if (init()) {
          i++;
          if (list()) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const init = () => {
    if (tokens[i].classpart == "=") {
        console.log("check = in init",i)
      i++;
      if (OE()) {
        console.log("check OE in init",i)
        i++;
        if (init()) {
        console.log("check list in init",i)
          return true;
        }
      }
    }
    if (tokens[i].classpart == "Id") {
      return true;
    }
    if (tokens[i].classpart == ";") {
      i--;
      return true;
    }
    return false;
  };

  const list = () => {
    if (tokens[i].classpart == ",") {
      i++;
      if (tokens[i].classpart == "Id") {
        i++;
        if (init()) {
          return true;
        }
      }
    }
    if (tokens[i].classpart == ";") {
      return true;
    }
    return false;
  };
  // console.log(dec())
  const compound_assignment = () => {
    if (tokens[i].classpart == "assignment operators") {
      return true;
    }
    if (tokens[i].classpart == "assignment operators") {
      return true;
    }
    if (tokens[i].classpart == "assignment operators") {
      return true;
    }
    if (tokens[i].classpart == "assignment operators") {
      return true;
    }
    return false;
  };
  const do_while = () => {
    if (tokens[i].classpart == "do") {
      i++;
      if (tokens[i].classpart == "{") {
        i++;
        if (MST()) {
          i++;
          if (tokens[i].classpart == "}") {
            i++;
            if (tokens[i].classpart == "while") {
              i++;
              if (tokens[i].classpart == "(") {
                i++;
                if (exp()) {
                  i++;
                  if (tokens[i].classpart == ")") {
                    i++;
                    if (tokens[i].classpart == ";") {
                      return true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  };
  const SST = () => {
    if (
      dec() ||
      do_while() ||
      count_st() ||
      assign_st() ||
      switch_st() ||
      if_else() ||
      obj_def() ||
      arr() ||
      fn_call() 
    //   ||  inc_dec_st()
    ) {
      return true;
    }
    return false;
  };
  const switch_const = () => {
    if (
      tokens[i].classpart == "bool" ||
      tokens[i].classpart == "Number" ||
      tokens[i].classpart == "String" ||
      exp()
    ) {
      return true;
    }
    return false;
  };
  const arr = () => {
    if (isID()) {
      i++;
      if (tokens[i].classpart == "=") {
        i++;
        if (arr2()) {
          return true;
        }
      }
    }
    return false;
  };
  const arr2 = () => {
    if (tokens[i].classpart == "[") {
      if (elems()) {
        i++;
        if (tokens[i].classpart == "]") {
          return true;
        }
      }
    }
    return false;
  };
  const elems = () => {};
  const if_else = () => {
    if (tokens[i].classpart == "if") {
      i++;
      if (tokens[i].classpart == "(") {
        i++;
        if (exp()) {
          i++;
          if (tokens[i].classpart == ")") {
            i++;
            if (body()) {
              i++;
              if (else_st()) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };
  const else_st = () => {
    if (tokens[i].classpart == "else") {
      i++;
      if (body()) {
        return true;
      }
    }

    return false;
  };
  const body = () => {
    if (tokens[i].classpart == "{") {
      i++;
      if (MST()) {
        i++;
        if (tokens[i].classpart == "}") {
          return true;
        }
      }
    }

    if (tokens[i].classpart == ";" || SST()) {
      return true;
    }
    return false;
  };
  const obj_def = () => {
    if (ssForP.includes(tokens[i].valuepart)) {
      i++;
      if (tokens[i].classpart == "ID") {
        i++;
        if (tokens[i].classpart == "=") {
          i++;
          if (tokens[i].classpart == "new") {
            i++;
            if (tokens[i].classpart == "ID") {
              i++;
              if (tokens[i].classpart == "(") {
                i++;
                if (tokens[i].classpart == ")") {
                  i++;
                  if (tokens[i].classpart == ";") {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  };
  const func_def = () => {
    if (tokens[i].classpart == "function") {
      i++;
      if (tokens[i].classpart == "Id") {
        i++;
        if (tokens[i].classpart == "(") {
          i++;
          if (para()) {
            i++;
            if (tokens[i].classpart == ")") {
              if (tokens[i].classpart == "{") {
                i++;
                if (MST()) {
                  i++;
                  if (ret()) {
                    i++;
                    if (tokens[i].classpart == "}") {
                      i++;
                      if (func_def()) {
                        return true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const ret = () => {
    if (tokens[i].classpart == "return") {
      i++;
      if (exp()) {
        return true;
      }
    }
    return false;
  };

  const para = () => {
    if (para2()) {
      i++;
      if (tokens[i].classpart == "ID") {
        i++;
        if (para4()) {
          i++;
          if (para3()) {
            i++;
            if (para()) {
              return true;
            }
          }
        }
      }

      return true;
    }
    if (tokens[i].classpart == ")") {
      return true;
    }
    return false;
  };

  const para2 = () => {
    if (DT()) {
      return true;
    }
    return false;
  };

  const para3 = () => {
    if (DT() || tokens[i].classpart == "," || This()) {
      return true;
    }
    return false;
  };

  const para4 = () => {
    if (tokens[i].classpart == "[") {
      i++;
      if (tokens[i].classpart == "ID") {
        i++;
        if (tokens[i].classpart == "]") {
          return true;
        }
      }
    }
    if (DT() || tokens[i].classpart == "," || This()) {
      return true;
    }
    return false;
  };

  const obj_ref = () => {
    if (tokens[i].classpart == "ID") {
      i++;
      if (tokens[i].classpart == ".") {
        i++;
        if (tokens[i].classpart == "ID") {
          i++;
          if (tokens[i].classpart == "(") {
            i++;
            if (args()) {
              i++;
              if (tokens[i].classpart == ")") {
                i++;
                if (tokens[i].classpart == ";") {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  };
  const fn_call = () => {
    if (tokens[i].classpart == "Id") {
      i++;
      if (tokens[i].classpart == "(") {
        i++;
        if (args()) {
          i++;
          if (tokens[i].classpart == ")") {
            i++;
            if (tokens[i].classpart == ";") {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  const args = () => {
    if (exp() || tokens[i].classpart == ")") {
      return true;
    }
    return false;
  };
  const exp = () => {
    if (OE()) {
      i++;
      if (exp1()) {
        return true;
      }
    }
    return false;
  };
  const exp1 = () => {
    if (tokens[i].valuepart == "%") {
      i++;
      if (OE()) {
        i++;
        if (exp1()) {
          return true;
        }
      }
    }
    if (
      F() ||
      tokens[i].classpart == "," ||
      tokens[i].classpart == ";" ||
      tokens[i].classpart == ")"
    ) {
      return true;
    }
    return false;
  };
  const OE = () => {
    if (AE()) {
      i++;
      if (OE1()) {
        return true;
      }
    }
    return false;
  };
  const OE1 = () => {
    if (tokens[i].valuepart == "||") {
      i++;
      if (AE()) {
        i++;
        if (OE1()) {
          return true;
        }
      }
    }
    if (
      F() ||
      tokens[i].classpart == "," ||
      tokens[i].classpart == ";" ||
      tokens[i].classpart == ")" ||
      tokens[i].valuepart == "%"
    ) {
      return true;
    }
    return false;
  };
  const AE = () => {
    if (RE()) {
      i++;
      if (AE1()) {
        return true;
      }
    }
    return false;
  };
  const AE1 = () => {
    if (tokens[i].valuepart == "&&") {
      i++;
      if (RE()) {
        i++;
        if (AE1()) {
          return true;
        }
      }
    }
    if (
      F() ||
      tokens[i].classpart == "," ||
      tokens[i].classpart == ";" ||
      tokens[i].classpart == ")" ||
      tokens[i].valuepart == "%" ||
      tokens[i].valuepart == "||"
    ) {
      return true;
    }
    return false;
  };
  const RE = () => {
    if (E()) {
      i++;
      if (RE1()) {
        return true;
      }
    }
    return false;
  };
  const RE1 = () => {
    if (isRO()) {
      i++;
      if (E()) {
        i++;
        if (RE1()) {
          return true;
        }
      }
    }
    if (
      F() ||
      tokens[i].classpart == "," ||
      tokens[i].classpart == ";" ||
      tokens[i].classpart == ")" ||
      tokens[i].valuepart == "%" ||
      tokens[i].valuepart == "||" ||
      tokens[i].valuepart == "&&"
    ) {
      return true;
    }
    return false;
  };
  const E = () => {
    if (T()) {
      index++;
      if (E1()) {
        return true;
      }
    }
    return false;
  };
  const E1 = () => {
    if (PM()) {
      i++;
      if (T()) {
        i++;
        if (E1()) {
          return true;
        }
      }
    }
    if (
      F() ||
      tokens[i].classpart == "," ||
      tokens[i].classpart == ";" ||
      tokens[i].classpart == ")" ||
      tokens[i].valuepart == "%" ||
      tokens[i].valuepart == "||" ||
      tokens[i].valuepart == "&&" ||
      isRO()
    ) {
      return true;
    }
    return false;
  };

  const T = () => {
    if (F()) {
      i++;
      if (T1()) {
        return true;
      }
    }
    return false;
  };
  const T1 = () => {
    if (MDM()) {
      i++;
      if (F()) {
        i++;
        if (T1()) {
          return true;
        }
      }
    }
    if (
      F() ||
      tokens[i].classpart == "," ||
      tokens[i].classpart == ";" ||
      tokens[i].classpart == ")" ||
      tokens[i].valuepart == "%" ||
      tokens[i].valuepart == "||" ||
      tokens[i].valuepart == "&&" ||
      isRO() ||
      PM()
    ) {
      return true;
    }
    return false;
  };

  const F = () => {
    if (
      fn_call() ||
      tokens[i].classpart == "ID" ||
      arr() ||
    //   inc_dec_st() ||
      constant() ||
      obj_ref()
    ) {
      return true;
    }
    if (tokens[i].classpart == "(") {
      i++;
      if (exp()) {
        i++;
        if (tokens[i].classpart == ")") {
          return true;
        }
      }
    }
    if (tokens[i].classpart == "!") {
      i++;
      if (F()) {
        return true;
      }
    }

    return false;
  };
  const PM = () => {
    if (tokens[i].classpart == "PM") {
      return true;
    }
    return false;
  };
  const MDM = () => {
    if (tokens[i].classpart == "MDM") {
      return true;
    }
    return false;
  };
  const isRO = () => {
    if (tokens[i].classpart == "relational operator") {
      return true;
    }
    return false;
  };
  const This = () => {
    if (tokens[i].classpart == "this") {
      i++;
      if (tokens[i].classpart == ".") {
        return true;
      }
    }
    return false;
  };
console.log(dec())
