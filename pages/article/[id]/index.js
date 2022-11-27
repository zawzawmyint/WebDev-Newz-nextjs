import React from 'react';
import Link from 'next/link';
import { server } from '../../../config'
import Meta from '../../../components/Meta';

const Article = ({ article }) => {
    return (
        <>
            <Meta title={article.title} description={article.excerpt} />
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <Link href='/'>&larr;Go Back </Link>
        </>
    )
}

export const getStaticProps = async (context) => {

    const res = await fetch(`${server}/api/articles/${context.params.id}`)
    const article = await res.json();
    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/articles`)
    const articles = await res.json();
    const ids = articles.map(article => article.id)
    const paths = ids.map(id => ({
        params: {
            id: id.toString()
        }
    }))

    return {
        paths,
        fallback: false
    }
}

// export const getStaticProps = async (context) => {

//     const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${context.params.id}`)
//     const article = await res.json();
//     return {
//         props: {
//             article
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const res = await fetch(`http://jsonplaceholder.typicode.com/posts`)
//     const articles = await res.json();
//     const ids = articles.map(article => article.id)
//     const paths = ids.map(id => ({
//         params: {
//             id: id.toString()
//         }
//     }))

//     return {
//         paths,
//         fallback: false
//     }
// }

export default Article
