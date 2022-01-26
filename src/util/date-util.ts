import moment from 'moment'

export const getWeekDays = () => Array.apply(null, Array(7)).map(function (_, i) {
    return moment().day(i).format('ddd');
});

export const getFirstDayOfWeek = (date: Date): Date => {
  return moment.utc(date).weekday(0).toDate()
}

export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

export const addMonths = (date: Date, numberOfMonths: number): Date => {
  const mmnt = moment(date)
  mmnt.add(numberOfMonths, 'months')
  return mmnt.toDate()
}

export const format = (date: Date, format = 'string') => moment(date).format(format);

export const getDatesOfMonth = (refDate = new Date()) => {
  const mmnt = moment(getFirstDayOfWeek(getFirstDayOfMonth(refDate)))
  const dates = Array.from({ length: 42 }).map((_, i) => {
    const date = mmnt.clone().add(i, 'day');
    const formattedDate = date.format('L');
    return ({ date, formattedDate, isToday: moment().format('L') === formattedDate})
  });
  return Array.from({ length: 6 }).map((_, i) => dates.slice(i*7,(i*7)+7));
}

export const fetchMonthEvents = (mockEvents: any[], dates: any[]) => {
  const allDays = dates.reduce((acc: any, curr: any) => [...acc, ...curr], []);
  const startDate = allDays[0].formattedDate;
  const endDate = allDays[allDays.length - 1].formattedDate;
  const events: any = {};
  mockEvents.forEach((event: { date: moment.MomentInput }) => {
    if(event && event.date && moment(event.date).isSameOrBefore(endDate) && moment(event.date).isSameOrAfter(startDate)) {
      if(events[event.date as string]) {
        events[event.date as string].push(event);
      } else {
        events[event.date as string] = [event];
      }
    }
  });
  return events;
}