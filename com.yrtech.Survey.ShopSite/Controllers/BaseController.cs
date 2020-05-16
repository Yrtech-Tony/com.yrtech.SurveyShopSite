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
using System.Net.Http;

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

        public ActionResult DownloadFile(string ossPath, string fileName)
        {
            byte[] fileContent = null;
            HttpClient client = new HttpClient();
            Uri uri = new Uri(ossPath);
            client.BaseAddress = uri;
            //添加请求的头文件
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/x-msdownload"));
            HttpResponseMessage message = client.GetAsync(uri).Result;
            //发送请求并接受返回的值
            fileContent = message.Content.ReadAsByteArrayAsync().Result;

            return File(fileContent, "application/x-msdownload", fileName);
        }
    }
}