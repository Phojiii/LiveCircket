// libs/iccRanking.js
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen',
  params: { formatType: 'test' },
  headers: {
    'x-rapidapi-key': '1b90e35014msh96072b2bc354d8cp17ff78jsnb0872df43b61',
    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
  },
};

async function fetchICCRankings() {
  try {
    const response = await axios.request(options);
    return response.data; // Return the rankings data
  } catch (error) {
    console.error('Error fetching ICC rankings:', error.message);
    return null;
  }
}

module.exports = { fetchICCRankings };
