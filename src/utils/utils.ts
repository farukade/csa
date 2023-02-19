export const utils = {
  validateWeekDaysArr: (arr: number[]) => {
    if (arr.length > 6) return false;
    if (arr.length < 6) return false;
    for (const item of arr) {
      if (item !== 1 && item !== 0) {
        return false;
      }
    }
    return true;
  }
}