define(function(require, exports, module) {

    'use strict';


    var LevelView = function() {

    	this.initialize = function(keys, title, parentPath, level) {

    		this.title = title;
    		this.keys = keys;
    		this.parentPath = parentPath;
    		this.level = level || 1;

    		this.parentObj = this.superView.getObjWithPath(this.parentPath);

    	}

    	this.render = function() {



			var level = document.createElement('ul');
			level.className = "level one";

			var liEl = document.createElement('li');
			liEl.className = 'title';
			liEl.innerHTML = this.title;
			level.appendChild(liEl);

			_.each(this.keys, function(key) {
				
				this.bindNavigationKey(liEl);
				level.appendChild(liEl);
			});

			document.body.appendChild(level);
    	},

    	this.renderLiEl = function() {
    		var liEl = document.createElement('li');
			liEl.dataset.key = key;
			liEl.dataset.level = this.level;
			liEl.dataset.parentPath = this.parentPath;

			var type = "k";

			liEl.innerHTML = '<span>'+type+'</span><span>' + key + '</span>';

    	}


    	this.bindNavigationKey = function(domEl) {
			//$(domEl).on('click', navigateToKey);
		}
    }

    return LevelView;

});