$(function() {
	$.deck('.slide');
});

var POP =  (function() {
	var typeList = [];
	var typeScoreList =[];
	var typePreference = {};
	var langList = [];

	
	var Python = {langPreference:{}, name:"Python"};
	Python.langPreference['OOP'] = true;
	Python.langPreference['beginner'] = true;
	Python.langPreference['lowlevel'] = false;
	Python.langPreference['imperative'] = true;
	Python.langPreference['webdev'] = "mid";
	Python.langPreference['scripting'] = true;
	Python.langPreference['allpurpose'] = true;
	Python.langPreference['functional'] = false;
	langList.push(Python);


	var C = {langPreference:{}, name:"C"};
	C.langPreference['OOP'] = false;
	C.langPreference['beginner'] = false;
	C.langPreference['lowlevel'] = true;
	C.langPreference['imperative'] = true;
	C.langPreference['scripting'] = false;
	C.langPreference['webdev'] = false;
	C.langPreference['allpurpose'] = false;
	C.langPreference['functional'] = false;
	langList.push(C);


	var Scheme = {langPreference:{}, name:"Scheme"};
	Scheme.langPreference['OOP'] = false;
	Scheme.langPreference['beginner'] = false;
	Scheme.langPreference['lowlevel'] = false;
	Scheme.langPreference['imperative'] = false;
	Scheme.langPreference['webdev'] = false;
	Scheme.langPreference['scripting'] = false;
	Scheme.langPreference['allpurpose'] = false;
	Scheme.langPreference['functional'] = true;
	langList.push(Scheme);
	

	var Javascript = {langPreference:{}, name:"Javascript"};
	Javascript.langPreference['OOP'] = true;
	Javascript.langPreference['beginner'] = true;
	Javascript.langPreference['lowlevel'] = false;
	Javascript.langPreference['imperative'] = true;
	Javascript.langPreference['webdev'] = true;
	Javascript.langPreference['scripting'] = true;
	Javascript.langPreference['allpurpose'] = false;
	Javascript.langPreference['functional'] = false;
	langList.push(Javascript);

	var cPlusPlus = {langPreference:{}, name:"C++"};
	cPlusPlus.langPreference['OOP'] = true;
	cPlusPlus.langPreference['beginner'] = "mid";
	cPlusPlus.langPreference['lowlevel'] = "mid";
	cPlusPlus.langPreference['imperative'] = true;
	cPlusPlus.langPreference['webdev'] = false;
	cPlusPlus.langPreference['scripting'] = false;
	cPlusPlus.langPreference['allpurpose'] = false;
	cPlusPlus.langPreference['functional'] = false;
	langList.push(cPlusPlus);


	var Java = {langPreference:{}, name:"Java"};
	Java.langPreference['OOP'] = true;
	Java.langPreference['beginner'] = "med";
	Java.langPreference['lowlevel'] = false;
	Java.langPreference['imperative'] = true;
	Java.langPreference['webdev'] ="med";
	Java.langPreference['scripting'] = false;
	Java.langPreference['allpurpose'] = true;
	Java.langPreference['functional'] = false;
	langList.push(Java);


	var Haskell = {langPreference:{}, name:"Haskell"};
	Haskell.langPreference['OOP'] = false;
	Haskell.langPreference['beginner'] = false;
	Haskell.langPreference['lowlevel'] = false;
	Haskell.langPreference['imperative'] = false;
	Haskell.langPreference['webdev'] = false;
	Haskell.langPreference['scripting'] = true;
	Haskell.langPreference['allpurpose'] = false;
	Haskell.langPreference['functional'] = true;
	langList.push(Haskell);


	return  {
		Answer: function(type, weight) {
		if (typePreference[type]) {
			typePreference[type] += weight;
		} else {
			typePreference[type] = weight;
		}
		$.deck('next');
		//console.log($.deck('getSlide'));
		//console.log(typePreference[type]);
	},
		scoreLanguage: function() {
			console.log(typePreference['scripting']);
			console.log("SCRIPTing");
			var scoreList = {};
			nameList = [];
			highscore = -99999;
			highscorer = "";
			for (var i=0; i<langList.length; i++) {
				//console.log(langList[i]);
				var score = 0;			
				for (var type in langList[i].langPreference) {
					console.log(type);
					console.log(typePreference[type]/2);
					if (langList[i].langPreference[type] == "mid") {
						if ((typePreference[type]/2) !== NaN) {
							score += (typePreference[type]/2);
						}
					}
					else if (langList[i].langPreference[type] && (typePreference[type] !== undefined)) {
						score += typePreference[type]; 
					} else {
						score -= (typePreference[type]);
					}
					if ($.inArray(type,typeList)==-1) {
						typeList.push(type);
						if (typePreference[type] == undefined || typePreference[type] < 0) {
							typeScoreList.push(0);
						} else {
							typeScoreList.push(typePreference[type]);
						}
					}
				}
				console.log(score);
				console.log(langList[i].name);
				if (score > highscore) {
					highscore = score;
					highscorer = langList[i].name;
				} 
				scoreList[langList[i].name] = score;
				nameList.push(langList[i].name);
			}
			console.log(typeScoreList);
			$("#quiz").hide();
			var str = "<p>We believe the best choice for you is ".concat(highscorer).concat(" with a score of ").concat(parseFloat(highscore)).concat(". </p>");
			$("#winner").append(str);
			console.log(highscore);
			console.log(highscorer);
			console.log("a");
			var ctx = $("#results").get(0).getContext("2d");
			//This will get the first returned node in the jQuery collection.
			//var myNewChart = new Chart(ctx);





			var data = {
				labels : typeList,
				datasets : [
					{
						fillColor : "rgba(151,187,205,0.5)",
						strokeColor : "rgba(151,187,205,1)",
						pointColor : "rgba(151,187,205,1)",
						pointStrokeColor : "#fff",
						data : typeScoreList
					},
					{
						fillColor : "rgba(220,220,220,0.5)",
						strokeColor : "rgba(220,220,220,1)",
						pointColor : "rgba(220,220,220,1)",
						pointStrokeColor : "#fff",
						data : []
					}
				]
			}

			new Chart(ctx).Radar(data);

			return scoreList;
		},
		getPrefScore: function(type) {
			return typePreference[type];
		},
		popJoke: function(joke) {
			$('#joke').attr('title',joke);
			//console.log($('#joke').popup);
			$('#joke').popup('create');
			$('#joke').popup('toggle');
			function removePop() {
				$('#joke').popup('toggle');
			}
			timeout = window.setTimeout(removePop, 1750);

		}
	}

})();