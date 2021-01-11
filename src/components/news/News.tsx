import React from 'react';

import './News.css';


export interface INews {
    [x: string]: any;
    id: string;
    author: string;
    content: string;
    description: string;
    publishedAt: number | string;
    source: string;
    name: string;
    title: string;
    url: string;
    urlToImage: string;
}

const defaultProps:INews[] = [];

const News: React.FC = () => {
  const [news, setNews]: [INews[], (posts: INews[]) => void] = React.useState(defaultProps);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [search, setSearch]: [string, (search: string) => void] = React.useState("");

  React.useEffect(() => {
    const url = "http://newsapi.org/v2/everything?q=bitcoin&from=2020-12-11&sortBy=publishedAt&apiKey=2465fb66cd5b42d78cc87f952a865b78";
    const req = new Request(url);
    fetch(req)
    .then(function(response) {
        console.log(response.json());
    })
  }, []);

  return (
  <div>
          {news.map((news) => {
              return (
                <div key={news.id}>  
                <div>{news.articles.lenght}</div>
                </div>
          )})}
        {error && <p className="error">{error}</p>}
  </div>
  )
}

export default News;
