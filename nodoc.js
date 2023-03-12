/*
  NoDoc - Create brower-native documents for print
*/

let data;
function getdata(datasrc) {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    data = JSON.parse(xhr.responseText);
    format(data);
  }
  xhr.open('GET', datasrc);
  xhr.send();
}

let bloburl;

function print(pageno=0) {
  if(bloburl) {
    URL.revokeObjectURL(bloburl);
  }

  var page = document.getElementsByTagName('page')[pageno];
  var opt = {
    margin:       0,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scrollX: -8, scrollY: 0, height: 1122, scale: 3 },
    jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };

  page.classList.add('print');

  setTimeout(() => {
    html2pdf().set(opt).from(page).outputPdf('blob').then(blob => {
      bloburl = URL.createObjectURL(blob);
      // This object will exist until a user decides to create a new one or navigate away
      
      window.open(bloburl, '_blank');

      page.classList.remove('print');
    });
  }, 100);
}

function thumbnail(pageno=0) {
  var page = document.getElementsByTagName('page')[pageno];
  var opt = {
    margin:       0,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.5 },
    html2canvas:  { scrollX: -8, scrollY: 0, height: 1122, scale: 1 },
    jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };

  page.classList.add('print');

  setTimeout(() => {
    html2pdf().set(opt).from(page).outputImg('img').then(image => {
      imgWindow = window.open("");
      imgWindow.document.body.append(image);

      page.classList.remove('print');
    });
  }, 100);
}