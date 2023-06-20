import { useState } from 'react';

export default function ProjectForm() {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [demoImage, setDemoImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('project_title', projectTitle);
    formData.append('description', description);
    formData.append('academic_year', academicYear);
    formData.append('demo_image', demoImage);
    formData.append('file', file);
    

    
    try {
      const response = await fetch('/api/projects/new/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Project submitted successfully!');
      } else {
        console.error('Failed to submit project:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to submit project:', error);
      if (error.response) {
        alert(error.response.data.error); // Display error message from the server
      } else {
        alert('Failed to upload project. Please try again.'); // Display a generic error message
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project title:
        <input type="text" value={projectTitle} onChange={(event) => setProjectTitle(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Academic year:
        <input type="text" value={academicYear} onChange={(event) => setAcademicYear(event.target.value)} />
      </label>
      <label>
        Demo image:
        <input type="file" accept="image/*" 
        onChange={(event) => setDemoImage(event.target.files[0])} />
      </label>
      <label>
        File:
        <input type="file" accept="pdf/*" 
        onChange={(event)=>setFile(event.target.files[0])} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

// 'use client'
// import { useState } from 'react';
// import axios from 'axios';

// export default function ProjectForm() {
//   const [projectTitle, setProjectTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const[academicYear, setAcademicYear] = useState('')
//   const [image, setImage] = useState<File | null>(null);
//   const [pdf, setPdf] = useState<File | null>(null);
//   const [submitError, setSubmitError] = useState('');
//   const [message, setMessage] = useState('')

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setPdf(event.target.files[0]);
//     }
//   };

//   async function handleProjectFormSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     // try{
//     const formData = new FormData();
//     formData.append('projectTitle', projectTitle);
//     formData.append('description', description);
//     formData.append('academicYear', academicYear);
//     // if(image){
//     formData.append('image', image as File);
//     // }
    
//     // if(pdf){
//     formData.append('pdf', pdf as File);
//     // }

//     console.log(formData.get('image'))

//     try{
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//       const response = await axios.post('/api/projects/new/create', formData, config);
//         // Handle response
//       console.log(response.data)
//       if (response.status === 200) {
//           setMessage("Project uploaded successfully");
//           setProjectTitle("");
//           setDescription("");
//           setAcademicYear("");
//           setImage(null);
//           setPdf(null);
//       } else {
//           setMessage("Error uploading project");
//       }

//     }catch(error){
//       console.error('Failed to upload project:', error); // Handle error
//       setMessage('Error creating project');
      // if (error.response) {
      //   alert(error.response.data.error); // Display error message from the server
      // } else {
      //   alert('Failed to upload project. Please try again.'); // Display a generic error message
      // }
//     }
        
//   }

//   return (
//     <div className="py-24 space-p-4 bg-gray-50 text-center place-items-center">
//       <form 
//         // encType="multipart/form-data"
//         onSubmit={handleProjectFormSubmit}
//         >
//         <label htmlFor="projectTitle">Title: </label>
//         <input
//           type="text"
//           id="projectTitle"
//           name="projectTitle"
//           value={projectTitle}
//           onChange={(e) => setProjectTitle(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <label htmlFor="description">Description: </label>
//         <textarea
//           id="description"
//           name="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <label htmlFor="academicYear">Academic Year: </label>
//         <input
//           type="text"
//           id="academicYear"
//           name="academicYear"
//           value={academicYear}
//           onChange={(e) => setAcademicYear(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <label htmlFor="image">Image: </label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//         />
//         <br />
//         <br />

//         <label htmlFor="pdf">Project File: </label>
//         <input
//           type="file"
//           id="pdf"
//           name="pdf"
//           accept=".pdf"
//           onChange={handlePdfChange}
//           required
//         />
//         <br />
//         <br />

//         <button type="submit" className='bg-blue-700 px-4 py-2 text-white rounded-lg'>Upload Project</button>
//         {message && <p>{message}</p>}
//         {submitError && <p>{submitError}</p>}
//       </form>
//     </div>
//   );
// }
