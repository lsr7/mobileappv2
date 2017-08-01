(function (global) {
    var NewsViewModel,
        app = global.app = global.app || {};

    NewsViewModel = kendo.data.ObservableObject.extend({
        NewsDataSource: null,

        init: function () {
            var that = this,
                dataSource,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/News.json");
            jsonUrlToLoad = "https://www1.lsr7.org/mobile_app/news.json";

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: jsonUrlToLoad,
                        dataType: "json"
                    }
                },
            schema: {
            data: "Result",
             model: {
                    fields: {
                        'TITLE': {
                            field: 'TITLE',
                            defaultValue: ''
                        },
                    }
                }
            }
            });
 
            that.set("NewsDataSource", dataSource);
  dataSource.online(navigator.onLine);
$(window).on("offline", function() {
   dataSource.online(false);
   alert('Unable to Connect');
});

             $("#news-template").kendoMobileListView({
    dataSource: dataSource,
    pullToRefresh: true,
    appendOnRefresh: true,
    template: $("#news-template").text(),
    
});

        }



        
    });


    app.newsService = {
        viewModel: new NewsViewModel()
    };

   

})(window);