import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log("session : ", session);
  return (
    <div>
      <Header country={country} />
      {session ? "You are logged in" : "You are not logged in"}
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=u20zwbkgf8s4ru32")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return {
    props: {
      country: {
        code: "IN",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
        name: "India",
      },
    },
  };
}
