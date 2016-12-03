import Moment from 'moment';
require("moment-duration-format");

const time = {
  /**
   * formats and returns time in format required by bart API
   * @method getBartTime
   * @param  {[type]}    time [description]
   * @return {[type]}    [description]
   */
  getBartTime (time) {
    return time && Moment(time.trim()).format('MM/DD/YYYY h:mm+a').trim();
  },

  getTodaysDate () {
    return Moment().format("YYYY-MM-DD");
  },

  getRightNowTime () {
    return Moment().format("HH:mm");
  },

  getDateTimeLocalFormat () {
    return 'YYYY-MM-DDThh:mm';
  },

  getDateFormat () {
    return 'YYYY-MM-DD';
  },

  getTimeFormat () {
    return 'HH:mm';
  },
  getDuration ({ startTime, startDate, endTime, endDate }) {
    const duration = Math.abs(Moment(`${endDate} ${endTime}`, 'MM/DD/YYYY h:mm+a') - Moment(`${startDate} ${startTime}`, 'MM/DD/YYYY h:mm+a'));

    return Moment.duration(duration).format("h [hrs], m [min]");
  },
}

export default time;
