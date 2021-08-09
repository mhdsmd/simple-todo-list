import React from 'react'
import { NodeType } from '../../interfaces'

type NodeItemProps = {
    item: NodeType
	onChange: (value: string) => void;
    inputRef: React.LegacyRef<HTMLInputElement> | undefined;
}

const NodeList: React.FunctionComponent<NodeItemProps> = (props: NodeItemProps) => {

	return (
		<div className={'flex items-center text-gray-700'}>
			{/* Black circle */}
			<span className={'text-xs pr-2'}>{'\u2B24'}</span>

			{/* Node title */}
			<span className={'text-base w-full'}>
				<input ref={props.inputRef} className={'w-full nodeInput'} value={props.item.title} onChange={e => props.onChange(e.target.value)} />
			</span>
		</div>
	)
}

export default NodeList
