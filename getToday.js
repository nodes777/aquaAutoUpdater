module.exports = function () { 
	var date = new Date(Date.now());

	var dateArray = date.toString().split(" ");
	var dayOfWeek = dateArray[0];
	var dayScraped = dateArray.slice(2,3);
	dayScraped.push(dayOfWeek);
	var dayScrapedUrl = dayScraped.join("-");

	var firebaseMonth = dateArray.slice(1,2);
	var firebaseMonthAndYear = firebaseMonth + dateArray.slice(3,4);
	var firebaseMonthDashYear = firebaseMonth +"-" +dateArray.slice(3,4);

	var firebaseMonthPath = firebaseMonthDashYear.toString();

	var dateString = `${firebaseMonthPath}-${dayScrapedUrl}`;
	console.log(dateString);
	return dateString;
};