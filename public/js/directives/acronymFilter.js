angular.module('mainApp')
	.filter('acronym', acronym);

function acronym() {
        return function (text) {
            if (!text) {
                 text="None";
            }

            var acr = [];

            var res = text.split(" ");
            text = res.map(function(word) {
                var str = String(word).substring(0,1) + '.';
                acr.push(str);
            });

            return acr.join(" ");
        };
    }
