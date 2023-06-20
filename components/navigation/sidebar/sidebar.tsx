import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaAdjust, FaDatabase, FaUser } from 'react-icons/fa'
import {CgLogOut} from 'react-icons/cg'
import {BiGroup} from 'react-icons/bi'
import {RxDashboard} from 'react-icons/rx'

type SidebarProps = {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
    const Menus = [
        { title: 'Students', src: <FaUser size={15} />, linkto: '/coordinator/students' },
        { title: 'Examiners', src: <FaUser size={15} />, linkto: '/coordinator/examiners' },
        { title: 'Appvove Title', src:<FaAdjust size={15} />,linkto:'/coordinator/approve_title'},
        { title: 'Advisors', src: <FaUser size={15} />, linkto: '/coordinator/advisors' },
        { title: 'Projects', src: <FaDatabase size={15} />, linkto: '/coordinator/projects' },
        { title: 'Groups', src: <BiGroup size={15} />, linkto: '/coordinator/groups' },
        { title: 'Logout', src: <CgLogOut size={15} />, linkto: '/coordinator/logout' },
    ]
    const router = useRouter();
    const pathName = usePathname();
  return (
    <div className="flex bg-white text-secondary-text text-sm shadow-lg justify-start">
      <div
        className={clsx(
          isOpen ? 'w-64' : 'hidden',
          'relative h-screen  p-5 pt-8',
          ' duration-300'
        )}
      >
        <div className="flex gap-x-4">
            <p className='bg-gradient-to-r from-[#264FAD] via-[#264FAD] to-[#029AF8] text-white rounded-lg gap-x-3 text-xl'>SPTS</p>
          {/* <Image
            src="/booking.jpg"
            alt="Africa to silicon valley logo"
            width={100}
            height={100}
            className="cursor-pointer"
          /> */}
        </div>

        <ul>
          <li
            className={clsx(
              ' cursor-pointer my-6',
              'hover:border-l-4 hover:border-white',
              ' hover:bg-light-white'
            )}
          >
            <div
              className={clsx(
                'p-2 rounded ',
                // 'bg-black',
                pathName == '/admin/dashboard' &&
                  'bg-gradient-to-r from-[#264FAD]',
                ' via-[#264FAD] to-[#029AF8]'
              )}
            >
              <Link
                href="/admin/dashboard"
                prefetch={false}
                className={clsx(
                  'flex gap-x-3 items-center',
                  pathName == '/admin/dashboard' && 'text-white', 'no-underline text-gray-500'
                )}
              >
                <RxDashboard size={15} />
                <span
                  className={`${!isOpen && 'hidden'} origin-left duration-200`}
                >
                  Dashboard
                </span>
              </Link>

            </div>
          </li>
          {/* </ul> */}
          <div className="text-[#B9B9C3] text-xs uppercase pl-2">Content</div>
          {/* <ul> */}
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={clsx(
                ' cursor-pointer my-2',
                'hover:border-l-4 hover:border-white',
                ' hover:bg-light-white'
              )}
            >
              <div
                className={clsx(
                  'p-2 rounded ',
                  pathName == Menu.linkto &&
                    'bg-gradient-to-r from-[#264FAD]',
                  ' via-[#264FAD] to-[#029AF8]'
                )}
              >
                <Link
                  href={Menu.linkto ? Menu.linkto : '#'}
                  prefetch={false}
                  className={clsx(
                    'flex gap-x-3 items-center',
                    pathName == Menu.linkto && 'text-white no-underline', 'no-underline'
                  )}
                >
                  {Menu.src}
                  <span
                    className={`${
                      !isOpen && 'hidden'
                    } origin-left duration-200 `}
                  >
                    <div className=' text-gray-500'>
                      {Menu.title}
                    </div>
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar