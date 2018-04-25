module.exports = function (playerPortfolio, todaysSales) { 
	//console.log(playerPortfolio);
	//console.log(todaysSales);

	// This code is a lighter version of aquadisplay/js/trading/updatePortfolio.js
	var stats = {}

	var runningTotalOfValue = 0;
    var runningTotalOfShares = 0;
    var dollarChange = 0;
    var price;

	//loop through player's portfolio and update with todaysSales info
    for(fishType in playerPortfolio){
    	if(fishType != "cash" && fishType != "aggStats"){
    		console.log(playerPortfolio[fishType])
    		price = todaysSales[fishType].avg;
    		console.log(`${fishType}: ${price}`); 

	        runningTotalOfValue += playerPortfolio[fishType].shares*(price);
	        runningTotalOfShares += playerPortfolio[fishType].shares;
    	}
    }

    // Update aggregate stats
    stats.value = runningTotalOfValue;
    stats.avg = (runningTotalOfValue/runningTotalOfShares).toFixed(2);
    stats.shares = runningTotalOfShares;
    stats.cash = playerPortfolio.cash;
	
	return stats;
};
