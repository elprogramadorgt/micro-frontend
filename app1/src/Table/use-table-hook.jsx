import { getYesOrNoString } from "./format-types";

const MAX = 10000000;
const YES = "YES";
const NO = "NO";
const YES_VALUE = "yes";
const ACTIONS = "actions";
const MAX_HEIGHT = 440;

const useTableHook = (columns, filterData, setFilterData) => {
  const getIndicesOf = (searchStr, str, caseSensitive = true) => {
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    let startIndex = 0,
      index,
      indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  };

  const allowSpecialSymbols = (str) => {
    return str.trim().replace(/([.?*+^$[\]\\(){}|-])/g, "");
  };

  const getHighlights = (searchValue = "", value) => {
    let newValue = value;
    const cleanSearchValue = allowSpecialSymbols(searchValue);

    if (cleanSearchValue.length && typeof newValue === "string") {
      const regEx = new RegExp(cleanSearchValue, "ig");
      const replaceMask = `<mark>${searchValue}</mark>`;
      newValue = newValue.trim().replace(regEx, replaceMask);
    }

    return newValue;
  };

  const descendingComparator = (a, b, orderBy) => {
    const valueA = String(
      Array.isArray(a[orderBy]) ? a[orderBy].join(",") : a[orderBy]
    )
      .trim()
      .toLowerCase();
    const valueB = String(
      Array.isArray(a[orderBy]) ? b[orderBy].join(",") : b[orderBy]
    )
      .trim()
      .toLowerCase();

    if (valueB < valueA) {
      return -1;
    }
    if (valueB > valueA) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const convertArrayToString = (value) =>
    Array.isArray(value) ? value.join(", ") : value ? value : "";

  const searchConditionsTable = {
    startWidth: (list, key, value) =>
      list.filter((item) =>
        convertArrayToString(item[key])
          .toUpperCase()
          .startsWith(value.trim().toUpperCase())
      ),
    isEqualTo: (list, key, value) =>
      list.filter(
        (item) =>
          convertArrayToString(item[key]).toUpperCase() ===
          value.trim().toUpperCase()
      ),
    contains: (list, key, value) =>
      list.filter((item) =>
        convertArrayToString(item[key])
          .toUpperCase()
          .includes(value.trim().toUpperCase())
      ),
    equal: (list, key, value) =>
      list.filter((item) => item[key] === Number(value)),
    notEqual: (list, key, value) =>
      list.filter((item) => item[key] !== Number(value)),
    lessThan: (list, key, value) =>
      list.filter((item) => item[key] < Number(value)),
    lessThanOrEqual: (list, key, value) =>
      list.filter((item) => item[key] <= Number(value)),
    greaterThan: (list, key, value) =>
      list.filter((item) => item[key] > Number(value)),
    greaterThanOrEqual: (list, key, value) =>
      list.filter((item) => item[key] >= Number(value)),
    yesOrNo: (list, key, value) =>
      list.filter((item) => item[key] === (value === YES_VALUE ? true : false)),
    all: (list, key, value) =>
      list.filter((item) => {
        return item[key].toUpperCase().includes(value.trim().toUpperCase());
      }),
  };

  const getResultFromSearch = (list = []) => {
    let filterDataKeys = Object.keys(filterData);

    if (!filterDataKeys.length) {
      return list;
    }

    if (filterDataKeys.length > 1 && filterDataKeys.includes("fullSearch")) {
      filterDataKeys = filterDataKeys.filter((item) => item != "fullSearch");
      const { fullSearch, ...rest } = filterData;
      setFilterData(rest);
    }

    if (filterDataKeys.includes("fullSearch")) {
      const value = filterData["fullSearch"].value;

      const keys = columns.filter((item) => item.id !== ACTIONS);
      const searchSet = new Set();

      keys.forEach((key) => {
        if (key.type === "string") {
          const temp = list.filter((item) =>
            (item[key.id] ? String(item[key.id]) : "")
              .toUpperCase()
              .includes(value.trim().toUpperCase())
          );
          temp.forEach((item) => searchSet.add(item));
        } else if (key.type === "boolean") {
          const temp = list.filter((item) =>
            (item[key.id] ? YES : NO).includes(value.trim().toUpperCase())
          );
          temp.forEach((item) => searchSet.add(item));
        } else if (key.type === "integer") {
          const temp = list.filter((item) =>
            (item[key.id] ? String(item[key.id]) : "")
              .toUpperCase()
              .includes(value.trim().toUpperCase())
          );
          temp.forEach((item) => searchSet.add(item));
        } else if (key.type === "decimal") {
          const temp = list.filter((item) =>
            (item[key.id] ? String(item[key.id]) : "")
              .toUpperCase()
              .includes(value.trim().toUpperCase())
          );
          temp.forEach((item) => searchSet.add(item));
        }
      });

      return [...searchSet];
    }

    for (let key of filterDataKeys) {
      const option = filterData[key].option;
      const value = filterData[key].value;
      const fnOption = searchConditionsTable[option];
      list = fnOption(list, key, value);
    }

    return list;
  };

  const handleSearch = (value) => {
    setFilterData({ fullSearch: { option: "all", value } });
  };

  const getValueFromType = (type, subId, subType, value) => {
    if (type === "boolean") {
      return getYesOrNoString(value);
    }

    if (type === "arrayOfObjects") {
      let result = value.map((item) => item[subId]);
      result = Array.isArray(result) ? result.join(", ") : "";
      return result;
    }

    if (type === "decimal") {
      return String(value);
    }

    if (type === "integer") {
      return String(value);
    }

    return value;
  };

  return {
    MAX_HEIGHT,
    getComparator,
    stableSort,
    getResultFromSearch,
    handleSearch,
    getValueFromType,
    getHighlights,
  };
};

export default useTableHook;
