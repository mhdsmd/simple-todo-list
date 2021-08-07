import React from 'react'
import { NodeListType } from '../../interfaces'

type NodeListProps = {
    data: NodeListType
}

const NodeList: React.FunctionComponent<NodeListProps> = (props: NodeListProps) => {
	return (
		<>
			{props.data.map((item) => (
				<div key={item.id} className={'pa-5'}>
					{item.title}
				</div>
			))}
		</>
	)
}

export default NodeList
