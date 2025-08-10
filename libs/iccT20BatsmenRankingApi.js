import axios from "axios";

const options = {
  method: "GET",
  url: "https://cricbuzz-cricket2.p.rapidapi.com/mcenter/v1/100238/leanback",
  headers: {
    "x-rapidapi-key": "1b90e35014msh96072b2bc354d8cp17ff78jsnb0872df43b61",
    "x-rapidapi-host": "cricbuzz-cricket2.p.rapidapi.com",
  },
};

export async function fetchT20BatsmenLeanback() {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}