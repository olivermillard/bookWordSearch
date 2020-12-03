// ---------------------- //
// GLOBAL VARIABLES START //
// ---------------------- //
var tbl;
var tblBody;
var tblHead;
var row;
var cell;
var cellContent = "";
// -------------------- //
// GLOBAL VARIABLES END //
// -------------------- //

//////////////////////////

// ---------------------- //
// GLOBAL FUNCTIONS START //
// ---------------------- //
//FUNCTIONS ON PAGE LOAD
window.onload = function() {
  loadFromAPI();
  createSpellClassArrays();
};

//LOAD ALL
function loadFromAPI() {
  loadSpells();
  loadClasses();
  loadRaces();
}

// DELETE ITEM FROM ARRAY BY VALUE
function removeByVal(arr) {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

// -------------------- //
// GLOBAL FUNCTIONS END //
// -------------------- //

///////////////////////////////////

// ------------------------------ //
// MAIN CONTAINER FUNCTIONS START //
// ------------------------------ //

// DARK MODE
function darkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");
  var table = document.getElementById("modalSpellTable");
  table.classList.toggle("modalSpellTableDark");
}

//SHOW SPELLS CONTENT
function goToSpells() {
  var spellsDiv = document.getElementById("mainSpellContainer");
  var charDiv = document.getElementById("mainCharacterContainer");
  var rollerDiv = document.getElementById("mainRollerContainer");
  var introDescDiv = document.getElementById("introDescDiv");
  var spellsIsShown = window.getComputedStyle(spellsDiv).display;
  introDescDiv.style.display = "none";
  charDiv.style.display = "none";
  rollerDiv.style.display = "none";
  spellsDiv.style.display = "flex";
  introDescDiv.style.display = "none";
  // if (spellsIsShown === "none") {
  //   spellsDiv.style.display = "block";
  // } else {
  //   spellsDiv.style.display = "none";
  //   clearAllSpells();
  // }
}

function goToChar() {
  var spellsDiv = document.getElementById("mainSpellContainer");
  var charDiv = document.getElementById("mainCharacterContainer");
  var rollerDiv = document.getElementById("mainRollerContainer");
  var introDescDiv = document.getElementById("introDescDiv");
  var charIsShown = window.getComputedStyle(charDiv).display;
  introDescDiv.style.display = "none";
  spellsDiv.style.display = "none";
  rollerDiv.style.display = "none";
  charDiv.style.display = "flex";
  // if (charIsShown === "none") {
  //   charDiv.style.display = "block";
  // } else {
  //   charDiv.style.display = "none";
  // }
}

function goToRoller() {
  var spellsDiv = document.getElementById("mainSpellContainer");
  var charDiv = document.getElementById("mainCharacterContainer");
  var rollerDiv = document.getElementById("mainRollerContainer");
  var introDescDiv = document.getElementById("introDescDiv");
  var rollerIsShown = window.getComputedStyle(rollerDiv).display;
  introDescDiv.style.display = "none";
  spellsDiv.style.display = "none";
  charDiv.style.display = "none";
  rollerDiv.style.display = "block";
  // if (rollerIsShown === "none") {
  //   rollerDiv.style.display = "block";
  // } else {
  //   rollerDiv.style.display = "none";
  // }
}

// ---------------------------- //
// MAIN CONTAINER FUNCTIONS END //
// -----------------------------//

//////////////////////////////////

// ------------ //
// SPELLS START //
// ------------ //
var spellsArray = [];
var spellsArray1 = [];
var spellsArray2 = [];
var spellsArray3 = [];
var spellsArray4 = [];
var spellsArray5 = [];
var spellsArray6 = [];
var spellsArray7 = [];
var x = 0;

// LOAD SPELLS FROM API (SEE BOTTOM FOR SLOWER BUT CLEANER VERSION)
var checkForLocalSpells = JSON.parse(localStorage.getItem("all-spells-array"));
function loadSpells() {
  if (checkForLocalSpells != null) {
    for (i = 0; i < checkForLocalSpells.length; i++) {
      spellsArray[i] = checkForLocalSpells[i];
    }
    console.log("local data being used - spells");
    console.log("spells array: ", spellsArray);
  } else {
    console.log("API data being used - spells");
    //  CALL #1
    var xhttp1 = new XMLHttpRequest();
    xhttp1.open("GET", "https://api.open5e.com/spells/", true);
    xhttp1.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp1.status >= 200 && xhttp1.status < 400) {
        console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray1 = spellsArray1.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp1.send();
    //  CALL #2
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("GET", "https://api.open5e.com/spells/?page=2", true);
    xhttp2.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp2.status >= 200 && xhttp2.status < 400) {
        // console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray2 = spellsArray2.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp2.send();
    //  CALL #3
    var xhttp3 = new XMLHttpRequest();
    xhttp3.open("GET", "https://api.open5e.com/spells/?page=3", true);
    xhttp3.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp3.status >= 200 && xhttp3.status < 400) {
        // console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray3 = spellsArray3.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp3.send();
    //  CALL #4
    var xhttp4 = new XMLHttpRequest();
    xhttp4.open("GET", "https://api.open5e.com/spells/?page=4", true);
    xhttp4.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp4.status >= 200 && xhttp4.status < 400) {
        // console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray4 = spellsArray4.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp4.send();
    //  CALL #5
    var xhttp5 = new XMLHttpRequest();
    xhttp5.open("GET", "https://api.open5e.com/spells/?page=5", true);
    xhttp5.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp5.status >= 200 && xhttp5.status < 400) {
        // console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray5 = spellsArray5.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp5.send();
    //  CALL #6
    var xhttp6 = new XMLHttpRequest();
    xhttp6.open("GET", "https://api.open5e.com/spells/?page=6", true);
    xhttp6.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp6.status >= 200 && xhttp6.status < 400) {
        // console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray6 = spellsArray6.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp6.send();
    //  CALL #7
    var xhttp7 = new XMLHttpRequest();
    xhttp7.open("GET", "https://api.open5e.com/spells/?page=7", true);
    xhttp7.onload = function() {
      var allSpells = JSON.parse(this.response);
      if (xhttp7.status >= 200 && xhttp7.status < 400) {
        // console.log(allSpells);
        for (i = 0; i < allSpells.results.length; i++) {
          spellsArray7 = spellsArray7.concat(allSpells.results[i]);
        }
        x += 1;
        if (x == 7) {
          concatArrays();
        }
      } else {
        console.log("error");
      }
    };
    xhttp7.send();
    // CONCAT ARRAYS FROM SEPERATE AJAX CALLS
    function concatArrays() {
      spellsArray = spellsArray.concat(
        spellsArray1,
        spellsArray2,
        spellsArray3,
        spellsArray4,
        spellsArray5,
        spellsArray6,
        spellsArray7
      );
      console.log(spellsArray);
    }
    saveAllSpellsToLocal();
  }
}

//SAVE SPELLS FROM API TO LOCAL STORAGE
function saveAllSpellsToLocal() {
  if (spellsArray.length == 321) {
    localStorage.setItem("all-spells-array", JSON.stringify(spellsArray));
  } else {
    setTimeout(saveAllSpellsToLocal, 100);
  }
}

//CLEAR THE REST ALL SPELLS TABLE
function clearTheRestAllSpells() {
  clearSearchedSpell();
  clearSavedSpells();
}

//CLEAR THE REST SAVED SPELLS
function clearTheRestSavedSpells() {
  clearAllSpellsTable();
  clearSearchedSpell();
}

// TABLE OF ALL SPELLS
var body = document.getElementsByTagName("body")[0];
var spellContainer = document.getElementById("mainSpellContainer");

//CLEAR ALL SPELLS TABLE
function clearAllSpellsTable() {
  var showAllSpellsButton = document.getElementById("showAllSpellsButton");
  var allSpellsTable = document.getElementById("allSpellsTable");
  var allSpellsTableContainer = document.getElementById(
    "allSpellsTableContainer"
  );
  if (allSpellsTable !== null) {
    spellContainer.removeChild(allSpellsTableContainer);
    showAllSpellsButton.value = "Show All Spells";
  } else {
    return true;
  }
}

//CREATE ALL SPELLS TABLE
function createSpellsTable() {
  if (spellsArray.length == 321) {
    clearTheRestAllSpells();
    document.getElementById("spellDescDiv").style.display = "none";
    if (document.getElementById("allSpellsTable") !== null) {
      clearAllSpellsTable();
    } else {
      tblContainer = document.createElement("div");
      tbl = document.createElement("table");
      tblBody = document.createElement("tbody");
      tblHead = document.createElement("thead");
      // thead
      var headerRow = document.createElement("tr");
      for (h = 0; h < 2; h++) {
        cell = document.createElement("th");
        if (h == 0) {
          cellContent = document.createElement("span");
          cellContent.className = "headerSpellName";
          cellContent.textContent = "Spell Name";
          cell.appendChild(cellContent);
          headerRow.appendChild(cell);
        } else if (h == 1) {
          cellContent = document.createElement("span");
          cellContent.className = "headerSpellName";
          cellContent.textContent = "More Info";
          cell.appendChild(cellContent);
          cell.style.padding = "0px 10px";
          headerRow.appendChild(cell);
          headerRow.className = "spellTableHeaderRow";
        }
      }
      tblHead.appendChild(headerRow);
      tbl.appendChild(tblHead);
      //   tbody
      for (i = 0; i < spellsArray.length; i++) {
        row = document.createElement("tr");
        for (j = 0; j < 2; j++) {
          cell = document.createElement("td");
          if (j == 0) {
            cellContent = document.createElement("span");
            cellContent.className = "spellName spellTableContent";
            cellContent.textContent = spellsArray[i].name;
            cellContent.setAttribute("id", spellsArray[i].slug + "-snID");
            cell.appendChild(cellContent);
            row.appendChild(cell);
          } else if (j == 1) {
            cellContent = document.createElement("input");
            cellContent.setAttribute("type", "button");
            cellContent.setAttribute("value", "Info");
            cellContent.setAttribute("id", i + "-sbNUM");
            cellContent.addEventListener("click", spellInfoFunction);
            cellContent.className = "spellInfo spellTableButton";
            cellContent.textContent = spellsArray[i].name;
            cell.appendChild(cellContent);
            row.appendChild(cell);
            row.setAttribute("id", "spellTableHeaderRow");
          }
        }
        tblBody.appendChild(row);
      }
      tbl.appendChild(tblBody);
      tblContainer.appendChild(tbl);
      tblContainer.setAttribute("id", "allSpellsTableContainer");
      spellContainer.appendChild(tblContainer);
      tbl.setAttribute("border", "2");
      tbl.setAttribute("id", "allSpellsTable");
      tbl.className = "spellTable";
      showAllSpellsButton.value = "Hide All Spells";
    }
  } else {
    setTimeout(createSpellsTable, 100);
  }
}

