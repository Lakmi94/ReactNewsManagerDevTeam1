import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes, Navigate} from 'react-router-dom'
import ArticleList from './pages/ArticleList'
import ArticleDetail from './pages/ArticleDetail'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Capacitor } from '@capacitor/core'

declare global {
	interface Window {
		api: {
			notify: (options: { title: string; silent?: boolean }) => void
		}
	}
}

// const isNative = () => Capacitor.isNativePlatform() // iOS/Android only
// const platform = () => Capacitor.getPlatform() // 'ios' | 'android' | 'web'

const isElectron = () => typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('electron')

console.log('isElectron',isElectron());

if (isElectron()) {
	window.api.notify({
		title: `EIT Newspaper`,
		// iconPath: pathToPngOrIcoAtRuntime,
		silent: true,
	})
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<ArticleList />} />
				<Route path="/article/:id" element={<ArticleDetail/>} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>,
)
