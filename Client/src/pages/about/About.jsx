import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.about}>
      <article>
        <section className={styles.section}>
          <h1>Disclaimer!</h1>
          <p>
            Trashpanda is a site that doesn't sell anything. We act as a
            middleman between buyers and sellers!
          </p>
          <p>
            Please use the site with good intentions (and don't post actual
            trash, we just wanted to make the whole process more unique)
          </p>
        </section>

        <h1>Information and Rules:</h1>

        <section className={styles.section}>
          <h2>Information:</h2>
          <p>We at Trashpanda DO NOT SELL ANYTHING.</p>
          <p>
            We at Trashpanda DO NOT CHARGE ANY MONEY for our service, instead we
            accept donations which are not mandatory at all.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Rules:</h2>
          <ul>
            <li>Posts/Offers containing illegal items are NOT approved.</li>
            <li>
              We do not arrange transport of any kind for the items that you
              sell/buy.
            </li>
            <li>
              We do not take responsibility if the item you sold/bought is not
              what you expected.
            </li>
            <li>
              Posts/Offers are not anonymous. You must register before you post
              something.
            </li>
            <li>Be kind.</li>
            <li>Offensive behavior is not tolerated, you WILL be banned.</li>
            <li>Offensive usernames will be deleted.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

export default About;
