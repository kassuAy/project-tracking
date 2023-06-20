import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Button from '../Button';
import { InputErrors } from '../../types/error';
import { useRouter } from 'next/router';
import { ErrorText } from './InputFeildElements';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useEffect } from 'react';
const SubmitTitle = () => {
  const [project_title, setTitle] = useState({
    groupName: '',
    projects: [{ projectTitle: '', description: '' }],
  });
  const [validationErrors, setValidationErrors] = useState<InputErrors[]>([]);
  const [submitError, setSubmitError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validateData = (): boolean => {
    const err = [];
    if (project_title.groupName?.length === 0) {
      err.push('field is required');
    } else if (project_title.projects?.length === 0) {
      err.push('please fill all');
    }
    setValidationErrors(err);

    if (err.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    // We get property name from event.target.name and set the value from onChange in it
    // So name in our input component should be same as the property in data state

    const { name, value } = event.target;
    const list = [...project_title.projects];
    list [index][name] = value;
    setTitle({
      ...project_title,
      projects: list,
      [event.target.name]: event.target.value,
    });
  };

  function handleAddInput() {
    setTitle({
      ...project_title,
      projects: [
        ...project_title.projects,
        { projectTitle: '', description: '' },
      ],
    });
  }

  function handleRemoveInput(index: any) {
    const list = [...project_title.projects];
    list.splice(index, 1);
    setTitle({ ...project_title, projects: list });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateData();
    if (isValid) {
      // add group to a database

      try {
        setLoading(true);
        const apiRes = await axios.post(
          '/api/submitTitles',
          project_title
        );
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;
          setSubmitError(errorMsg);
        }
      }

      setLoading(false);
    }
  };

  //
  const [projects, setProjects] = useState([]);
  const [fetchGroup, setFetchedGroup] = useState([]);
  useEffect(() => {
    //Fetch title api
    fetch('/api/fetchApis/getProjectTitles')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
      })
      .catch((error) => {
        console.log('Error fetching project titles:', error);
      });
  }, []);

  return (
    <div className=" pt-5">
      {/* className=" justify-center py-4 text-center justify-center" */}
      <div className="flex flex-col items-center justify-center mt-5">
        <form onSubmit={handleSubmit}>
          <div className="p-8 bg-gray rounded-lg shadow-lg">
            <h3 className="text-blue-500 text-3xl font-bold text-center pb-5">
              {' '}
              Submit Your Project Title
            </h3>
            <div className="flex flex-row py-4  ">
              <label htmlFor="groupName" className="font-bold px-4 ">
                Group Name:
              </label>
              <input
                className="border border-2-solid rounded"
                type="text"
                id="groupName"
                name="groupName"
                value={project_title.groupName}
                onChange={(event) =>
                  setTitle({ ...project_title, groupName: event.target.value })
                }
              />
            </div>
            <label
              htmlFor="projects"
              className="pl-4 font-bold text-center justify-center"
            >
              project titles:
            </label>
            <br />
            {project_title.projects.map((project, index) => (
              <div key={index}>
                <div className="py-4 flex flex-row">
                  <label className=" font-bold px-6"> Title:</label>
                  <input
                    className=" border border-2-solid text-gray-700 bg-white ml-10 rounded"
                    type='text'
                    name="projectTitle"
                    value={project.projectTitle}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </div>
                <div className="flex flex-row ">
                  <label className="font-bold px-4 rounded h-[50px]">
                    Descriptions:
                  </label>
                  <input
                    className="border border-2-solid "
                    type='text'
                    name="description"
                    value={project.description}
                    onChange={(event) => handleInputChange(event, index)}
                  />

                  <div className="w-55 h-10">
                    <button
                      className="bg-red-500 rounded ml-4 px-5 w-55 h-10"
                      type="button"
                      onClick={() => handleRemoveInput(index)}
                    >
                      <p className="text-white text-center"> Remove</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex">
              <div>
                <button
                  className="bg-blue-500 mt-8 rounded  text-center ml-4 w-55 h-12"
                  type="button"
                  onClick={handleAddInput}
                >
                  <p className="text-white px-8"> Add title</p>
                </button>
              </div>
              <div className="mt-8 ml-3 w-50">
                <Button title={'submit'} type="submit" disabled={loading} />

                {submitError && <ErrorText>{submitError}</ErrorText>}
                {/* <button type="submit" className='bg-blue-500 rounded'>Submit</button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="items-center justify-center space-y-4 mb-24">
        <div>
          <p className="text-gray-500 text-2xl text-center mt-24">
            Your Projects
          </p>
        </div>
        <table className="w-full text-sm  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Group Name
              </th>

              <th scope="col" className="px-6 py-3">
                Project title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-200">
            {projects.map((project) => (
              <tr key={project._id} className="text-gray-700 border-b">
                <td className="pl-5">{project.groupName}</td>
                <td className="pb-6 pt-5 border-b">
                  <ul>
                    {project.projects.map((title) => (
                      <li key={title._id}>
                        <p className="px-5">Title: {title.projectTitle}</p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="pb-6 pt-5 border-b">
                  <ul>
                    {project.projects.map((title) => (
                      <li key={title._id}>
                        <p className="px-5">Description: {title.description}</p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="pb-6 pt-5 border-b">
                 
                  <td px-16 py-2>
                    <button className="cursor">
                      <span className="bg-green-500 text-white px-2 py-1 rounded ml-2">
                        Active
                      </span>
                    </button>
                  </td>
                  <td px-16 py-2 justify-around gap-2>
                    {/* <button className="cursor">
                      <BiEdit size={25} color={'rgb(34,197,94)'}></BiEdit>
                    </button>
                    <button className="cursor">
                      <BiTrashAlt
                        size={25}
                        color={'rgb(244,63,94)'}
                      ></BiTrashAlt>
                    </button> */}
                    <button className='text-primary'>Edit</button>
                    <button className='text-danger'>Delete</button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmitTitle;