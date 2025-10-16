"use client";
import Image from "next/image";
import styles from "../styles/views/page.module.css";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function Home() {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario funcionando');
  }
  const handleChange = (value) => console.log(value);
  return (
    <div className={styles.container}>
      <Image src="/logoIcon.png" alt="Logo TimeRace MX" width={160} height={160} />
      <h2 className={styles.title}>Bienvenido a TimeRace</h2>
      <form onSubmit={onSubmit}>
        <FormInput
          type={"email"}
          onChange={handleChange}
          placeholder={"Email"}
          autoComplete={"Email"}
        />
        <FormInput
          type={"password"}
          onChange={handleChange}
          placeholder={"Password"}
          autoComplete={"Password"}
        />

        <Button type="submit">Login</Button>
      </form>
      <a href="https://wa.me/523221575991" className={styles.subtitleRef}>¿Olvidaste tu contraseña?</a>
      <p className={styles.subtitle}>No tienes una cuenta? <a
        className={styles.subtitleRef}
        href="https://wa.me/523221575991"
        target="_blank"
        rel="noopener noreferrer">Contactanos!</a></p>
    </div>
  );
}
