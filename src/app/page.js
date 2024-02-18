import Link from "next/link";
import styles from "./page.module.css";



export default async function Page() {
 
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome</h1>
          <p className={styles.subtitle}>Explore the features below</p>
        </div>

        <div className={styles.grid}>
          <Link href="/chat" className={styles.card}>
            <h2 className={styles.cardTitle}>Open AI Chatbot</h2>
            <p className={styles.cardDescription}>
              Engage in a chat with our AI-powered chatbot. Experience the
              future of conversation.
            </p>
          </Link>
          {/* Add more links as needed */}
        </div>
      </main>
    </div>
  );
}
