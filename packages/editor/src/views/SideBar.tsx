import React, { useCallback } from "react";
import styled from "styled-components";
import { colors } from "@seanchas116/paintkit/src/components/Palette";
import { VSplitter } from "@seanchas116/paintkit/src/components/sidebar/VSplitter";
import {
  InspectorTabBar,
  InspectorTabBarItem,
} from "@seanchas116/paintkit/src/components/sidebar/InspectorTabBar";
import { WidthResizeHandle } from "@seanchas116/paintkit/src/components/sidebar/WidthResizeHandle";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { OutlineTreeView } from "./OutlineTreeView";
import { useEditorState } from "./EditorStateContext";
import { ElementInspector } from "./ElementInspector";
import { VariantInspector } from "./VariantInspector";

const RightSideBarWrap = styled.div`
  position: relative;
  width: 200px;
  border-left: 2px solid ${colors.separator};
  > * {
    height: 100%;
  }
`;

const minSideBarWidth = 256;

const TabArea = styled.div`
  display: flex;
  flex-direction: column;

  > :last-child {
    flex: 1;
  }
`;

export const RightSideBar: React.FC = observer(() => {
  const editorState = useEditorState();

  const onClickOutlineTab = useCallback(
    action(() => {
      editorState.currentOutlineTab = "outline";
    }),
    [editorState]
  );
  const onClickAssetsTab = useCallback(
    action(() => {
      editorState.currentOutlineTab = "assets";
    }),
    [editorState]
  );
  const onClickElementTab = useCallback(
    action(() => {
      editorState.currentInspectorTab = "element";
    }),
    [editorState]
  );
  const onClickStyleTab = useCallback(
    action(() => {
      editorState.currentInspectorTab = "style";
    }),
    [editorState]
  );
  const onChangeSplitRatio = useCallback(
    action((ratio: number) => {
      editorState.sideBarSplitRatio = ratio;
    }),
    [editorState]
  );
  const onChangeWidth = useCallback(
    action((width: number) => {
      editorState.sideBarWidth = Math.max(width, minSideBarWidth);
    }),
    [editorState]
  );

  return (
    <RightSideBarWrap
      style={{
        width: `${editorState.sideBarWidth}px`,
      }}
    >
      <VSplitter
        ratio={editorState.sideBarSplitRatio}
        onChangeRatio={onChangeSplitRatio}
      >
        <TabArea>
          <InspectorTabBar>
            <InspectorTabBarItem
              aria-selected={editorState.currentOutlineTab === "outline"}
              onClick={onClickOutlineTab}
            >
              Outline
            </InspectorTabBarItem>
            <InspectorTabBarItem
              aria-selected={editorState.currentOutlineTab === "assets"}
              onClick={onClickAssetsTab}
            >
              Assets
            </InspectorTabBarItem>
          </InspectorTabBar>
          <OutlineTreeView />
        </TabArea>
        <TabArea>
          <InspectorTabBar>
            <InspectorTabBarItem
              aria-selected={editorState.currentInspectorTab === "element"}
              onClick={onClickElementTab}
            >
              Element
            </InspectorTabBarItem>
            <InspectorTabBarItem
              aria-selected={editorState.currentInspectorTab === "style"}
              onClick={onClickStyleTab}
            >
              Style
            </InspectorTabBarItem>
          </InspectorTabBar>
          {editorState.variantInspectorState.isVisible ? (
            <VariantInspector />
          ) : editorState.elementInspectorState.isVisible ? (
            <ElementInspector />
          ) : (
            <div />
          )}
        </TabArea>
      </VSplitter>
      <WidthResizeHandle
        position="left"
        width={editorState.sideBarWidth}
        onChangeWidth={onChangeWidth}
      />
    </RightSideBarWrap>
  );
});