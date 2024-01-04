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
    fetch("https://eye-rs53.onrender.com/api", {
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
            <h1>Ophthalmologist - leave a request</h1>
            <input
              type="name"
              placeholder="Enter please name:"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Enter please email:"
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
