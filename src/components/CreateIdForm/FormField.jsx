import styles from "./CreateIdForm.module.scss";
const FormField = ({ children, error }) => {
  return (
    <div className={styles.field}>
      {children}
      <small className={styles.error_text}>{error?.message ?? "\u00A0"}</small>
    </div>
  );
};

export default FormField;
