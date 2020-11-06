// import {CDN_PRESET, CDN_URL} from './access.js'

const CDN_URL = null;
const CDN_PRESET = null;

const fileElem = document.getElementById('fileElem'); // change, hidden
const fileSelect = document.getElementById('fileSelect') // click
const fileList = document.getElementById('fileList'); // display here
const progress = document.getElementById('progress-bar');

export const dropArea = document.getElementById('drop-area'); // drop div

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

const uploadAndShow = async function(files) {
    fileList.innerHTML = '';
    let pVal = 100 / files.length;
    let figFragment = document.createDocumentFragment();
    let cloudLink = '';
    for (let i = 0; i < files.length; i++) {
        // upload files
        let formData = new FormData();
        formData.append('file', files[i]);
        if (CDN_URL && CDN_PRESET) {
            formData.append('upload_preset', CDN_PRESET)
            try {
                let response = await fetch(CDN_URL, {
                    method: 'POST',
                    body: formData
                })
                cloudLink = await handleErrors(response);
                console.log(cloudLink || 'Link not included in error object.');
            } catch (err) {
                console.log('Something went wrong', err);
            }
        }
        // generate preview
        let fig = document.createElement('figure');
        let caption = document.createElement('figcaption');
        let img = document.createElement('img');
        fig.appendChild(img)
        fig.appendChild(caption)
        img.src = URL.createObjectURL(files[i])
        caption.innerHTML = `${files[i].name} <a href=${cloudLink || img.src} target="_blank">view</a>`;
        files[i].onload = () => {
            URL.revokeObjectURL(img.src);
        }
        figFragment.appendChild(fig);
        progress.value += pVal;
    }
    fileList.appendChild(figFragment);
}
