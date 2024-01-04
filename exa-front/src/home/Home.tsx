import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Home.module.css";
import { useState } from "react";

interface IFormState {
  name: string;
  email: string;
}
function Home() {
  const { register, handleSubmit, reset } = useForm<IFormState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true);
    fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) return;
        setIsSuccess(true);
        reset();
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Form sended!</div>
        ) : (
          <>
            <h1>Dr. Jamil Hasanov PhD</h1>
            <input
              type="name"
              placeholder="Please enter a name:"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Please enter email:"
              {...register("email")}
            />
            <button disabled={isLoading}>
              {isLoading ? "Loading..." : "I want an appointment!"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;
