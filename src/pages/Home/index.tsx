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

	const updateNodes = async (nodes: NodeListType, firstLoad?: boolean) => {
		setNodes(nodes)
		storeNodeListToLocalStorage(nodes)

		if (firstLoad) {
			// Little delay for focus in firstLoad
			setTimeout(() => {
				if (Object.keys(nodeListRef))
					nodeListRef.current.focusOnNode(nodes.length - 1)
			}, 1)
		}
	}
	const initialLoad = React.useCallback(() => {
		const initialNodes = getNodeListFromLocalStorage()
		if (initialNodes.length) {
			// Use cached nodes
			updateNodes(initialNodes, true)
		} else {
			// Use simple data for first time load
			updateNodes(NodeListExample, true)
		}
	}, [])

	// Load application lifeCycle
	React.useEffect(() => {
		initialLoad()
	}, [initialLoad])

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
					title: '',
					level: 0
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

	const indentChange = async (idx: number, action: 'Push' | 'Pull') => {
		const _nodes = [...nodes]
		// First node cannot push or pull indent
		if (idx > 0) {
			const previousLevel = _nodes[idx - 1].level
			let currentLevel = _nodes[idx].level
			if (action === 'Push') {
				// Push node indent only if node distance from the previous node is one level
				if (currentLevel - previousLevel <= 0) {
					currentLevel += 1
					_nodes[idx].level = (currentLevel)
				}
			}
			else if (action === 'Pull') {
				if (currentLevel > 0) {
					currentLevel -= 1
					_nodes[idx].level = currentLevel
					// Check child nodes indent for decrease levels
					if (_nodes[idx + 1]) {
						const nextLevel = _nodes[idx + 1].level
						if (nextLevel >= currentLevel) {
							// Run recursive function for change all child nodes level
							await indentChange(idx + 1, 'Pull')
						}
					}
				}
			}
		}
		await updateNodes(_nodes)
	}

	return (
		<div className={'pt-10'}>
			<div className={'bg-blue-100 max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-xl'}>
				<NodeList
					ref={nodeListRef}
					data={nodes}
					onChange={handleOnChange}
					onModify={modifyNode}
					onIndentChange={indentChange}
				/>
			</div>
		</div>
	)
}

export default App
