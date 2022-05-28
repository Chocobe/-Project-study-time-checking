import { subjectApi } from "@/api/subject";

export const dispatchSubject = {
  async GET_SUBJECTS(subjectSetter) {
    try {
      const response = await subjectApi.GET();
      subjectSetter(response?.data ?? []);
    } catch (e) {
      console.warn(e.message);
    } finally {
      console.log("dispatchSubject - GET_SUBJECTS() 완료");
    }
  },

  async POST_SUBJECT({ subjectName }) {
    try {
      const response = await subjectApi.POST({ subjectName });
      return response?.data;
    } catch (e) {
      console.warn(e.message);
    } finally {
      console.log("dispatchSubject - POST_SUBJECT() 완료");
    }
  },

  async PUT_SUBJECT({ subjectId, subjectName, timeRecord }) {
    try {
      const response = await subjectApi.PUT({
        subjectId,
        subjectName,
        timeRecord,
      });

      return response?.data;
    } catch (e) {
      console.warn(e?.message);
    } finally {
      console.log("dispatchSubject - PUT_SUBJECT() 완료");
    }
  },
};