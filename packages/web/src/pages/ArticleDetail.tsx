import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArticle, type Article, type ArticleDetail } from '../api/apiClient'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import defaultNews from '../assets/default-news.png'
import './ArticleDetail.css'
export default function ArticleDetail() {
	const { id = '' } = useParams()
	const [article, setArticle] = useState<ArticleDetail>()

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const res = await getArticle(id)

				setArticle(res)
			} catch (err) {
				console.error('Failed to fetch article:', err)
			}
		}
		fetchArticle()
	}, [id])

	const myFlexContainerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		padding: '50px',
		alignItems: 'center',
		height: '100%',
		minHeight: '100vh',
		width: '100%',
	}

	const createMarkup = (htmlString: string | undefined) => {
		return { __html: htmlString || '' }
	}

	return (
		<div style={myFlexContainerStyle}>
			{article ? (
				<>
					<h1 className="article-title">{article.title}</h1>
					<h3 className="article-subtitle"> {article.subtitle}</h3>
					<div className="category-badge">{article.category}</div>
					<p>
						Last updated by User {article.id_user} on {article.update_date.substring(0, 10)} at{' '}
						{article.update_date.substring(10)}
					</p>
					<div className="d-flex flex-row justify-content-center mb-4">
						{' '}
						<Image
							src={article?.image_data?`data:${article?.image_media_type};base64,${article?.image_data}`:defaultNews}
							rounded
							fluid
							alt="me"
							width="500px"
						/>
					</div>
					<p dangerouslySetInnerHTML={createMarkup(article.body)} />
					<Link to={`/`}>
						<Button variant="primary" className='category-button'>Back to main</Button>
					</Link>
				</>
			) : (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
		</div>
	)
}
