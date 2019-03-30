using com.yrtech.Survey.ShopSite.Attributes;
using com.yrtech.Survey.ShopSite.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.Survey.ShopSite.Controllers
{
    [AuthenAdmin]
    public class AppealController : Controller
    {
        public AccountDto LoginUser
        {
            get
            {
                if (Session["LoginUser"] != null)
                {
                    AccountDto accountDto = Session["LoginUser"] as AccountDto;
                    return accountDto;
                }
                return null;
            }
        }
        //
        // GET: /Appeal/
        public ActionResult Index()
        {
            if (Session["LoginUser"] != null)
            {
                AccountDto accountDto = Session["LoginUser"] as AccountDto;
                List<AreaDto> dropList = new List<AreaDto>();
                dropList.Add(new AreaDto(){ AreaCode="",AreaName="请选择"});
                dropList.AddRange(accountDto.BusinessAreaList);
                ViewBag.BusinessAreaList = new SelectList(dropList, "AreaId", "AreaName");               
            }
            return View();
        }

        public ActionResult Edit(string appealId)
        {
            ViewBag.AppealId = appealId;
            return View();
        }

        public ActionResult GetAreaListByParent(int area,string type)
        {
            List<AreaDto> lst = new List<AreaDto>();
            if (Session["LoginUser"] != null)
            {
                AccountDto accountDto = Session["LoginUser"] as AccountDto;
                if (type == "BusinessArea")
                {
                    lst = accountDto.WideAreaList.Where(x => x.ParentId == area).ToList();
                }
                else if (type == "WideArea")
                {
                    lst = accountDto.BigAreaList.Where(x => x.ParentId == area).ToList();
                }
                else if (type == "BigArea")
                {
                    lst = accountDto.MiddleAreaList.Where(x => x.ParentId == area).ToList();
                }
                else if (type == "MiddleArea")
                {
                    lst = accountDto.SmallAreaList.Where(x => x.ParentId == area).ToList();
                }
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetShopListByArea(string SmallArea)
        {
            AccountDto accountDto = Session["LoginUser"] as AccountDto;
            var areaId = accountDto.SmallAreaList.Where(x => x.AreaCode == SmallArea).Select(x => x.AreaId).FirstOrDefault();
            var shopList = accountDto.ShopList.Where(x => x.AreaId == areaId);
            return Json(shopList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Test()
        {
            return View();
        }
	}
}