//CREATE ARRAYS FOR SPELLS BY CLASSES AND LEVEL (FOR CHAR SECTION)
var spellsLevelsArray = [];
var classesSpellsArrays = [];
var arrayOfCantrips = [];
var arrayOf1stLevelSpells = [];
function createSpellClassArrays() {
  var bardSpellsArray = [];
  var bardCantripArray = [];
  var bard1stLevelArray = [];
  var clericSpellsArray = [];
  var clericCantripArray = [];
  var cleric1stLevelArray = [];
  var druidSpellsArray = [];
  var druidCantripArray = [];
  var druid1stLevelArray = [];
  var sorcererSpellsArray = [];
  var sorcererCantripArray = [];
  var sorcerer1stLevelArray = [];
  var warlockSpellsArray = [];
  var warlockCantripArray = [];
  var warlock1stLevelArray = [];
  var wizardSpellsArray = [];
  var wizardCantripArray = [];
  var wizard1stLevelArray = [];

  if (spellsArray.length == 321) {
    for (i = 0; i < spellsArray.length; i++) {
      spellsLevelsArray[i] = spellsArray[i].level_int;
      var parsedClassesArray = [];
      var classesToParse = spellsArray[i].dnd_class;
      parsedClassesArray = classesToParse.split(", ");
      for (j = 0; j < parsedClassesArray.length; j++) {
        if (parsedClassesArray[j] == "Bard") {
          bardSpellsArray.push(i);
          if (spellsArray[i].level_int == 0) {
            bardCantripArray.push(i);
          } else if (spellsArray[i].level_int == 1) {
            bard1stLevelArray.push(i);
          }
        } else if (parsedClassesArray[j] == "Cleric") {
          clericSpellsArray.push(i);
          if (spellsArray[i].level_int == 0) {
            clericCantripArray.push(i);
          } else if (spellsArray[i].level_int == 1) {
            cleric1stLevelArray.push(i);
          }
        } else if (parsedClassesArray[j] == "Druid") {
          druidSpellsArray.push(i);
          if (spellsArray[i].level_int == 0) {
            druidCantripArray.push(i);
          } else if (spellsArray[i].level_int == 1) {
            druid1stLevelArray.push(i);
          }
        } else if (parsedClassesArray[j] == "Sorcerer") {
          sorcererSpellsArray.push(i);
          if (spellsArray[i].level_int == 0) {
            sorcererCantripArray.push(i);
          } else if (spellsArray[i].level_int == 1) {
            sorcerer1stLevelArray.push(i);
          }
        } else if (parsedClassesArray[j] == "Warlock") {
          warlockSpellsArray.push(i);
          if (spellsArray[i].level_int == 0) {
            warlockCantripArray.push(i);
          } else if (spellsArray[i].level_int == 1) {
            warlock1stLevelArray.push(i);
          }
        } else if (parsedClassesArray[j] == "Wizard") {
          wizardSpellsArray.push(i);
          if (spellsArray[i].level_int == 0) {
            wizardCantripArray.push(i);
          } else if (spellsArray[i].level_int == 1) {
            wizard1stLevelArray.push(i);
          }
        }
      }
    }
    classesSpellsArrays.push(
      bardSpellsArray,
      clericSpellsArray,
      druidSpellsArray,
      sorcererSpellsArray,
      warlockSpellsArray,
      wizardSpellsArray
    );
    arrayOfCantrips.push(
      bardCantripArray,
      clericCantripArray,
      druidCantripArray,
      sorcererCantripArray,
      warlockCantripArray,
      wizardCantripArray
    );
    arrayOf1stLevelSpells.push(
      bard1stLevelArray,
      cleric1stLevelArray,
      druid1stLevelArray,
      sorcerer1stLevelArray,
      warlock1stLevelArray,
      wizard1stLevelArray
    );
  } else {
    setTimeout(createSpellClassArrays, 100);
  }
}

// SPELL MODAL BOX FUNCTIONS
var spellIndex;
var modalBox = document.getElementById("modalBoxID");
var close = document.getElementsByClassName("closeSpellModal")[0];
var prev = document.getElementById("prev");
var next = document.getElementById("next");
//SHOW SPELL INFO
function spellInfoFunction() {
  var infoID = this.id;
  spellIndex = infoID.slice(0, -6);
  spellIndex = parseInt(spellIndex, 10);
  showModalSpell();
  // NEXT SPELL
  next.onclick = function() {
    spellIndex = spellIndex + 1;
    if (spellIndex == 321) {
      spellIndex = 0;
    }
    showModalSpell();
  };
  // PREVIOUS SPELL
  prev.onclick = function() {
    spellIndex = spellIndex - 1;
    if (spellIndex == -1) {
      spellIndex = 320;
    }
    showModalSpell();
  };
  modalBox.style.display = "block";
  close.onclick = function() {
    modalBox.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modalBox) {
      modalBox.style.display = "none";
    }
  };
}
//SHOW MODAL SPELLS
function showModalSpell() {
  document.getElementById("modalSpellNameID").textContent =
    spellsArray[spellIndex].name;
  document.getElementById("modalSpellLevelID").textContent =
    spellsArray[spellIndex].level;
  document.getElementById("modalSpellDescID").textContent =
    spellsArray[spellIndex].desc;
  document.getElementById("modalSpellClassID").textContent =
    spellsArray[spellIndex].dnd_class;
  document.getElementById("modalSpellRangeID").textContent =
    spellsArray[spellIndex].range;
  document.getElementById("modalSpellConcID").textContent =
    spellsArray[spellIndex].concentration;
  document.getElementById("modalSpellRitualID").textContent =
    spellsArray[spellIndex].ritual;
  document
    .getElementsByClassName("modalSaveSpellButton")[0]
    .setAttribute("id", spellIndex + "-saveSpellButtonID");
}

// SEARCH A SPELL
var spellSearchCounter = 0;
function spellSearch() {
  clearSearchedSpell();
  clearTheRestSearch();
  document.getElementById("spellDescDiv").style.display = "none";
  if (spellsArray.length == 321) {
    slugCaseForSearch();
    for (var i = 0; i < spellsArray.length; i++) {
      spellSearchCounter += 1;
      if (spellsArray[i].slug == spellToSearch) {
        tbl = document.createElement("table");
        tblBody = document.createElement("tbody");
        tblHead = document.createElement("thead");
        var spellSearchLabelArray = [
          "Description: ",
          "Class: ",
          "Range: ",
          "Concentration: ",
          "Ritual: ",
          "Level: "
        ];
        var spellSearchContentArray = [
          spellsArray[i].desc,
          spellsArray[i].dnd_class,
          spellsArray[i].range,
          spellsArray[i].concentration,
          spellsArray[i].ritual,
          spellsArray[i].level
        ];
        // thead
        var headerRow = document.createElement("tr");
        for (h = 0; h < 2; h++) {
          cell = document.createElement("th");
          if (h == 0) {
            cellContent = document.createElement("input");
            cellContent.setAttribute("id", i + "-saveSpellButtonID");
            cellContent.className = "saveSpellButton spellTableButton";
            cellContent.setAttribute("type", "button");
            cellContent.value = "Save";
            cellContent.addEventListener("click", addToSavedSpells);
            cell.className = "searchSpellHeader spellTableHeader";
            cell.appendChild(cellContent);
            headerRow.appendChild(cell);
          } else if (h == 1) {
            cellContent = document.createElement("span");
            cellContent.textContent = spellsArray[i].name;
            cellContent.className = "headerSpellName";
            cell.colSpan = 2;
            cell.className = "searchSpellHeader spellTableHeader";
            cell.appendChild(cellContent);
            headerRow.appendChild(cell);
          }
          headerRow.className = "spellTableHeaderRow";
        }
        tblHead.appendChild(headerRow);
        tblHead.className = "searchSpellHeader";
        tbl.appendChild(tblHead);
        // tbody
        for (var k = 0; k < 6; k++) {
          row = document.createElement("tr");
          for (var j = 0; j < 2; j++) {
            cell = document.createElement("td");
            if (j == 0) {
              cellContent = document.createElement("span");
              cellContent.textContent = spellSearchLabelArray[k];
              cellContent.className = "spellTableLabel";
              cell.appendChild(cellContent);
              row.appendChild(cell);
            } else if (j == 1) {
              cellContent = document.createElement("span");
              cellContent.textContent = spellSearchContentArray[k];
              cellContent.className = "spellTableContent";
              cell.appendChild(cellContent);
              cell.colSpan = 2;
              row.appendChild(cell);
            }
          }
          tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        spellContainer.appendChild(tbl);
        tbl.setAttribute("id", "searchedSpellTable");
        tbl.className = "spellTable";
        return;
      }
      spellSearchInput.value = "";
    }
    if (spellSearchCounter == 321) {
      if (originalInput == "") {
        notFoundResponse = document.createElement("div");
        notFoundResponse.className = "notFoundResponse";
        notFoundResponse.innerHTML = "You didn't enter any text.";
      } else if (
        originalInput == "DONKAY" ||
        originalInput == "donkay" ||
        originalInput == "Donkay"
      ) {
        notFoundResponse = document.createElement("iframe");
        notFoundResponse.setAttribute("width", 560);
        notFoundResponse.setAttribute("height", 315);
        notFoundResponse.setAttribute(
          "src",
          "https://www.youtube.com/embed/YAucGX4BVac?autoplay=1&mute=0&?rel=0&showinfo=0&controls=0&modestbranding=1&autohide=1"
        );
        notFoundResponse.setAttribute("frameborder", 0);
        notFoundResponse.setAttribute("allow", "autoplay");
        notFoundResponse.className = "donkay";
        spellContainer.appendChild(notFoundResponse);
      } else {
        notFoundResponse = document.createElement("div");
        notFoundResponse.innerHTML =
          "&quot;" + originalInput + "&quot; is not a spell";
        notFoundResponse.className = "notFoundResponse";
      }
      notFoundResponse.setAttribute("id", "notFoundResponse");
      spellContainer.appendChild(notFoundResponse);
    }
  } else {
    setTimeout(spellSearch, 100);
  }
}

var spellToSearch = "";
var originalInput = "";
//SLUG CASE FOR SEARCH
function slugCaseForSearch() {
  originalInput = spellSearchInput.value;
  spellToSearch = spellSearchInput.value.trim();
  spellToSearch = spellToSearch.replace(/\s+/g, "-").toLowerCase();
  var dashCheck = spellToSearch.slice(-1);
  if (spellToSearch != null && dashCheck == "-") {
    spellToSearch = spellToSearch.substring(0, spellToSearch.length - 1);
  }
}

// ENTER KEY FOR SEARCH
var spellSearchInput = document.getElementById("spellSearchInput");
spellSearchInput.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    spellSearch();
  }
});

// CLEAR SEARCHED SPELLS
function clearSearchedSpell() {
  var searchedSpell = document.getElementById("searchedSpellTable");
  if (searchedSpell != null) {
    searchedSpell.parentNode.removeChild(searchedSpell);
  }
  var notFoundResponse = document.getElementById("notFoundResponse");
  if (notFoundResponse != null) {
    notFoundResponse.parentNode.removeChild(notFoundResponse);
  }
  spellSearchCounter = 0;
}
//CLEAR THE REST SEARCHED SPELLS
function clearTheRestSearch() {
  clearAllSpellsTable();
  clearSavedSpells();
}

