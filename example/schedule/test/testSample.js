const schedule = require('../schedule');
const menu = require('../../cli/menu');
const util = require('../../util');
const moment = require('moment');

const SAMPLE_HOLIDAY_GROUP_ID = 1;
const WEEKLY_SCHEDULE_ID = 2; // 0 and 1 are reserved
const DAILY_SCHEDULE_ID = WEEKLY_SCHEDULE_ID + 1;
const NUM_OF_DAY = 30;

async function test(devID) {
  try {
    // Backup the original schedules
    const origSchedules = await schedule.getList(devID);
    const origHolidayGroups = await schedule.getHolidayList(devID);
    
    console.log('Original Schedules: ', JSON.stringify(util.toObjectArray(origSchedules)));
    console.log('Original Holiday Groups: ', JSON.stringify(util.toObjectArray(origSchedules)));

    // Test sample schedules
    console.log('\n', '===== Test Sample Schedules =====', '\n');
    await schedule.deleteAll(devID);
    await schedule.deleteAllHoliday(devID);

    const holidaySchedule = await makeHolidayGroup(devID);
    await makeWeeklySchedule(devID, holidaySchedule);
    await makeDailySchedule(devID);

    const newSchedules = await schedule.getList(devID);
    const newHolidayGroups = await schedule.getHolidayList(devID);

    console.log('>>> Sample Schedules: ', JSON.stringify(util.toObjectArray(newSchedules)), '\n');
    console.log('>>> Sample Holiday Groups: ', JSON.stringify(util.toObjectArray(newHolidayGroups)));

    await menu.pressEnter('>> Press ENTER to finish the test.\n');

    // Restore the original schedules
    await schedule.deleteAll(devID);
    await schedule.deleteAllHoliday(devID);

    if(origSchedules.length > 0) {
      await schedule.add(devID, origSchedules);
    }
    if(origHolidayGroups.length > 0) {
      await schedule.addHoliday(devID, origHolidayGroups);
    } 
  }
  catch(err) {
    console.error('Cannot finish the schedule test: ', err);
    throw err;
  }
}

async function makeHolidayGroup(devID) {
  const jan1st = new schedule.scheduleMessage.Holiday();
  jan1st.setDate(0); // Jan. 1st
  jan1st.setRecurrence(schedule.scheduleMessage.HolidayRecurrence.RECUR_YEARLY);
  
  const dec25th = new schedule.scheduleMessage.Holiday();
  dec25th.setDate(358); // Dec. 25th in non leap year, 359 in leap year
  dec25th.setRecurrence(schedule.scheduleMessage.HolidayRecurrence.RECUR_YEARLY);

  const holidayGroup = new schedule.scheduleMessage.HolidayGroup();
  holidayGroup.setId(SAMPLE_HOLIDAY_GROUP_ID);
  holidayGroup.setName('Sample Holiday Group');
  holidayGroup.addHolidays(jan1st);
  holidayGroup.addHolidays(dec25th);

  await schedule.addHoliday(devID, [holidayGroup]);

  const timePeriod = new schedule.scheduleMessage.TimePeriod(); // 10 am ~ 12 pm
  timePeriod.setStarttime(600);
  timePeriod.setEndtime(720);

  const daySchedule = new schedule.scheduleMessage.DaySchedule();
  daySchedule.addPeriods(timePeriod);

  const holidaySchedule = new schedule.scheduleMessage.HolidaySchedule();
  holidaySchedule.setGroupid(SAMPLE_HOLIDAY_GROUP_ID);
  holidaySchedule.setDayschedule(daySchedule);

  return holidaySchedule;
}

async function makeWeeklySchedule(devID, holidaySchedule) {
  const morningPeriod = new schedule.scheduleMessage.TimePeriod(); // 9 am ~ 12 pm
  morningPeriod.setStarttime(540);
  morningPeriod.setEndtime(720);

  const afternoonPeriod = new schedule.scheduleMessage.TimePeriod(); // 1 pm ~ 6 pm
  afternoonPeriod.setStarttime(780);
  afternoonPeriod.setEndtime(1080);

  const weekdaySchedule = new schedule.scheduleMessage.DaySchedule();
  weekdaySchedule.addPeriods(morningPeriod);
  weekdaySchedule.addPeriods(afternoonPeriod);

  const weekendPeriod = new schedule.scheduleMessage.TimePeriod(); // 9:30 am ~ 12:30 pm
  weekendPeriod.setStarttime(570);
  weekendPeriod.setEndtime(770);

  const weekendSchedule = new schedule.scheduleMessage.DaySchedule();
  weekendSchedule.addPeriods(weekendPeriod);

  const weeklySchedule = new schedule.scheduleMessage.WeeklySchedule();
  weeklySchedule.addDayschedules(weekendSchedule); // Sunday
  weeklySchedule.addDayschedules(weekdaySchedule); // Monday
  weeklySchedule.addDayschedules(weekdaySchedule); // Tuesday
  weeklySchedule.addDayschedules(weekdaySchedule); // Wednesday
  weeklySchedule.addDayschedules(weekdaySchedule); // Thursday
  weeklySchedule.addDayschedules(weekdaySchedule); // Friday
  weeklySchedule.addDayschedules(weekendSchedule); // Saturday

  const scheduleInfo = new schedule.scheduleMessage.ScheduleInfo();
  scheduleInfo.setId(WEEKLY_SCHEDULE_ID);
  scheduleInfo.setName('Sample Weekly Schedule');
  scheduleInfo.setWeekly(weeklySchedule);
  scheduleInfo.addHolidays(holidaySchedule);

  await schedule.add(devID, [scheduleInfo]);
}

async function makeDailySchedule(devID) {
  const morningPeriod = new schedule.scheduleMessage.TimePeriod(); // 9 am ~ 12 pm
  morningPeriod.setStarttime(540);
  morningPeriod.setEndtime(720);

  const afternoonPeriod = new schedule.scheduleMessage.TimePeriod(); // 1 pm ~ 6 pm
  afternoonPeriod.setStarttime(780);
  afternoonPeriod.setEndtime(1080);

  const daySchedule = new schedule.scheduleMessage.DaySchedule();
  daySchedule.addPeriods(morningPeriod);
  daySchedule.addPeriods(afternoonPeriod);

  const dailySchedule = new schedule.scheduleMessage.DailySchedule(); // 30 days starting from today
  dailySchedule.setStartdate(moment().dayOfYear() - 1);
  for(let i = 0; i < NUM_OF_DAY; i++){
    dailySchedule.addDayschedules(daySchedule);
  }

  const scheduleInfo = new schedule.scheduleMessage.ScheduleInfo();
  scheduleInfo.setId(DAILY_SCHEDULE_ID);
  scheduleInfo.setName('Sample Daily Schedule');
  scheduleInfo.setDaily(dailySchedule);

  await schedule.add(devID, [scheduleInfo]);
}

module.exports.test = test;