import { tokenApi } from "./";

export const subjectApi = {
  URI: "/subjects",
  
  GET() {
    return tokenApi.get(this.URI);
  },

  POST({ subjectName }) {
    return tokenApi.post(this.URI, { subjectName });
  },
};