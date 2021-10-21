import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor as EditorDraft } from 'react-draft-wysiwyg';

const Editor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEditorStateChange = (editor: any) => {
        setEditorState(editor);
    };

    return (
        <div>
            <EditorDraft
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
};

export default Editor;
