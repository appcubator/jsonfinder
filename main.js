require.config({
    paths: {
        "jquery": "./libs/jquery/jquery",
        "jquery-ui": "./libs/jquery-ui/jquery-ui",
        "underscore": "./libs/underscore-amd/underscore",
        "ace": "./libs/ace/ace",
    },

    shim: {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "underscore": {
            exports: "_"
        },
        "ace": {
            exports: 'ace'
        }
    },

    urlArgs: "bust="

});

require.config({
    urlArgs: "bust=yolo"
});

//libs
require(['underscore', 'jquery', 'ace', './level', './test-json'], 

function(_, $, ace, LevelView) {

	var levels = {};

	getType = function(obj) {

			if (_isNumber(obj)) {
				return "number";
			}
			else if (_isString(obj)) {
				return "string";
			}
			else if (_isArray(obj)) {
				return "array";
			}
			else if (_isObject(obj)) {

				return "object";
			}

			return "unknown";
	}
    //var editor = ace.edit("textEditor");
   	//editor.setTheme("ace/theme/monokai");
   	//editor.getSession().setMode("ace/mode/javascript");

	function _isArray(obj) {
		return Object.prototype.toString.call( obj ) === '[object Array]';
	}

	function _isObject(obj) {
		return (typeof obj === 'object');
	}
	
	function _isString(obj) {
		return (typeof obj === 'string' || obj == "");
	}
	
	function _isNumber(obj) {
		return (typeof n === 'number');
	}

	cleanDeeperLevels = function(levelNo) {

		var curLevel = levels[levelNo];

		while (curLevel) {

			curLevel.remove(); 
			curLevel = null; 
			levelNo++;
			curLevel = levels[levelNo];

		}
	}

	getObjWithPath =  function(path) {
		var tokens = path.split('.');
		
		if (tokens.length == 0 || path == null || path == "null" || path == "ROOT") {
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

	function fillEditor (string, key, newParentPath) {
		$(levelEditor).css('display', 'inline-block');
		editor.setValue(string);
	}

	navigateToKey = function(e) {
		var el = e.currentTarget;
		var parentPath = el.dataset.parentPath;
		var key = el.dataset.key;
		var level = el.dataset.level;
		var parentObj = getObjWithPath(parentPath);
		var obj = parentObj[key];

		
		switch (getType(obj)) {
			case "object":
				level = parseInt(level) + 1;
				navigateToObject(obj, key, parentPath, level);
				break;
			case "string":
				level = parseInt(level) + 1;
				editString(obj, key, parentObj, parentPath, level);
				break;
			case "array":
				level = parseInt(level) + 1;
				navigateToArray(obj, key, parentPath, level);
				break;
			case "number":
			 	editNumber(obj);
				break;
		}

	}

	editString = function(obj, title, parentObj, parentPath, fromLevel) {

		var nextLevel = fromLevel++;
		cleanDeeperLevels(nextLevel);

		var levelEditor = document.createElement('div');
		levelEditor.className = "level editor";

		var editor = document.createElement('div');
		editor.className = "text-editor";
		editor.id = "textEditor";

		levelEditor.appendChild(editor);
		document.body.appendChild(levelEditor);

	    var editor = ace.edit("textEditor");
	   	//editor.setTheme("ace/theme/monokai");
	   	//editor.getSession().setMode("ace/mode/javascript");
	   	editor.setValue(obj);


	   	editor.getSession().on('change', function(e) {
		    var val = editor.getValue();
		    parentObj[title] = val;
		});

		levels[nextLevel] = $(levelEditor);
	},

	navigateToObject = function(obj, title, parentPath, fromLevel) {
		var nextLevel = fromLevel++;
		var keys = _.keys(obj);

		cleanDeeperLevels(nextLevel);
		
		var firstView = new LevelView(keys, title, obj, parentPath, nextLevel);
		firstView.superView = this;
		firstView.render();

		levels[nextLevel] = firstView;
	}

	navigateToArray = function(obj, title, parentPath, fromLevel) {
		
		var nextLevel = fromLevel++;
		var keys = _.map(obj, function(val, ind) { return ind });

		cleanDeeperLevels(nextLevel);
		
		var firstView = new LevelView(keys, title, obj, parentPath, nextLevel);
		firstView.superView = this;
		firstView.render();

		levels[nextLevel] = firstView;
	}


	var bindNavigationKey = function(domEl) {
		$(domEl).on('click', navigateToKey);
	}

	var keys = _.keys(json);
	var firstView = new LevelView(keys, "ROOT", json, null, 0);
	firstView.superView = this;
	firstView.render();

	levels[0] = firstView;
});

define("main", function() {});
