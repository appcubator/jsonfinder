define(function(require, exports, module) {

    'use strict';


    var LevelView = function(keys, title, parentObj, parentPath, level) {

    	this.title = title;

    	this.keys = keys;
   		this.parentPath = parentPath;
   		this.parentObj = parentObj;

    	if (parentPath == "ROOT" || parentPath == "null" || parentPath == null) {
    		this.parentPath = title;
    	}
    	else {
   			this.parentPath = parentPath + "."  + title;
    	}
    		
    		
    	this.level = level || 1;

    		//this.parentObj = this.superView.;

    	this.render = function() {

			var levelEl = document.createElement('ul');
			levelEl.className = "level one";

			var liEl = document.createElement('li');
			liEl.className = 'title';
			liEl.innerHTML = this.title;
			levelEl.appendChild(liEl);

			_.each(this.keys, function(key) {
				
				var liEl = this.renderLiEl(key);
				this.bindNavigationKey(liEl);
				levelEl.appendChild(liEl);
			}, this);

			document.body.appendChild(levelEl);
			this.domEl = levelEl;
    	},

    	this.renderLiEl = function(key) {
    		var liEl = document.createElement('li');
			liEl.dataset.key = key;
			liEl.dataset.level = this.level;
			liEl.dataset.parentPath = this.parentPath;

			var obj = {};

			if(this.title == "ROOT") {
				obj = this.parentObj[key];
			}
			else {
				obj = this.parentObj[this.key];
			}

			var type = getType(obj);
			liEl.innerHTML = '<span class="icon '+type+'"></span><span>' + key + '</span>';

			return liEl;
    	}


    	this.bindNavigationKey = function(domEl) {
			$(domEl).on('click', navigateToKey);
		}

		this.remove = function() {
			$(this.domEl).remove(); 
		}
    }

    return LevelView;

});