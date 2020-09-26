/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Unicorn!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <img src="/unicorn.webp" height="200"></img>
                <h1 className={styles.title}>
                    Welcome to Unicorn!
                </h1>

                <p className={styles.description}>
                    Unicorn is a unofficial API for Azur Lane based on <a href="https://nextjs.org">Next.js</a>.
                </p>

                <div className={styles.grid}>
                    <a href="#" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Unicorn's API.</p>
                    </a>
                    <a href="https://github.com/LeNitrous/azur-lane-api/" className={styles.card}>
                        <h3>Contribute! &rarr;</h3>
                        <p>Help us make Unicorn better by sharing your ideas in GitHub.</p>
                    </a>
                    <a href={process.env.STATUS_URL || "https://status.asatomi.live"} className={styles.card}>
                        <h3>Platform Status &rarr;</h3>
                        <p>
                            Check if the API is currently available
                            (PS: you can change this too if you plan to run your own version).
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=azur-lane-api&utm_campaign=oss"
                    target="_blank"
                    rel="noopener noreferrer"
                >
          Powered by{" "}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    );
}