'use client'
import React from 'react'
import GroupCard from './Group'
import {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'

function GroupContainer() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
      
        // Fetch students data from the API
        fetch("/api/groups")
          .then((response) => response.json())
          .then((data) => {
            setGroups(data.groups);
          })
          .catch((error) => {
            console.log("Error fetching students:", error);
          });
      }, []);
 
  return (
    <div>
        {
           groups == undefined || groups.length === 0 ? (
            <div className='flex justify-evenly'>
                <div className='font-semibold text-xl'>No Groups</div>
            </div>
           ) : (
            <>
                <h1 className='text-xl text-gray-700'>All Groups</h1>
                <div>
                    {groups.map((group) => (
                        <GroupCard key={group._id} {...group} />
                    ))}
                </div>
            </>
           ) 
        }
    </div>
  )
}

export default GroupContainer