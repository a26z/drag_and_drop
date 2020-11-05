import {
    sendFiles,
    clickHelper,
    sendDrop,
    dropArea
} from './module.js';

fileElem.addEventListener("change", sendFiles, false); // sendFiles() uploads files

fileSelect.addEventListener("click", clickHelper, false); // helper for click event

dropArea.addEventListener('drop', sendDrop, false); // uploads dropped file

['dragenter', 'dragexit', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});

dropArea.addEventListener('dragenter', function () {
    this.classList.add('highlight')
}, false)

dropArea.addEventListener('dragexit', function () {
    this.classList.remove('highlight')
}, false)
