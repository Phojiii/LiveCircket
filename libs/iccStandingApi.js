const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/iccstanding/team/matchtype/1',
  headers: {
    'x-rapidapi-key': '1b90e35014msh96072b2bc354d8cp17ff78jsnb0872df43b61',
    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();