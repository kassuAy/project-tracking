'use client'
import GroupContainer from '../../../../components/cards/group/GroupContainer'
import React from 'react'
import {useState} from 'react'
import CreateGroupModal from '../../../../components/modals/CreateGroup'
import GroupForm from '../../../../components/Form/groupForm'
function FormGroup() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <div className='flex justify-end'>
        <button
          className="bg-blue-700 text-white text-sm px-4 py-2 rounded shadow hover:shadow-lg"
          type="button"
          onClick={() => setShowModal(true)}
        >
          + Add Group
        </button>
        
      </div> 
      
      {showModal ? (
        <CreateGroupModal setShowModal={setShowModal} showModal={showModal} />
      ): null}
      <GroupContainer />
      
    </div>
    )
}

export default FormGroup