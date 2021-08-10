import React from 'react'
import { NodeType } from '../../interfaces'

type NodeItemProps = {
    item: NodeType
	onChange: (value: string) => void;
    onEnterPress: (idx: number) => void;
    onDelete: (idx: number) => void;
    onTabPress: (idx: number) => void;
    onShiftPress: (idx: number) => void;
    inputRef: React.LegacyRef<HTMLInputElement> | undefined;
    index: number;
}

const NodeList: React.FunctionComponent<NodeItemProps> = (props: NodeItemProps) => {

	const _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			props.onEnterPress(props.index)
			// Ignore native keydown event
			event.preventDefault()
			event.stopPropagation()
			return false
		} if (event.key === 'Delete' && event.shiftKey && event.ctrlKey) {
			props.onDelete(props.index)
			// Ignore native keydown event
			event.preventDefault()
			event.stopPropagation()
			return false
		} if (event.key === 'Tab') {
			props.onTabPress(props.index)
			// Ignore native keydown event
			event.preventDefault()
			event.stopPropagation()
			return false
		} if (event.key === 'Shift') {
			props.onShiftPress(props.index)
			// Ignore native keydown event
			event.preventDefault()
			event.stopPropagation()
			return false
		}
	}
	return (
		<div className={`flex items-center text-gray-700 pl-${props.item.level * 4}`}>
			{/* Black circle */}
			<span className={'text-xs pr-2'}>{'\u2B24'}</span>

			{/* Node title */}
			<span className={'text-base w-full'}>
				<input
					ref={props.inputRef}
					className={'w-full nodeInput'}
					value={props.item.title}
					onChange={e => props.onChange(e.target.value)}
					onKeyDown={_handleKeyDown}
				/>
			</span>
		</div>
	)
}

export default NodeList
