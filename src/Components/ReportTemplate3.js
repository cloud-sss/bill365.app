import React, { useEffect, useState } from "react";
import ReportForm from "../Components/ReportForm";
import useAPI from "../Hooks/useApi";
import { Message } from "../Components/Message";
import DatatableComp from "../Components/DatatableComp";
import DescriptionComp from "../Components/DescriptionComp";
import { reportHeaders } from "../Assets/Data/TemplateConstants";
import { calculate } from "../Screens/Reports/Calculations";
import ReportForm3 from "./ReportForm3";

function ReportTemplate3({templateData, template, _url}) {
  const { response, callApi } = useAPI();
  const [resp, setRestp] = useState();
  const [isReport, setIsReport] = useState(false);
  const [isCalled, setCalled] = useState(false);
  const [dataSet, setDataSet] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [location, setLocation] = useState();
  const [totalPay, setTotal] = useState();
  var comp,
    totals = [];
  // var template =locationpath.pathname.split('/')[locationpath.pathname.split('/').length-1]
  // var templateData=reportHeaders[template]
  useEffect(() => {
    console.log(response, templateData);
    if (!isCalled) setRestp(response?.data?.msg);
    if (response?.data?.suc == 0 || response?.data?.msg.length <= 0) {
      Message("error", "No data!");
      setIsReport(false);
    } else {
      if (isCalled) {
        setDataSet(response?.data?.msg);
        totals = calculate(response?.data?.msg, template);
        setTotal(totals);
        setIsReport(true);
      }
    }
  }, [response]);
  useEffect(() => {
    comp = localStorage.getItem("comp_id");
    callApi("/admin/company_list", 1, { comp_id: +comp,br_id: 0});
  }, []);

  const onPress = (data) => {
    console.log(data);
    setFrom(data.from_dt);
    setTo(data.to_dt);
    setLocation(resp?.filter((e) => e?.id == data.shops)[0]?.company_name);
    comp = localStorage.getItem("comp_id");
    setCalled(true);
    callApi(_url, 1, {
      from_date: data.dt,
      to_date: data.to_dt,
      comp_id: +data.shops,
    });
  };
  return (
    <div>
      {!isReport && (
        <ReportForm3
          title={templateData.title}
          flag={99}
          onPress={(data) => onPress(data)}
          shops={resp}
        />
      )}
      {isReport && (
        <>
          <DescriptionComp
            title={templateData.title}
            from={from}
            to={to}
            location={location ? location : "All shops"}
            backPress={() => setIsReport(false)}
            headers={templateData.headers}
            data={dataSet}
            span={templateData.span}
            totals={totalPay}
          />
          <DatatableComp
            headers={templateData.headers}
            data={dataSet}
            span={templateData.span}
            totals={totalPay}
          />
        </>
      )}
    </div>
  )
}

export default ReportTemplate3