
var baseUrl = 'http://123.57.229.128:8001/';
//var baseUrl = 'http://localhost:57328/';

var dta = {};
var pageSize = 15;
var curPageNum = 1;

var loginUserDefault = {
    TenantId: 1,
    UserId: 1,
    AccountId: 'sysadmin',
    AccountName: '管理员'
};

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
    $.post(baseUrl + "survey/api/Account/ChangePassword", {
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
    $.get(baseUrl + "survey/api/Account/LoginForBrand", params, success).error(error);
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
    var projectId = $("#brand-sel").val();

    $.get(baseUrl + "survey/api/Appeal/GetShopAppealInfoByPage", params, function (data) {
        if (data && data.Status) {
            var retArr = JSON.parse(data.Body);
            var total = retArr[0];

            var pageLst = retArr[1];
            var pageClick = function (curPage) {
                $("#appeal-table tbody").empty();

                curPageNum = curPage;
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    var edit = $("<a href='/Appeal/Edit?appealId=" + item.AppealId + "'>申诉/详细</a>");
                    tr.append($("<td></td>").append(edit));

                    tr.append($("<td></td>").html(item.ShopCode));
                    tr.append($("<td></td>").html(item.ShopName));
                    tr.append($("<td></td>").html(item.SubjectCode));
                    tr.append($("<td></td>").html(item.CheckPoint));
                    tr.append($("<td></td>").html(item.ImportScore));
                    tr.append($("<td></td>").html(item.ImportLossResult));
                    tr.append($("<td></td>").html(item.AppealUserName));
                    tr.append($("<td></td>").html(toNullString(item.AppealDateTime).replace('T', ' ')));
                    tr.append($("<td></td>").html(item.AppealReason));
                    tr.append($("<td></td>").html(item.FeedBackStatusStr));
                    tr.append($("<td></td>").html(item.FeedBackReason));
                    tr.append($("<td></td>").html(item.FeedBackUserName));
                    tr.append($("<td></td>").html(toNullString(item.FeedBackDateTime).replace('T', ' ')));


                    $("#appeal-table tbody").append(tr);
                })
            }
            pageClick(curPageNum);
            createPage(total, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

//获取某条申诉反馈详情
function getAppeal(appealId, callback) {
    $.get(baseUrl + "survey/api/Appeal/GetShopSubjectAppeal", {
        appealId: appealId
    }, function (data) {
        if (data && data.Status) {
            var objs = JSON.parse(data.Body);

            if (callback)
                callback(objs[0]);
        } else {
            alert(data.Body);
        }
    })
}

//提交申诉
function appealApply(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealApply", params, function (data) {
        if (data && data.Status) {
            var objs = JSON.parse(data.Body);

            if (callback)
                callback(objs);
        } else {
            alert(data.Body);
        }
    })
}
//提交反馈
function appealFeedBack(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealFeedBack", params, function (data) {
        if (data && data.Status) {
            var objs = JSON.parse(data.Body);

            if (callback)
                callback(objs);
        } else {
            alert(data.Body);
        }
    })
}
//提交申诉反馈附件
function appealFileSave(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealFileSave", params, function (data) {
        if (data && data.Status) {
            if (callback)
                callback();
        } else {
            alert(data.Body);
        }
    });
}

//获取申诉反馈附件
function loadFileList(params, callback) {
    $.get(baseUrl + "survey/api/Appeal/AppealFileSearch", params, function (data) {
        if (data && data.Status) {
            var objs = JSON.parse(data.Body);

            if (callback)
                callback(objs);
        } else {
            alert(data.Body);
        }
    });
}

//查询期号
function loadProject(year, callback) {
    $.get(baseUrl + "survey/api/Master/GetProject", {
        brandId: '1',
        projectId: '',
        year: year
    }, function (data) {
        debugger
        if (data && data.Status) {
            if (callback)
                callback(data);
        }
    })
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
