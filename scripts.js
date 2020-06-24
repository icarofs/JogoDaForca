//#region constantes
const words = ["ICARO", "RAMON", "HUMBERTO", "MERCEDES", "GRANBERY"];
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
//#endregion

//#region variáveis globais
let sort, sortCharArr;
let chances = 6;
//#endregion

//#region functions
sortear = () => {
  let sort_num = Math.floor(Math.random() * words.length);
  return words[sort_num];
};

changeDisplay = (obj, mustShow) => {
  if (mustShow == true) {
    obj.style.display = "block";
  } else {
    obj.style.display = "none";
  }
};

changeBtn = (btn, hit, clickable) => {
  if (hit == true) {
    if (btn.hasAttribute("class")) {
      btn.removeAttribute("class");
    }
    btn.setAttribute("class", "btn_acerto");
  } else {
    if (btn.hasAttribute("class")) {
      btn.removeAttribute("class");
    }
    btn.setAttribute("class", "btn_erro");
  }

  if (clickable == true) {
    btn.style.pointerEvents = "visible";
  } else {
    btn.style.pointerEvents = "none";
  }
};

removeAccent = (letter) => {
  if (letter.toUpperCase() == "Ç") {
    return "C";
  }
  if (
    letter.toUpperCase() == "Ã" ||
    letter.toUpperCase() == "Á" ||
    letter.toUpperCase() == "Â" ||
    letter.toUpperCase() == "À"
  ) {
    return "A";
  }
  if (letter.toUpperCase() == "É" || letter.toUpperCase() == "Ê") {
    return "E";
  }
  if (letter.toUpperCase() == "Í") {
    return "I";
  }
  if (
    letter.toUpperCase() == "Õ" ||
    letter.toUpperCase() == "Ô" ||
    letter.toUpperCase() == "Ó"
  ) {
    return "O";
  }
  if (letter.toUpperCase() == "Ú") {
    return "U";
  }
  return letter;
};

decreaseChances = () => {
  chances--;
  let lblChances = document.getElementById("lblChances2");
  lblChances.innerText = chances;

  if (chances == 5) {
    let parte = document.getElementById("corpo");
    parte.style.display = "inline";
  } else if (chances == 4) {
    let parte = document.getElementById("braco_dir");
    parte.style.display = "inline";
  } else if (chances == 3) {
    let parte = document.getElementById("braco_es");
    parte.style.display = "inline";
  } else if (chances == 2) {
    let parte = document.getElementById("perna_dir");
    parte.style.display = "inline";
  } else if (chances == 1) {
    let parte = document.getElementById("perna_es");
    parte.style.display = "inline";
  } else {
    let parte = document.getElementById("cabeca");
    parte.style.display = "inline";
    let lblGanhou = document.getElementById("lblResult");
    lblGanhou.innerHTML = "PERDEU<br><br>A palavra era: " + sort;
    lblGanhou.style.color = "#f00";
    showWelcome(false);
  }
};

checkWin = () => {
  let retorno = true;
  for (let index = 0; index < sortCharArr.length; index++) {
    if (document.getElementById("id" + index).innerText == "-") {
      retorno = false;
    }
  }
  return retorno;
};

letterExists = (letr) => {
  let retornoBool = false;
  for (let index = 0; index < sortCharArr.length; index++) {
    let letra = removeAccent(sortCharArr[index]);
    if (letra == letr.toUpperCase()) {
      let theLbl = document.getElementById("id" + index);
      theLbl.innerText = sortCharArr[index];
      retornoBool = true;
    }
  }

  return retornoBool;
};

clickValidation = (btn) => {
  if (letterExists(btn.innerText)) {
    changeBtn(btn, true, false);

    if (checkWin()) {
      let lblGanhou = document.getElementById("lblResult");

      lblGanhou.innerHTML =
        "PARABÉNS VOCÊ VENCEU!!!<br><br>A palavra era: " + sort;
      showWelcome(false);
    }
  } else {
    changeBtn(btn, false, false);
    decreaseChances();
  }
};

recreateKeyboard = () => {
  let keyboardContainer = document.getElementById("keyboardContainer");

  while (keyboardContainer.firstChild) {
    keyboardContainer.removeChild(keyboardContainer.firstChild);
  }

  for (let index = 0; index < letters.length; index++) {
    let curChar = letters[index];
    let btnNew = document.createElement("button");
    btnNew.style.width = "40px";
    btnNew.style.height = "40px";
    btnNew.style.top = "10px";
    btnNew.style.display = "inline";
    btnNew.addEventListener("click", function (event) {
      clickValidation(btnNew);
    });
    btnNew.innerText = curChar.toUpperCase();

    keyboardContainer.appendChild(btnNew);

    if (
      curChar == "e" ||
      curChar == "j" ||
      curChar == "o" ||
      curChar == "t" ||
      curChar == "y"
    ) {
      keyboardContainer.appendChild(document.createElement("br"));
    }
  }
};

recreateWord = () => {
  sort = sortear();
  sortCharArr = sort.split("");
  let container = document.getElementById("wordContainer");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let index = 0; index < sortCharArr.length; index++) {
    let lblNew = document.createElement("label");

    lblNew.setAttribute("class", "lbl_palavra");
    lblNew.setAttribute("id", "id" + index);
    lblNew.innerText = "-";
    container.appendChild(lblNew);
  }
};

showWelcome = (primeiraVez) => {
  if (!primeiraVez) {
    document.getElementById("lblDescription").style.display = "none";
  }
  document.getElementById("welcomeScreen").style.display = "block";
};

hideWelcome = () => {
  document.getElementById("welcomeScreen").style.display = "none";
};

start = () => {
  showWelcome(true);
};

startGame = () => {
  hideWelcome();
  recreateWord();
  recreateKeyboard();

  document.getElementById("lblChances2").innerText = chances = 6;
  document.getElementById("lblResult").innerText = "";
  document.getElementById("lblResult").style.color = "#18a999";
  let parte = document.getElementById("cabeca");
  parte.style.display = "none";
  parte = document.getElementById("braco_dir");
  parte.style.display = "none";
  parte = document.getElementById("braco_es");
  parte.style.display = "none";
  parte = document.getElementById("perna_dir");
  parte.style.display = "none";
  parte = document.getElementById("perna_es");
  parte.style.display = "none";
  parte = document.getElementById("corpo");
  parte.style.display = "none";
};

//#endregion

window.addEventListener("load", start);
