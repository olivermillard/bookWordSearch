//Global Variables
var fileSelector = document.getElementById("fileSelector");
var searchInput = document.getElementById("wordInput");
var searchMessage = document.getElementById("searchMessage");
var searchButton = document.getElementById("searchButton");
var resultsContainer = document.getElementById("resultsContainer");
var canvasContainer = document.getElementById("canvasContainer");

var results;
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
var pdfDoc;
var prevSentences = [];
var alreadyUploaded = false;

//

var myState = {
  pdf: null,
  currentPage: 1,
  zoom: 1,
};

function searchFunc() {
  searchButton.disabled = true;
  if (fileSelector.value.length != 0 && searchInput.value.length != 0) {
    //check for pdf
    var allowedExtensions = /(\.pdf)$/i;
    //if not a pdf
    if (!allowedExtensions.exec(fileSelector.value)) {
      alert("Invalid File Type: Uploaded File must be a PDF");
      fileSelector.value = "";
      searchButton.disabled = false;
      return false;
    }
    //if pdf
    else {
      if (alreadyUploaded == false) {
        getPDF();
      } else {
        searchMessage.textContent =
          "Searching for '" + searchInput.value + "'...";
        getIndicesOf(searchInput.value, finalString, false);
        // getPDF();
      }
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
      numberOfPages = pdf.numPages;
      var pdfDocument = pdf;
      pdf.getPage(pdf.numPages).then(function(page) {
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
  alreadyUploaded = true;
}

function render(pageNum) {
  var prevCanvas = document.getElementById("canvas");
  if (prevCanvas != null) {
    canvasContainer.removeChild(prevCanvas);
  }
  var prevLoader = document.getElementById("loaderID");
  if (prevLoader != null) {
    canvasContainer.removeChild(prevLoader);
  }
  var loader = document.createElement("div");
  loader.setAttribute("id", "loaderID");
  canvasContainer.appendChild(loader);
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
        canvasContainer.removeChild(loader);
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        canvasContainer.appendChild(canvas);
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
}

function getPageText(pageNum, PDFDocumentInstance) {
  finalString = "";
  dividedByPages = [];
  pageCounter = 0;
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
        pageCounter += 1;
        resolve(finalString);
        searchMessage.textContent =
          "Processing page number " +
          pageCounter +
          " of " +
          numberOfPages +
          " total pages";
        if (pageCounter == numberOfPages) {
          getIndicesOf(searchInput.value, finalString, false);
        }
      });
    });
  });
}

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  var originalStr = str;
  wordCounter = 0;
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
  findSentence(originalStr, indices);
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
}

function findSentence(originalStr, indices) {
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
    if (!prevSentences.includes(sentences[i])) {
      sentences.push(sentence);
    } else {
      recordedPages.splice(i);
    }
  }
  makeTable();
}

function makeTable() {
  var offsetInput = document.getElementById("offsetInput");
  var offset = 0;
  if (offsetInput) {
    offset = offsetInput.value;
  }
  prevSentences = [];
  var prevTableContainer = document.getElementById("sentencesDisplayContainer");
  resultsContainer.removeChild(prevTableContainer);
  var sentencesDisplayContainer = document.createElement("div");
  sentencesDisplayContainer.setAttribute("id", "sentencesDisplayContainer");
  var sentencesTable = document.createElement("table");
  sentencesTable.setAttribute("id", "sentencesTableID");
  var sentencesTableHeader = sentencesTable.createTHead();
  var sentencesTableHeaderRow = sentencesTableHeader.insertRow(0);
  var sentencesTableHeaderCell1 = sentencesTableHeaderRow.insertCell(0);
  var sentencesTableHeaderCell2 = sentencesTableHeaderRow.insertCell(1);
  sentencesTableHeaderCell1.innerHTML =
    "<b>Sentences Which Include: '" + searchInput.value + "'</b>";
  sentencesTableHeaderCell1.className = "tableCell";
  sentencesTableHeaderCell2.innerHTML = "<b>Page</b>";
  sentencesTableHeaderCell2.className = "tableCell";

  for (var i = 0; i < sentences.length; i++) {
    if (!prevSentences.includes(sentences[i])) {
      var tr = document.createElement("tr");
      tr.setAttribute("id", "row" + i);
      tr.className = "tableRow";
      tr.addEventListener("click", function() {
        var pageToShow = 0;
        pageToShow = recordedPages[this.rowIndex - 1] + 1;
        if (pageToShow == 0) {
          pageToShow = numberOfPages;
          render(pageToShow);
        } else {
          render(pageToShow);
        }
      });
      var td1 = document.createElement("td");
      var sentence = document.createTextNode(sentences[i]);
      td1.className = "tableCell";
      td1.appendChild(sentence);
      tr.appendChild(td1);
      var td2 = document.createElement("td");
      var td2Content = "";
      if (recordedPages[i] != 0) {
        td2Content = recordedPages[i] - offset;
      } else {
        td2Content = numberOfPages - offset;
      }
      var indexOfSentece = document.createTextNode(td2Content);
      td2.appendChild(indexOfSentece);
      td2.className = "tableCell";

      tr.appendChild(td2);
      sentencesTable.appendChild(tr);
      sentencesTable.setAttribute("border", "2");
      prevSentences.push(sentences[i]);
    }
  }
  sentencesDisplayContainer.appendChild(sentencesTable);
  resultsContainer.appendChild(sentencesDisplayContainer);
  render(1);
  searchButton.disabled = false;
}

function newPDF() {
  alreadyUploaded = false;
}
