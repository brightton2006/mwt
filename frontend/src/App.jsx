import { useState, useEffect } from 'react'
import ItemForm from './component/itemForm'

const API_BASE = 'http://localhost:5000/api/students'

export default function App() {
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)

  // Fetch students helper
  const loadStudents = async () => {
    try {
      const res = await fetch(API_BASE)
      const data = await res.json()
      setStudents(data)
    } catch (err) {
      console.error('Error fetching students:', err)
    }
  }

  // Load students on mount
  useEffect(() => {
    let ignore = false

    async function fetchData() {
      try {
        const res = await fetch(API_BASE)
        const data = await res.json()
        if (!ignore) {
          setStudents(data)
        }
      } catch (err) {
        console.error('Error fetching students:', err)
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [])

  // Create or Update Student
  const handleSaveStudent = async (studentData) => {
    try {
      if (editingStudent) {
        await fetch(`${API_BASE}/${editingStudent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        })
        setEditingStudent(null)
      } else {
        await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        })
      }
      await loadStudents()
    } catch (err) {
      console.error('Error saving student:', err)
    }
  }

  // Delete Student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      })
      if (editingStudent?._id === id) {
        setEditingStudent(null)
      }
      await loadStudents()
    } catch (err) {
      console.error('Error deleting student:', err)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Student Details Form</h2>

      <h3>{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
      <ItemForm
        key={editingStudent ? editingStudent._id : 'new-form'}
        item={editingStudent}
        onSave={handleSaveStudent}
        onCancel={editingStudent ? () => setEditingStudent(null) : null}
      />

      <hr />

      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students recorded yet.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id} style={{ marginBottom: '8px' }}>
              {student.name} - {student.email} - {student.age} yrs{' '}
              <button type="button" onClick={() => setEditingStudent(student)}>
                Edit
              </button>{' '}
              <button type="button" onClick={() => handleDeleteStudent(student._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
