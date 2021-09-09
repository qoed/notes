import React from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import './NotesEditor.css';

interface Props {
  handleEditorChange: (content: string, editor: TinyMCEEditor) => void;
  editorContent: string;
  handleSave: () => void;
}

const NotesEditor: React.FC<Props> = ({ handleEditorChange, editorContent, handleSave }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tinyMceKey = process.env.REACT_APP_TINYMCE_API_KEY;

  return (
    <div>
      <Editor
        id='editor'
        apiKey={tinyMceKey}
        value={editorContent}
        inline={false}
        init={{
          mobile: {
            height: '70vh',
          },
          branding: false,
          height: '80vh',
          menubar: false,
          plugins: [
            'save image advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar: `save | undo redo | formatselect | bold italic backcolor |
             alignleft aligncenter alignright alignjustify |
             bullist numlist outdent indent | image | removeformat | code | help`,
          save_enablewhendirty: true,
          save_onsavecallback: function () {},
          skin_url: '/css/skins/ui/qoed-notes',
          skin: 'qoed-notes',
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            /*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            */
            input.onchange = function () {
              // @ts-ignore
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = async function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                // ? This is the OOTB blob stuff, image is saved as base64 in db using this.
                // ? Not sure how permanent the blobCache is though
                // var id = 'blobid' + new Date().getTime();
                // var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                // var base64 = reader.result.split(',')[1];
                // var blobInfo = blobCache.create(id, file, base64);
                // blobCache.add(blobInfo);

                // ? Saves the image to the server. Good for permanent storage.
                // ? Does not clean up the image if it is removed from the note, might get bloated over time.
                let formData = new FormData();
                formData.append('file', file);

                const res = await axios.post(`${apiUrl}/images`, formData, {
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });

                if (res.status === 201) {
                  cb(res.data.data.slug, { title: file.name });
                }

                // ! This is also part of the OOTB blob solution
                /* call the callback and populate the Title field with the file name */
                // cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
        }}
        onEditorChange={handleEditorChange}
        onSaveContent={handleSave}
      />
    </div>
  );
};

export default NotesEditor;
