using com.yrtech.Survey.ShopSite.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LexusReport.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index(string reportType)
        {
            return View();
        }
        public ActionResult ReportTypeSelect()
        {
            return View();
        }
        
    }
}