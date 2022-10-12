const axios = require('axios');
const cheerio = require('cheerio');

const scrapeParibet = async () => {
  const targetUrl = 'https://paribet.ug/'
  const rawData = await scrape(targetUrl)
  const resultCount = rawData?.length
  const arr = [...rawData]
  const data = arr.map(stringSet => {
    const value = getValues(stringSet)
    return value
  })
  // console.log('data', data)

// * some soup cleaning...
// gets the final soup from string into object
// ! eval method may cause security issues as it causes execution of code in case it's found present after converting the string to object!!!
function strToObj(str){
  var obj = {};
  if(str&&typeof str ==='string'){
      var objStr = str.match(/\{(.)+\}/g);
      eval("obj ="+objStr);
  }
  return obj
}

function getValues(dataString) {
  // remove the handler function from soup
  const resultA = dataString.split('addBetsToBetSlip')
  const resultB = resultA[1]
  // then remove the ending parameter from soup
  // const resultC = resultB.split(',125838836)')
  // const resultD = resultC[0]
// turn soup string into object...
  const result = strToObj(resultB)
  // console.log('cleaned result:',result)
  return result;
}

// * the real scrapping process...
async function scrape(Url) {
  try {
    const response = await axios.get(Url);

    const html = response.data;

    const $ = cheerio.load(html);

    const rawData = []

    $('div.SB-btnOddsGroup > ul > li > button').each((_idx, el) => {
      let soup = el.attribs.onclick
      rawData.push(soup);
    });
    return rawData;
  } catch (error) {
    throw error;
  }
}

const dataExport = {
  target: targetUrl,
  resultCount: resultCount,
  data: data
}

return data ? dataExport : 'Scraping...'
};

// * invoke the function
scrapeParibet().then(data => console.log(data))