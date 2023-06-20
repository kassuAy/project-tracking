'use client';
import React from 'react';
import { itemData } from './itemData';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export const Items = () => {
  const router = useRouter();
  const [displayText, setDisplayText] = useState(false);

  const handleButtonClick = () => {
    setDisplayText(!displayText);
  };
  return (
    <div>
      <ul
        // className={clsx(
        //   toggle ? ' flex' : ' hidden',
        //   'flex-col justify-center items-center',
        //   'w-full first:mt-2 lg:flex-row lg:w-auto',
        //   'lg:space-x-10 lg:flex'
        // )}
        className="grid grid-cols-6 ml-5 mr-12 gap-y-9"
      >
        {itemData.map((link, index) => {
          return (
            <li key={index} className={clsx(link.cname)}>
              <div
                // onClick={showNav}
                className={
                  clsx()
                  // router.pathname == link.href && 'text-primary', 'text-black no-underline',
                }
              >
                {/* {link.image} */}
                <Image
                  src={link.image}
                  alt="image"
                  width="380"
                  height="300"
                  className="p-2"
                />

                <div className="font-semibold text-xl pl-5 pt-5">
                  {link.title}
                </div>
                <div className="text-sm text-gray-500 pl-5">{link.date}</div>

                <div>
                  {/* <Link href={link.href} className="pt-2 pl-5 text-blue-600">
                    View details
                  </Link> */}

                  {displayText && (
                    <div>
                      <div className="text-sm text-gray-500 pl-5 pt-5 pb-3">
                        {link.description}
                      </div>

                      <div className="flex ml-5 gap-4">
                        <div className="w-32 h-9 text-center bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 mt-3 rounded text-l">
                          <a
                            href="/CV.pdf"
                            download
                            className="text-white px-4 rounded "
                          >
                            download
                          </a>
                        </div>
                        <div>
                          <div className="w-32 h-9 text-center bg-red-900 hover:bg-gray-700 text-white py-2 px-4 mt-3 rounded text-l">
                            <a
                              href="#"
                              download
                              className="text-white px-4 rounded "
                            >
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleButtonClick}
                    className="pt-2 pl-5 text-blue-600 text-l"
                  >
                    {displayText ? 'Hide' : 'View details'}
                  </button>
                </div>
                {/* {router.pathname == link.href && (
                      <div className="flex justify-center">
                        <div className="border-primary w-4 border-b-4 rounded-[1.5px]"></div>
                      </div>
                    )} */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Items;
// 'use client'
// import React from 'react'
// import { itemData } from './itemData'
// import Link from 'next/link'
// import clsx from 'clsx'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'

// export const Items = () => {
//   const router = useRouter()
//   return (
//     <div>
         
//          <ul
//             // className={clsx(
//             //   toggle ? ' flex' : ' hidden',
//             //   'flex-col justify-center items-center',
//             //   'w-full first:mt-2 lg:flex-row lg:w-auto',
//             //   'lg:space-x-10 lg:flex'
//             // )}
//             className='grid grid-cols-6'
//           >
            
//             {itemData.map((link, index) => {
//               return (
//                 <li key={index} className={clsx(link.cname)}>
//                   <Link
//                     href={link.href}
//                     prefetch={false}
//                     // onClick={showNav}
//                     className={clsx(
//                       // router.pathname == link.href && 'text-primary', 'text-black no-underline',
//                     )}
//                   >
//                     {/* {link.image} */}
//                     <Image
//                     src={link.image}
//                     alt='image'
//                     width='300'
//                     height='300'
//                     />

                   
//                     <div className='font-semibold text-xl '>
//                      {link.title}
//                     </div>
//                     <div className='text-sm text-gray-500'>
//                       {link.date}
//                     </div>
//                     <div>
//                       <Link href={link.href}>View Details</Link>
//                     </div>
//                     {/* {router.pathname == link.href && (
//                       <div className="flex justify-center">
//                         <div className="border-primary w-4 border-b-4 rounded-[1.5px]"></div>
//                       </div>
//                     )} */}
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//     </div>
//   )
// }

// export default Items