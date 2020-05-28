import "@testing-library/jest-dom/extend-expect";
import casual from "casual";
import { GlobalWithFetchMock } from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;

const apiUrl = casual.url.toLocaleLowerCase();

global.process.env = {
  ...global.process.env,
  API_URL: apiUrl
};

if (typeof window !== "undefined") {
  (window as any).env = {
    API_URL: apiUrl
  };
}
