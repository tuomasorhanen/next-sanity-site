import { useState } from 'react';

const DynamicFormField = ({ field, value, setValue }) => {
  const handleChange = e => {
    setValue(e.target.value);
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
      return <input type={field.type} name={field.name} placeholder={field.placeholder} value={value} onChange={handleChange} required={field.required} className="rounded-app border border-accent bg-white p-4 my-1 w-full" autoComplete="off" />;
    case 'textarea':
      return <textarea name={field.name} rows={4} placeholder={field.placeholder} value={value} onChange={handleChange} required={field.required} className="w-full rounded-app border border-accent bg-white p-4 my-1" />;
      case 'select':
        return (
          <select name={field.name} value={value} onChange={handleChange} required={field.required} className="w-full rounded-app border border-accent bg-white p-4 my-1">
            <option value=""></option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
    case 'radio':
      return (
        <div>
          {field.options.map((option, index) => (
            <label key={index} className="inline-flex items-center mt-3">
              <input type="radio" name={field.name} value={option} onChange={handleChange} checked={value === option} className="form-radio h-5 w-5 text-gray-600" /><span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const DynamicForm = ({ form }) => {
  const initialFormState = form.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setFormData(initialFormState);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-4 bg-layer border-2 border-accent rounded-app shadow-app max-w-xl mx-auto">
        {form.thankYouMessage}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-center">
        <h2>{form.title}</h2>
        <p>{form.description}</p>
        {form.fields.map(field => (
          <DynamicFormField
            key={field._key}
            field={field}
            value={formData[field.name]}
            setValue={value => handleChange(field.name, value)}
          />
        ))}
        <button type="submit" className="mt-2 button">
          {form.buttonText}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
