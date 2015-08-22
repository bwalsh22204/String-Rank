/*
Problem:
Consider a word as any sequence of capital letters A-Z, not limited to just dictionary words. 
For any word with at least two different letters there are other words composed of the same letters 
but in a different order. For instance, stationarily and antiroyalist, which happen to both be 
dictionary words. For our purpose alianrostily is also a word composed of the same letters as these 
two. We can then assign a number to every word based on where it falls within an alphabetically 
sorted list of all words made up of the same set of letters.

One way to do this would be to generate the entire list of words and then find the desired ones, 
but this would be slow if the word is long. Write a program that takes a word as a command line 
argument and prints to standard output its number. Do not use the method above of generating the 
entire list. Your program should be able to accept any word 25 letters or less in length possibly 
with some letters repeated. It should use no more than 1 gig of memory and take no more than 500 
milliseconds to run.

Source: http://www.cio.com/article/2383000/careers-staffing/how-to-prepare-for--and-ace--the-technical-interview.html
*/

"use strict";

var sys = require("sys");

var stdin = process.openStdin();

// Source: http://stackoverflow.com/questions/8128578/reading-value-from-console-interactively
stdin.addListener("data", function(userIn) {

    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring()

    userIn = userIn.toString().trim().toUpperCase();
    console.log("you entered: [" + userIn + "]");

    if (userIn.length < 1 || userIn.length > 25) console.log("input out of bounds 1 - 25 characters");
    	else {
    		console.log( calcStringRank(userIn));
    	}

 });

function calcStringRank (userIn) {

	var returnString =  "Length: " + userIn.length;
	var stringRank = 0;

	var userInArr = userIn.split('');
	userInArr.sort();
	console.log(userInArr);

	var handicap = 0;

	for (var i = 0; i < userIn.length; i++) {

		for (var j = 0; j < userInArr.length; j++) {

			console.log(userIn.charAt(i) + ' == ' + userInArr[j] + "?");
			if (userIn.charAt(i) == userInArr[j]) {
				var iVal = userIn.length - i - 1;
				var result = Factorial(iVal) * j;
				//console.log(iVal + ' * (' + j + ' + ' + handicap + ') = ' + result);
				console.log("Factorial(" + iVal + ") * " + j + " = " + result);
				stringRank += result;

				userInArr.splice(j, 1);
				break;
			}

		}

	}

	returnString += "\nRank: " + stringRank;

	return returnString;

}

function Factorial (n) {

	var f = [];

	function factorial (n) {
		if (n == 0 || n == 1)
			return 1;
		if (f[n] > 0)
			return f[n];
		return f[n] = factorial(n-1) * n;
	}

	return factorial(n);

}
