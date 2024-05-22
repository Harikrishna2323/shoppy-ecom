import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function UserMenu({ loggedIn }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppy !</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="user-pic"
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back !</span>
            <h3>YUUR_NAME</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn__primary}>Sign In</button>
          <button className={styles.btn__outlined}>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>

        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>

        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>

        <li>
          <Link href="/profile/address">Address</Link>
        </li>

        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
