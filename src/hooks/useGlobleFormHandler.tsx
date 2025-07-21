import { useMemo, useRef, useState } from "react";

// Type definitions for validation function, form fields, and errors
type ValidatorFn = (
  value: string | number | any,
  values?: Record<string, string | number>
) => string | null;

type FormFields = Record<string, string | number>;
type FormErrors = Record<string, string | null>;
type Validators = Record<string, ValidatorFn>;

const useGlobleFormHandler = <T extends FormFields>(
  initialValues: T,
  validators: Validators = {}
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false); // 🔥 Added loading state
  const [isloading, setIsLoading] = useState<boolean>(false); // 🔥 Added loading state
  // const [error, setError] = useState<string | null>(null); // 🔥 Added error state
  const refs = useRef<Record<string, React.MutableRefObject<string>>>({});

  // Dynamic Refs Management
  const setRef = (key: string, value: string) => {
    if (!refs.current[key]) {
      refs.current[key] = { current: "" };
    }
    refs.current[key].current = value;
  };

  const getRefValue = (key: string) => refs.current[key]?.current || "";
  const getAllRefs = () => refs.current;

  // Handle input changes & auto-validate
  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (validators[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validators[field](value, values),
      }));
    }
  };

  // Validate a single field
  const validateField = (field: string) => {
    if (!validators[field]) return null;

    const error = validators[field](values[field], values);
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  // Validate the entire form
  const validateAllFields = () => {
    let isValid = true;
    const newErrors: FormErrors = {};

    Object.keys(validators).forEach((field) => {
      const error = validators[field](values[field], values);
      if (error) isValid = false;
      newErrors[field] = error;
    });

    setErrors(newErrors);
    return isValid;
  };

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return (
      Object.values(errors).every((error) => !error) &&
      Object.values(values).every((value) =>
        typeof value === "string" ? value.trim() !== "" : !isNaN(Number(value))
      )
    );
  }, [errors, values]);

  return {
    values,
    errors,
    handleChange,
    validateField,
    validateAllFields,
    isFormValid,
    setRef,
    getRefValue,
    getAllRefs,
    setValues,
    loading, // ✅ expose loading state
    setLoading, // ✅ expose setLoading method
    isloading, // ✅ expose loading state
    setIsLoading, // ✅ expose setLoading method
  };
};

export default useGlobleFormHandler;
