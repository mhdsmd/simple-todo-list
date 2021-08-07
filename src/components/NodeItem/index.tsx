import React from 'react'
import { NodeType } from '../../interfaces'

type NodeItemProps = {
    item: NodeType
}

const NodeList: React.FunctionComponent<NodeItemProps> = (props: NodeItemProps) => {
	return (
		<div className={'flex items-center text-gray-700'}>
			{/* Black circle */}
			<span className={'text-xs pr-2'}>{'\u2B24'}</span>

			{/* Node title */}
			<span className={'text-base'}>
				{props.item.title}
			</span>
		</div>
	)
}

export default NodeList
