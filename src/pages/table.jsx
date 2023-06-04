import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import jsonData from '../students.json';
import AddAssessmentModal from '../components/AddModal';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import Swal from "sweetalert2";
function Tables() {
  const [students, setStudents] = useState(jsonData);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [data, setData] = useState(null)
  const { data: student, refetch } = useQuery("studentCache", async () => {
    const response = await API.get("/students");
    return response.data.data;
  });

  const handleMathSelect = (event, index) => {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].math = event.target.value;
      setStudents(newStudents);
    }
  };

  const handleScienceSelect = (event, index) => {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].science = event.target.value;
      setStudents(newStudents);
    }
  };

  const handleEnglishSelect = (event, index) => {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].english = event.target.value;
      setStudents(newStudents);
    }
  };

  const handleSoftSkillsSelect = (event, index) => {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].soft_skills = event.target.value;
      setStudents(newStudents);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const openAddModal = () => {
    setOpenModal(true);
  };

  const handleDeleteData = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await API.delete(`/student/${id}`);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        refetch()
      })
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };


  const renderTableRow = (student, index) => {
    return (
      <tr key={index}>
        <td className="border px-4 py-2">{student.name}</td>
        <td className="border">
          <select
            value={student.math}
            onChange={(event) => handleMathSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            value={student.science}
            onChange={(event) => handleScienceSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            value={student.english}
            onChange={(event) => handleEnglishSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            value={student.soft_skills}
            onChange={(event) => handleSoftSkillsSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </td>
        <td className="border">
          <button style={{ backgroundColor: '#213555', color: 'white', border: "none", padding: "3px", borderRadius: "4px", fontSize: "14px", width: "100%" }}>Delete</button>
        </td>
      </tr>
    );
  };

  const renderAddTableRow = (student, index) => {
    return (
      <tr key={student.id}>
        <td className="border px-4 py-2">{student.name}</td>
        <td className="border">
          <select
            value={student.math}
            onChange={(event) => handleMathSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
            name='math'
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            value={student.science}
            onChange={(event) => handleScienceSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
            name="science"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            value={student?.english}
            onChange={(event) => handleEnglishSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
            name="english"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            value={student.soft_skill}
            onChange={(event) => handleSoftSkillsSelect(event, index)}
            disabled={!isEditing}
            className="form-select text-stone-800 w-full rounded-sm"
            name="soft_skill"
          >
            {[...new Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </td>
        <td className="border">
          <button onClick={() => handleDeleteData(student.id)} style={{ backgroundColor: 'red', color: 'white', border: "none", padding: "3px", borderRadius: "4px", fontSize: "14px", width: "100%" }}>Delete</button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <header className="w-full flex justify-center pt-10">
        <h1 className="text-3xl font-bold">Students Assessments Application</h1>
      </header>
      <div className="container mx-auto py-4 px-5">
        <Table striped bordered hover responsive>
          <thead className="bg-gray-200">
            <tr>
              <th className="border">Name</th>
              <th className="border">Math</th>
              <th className="border">Science</th>
              <th className="border">English</th>
              <th className="border">Soft skills</th>
              <th className="border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map(renderTableRow)}
            {student?.map(renderAddTableRow)}
          </tbody>
        </Table>
        <div className="flex w-full justify-end my-5">
          <button
            className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-10 rounded mx-10"
            onClick={openAddModal}
          >
            Add data
          </button>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <AddAssessmentModal refetch={refetch} isOpen={openModal} onHide={() => setOpenModal(false)} />
    </div>
  );
}

export default Tables;
