using com.yrtech.Survey.ShopSite.Controllers;
using com.yrtech.Survey.ShopSite.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LexusReport.Web.Controllers
{
    public class DOSAuditController : BaseController
    {
        // GET: CSSOEM
        public ActionResult Index()
        {
            return View();
        }
        #region 季度报告
        public ActionResult QuarterlyReport()
        {
            if (Session["LoginUser"] != null)
            {
                AccountDto accountDto = Session["LoginUser"] as AccountDto;
                List<AreaDto> dropList = new List<AreaDto>();
                dropList.AddRange(accountDto.BusinessAreaList);
                ViewBag.BusinessAreaList = new SelectList(dropList, "AreaId", "AreaName");
            }
            ViewBag.CurrentQuarter = "";
            return View();
        }
        #endregion
      
        #region 获取文件列表 季度或者月度
        public List<ShopDto> GetFileList(string areaCode, string groupCode, string shopCode, string projectCode, string shopCodeKey, string reportPath)
        {
            List<ShopDto> resultListTemp = new List<ShopDto>();
            DirectoryInfo dataDir = new DirectoryInfo(reportPath);
            FileInfo[] filesInfo = dataDir.GetFiles();
            try
            {                
            }
            catch (Exception)
            {
            }
            return resultListTemp;
        }

        #endregion
        
    }
}