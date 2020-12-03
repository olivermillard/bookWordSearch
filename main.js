//Node.js
// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, World!\n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

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
      const url = fileSelector.files[0];
      var fReader = new FileReader();
      fReader.readAsDataURL(fileSelector.files[0]);
      fReader.onloadend = function(event) {};
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
