"use client";
import Image from "next/image";
import styles from "../styles/views/page.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuthViewModel } from "../viewmodels/authViewModel";

export default function Home() {
  const { user, error, loading, handleChange, login } = useAuthViewModel();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await login();

    if (!data) return;

    if (data.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/league";
    }
  };

  return (
    <div className={styles.container}>
      <Image src="/logoIcon.png" alt="Logo TimeRace MX" width={160} height={160} />
      <h2 className={styles.title}>Bienvenido a TimeRace</h2>
      <form onSubmit={onSubmit}>
        <FormInput
          type="email"
          value={user.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="Email"
          autoComplete="email"
        />
        <FormInput
          type={"password"}
          value={user.password}
          onChange={(value) => handleChange("password", value)}
          placeholder={"Password"}
          autoComplete={"Password"}
        />

        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Iniciando..." : "Login"}
        </Button>
      </form>
      <a href="https://wa.me/523221575991"
        className={styles.subtitleRef}
        target="_blank"
        rel="noopener noreferrer">¿Olvidaste tu contraseña?</a>
      <p className={styles.subtitle}>No tienes una cuenta?{" "}<a
        className={styles.subtitleRef}
        href="https://wa.me/523221575991"
        target="_blank"
        rel="noopener noreferrer">Contactanos!</a></p>
    </div>
  );
}