import { filter, isEmpty } from "lodash-es";
import { Provider } from "react-wrap-balancer";
import { useBuilderProp } from "../../../hooks";
import { BlocksRendererStatic } from "./BlocksRenderer";
import { BlocksExternalDataProvider } from "./BlocksExternalDataProvider.tsx";
import { getBlockComponent } from "@chaibuilder/runtime";
import { createElement } from "react";
import { useBlocksStore } from "../../../history/blocks.ts";

export const StaticBlocksRenderer = () => {
  const [blocks] = useBlocksStore();
  const container = useBuilderProp("container", null);

  const blocksHtml = isEmpty(blocks) ? null : (
    <BlocksExternalDataProvider>
      <BlocksRendererStatic blocks={filter(blocks, (block) => isEmpty(block._parent))} />
    </BlocksExternalDataProvider>
  );

  const children = container ? createElement(getBlockComponent(container).component, {}, blocksHtml) : blocksHtml;

  return <Provider>{children}</Provider>;
};
