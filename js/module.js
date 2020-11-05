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
    if(!resp.ok){
        console.log(resp.statusText, respJson);
    } else {
        console.log(respJson);
        return respJson.secure_url;
    }
}

const uploadAndShow = async function(files) {
    fileList.innerHTML = '';
    let url = 'https://api.cloudinary.com/v1_1/lucyintheskies/upload';
    let preset = 'uthjpilr';
    let pVal = 100 / files.length;

    for (let i = 0; i < files.length; i++) {
        // upload files
        let formData = new FormData();
        formData.append('upload_preset', preset)
        formData.append('file', files[i]);
        try {
            let response = await fetch(url, {
            method: 'POST',
            body: formData
        })
        let imgLink = await handleErrors(response);
        console.log(imgLink);
        } catch(err) {
            console.log('Something went wrong', err);
        }
        // create preview
        const img = document.createElement('img');
        img.src = URL.createObjectURL(files[i])
        img.onload = () => {
            URL.revokeObjectURL(img.src);
        }
        img.height = 120;
        await fileList.appendChild(img);
        // run progress
        progress.value += pVal;
    }
}
// test
