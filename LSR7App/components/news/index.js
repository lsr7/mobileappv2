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
        }
    });

    app.newsService = {
        viewModel: new NewsViewModel()
    };

    $("#news-template").kendoMobileListView({
    dataSource: NewsDataSource,
    pullToRefresh: true,
    appendOnRefresh: true,
    template: $("#news-template").text(),
});

})(window);