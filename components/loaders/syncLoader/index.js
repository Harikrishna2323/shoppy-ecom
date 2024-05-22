import React from "react";
import styles from "./styles.module.scss";
import { BounceLoader } from "react-spinners";

export default function DotLoader({ loading }) {
  return (
    <div className={styles.loader}>
      <BounceLoader
        color="#2f82ff"
        size={100}
        speedMultiplier={2}
        loading={loading}
      />
    </div>
  );
}
