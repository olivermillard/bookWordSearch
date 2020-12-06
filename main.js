//Global Variables
var fileSelector;
var searchInput;
var searchMessage;
var sentencesDisplayContainer;
var finalString = "";
var pageCounter = 0;
var pagesPromises = [];
var numberOfPages = 0;
var wordCounter = 0;
var indexArray = [];
var sentences = [];
var startEndIndices = [];
var recordedPages = [];
var dividedByPages = [];
//

var myState = {
  pdf: null,
  currentPage: 1,
  zoom: 1,
};

function searchFunc() {
  fileSelector = document.getElementById("fileSelector");
  searchInput = document.getElementById("wordInput");
  searchMessage = document.getElementById("searchMessage");
  sentencesDisplayContainer = document.getElementById(
    "sentencesDisplayContainer"
  );
  if (fileSelector.value.length != 0 && searchInput.value.length != 0) {
    //check for pdf
    var allowedExtensions = /(\.pdf)$/i;
    //if not a pdf
    if (!allowedExtensions.exec(fileSelector.value)) {
      alert("Invalid File Type: Uploaded File must be a PDF");
      fileSelector.value = "";
      return false;
    }
    //if pdf
    else {
      getPDF();
    }
  }
  // accounts for no inputs
  else {
    var fileCheck = 0;
    var searchCheck = 0;
    if (fileSelector.value.length == 0) {
      fileCheck = 1;
    }
    if (searchCheck.value.length == 0) {
      searchCheck = 1;
    }
    if (fileCheck == 1 && searchCheck == 1) {
      alert("No file has been uploaded and no word has been inputted");
    } else {
      if (fileCheck == 1 && searchCheck == 0) {
        alert("No file has been uploaded");
      } else {
        alert("No word has been inputted");
      }
    }
  }
}

function getPDF() {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//mozilla.github.io/pdf.js/build/pdf.worker.js";
  var file = fileSelector.files[0];
  var fileReader = new FileReader();
  fileReader.onload = function() {
    var typedarray = new Uint8Array(this.result);
    var loadingTask = pdfjsLib.getDocument(typedarray);
    pdfjsLib.getDocument(typedarray);
    loadingTask.promise.then((pdf) => {
      console.log("the pdf has ", pdf.numPages, "page(s).");
      var pdfDocument = pdf;
      pdf.getPage(pdf.numPages).then(function(page) {
        numberOfPages = pdf.numPages;
        for (var i = 0; i < pdf.numPages; i++) {
          (function(pageNumber) {
            pagesPromises.push(getPageText(pageNumber, pdfDocument));
          })(i + 1);
        }
        myState.pdf = pdf;
      });
    });
  };
  fileReader.readAsArrayBuffer(file);
}
var pdfDoc;
function render(pageNum) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//mozilla.github.io/pdf.js/build/pdf.worker.js";
  var file = fileSelector.files[0];
  var fileReader = new FileReader();
  fileReader.onload = function() {
    var typedarray = new Uint8Array(this.result);
    var loadingTask = pdfjsLib.getDocument(typedarray);
    pdfjsLib.getDocument(typedarray);
    loadingTask.promise.then((pdf) => {
      pdf.getPage(pageNum).then(function(page) {
        numberOfPages = pdf.numPages;
        myState.pdf = pdf;
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    });
  };
  fileReader.readAsArrayBuffer(file);
  // var scale = 1.5;
  // var viewport = page.getViewport({ scale: scale });
  // // Prepare canvas using PDF page dimensions
  // var canvas = document.getElementById("canvas");
  // var context = canvas.getContext("2d");
  // canvas.height = viewport.height;
  // canvas.width = viewport.width;
  // // Render PDF page into canvas context
  // var renderContext = {
  //   canvasContext: context,
  //   viewport: viewport,
  // };
  // var renderTask = page.render(renderContext);
  // renderTask.promise.then(function() {
  //   console.log("Page rendered");
  // });
}

function getPageText(pageNum, PDFDocumentInstance) {
  finalString = "";
  dividedByPages = [];
  return new Promise(function(resolve, reject) {
    PDFDocumentInstance.getPage(pageNum).then(function(pdfPage) {
      pdfPage.getTextContent().then(function(textContent) {
        var textItems = textContent.items;
        var pageText = "";
        for (var i = 0; i < textItems.length; i++) {
          var item = textItems[i];
          finalString += item.str + " ";
          pageText += item.str + " ";
        }
        dividedByPages.push(pageText);
        //pdf.getPage(pdf.numPages).then(function(page)
        resolve(finalString);
        pageCounter += 1;
        searchMessage.textContent =
          "Processing page number " +
          pageCounter +
          " of " +
          numberOfPages +
          " total pages";
        //console.log(pageCounter, numberOfPages);
        if (pageCounter == numberOfPages) {
          findWords(finalString);
        }
      });
    });
  });
}

function findWords(finalString) {
  wordCounter = 0;
  pageCounter = 0;
  var indices = 0;
  var rawWord = searchInput.value;
  indices = getIndicesOf(rawWord, finalString, false);
}

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  var originalStr = str;
  var originalSearchStr = searchStr;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
    wordCounter += 1;
  }
  getPages(originalSearchStr, indices);
  findSentence(originalStr, originalSearchStr, indices);
  searchMessage.textContent =
    "The word '" +
    originalSearchStr +
    "' appeared " +
    wordCounter +
    " number of times in the PDF ";
  return indices;
}

