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
        public ActionResult ShopAnswerIndex()
        {
            return View();
        }
        public ActionResult LogIndex()
        {
            return View();
        }

        public ActionResult ShopAnswerEdit(string projectId, string shopId, string subjectId)
        {
            ViewBag.ProjectId = projectId;
            ViewBag.ShopId = shopId;
            ViewBag.SubjectId = subjectId;
            return View();
        }
    }
}