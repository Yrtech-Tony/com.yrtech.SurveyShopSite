﻿using System.Web;
using System.Web.Mvc;

namespace com.yrtech.Survey.ShopSite
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