//CLEAR SAVED SPELLS
function clearSavedSpells() {
  var savedSpellsOuterTable = document.getElementById("savedSpellsOuterTable");
  var savedSpellsButton = document.getElementById("showSavedSpellsButton");
  if (savedSpellsOuterTable !== null) {
    spellContainer.removeChild(savedSpellsOuterTable);
    savedSpellsButton.value = "Show Saved Spells";
  }
}
// SHOW SAVED SPELLS
var localStoredSpells;
function showSavedSpells() {
  document.getElementById("spellDescDiv").style.display = "none";
  var savedSpellsButton = document.getElementById("showSavedSpellsButton");
  var savedSpellsOuterTable = document.getElementById("savedSpellsOuterTable");
  if (savedSpellsOuterTable !== null) {
    clearSavedSpells();
  } else {
    clearTheRestSavedSpells();
    if (spellsArray.length == 321) {
      localStoredSpells = JSON.parse(localStorage.getItem("saved-spells"));
      if (localStoredSpells != null && localStoredSpells.length != 0) {
        localStoredSpells.sort(function(a, b) {
          return a - b;
        });
        tblOuter = document.createElement("table");
        tblBodyOuter = document.createElement("tbody");
        var tblFooterOuter = document.createElement("tfoot");
        var footerRowOuter = document.createElement("tr");
        footerRowOuter.className = "footerRowOuter";
        //DELETE ALL (AT BOTTOM)
        var footerCell = document.createElement("td");
        var footerCellContent = document.createElement("input");
        footerCellContent.className = "savedSpellsFooterClass";
        footerCellContent.setAttribute("id", "deleteAllSpellsButton");
        footerCellContent.setAttribute("type", "button");
        footerCellContent.value = "DELETE ALL SPELLS";
        footerCellContent.addEventListener("click", deleteAllSpells);
        footerCell.appendChild(footerCellContent);
        footerRowOuter.appendChild(footerCell);
        //OUTER TABLE TBODY
        for (i = 0; i < localStoredSpells.length; i++) {
          rowOuter = document.createElement("tr");
          cellOuter = document.createElement("td");
          tblInner = document.createElement("table");
          tblBodyInner = document.createElement("tbody");
          tblHeadInner = document.createElement("thead");
          headerRowInner = document.createElement("tr");
          var savedSpellsLabelArray = [
            "Description: ",
            "Class: ",
            "Range: ",
            "Concentration: ",
            "Ritual: ",
            "Level: "
          ];
          var index = localStoredSpells[i];
          var savedSpellsContentArray = [
            spellsArray[index].desc,
            spellsArray[index].dnd_class,
            spellsArray[index].range,
            spellsArray[index].concentration,
            spellsArray[index].ritual,
            spellsArray[index].level
          ];
          var savedSpellName = spellsArray[index].name;
          for (h = 0; h < 2; h++) {
            cell = document.createElement("th");
            if (h == 0) {
              cellContent = document.createElement("input");
              cellContent.className = "savedSpellsHeader";
              cellContent.className = "spellTableButton";
              cellContent.setAttribute("id", index + "-removeSpellButtonID");
              cellContent.setAttribute("type", "button");
              cellContent.value = "Remove";
              cellContent.addEventListener("click", deleteSpell);
              cell.appendChild(cellContent);
              cell.className = "spellTableHeader";
              headerRowInner.appendChild(cell);
            } else if (h == 1) {
              cellContent = document.createElement("span");
              cellContent.className = "savedSpellsHeader";
              cellContent.className = "headerSpellName";
              cellContent.textContent = savedSpellName;
              cellContent.style.fontWeight = "bold";
              cell.appendChild(cellContent);
              cell.className = "spellTableHeader";
              headerRowInner.appendChild(cell);
            } else {
            }
          }
          headerRowInner.className = "spellTableRow savedSpellsHeaderRow";
          tblHeadInner.appendChild(headerRowInner);
          tblInner.appendChild(tblHeadInner);
          for (var k = 0; k < 6; k++) {
            row = document.createElement("tr");
            for (var j = 0; j < 3; j++) {
              cell = document.createElement("td");
              if (j == 0) {
                cellContent = document.createElement("span");
                cellContent.textContent = savedSpellsLabelArray[k];
                cellContent.className = "spellTableLabel";
                cell.appendChild(cellContent);
                row.appendChild(cell);
              } else if (j == 1) {
                cellContent = document.createElement("span");
                cellContent.textContent = savedSpellsContentArray[k];
                cellContent.className = "spellTableContent";
                cell.appendChild(cellContent);
                cell.colSpan = 2;
                row.appendChild(cell);
              }
            }
            tblBodyInner.appendChild(row);
            tblInner.appendChild(tblBodyInner);
          }
          cellOuter.appendChild(tblInner);
          rowOuter.appendChild(cellOuter);
          rowOuter.setAttribute("id", index + "-rowOuter");
          tblInner.setAttribute("id", "savedSpellsInnerTable" + index);
          tblInner.className = "spellTable";
          tblBodyOuter.appendChild(rowOuter);
          tblBodyOuter.setAttribute("id", "tblBodyOuter");
        }
        // tblHeadOuter.appendChild(headerRowOuter);
        tblFooterOuter.appendChild(footerRowOuter);
        // tblOuter.appendChild(tblHeadOuter);
        tblOuter.appendChild(tblBodyOuter);
        tblOuter.appendChild(tblFooterOuter);
        tblOuter.setAttribute("id", "savedSpellsOuterTable");
        spellContainer.appendChild(tblOuter);
        savedSpellsButton.value = "Hide Saved Spells";
      } else {
        alert("No spells have been saved");
      }
    } else {
      setTimeout(showSavedSpells, 100);
    }
  }
}
// SAVE NEW SPELL
var savedSpells = [];
var savedSpellsIDs = [];
function addToSavedSpells() {
  var idToSave = this.id;
  if (idToSave == null) {
    idToSave = document.getElementsByClassName("modalSaveSpellButton")[0].id;
  }
  idToSave = idToSave.slice(0, -18);
  savedSpells = JSON.parse(localStorage.getItem("saved-spells"));
  if (savedSpells != null) {
    if (savedSpells.includes(idToSave)) {
      alert("Spell not added because it is already in your saved spells");
    } else {
      saveSpellToStorage(idToSave);
    }
  } else {
    saveSpellToStorage(idToSave);
  }
}
function saveSpellToStorage(propID) {
  if (savedSpells != null) {
    savedSpells.push(propID);
  } else {
    savedSpells = [];
    savedSpells[0] = propID;
  }
  localStorage.setItem("saved-spells", JSON.stringify(savedSpells));
  localStoredSpells = JSON.parse(localStorage.getItem("saved-spells"));
  alert("Spell has been saved");
}
// DELETE SPELL
function deleteSpell() {
  var deleteID = this.id;
  deleteID = deleteID.slice(0, -20);
  savedSpells = localStoredSpells = JSON.parse(
    localStorage.getItem("saved-spells")
  );
  removeByVal(savedSpells, deleteID);
  localStorage.setItem("saved-spells", JSON.stringify(savedSpells));
  console.log("Saved spells: ", savedSpells);
  var deleteRow = document.getElementById(deleteID + "-rowOuter");
  var tblBodyOuter = document.getElementById("tblBodyOuter");
  tblBodyOuter.removeChild(deleteRow);
  if (savedSpells.length == 0) {
    clearSavedSpells();
  }
}

//DELETE ALL SAVED SPELLS
function deleteAllSpells() {
  var doubleCheck = confirm(
    "Are you sure that you want to delete all of your saved spells?"
  );
  if (doubleCheck == true) {
    localStorage.removeItem("saved-spells");
    savedSpells = [];
    var savedSpellsOuterTable = document.getElementById(
      "savedSpellsOuterTable"
    );
    spellContainer.removeChild(savedSpellsOuterTable);
    var savedSpellsButton = document.getElementById("showSavedSpellsButton");
    savedSpellsButton.value = "Show Saved Spells";
  } else {
    console.log("that's what I fuckin thought puss");
  }
}

//CLEAR ALL (SPELLS)
function clearAllSpells() {
  clearTheRestAllSpells();
  clearTheRestSavedSpells();
  clearTheRestSearch();
}

// ---------- //
// SPELLS END //
// ---------- //

/////////////////////

// --------------- //
// CHARACTER START //
// --------------- //

//CLASSES VARIABLES
var classesArray = [];
var checkForLocalClasses = JSON.parse(
  localStorage.getItem("all-classes-array")
);
//LOAD CLASSES
var classesCounter = 1;
function loadClasses() {
  if (checkForLocalClasses != null) {
    for (i = 0; i < checkForLocalClasses.length; i++) {
      classesArray[i] = checkForLocalClasses[i];
    }
    console.log("local data being used - classes");
    console.log("classes array: ", classesArray);
  } else {
    if (classesCounter == 1) {
      console.log("API data being used - classes");
    }
    var xhttpClasses = new XMLHttpRequest();
    xhttpClasses.open(
      "GET",
      "http://www.dnd5eapi.co/api/classes/" + classesCounter,
      true
    );
    xhttpClasses.onload = function() {
      var thisClass = JSON.parse(this.response);
      if (xhttpClasses.status >= 200 && xhttpClasses.status < 400) {
        classesArray = classesArray.concat(thisClass);
        classesCounter += 1;
        if (thisClass == null) {
          console.log("finished collecting classes");
          classesArray.splice(-1, 1);
          console.log("classes array: ", classesArray);
          localStorage.setItem(
            "all-classes-array",
            JSON.stringify(classesArray)
          );
          return classesArray;
        }
      } else {
        console.log("error");
      }
      loadClasses();
    };
    xhttpClasses.send();
  }
}
//RACES VARIABLES
var racesArray = [];
var checkForLocalRaces = JSON.parse(localStorage.getItem("all-races-array"));
//LOAD CLASSES
var racesCounter = 1;
function loadRaces() {
  if (checkForLocalRaces != null) {
    for (i = 0; i < checkForLocalRaces.length; i++) {
      racesArray[i] = checkForLocalRaces[i];
    }
    console.log("local data being used - races");
    console.log("races array: ", racesArray);
  } else {
    if (racesCounter == 1) {
      console.log("API data being used - races");
    }
    var xhttpRaces = new XMLHttpRequest();
    xhttpRaces.open(
      "GET",
      "http://www.dnd5eapi.co/api/races/" + racesCounter,
      true
    );
    xhttpRaces.onload = function() {
      var thisRace = JSON.parse(this.response);
      if (xhttpRaces.status >= 200 && xhttpRaces.status < 400) {
        racesArray = racesArray.concat(thisRace);
        racesCounter += 1;
        if (thisRace == null) {
          console.log("finished collecting races");
          racesArray.splice(-1, 1);
          console.log("races array: ", racesArray);
          localStorage.setItem("all-races-array", JSON.stringify(racesArray));
          return racesArray;
        }
      } else {
        console.log("error");
      }
      loadRaces();
    };
    xhttpRaces.send();
  }
}

