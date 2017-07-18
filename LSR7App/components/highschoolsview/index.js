'use strict';

app.highschoolsview = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('highschoolsview');

// START_CUSTOM_CODE_highschoolsview
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_highschoolsview
(function(parent) {
    var dataProvider = app.data.jsonDataProvider2,
        /// start global model properties

        /// end global model properties
        fetchFilteredData = function(paramFilter, searchFilter) {
            var model = parent.get('highschoolsviewModel'),
                dataSource;

            if (model) {
                dataSource = model.get('dataSource');
            } else {
                parent.set('highschoolsviewModel_delayedFetch', paramFilter || null);
                return;
            }

            if (paramFilter) {
                model.set('paramFilter', paramFilter);
            } else {
                model.set('paramFilter', undefined);
            }

            if (paramFilter && searchFilter) {
                dataSource.filter({
                    logic: 'and',
                    filters: [paramFilter, searchFilter]
                });
            } else if (paramFilter || searchFilter) {
                dataSource.filter(paramFilter || searchFilter);
            } else {
                dataSource.filter({});
            }
        },

        dataSourceOptions = {
            type: 'json',
            transport: {
                read: {
                    url: dataProvider.url
                }
            },
            error: function(e) {

                if (e.xhr) {
                    var errorText = "";
                    try {
                        errorText = JSON.stringify(e.xhr);
                    } catch (jsonErr) {
                        errorText = e.xhr.responseText || e.xhr.statusText || 'An error has occurred!';
                    }
                    alert(errorText);
                }
            },
            schema: {
                data: 'Result',
                model: {
                    fields: {
                        'Building_Name': {
                            field: 'Building_Name',
                            defaultValue: ''
                        },
                    }
                }
            },
            serverFiltering: true,

            serverSorting: true,
            sort: {
                field: 'CreatedAt',
                dir: 'asc'
            },

        },
        /// start data sources
        /// end data sources
        highschoolsviewModel = kendo.observable({
            _dataSourceOptions: dataSourceOptions,
            fixHierarchicalData: function(data) {
                var result = {},
                    layout = {};

                $.extend(true, result, data);

                (function removeNulls(obj) {
                    var i, name,
                        names = Object.getOwnPropertyNames(obj);

                    for (i = 0; i < names.length; i++) {
                        name = names[i];

                        if (obj[name] === null) {
                            delete obj[name];
                        } else if ($.type(obj[name]) === 'object') {
                            removeNulls(obj[name]);
                        }
                    }
                })(result);

                (function fix(source, layout) {
                    var i, j, name, srcObj, ltObj, type,
                        names = Object.getOwnPropertyNames(layout);

                    if ($.type(source) !== 'object') {
                        return;
                    }

                    for (i = 0; i < names.length; i++) {
                        name = names[i];
                        srcObj = source[name];
                        ltObj = layout[name];
                        type = $.type(srcObj);

                        if (type === 'undefined' || type === 'null') {
                            source[name] = ltObj;
                        } else {
                            if (srcObj.length > 0) {
                                for (j = 0; j < srcObj.length; j++) {
                                    fix(srcObj[j], ltObj[0]);
                                }
                            } else {
                                fix(srcObj, ltObj);
                            }
                        }
                    }
                })(result, layout);

                return result;
            },
            itemClick: function(e) {
                var dataItem = e.dataItem || highschoolsviewModel.originalItem;

                app.mobileApp.navigate('#components/highschoolsview/details.html?uid=' + dataItem.uid);

            },
            detailsShow: function(e) {
                var uid = e.view.params.uid,
                    dataSource = highschoolsviewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(uid);

                highschoolsviewModel.setCurrentItemByUid(uid);
                var navbar = $("#nav");
                navbar.css('background', itemModel.get('Building_BackgroundColor'));

                /// start detail form show
                /// end detail form show
            },
            setCurrentItemByUid: function(uid) {
                var item = uid,
                    dataSource = highschoolsviewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);

                if (!itemModel.Location) {
                    itemModel.Location = String.fromCharCode(160);
                }

                /// start detail form initialization
                /// end detail form initialization

                highschoolsviewModel.set('originalItem', itemModel);
                highschoolsviewModel.set('currentItem',
                    highschoolsviewModel.fixHierarchicalData(itemModel));

                return itemModel;
            },
            linkBind: function(linkString) {
                var linkChunks = linkString.split('|');
                if (linkChunks[0].length === 0) {
                    return this.get('currentItem.' + linkChunks[1]);
                }
                return linkChunks[0] + this.get('currentItem.' + linkChunks[1]);
            },
            /// start masterDetails view model functions
            /// end masterDetails view model functions
            currentItem: {},
            go_map_HIGH: function () {
                app.openLink(highschoolsviewModel.get('currentItem').Map_Links);
            },

            go_Website_HIGH: function () {
                var go_web = highschoolsviewModel.get('currentItem').Building_Website;
                window.open(go_web, '_blank');
            },

            onCallMain_HIGH: function () {
                document.location.href = 'tel:' + highschoolsviewModel.get('currentItem').Main_Phone;
            },

            onCallAttendance_HIGH: function () {
                var attendancephone = highschoolsviewModel.get('currentItem').Attendance_Phone;
                document.location.href = 'tel:' + attendancephone;
            },

            onCallCounseling_HIGH: function () {
                var counselingphone = highschoolsviewModel.get('currentItem').Counseling_Phone;
                document.location.href = 'tel:' + counselingphone;
            }
            
        });

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('highschoolsviewModel', highschoolsviewModel);
            var param = parent.get('highschoolsviewModel_delayedFetch');
            if (typeof param !== 'undefined') {
                parent.set('highschoolsviewModel_delayedFetch', undefined);
                fetchFilteredData(param);
            }
        });
    } else {
        parent.set('highschoolsviewModel', highschoolsviewModel);
    }

    parent.set('onShow', function(e) {
        var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null,
            isListmenu = false,
            backbutton = e.view.element && e.view.element.find('header [data-role="navbar"] .backButtonWrapper'),
            dataSourceOptions = highschoolsviewModel.get('_dataSourceOptions'),
            dataSource;

        if (param || isListmenu) {
            backbutton.show();
            backbutton.css('visibility', 'visible');
        } else {
            if (e.view.element.find('header [data-role="navbar"] [data-role="button"]').length) {
                backbutton.hide();
            } else {
                backbutton.css('visibility', 'hidden');
            }
        }

        if (!highschoolsviewModel.get('dataSource')) {
            dataSource = new kendo.data.DataSource(dataSourceOptions);
            highschoolsviewModel.set('dataSource', dataSource);
        }

        fetchFilteredData(param);
    });

})(app.highschoolsview);

// START_CUSTOM_CODE_highschoolsviewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_highschoolsviewModel