# drag_and_drop

Simple script for uploading images to a remote server (cloudinary).

In order to upload files to Cloudinary, you'll have to edit these
lines in 'module.js':

    const CDN_URL = null;       // here goes your URL string on cloudinary.com
    const CDN_PRESET = null;    // and here your cloudinary preset string

Otherwise files won't be uploaded (progress bar and files preview
will work, though).

Cheers.
