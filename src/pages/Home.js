import React, { useEffect } from "react";
import Layout from "../components/Layout"
import axios from "axios";

function Home() {
  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  );
}

export default Home;
