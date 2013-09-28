var POP =  (function() {
	typePreference = {};
	




	return  {
		Answer: function(ans, type, weight) {
		if (ans) {
			if (typePreference[type]) {
				typePreference[type] += weight;
			} else {
				typePreference[type] = weight;
			}
		} else {
			if (typePreference[type]) {
				typePreference[type] -= weight;
			} else {
				typePreference[type] = -weight;
			}
		}
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
		}
	}

})();