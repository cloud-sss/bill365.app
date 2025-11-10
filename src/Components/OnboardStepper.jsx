import React from 'react'
import { CheckCircleFilled, FileProtectOutlined, GlobalOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { Tooltip } from '@mui/material';
import { Divider } from 'antd';
function OnboardStepper({ step }) {
    const styleStemActive = "flex duration-500 w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
    const styleStemInactive = "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"

    const styleNodeActive = "flex items-center duration-500 justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0"
    const styleNodeInactive = "flex items-center duration-500 justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"
    return (
        <><div className='mt-5 mx-auto flex justify-center '>

            <ol class="flex items-center float-right w-full justify-center md:justify-between md:flex-row flex-col">
                <li class={step >= 1 ? styleStemActive : styleStemInactive}>
                    <span class={step >= 1 ? styleNodeActive : styleNodeInactive}>

                        <Tooltip title="Shop Details">
                            <ShopOutlined />
                        </Tooltip>
                    </span>
                </li>
                <li class={step >= 2 ? styleStemActive : styleStemInactive}>
                    <span class={step >= 2 ? styleNodeActive : styleNodeInactive}>

                        <Tooltip title="Outlet Details">

                            <GlobalOutlined />
                        </Tooltip>

                    </span>
                </li>
                <li class={step >= 3 ? styleStemActive : styleStemInactive}>
                    <span class={step >= 3 ? styleNodeActive : styleNodeInactive}>

                        <Tooltip title="Header/Footer Details">

                            <FileProtectOutlined />
                        </Tooltip>

                    </span>
                </li>
                <li class={"flex items-center w-full"}>
                    <span class={step >=4 ? styleNodeActive : styleNodeInactive}>

                        <Tooltip title="Settings">

                           {step<=4 ?<SettingOutlined />:<CheckCircleFilled style={{ color: '#3b82f6' }} /> }
                        </Tooltip>
                    </span>
                </li>
            </ol>


        </div>
        <Divider/>
        </>

    )
}

export default OnboardStepper