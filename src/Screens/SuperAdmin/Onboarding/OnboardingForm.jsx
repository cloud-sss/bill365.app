import React, { useEffect } from 'react'
import OnboardStepper from '../../../Components/OnboardStepper';
import ShopDetails from '../../../Components/OnboardSteps/ShopDetails';
import OutletDetails from '../../../Components/OnboardSteps/OutletDetails';
import HeaderFooterDetails from '../../../Components/OnboardSteps/HeaderFooterDetails';
import SettingsDetails from '../../../Components/OnboardSteps/SettingsDetails';
import ConfirmationPage from '../../../Components/OnboardSteps/ConfirmationPage';
import { url } from '../../../Address/baseURL';
import axios from 'axios';
import { Message } from '../../../Components/Message';

function OnboardingForm() {
    const [step, setStep] = React.useState(1);
   
    const [shopData, setShopData] = React.useState({});
    const [outletData, setOutletData] = React.useState({});
    const [headerFooterData, setHeaderFooterData] = React.useState({});
    const [settingsData, setSettingsData] = React.useState({});

    const submitOnboarding = (values) => {
        axios.post(url + "/admin/S_Admin/add_edit_shop", {
            id: 0,
            company_name: shopData?.sh_company_name,
            address: shopData?.sh_address,
            contact_person: shopData?.sh_contact_person,
            sales_person: shopData?.sh_sales_person,
            phone_no: +shopData?.sh_phone_no,
            location:0,
            email_id: shopData?.sh_email_id,
            web_portal: shopData?.sh_web_portal,
            active_flag: shopData?.sh_active_flag,
            max_user: +shopData?.sh_max_user,
            user_id: localStorage.getItem("user_id"),
            mode: shopData?.sh_mode,
            last_billing: shopData?.sh_last_billing,
            max_outlet: +shopData?.sh_max_outlet,
        }).then(res => {
            console.log(res)
            if (res?.data?.suc == 1) {
                Message("success", "Outlet added successfully!")
                axios.post(url + "/admin/S_Admin/add_edit_outlet_list", {
                    comp_id: +res?.data?.lastId,
                    outletDt:outletData,
                    created_by: localStorage.getItem("user_id"),
                }).then(res2 => {
                    console.log(res2)
                    if (res2?.data?.suc == 1) {
                        Message("success", "Header/Footer added successfully!")
                        axios.post(url + "/admin/S_Admin/add_edit_header_footer", {
                            comp_id: +res?.data?.lastId,
                            on_off_flag1: headerFooterData.f1 == true ? "Y" : "N",
                            on_off_flag2: headerFooterData.f2 == true ? "Y" : "N",
                            on_off_flag3: headerFooterData.f3 == true ? "Y" : "N",
                            on_off_flag4: headerFooterData.f4 == true ? "Y" : "N",
                            header1: headerFooterData.header1,
                            header2: headerFooterData.header2,
                            footer1: headerFooterData.footer1,
                            footer2: headerFooterData.footer2,
                            created_by: localStorage.getItem("email_id"),
                        }).then(res3 => {
                            console.log(res3)
                            if (res3?.data?.suc == 1) {
                                Message("success", "Settings added successfully!")
                                axios.post(url + "/admin/S_Admin/add_edit_settings",{
                                    comp_id: +res?.data?.lastId,
                                    rcv_cash_flag: values?.sm_rcv_cash_flag,
                                    rcpt_type: values?.sm_rcpt_type,
                                    gst_flag: values?.sm_gst_flag,
                                    gst_type: values?.sm_gst_type,
                                    unit_flag: values?.sm_unit_flag,
                                    cust_inf: values?.sm_cust_inf,
                                    pay_mode: values?.sm_pay_mode,
                                    discount_flag: values?.sm_discount_flag,
                                    stock_flag: values?.sm_stock_flag,
                                    discount_type: values?.sm_discount_type,
                                    discount_position: values?.sm_discount_position,
                                    price_type: values?.sm_price_type,
                                    refund_days: +values?.sm_refund_days,
                                    kot_flag: values?.sm_kot_flag,
                                    created_by: localStorage.getItem("user_id"),
                                    custom_sl_flag: values?.sl_flag,

                                   

                                }).then(res4 => {
                                    console.log(res4)
                                    if (res4?.data?.suc == 1) {
                                        Message("success", "Onboarding completed successfully!")
                                        setStep(5);
                                    }
                                }).catch(err => {
                                    console.log(err)
                                });
                            }

                        })
                            .catch(err => {
                                console.log(err)
                            });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        }).catch(err => {
            console.log(err)
        });
    }

    
    return (
        <>
            <OnboardStepper step={step} />
            <div className='text-xl text-blue-900 font-bold mt-5 text-center my-3'>
                {step == 1 ? 'Shop Details' : step == 2 ? 'Outlet Details' : step == 3 ? 'Header/Footer Details' : 'Settings'}

            </div>
            {step == 1 && <ShopDetails submit_shop={(values) => { setStep(2); console.log('values=', values); setShopData(values) }} />}
            {step == 2 && <OutletDetails limit={outletData?.sh_max_outlet} submit_outlet={(values) => { setStep(3); console.log('values=', values); setOutletData(values) }} reset_outlet={() => setStep(1)} />}
            {step == 3 && <HeaderFooterDetails submit_headerfooter={(values) => { setStep(4); console.log('values=', values); setHeaderFooterData(values) }} reset_headerfooter={() => setStep(2)} />}
            {step == 4 && <SettingsDetails submit_settings={(values) => { console.log('values=', values); setSettingsData(values); submitOnboarding(values)  }} reset_settings={() => setStep(3)} />}
            {step == 5 && <ConfirmationPage />}


        </>
    )
}

export default OnboardingForm