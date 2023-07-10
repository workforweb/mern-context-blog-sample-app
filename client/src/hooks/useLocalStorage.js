import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

function getStorageValues(key, defaultValue) {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

export const useLocalStorageArray = (key, defaultValue) => {
  const [values, setValues] = useState(() => {
    return getStorageValues(key, defaultValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(values));
  }, [key, values]);

  return [values, setValues];
};
