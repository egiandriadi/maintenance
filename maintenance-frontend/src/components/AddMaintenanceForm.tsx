import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_URGENCY_AND_STATUS, CREATE_MAINTENANCE_REQUEST } from '../graphql/queries';
import styles from './AddMaintenanceForm.module.css';

interface Option {
  id: string;
  name: string;
}

const AddMaintenanceForm: React.FC = () => {
  const { loading, error, data } = useQuery(GET_URGENCY_AND_STATUS);
  const [createRequest] = useMutation(CREATE_MAINTENANCE_REQUEST);

  const [formData, setFormData] = useState({
    urgency: '',
    status: '',
    title: '',
    description: '',
    createdBy: 'User', // Replace with actual user data
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRequest({
        variables: {
          title: formData.title,
          description: formData.description,
          statusMaintenanceId: parseInt(formData.status),
          urgencyMaintenanceId: parseInt(formData.urgency),
          createdBy: formData.createdBy,
        },
      });
      alert('Maintenance request created successfully!');
      // Optionally, reset the form or redirect
    } catch (err) {
      console.error(err);
      alert('Error creating maintenance request.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Maintenance Request</h2>
      <div className={styles.label}>
        Urgency *
      </div>
      <select className={styles.select} name="urgency" value={formData.urgency} onChange={handleChange} required>
        <option value="" disabled>Select urgency</option>
        {data.getUrgencyMaintenances.map((option: Option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      <div className={styles.label}>
        Status
      </div>
      <select className={styles.select} name="status" value={formData.status} onChange={handleChange} required>
        <option value="" disabled>Select status</option>
        {data.getStatusMaintenances.map((option: Option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      <div className={styles.label}>
        Title *
      </div>
      <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleChange} required />
      
      <div className={styles.label}>
        Description
      </div>
      <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleChange} />
      
      <button className={styles.button} type="submit">Save</button>
    </form>
  );
};

export default AddMaintenanceForm;