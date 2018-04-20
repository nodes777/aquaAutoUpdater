module.exports = function (playerPortfolio, todaysSales) { 
	//console.log(playerPortfolio);
	//console.log(todaysSales);

	var stats = {}

	var runningTotalOfValue = 0;
    var runningTotalOfShares = 0;
    var dollarChange = 0;
    var price;

	//loop through salesStats & player portfolio stats
    // player first as it's likely to be smaller

    for(fishType in playerPortfolio){
    	if(fishType != "cash" && fishType != "aggStats"){
    		console.log(playerPortfolio[fishType])
    		price = todaysSales[fishType].avg;
    		console.log(price);
	    	// portfolioData[fishType].value = portfolioData[fishType].shares*(price);
	     //    portfolioData[fishType].quote = price;
	     //    //portfolioData[fishType].weight = // (portfolioData[fishType].value/portfolioData.value) portfolioData.value is out of date at this point.
	     //    dollarChange = portfolioData[fishType].value - portfolioData[fishType].paid;
	     //    portfolioData[fishType].dollarChange = `$ ${dollarChange}`;
	     //    portfolioData[fishType].percentChange = `${(((dollarChange/portfolioData[fishType].paid).toFixed(2))*100)} %`;

	     //    runningTotalOfValue += portfolioData[fishType].value;
	     //    runningTotalOfShares = runningTotalOfShares + portfolioData[fishType].shares;
    	}
    }

    // Update aggregate stats
    // portfolioData.aggStats.value = runningTotalOfValue;
    // portfolioData.aggStats.avg = (runningTotalOfValue/runningTotalOfShares).toFixed(2);
    // portfolioData.aggStats.shares = runningTotalOfShares;

    // // Apply weight since it was dependent on getting the totals first. Inefficient to loop through these all again
    // for (fishType in portfolioData) {
    // 	if(fishType != 'value' && fishType != 'avg' && fishType != 'Avg') {
	   //      portfolioData[fishType].weight = (portfolioData[fishType].value/portfolioData.aggStats.value).toFixed(2);
    // 	}
    // }


	
	return stats;
};




// function getPriceOf(fish){
// 	if (!todaysPrices[fish]) {
// 		//console.log(`${fish} can't be sold today`)
// 		return 0;
// 	}
// 	return todaysPrices[fish].price;
// }