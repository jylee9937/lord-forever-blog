import Layout from "../../components/Layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from "../../components/Date";
import utilStyles from '../../styles/utils.module.css';
import {useRouter} from "next/router";

export async function getStaticPaths() {
	const paths = getAllPostIds();

	return {
		paths,
		fallback: 'blocking'
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}

export default function Post({ postData }) {
	const router = useRouter();

	console.log(postData);

	if(router.isFallback){
		return(
			<div>...is Loading</div>
		)
	}

	return <Layout>
		<Head>
			<title>{postData.title}</title>
		</Head>
		<article>
			<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			<div className={utilStyles.lightText}>
				<Date dateString={postData.date}/>
			</div>
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</article>
	</Layout>
}
