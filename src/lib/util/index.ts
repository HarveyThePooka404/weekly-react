export function getWeekNumber(date: string) {
    const dateToCheck: any = new Date(date);
    const oneJan: any = new Date(dateToCheck.getFullYear(),0,1);
    const numberOfDays = Math.floor((dateToCheck - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil(( dateToCheck.getDay() + 1 + numberOfDays) / 7);
    
    return result
}