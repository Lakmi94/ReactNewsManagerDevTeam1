// apiClient.ts
import axios from 'axios'
import baseUrl from '../util/baseUrl'


export type Article = {
	id: string
	id_user: string
	username: string
	aut: string
	title: string
	subtitle: string
	abstract: string
	category: string
	thumbnail_image: string
	thumbnail_media_type: 'image/png' | 'image/jpeg' | string
	is_public: '0' | '1'
	is_deleted: '0' | '1'
	update_date: string
}

export type ArticleDetail = {
	id: string
	title: string
	subtitle: string
	abstract: string
	body: string
	category: string
	image_data: string | null
	image_description: string | null
	image_media_type: 'image/jpeg' | 'image/png' | string
	update_date: string
	username: string
    id_user:string
}




const http = axios.create({
    baseURL: baseUrl,
    headers: { Accept: 'application/json, text/plain, */*' },
})

const APIKEY_ANON = 'ANON01'
const NEWS_URL = '/articles';
const ARTICLE_URL = '/article';

//TODO : add API calls here
const APIKEY: string | null = APIKEY_ANON;

function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        Authorization: `PUIRESTAUTH apikey=${APIKEY}`,
    };
}


export async function getArticles(): Promise<Article[]> {
    try {
        const response = await http.get<Article[]>(NEWS_URL, {
            headers: getAuthHeaders(),
        });        
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

export async function getArticle(id: string | number | null): Promise<ArticleDetail> {
	const url = `${ARTICLE_URL}/${id}`;
	try {
		const response = await http.get<ArticleDetail>(url, {
			headers: getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		console.error(`Error fetching article ID ${id}:`, error);
		throw error;
	}
}

