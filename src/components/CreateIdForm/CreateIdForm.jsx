import styles from "./CreateIdForm.module.scss";
import FormField from "./FormField";
import states from "./states.json";
import titles from "./titles.json";
import placeholderAvatar from "../../assets/placeholder.webp";
import schema from "./schema";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
const CreateIdForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    register,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [preview, setPreview] = useState(null);

  const watchImage = watch("image");
  useEffect(() => {
    if (watchImage?.[0]) {
      const previewUrl = URL.createObjectURL(watchImage[0]);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
    setPreview(null);
    return;
  }, [watchImage]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);
  console.log(errors);
  return (
    <section className={styles.form_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormField error={errors.title}>
          <label htmlFor="titleSelect">Title</label>
          <select id="titleSelect" {...register("title")} defaultValue="Mx">
            {titles.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </select>
        </FormField>
        <FormField error={errors.firstName}>
          <label htmlFor="firstNameInput">First Name</label>
          <input
            type="text"
            id="firstNameInput"
            placeholder="Type your name here"
            {...register("firstName")}
          />
        </FormField>
        <FormField error={errors.middleName}>
          <label htmlFor="middleNameInput">Middle Name (optional)</label>
          <input
            type="text"
            id="middleNameInput"
            placeholder="Type your name here (optional)"
            {...register("middleName")}
          />
        </FormField>
        <FormField error={errors.lastName}>
          <label htmlFor="lastNameInput">Last Name</label>
          <input
            type="text"
            id="lastNameInput"
            placeholder="Type your name here"
            {...register("lastName")}
          />
        </FormField>
        <FormField error={errors.dob}>
          <label htmlFor="dateOfBirthInput">Date of Birth</label>
          <input type="date" id="dateOfBirthInput" {...register("dob")} />
        </FormField>
        <FormField error={errors.state}>
          <label htmlFor="stateSelect">State</label>
          <select {...register("state")} defaultValue="VIC">
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField error={errors.image}>
          <label htmlFor="imageInput">Picture</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            {...register("image")}
          />
        </FormField>
        <FormField>
          <button>Create</button>
        </FormField>
      </form>
      <div className={styles.placeholder_wrapper}>
        <h5>Image Preview</h5>
        {preview ? (
          <img src={preview} alt="user" />
        ) : (
          <img src={placeholderAvatar} alt="placeholder" />
        )}
      </div>
    </section>
  );
};

export default CreateIdForm;