function getPages(originalSearchStr, indices) {
  recordedPages = [];
  for (var i = 0; i < dividedByPages.length; i++) {
    //console.log(dividedByPages[i]);
    var str = dividedByPages[i].toLowerCase();
    var searchStr = originalSearchStr.toLowerCase();
    var searchStrLen = searchStr.length;
    var startIndex = 0,
      index,
      indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
      recordedPages.push(i);
    }
  }
  console.log(recordedPages.length);
}

function findSentence(originalStr, originalSearchStr, indices) {
  sentences = [];
  startEndIndices = [];
  for (var i = 0; i < indices.length; i++) {
    var sentBeg = 0;
    var sentEnd = 0;
    var sentBegPeriod = 0;
    var sentEndPeriod = 0;
    var sentBegExcl = 0;
    var sentEndExcl = 0;
    var sentBegQues = 0;
    var sentEndQues = 0;
    sentBegPeriod = originalStr.lastIndexOf(".", indices[i]) + 1;
    sentBegExcl = originalStr.lastIndexOf("!", indices[i]) + 1;
    sentBegQues = originalStr.lastIndexOf("?", indices[i]) + 1;
    sentEndPeriod = originalStr.indexOf(".", indices[i]) + 1;
    sentEndExcl = originalStr.indexOf("!", indices[i]) + 1;
    sentEndQues = originalStr.indexOf("?", indices[i]) + 1;
    sentBeg = Math.max(sentBegPeriod, sentBegExcl, sentBegQues);
    sentEnd = Math.min(sentEndPeriod, sentEndExcl, sentEndQues);
    startEndIndices.push([sentBeg, sentEnd]);
    var sentence = originalStr.substring(sentBeg, sentEnd);
    sentence = sentence.trim();
    if (sentence.charAt(0) == '" ') {
      sentence = sentence.substring(1);
      sentence = sentence.trim();
    }
    sentences.push(sentence);
  }
  var prevSentences = [];
  var prevTable = document.getElementById("sentencesTableID");
  if (prevTable) prevTable.parentNode.removeChild(prevTable);
  var sentencesTable = document.createElement("table");
  sentencesTable.setAttribute("id", "sentencesTableID");
  var sentencesTableHeader = sentencesTable.createTHead();
  var sentencesTableHeaderRow = sentencesTableHeader.insertRow(0);
  var sentencesTableHeaderCell1 = sentencesTableHeaderRow.insertCell(0);
  var sentencesTableHeaderCell2 = sentencesTableHeaderRow.insertCell(1);
  sentencesTableHeaderCell1.innerHTML =
    "<b>Sentences Which Include: '" + originalSearchStr + "'</b>";
  sentencesTableHeaderCell2.innerHTML = "<b>Page #</b>";
  var tableRowsIDs = [];
  tableRowsIDs = [];
  for (var i = 0; i < sentences.length; i++) {
    if (!prevSentences.includes(sentences[i])) {
      var tr = document.createElement("tr");
      tr.setAttribute("id", "row" + i);
      tableRowsIDs.push("row" + i);
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var sentence = document.createTextNode(sentences[i]);
      var indexOfSentece = document.createTextNode(recordedPages[i]);
      td1.appendChild(sentence);
      td2.appendChild(indexOfSentece);
      tr.appendChild(td1);
      tr.appendChild(td2);
      sentencesTable.appendChild(tr);
      sentencesTable.setAttribute("border", "2");
      prevSentences.push(sentences[i]);
    }
  }
  render(10);
  sentencesDisplayContainer.appendChild(sentencesTable);
  addRowHandlers();
}

function addRowHandlers() {
  var table = document.getElementById("sentencesTableID");
  if (table) {
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      var createClickHandler = function() {
        return sentenceSelect(i);
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }
}

function sentenceSelect(indexOfSelected) {
  console.log(recordedPages[indexOfSelected]);
  //render(recordedPages[indexOfSelected]);
}
