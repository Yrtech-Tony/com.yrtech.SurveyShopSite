/// <reference path="../Views/Appeal/Edit.cshtml" />
/// <reference path="../Views/Appeal/Edit.cshtml" />

var baseUrl = 'http://123.57.229.128:8003/';
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
        alert("修改密码成功，请重新登录!", function () {
            document.location.href = "/Account/Login";
        });
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
    $.commonGet("Appeal/GetShopAppealInfoByPage", params, function (data) {
        $("#btnSearch").button('reset');

        var total = data.length;

        var pageClick = function (curPage) {
            params.pageNum = curPage || 1;
            
            curPageNum = curPage;
            var pageLst = data.filter(function (item, i, self) {
                var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                return (i >= start && i < (start + pageSize));
            })
            $("#appeal-table tbody").empty();
            $.each(pageLst, function (i, item) {
                //page
                var tr = $("<tr>");

                var edit = $("<a href='/Appeal/Edit?appealId=" + item.AppealId + "'>申诉/详细</a>");
                tr.append($("<td></td>").append(edit));

                tr.append($("<td></td>").html(item.ShopCode));
                tr.append($("<td></td>").html(item.ShopName));
                tr.append($("<td></td>").html(item.SubjectCode));
                tr.append($("<td></td>").html(item.CheckPoint));
                tr.append($("<td></td>").html(item.AppealReason));
                tr.append($("<td></td>").html(item.AppealUserName));
                tr.append($("<td></td>").html(toNullString(item.AppealDateTime).replace('T', ' ')));

                tr.append($("<td></td>").html(item.FeedBackStatusStr));
                tr.append($("<td></td>").html(item.FeedBackReason));
                tr.append($("<td></td>").html(item.FeedBackUserName));
                tr.append($("<td></td>").html(toNullString(item.FeedBackDateTime).replace('T', ' ')));

                $("#appeal-table tbody").append(tr);
            })

            createPage(total, curPage, pageSize, pageClick);
        }
         
        pageClick(1);       
    })
}

