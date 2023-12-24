import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState(''); // Updated variable name

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://course-selling-app-backend.onrender.com/admin/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data.course);
        setTitle(response.data.course.title);
        setDescription(response.data.course.description);
        setPrice(response.data.course.price);
        setImageLink(response.data.course.imageLink); // Updated variable name
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error(error);
      }
    };

    if (courseId) {
      // Ensure that courseId is available before making the request
      fetchCourseData();
    }
  }, [courseId]);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(
        `https://course-selling-app-backend.onrender.com/admin/courses/${courseId}`,
        { title, price, description, imageLink }, // Updated variable name
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the course with the edited information
      setCourse({
        ...course,
        title,
        description,
        price,
        imageLink, // Updated variable name
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     {course && 
      <Card className="card" style={{ borderRadius: '10px' }}>
        <CardMedia
          component="img"
          height="150"
          image={course?.imageLink} // Updated variable name
          alt="Course Image"
        />
        <CardContent>
          <li className="list">
            <strong>{course.title} </strong>
            <br />
            {course.description}
            <br />
            <strong>₹{course.price}</strong>
          </li>
        </CardContent>
      </Card>
     } 

      <Card className='card'>
        <h1>Edit Course</h1>
        <CardContent className='Card-Content'>
          <TextField
            required
            id='outlined-required'
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            required
            id='outlined-required'
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            required
            id='outlined-required'
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
            required
            id='outlined-required'
            label='Image-Link'
            type='url'
            value={imageLink} // Updated variable name
            onChange={(e) => setImageLink(e.target.value)} // Updated variable name
          />
          <br />
          <Button className='button' variant='contained' onClick={handleEdit}>
            Edit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditCourse;
