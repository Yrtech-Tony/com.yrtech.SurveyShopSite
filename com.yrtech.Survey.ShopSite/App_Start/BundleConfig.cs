using System.Web;
using System.Web.Optimization;

namespace com.yrtech.Survey.ShopSite
{
    public class BundleConfig
    {
        // 有关绑定的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery-validate.js",
                "~/Scripts/jquery-validate.unobtrusive.js"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                .Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootstrap-paginator.js"));

            bundles.Add(new ScriptBundle("~/bundles/custom")
                .Include(
                      "~/Scripts/icheck.js",
                      "~/Scripts/comm.js",
                      "~/Scripts/page.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-select")
              .Include(
                    "~/Content/bootstrap-select/js/bootstrap-select.js",
                    "~/Content/bootstrap-select/js/i18n/defaults-zh_CN.js"));


            //css 
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome.css",
                      "~/Content/style.css",
                      "~/Content/minimal/_all.css",
                       "~/Content/minimal/blue.css"));

            bundles.Add(new StyleBundle("~/Content/css/bootstrap-select").Include(
                    "~/Content/bootstrap-select/css/bootstrap-select.css"));


        }
    }
}
