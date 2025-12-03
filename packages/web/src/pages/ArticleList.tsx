import { useEffect, useState } from 'react'
//import { fetchList } from "./api.js"; // assumes (limit, offset)
import { Link } from 'react-router-dom'
//import data from "./api/exampledata.json";
import { getArticles, type Article } from '../api/apiClient'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import defaultNews from '../assets/default-news.png'
import './ArticleList.css'

function ArticleList() {
	const [data, setData] = useState<Article[]>([])
	const [articles, setArticles] = useState<Article[]>([])
	const [category, setCategory] = useState<string>('All')
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setData(await getArticles())
			} catch (err) {
				console.error('Failed to fetch articles:', err)
			}
		}

		fetchArticles()
	}, [])

	useEffect(() => {
		if (category !== 'All') {
			const filteredArticles = data.filter((art) => art.category === category)
			setArticles(filteredArticles)
		} else {
			setArticles(data)
		}
	}, [category, data])

	const tabs = ['All', 'National', 'International', 'Economy', 'Sports', 'Technology']

	// Responsive padding based on screen size
	const getPadding = () => {
		if (windowWidth < 576) return 'rem'
		if (windowWidth < 768) return '1.5rem'
		return '2.5rem'
	}

	// Responsive card width
	const getCardWidth = () => {
		if (windowWidth < 576) return '100%'
		if (windowWidth < 768) return '20rem'
		if (windowWidth < 1200) return '22rem'
		return '24rem'
	}

	const flexContainerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		padding: getPadding(),
		alignItems: 'center',
		width: '100%',
		marginTop:windowWidth < 390 ? '100px':''
	}

	const flexContainerStyleMobile: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		marginTop:'50px'
	}

	function NavItem({ label, active }: { label: string; active: boolean }) {
		const [hover, setHover] = useState(false)

		const tabStyle: React.CSSProperties = {
			height: '40px',
			padding: '8px 12px',
			cursor: 'pointer',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderBottom: active ? '3px solid #007bff' : '3px solid transparent',
			fontWeight: active ? 'bold' : 'normal',
			transition: '0.2s',
			color: hover || active ? '#007bff' : '',
			fontSize: windowWidth < 576 ? '0.85rem' : '1rem',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			
		}

		return (
			<div
				style={tabStyle}
				onClick={() => setCategory(label)}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{label}
			</div>
		)
	}

	return (
		<div style={windowWidth < 500 ? flexContainerStyleMobile : flexContainerStyle}>
			<h1 className="responsive-title">News Articles</h1>
			<div className="responsive-tabs d-flex flex-row mb-3 flex-wrap justify-content-center	">
				{tabs.map((tab, index) => (
					<NavItem key={index} label={tab} active={tab === category} />
				))}
			</div>

			<div className="articles-grid d-flex flex-wrap justify-content-center w-100">
				{data.length === 0 ? (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				) : data.length !== 0 && articles.length === 0 ? (
					// <Spinner animation="border" role="status">
					// 	<span className="visually-hidden">Loading...</span>
					// </Spinner>
					<div>No articles found.</div>
				) : (
					articles.map((article, index) =>
						article ? (
							<Card
								key={index}
								style={{
									width: getCardWidth(),
									margin: '1rem',
									display: 'flex',
									boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									flexGrow: windowWidth < 576 ? 1 : 0,
								}}
							>
								<Card.Img
									variant="top"
									src={
										article.thumbnail_image
											? `data:${article.thumbnail_media_type};base64,${article.thumbnail_image}`
											: defaultNews
									}
								/>
								<Card.Body className="d-flex flex-column align-items-stretch">
									<Card.Title className="article-title">{article.title}</Card.Title>
									<div className="category-badge" style={{ alignSelf: 'center' }}>{article.category}</div>
									<Card.Text className="article-text">{article.abstract}</Card.Text>
									{/* <Card.Subtitle className="article-category">{article.category}</Card.Subtitle> */}
									
									<Link to={`/article/${article.id}`} className="mt-auto">
										<Button  className="w-100 category-button" style={{ marginTop: '5px' }}>
											View Article
										</Button>
									</Link>
								</Card.Body>
							</Card>
						) : null,
					)
				)}
			</div>
		</div>
	)
}

export default ArticleList
