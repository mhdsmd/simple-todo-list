import React from 'react'
import NodeList from '../../components/NodeList'
import { NodeListExample } from '../../mock'
import { NodeListType } from '../../interfaces'
import { modifyNodeWithId, storeNodeListToLocalStorage } from '../../utils'

const App: React.FunctionComponent<unknown> = () => {
	const [mockData, setMockData] = React.useState<NodeListType>(NodeListExample)

	const handleOnChange = (value: string, id: string | number) => {
		try {
			const _modifiedNodeList = modifyNodeWithId(id, value, mockData)
			setMockData(_modifiedNodeList)
			storeNodeListToLocalStorage(_modifiedNodeList)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={'pt-10'}>
			<div className={'bg-blue-100 max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-xl'}>
				<NodeList data={mockData} onChange={handleOnChange} />
			</div>
		</div>
	)
}

export default App
