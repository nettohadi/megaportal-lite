import { Flex, Button, Icon } from '@chakra-ui/react';
import type { FlexboxProps } from '@chakra-ui/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface IProps {
	page?: number;
	total: number;
	handler: (page: number) => void;
	align?: FlexboxProps['justifyContent'];
}

const PaginationLine = ({ total, page = 0, handler, align }: IProps) => {
	return (
		<Flex justifyContent={align ? align : 'flex-end'} mb='20px' mt='20px'>
			<Button
				variant='paginate'
				onClick={() => handler(page - 1)}
				data-testid='previous-button'
				mr='5px'
				disabled={page - 1 === 0}
				isDisabled={page - 1 === 0}
			>
				<Flex justifyContent='center' alignItems='center'>
					<Icon as={HiChevronLeft} />
				</Flex>
			</Button>
			{new Array(total).fill(0).map((_, index) => (
				<Button
					key={index}
					variant='paginate'
					onClick={() => handler(index + 1)}
					data-testid='number-button'
					mr='5px'
					pl='6px'
					pr='6px'
					isActive={page === index + 1}
					// _active={{
					// 	background: 'var(--chakra-colors-gray-100)',
					// }}
				>
					{index + 1}
				</Button>
			))}

			<Button
				variant='paginate'
				onClick={() => handler(page + 1)}
				data-testid='next-button'
				disabled={total === page}
				isDisabled={total === page}
			>
				<Flex justifyContent='center' alignItems='center'>
					<Icon as={HiChevronRight} />
				</Flex>
			</Button>
		</Flex>
	);
};

export default PaginationLine;
