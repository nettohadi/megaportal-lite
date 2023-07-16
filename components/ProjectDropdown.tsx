import { Select } from '@chakra-ui/react';

export function ProjectDropdown() {
	return (
		<Select
			mx='24px'
			variant='main'
			color='gray.500'
			size='md'
			borderRadius='12px'
			maxW='240px'
			cursor='pointer'
		>
			<option>PCI DSS v3.2.1 ROC</option>
			<option>PCI DSS v3.2.2 ROC</option>
			<option>PCI DSS v3.2.3 ROC</option>
			<option>PCI DSS v3.2.4 ROC</option>
			<option>PCI DSS v3.2.5 ROC</option>
		</Select>
	);
}
