using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Threading;
using System.Configuration;
using com.yrtech.Survey.ShopSite.Attributes;

namespace com.yrtech.Survey.ShopSite.Controllers
{
    [CustomHandleError]
    [AuthenAdmin]
    public class BaseController : Controller
    {
        protected const string accessid = "3JkljJxvXgjLz80X";
        protected const string accessKey = "L2ERHORPk3WkjqfGUb27RlxvT8x5f3";
        protected const string endpoin = "http://oss-cn-beijing.aliyuncs.com";
        public BaseController()
        {
        }        
    }
}