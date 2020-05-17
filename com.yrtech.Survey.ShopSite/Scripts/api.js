/// <reference path="../Views/Appeal/Edit.cshtml" />
/// <reference path="../Views/Appeal/Edit.cshtml" />

var baseUrl = 'http://123.57.229.128:8001/';
//var baseUrl = 'http://localhost:57328/';
var baseApi = baseUrl + "survey/api/";

var dta = {};
var pageSize = 10;
var curPageNum = 1;

$.commonGet = function (url, params, callback, err) {
    $.get(baseApi + url, params, function (data) {
        if (data && data.Status) {
            if (data.Body) {
                var lst = JSON.parse(data.Body);
                if (callback) {
                    callback(lst);
                }
            } else {
                if (callback) {
                    callback();
                }
            }
        } else {
            if (err) {
                err();
            }
            console.log(url + " execute error " + data.Body);
            alert(data.Body);
        }
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log(url + " execute error ");
        if (err) {
            err();
        }
    })
}

$.commonPost = function (url, params, callback, err) {
    $.post(baseApi + url, params, function (data) {
        if (data && data.Status) {
            if (data.Body) {
                var lst = JSON.parse(data.Body);
                if (callback) {
                    callback(lst);
                }
            } else {
                if (callback) {
                    callback();
                }
            }
        } else {
            if (err) {
                err();
            }
            console.log(url + " execute error " + data.Body);
            alert(data.Body);
        }
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log(url + " execute error ");
        if (err) {
            err();
        }
    })
}


//加载列表
function exeQuery(data) {
    $.ajax({
        "dataType": 'json',
        "type": "GET",
        "url": data.sSource,
        "data": data.aoData,
        "success": data.fnCallback
    });
}

function changePassword() {
    $.commonPost("Account/ChangePassword", {
        UserId: loginUserId,
        sOldPassword: $("#id_sOldPassword").val(),
        sNewPassword: $("#id_sNewPassword").val(),
    }, function (data) {
        if (data && data.Status) {
            alert("修改密码成功，请重新登录!", function () {
                document.location.href = "/Account/Login";
            });            
        } else {
            alert(data.Body);
        }
    });
}

function loginForBrand(params, success, error) {
    $.get(baseUrl + "survey/api/Account/Login", params, success).error(error);
}

function closeModel() {
    $("#Modal").modal("hide");
}

function toNullString(str) {
    if (str)
        return str;
    return "";
}
//查询申诉反馈
function loadAppeal(params) {
    var pageClick = function (curPage) {
        params.pageNum = curPage || 1;
        $("#appeal-table tbody").empty();

        $.commonGet("Appeal/GetShopAppealInfoByPage", params, function (data) {
            $("#btnSearch").button('reset');
            var retArr = data;
            var total = retArr[0];
            var pageLst = retArr[1];        
            $.each(pageLst, function (i, item) {
                //page
                var tr = $("<tr>");

                var edit = $("<a href='/Appeal/Edit?appealId=" + item.AppealId + "'>申诉/详细</a>");
                tr.append($("<td></td>").append(edit));

                tr.append($("<td></td>").html(item.ShopCode));
                tr.append($("<td></td>").html(item.ShopName));
                tr.append($("<td></td>").html(item.SubjectCode));
                tr.append($("<td></td>").html(item.CheckPoint));
                tr.append($("<td></td>").html(item.Score));
                tr.append($("<td></td>").html(item.AppealUserName));
                tr.append($("<td></td>").html(toNullString(item.AppealDateTime).replace('T', ' ')));
                tr.append($("<td></td>").html(item.AppealReason));
                tr.append($("<td></td>").html(item.FeedBackStatusStr));
                tr.append($("<td></td>").html(item.FeedBackReason));
                tr.append($("<td></td>").html(item.FeedBackUserName));
                tr.append($("<td></td>").html(toNullString(item.FeedBackDateTime).replace('T', ' ')));

                $("#appeal-table tbody").append(tr);
            })
            createPage(total, curPage, pageSize, pageClick);
        })
    }

    pageClick();    
}

function loadReport(params) {
    $.commonGet("ReportFile/ReportFileListSearch", params, function (data) {
        $("#btnSearch").button('reset');
        var total = data.lenght; 
        var pageClick = function (curPage) {
            params.pageNum = curPage || 1;
            ;
            curPageNum = curPage;
            var pageLst = data.filter(function (item, i, self) {
                var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                return (i >= start && i < (start + pageSize));
            })

            $("#report-table tbody").empty();
            $.each(pageLst, function (i, item) {
                //page
                var tr = $("<tr>");

                //下载
                var downloadUrl = ossUrlRoot + item.Url_OSS;
                var download = $("<a href='/Base/DownloadFile?ossPath=" + downloadUrl + "&fileName=" + item.ReportFileName + "' >下载</a>");
                tr.append($("<td></td>").append(download));
                tr.append($("<td></td>").html(item.ShopCode));
                tr.append($("<td></td>").html(item.ShopName));
                tr.append($("<td></td>").html(item.ReportFileName));
                tr.append($("<td></td>").html(item.ReportFileType));
                tr.append($("<td></td>").html(toNullString(item.InDateTime).replace('T', ' ')));


                $("#report-table tbody").append(tr);
            })            
            createPage(total, curPage, pageSize, pageClick);
        }
        pageClick(1);
    }, function () {
        $("#btnSearch").button('reset');
    })
}

//获取某条申诉反馈详情
function getAppeal(appealId, callback) {
    $.commonGet("Appeal/GetShopSubjectAppeal", {
        appealId: appealId
    }, callback)
}

//提交申诉
function appealApply(params, callback) {
    $.commonPost("Appeal/AppealApply", params, callback)
}
//提交反馈
function appealFeedBack(params, callback) {
    $.commonPost("Appeal/AppealFeedBack", params,callback)
}
//提交申诉反馈附件
function appealFileSave(params, callback) {
    $.commonPost("Appeal/AppealFileSave", params, callback);
}
//删除申诉反馈附件
function appealFileDelete(params, callback) {
    $.commonPost("Appeal/AppealFileDelete", params, callback);
}
//获取申诉反馈附件
function loadFileList(params, callback) {
    $.commonGet("Appeal/AppealFileSearch", params, callback);
}

//查询期号
function loadProject(year, callback) {
    $.commonGet("Master/GetProject", {
        brandId: '1',
        projectId: '',
        year: year
    }, callback)
}

function parseParams(data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        var urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}


function createPage(total, curPageNum, pageSize, pageClick) {
    var pageCount = total % pageSize == 0 ? Math.floor(total / pageSize) : Math.floor(total / pageSize + 1);
    createPageNav({ $container: $("#pagination"), pageCount: pageCount, currentNum: curPageNum, totalCount: total, afterFun: pageClick });
}
