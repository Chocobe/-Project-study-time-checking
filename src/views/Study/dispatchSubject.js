import { subjectApi } from "@/api/subject";

export const dispatchSubject = {
  async GET(subjectSetter) {
    try {
      const response = await subjectApi.GET();
      subjectSetter(response?.data ?? []);
      
      return true;
    } catch (e) {
      console.warn(e.message);

      return false;
    } finally {
      console.log("dispatchSubject - GET_SUBJECTS() 완료");
    }
  },

  async POST({ subjectName }) {
    try {
      const response = await subjectApi.POST({ subjectName });
      return response?.data;
    } catch (e) {
      console.warn(e.message);
    } finally {
      console.log("dispatchSubject - POST_SUBJECT() 완료");
    }
  },

  async PUT({ subjectId, subjectName, timeRecord }) {
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

  async DELETE({ subjectId }) {
    try {
      const response = await subjectApi.DELETE({ subjectId });
      
      return response?.data;
    } catch (e) {
      console.warn(e?.message);
    } finally {
      console.log("dispatchSubject - DELETE() 완료");
    }
  }
};