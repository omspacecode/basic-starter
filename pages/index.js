import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import axios from 'axios';

export default function Home({ randomUsers }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <h2>Random Users</h2>
        <ul>
          {randomUsers.map((user, index) => (
            <li key={index}>
              <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
              {user.name.first} {user.name.last} - {user.email}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get("https://randomuser.me/api?results=10");
    const randomUsers = response.data.results;

    return {
      props: {
        randomUsers,
      },
    };
  } catch (error) {
    console.error("Error fetching random users:", error);

    return {
      props: {
        randomUsers: [],
      },
    };
  }
}
