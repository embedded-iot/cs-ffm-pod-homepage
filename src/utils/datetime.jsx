import moment from 'moment';
import momentTimezone from 'moment-timezone';

function convert(datetime, formatStr, timeZone) {
  if (!datetime || !formatStr)
    return '';
  if (!timeZone) {
    return moment(datetime).format(formatStr);
  }
  return momentTimezone.tz(datetime, timeZone).format(formatStr);
}

function getPreviousDay(date = new Date(), count = 1) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - count);
  return previous;
}

export {
  convert,
  getPreviousDay,
}
