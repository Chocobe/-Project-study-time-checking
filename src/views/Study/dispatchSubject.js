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
    }
  },

  async POST({ subjectName }) {
    try {
      const response = await subjectApi.POST({ subjectName });
      return response?.data;
    } catch (e) {
      console.warn(e.message);
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
    }
  },

  async DELETE({ subjectId }) {
    try {
      const response = await subjectApi.DELETE({ subjectId });
      
      return response?.data;
    } catch (e) {
      console.warn(e?.message);
    }
  }
};