//ARRAYS OF NAMES
var alignmentOptionsArray = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil"
];
var abilitiesNamesArray = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
//CREATE NEW CHARACTER
var mainCharacterContainer = document.getElementById("mainCharacterContainer");
function createNewCharacter() {
  document.getElementById("introCharDiv").style.display = "none";
  var mainCharacterContainer = document.getElementById(
    "mainCharacterContainer"
  );
  var checkNewCharacter = document.getElementById("newCharacterForm");
  var mainSavedCharDiv = document.getElementById("mainSavedCharDiv");
  if (mainSavedCharDiv !== null) {
    mainCharacterContainer.removeChild(mainSavedCharDiv);
  }
  if (checkNewCharacter !== null) {
    var doubleCheck = confirm(
      "You haven't finished creating this character. Would you like to clear your inputs and start over?"
    );
    if (doubleCheck == true) {
      mainCharacterContainer.removeChild(checkNewCharacter);
      function restartCharacterForm() {
        if (checkNewCharacter == null) {
          createNewCharacter();
        } else {
          setTimeout(createNewCharacter(), 100);
        }
      }
      restartCharacterForm();
    } else {
      return;
    }
  } else {
    if (classesArray.length != 0 || classesArray != null) {
      characterDiv = document.createElement("div");
      //input div content start
      inputDiv = document.createElement("div");
      inputDivRow1 = document.createElement("div");
      inputDivRow2 = document.createElement("div");
      //row1
      //name
      nameInput = document.createElement("textarea");
      nameInput.setAttribute("type", "text");
      nameInput.setAttribute("placeholder", "Character Name");
      nameInput.setAttribute("id", "nameInput");
      nameInput.className = "characterInputField characterInputFieldRow1";
      inputDivRow1.appendChild(nameInput);
      //ideals
      idealsInput = document.createElement("textarea");
      idealsInput.setAttribute("type", "text");
      idealsInput.setAttribute("placeholder", "Ideals");
      idealsInput.setAttribute("id", "idealsInput");
      idealsInput.className = "characterInputField characterInputFieldRow1";
      inputDivRow1.appendChild(idealsInput);
      //bonds
      bondsInput = document.createElement("textarea");
      bondsInput.setAttribute("type", "text");
      bondsInput.setAttribute("placeholder", "Bonds");
      bondsInput.setAttribute("id", "bondsInput");
      bondsInput.className = "characterInputField characterInputFieldRow1";
      inputDivRow1.appendChild(bondsInput);
      //flaws
      flawsInput = document.createElement("textarea");
      flawsInput.setAttribute("type", "text");
      flawsInput.setAttribute("placeholder", "Flaws");
      flawsInput.setAttribute("id", "flawsInput");
      flawsInput.className = "characterInputField characterInputFieldRow1";
      inputDivRow1.appendChild(flawsInput);
      inputDivRow1.className = "inputDivRow1 inputDivRow";
      inputDiv.appendChild(inputDivRow1);
      //row2
      //background
      backgroundInput = document.createElement("textarea");
      backgroundInput.setAttribute("type", "text");
      backgroundInput.setAttribute("placeholder", "Background");
      backgroundInput.setAttribute("id", "backgroundInput");
      backgroundInput.className = "characterInputField characterInputFieldRow2";
      inputDivRow2.appendChild(backgroundInput);
      //personality traits
      personalityInput = document.createElement("textarea");
      personalityInput.setAttribute("type", "text");
      personalityInput.setAttribute("placeholder", "Personality Traits");
      personalityInput.setAttribute("id", "personalityInput");
      personalityInput.className =
        "characterInputField characterInputFieldRow2";
      inputDivRow2.appendChild(personalityInput);
      inputDivRow2.className = "inputDivRow2 inputDivRow";
      inputDiv.appendChild(inputDivRow2);
      inputDiv.className = "inputDiv";
      characterDiv.appendChild(inputDiv);
      //input div content end
      //select div start
      selectDiv = document.createElement("div");
      //classes
      classesSelect = document.createElement("select");
      classesSelect.className = "characterSelectField";
      classesSelect.setAttribute("id", "classesSelect");
      for (i = 0; i < classesArray.length + 1; i++) {
        classesOption = document.createElement("option");
        classesOption.className = "characterSelectOption";
        if (i == 0) {
          classesOption.innerHTML =
            '<option value="" onchange="reportSelectedClass(this.value)"></option>';
          classesOption.textContent = "Select a Class";
          // classesOption.className = "placeholderOption"; //hides placeholder value
          classesOption.setAttribute("id", "classesPlaceholder");
          classesOption.selected = true;
          classesOption.disabled = true;
        } else {
          classesOption.value = classesOption.textContent =
            classesArray[i - 1].name;
          classesOption.setAttribute("onchange", reportSelectedClass);
        }
        classesSelect.appendChild(classesOption);
      }
      selectDiv.appendChild(classesSelect);
      //race
      racesSelect = document.createElement("select");
      racesSelect.className = "characterSelectField";
      racesSelect.setAttribute("id", "racesSelect");
      for (i = 0; i < racesArray.length + 1; i++) {
        racesOption = document.createElement("option");
        racesOption.className = "characterSelectOption";
        if (i == 0) {
          racesOption.innerHTML = '<option value="" ></option>';
          racesOption.textContent = "Select a Race";
          // racesOption.className = "placeholderOption"; //hides placeholder value
          racesOption.setAttribute("id", "racesPlaceholder");
          racesOption.selected = true;
          racesOption.disabled = true;
        } else {
          racesOption.value = i - 1;
          racesOption.textContent = racesArray[i - 1].name;
        }
        racesSelect.appendChild(racesOption);
      }
      selectDiv.appendChild(racesSelect);
      //alignment
      alignmentSelect = document.createElement("select");
      alignmentSelect.className = "characterSelectField";
      alignmentSelect.setAttribute("id", "alignmentSelect");
      for (i = 0; i < 9 + 1; i++) {
        alignmentOption = document.createElement("option");
        alignmentOption.className = "characterSelectOption";
        if (i == 0) {
          alignmentOption.innerHTML = '<option value="" ></option>';
          alignmentOption.textContent = "Select an Alignment";
          alignmentOption.setAttribute("id", "alignmentPlaceholder");
          alignmentOption.selected = true;
          alignmentOption.disabled = true;
        } else {
          alignmentOption.value = i - 1;
          alignmentOption.textContent = alignmentOptionsArray[i - 1];
        }
        alignmentSelect.appendChild(alignmentOption);
      }
      selectDiv.appendChild(alignmentSelect);
      selectDiv.className = "selectDiv";
      characterDiv.appendChild(selectDiv);
      //select div end
      //abilitiesDiv start
      abilitiesMainDiv = document.createElement("div");
      abilitiesMainDiv.className = "abilitiesMainDiv";
      abilitiesDiv = document.createElement("div");
      abilitiesDiv.className = "abilitiesDiv";
      //abilities
      abilitiesTableDiv = document.createElement("div");
      abilitiesTableDiv.className = "abilitiesTableDiv";
      abilitiesTable = document.createElement("table");
      abilitiesTable.setAttribute("id", "abilitiesTable");
      abilitiesTitleRow = document.createElement("div");
      abilitiesTitleRow.className = "abilitiesTitleRow";
      abilitiesTitle1 = document.createElement("div");
      abilitiesTitle1.textContent = "Abilities";
      abilitiesTitle1.className = "abilitiesTitle";
      abilitiesTitle2 = document.createElement("div");
      abilitiesTitle2.textContent = "Race Mod.";
      abilitiesTitle2.className = "abilitiesTitle";
      abilitiesTitleRow.appendChild(abilitiesTitle1);
      abilitiesTitleRow.appendChild(abilitiesTitle2);
      abilitiesTableDiv.appendChild(abilitiesTitleRow);
      abilitiesTableBody = document.createElement("tbody");
      for (i = 0; i < 6; i++) {
        abilitiesTableRow = document.createElement("tr");
        for (j = 0; j < 4; j++) {
          abilitiesTableCell = document.createElement("td");
          if (j == 0) {
            abilitiesTableCellContent = document.createElement("span");
            abilitiesTableCellContent.className = "abilityName";
            abilitiesTableCellContent.textContent =
              abilitiesNamesArray[i] + ": ";
            abilitiesTableCell.appendChild(abilitiesTableCellContent);
          } else if (j == 1) {
            abilitiesTableCellContent = document.createElement("input");
            abilitiesTableCellContent.setAttribute("type", "text");
            abilitiesTableCellContent.className = "ablityInput";
            abilitiesTableCellContent.setAttribute("id", i + "ability");
            abilitiesTableCell.appendChild(abilitiesTableCellContent);
          } else if (j == 2) {
            abilitiesTableCellContent = document.createElement("text");
            abilitiesTableCellContent.className = "abilityPlus";
            abilitiesTableCellContent.textContent = "+";
            abilitiesTableCell.appendChild(abilitiesTableCellContent);
          } else if (j == 3) {
            abilitiesTableCellContent = document.createElement("input");
            abilitiesTableCellContent.setAttribute("type", "text");
            abilitiesTableCellContent.className = "ablityRaceModifier";
            abilitiesTableCellContent.setAttribute(
              "id",
              i + "abilityRaceModifier"
            );
            // abilitiesTableCellContent.disabled = true;
            abilitiesTableCell.appendChild(abilitiesTableCellContent);
          }
          abilitiesTableRow.appendChild(abilitiesTableCell);
        }
        abilitiesTableBody.appendChild(abilitiesTableRow);
      }
      abilitiesTable.appendChild(abilitiesTableBody);
      abilitiesTableDiv.appendChild(abilitiesTable);
      abilitiesDiv.appendChild(abilitiesTableDiv);
      //dice roller
      diceRollerDiv = document.createElement("div");
      diceRollerDiv.setAttribute("id", "diceRollerDiv");
      diceRollerDiv.className = "diceRollerDiv";
      diceRollerButton = document.createElement("input");
      diceRollerButton.className = "characterButton";
      diceRollerButton.setAttribute("type", "button");
      diceRollerButton.setAttribute("id", "diceRollerButton");
      diceRollerButton.addEventListener("click", roll4D6);
      diceRollerButton.value = "Roll 4d6 for Abilites";
      diceRollerDiv.appendChild(diceRollerButton);
      diceRollerTable = document.createElement("table");
      diceRollerTable.setAttribute("id", "diceRollerTable");
      diceRollerTable.style.visibility = "hidden";
      diceRollerBody = document.createElement("tbody");
      for (i = 0; i < 7; i++) {
        diceRollerRow = document.createElement("tr");
        diceRollerRow.setAttribute("id", i + "rollerRow");
        for (j = 0; j < 2; j++) {
          diceRollerCell = document.createElement("td");
          if (i == 0) {
            diceRollerCell.className = "diceRoller4d6Cell diceRoller4d6Header";
            if (j == 0) {
              diceRollerCell.textContent = "4d6";
              diceRollerRow.appendChild(diceRollerCell);
            } else if (j == 1) {
              diceRollerCell.textContent = "Highest Val.";
              diceRollerRow.appendChild(diceRollerCell);
            }
          } else {
            if (j == 0) {
              diceRollerCell.setAttribute("id", i - 1 + "allRolledValues");
              diceRollerCell.className =
                "diceRoller4d6Cell diceRoller4d6Values";
              diceRollerRow.appendChild(diceRollerCell);
            } else if (j == 1) {
              diceRollerCell.setAttribute("id", i - 1 + "highestValue");
              diceRollerCell.className =
                "diceRoller4d6Cell diceRoller4d6HighestValue";
              diceRollerRow.appendChild(diceRollerCell);
            }
          }
        }
        diceRollerBody.appendChild(diceRollerRow);
      }
      diceRollerTable.appendChild(diceRollerBody);
      diceRollerDiv.appendChild(diceRollerTable);
      abilitiesDiv.appendChild(diceRollerDiv);
      abilitiesMainDiv.appendChild(abilitiesDiv);
      characterDiv.appendChild(abilitiesMainDiv);
      //abilitiesDiv end
      //checkboxesDiv start
      checkboxesDiv = document.createElement("div");
      checkboxesDiv.className = "checkboxesDiv";
      checkboxesDiv.setAttribute("id", "checkboxesDiv");
      //skills choices
      skillsCheckboxes = document.createElement("form");
      skillsCheckboxes.name = "skillsCheckboxes";
      skillsCheckboxes.className = "characterCheckboxForm";
      skillsCheckboxes.setAttribute("id", "skillsCheckboxes");
      checkboxesDiv.appendChild(skillsCheckboxes);
      characterDiv.appendChild(checkboxesDiv);
      //checkboxesDiv end
      //submit
      submitButtonDiv = document.createElement("div");
      submitButtonDiv.className = "submitButtonDiv";
      submitCharacterButton = document.createElement("input");
      submitCharacterButton.setAttribute("id", "submitCharacterButton");
      submitCharacterButton.setAttribute("type", "button");
      submitCharacterButton.className = "characterButton";
      submitCharacterButton.value = "Save Character";
      submitCharacterButton.addEventListener("click", saveCharacter);
      submitButtonDiv.appendChild(submitCharacterButton);
      characterDiv.appendChild(submitButtonDiv);
      //main container
      characterDiv.setAttribute("id", "newCharacterForm");
      mainCharacterContainer.appendChild(characterDiv);
    } else {
      setTimeout(createNewCharacter, 100);
    }
  }
  reportSelectedClass();
  reportSelectedRace();
}

