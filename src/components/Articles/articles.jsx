import React, { useContext } from 'react'
import { DividerCenter } from '../Decoratives/divider-center';
import ArticlesContext from '../../context/ArticlesContext';
import './articles.scss';
import { WorkCard } from '../WorkCard/work-card';

export const Articles = () => {
  const { articles } = useContext(ArticlesContext);

  return (
    <>
      <div className="c-our-work">
        <h1 className="c-out-work__heading">
          Stručni Tekstovi
        </h1>
        <DividerCenter />
        <div className="c-our-work__content-holder">
          {articles.map((article, index) => (
            <WorkCard
              title={article.title}
              desc={article.desc}
              img={article.image}
              key={index}
              modalEnabled={true}
            />
          ))}
        </div>
      </div>
    </>
  )
}
