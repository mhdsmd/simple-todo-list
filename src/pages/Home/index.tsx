import React from 'react'
import NodeList from '../../components/NodeList'
import { NodeListExample } from '../../mock'

const App: React.FunctionComponent<unknown> = () => {
	return (
		<div className={'pt-10'}>
			<div className={'bg-blue-100 max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-xl'}>
				<NodeList data={NodeListExample}/>
			</div>
		</div>
	)
}

export default App
