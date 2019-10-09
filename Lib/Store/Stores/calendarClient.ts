import { Store } from '../rootStore';
import { observable } from 'mobx';

export class CalendarClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable datePicked: string = '';
  @observable calendarViewDate: string = '';

  private convertToDayString = (date: Date) =>
    String(date.toLocaleString('en-GB')).slice(0, 10);

  getDatePicked = () => this.datePicked;

  setDatePicked = (date?: Date): string => {
    if (date) {
      let dayString: string = this.convertToDayString(date);

      this.datePicked = dayString;
      return dayString;
    } else {
      this.datePicked = '';
      return '';
    }
  };

  getCalendarViewDate = (date: Date): string => {
    let calendarViewDate: string = String(date.toLocaleString('en-GB')).slice(
      0,
      10
    );

    this.calendarViewDate = calendarViewDate;

    return this.calendarViewDate;
  };
}
