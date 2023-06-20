'use client'
import React from 'react'
// import Navbar from '../../navigation/admin/AdminNavbar'
import ExaminerSidebar from '../../navigation/sidebar/ExaminerSidebar'
import Head from 'next/head'
import { useState } from 'react'
import CoordintorNavbar from '../../navigation/coordinator/CoordinatorNavbar'

export interface BaseLayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start'
  classname?: string
}

const ExaminerLayout = ({
  children,
}: BaseLayoutProps) => {
  const [openSidebar, setOpenSidebar] = useState(true)
  return (
    <>
      <Head>
        <title>Student Project Tracking System</title>
      </Head>  
      
      <main className='flex h-full flex-col'>
        <div className='flex flex-1'>
            <div className='flex'>
                <ExaminerSidebar isOpen={openSidebar} />
            </div>
            <div className="flex flex-1 flex-col">
            <CoordintorNavbar
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
            <div className="paragraph flex flex-1 grow flex-col overflow-y-auto p-6 pt-24">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ExaminerLayout