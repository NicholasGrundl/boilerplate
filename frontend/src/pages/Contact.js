import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Mail, Phone } from 'lucide-react';
import styles from './Contact.module.scss';

const contactInfo = {
  address: "123 Tech Street, San Francisco, CA 94105",
  email: "info@insilicostrategy.com",
  phone: "+1 (555) 123-4567"
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  const ContactInfoItem = ({ icon, text }) => (
    <div className={styles.infoItem}>
      {icon}
      <p>{text}</p>
    </div>
  );

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.contactContent}>
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                className={styles.input}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>Subject</label>
              <input
                type="text"
                id="subject"
                className={styles.input}
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                className={styles.textarea}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <span className={styles.error}>{errors.message.message}</span>}
            </div>
            <button type="submit" className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <ContactInfoItem icon={<MapPin size={24} />} text={contactInfo.address} />
          <ContactInfoItem icon={<Mail size={24} />} text={contactInfo.email} />
          <ContactInfoItem icon={<Phone size={24} />} text={contactInfo.phone} />
        </div>
      </div>
    </div>
  );
};

export default Contact;