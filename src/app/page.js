import Link from "next/link";
import { Card, CardContent } from "@mui/material";
import styles from "./page.module.scss";

export default async function Page() {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome</h1>
          <p className={styles.subtitle}>Explore the features below</p>
        </div>

        <div className={styles.grid}>
          <Link href="/chat">
            <Card className={styles.card}>
              <CardContent>
                <h2 className={styles.cardTitle}>
                  Open AI Chatbot
                </h2>
                <p className={styles.cardDescription}>
                  Engage in a chat with our AI-powered chatbot. Experience the
                  future of conversation.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/image-generation">
            <Card className={styles.card}>
              <CardContent>
                <h2 className={styles.cardTitle}>
                  Open AI Image Generation
                </h2>
                <p className={styles.cardDescription}>
                  Explore the world of AI-generated images.
                  Experience the visually stunning possibilities that artificial intelligence can offer.
                </p>
              </CardContent>
            </Card>
          </Link>
          {/* Add more links as needed */}
        </div>
      </main>
    </div>
  );
}
