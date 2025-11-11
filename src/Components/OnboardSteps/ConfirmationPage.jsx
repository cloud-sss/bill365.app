import React from 'react'
import { Button, Result } from 'antd';

function ConfirmationPage({lastID,goToStepOne}) {
  return (
     <Result
    status="success"
    title="Successfully Onboarded"
    subTitle={`Store with ID: ${lastID} has been saved in our system.`}
     extra={[
      <Button onClick={()=>goToStepOne()} className='bg-blue-900 text-white' key="console">
        Add Another
      </Button>
      
    ]}
  />
  )
}

export default ConfirmationPage