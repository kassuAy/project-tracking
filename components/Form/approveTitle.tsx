import React from 'react'

type Props = {}

function ApproveTitle({}: Props) {
  return (
    <div><div className="flex flex-col items-center justify-center space-y-4">
    <h1 className="text-3xl font-bold">Title Approval</h1>
    <div className="p-8 bg-gray rounded-lg shadow-lg">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Title Submission</h2>
        <div>
          <p className="font-bold">Group Name:</p>
          <p>Group Two</p>
        </div>
        <div>
          <p className="font-bold">Title:</p>
          <p>Real Estate</p>
        </div>
  </div>
  <div><br/>
          <p className="font-bold">Description:</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            vel metus eget nisi malesuada lacinia. Etiam sit amet nisl<br/> a
            turpis suscipit ultrices.
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Approve
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Reject
          </button>
        </div>
      </div>
    </div></div>
  )
}

export default ApproveTitle