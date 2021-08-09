import {NodeListType, NodeType} from '../interfaces'

export const modifyNodeWithId = (id: string | number, value: string, nodeList: NodeListType): NodeListType => {
	const _nodeList = [...nodeList]
	const nodeIndex = _nodeList.findIndex((n) => n.id === id)
	_nodeList[nodeIndex].title = value
	return _nodeList
}

export const getNodeListFromLocalStorage = (): NodeListType => {
	try {
		const serializedNodeList = localStorage.getItem('@nodes')
		if (serializedNodeList) {
			return JSON.parse(serializedNodeList)
		}
		return []
	} catch (e) {
		console.log(e)
		return []
	}
}

export const storeNodeListToLocalStorage = (nodeList: NodeListType): boolean => {
	try {
		const deSerializedNodeList = JSON.stringify(nodeList)
		localStorage.setItem('@nodes' ,deSerializedNodeList)
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

export const generateId = (): string => {
	return Math.random().toString(36).substr(2, 9)
}

export const insertNodeToNodeList = (arr: NodeType[], value: NodeType, idx: number): NodeType[] => {
	// Insert new node
	if (idx === arr.length) {
		const _arr = [...arr]
		_arr.push(value)
		return _arr
	}
	// Insert node in specific index
	return arr.reduce((result: NodeType[], element: NodeType, index: number) => {

		result.push(element)

		if (index === idx) {
			result.push(value)
		}

		return result
	}, [])
}

export const deleteNodeFromNodeList = (arr: NodeType[], idx: number): NodeType[] => {
	const _arr = [...arr]
	return _arr.reduce((result: NodeType[], element: NodeType, index: number) => {

		if (index !== idx) {
			result.push(element)
		}

		return result
	}, [])
}
