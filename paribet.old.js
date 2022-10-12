const axios = require('axios');
const cheerio = require('cheerio');

const scrapeParibet = async (targetUrl) => {
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
  const resultA = dataString.split('addBetsToBetSlip(')
  const resultB = resultA[1]
  // then remove the ending parameter from soup
  const resultC = resultB.split(',125838836)')
  const resultD = resultC[0]
// turn soup string into object...
  const result = strToObj(resultD)
  return result;
  // console.log(result)
}


// * the real scrapping process...
  try {
    const response = await axios.get(targetUrl);

    const html = response.data;

    const $ = cheerio.load(html);

    const dataSet = [];

    $('div.SB-btnOddsGroup > ul > li > button').each((_idx, el) => {
      let soup = el.attribs.onclick
      dataSet.push(soup);
    });

    // soups data;
    const data = dataSet.forEach(set => {
    //   console.log('set', set)
      getValues(set)
    })
    return {data: data};
  } catch (error) {
    throw error;
  }
};

// * invoke the function
const targetUrl = 'https://paribet.ug/'
// const { data } = scrapeParibet(targetUrl);
// console.log(data)
scrapeParibet(targetUrl).then(data => console.log(data))