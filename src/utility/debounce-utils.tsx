let debounceTimer: any;
export const debounce = (callback: any, time: any) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };