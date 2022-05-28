import { tokenApi } from "./";

export const subjectApi = {
  URI: "/subjects",
  
  GET() {
    return tokenApi.get(this.URI);
  },

  POST({ subjectName }) {
    console.log(`subjectApi 에서 받은 post subjectName: ${subjectName}`);
    return tokenApi.post(this.URI, { subjectName });
  },

  PUT({ subjectId, subjectName, timeRecord }) {
    return tokenApi.put(`${this.URI}/${subjectId}`, {
      subjectId,
      subjectName,
      timeRecord,
    });
  },
};