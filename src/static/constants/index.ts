export const PAGE_STATUS = {
  NORMAL: 1,
  INVALID: 2,
};

export const PAGE_STATUS_MAP = {
  [PAGE_STATUS.NORMAL]: "生效",
  [PAGE_STATUS.INVALID]: "失效",
};

export const PAGE_STATUS_OPTIONS = Object.keys(PAGE_STATUS_MAP).map((key) => ({
  value: key,
  label: PAGE_STATUS_MAP[key],
}));