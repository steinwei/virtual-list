export type PositionType = {
  bottom: number
}

export function initCachedList(len: number, itemHeight: number) {
  return Array.from({length: len}).map((_, index) => ({
    bottom: itemHeight * (index + 1)
  }))
}

export function binarySearch(positions: PositionType[], value: number) {
  let start = 0
  let end = positions.length - 1
  let tempIndex = null

  while(start <= end) {
    const mid = Math.floor(start + (end - start) / 2)
    const midValue = positions[mid]['bottom']
    
    if (midValue === value) {
      return mid + 1
    }

    if (midValue > value) {
      // tempIndex存放最靠近值为value的所有
      if (tempIndex === null || tempIndex > mid) {
        tempIndex = mid
      }
      end = mid  - 1
    }
    else if (midValue < value) {
      start = mid + 1
    }
  }

  tempIndex = tempIndex || 0
  return tempIndex
}

export const throttle = (fn: Function, delay: number) => {
  let prev = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - prev >= delay) {
      fn.apply(this, args);
      prev = now;
    }
  }
}