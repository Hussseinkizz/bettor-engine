const axios = require('axios');
const cheerio = require('cheerio');

const fetchOdds = async () => {
  try {
    // const response = await axios.get('https://old.reddit.com/r/movies/');
    const target = 'https://paribet.ug/'
    const response = await axios.get(target);

    const html = response.data;

    const $ = cheerio.load(html);

    const odds = [];

    // $('div > p.title > a').each((_idx, el) => {
    //   const title = $(el).text();
    //   odds.push(title);
    // });
    $('div.SB-btnOddsGroup > ul > li > button').each((_idx, el) => {
      const odd = $(el).text();
      odds.push({odd : odd});
    });

    return odds;
  } catch (error) {
    throw error;
  }
};

// save the results in a csv file
const makeCSV = (odds) => {
    let csv = odds.join("%0A");
    let a = document.createElement('a');
    a.href = 'data:attachment/csv,' + csv;
    a.target = '_blank';
    a.download = odds.csv;
    document.body.appendChild(a);
    a.click();
};

// invoke the function
// fetchOdds().then((odds) => makeCSV(odds));
fetchOdds().then((odds) => console.log(odds));