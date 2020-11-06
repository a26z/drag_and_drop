const fileElem = document.getElementById('fileElem'); // change, hidden
const fileSelect = document.getElementById('fileSelect') // click
const fileList = document.getElementById('fileList'); // display here
const progress = document.getElementById('progress-bar');

export const dropArea = document.getElementById('drop-area'); // drop div

let url = 'https://api.cloudinary.com/v1_1/<your_space_here>/upload';
let preset = '<your_upload_preset_here>';

export const sendFiles = () => {
    const files = fileElem.files;
    uploadAndShow(files);
};

export const clickHelper = function(e) {
    progress.value = 0;
    if (fileElem) {
        fileElem.click();
    }
};

export const sendDrop = e => {
    progress.value = 0;
    let dt = e.dataTransfer;
    let files = dt.files;
    uploadAndShow(files);
}

const handleErrors = async (resp) => {
    let respJson = await resp.json();
    if (!resp.ok) {
        console.log(resp.statusText, respJson);
    } else {
        console.log(respJson);
        return respJson.secure_url;
    }
}

const showFiles = function(file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file)
    img.onload = () => {
        URL.revokeObjectURL(img.src);
    }
    img.height = 120;
    fileList.appendChild(img);
    // progress.value += pVal; // progress bar
}

const uploadFiles = async function(file) {
    fileList.innerHTML = '';
    // let pVal = 100 / arr.length;
    let formData = new FormData();
    formData.append('upload_preset', preset);
    formData.append('file', file);
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        })
        let imgLink = await handleErrors(response);
        console.log(imgLink || 'Link not included in error object.');
    } catch (err) {
        console.log('Something went wrong', err);
    }
    showFiles(file)
}

const uploadAndShow = async function(files) {
    Array.from(files).forEach(file => {
        uploadFiles(file);
    })
}
