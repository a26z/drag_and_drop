# drag_and_drop

Simple script for uploading images to a remote server (cloudinary).

In order to upload files to Cloudinary, you'll have to edit these
lines in 'module.js':

    let url = 'https://api.cloudinary.com/v1_1/<your_space_here>/upload';
    let preset = '<your_upload_preset_here>';

Otherwise files won't be uploaded (progress bar and files preview
will work, though).

Cheers.
