export default class Activity {
  constructor() {
    this.executionTime = process.env.ACTIVITY_EXEC_TIME || 600_000;
  }
}
