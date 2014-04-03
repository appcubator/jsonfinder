require.config({
    paths: {
        "jquery": "./libs/jquery/jquery",
        "jquery-ui": "./libs/jquery-ui/jquery-ui",
        "underscore": "./libs/underscore-amd/underscore",
        "ace": "http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace",
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

	console.log(json);

	var level1 = document.createElement('ul');
	level1.className = "level one";
	var level2 = document.createElement('ul');
	level2.className = "level two";
	var level3 = document.createElement('ul');
	level3.className = "level three";
	var levelEditor = document.createElement('div');
	levelEditor.className = "level editor";

	var editor = document.createElement('div');
	editor.className = "text-editor";
	editor.id = "textEditor";

	levelEditor.appendChild(editor);

	document.body.appendChild(level1);
	document.body.appendChild(level2);
	document.body.appendChild(level3);
	document.body.appendChild(levelEditor);


    var editor = ace.edit("textEditor");
   	editor.setTheme("ace/theme/monokai");
   	editor.getSession().setMode("ace/mode/javascript");

	function _isArray(obj) {
		return Object.prototype.toString.call( obj ) === '[object Array]';
	}

	function _isObject(obj) {
		return (typeof obj === 'object');
	}
	
	function _isString(obj) {
		return (typeof obj === 'string');
	}
	
	function _isNumber(obj) {
		return (typeof n === 'number');
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

	function fillEditor (string, key, newParentPath) {
		$(levelEditor).css('display', 'inline-block');
		editor.setValue(string);
	}

	var navigateToKey = function(e) {
		var el = e.currentTarget;
		var parentPath = el.dataset.parentPath;
		var key = el.dataset.key;
		var level = el.dataset.level;

		if (parentPath == null) {

		}
		else {
			var parentObj = getObjWithPath(parentPath);
			var obj = parentObj[key];

			if (_isNumber(obj)) {

			}
			else if (_isString(obj)) {
				fillEditor(obj, key, newParentPath);
			}
			else if (_isArray(obj)) {

			}
			else if (_isObject(obj)) {

				var keys = _.keys(obj);
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

	}

	var bindNavigationKey = function(domEl) {
		$(domEl).on('click', navigateToKey);
	}

	var keys = _.keys(json);
	var firstView = new LevelView(keys, "ROOT", null, 0);
	firstView.superView = this;
	firstView.render();
});

define("main", function() {});
