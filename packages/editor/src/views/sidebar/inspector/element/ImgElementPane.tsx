import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import {
  Pane,
  PaneHeading,
  PaneHeadingRow,
} from "@seanchas116/paintkit/src/components/sidebar/Inspector";
import { ImageInput } from "@seanchas116/paintkit/src/components/ImageInput";
import { useEditorState } from "../../../EditorStateContext";

export const ImgElementPane: React.FC = observer(function ImgElementPane() {
  const editorState = useEditorState();
  const state = editorState.elementInspectorState;

  const resolveURL = useCallback(
    (url: string) => editorState.resolveImageAssetURL(url),
    [editorState]
  );

  const elements = state.selectedImgElements;
  if (elements.length === 0) {
    return null;
  }

  return (
    <Pane>
      <PaneHeadingRow>
        <PaneHeading>Image</PaneHeading>
      </PaneHeadingRow>
      <ImageInput
        value={state.imgSrc}
        onChange={state.onImgSrcChange}
        resolveURL={resolveURL}
        options={editorState.imageURLOptions}
      />
    </Pane>
  );
});