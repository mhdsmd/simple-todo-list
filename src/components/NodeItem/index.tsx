import React from 'react'
import { NodeType } from '../../interfaces'

type NodeItemProps = {
    item: NodeType
}

const NodeList: React.FunctionComponent<NodeItemProps> = (props: NodeItemProps) => {
	const [value, setValue] = React.useState<string>(props.item.title)

	return (
		<div className={'flex items-center text-gray-700'}>
			{/* Black circle */}
			<span className={'text-xs pr-2'}>{'\u2B24'}</span>

			{/* Node title */}
			<span className={'text-base w-full'}>
				<input className={'w-full nodeInput'} value={value} onChange={e => setValue(e.target.value)} />
			</span>
		</div>
	)
}

export default NodeList