// SAVE NEW CHARACTER
var savedCharacters = [];
function saveCharacter() {
  var missingField = "";
  function addToMissingField(missingItem) {
    if (missingField == "") {
      missingField = missingItem;
    } else {
      missingField = missingField.concat(missingItem);
    }
  }
  // name
  var name = document.getElementById("nameInput").value;
  if (name == "") {
    addToMissingField("name, ");
  }
  // ideals
  var ideals = document.getElementById("idealsInput").value;
  if (ideals == "") {
    addToMissingField("ideals, ");
  }
  // bonds
  var bonds = document.getElementById("bondsInput").value;
  if (bonds == "") {
    addToMissingField("bonds, ");
  }
  // flaws
  var flaws = document.getElementById("flawsInput").value;
  if (flaws == "") {
    addToMissingField("flaws, ");
  }
  //background
  var background = document.getElementById("backgroundInput").value;
  if (background == "") {
    addToMissingField("background, ");
  }
  // personality
  var personality = document.getElementById("personalityInput").value;
  if (personality == "") {
    addToMissingField("personality, ");
  }

  // class
  var classIndex = selectedClassIndex;
  var thisClass = "";
  if (classIndex === "") {
    addToMissingField("class, ");
  } else {
    thisClass = classesArray[classIndex].name;
  }
  // race
  var raceIndex = selectedRaceIndex;
  var thisRace = "";
  if (raceIndex === "") {
    addToMissingField("race, ");
  } else {
    thisRace = racesArray[raceIndex].name;
  }
  // alignment
  var alignmentChoice = alignmentSelect.value;
  var thisAlignment = "";
  if (alignmentChoice == "Select an Alignment") {
    addToMissingField("alignment, ");
  } else {
    thisAlignment = alignmentOptionsArray[alignmentSelect.value];
  }

  // // abilities scores
  var abilitiesInputArray = [];
  var abilities = [];
  for (i = 0; i < 6; i++) {
    var inputValue = parseInt(document.getElementById(i + "ability").value, 10);
    if (isNaN(inputValue)) {
      addToMissingField(abilitiesNamesArray[i] + ", ");
    } else {
      var raceModifierValue = parseInt(
        document.getElementById(i + "abilityRaceModifier").value,
        10
      );
      var abilityValue = inputValue + raceModifierValue;
      abilitiesInputArray[i] = abilityValue;
    }
  }
  abilities = abilitiesInputArray;
  // skills
  var chosenSkillsArray = [];
  var numAllowedSkills = 0;
  var skills = [];
  for (i = 0; i < numSkills; i++) {
    var chosenSkill = document.getElementById(i + "s").checked;
    if (chosenSkill == true) {
      var ind = 0;
      if (selectedClassIndex == 5) {
        ind = 2;
      }
      numAllowedSkills =
        classesArray[selectedClassIndex].proficiency_choices[ind].choose;
      var skillName =
        classesArray[selectedClassIndex].proficiency_choices[ind].from[i].name;
      skillName = skillName.substring(6);
      chosenSkillsArray.push(skillName);
    }
  }
  if (chosenSkillsArray.length != numAllowedSkills || numAllowedSkills == 0) {
    addToMissingField("(haven't selected enough skills), ");
  } else {
    skills = chosenSkillsArray;
  }
  // spells
  if (
    classIndex != 0 &&
    classIndex != 4 &&
    classIndex != 5 &&
    classIndex != 6 &&
    classIndex != 7 &&
    classIndex != 8
  ) {
    var classSpellIndex = 0;
    if (classIndex == 1 || classIndex == 2 || classIndex == 3) {
      classSpellIndex = classIndex - 1;
    } else if (classIndex == 9) {
      classSpellIndex = 3;
    } else if (classIndex == 10) {
      classSpellIndex = 4;
    } else {
      classSpellIndex = 5;
    }
    // cantrips
    var chosenCantrips = [];
    var cantrips = [];
    var numCantrips = arrayOfCantrips[classSpellIndex].length;
    var numChosenCantrips = numAllowedCantrips[classSpellIndex];
    for (i = 0; i < numCantrips; i++) {
      var chosenCantrip = document.getElementById(i + "sC").checked;
      if (chosenCantrip == true) {
        var cantripName = spellsArray[arrayOfCantrips[classSpellIndex][i]].name;
        chosenCantrips.push(cantripName);
      }
    }
    if (chosenCantrips.length != numChosenCantrips) {
      addToMissingField("(haven't selected enough cantrips), ");
    } else {
      cantrips = chosenCantrips;
    }
    //1st-lvl spells
    var chosenSpells = [];
    var spells = [];
    var num1stLevelSpells = arrayOf1stLevelSpells[classSpellIndex].length;
    var numChosen1stLevelSpells = numAllowedSpells[classSpellIndex];
    for (i = 0; i < num1stLevelSpells; i++) {
      var chosenSpell = document.getElementById(i + "sS").checked;
      if (chosenSpell == true) {
        var spellName =
          spellsArray[arrayOf1stLevelSpells[classSpellIndex][i]].name;
        chosenSpells.push(spellName);
      }
    }
    if (chosenSpells.length != numChosen1stLevelSpells) {
      addToMissingField("(haven't selected enough 1st-level spells), ");
    } else {
      spells = chosenSpells;
    }
  }
  //save
  if (missingField != "") {
    alert("You are missing the following inputs: " + missingField.slice(0, -2));
  } else {
    var mainCharacterContainer = document.getElementById(
      "mainCharacterContainer"
    );
    var characterForm = document.getElementById("newCharacterForm");
    var doubleCheck = confirm(
      "You cannot edit this character after saving it. Do you wish to proceed?"
    );
    if (doubleCheck == true) {
      mainCharacterContainer.removeChild(characterForm);
      var characterToSave = {
        name: name,
        ideals: ideals,
        bonds: bonds,
        flaws: flaws,
        background: background,
        personality: personality,
        race: thisRace,
        class: thisClass,
        classIndex: classIndex,
        raceIndex: raceIndex,
        alignment: thisAlignment,
        abilities: abilities,
        skills: skills,
        spells: { cantrips: cantrips, level1Spells: spells }
      };
      savedCharacters = JSON.parse(localStorage.getItem("saved-characters"));
      saveCharacterToStorage(characterToSave);
    } else {
      return;
    }
  }
}
//SAVE CHARACTER TO STORAGE
function saveCharacterToStorage(characterToSave) {
  if (savedCharacters != null) {
    savedCharacters.push(characterToSave);
  } else {
    savedCharacters = [];
    savedCharacters[0] = characterToSave;
  }
  localStorage.setItem("saved-characters", JSON.stringify(savedCharacters));
  localStoredCharacters = JSON.parse(localStorage.getItem("saved-characters"));
  console.log(localStoredCharacters);
  alert("Character has been saved");
}

//D6 Roller
function roll4D6() {
  var diceRollerTable = document.getElementById("diceRollerTable");
  diceRollerTable.style.visibility = "visible";
  document.getElementById("diceRollerButton").style.display = "none";
  //get all values
  var d6Array = [];
  var d6RowsArray = [];
  for (i = 0; i < 6; i++) {
    var d6ArrayInner = [];
    var d6Row = "";
    var highestVal = 0;
    for (j = 0; j < 4; j++) {
      var d6Roll = Math.floor(Math.random() * 6 + 1);
      d6ArrayInner[j] = d6Roll;
      if (j != 3) {
        d6Row = d6Row.concat(d6Roll + ", ");
      } else {
        d6Row = d6Row.concat(d6Roll);
      }
      highestVal = highestVal + d6Roll;
    }
    d6RowsArray[i] = d6Row;
    d6Array[i] = d6ArrayInner;
    var allRollsCell = document.getElementById(i + "allRolledValues");
    allRollsCell.textContent = d6Row;
    var min = Math.min(...d6Array[i]);
    highestVal = highestVal - min;
    var highestValueCell = document.getElementById(i + "highestValue");
    highestValueCell.textContent = highestVal;
  }
}

// GET SELECTED CLASS
var selectedClassIndex = "";
function reportSelectedClass() {
  var selection = document.getElementById("classesSelect");
  selection.addEventListener("change", function() {
    var classesIndex = selection.selectedIndex - 1; // 0 is placeholder, messes up order of function
    selectedClassIndex = classesIndex;
    alterForms(classesIndex);
    populateSkillsCheckboxes(classesIndex);
    populateSpellsSelect(classesIndex);
  });
}

function alterForms(selectedClass) {
  var classHasSpells = false;
  if (
    selectedClass != 0 &&
    selectedClass != 4 &&
    selectedClass != 5 &&
    selectedClass != 6 &&
    selectedClass != 7 &&
    selectedClass != 8
  ) {
    classHasSpells = true;
  }
  var checkboxesDiv = document.getElementById("checkboxesDiv");
  var spellsCantripsForm = document.getElementById("spellsCantripsForm");
  var choose1stLevelSpells = document.getElementById("choose1stLevelSpells");
  if (spellsCantripsForm !== null) {
    checkboxesDiv.removeChild(spellsCantripsForm);
  }
  if (choose1stLevelSpells !== null) {
    checkboxesDiv.removeChild(choose1stLevelSpells);
  }
  if (classHasSpells == true) {
    //cantrips choices
    spellsCantripsForm = document.createElement("form");
    spellsCantripsForm.setAttribute("id", "spellsCantripsForm");
    spellsCantripsForm.className = "characterCheckboxForm";
    checkboxesDiv.appendChild(spellsCantripsForm);
    //1st level spells choices
    choose1stLevelSpells = document.createElement("form");
    choose1stLevelSpells.setAttribute("id", "choose1stLevelSpells");
    choose1stLevelSpells.className = "characterCheckboxForm";
    checkboxesDiv.appendChild(choose1stLevelSpells);
    characterDiv.appendChild(checkboxesDiv);
  }
}

