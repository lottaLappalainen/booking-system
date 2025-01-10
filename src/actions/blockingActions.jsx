
export const ADD_BLOCKED_DATES = 'ADD_BLOCKED_DATES';
export const REMOVE_BLOCKED_DATES = 'REMOVE_BLOCKED_DATES';

export const addBlockedDates = (dates) => ({
  type: ADD_BLOCKED_DATES,
  payload: dates,
});

export const removeBlockedDates = (dates) => ({
  type: REMOVE_BLOCKED_DATES,
  payload: dates,
});

export const UNBLOCK_DATES = 'UNBLOCK_DATES';

export const unblockDates = (dates) => ({
  type: UNBLOCK_DATES,
  payload: dates,
});

