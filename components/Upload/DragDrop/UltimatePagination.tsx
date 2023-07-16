import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon, Icon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import {
	createUltimatePagination,
	ITEM_TYPES,
} from 'react-ultimate-pagination';

const WrapperComponent = ({ children }: any) => (
	<Flex align='center'>{children}</Flex>
);

const withPreventDefault = (fn: any) => (event: any) => {
	event.preventDefault();
	fn();
};

const Page = ({ value: page, isActive, onClick }: any) =>
	isActive ? (
		<Box
			as='button'
			w='35px'
			h='35px'
			border='none'
			_expanded={{
				borderColor: 'green.100',
				bg: 'teal.100',
			}}
			fontWeight='500'
			color='white'
			bg='black'
			fontSize='sm'
			borderRadius='5px'
			onClick={(): void => onClick(Number(page))}
		>
			{page}
		</Box>
	) : (
		<Box
			as='button'
			w='35px'
			h='35px'
			fontWeight='bold'
			fontSize='sm'
			onClick={(): void => onClick(Number(page))}
		>
			{page}
		</Box>
	);

const Ellipsis = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => <p onClick={withPreventDefault(onClick)}>...</p>;

const FirstPageLink = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => (
	<Flex fontWeight='bold' fontSize='sm' alignItems={'center'} onClick={onClick}>
		<Icon as={BiChevronsLeft} />
	</Flex>
);

const PreviousPageLink = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => (
	<Flex ml='12px' mr='24px' onClick={onClick} cursor='pointer'>
		<ChevronLeftIcon />
	</Flex>
);

const NextPageLink = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => (
	<Flex mr='12px' ml='24px' onClick={onClick} cursor='pointer'>
		<ChevronRightIcon />
	</Flex>
);

const LastPageLink = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => (
	<Flex fontWeight='bold' fontSize='sm' alignItems={'center'} onClick={onClick}>
		<Icon as={BiChevronsRight} />
	</Flex>
);

const itemTypeToComponent = {
	[ITEM_TYPES.PAGE]: Page,
	[ITEM_TYPES.ELLIPSIS]: Ellipsis,
	[ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
	[ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
	[ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
	[ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink,
};

const UltimatePagination = createUltimatePagination({
	itemTypeToComponent,
	WrapperComponent,
});

export default UltimatePagination;
