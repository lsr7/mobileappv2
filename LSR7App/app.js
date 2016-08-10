'use strict';

(function() {
    var app = {
        data: {}
    };

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                skin: 'flat',
                initial: 'components/homeView/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            var element = document.getElementById('appDrawer');
            if (typeof(element) != 'undefined' && element !== null) {
                if (window.navigator.msPointerEnabled) {
                    $('#navigation-container').on('MSPointerDown', 'a', function(event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $('#navigation-container').on('touchstart', 'a', function(event) {
                        app.keepActiveState($(this).closest('li'));
                    });
                }
            }

            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };

    app.openLink = function(url) {
        if (url.substring(0, 4) === 'geo:' && device.platform === 'iOS') {
            url = 'http://maps.apple.com/?ll=' + url.substring(4, url.length);
        }

        window.open(url, '_system');
        if (window.event) {
            window.event.preventDefault && window.event.preventDefault();
            window.event.returnValue = false;
        }
    };

    // start kendo binders
    // end kendo binders
    app.showFileUploadName = function(itemViewName) {
        $('.' + itemViewName).off('change', 'input[type=\'file\']').on('change', 'input[type=\'file\']', function(event) {
            var target = $(event.target),
                inputValue = target.val(),
                fileName = inputValue.substring(inputValue.lastIndexOf('\\') + 1, inputValue.length);

            $('#' + target.attr('id') + 'Name').text(fileName);
        });

    };

    app.clearFormDomData = function(formType) {
        $.each($('.' + formType).find('input:not([data-bind]), textarea:not([data-bind])'), function(key, value) {
            var domEl = $(value),
                inputType = domEl.attr('type');

            if (domEl.val().length) {

                if (inputType === 'file') {
                    $('#' + domEl.attr('id') + 'Name').text('');
                }

                domEl.val('');
            }
        });
    };

}());

// START_CUSTOM_CODE_kendoUiMobileApp

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var app;
	navigator.splashscreen.hide();
	app = new Application();
	app.run();
}

function Application() {
}

Application.prototype = {

	run: function() {
		var that = this,
			openExternalInAppBrowser = document.getElementById("openExternalInAppBrowser");
			openExternalInAppBrowser.addEventListener("click", that.openExternalInAppBrowser);
        
			openExternalInAppBrowser = document.getElementById("openExternalInAppBrowser2");
			openExternalInAppBrowser.addEventListener("click", that.openExternalInAppBrowser2);
        
	},
	openExternalInAppBrowser:  function () {
		window.open("https://powerschool.lsr7.org/public/", "_blank");
	},
    
    openExternalInAppBrowser2:  function () {
		window.open("http://www.infofinderi.com/ifi/?cid=L", "_blank");
	},
   
}

// END_CUSTOM_CODE_kendoUiMobileApp