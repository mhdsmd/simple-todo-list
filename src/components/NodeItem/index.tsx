import React from 'react'
import { NodeType } from '../../interfaces'

type NodeItemProps = {
    item: NodeType
	onChange: (value: string) => void;
    onEnterPress: (idx: number) => void;
    onDelete: (idx: number) => void;
    inputRef: React.LegacyRef<HTMLInputElement> | undefined;
    index: number;
}

const NodeList: React.FunctionComponent<NodeItemProps> = (props: NodeItemProps) => {

	const _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			props.onEnterPress(props.index)
		} if (event.key === 'Delete' && event.shiftKey && event.ctrlKey) {
			props.onDelete(props.index)
		}
	}
	return (
		<div className={'flex items-center text-gray-700'}>
			{/* Black circle */}
			<span className={'text-xs pr-2'}>{'\u2B24'}</span>

			{/* Node title */}
			<span className={'text-base w-full'}>
				<input
					ref={props.inputRef}
					className={'w-full nodeInput'}
					value={props.item.title}
					onChange={e => props.onChange(e.target.value)}
					onKeyUp={_handleKeyDown}
				/>
			</span>
		</div>
	)
}

export default NodeList
