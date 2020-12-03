const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function searchFunc() {
  var fileSelector = document.getElementById("fileSelector");
  var searchInput = document.getElementById("wordInput");
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
      alert("succ");
      //var fs = require("fs");
      var PdfReader = require("pdfreader").PdfReader;
      fs.readFile(fileSelector.value, (err, pdfBuffer) => {
        new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
          if (err) callback(err);
          else if (!item) callback();
          else if (item.text) console.log(item.text);
        });
      });
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
// var url =
//   "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

// // The workerSrc property shall be specified.
// pdfjsLib.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";

// pdfjsLib.getDocument(url).then(
//   function(pdf) {
//     var pdfDocument = pdf;
//     var pagesPromises = [];

//     for (var i = 0; i < pdf.numPages; i++) {
//       // Required to prevent that i is always the total of pages
//       (function(pageNumber) {
//         pagesPromises.push(getPageText(pageNumber, pdfDocument));
//       })(i + 1);
//     }

//     Promise.all(pagesPromises).then(function(pagesText) {
//       // Remove loading
//       $("#loading-info").remove();

//       // Render text
//       for (var i = 0; i < pagesText.length; i++) {
//         $("#pdf-text").append(
//           "<div><h3>Page " +
//             (i + 1) +
//             "</h3><p>" +
//             pagesText[i] +
//             "</p><br></div>"
//         );
//       }
//     });
//   },
//   function(reason) {
//     // PDF loading error
//     console.error(reason);
//   }
// );

// /**
//  * Retrieves the text of a specif page within a PDF Document obtained through pdf.js
//  *
//  * @param {Integer} pageNum Specifies the number of the page
//  * @param {PDFDocument} PDFDocumentInstance The PDF document obtained
//  **/
// function getPageText(pageNum, PDFDocumentInstance) {
//   // Return a Promise that is solved once the text of the page is retrieven
//   return new Promise(function(resolve, reject) {
//     PDFDocumentInstance.getPage(pageNum).then(function(pdfPage) {
//       // The main trick to obtain the text of the PDF page, use the getTextContent method
//       pdfPage.getTextContent().then(function(textContent) {
//         var textItems = textContent.items;
//         var finalString = "";

//         // Concatenate the string of the item to the final string
//         for (var i = 0; i < textItems.length; i++) {
//           var item = textItems[i];

//           finalString += item.str + " ";
//         }

//         // Solve promise with the text retrieven from the page
//         resolve(finalString);
//       });
//     });
//   });
// }
