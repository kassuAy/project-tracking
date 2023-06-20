import React from 'react'
import SubmitTitle from '../../../components/Form/submitTitle'
import StudentLayout from '../../../components/layout/student/StudentLayout'

type Props = {}

function page({}: Props) {
  return (
    <div className='flex'>
        <div>
          <StudentLayout/>
        </div>
        <div className='flex justify-center'>
          <SubmitTitle/>
        </div>
    </div>
  )
}

export default page