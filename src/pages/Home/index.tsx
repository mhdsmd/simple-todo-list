import React from 'react'
import NodeList from '../../components/NodeList'
import { NodeListExample } from '../../mock'
import { NodeListType } from '../../interfaces'
import { modifyNodeWithId,
	storeNodeListToLocalStorage,
	getNodeListFromLocalStorage,
	generateId } from '../../utils'

const App: React.FunctionComponent<unknown> = () => {
	const [nodes, setNodes] = React.useState<NodeListType>([])

	const updateNodes = (nodes: NodeListType) => {
		setNodes(nodes)
		storeNodeListToLocalStorage(nodes)
	}
	// Load application lifeCycle
	React.useEffect(() => {
		const initialNodes = getNodeListFromLocalStorage()
		if (initialNodes.length) {
			// Use cached nodes
			updateNodes(initialNodes)
		} else {
			// Use simple data for first time load
			updateNodes(NodeListExample)
		}
	}, [])

	const handleOnChange = (value: string, id: string | number) => {
		try {
			const _modifiedNodeList = modifyNodeWithId(id, value, nodes)
			updateNodes(_modifiedNodeList)
		} catch (e) {
			console.log(e)
		}
	}

	const appendNewNode = () => {
		const _nodes = [...nodes]
		_nodes.push({
			id: generateId(),
			title: ''
		})
		updateNodes(_nodes)
	}

	return (
		<div className={'pt-10'}>
			<div className={'bg-blue-100 max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-xl'}>
				<NodeList
					data={nodes}
					onChange={handleOnChange}
					onAppend={appendNewNode}
				/>
			</div>
		</div>
	)
}

export default App
