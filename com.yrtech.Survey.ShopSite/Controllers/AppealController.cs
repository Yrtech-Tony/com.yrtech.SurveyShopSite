using com.yrtech.Survey.ShopSite.Attributes;
using com.yrtech.Survey.ShopSite.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.Survey.ShopSite.Controllers
{

    public class AppealController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Edit(string appealId, string projectId, string projectName)
        {
            ViewBag.AppealId = appealId;
            ViewBag.ProjectId = projectId;
            ViewBag.ProjectName = projectName;
            return View();
        }
	}
}