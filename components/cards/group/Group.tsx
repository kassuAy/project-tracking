'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {MdEdit} from 'react-icons/md'
import { IGroup } from '../../../types'
import UpdateGroupModal from '../../../components/modals/UpdateGroup'

function GroupCard({group_name, students, _id}: IGroup) {
    const[showModal, setShowModal] = useState(false);
    const onDeleteHandler = async (id: string) => {
        if (window.confirm(`Are you sure?`)) {
        //   const group = await deleteGroup(id)
        //   // @ts-ignore
        //   dispatch(deleteFromStore(group?.data))
        }
      }
  return (
    <div className="flex flex-col space-y-6 shadow-xl w-64 h-64">
      <Link
        href={`/student/formGroup/${students[0].student_id}`}
      >
        <div className="flex flex-col items-center py-6">
          <div className="relative ">
            {/* <img src="/Ellipse60.png" alt="" /> */}
            <p className="absolute top-10 left-8 text-gray-700">IS</p>
          </div>
          <h2 className="font-semibold text-xl text-gray-700">{group_name}</h2>
          
        </div>
      </Link>
      <div className="flex justify-center border-t bottom-2 ">
        <div className="mr-3 my-3">
          <button
            onClick={() => onDeleteHandler(_id as string)}
            className="flex gap-x-2 text-red-600 text-lg justify-center items-center"
          >
            <RiDeleteBin6Line size={20} />
            Delete
          </button>
        </div>

        <div className="pl-3 border-l-2 py-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-x-2 text-primary text-lg justify-center items-center"
          >
            <MdEdit size={20} />
            Edit
          </button>
        </div>
      </div>
      
      {showModal ? (
        <UpdateGroupModal
          _id={_id}
          name={group_name}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      ) : null}
    </div>
  )
}

export default GroupCard