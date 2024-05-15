/**
 * This version of an array filter method returns both the array of
 * matched items and the array of unmatched items.
 *
 * @generic T - The type of the array elements.
 *
 * @param array The array to filter.
 * @param predicate The function to test each element of the array.
 * Return true to add the element to the `matched` array, false to add it to the `unmatched` array.
 *
 * @returns A tuple containing the `matched` and `unmatched` arrays as `[matched[], unmatched[]]`.
 */
function filter<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] {
  const matched: T[] = [];
  const unmatched: T[] = [];
  array.forEach((item, index) => {
    if (predicate(item, index)) {
      matched.push(item);
    } else {
      unmatched.push(item);
    }
  });
  return [matched, unmatched];
}

const ArrayUtils = { filter };

export default ArrayUtils;
