import React from 'react'
import NodeList from '../../components/NodeList'
import { NodeListExample } from '../../mock'
import {NodeListType} from '../../interfaces'
import { modifyNodeWithId,
	storeNodeListToLocalStorage,
	getNodeListFromLocalStorage,
	generateId,
	insertNodeToNodeList,
	deleteNodeFromNodeList
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

	const modifyNode = async (idx: number, action: 'NewOnEnd' | 'NewBetween' | 'DeleteNode') => {
		const _nodes = [...nodes]
		let modifiedNodeList = []
		if (action === 'NewOnEnd' || action === 'NewBetween') {
			modifiedNodeList = insertNodeToNodeList(
				_nodes,
				{
					id: generateId(),
					title: ''
				},
				idx,
			)
		} else {
			modifiedNodeList = deleteNodeFromNodeList(_nodes, idx)
		}

		// We use async function because we need focus on new node after state updated
		await updateNodes(modifiedNodeList)

		// Change node focus
		if (action === 'NewBetween') {
			nodeListRef.current.focusOnNode(idx + 1)
		} else if (action === 'NewOnEnd') {
			nodeListRef.current.focusOnNode(idx)
		} else if (action === 'DeleteNode') {
			if (idx === 0 && modifiedNodeList.length > 0)
				nodeListRef.current.focusOnNode(0)
			if (idx > 0)
				nodeListRef.current.focusOnNode(idx - 1)

		}
	}

	return (
		<div className={'pt-10'}>
			<div className={'bg-blue-100 max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-xl'}>
				<NodeList
					ref={nodeListRef}
					data={nodes}
					onChange={handleOnChange}
					onModify={modifyNode}
				/>
			</div>
		</div>
	)
}

export default App
