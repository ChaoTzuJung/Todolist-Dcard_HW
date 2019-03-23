import React from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';

const App = ({ children }) => (
	<div>
		<Header />
		{children}
		<Footer />
	</div>
);

export default App;
