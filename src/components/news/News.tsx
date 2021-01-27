import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import { articleProps } from './types';

// import CryptoLogo from './jobb.jpeg'; 

const NewsListBlock = styled.div`
	padding: 0.2rem 1rem 1rem 1rem;
	background-color: rgb(245, 245, 245);
	color: #3c3c3c;
	box-sizing: border-box;
	header > * {
		margin: 0.5rem;
	}
`;

type NewsListProps = {
	category: string;
};

function NewsList({ category }: NewsListProps) {
	const [datetime] = useState(new Date());
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// const query = category === 'all' ? '' : `&category=${category}`;
				const response = await axios.get(
					`http://newsapi.org/v2/everything?q=bitcoin&language=en&from=${datetime}&sortBy=publishedAt&apiKey=2465fb66cd5b42d78cc87f952a865b78`,
				);
        console.log(response);
				setArticles(response.data.articles);
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <NewsListBlock>Loading...</NewsListBlock>;
	}
	if (!articles) return null;

	return (
		<NewsListBlock>
			<header>
				<h2>News</h2>
				<p>
					{datetime.toLocaleDateString() +
						'  ' +
						datetime.toLocaleTimeString()}
				</p>
			</header>
			{articles.map((article: articleProps) => (
				<NewsItem
					key={article.url}
					title={article.title}
					description={article.description}
					url={article.url}
					urlToImage={article.urlToImage}
          			author={article.author}
				/>
			))}
		</NewsListBlock>
	);
}

export default NewsList;


