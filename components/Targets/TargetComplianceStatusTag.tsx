import { useMemo } from 'react';

import { useColorModeValue } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { Tag, TagProps } from 'components/core/tag';
import { PciStatus } from 'types/scan-reports';
export interface TargetComplianceStatusTagProps
	extends Omit<TagProps, 'color'> {
	status: PciStatus;
	lastScannedDate?: Date;
	value?: string;
}

export function TargetComplianceStatusTag({
	status,
	value,
	lastScannedDate,
	...tagProps
}: TargetComplianceStatusTagProps) {
	const textRed = useColorModeValue('#5e0808', '#5e0808');
	const textGreen = useColorModeValue('#085e0b', '#085e0b');

	const badgeRed = useColorModeValue('#f5898975', '#f5898975');
	const badgeGreen = useColorModeValue('#89f58b75', '#89f58b75');

	const textGray = useColorModeValue('text.400', 'gray.500');
	const badgeGray = useColorModeValue('gray.200', 'gray.50');

	const isStale = lastScannedDate
		? dayjs(lastScannedDate).isBefore(dayjs().subtract(90, 'days'))
		: null;

	const badgeColor = useMemo(() => {
		if (isStale) {
			return badgeGray;
		}

		if (status === PciStatus.Passed) {
			return badgeGreen;
		}

		if (status === PciStatus.Failed) {
			return badgeRed;
		}

		return badgeGray;
	}, [isStale, status, badgeRed, badgeGreen, badgeGray]);

	const textColor = useMemo(() => {
		if (isStale) {
			return textGray;
		}

		if (status === PciStatus.Passed) {
			return textGreen;
		}

		if (status === PciStatus.Failed) {
			return textRed;
		}

		return textGray;
	}, [isStale, status, textRed, textGreen, textGray]);

	const text = useMemo(() => {
		if (isStale) {
			return 'Stale';
		}

		return status || 'Not Scanned';
	}, [isStale, status]);

	return (
		<Tag
			color={badgeColor}
			textColor={textColor}
			fontWeight='semibold'
			fontSize='14px'
			{...tagProps}
		>
			{value ?? text}
		</Tag>
	);
}
