import { Atom, atom, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { find, isString } from "lodash-es";
import { useCallback } from "react";
import { pageBlocksAtomsAtom } from "../atoms/blocks";
import { ChaiBlock } from "../types/ChaiBlock.ts";

const writeAtomValue = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, { id, props }: { id: string; props: Record<string, any> }) => {
    const blockAsAtoms = get(pageBlocksAtomsAtom);
    const blockAtom = find(blockAsAtoms, (b) => (get(b) as ChaiBlock)._id === id);
    if (!blockAtom) {
      throw new Error(`Block with id ${id} not found`);
    }
    return set(blockAtom, { ...(get(blockAtom) as any), ...props });
  },
);

export const useUpdateBlockAtom = () => {
  return useSetAtom(writeAtomValue);
};

export const useGetBlockAtomValue = (splitAtoms: any) => {
  return useAtomCallback(
    useCallback(
      (get, _set, idOrAtom: Atom<ChaiBlock> | string) => {
        const blockAsAtoms = get(splitAtoms);
        const blockAtom = find(
          blockAsAtoms,
          (b) => (get(b) as ChaiBlock)._id === (isString(idOrAtom) ? idOrAtom : get(idOrAtom as Atom<ChaiBlock>)._id),
        );
        if (!blockAtom) {
          throw new Error(`Block with id ${idOrAtom} not found`);
        }
        return get(blockAtom) as ChaiBlock;
      },
      [splitAtoms],
    ),
  );
};

export const useGetBlockAtom = (splitAtoms: any) => {
  return useAtomCallback(
    useCallback(
      (get, _set, idOrAtom: Atom<ChaiBlock> | string) => {
        const blockAsAtoms = get(splitAtoms);
        const blockAtom = find(
          blockAsAtoms,
          (b) => (get(b) as ChaiBlock)._id === (isString(idOrAtom) ? idOrAtom : get(idOrAtom as Atom<ChaiBlock>)._id),
        );
        if (!blockAtom) {
          throw new Error(`Block with id ${idOrAtom} not found`);
        }
        return blockAtom;
      },
      [splitAtoms],
    ),
  );
};