//查询报告
function loadReport(params) {    
    $.commonGet("ReportFile/ReportFileListSearch", params, function (data) {
        $("#btnSearch").button('reset');
        var total = data.length;
        var pageClick = function (curPage) {
            params.pageNum = curPage || 1;            
            
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
                var download = $("<a href='/Base/DownloadFile?ossPath=" + downloadUrl + "&fileName=" + item.ReportFileName + "'>下载</a>");
                download.click(function () {
                    $.commonPost("ReportFile/ReportFileActionLogSave", {
                        Action: '下载',
                        ProjectId: item.ProjectId,
                        ReportFileName: item.ReportFileName,
                        InUserId: loginUser.Id
                    }, function () { });
                })
                tr.append($("<td></td>").append(download));
                tr.append($("<td></td>").html(item.ShopCode));
                tr.append($("<td></td>").html(item.ShopName));
                tr.append($("<td></td>").html(item.ReportFileName));
                tr.append($("<td></td>").html(item.ReportFileType == '01' ? '文件' : '视频'));
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
//查询经销商得分
function loadShopAnswer(params) {
    $.commonGet("ReportFile/ShopAnswerSearch", params, function (data) {
        $("#btnSearch").button('reset');
        var total = data.length;
        var pageClick = function (curPage) {
            params.pageNum = curPage || 1;

            curPageNum = curPage;
            var pageLst = data.filter(function (item, i, self) {
                var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                return (i >= start && i < (start + pageSize));
            })

            $("#answer-table tbody").empty();
            $.each(pageLst, function (i, item) {
                //page
                var tr = $("<tr>");
                // 详细
                var edit = $("<a href='/Report/ShopAnswerEdit?projectId=" + item.ProjectId + "+&shopId="+item.ShopId+"&subjectId="+item.SubjectId+"'>得分详细</a>");
                tr.append($("<td></td>").append(edit));
                tr.append($("<td></td>").html(item.ShopCode));
                tr.append($("<td></td>").html(item.ShopName));
                tr.append($("<td></td>").html(item.SubjectCode));
                tr.append($("<td></td>").html(item.CheckPoint));
                tr.append($("<td></td>").html(item.PhotoScore));
                $("#answer-table tbody").append(tr);
            })

            createPage(total, curPage, pageSize, pageClick);
        }

        pageClick(1);
    }, function () {
        $("#btnSearch").button('reset');
    })
}
// 查询单个题目得分
function getShopAnswerSubject(projectId,shopId,subjectId, callback) {
    $.commonGet("Answer/GetShopAnswerScoreInfo", {
        projectId: projectId,
        shopId: shopId,
        subjectId: subjectId,
        key:''
    }, callback)
}

//查询用户
function loadShopAccount(params) {
    $("#btnSearch").button('loading');
    $.commonGet("Master/GetUserInfo", params, function (data) {
        $("#btnSearch").button('reset');
        var total = data.length;
        var pageClick = function (curPage) {
            params.pageNum = curPage || 1;

            curPageNum = curPage;
            var pageLst = data.filter(function (item, i, self) {
                var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                return (i >= start && i < (start + pageSize));
            })

            $("#account-table tbody").empty();
            $.each(pageLst, function (i, item) {
                //page
                var tr = $("<tr>");

                tr.append($("<td></td>").html(item.AccountId));
                tr.append($("<td></td>").html(item.Password));
                tr.append($("<td></td>").html(item.AccountName));
                tr.append($("<td></td>").html(item.Email));
                tr.append($("<td></td>").html(item.TelNO));
                tr.append($("<td></td>").html(toNullString(item.InDateTime)));
                tr.append($("<td></td>").html(toNullString(item.ModifyDateTime)));

                $("#account-table tbody").append(tr);
            })

            createPage(total, curPage, pageSize, pageClick);
        }

        pageClick(1);
    }, function () {
        $("#btnSearch").button('reset');
    })
}

function loadReportLog(params) {
    $.commonGet("ReportFile/ReportFileActionLogSearch", params, function (data) {
        $("#btnSearch").button('reset');
        var total = data.length;
        var pageClick = function (curPage) {
            params.pageNum = curPage || 1;
            ;
            curPageNum = curPage;
            var pageLst = data.filter(function (item, i, self) {
                var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                return (i >= start && i < (start + pageSize));
            })

            $("#report-log-table tbody").empty();
            $.each(pageLst, function (i, item) {
                //page
                var tr = $("<tr>");

                tr.append($("<td></td>").html(toNullString(item.InDateTime).replace('T', ' '))); 
                tr.append($("<td></td>").html(item.AccountId ));
                tr.append($("<td></td>").html(item.AccountName));
                tr.append($("<td></td>").html(item.ProjectCode)); 
                tr.append($("<td></td>").html(item.ProjectName));
                var display = item.ReportFileName;
                if (item.ReportFileName && item.ReportFileName.length > 20) {
                    display = item.ReportFileName.substr(0, 20) + "...";
                }
                var download = $("<a href=\"javascript:showDetail(\'" + item.ReportFileName + "\')\">" + display + "</a>");
                
                tr.append($("<td></td>").append(download));

                $("#report-log-table tbody").append(tr);
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
    $.commonPost("Appeal/AppealFeedBack", params, callback)
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
        brandId: loginUser.BrandList[0].BrandId,
        projectId: '',
        year: year
    }, callback)
}

// 绑定权限类型
function bindRoleTypeSelect(type) {
    debugger
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetRoleType", {
        type: type,
        roleTypeCode: loginUser.RoleType
    }, function (data) {
        $("#role-sel").empty();
        data.forEach(function (role) {
            $("#role-sel").append($("<option>").val(role.RoleTypeCode).text(role.RoleTypeName));
        })
    })
    $.ajaxSettings.async = true;
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