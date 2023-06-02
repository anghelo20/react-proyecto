import React, {  useRef } from "react";
import JoditEditor from "jodit-react";


  const EditorContainer = ({ initialValue, getValue }) => {
    const editor = useRef(null);
  
    return (
      <JoditEditor
        ref={editor}
        value={initialValue}
        
        tabIndex={1}
         onBlur={(newContent) => getValue(newContent)}
        onChange={(newContent) => getValue(newContent)}
      />
    );
  };
  export default EditorContainer;