//skills checkboxes
var numAllowedSkills = "";
var numSkills = "";
function populateSkillsCheckboxes(selectedClass) {
  var skillsCheckboxes = document.getElementById("skillsCheckboxes");
  if (skillsCheckboxes != null) {
    skillsCheckboxes.innerHTML = "";
  }
  var ind = 0;
  if (selectedClass == 5) {
    ind = 2;
  }
  numAllowedSkills =
    classesArray[selectedClass].proficiency_choices[ind].choose;
  numSkills = classesArray[selectedClass].proficiency_choices[ind].from.length;
  var thisSkill;
  for (i = 0; i < numSkills + 1; i++) {
    if (i == 0) {
      var skillsTitle = document.createElement("div");
      skillsTitle.textContent = "Choose " + numAllowedSkills + " Skills";
      skillsTitle.style.fontWeight = "bold";
      skillsTitle.style.textDecoration = "underline";
      skillsCheckboxes.appendChild(skillsTitle);
    } else {
      thisSkill =
        classesArray[selectedClass].proficiency_choices[ind].from[i - 1].name;
      thisSkill = thisSkill.substring(6);
      var createSkills = document.createElement("span");
      var thisID = i - 1 + "s";
      var thisType = "0"; //needed for detecting too many checked items
      createSkills.innerHTML =
        "<input type='checkbox' id='" +
        thisID +
        "' name='skillsCheckbox' class='skillsCheckbox' onClick='limit(this.id, " +
        thisType +
        " )' /><label for='" +
        (i - 1) +
        "chkbox' class='checkboxLabel'>" +
        thisSkill +
        "</label><br />";
      skillsCheckboxes.appendChild(createSkills);
    }
  }
}

// num allowed
var numAllowedCantrips = ["2", "3", "2", "4", "2", "3"];
var numAllowedSpells = ["4", "2", "2", "2", "2", "6"];
//checkboxes for cantrips and 1st level spells
function populateSpellsSelect(selectedClass) {
  var classHasSpells = false;
  spellsCantripsForm = document.getElementById("spellsCantripsForm");
  if (spellsCantripsForm != null) {
    spellsCantripsForm.innerHTML = "";
  }
  choose1stLevelSpells = document.getElementById("choose1stLevelSpells");
  if (choose1stLevelSpells != null) {
    choose1stLevelSpells.innerHTML = "";
  }
  if (
    selectedClass != 0 &&
    selectedClass != 4 &&
    selectedClass != 5 &&
    selectedClass != 6 &&
    selectedClass != 7 &&
    selectedClass != 8
  ) {
    classHasSpells = true;
  }
  if (classHasSpells == true) {
    var classSpellIndex = 0;
    if (selectedClass == 1 || selectedClass == 2 || selectedClass == 3) {
      classSpellIndex = selectedClass - 1;
    } else if (selectedClass == 9) {
      classSpellIndex = 3;
    } else if (selectedClass == 10) {
      classSpellIndex = 4;
    } else {
      classSpellIndex = 5;
    }
    //cantrips
    var cantripsTitle = document.createElement("div");
    cantripsTitle.textContent =
      "Choose " + numAllowedCantrips[classSpellIndex] + " Cantrips";
    cantripsTitle.style.fontWeight = "bold";
    cantripsTitle.style.textDecoration = "underline";
    spellsCantripsForm.appendChild(cantripsTitle);
    for (i = 0; i < arrayOfCantrips[classSpellIndex].length; i++) {
      var cantripCheckbox = document.createElement("span");
      var thisID = i + "sC";
      var thisType = "1." + numAllowedCantrips[classSpellIndex];
      var thisCantrip = spellsArray[arrayOfCantrips[classSpellIndex][i]].name;
      cantripCheckbox.innerHTML =
        "<input type='checkbox' id='" +
        thisID +
        "' name='cantripCheckbox' class='cantripCheckbox' onClick='limit(this.id, " +
        thisType +
        ", " +
        classSpellIndex +
        " )' /><label for='" +
        i +
        "chkbox' class='checkboxLabel'>" +
        thisCantrip +
        "</label><br />";
      spellsCantripsForm.appendChild(cantripCheckbox);
    }
    //1st level spells
    var spellsTitle = document.createElement("div");
    spellsTitle.textContent =
      "Choose " + numAllowedSpells[classSpellIndex] + " 1st-Level Spells";
    spellsTitle.style.fontWeight = "bold";
    spellsTitle.style.textDecoration = "underline";
    choose1stLevelSpells.appendChild(spellsTitle);
    for (i = 0; i < arrayOf1stLevelSpells[classSpellIndex].length; i++) {
      var spellCheckbox = document.createElement("span");
      var thisID = i + "sS";
      var thisType = "2." + numAllowedSpells[classSpellIndex];
      var thisSpell =
        spellsArray[arrayOf1stLevelSpells[classSpellIndex][i]].name;
      spellCheckbox.innerHTML =
        "<input type='checkbox' id='" +
        thisID +
        "' name='spellCheckbox' class='spellCheckbox' onClick='limit(this.id, " +
        thisType +
        ", " +
        classSpellIndex +
        " )' /><label for='" +
        i +
        "chkbox' class='checkboxLabel'>" +
        thisSpell +
        "</label><br />";
      choose1stLevelSpells.appendChild(spellCheckbox);
    }
  }
}

// GET SELECTED RACE
var selectedRaceIndex = "";
function reportSelectedRace() {
  var selection = document.getElementById("racesSelect");
  selection.addEventListener("change", function() {
    var racesIndex = selection.selectedIndex - 1; // 0 is placeholder, messes up order of function
    selectedRaceIndex = racesIndex;
    populateAbilitiiesRaceModifier(racesIndex);
  });
}

//ability score race modifier
function populateAbilitiiesRaceModifier(racesIndex) {
  var abilityModifier = racesArray[racesIndex].ability_bonuses;
  for (i = 0; i < 6; i++) {
    var modInd = i + "abilityRaceModifier";
    document.getElementById(modInd).value = abilityModifier[i];
  }
}

//CHECKBOX LIMITER
function limit(clickedID, thisType, classSpellIndex) {
  var idExtension;
  var numAllowed;
  var numOptions;
  var message = "You are only allowed to choosen too many ";
  var thisType = thisType + "";
  thisTypeClean = thisType.charAt(0);
  thisTypeEnding = thisType.charAt(2, 4);
  //skills
  if (thisTypeClean == 0) {
    idExtension = "s";
    numAllowed = numAllowedSkills;
    numOptions = numSkills;
    message = message + "skills";
  } else if (thisTypeClean == 1) {
    idExtension = "sC";
    numAllowed = thisTypeEnding;
    numOptions = arrayOfCantrips[classSpellIndex].length;
    message = message + "cantrips";
  } else if (thisTypeClean == 2) {
    idExtension = "sS";
    numAllowed = thisTypeEnding;
    numOptions = arrayOf1stLevelSpells[classSpellIndex].length;
    message = message + "cantrips";
  }
  var limitCounter = 0;
  for (i = 0; i < numOptions; i++) {
    var checkCheckboxes = document.getElementById(i + idExtension).checked;
    if (checkCheckboxes == true) {
      limitCounter += 1;
    }
  }
  if (limitCounter > numAllowed) {
    document.getElementById(clickedID).checked = false;
    console.log(message);
  }
}

