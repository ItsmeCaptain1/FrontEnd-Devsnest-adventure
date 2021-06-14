function getHistory() {
  return document.getElementById("history-value").innerText;
}
function setHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function setOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else
    document.getElementById("output-value").innerText = getFormatedNumber(num);
}

function getFormatedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormate(num) {
  return Number(num.replace(/,/g, ""));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      setHistory("");
      setOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormate(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        setOutput(output);
      }
    } else {
      var history = getHistory();
      var output = getOutput();

      if (output == "" && history) {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }

      if (output || history) {
        output = output == "" ? output : reverseNumberFormate(output);
        history = history + output;
        if (this.id == "=") {
          var result = eval(history);
          setHistory("");
          setOutput(result);
        } else {
          history += this.id;
          setHistory(history);
          setOutput("");
        }
      }
    }
  });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormate(getOutput());
    if (output != NaN) {
      output = output + this.id;
      setOutput(output);
    }
  });
}
