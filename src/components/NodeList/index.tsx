import React from 'react'
import NodeItem from '../NodeItem'
import { NodeListType } from '../../interfaces'

type NodeListProps = {
    data: NodeListType
}

const NodeList: React.FunctionComponent<NodeListProps> = (props: NodeListProps) => {
	return (
		<>
			{props.data.map((item) => (
				<div key={item.id} className={'p-2'}>
					<NodeItem item={item}/>
				</div>
			))}
		</>
	)
}

export default NodeList
