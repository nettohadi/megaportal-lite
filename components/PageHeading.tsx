import { Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
	title: string;
	marginLeft?: string; // todo: escape hook for layout differences
}

export function PageHeading({ title, marginLeft }: Props) {
	const mainText = useColorModeValue('text.400', 'gray.200');
	return (
		<Text
			fontSize='xl'
			color={mainText}
			fontWeight='bold'
			mb='16px'
			ml={marginLeft ? marginLeft : '20px'}
		>
			{title}
		</Text>
	);
}
