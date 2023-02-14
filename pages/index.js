import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from "../lib/posts";
import Link from 'next/link';
import Date from '../components/Date';

export async function getStaticProps (){
	const allPostsData = getSortedPostsData();

	return({
		props: {
			allPostsData,
		}
	})
}

export default function Home({allPostsData}) {

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>안녕하세요!</p>
				<p>주니어 개발자 Lofo입니다.</p>
			</section>
			{/* Add this <section> tag below the existing <section> tag */}
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData && allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
