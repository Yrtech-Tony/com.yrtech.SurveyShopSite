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
    public class ReportController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }        
    }
}