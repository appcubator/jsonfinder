require.config({
    paths: {
        "jquery": "./libs/jquery/jquery",
        "jquery-ui": "./libs/jquery-ui/jquery-ui",
        "underscore": "./libs/underscore-amd/underscore"
    },

    shim: {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "underscore": {
            exports: "_"
        }
    },

    urlArgs: "bust="

});

require.config({
    urlArgs: "bust=yolo"
});

//libs
require(['underscore', 'jquery', './test-json'],function() {
	console.log(json);

	var level1 = document.createElement('ul');
	level1.className = "level one";
	var level2 = document.createElement('ul');
	level2.className = "level two";
	var level3 = document.createElement('ul');
	level3.className = "level three";

	document.body.appendChild(level1);
	document.body.appendChild(level2);
	document.body.appendChild(level3);

	function _isArray(obj) {

	}

	function _isObject(obj) {

	}
	
	function _isString(obj) {

	}
	
	function _isNumber(obj) {

	}

	function getObjWithPath(path) {
		var tokens = path.split('.');
		
		console.log(path);
		if (tokens.length == 0 || path == null || path == "null") {
			return json;
		}

		else {
			var curObj = json;
			_.each(tokens, function(token) {
				curObj = curObj[token];
			});

			return curObj;
		}
	}

	function layoutLevel1 (keys, title, parentPath) {
		level1.innerHTML = '';
		var liEl = document.createElement('li');
		liEl.className = 'title';
		liEl.innerHTML = title;
		level1.appendChild(liEl);

		_.each(keys, function(key) {
			var liEl = document.createElement('li');
			liEl.dataset.key = key;
			liEl.dataset.level = 1;
			liEl.dataset.parentPath = parentPath;
			liEl.innerHTML = key;
			bindNavigationKey(liEl);
			level1.appendChild(liEl);
		});
	};

	var navigateToKey = function(e) {
		var el = e.currentTarget;
		var parentPath = el.dataset.parentPath;
		var key = el.dataset.key;
		var level = el.dataset.level;

		if (parentPath == null) {

		}
		else {
			var obj = getObjWithPath(parentPath);
			var keys = _.keys(obj[key]);
			var newParentPath = parentPath + "." + key;

			switch(level) {
				case "1":
					layoutLevel2(keys, key, newParentPath);
					break;
				case "2":
					layoutLevel3(keys, key, newParentPath);
					break;
			}
		}

	}

	var bindNavigationKey = function(domEl) {
		$(domEl).on('click', navigateToKey);
	}

	function layoutLevel2 (keys, title, parentPath) {
		level2.innerHTML = '';
		var liEl = document.createElement('li');
		liEl.className = 'title';
		liEl.innerHTML = title;
		level2.appendChild(liEl);

		_.each(keys, function(key) {
			console.log(key);
			var liEl = document.createElement('li');
			liEl.dataset.key = key;
			liEl.dataset.level = 2;
			liEl.dataset.parentPath = parentPath;
			liEl.innerHTML = key;
			bindNavigationKey(liEl);
			level2.appendChild(liEl);
		});
	};

	var keys = _.keys(json);
	layoutLevel1(keys, "ROOT", null);

});

define("main", function() {});
