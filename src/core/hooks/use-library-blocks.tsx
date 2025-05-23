import { useBuilderProp } from "@/core/hooks/use-builder-prop";
import { ChaiUILibrary, ChaiUILibraryBlock } from "@/types/chaibuilder-editor-props";
import { atom, useAtom } from "jotai";
import { get, noop } from "lodash-es";
import { useCallback, useEffect, useRef } from "react";

const libraryBlocksAtom = atom<{ [uuid: string]: { loading: "idle" | "loading" | "complete"; blocks: any[] | null } }>(
  {},
);
export const useLibraryBlocks = (library?: Partial<ChaiUILibrary> & { id: string }) => {
  const [libraryBlocks, setLibraryBlocks] = useAtom(libraryBlocksAtom);
  const getBlocks = useBuilderProp("getUILibraryBlocks", noop);
  const blocks = get(libraryBlocks, `${library?.id}.blocks`, null);
  const state = get(libraryBlocks, `${library?.id}.loading`, "idle");
  const loadingRef = useRef("idle");

  useEffect(() => {
    (async () => {
      if (state === "complete" || loadingRef.current === "loading") return;
      loadingRef.current = "loading";
      setLibraryBlocks((prev) => ({ ...prev, [library?.id]: { loading: "loading", blocks: [] } }));
      try {
        const libraryBlocks: ChaiUILibraryBlock[] = await getBlocks(library);
        loadingRef.current = "idle";
        setLibraryBlocks((prev) => ({ ...prev, [library?.id]: { loading: "complete", blocks: libraryBlocks || [] } }));
      } catch (error) {
        loadingRef.current = "idle";
        setLibraryBlocks((prev) => ({ ...prev, [library?.id]: { loading: "complete", blocks: [] } }));
      }
    })();
  }, [library, blocks, state, loadingRef, setLibraryBlocks, getBlocks]);

  const resetLibrary = useCallback(
    (libraryId: string) => {
      setLibraryBlocks((prev) => ({ ...prev, [libraryId]: { loading: "idle", blocks: [] } }));
    },
    [setLibraryBlocks],
  );

  return { data: blocks || [], isLoading: state === "loading", resetLibrary };
};
