import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import '@/styles/globals.css';
import Navbar from '../components/layout/navbar';
import { Provider } from 'react-redux';
import store from '@/reducers/store';

export default function App({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
			<Provider store={store}>
				<Navbar />
				<Component {...pageProps} />
			</Provider>
		</SessionContextProvider>
	);
}
