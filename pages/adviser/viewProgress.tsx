import { useRouter } from 'next/router';

type FormData = {
  studentName: string;
  chapterCovered: string;
  file?: File;
};

export default function AdvisorPage() {
  const router = useRouter();
  const formData =Array.isArray(router.query.formData)
  ? JSON.parse(router.query.formData[0]):JSON.parse(router.query.formData || '{}')
  const { studentName, chapterCovered, file } = formData;

  return (
    <table>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Chapter Covered</th>
          <th>File Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{studentName}</td>
          <td>{chapterCovered}</td>
          <td>{file ? file.name : '-'}</td>
        </tr>
      </tbody>
    </table>
  );
}