//SHOW SAVED CHARACTERS
function showSavedCharacters() {
  document.getElementById("introCharDiv").style.display = "none";
  var mainCharacterContainer = document.getElementById(
    "mainCharacterContainer"
  );
  var savedCharacters = JSON.parse(localStorage.getItem("saved-characters"));
  console.log(savedCharacters);
  if (savedCharacters == null) {
    alert("You have no saved characters");
  } else {
    var savedTableCheck = document.getElementById("savedCharacterTable");
    if (savedTableCheck !== null) {
      mainCharacterContainer.removeChild(savedTableCheck);
    }
    var newCharacterCheck = document.getElementById("newCharacterForm");
    if (newCharacterCheck !== null) {
      var doubleCheck = confirm(
        "Switching to this page will delete the character that you are currently working on. Do you wish to proceed?"
      );
      if (doubleCheck == true) {
        mainCharacterContainer.removeChild(newCharacterCheck);
      } else {
        return;
      }
    }
    mainCharacterContainer = document.getElementById("mainCharacterContainer");
    var doubleCheck = document.getElementById("mainSavedCharDiv");
    if (doubleCheck != null) {
      mainCharacterContainer.removeChild(doubleCheck);
    }
    mainSavedCharDiv = document.createElement("div");
    mainSavedCharDiv.className = "mainSavedCharDiv";
    mainSavedCharDiv.setAttribute("id", "mainSavedCharDiv");
    mainCharacterContainer.appendChild(mainSavedCharDiv);
    for (i = 0; i < savedCharacters.length; i++) {
      savedCharEntryDiv = document.createElement("div");
      savedCharEntryDiv.setAttribute("id", i + "savedCharDiv");
      savedCharEntryDiv.style.backgroundColor = "white";
      savedCharEntryDiv.className = "savedCharDiv";
      savedCharEntryDiv.addEventListener("click", expandSavedCharacter);
      //saved char entry
      savedCharEntry = document.createElement("div");
      savedCharEntry.className = "savedCharEntry";
      savedCharEntry.setAttribute("id", i + "savedChar");
      //char expand button
      savedCharExpandButton = document.createElement("div");
      savedCharExpandButton.className = "savedCharButton arrowRight";
      savedCharExpandButton.setAttribute("id", i + "expandButton");
      savedCharEntry.appendChild(savedCharExpandButton);
      //char entry name
      savedCharEntryName = document.createElement("div");
      savedCharEntryName.className = "savedCharEntryName";
      savedCharEntryName.textContent = savedCharacters[i].name.trim();
      savedCharEntry.appendChild(savedCharEntryName);
      savedCharEntryDiv.appendChild(savedCharEntry);
      // char desc
      //outer div
      savedCharDescMainDiv = document.createElement("div");
      savedCharDescMainDiv.className = "mainDescDiv";
      savedCharDescMainDiv.setAttribute("id", i + "mainDescDiv");
      //inner div
      savedCharDescDiv = document.createElement("div");
      savedCharDescDiv.className = "descDiv";
      //--1st row start--//
      firstRowDiv = document.createElement("div");
      firstRowDiv.className = "firstRowDiv";
      //name
      firstRowName = document.createElement("div");
      firstRowName.className = "firstRowItem";
      firstRowNameTitle = document.createElement("div");
      firstRowNameTitle.className = "firstRowTitle";
      firstRowNameTitle.textContent = "Name";
      firstRowName.appendChild(firstRowNameTitle);
      firstRowNameContent = document.createElement("div");
      firstRowNameContent.className = "firstRowContent";
      firstRowNameContent.textContent = savedCharacters[i].name.trim();
      firstRowName.appendChild(firstRowNameContent);
      firstRowDiv.appendChild(firstRowName);
      //class
      firstRowClass = document.createElement("div");
      firstRowClass.className = "firstRowItem";
      firstRowClassTitle = document.createElement("span");
      firstRowClassTitle.className = "firstRowTitle";
      firstRowClassTitle.textContent = "Class";
      firstRowClass.appendChild(firstRowClassTitle);
      firstRowClassContent = document.createElement("span");
      firstRowClassContent.className = "firstRowContent";
      firstRowClassContent.textContent = savedCharacters[i].class;
      firstRowClass.appendChild(firstRowClassContent);
      firstRowDiv.appendChild(firstRowClass);
      //race
      firstRowRace = document.createElement("div");
      firstRowRace.className = "firstRowItem";
      firstRowRaceTitle = document.createElement("span");
      firstRowRaceTitle.className = "firstRowTitle";
      firstRowRaceTitle.textContent = "Race";
      firstRowRace.appendChild(firstRowRaceTitle);
      firstRowRaceContent = document.createElement("span");
      firstRowRaceContent.className = "firstRowContent";
      firstRowRaceContent.textContent = savedCharacters[i].race;
      firstRowRace.appendChild(firstRowRaceContent);
      firstRowDiv.appendChild(firstRowRace);
      //alignment
      firstRowAlignment = document.createElement("div");
      firstRowAlignment.className = "firstRowItem";
      firstRowAlignmentTitle = document.createElement("span");
      firstRowAlignmentTitle.className = "firstRowTitle";
      firstRowAlignmentTitle.textContent = "Alignment";
      firstRowAlignment.appendChild(firstRowAlignmentTitle);
      firstRowAlignmentContent = document.createElement("span");
      firstRowAlignmentContent.className = "firstRowContent";
      firstRowAlignmentContent.textContent = savedCharacters[i].alignment;
      firstRowAlignment.appendChild(firstRowAlignmentContent);
      firstRowDiv.appendChild(firstRowAlignment);
      savedCharDescDiv.appendChild(firstRowDiv);
      //--1st row end--//
      //--2nd row start--//
      secondRowDiv = document.createElement("div");
      secondRowDiv.className = "secondRowDiv";

      //--1st col start--//
      firstColDiv = document.createElement("div");
      firstColDiv.className = "firstColDiv";
      //abilities start
      //abilities column div
      savedCharAbilitiesColumn = document.createElement("div");
      savedCharAbilitiesColumn.className = "savedCharAbilitiesColumn";
      //ability div
      for (j = 0; j < 6; j++) {
        //individual abl div
        savedCharAbilityDiv = document.createElement("div");
        savedCharAbilityDiv.className = "savedCharAbilityDiv";
        //abl mod
        savedCharAbilityMod = document.createElement("div");
        savedCharAbilityMod.textContent = Math.floor(
          (savedCharacters[i].abilities[j] - 10) / 2
        );
        savedCharAbilityMod.className = "savedCharAbilityMod";
        savedCharAbilityDiv.appendChild(savedCharAbilityMod);
        //abl score
        savedCharAbilityScore = document.createElement("div");
        savedCharAbilityScore.textContent = savedCharacters[i].abilities[j];
        savedCharAbilityScore.className = "savedCharAbilityScore";
        savedCharAbilityDiv.appendChild(savedCharAbilityScore);
        //abl name
        savedCharAbilityName = document.createElement("div");
        savedCharAbilityName.textContent = abilitiesNamesArray[j];
        savedCharAbilityName.className = "savedCharAbilityName";
        savedCharAbilityDiv.appendChild(savedCharAbilityName);
        savedCharAbilitiesColumn.appendChild(savedCharAbilityDiv);
      }
      firstColDiv.appendChild(savedCharAbilitiesColumn);
      secondRowDiv.appendChild(firstColDiv);
      //abilities end
      //--1st col end--//
      //--2nd col start--//
      secondColDiv = document.createElement("div");
      secondColDiv.className = "secondColDiv";
      //background and personality start
      savedCharBackAndPersDiv = document.createElement("div");
      savedCharBackAndPersDiv.className = "savedCharBackAndPersDiv";
      //background
      savedCharBackDiv = document.createElement("div");
      savedCharBackDiv.className = "savedCharBackDiv";
      savedCharBackTitle = document.createElement("div");
      savedCharBackTitle.className = "savedCharTitle";
      savedCharBackTitle.textContent = "Background";
      savedCharBackDiv.appendChild(savedCharBackTitle);
      savedCharBackContent = document.createElement("div");
      savedCharBackContent.className = "savedCharContent";
      savedCharBackContent.textContent = savedCharacters[i].background;
      savedCharBackDiv.appendChild(savedCharBackContent);
      savedCharBackAndPersDiv.appendChild(savedCharBackDiv);
      //personality
      savedCharPersDiv = document.createElement("div");
      savedCharPersDiv.className = "savedCharPersDiv";
      savedCharPersTitle = document.createElement("div");
      savedCharPersTitle.className = "savedCharTitle";
      savedCharPersTitle.textContent = "Personality";
      savedCharPersDiv.appendChild(savedCharPersTitle);
      savedCharPersContent = document.createElement("div");
      savedCharPersContent.className = "savedCharContent";
      savedCharPersContent.textContent = savedCharacters[i].personality;
      savedCharPersDiv.appendChild(savedCharPersContent);
      savedCharBackAndPersDiv.appendChild(savedCharPersDiv);
      secondColDiv.appendChild(savedCharBackAndPersDiv);
      //background and personality end
      //ideals, flaws, and bonds start
      savedCharIFBDiv = document.createElement("div");
      savedCharIFBDiv.className = "savedCharIFBDiv";
      //ideals
      savedCharIdealsDiv = document.createElement("div");
      savedCharIdealsDiv.className = "savedCharIdealsDiv";
      savedCharIdealsTitle = document.createElement("div");
      savedCharIdealsTitle.className = "savedCharTitle";
      savedCharIdealsTitle.textContent = "Ideals";
      savedCharIdealsDiv.appendChild(savedCharIdealsTitle);
      savedCharIdealsContent = document.createElement("div");
      savedCharIdealsContent.className = "savedCharContent";
      savedCharIdealsContent.textContent = savedCharacters[i].ideals;
      savedCharIdealsDiv.appendChild(savedCharIdealsContent);
      savedCharIFBDiv.appendChild(savedCharIdealsDiv);
      //flaws
      savedCharFlawsDiv = document.createElement("div");
      savedCharFlawsDiv.className = "savedCharFlawsDiv";
      savedCharFlawsTitle = document.createElement("div");
      savedCharFlawsTitle.className = "savedCharTitle";
      savedCharFlawsTitle.textContent = "Flaws";
      savedCharFlawsDiv.appendChild(savedCharFlawsTitle);
      savedCharFlawsContent = document.createElement("div");
      savedCharFlawsContent.className = "savedCharContent";
      savedCharFlawsContent.textContent = savedCharacters[i].flaws;
      savedCharFlawsDiv.appendChild(savedCharFlawsContent);
      savedCharIFBDiv.appendChild(savedCharFlawsDiv);
      //bonds
      savedCharBondsDiv = document.createElement("div");
      savedCharBondsDiv.className = "savedCharBondsDiv";
      savedCharBondsTitle = document.createElement("div");
      savedCharBondsTitle.className = "savedCharTitle";
      savedCharBondsTitle.textContent = "Bonds";
      savedCharBondsDiv.appendChild(savedCharBondsTitle);
      savedCharBondsContent = document.createElement("div");
      savedCharBondsContent.className = "savedCharContent";
      savedCharBondsContent.textContent = savedCharacters[i].bonds;
      savedCharBondsDiv.appendChild(savedCharBondsContent);
      savedCharIFBDiv.appendChild(savedCharBondsDiv);
      secondColDiv.appendChild(savedCharIFBDiv);
      //ideals, flaws, and bonds end
      //proficiencies and skills start
      savedCharProfAndSkills = document.createElement("div");
      savedCharProfAndSkills.className = "savedCharProfAndSkills";
      //proficiencies
      savedCharProfDiv = document.createElement("div");
      savedCharProfDiv.className = "savedCharProfDiv";
      savedCharProfTitle = document.createElement("div");
      savedCharProfTitle.className = "savedCharTitle";
      savedCharProfTitle.textContent = "Proficiencies";
      savedCharProfDiv.appendChild(savedCharProfTitle);
      savedCharProfContent = document.createElement("div");
      savedCharProfContent.className = "savedCharContent";
      var numProf =
        classesArray[savedCharacters[i].classIndex].proficiencies.length;
      for (j = 0; j < numProf; j++) {
        savedCharProf = document.createElement("div");
        savedCharProf.className = "savedCharProf";
        savedCharProf.textContent =
          "- " +
          classesArray[savedCharacters[i].classIndex].proficiencies[j].name;
        savedCharProfContent.appendChild(savedCharProf);
      }
      savedCharProfDiv.appendChild(savedCharProfContent);
      savedCharProfAndSkills.appendChild(savedCharProfDiv);
      //skills
      savedCharSkillsDiv = document.createElement("div");
      savedCharSkillsDiv.className = "savedCharSkillsDiv";
      savedCharSkillsTitle = document.createElement("div");
      savedCharSkillsTitle.className = "savedCharTitle";
      savedCharSkillsTitle.textContent = "Skills";
      savedCharSkillsDiv.appendChild(savedCharSkillsTitle);
      savedCharSkillsContent = document.createElement("div");
      savedCharSkillsContent.className = "savedCharContent";
      var numSkills = savedCharacters[i].skills.length;
      for (j = 0; j < numSkills; j++) {
        savedCharSkill = document.createElement("div");
        savedCharSkill.className = "savedCharSkills";
        savedCharSkill.textContent = "- " + savedCharacters[i].skills[j];
        savedCharSkillsContent.appendChild(savedCharSkill);
      }
      savedCharSkillsDiv.appendChild(savedCharSkillsContent);
      savedCharProfAndSkills.appendChild(savedCharSkillsDiv);
      secondColDiv.appendChild(savedCharProfAndSkills);
      //proficiencies and skills end
      //--2nd row end--//
      //--spellRowDiv start--//
      if (
        savedCharacters[i].classIndex != 0 &&
        savedCharacters[i].classIndex != 4 &&
        savedCharacters[i].classIndex != 5 &&
        savedCharacters[i].classIndex != 6 &&
        savedCharacters[i].classIndex != 7 &&
        savedCharacters[i].classIndex != 8
      ) {
        spellRowDiv = document.createElement("div");
        spellRowDiv.className = "spellRowDiv";
        //cantrips
        savedCharCanDiv = document.createElement("div");
        savedCharCanDiv.className = "savedCharCanDiv";
        savedCharCanTitle = document.createElement("div");
        savedCharCanTitle.className = "savedCharSpellsTitle";
        savedCharCanTitle.textContent = "Cantrips";
        savedCharCanDiv.appendChild(savedCharCanTitle);
        for (j = 0; j < savedCharacters[i].spells.cantrips.length; j++) {
          savedCharCan = document.createElement("div");
          savedCharCan.className = "savedCharSpellsContent";
          savedCharCan.textContent = savedCharacters[i].spells.cantrips[j];
          savedCharCanDiv.appendChild(savedCharCan);
        }
        spellRowDiv.appendChild(savedCharCanDiv);
        //spells
        savedCharLevel1SpellsDiv = document.createElement("div");
        savedCharLevel1SpellsDiv.className = "savedCharLevel1SpellsDiv";
        savedCharLevel1SpellsTitle = document.createElement("div");
        savedCharLevel1SpellsTitle.className = "savedCharSpellsTitle";
        savedCharLevel1SpellsTitle.textContent = "1st Level Spells";
        savedCharLevel1SpellsDiv.appendChild(savedCharLevel1SpellsTitle);
        for (j = 0; j < savedCharacters[i].spells.level1Spells.length; j++) {
          savedCharLevel1Spell = document.createElement("div");
          savedCharLevel1Spell.className = "savedCharSpellsContent";
          savedCharLevel1Spell.textContent =
            savedCharacters[i].spells.level1Spells[j];
          savedCharLevel1SpellsDiv.appendChild(savedCharLevel1Spell);
        }
        spellRowDiv.appendChild(savedCharLevel1SpellsDiv);
        secondColDiv.appendChild(spellRowDiv);
      }
      //--spellRowDiv end--//
      secondRowDiv.appendChild(secondColDiv);
      savedCharDescDiv.appendChild(secondRowDiv);
      savedCharDescMainDiv.appendChild(savedCharDescDiv);
      savedCharEntryDiv.appendChild(savedCharDescMainDiv);
      mainSavedCharDiv.appendChild(savedCharEntryDiv);
      //--2nd col end--//
    }
  }
}
//EXPAND BUTTON FUNCTION
function expandSavedCharacter() {
  var charIndex = this.id.slice(0, -12);
  var thisDescRow = document.getElementById(charIndex + "mainDescDiv");
  thisDescRow.classList.toggle("showMainDescDiv");
  var savedCharDiv = document.getElementById(charIndex + "savedCharDiv");
  if (savedCharDiv.style.backgroundColor == "white") {
    savedCharDiv.style.backgroundColor = "maroon";
    savedCharDiv.style.transition = "all 500ms";
  } else {
    savedCharDiv.style.backgroundColor = "white";
    savedCharDiv.style.transition = "all 500ms";
  }
  var arrowRight = document.getElementById(charIndex + "expandButton");
  arrowRight.classList.toggle("arrowDown");
}
// ------------- //
// CHARACTER END //
// ------------- //

