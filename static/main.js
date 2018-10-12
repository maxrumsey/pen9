function checkProgress() {
  if (typeof current == 'undefined') return console.error('Current progress does not exist.')
  let value = tinyMCE.activeEditor.getContent()
  if (current == value) return;
  current = value;
  let xmlhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("POST", "update", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("value=" + encodeURIComponent(current));
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {

    } else if (this.readyState == 4) {
      console.error(this.status)
    }
  };
}

function getNoteValue() {
  let xmlhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET", "view?t=" + Math.random(), true);
  xmlhttp.send()
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let response = this.response;
      tinyMCE.activeEditor.setContent(response);
    } else if (this.readyState == 4) {
      console.error(this.status)
    }
  };
}
function loadEditor() {
  getNoteValue()
}
function deleteNote(id) {
  let xmlhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("DELETE", "/note/" + id + "/delete", true);
  xmlhttp.send()
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 204) {
      let element = document.getElementById(id)
      element.parentNode.removeChild(element);
    } else if (this.readyState == 4) {
      console.error(this.status)
    }
  };
}
function createNote() {
  let noteName = document.getElementById('noteCreateBoxInput').value;
  let xmlhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("POST", "/note/new", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("noteName=" + encodeURIComponent(noteName))
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 204) {
      window.location.reload(true);
    } else if (this.readyState == 4) {
      console.error(this.status)
    }
  };
}
