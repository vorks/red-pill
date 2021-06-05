import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { makeStorage } from "../services/storage";

import { useBlocked } from "./blocked";

import type { FC } from "react";

type UpNextState = {
  readonly list: readonly number[];
  readonly add: (movieId: number) => void;
  readonly remove: (movieId: number) => void;
  readonly includes: (movieId: number) => boolean;
  readonly toggle: (movieId: number) => void;
};

const UpNextContext = createContext<UpNextState | undefined>(undefined);

const initial: readonly number[] = [];
const storage = makeStorage("up-next", { list: initial });

export const UpNextProvider: FC = ({ children }) => {
  const [_list, setList] = useState<readonly number[]>([]);
  const { isBlocked } = useBlocked();
  const list = _list.filter((id) => !isBlocked(id));

  useEffect(() => {
    storage
      .get()
      .then(({ list }) => setList(list))
      .catch(console.error);
  }, []);

  useEffect(() => {
    storage.set({ list: _list }).catch(console.error);
  }, [_list]);

  const add = useCallback(
    (movieId: number) => setList((prev) => [...prev, movieId]),
    []
  );

  const remove = useCallback(
    (movieId: number) => setList((prev) => prev.filter((id) => id !== movieId)),
    []
  );

  const includes = useCallback(
    (movieId: number) => list.includes(movieId),
    [list]
  );

  const toggle = useCallback(
    (movieId: number) => (includes(movieId) ? remove(movieId) : add(movieId)),
    [add, includes, remove]
  );

  const value = useMemo(
    () => ({ list, add, remove, includes, toggle }),
    [add, list, remove, includes, toggle]
  );

  return (
    <UpNextContext.Provider value={value}>{children}</UpNextContext.Provider>
  );
};

export const useUpNext = (): UpNextState => {
  const context = useContext(UpNextContext);

  if (!context) throw new Error("useUpNext must be used within UpNextProvider");

  return context;
};
