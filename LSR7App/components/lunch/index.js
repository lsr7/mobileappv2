'use strict';

app.lunch = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_lunch
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function Application1() {}

Application1.prototype = {

        run: function() {
            var that = this,

                openExternalInAppBrowser = document.getElementById("openExternalInAppBrowser3");
            openExternalInAppBrowser.addEventListener("click", that.openExternalInAppBrowser3);

            openExternalInAppBrowser = document.getElementById("openExternalInAppBrowser4");
            openExternalInAppBrowser.addEventListener("click", that.openExternalInAppBrowser4);

            openExternalInAppBrowser = document.getElementById("openExternalInAppBrowser5");
            openExternalInAppBrowser.addEventListener("click", that.openExternalInAppBrowser5);
        },

        openExternalInAppBrowser3: function() {
            window.open("http://leessummitschoolnutrition.com/", "_blank");
        },

        openExternalInAppBrowser4: function() {
            window.open("https://www.myschoolbucks.com/ver2/login/getmain", "_blank");
        },

        openExternalInAppBrowser5: function() {
            window.open("http://leessummitschoolnutrition.com/?page=menus", "_blank");
        },
    }
    // END_CUSTOM_CODE_lunch