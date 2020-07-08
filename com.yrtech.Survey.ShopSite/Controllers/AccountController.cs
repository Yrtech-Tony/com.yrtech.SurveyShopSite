using com.yrtech.Survey.ShopSite.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace com.yrtech.Survey.ShopSite.Controllers
{
    public class AccountController : BaseController
    {
        // GET: Account
        public ActionResult Login(string ReturnUrl)
        {
            ViewBag.ReturnUrl = ReturnUrl;
            return View();
        }

        public ActionResult AfterLogin(string loginUser)
        {
            AccountDto LoginUser = CommonHelper.DecodeString<AccountDto>(loginUser);
            Session["LoginUser"] = LoginUser;
            return Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logoff()
        {
            Session["LoginUser"] = null;
            return this.Redirect("~/");
        }

        public ActionResult ChangePassword()
        {
            return View();
        }

        public ActionResult ShopAccountIndex()
        {
            return View();
        }        
    }
}