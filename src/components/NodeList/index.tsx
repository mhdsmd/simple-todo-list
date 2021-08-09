import React from 'react'
import NodeItem from '../NodeItem'
import { NodeListType } from '../../interfaces'

type NodeListProps = {
    data: NodeListType;
	onChange: (value: string, id: string | number) => void;
	onModify: (idx: number, action: 'NewOnEnd' | 'NewBetween' | 'DeleteNode') => void;
}

const NodeList = React.forwardRef((props: NodeListProps, ref: React.Ref<any>) => {
	const arrLength = props.data.length
	const elRefs = React.useRef<any>([])

	if (elRefs.current.length !== arrLength) {
		// add or remove refs
		elRefs.current = [...new Array(arrLength)].map((_, i) => elRefs.current[i] || React.createRef())
	}

	// With useImperativeHandle, we have access to the function by ref from outside
	// ref: https://reactjs.org/docs/hooks-reference.html#useimperativehandle
	React.useImperativeHandle(ref, () => ({
		focusOnNode: (index: number) => {
			if (elRefs && Object.keys(elRefs) && elRefs.current[index])
				elRefs.current[index].current.focus()
		}
	}))


	return (
		<>
			{props.data.map((item, index) => (
				<div key={item.id} className={'p-2'}>
					<NodeItem
						inputRef={elRefs.current[index]}
						item={item}
						index={index}
						onChange={(v) => props.onChange(v, item.id)}
						onEnterPress={(idx) => props.onModify(idx, 'NewBetween')}
						onDelete={(idx) => props.onModify(idx, 'DeleteNode')}
					/>
				</div>
			))}
			<span className={'cursor-pointer p-2 text-lg text-gray-700'} onClick={() => props.onModify(props.data.length, 'NewOnEnd')}>+</span>
		</>
	)
})

export default NodeList
export const displayName = NodeList.displayName
