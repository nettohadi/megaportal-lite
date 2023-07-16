import { MouseEvent, useCallback, useEffect, useRef } from 'react';

import { Box, Checkbox, CheckboxProps } from '@chakra-ui/react';

export function IndeterminateCheckbox({
	button,
	center = true,
	className = '',
	indeterminate,
	onToggle,
	isChecked,
	checked,
	...props
}: {
	button?: boolean;
	center?: boolean;
	indeterminate?: boolean;
	onToggle?: (value?: boolean | undefined) => void;
	/**
	 * true by default
	 */
} & CheckboxProps) {
	const ref = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = !checked && indeterminate;
		}
	}, [ref, indeterminate, checked]);

	const handleCheckboxClick = useCallback(
		(event: MouseEvent<any>) => {
			event.stopPropagation();
			onToggle?.();
		},
		[onToggle]
	);

	const checkboxNode = (
		<Checkbox
			className={className + ' cursor-pointer'}
			mx={center ? 'auto' : 'unset'}
			my={center ? 'auto' : 'unset'}
			ref={ref}
			spacing={'4'}
			type='checkbox'
			// backgroundColor={`#8a8a8a20`}
			borderColor={`#9a9a9a50`}
			isChecked={isChecked}
			onClick={handleCheckboxClick}
			isIndeterminate={indeterminate}
			pointerEvents={button ? 'none' : undefined}
			{...props}
		/>
	);

	const handleButtonClick = useCallback(
		(event: MouseEvent<any>) => {
			event.stopPropagation();
			onToggle?.();
		},
		[onToggle]
	);

	if (button) {
		return (
			<Box
				alignItems='center'
				as='button'
				backgroundColor={'#8a8a8a00'}
				cursor={props.isDisabled ? 'not-allowed' : 'pointer'}
				display={'flex'}
				height='2.5rem'
				onClick={handleButtonClick}
				px='0.5rem'
				rounded='0.25rem'
				width='100%'
				disabled={props.isDisabled}
			>
				{checkboxNode}
			</Box>
		);
	}

	return checkboxNode;
}
