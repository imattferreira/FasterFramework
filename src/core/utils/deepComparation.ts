type DeepComparationFn = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => boolean;

const deepComparation: DeepComparationFn = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key] as any;
    const val2 = obj2[key] as any;

    if (typeof val1 !== typeof val2) {
      return false;
    }

    if (typeof val1 === 'object') {
      deepComparation(val1, val2);
    }

    if (val1 !== val2) {
      return false;
    }
  }

  return true;
}

export default deepComparation;