//////////////////////

// ----------------- //
// DICE ROLLER START //
// ----------------- //

function d20roll() {
  var d20rollResult = document.getElementById("d20rollResult");
  var d20Die = Math.floor(Math.random() * 20 + 1);
  d20rollResult.innerHTML = d20Die;
}

function d12roll() {
  var d12rollResult = document.getElementById("d12rollResult");
  var d12Die = Math.floor(Math.random() * 12 + 1);
  d12rollResult.innerHTML = d12Die;
}

function d10roll() {
  var d10rollResult = document.getElementById("d10rollResult");
  var d10Die = Math.floor(Math.random() * 10 + 1);
  d10rollResult.innerHTML = d10Die;
}

function d8roll() {
  var d8rollResult = document.getElementById("d8rollResult");
  var d8Die = Math.floor(Math.random() * 8 + 1);
  d8rollResult.innerHTML = d8Die;
}

function d6roll() {
  var d6rollResult = document.getElementById("d6rollResult");
  var d6Die = Math.floor(Math.random() * 6 + 1);
  d6rollResult.innerHTML = d6Die;
}

function d4roll() {
  var d4rollResult = document.getElementById("d4rollResult");
  var d4Die = Math.floor(Math.random() * 4 + 1);
  d4rollResult.innerHTML = d4Die;
}

// --------------- //
// DICE ROLLER END //
// --------------- //

// CLEANER BUT SLOWER LOAD SPELLS
// var url = "https://api.open5e.com/spells/";
// function loadSpells() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.open("GET", url, true);
//   xhttp.onload = function() {
//     var allSpells = JSON.parse(this.response);
//     if (xhttp.status >= 200 && xhttp.status < 400) {
//       console.log(allSpells);
//       for (i = 0; i < allSpells.results.length; i++) {
//         spellsArray = spellsArray.concat(allSpells.results[i]);
//       }
//       url = allSpells.next;
//     } else {
//       console.log("error");
//     }
//     if (url != null) {
//       loadSpells();
//     }
//   };
//   xhttp.send();
// }

// TITLECASE FUNCTION
// function titleCase() {
//   var splitStr = spellSearchInput.value.toLowerCase().split(" ");
//   for (var i = 0; i < splitStr.length; i++) {
//     splitStr[i] =
//       splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
//   }
//   spellToSearch = splitStr.join(" ");
//   return spellToSearch;
// }

// TBODY SPELL NAME FOR SAVED SPELLS
//   if (k == 0) {
//     if (j == 0) {
//       cellContent = document.createElement("span");
//       cellContent.className = "savedSpellsHeadersClass";
//       cellContent.textContent = "MAGIC BITCH";
//       cellContent.style.fontWeight = "bold";
//       cell.appendChild(cellContent);
//       row.appendChild(cell);
//     } else if (j == 1) {
//       cellContent = document.createElement("span");
//       cellContent.className = "savedSpellsHeadersClass";
//       cellContent.textContent = savedSpellsContentArray[k];
//       cellContent.style.fontWeight = "bold";
//       cell.appendChild(cellContent);
//       row.appendChild(cell);
//     } else {
//       cellContent = document.createElement("input");
//       cellContent.className = "savedSpellsHeadersClass";
//       cellContent.setAttribute("id", i + "-removeSpellButtonID");
//       cellContent.setAttribute("type", "button");
//       cellContent.value = "Remove";
//       cellContent.addEventListener(
//         "click",
//         localStorageDeleteSpell
//       );
//       cell.appendChild(cellContent);
//       row.appendChild(cell);
//     }
//   }

// WEBDEV API SAVE SPELLS
// function addToSavedSpells() {
//     var idToSave = this.id;
//     if (idToSave == null) {
//       idToSave = document.getElementsByClassName("modalSaveSpellButton")[0].id;
//     }
//     idToSave = idToSave.slice(0, -18);
//     if (savedSpellsIDs.includes(idToSave)) {
//       alert("Spell not added because it is already in your saved spells");
//     } else {
//       data = {
//         text: idToSave
//       };
//       var xhttpSaveSpell = new XMLHttpRequest();
//       xhttpSaveSpell.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//           var spell = JSON.parse(this.responseText);
//         } else if (this.readyState == 4) {
//           console.log(this.responseText);
//         }
//       };
//       xhttpSaveSpell.open("POST", "https://cse204.work/todos", true);
//       xhttpSaveSpell.setRequestHeader("Content-type", "application/json");
//       xhttpSaveSpell.setRequestHeader(
//         "x-api-key",
//         "7d57e1-02d430-38464e-681980-725d2a"
//       );
//       xhttpSaveSpell.send(JSON.stringify(data));
//     }
//   }

// WEBDEV API GET SAVED SPELLS
// xhttpGetSpells = new XMLHttpRequest();
// xhttpGetSpells.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var indices = JSON.parse(this.responseText);
//     // console.log(indices);
//     for (i = 0; i < indices.length; i++) {
//       savedSpellsIDs[i] = indices[i].text;
//     }
//   } else if (this.readyState == 4) {
//     console.log(this.responseText);
//   }
// };
// xhttpGetSpells.open("GET", "https://cse204.work/todos", true);
// xhttpGetSpells.setRequestHeader(
//   "x-api-key",
//   "7d57e1-02d430-38464e-681980-725d2a"
// );
// xhttpGetSpells.send();

// WEBDEV API DELETE FUNCTION
// var xhttpDeleteSpell = new XMLHttpRequest();
// function deleteFunction() {
//   del_id = this.id;
//   console.log(del_id);
//   id = del_id.slice(0, -5);
//   xhttp4.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       var todo = JSON.parse(this.responseText);
//       console.log(todo);
//       function deleteRow() {
//         var rowID = id + "_rwID";
//         var row = document.getElementById(rowID);
//         row.parentNode.removeChild(row);
//       }
//       deleteRow();
//     } else if (this.readyState == 4) {
//       console.log(this.responseText);
//     }
//   };
//   xhttp4.open("DELETE", "https://cse204.work/todos/" + id, true);
//   xhttp4.setRequestHeader("Content-type", "application/json");
//   xhttp4.setRequestHeader("x-api-key", "bad20c-1a6d51-21ea66-c29f0b-ca01be");
//   xhttp4.send();
//   console.log(id_array.length);
// }

// LOAD CLASSES (OLD API)
// function loadClasses() {
//   if (checkForLocalClasses != null && checkForLocalClasses.length == 12) {
//     for (i = 0; i < checkForLocalClasses.length; i++) {
//       classesArray[i] = checkForLocalClasses[i];
//     }
//     console.log("local data being used - classes");
//     console.log("classes array: ", classesArray);
//   } else {
//     console.log("API data being used - classes");
//     var xhttpClasses = new XMLHttpRequest();
//     xhttpClasses.open("GET", "https://api.open5e.com/classes/", true);
//     xhttpClasses.onload = function() {
//       var allClasses = JSON.parse(this.response);
//       if (xhttpClasses.status >= 200 && xhttpClasses.status < 400) {
//         console.log(allClasses);
//         for (i = 0; i < allClasses.results.length; i++) {
//           classesArray = classesArray.concat(allClasses.results[i]);
//         }
//       } else {
//         console.log("error");
//       }
//       saveAllClassesToLocal();
//     };
//     xhttpClasses.send();
//   }
// }

// //LOAD RACES (OLD API)
// function loadRaces() {
//   if (checkForLocalRaces != null && checkForLocalRaces.length == 9) {
//     for (i = 0; i < checkForLocalRaces.length; i++) {
//       racesArray[i] = checkForLocalRaces[i];
//     }
//     console.log("local data being used - races");
//     console.log("races array: ", racesArray);
//   } else {
//     console.log("API data being used - races");
//     var xhttpRaces = new XMLHttpRequest();
//     xhttpRaces.open("GET", "https://api.open5e.com/races/", true);
//     xhttpRaces.onload = function() {
//       var allRaces = JSON.parse(this.response);
//       if (xhttpRaces.status >= 200 && xhttpRaces.status < 400) {
//         console.log(allRaces);
//         for (i = 0; i < allRaces.results.length; i++) {
//           racesArray = racesArray.concat(allRaces.results[i]);
//         }
//       } else {
//         console.log("error");
//       }
//       saveAllRacesToLocal();
//     };
//     xhttpRaces.send();
//   }
// }
// NOTE: OLD API REQUIRES USE OF THIS TYPE OF FUNCTION:
// SAVE RACES TO LOCAL STORAGE
// function saveAllRacesToLocal() {
//   if (racesArray.length == 9) {
//     localStorage.setItem("all-races-array", JSON.stringify(racesArray));
//   } else {
//     setTimeout(saveAllRacesToLocal, 100);
//   }
// }
