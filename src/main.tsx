import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.ts';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					closeOnClick
					pauseOnHover={false}
					theme="dark"
				/>
				{/* Same as */}
				<ToastContainer />
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
