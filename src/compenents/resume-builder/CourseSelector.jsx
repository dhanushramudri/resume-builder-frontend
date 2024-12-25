import React, { useState, useMemo, useRef, useEffect } from 'react';

const SearchableSelect = ({ value, onChange, options, placeholder, disabled, error, onBlur }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onBlur && onBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const displayValue = useMemo(() => {
    return options.find((option) => option.value === value)?.label || '';
  }, [value, options]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full p-2 border rounded-md bg-white flex justify-between items-center cursor-pointer ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'
        } ${error ? 'border-red-500' : ''}`}
      >
        <span className={!value ? 'text-gray-500' : ''}>{value ? displayValue : placeholder}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-gray-500 text-center">No results found</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    option.value === value ? 'bg-gray-50' : ''
                  }`}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CourseSelector = ({ onEducationChange }) => {
  const [level, setLevel] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [touched, setTouched] = useState({
    level: false,
    course: false,
    specialization: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation rules
  const errors = {
    level: !level && touched.level ? 'Education level is required' : '',
    course: !selectedCourse && touched.course && level ? 'Course selection is required' : '',
    specialization:
      !selectedSpecialization && touched.specialization && selectedCourse
        ? 'Specialization is required'
        : '',
  };
  useEffect(() => {
    onEducationChange({
      level,
      course: selectedCourse,
      specialization: selectedSpecialization,
    });
  }, [level, selectedCourse, selectedSpecialization, onEducationChange]);

  const isValid = !errors.level && !errors.course && !errors.specialization;

  // Validation helper
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTouched({
      level: true,
      course: true,
      specialization: true,
    });

    if (isValid) {
      console.log('Form submitted successfully:', {
        level,
        selectedCourse,
        selectedSpecialization,
      });
      // Here you can add your submission logic
    } else {
      console.log('Form has validation errors');
    }
  };

  const levels = [
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'undergraduate', label: 'Undergraduate' },
  ];

  const coursesData = useMemo(
    () => ({
      postgraduate: [
        {
          name: 'Master of Technology (M.Tech)',
          specializations: [
            'Computer Science and Engineering',
            'Mechanical Engineering',
            'Electrical and Electronics Engineering',
            'Civil Engineering',
            'Electronics and Communication Engineering',
            'Information Technology',
            'Chemical Engineering',
            'Biotechnology',
            'Data Science',
            'Artificial Intelligence and Machine Learning',
            'Aerospace Engineering',
          ],
        },
        {
          name: 'Master of Science (M.Sc.)',
          specializations: [
            'Physics',
            'Chemistry',
            'Mathematics',
            'Zoology',
            'Botany',
            'Biotechnology',
            'Computer Science',
            'Environmental Science',
            'Microbiology',
            'Statistics',
          ],
        },
      ],
      undergraduate: [
        {
          name: 'Bachelor of Technology (B.Tech)',
          specializations: [
            'Computer Science and Engineering',
            'Mechanical Engineering',
            'Electrical and Electronics Engineering',
            'Civil Engineering',
            'Electronics and Communication Engineering',
            'Information Technology',
            'Chemical Engineering',
            'Biotechnology',
            'Data Science',
            'Artificial Intelligence and Machine Learning',
            'Aerospace Engineering',
          ],
        },
        {
          name: 'Bachelor of Science (B.Sc.)',
          specializations: [
            'Physics',
            'Chemistry',
            'Mathematics',
            'Zoology',
            'Botany',
            'Biotechnology',
            'Computer Science',
            'Environmental Science',
            'Microbiology',
            'Statistics',
            'Nursing',
            'Agriculture',
            'Forestry',
          ],
        },
      ],
    }),
    []
  );

  const availableCourses = useMemo(() => {
    if (!level) return [];
    return (
      coursesData[level]?.map((course) => ({
        value: course.name,
        label: course.name,
      })) || []
    );
  }, [level, coursesData]);

  const availableSpecializations = useMemo(() => {
    if (!level || !selectedCourse) return [];
    const course = coursesData[level]?.find((c) => c.name === selectedCourse);
    return (
      course?.specializations.map((spec) => ({
        value: spec,
        label: spec,
      })) || []
    );
  }, [level, selectedCourse, coursesData]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Education Level *</label>
        <SearchableSelect
          value={level}
          onChange={(newLevel) => {
            setLevel(newLevel);
            setSelectedCourse('');
            setSelectedSpecialization('');
          }}
          onBlur={() => handleBlur('level')}
          options={levels}
          placeholder="Select education level"
          error={errors.level}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Course *</label>
        <SearchableSelect
          value={selectedCourse}
          onChange={(newCourse) => {
            setSelectedCourse(newCourse);
            setSelectedSpecialization('');
          }}
          onBlur={() => handleBlur('course')}
          options={availableCourses}
          placeholder="Select course"
          disabled={!level}
          error={errors.course}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Specialization *</label>
        <SearchableSelect
          value={selectedSpecialization}
          onChange={setSelectedSpecialization}
          onBlur={() => handleBlur('specialization')}
          options={availableSpecializations}
          placeholder="Select specialization"
          disabled={!selectedCourse}
          error={errors.specialization}
        />
      </div>
    </div>
  );
};

export default CourseSelector;
