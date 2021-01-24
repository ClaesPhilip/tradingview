import React from 'react';
import styled from 'styled-components';
import { articleProps } from './types';
import Button from '../UI/Button';

const NewsItemBlock = styled.div`
	display: table;
	padding: 1rem;
	margin: 1rem 0;
	background-color: #ffffff;
	border-bottom: solid 1px #e6e6e6;
	a {
		color: #3c3c3c;
	}
	p {
		margin: 0.5rem 0 0 0;
		line-height: 1.5;
		white-space: normal;
	}
	.thumbnail {
		img {
			width: 100%;
			height: 100%;
			max-height: 200px;
			object-fit: cover;
		}
	}
	@media screen and (min-width: 480px) {
		display: flex;
		.thumbnail {
			margin-right: 1rem;
			img {
				width: 160px;
				height: 100px;
			}
		}
	}
`;

function NewsItem({ title, description, url, urlToImage, author }: articleProps) {
	return (
		<NewsItemBlock>
			{urlToImage && (
				<div className='thumbnail'>
					<a
						href={url ?? ''}
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src={urlToImage} alt='thumbnail' />
					</a>
				</div>
			)}
			<div className='contents'>
				<h2>
					<a
						href={url ?? ''}
						target='_blank'
						rel='noopener noreferrer'
					>
						{title}
					</a>
				</h2>
				<p>{description}</p>
                        {author}
                        <Button text="hej"/> 
			</div>
		</NewsItemBlock>
	);
}

export default NewsItem;