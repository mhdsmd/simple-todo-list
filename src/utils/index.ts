import {NodeListType} from '../interfaces'

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
