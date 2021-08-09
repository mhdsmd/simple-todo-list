import React from 'react'
import NodeList from '../../components/NodeList'
import { NodeListExample } from '../../mock'
import {NodeListType} from '../../interfaces'
import { modifyNodeWithId,
	storeNodeListToLocalStorage,
	getNodeListFromLocalStorage,
	generateId,
	insertNodeToNodeList
} from '../../utils'

const App: React.FunctionComponent<unknown> = () => {
	const [nodes, setNodes] = React.useState<NodeListType>([])
	const nodeListRef = React.useRef<any>(null)

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

	const appendNewNode = async (idx: number, action: 'NewOnEnd' | 'NewBetween') => {
		const _nodes = [...nodes]
		const modifiedNodeList = insertNodeToNodeList(
			_nodes,
			{
				id: generateId(),
				title: ''
			},
			idx,
		)
		// We use async function because we need focus on new node after state updated
		await updateNodes(modifiedNodeList)
		if (action === 'NewBetween') {
			nodeListRef.current.focusOnNode(idx + 1)
		} else {
			nodeListRef.current.focusOnNode(idx)
		}
	}

	return (
		<div className={'pt-10'}>
			<div className={'bg-blue-100 max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-xl'}>
				<NodeList
					ref={nodeListRef}
					data={nodes}
					onChange={handleOnChange}
					onAppend={appendNewNode}
				/>
			</div>
		</div>
	)
}

export default App
