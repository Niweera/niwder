import { createSelector } from "reselect";
import { get } from "lodash";

export const createSelectorFactory = (path) =>
  createSelector(
    (state) => get(state, path, null),
    (data) => data
  );
