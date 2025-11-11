import React from 'react'
import { Result } from 'antd';

function ConfirmationPage({lastID}) {
  return (
     <Result
    status="success"
    title="Successfully Onboarded"
    subTitle={`Store with ID: ${lastID} has been saved in our system.`}
    
  />
  )
}

export default ConfirmationPage