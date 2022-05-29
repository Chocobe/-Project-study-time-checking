import { tokenApi } from "./";

export const timeRecordApi = {
  URL: "/subjects/###/timeRecord",

  POST({ subjectId, startDate, studyTime, phoneTime, emptyTime }) {
    const url = this.URL.replace("###", subjectId);
    return tokenApi.post(url, {
      startDate, studyTime, phoneTime, emptyTime,
    });
  },
};