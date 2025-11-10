import React, { useEffect } from 'react'
import OnboardStepper from '../../../Components/OnboardStepper';
import ShopDetails from '../../../Components/OnboardSteps/ShopDetails';
import OutletDetails from '../../../Components/OnboardSteps/OutletDetails';
import HeaderFooterDetails from '../../../Components/OnboardSteps/HeaderFooterDetails';
import SettingsDetails from '../../../Components/OnboardSteps/SettingsDetails';
import { use } from 'react';
import ConfirmationPage from '../../../Components/OnboardSteps/ConfirmationPage';

function OnboardingForm() {
    const [step, setStep] = React.useState(1);
    useEffect(() => {console.log(step)}, [step]);
    return (
        <>
           <OnboardStepper step={step} />
            <div className='text-xl text-blue-900 font-bold mt-5'>
                {step==1 ?'Shop Details':step==2 ? 'Outlet Details':step==3 ? 'Header/Footer Details': 'Settings'}

            </div>
            {step == 1 && <ShopDetails submit_shop={()=>setStep(2)} />}
            {step == 2 && <OutletDetails  submit_outlet={()=>setStep(3)} reset_outlet={()=>setStep(1)}/>}
            {step == 3 && <HeaderFooterDetails submit_headerfooter={()=>setStep(4)} reset_headerfooter={()=>setStep(2)}/>}
            {step == 4 && <SettingsDetails submit_settings={()=>setStep(5)} reset_settings={()=>setStep(3)}/>}
            {step == 5 && <ConfirmationPage/>}

           
        </>
    )
}

export default OnboardingForm