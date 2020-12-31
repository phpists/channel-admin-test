// import { createSelector } from 'reselect'
import { selector, deepEqualSelector } from "../common";

const self = deepEqualSelector(selector, (data) => data.languages);
const languages = deepEqualSelector(self, (data) => data.languages);

export default {
  languages,
};