import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import jsonData from '../students.json';

function Tables() {
  const [students, setStudents] = useState(jsonData);
  const [isEditing, setIsEditing] = useState(false);

  function handleMathSelect(event, index) {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].math = event.target.value;
      setStudents(newStudents);
    }
  }

  function handleScienceSelect(event, index) {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].science = event.target.value;
      setStudents(newStudents);
    }
  }

  function handleEnglishSelect(event, index) {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].english = event.target.value;
      setStudents(newStudents);
    }
  }

  function handleSoftSkillsSelect(event, index) {
    if (isEditing) {
      const newStudents = [...students];
      newStudents[index].soft_skills = event.target.value;
      setStudents(newStudents);
    }
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
  }

  return (
    <div>
      <header className='w-full flex justify-center pt-10'>
        <h1 className='text-3xl font-bold'>Students Assessments Application</h1>
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
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border">
                  <select value={student.math} onChange={(event) => handleMathSelect(event, index)} disabled={!isEditing} className="form-select text-stone-800 w-full rounded-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </td>
                <td className="border">
                  <select value={student.science} onChange={(event) => handleScienceSelect(event, index)} disabled={!isEditing} className="form-select text-stone-800 w-full rounded-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </td>
                <td className="border">
                  <select value={student.english} onChange={(event) => handleEnglishSelect(event, index)} disabled={!isEditing} className="form-select text-stone-800 w-full rounded-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </td>
                <td className="border">
                  <select value={student.soft_skills} onChange={(event) => handleSoftSkillsSelect(event, index)} disabled={!isEditing} className="form-select text-stone-800 w-full rounded-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='flex w-full justify-end my-5'>
          <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-10 rounded mx-10">Add data</button>
          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Simpan</button>
          ) : (
            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tables;
