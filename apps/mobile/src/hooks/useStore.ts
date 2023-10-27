import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type UseStoreReturnType<TKeys extends string[]> = {
  isReading: boolean;
  values: { key: TKeys[number]; value: string }[];
  errors: { key: TKeys[number]; reason: string }[];
};

export function useStore<TKey extends string>(
  keys: TKey[]
): UseStoreReturnType<TKey[]>;

export function useStore<TKey extends string, TLabel extends string>(
  keys: TKey[],
  labels: TLabel[]
): UseStoreReturnType<TLabel[]>;

export function useStore<TKey extends string, TLabel extends string>(
  keys: TKey[],
  labels?: TLabel[]
) {
  let _labels: (TKey | TLabel)[] = keys;
  if (labels) {
    if (keys.length !== labels.length) {
      throw 'Keys and labels arrays should be the same length.';
    }
    _labels = labels;
  }

  const [isReading, setIsReading] = useState(true);
  const [values, setVaues] = useState<{ key: TKey | TLabel; value: string }[]>(
    []
  );
  const [errors, setErrors] = useState<
    { key: TKey | TLabel; reason: string }[]
  >([]);

  useEffect(() => {
    Promise.allSettled(keys.map((k) => SecureStore.getItemAsync(k))).then(
      (settledResults) => {
        const _values: { key: TKey | TLabel; value: string }[] = [];
        const _errors: { key: TKey | TLabel; reason: string }[] = [];
        settledResults.forEach((result, i) => {
          if (result.status === 'rejected') {
            _errors.push({ key: _labels[i], reason: result.reason });
          } else {
            if (!result.value) {
              _errors.push({
                key: _labels[i],
                reason: `No value with key ${keys[i]}`,
              });
            } else {
              _values.push({ key: _labels[i], value: result.value });
            }
          }
        });
        setErrors(_errors);
        setVaues(_values);
        setIsReading(false);
      }
    );
  }, []);

  return {
    isReading,
    values,
    errors,
  };
}
