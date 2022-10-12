// various methods to export scrapped data

// save the results in a csv file
const makeCSV = (odds) => {
    let csv = odds.join("%0A");
    let a = document.create('a');
    a.href = 'data:attachment/csv,' + csv;
    a.target = '_blank';
    a.download = odds.csv;
    document.body.appendChild(a);
    a.click();
};