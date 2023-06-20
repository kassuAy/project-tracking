import { useState } from 'react';
import { useRouter } from 'next/router';

export default function StudentPage() {
  const [studentName, setStudentName] = useState('');
  const [chapterCovered, setChapterCovered] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('chapterCovered', chapterCovered);
    if (file) {
      formData.append('file', file);
    }
    router.push({
      pathname: '../adviser/viewProgress',
      query: { formData: JSON.stringify(Object.fromEntries(formData.entries())) },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="studentName">Student Name:</label>
      <input type="text" id="studentName" value={studentName} onChange={(event) => setStudentName(event.target.value)} />

      <label htmlFor="chapterCovered">Chapter Covered:</label>
      <input type="text" id="chapterCovered" value={chapterCovered} onChange={(event) => setChapterCovered(event.target.value)} />

      <label htmlFor="file">File:</label>
      <input type="file" id="file" onChange={(event) => setFile(event.target.files ? event.target.files[0] : null)} />

      <button type="submit">Submit</button>
    </form>
  );
}