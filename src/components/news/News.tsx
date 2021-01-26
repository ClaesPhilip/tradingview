// import React, { Component } from 'react';

// import './styles/News.scss';

// interface INews {
//     id: string;
//     author: string;
//     content: string;
//     description: string;
//     publishedAt: number | string;
//     source: string;
//     name: string;
//     title: string;
//     url: string;
//     urlToImage: string;
// }

// const defaultProps:INews[] = [];

// const News: React.FC = () => {
//   const [news, setNews]: [INews[], (posts: INews[]) => void] = React.useState(defaultProps);
//   const [error, setError]: [string, (error: string) => void] = React.useState("");
//   const [search, setSearch]: [string, (search: string) => void] = React.useState("");

//   React.useEffect(() => {
//     const News = "http://newsapi.org/v2/everything?q=bitcoin&from=2021-01-19&sortBy=publishedAt&apiKey=2465fb66cd5b42d78cc87f952a865b78";
//     const value = new Request(News);
//     fetch(value)
//     .then(function(response) {
//         console.log(response.json());
//         })


//         Promise.resolve('Success').then(function(value) {
//           console.log(value);
//         }, function(value) {
//           return value;
//         });

        
//   }, []);
  
//   return (
//   <div>
//           {news.map((News) => {
//               return (
//                 <div key={News.id}>  
//                 <div>{News.title}</div>
//                 </div>
//           )})}
//         {error && <p className="error">{error}</p>}
//   </div>  
//   )
// }

// export default News;






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


