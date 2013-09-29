$(function() {
	$.deck('.slide');
});

var POP =  (function() {
	typePreference = {};
	




	return  {
		Answer: function(type, weight) {
		if (typePreference[type]) {
			typePreference[type] += weight;
		} else {
			typePreference[type] = weight;
		}
		$.deck('next');
		console.log(typePreference[type]);
	},
		scoreLanguage: function(langPreference) {
			var score = 0;
			for (var type in langPreference) {
				if (langPreference[type]) {
					score += typePreference[type]; 
				} else {
					score -= typePreference[type];
				}
			}
			return score;
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
			timeout = window.setTimeout(removePop, 750);

		}
	}

})();