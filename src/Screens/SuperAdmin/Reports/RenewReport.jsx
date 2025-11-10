import React from "react";
import { reportHeaders } from "../../../Assets/Data/TemplateConstants";
import { useLocation } from "react-router-dom";
import ReportTemplate from "../../Reports/ReportTemplate";
import ReportTemplate3 from "../../../Components/ReportTemplate3";
function RenewReport() {
   const locationpath = useLocation();
  var template =
    locationpath.pathname.split("/")[
      locationpath.pathname.split("/").length - 1
    ];
  var templateData = reportHeaders[template];
  return (
    <ReportTemplate3
      templateData={templateData}
      template={template}
      _url={"/admin/S_Admin/renewal_report"}
    />
  );
}

export default RenewReport