import React, {
	createContext,
	ReactElement,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react';

import { Progress, VStack, Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { debounce, find, filter } from 'lodash';

dayjs.extend(duration);

type Props = {
	children: ReactElement | ReactElement[];
};

export interface Event {
	type: 0 | 1 | 2; // 0 = Route, 1 = Fetch, 2 = Mutation
	name?: string; // Optional name of event
	date?: number;
}

type Progress = {
	loading: boolean;
	value: number;
	start: (arg0?: Event[] | Event) => void;
	done: (arg0?: Event[] | Event) => void;
};

const expirationMS = 7500;

// 1. Creating a context
const LoadingProgressContext = createContext<Progress>({
	loading: false,
	value: 0,
	start: () => {
		/* do nothing */
	},
	done: () => {
		/* do nothing */
	},
});

// 2. useLoadingProgress hook
export const useLoadingProgress = (): Progress => {
	return useContext<Progress>(LoadingProgressContext);
};

// 3. LoadingProgress component
const LoadingProgress = () => {
	const { value } = useLoadingProgress();

	return (
		<VStack
			align='flex-end'
			position='fixed'
			top={0}
			left={0}
			right={0}
			zIndex={9999}
		>
			<Progress value={value} size='xs' width='100%' />
			{/* <CircularProgress size='24px' isIndeterminate pr={2} /> */}
		</VStack>
	);
};

// 4. LoadingProgressProvider
export const LoadingProgressProvider = ({ children }: Props): ReactElement => {
	// 5. Variables
	const step = useRef(5);
	const [value, setValue] = useState(0);
	const [isOn, setOn] = useState(false);
	const [stateEvents, setEvents] = useState<Event[]>([]); // Loading due to router change

	// 6. useEffect
	useEffect(() => {
		if (isOn) {
			let timeout: any = 0;

			if (value < 20) {
				step.current = 5;
			} else if (value < 40) {
				step.current = 4;
			} else if (value < 60) {
				step.current = 3;
			} else if (value < 80) {
				step.current = 2;
			} else {
				step.current = 1;
			}

			if (value <= 98) {
				timeout = setTimeout(() => {
					setValue(value + step.current);
				}, 500);
			}

			return () => {
				if (timeout) {
					clearTimeout(timeout);
				}
			};
		}
	}, [value, isOn]);

	// 7. start
	const start = debounce((events: Event[] | Event | undefined) => {
		const triggerLoading = () => {
			setValue(0);
			setOn(true);
		};

		if (!events) {
			// No events given, do not modify state events.
			triggerLoading();
			return;
		}

		const handleRouteEvent = (event: Event) => {
			// Replace all other current events with this one route...
			setEvents([{ ...event, date: Date.now() }]);
		};

		const handleNonRouteEvent = () => {
			if (Array.isArray(events)) {
				const eventsWithDate = events.map((event) => {
					if (!event.date) {
						event.date = Date.now();
					}

					return event;
				});

				// Push events to current events.
				setEvents([...stateEvents, ...eventsWithDate]);
			} else {
				// Push event to current events.
				setEvents([...stateEvents, { ...events, date: Date.now() }]);
			}
		};

		if (!Array.isArray(events) && events.type >= 0) {
			if (events.type === 0) {
				// Starting loading for a routing event...
				handleRouteEvent(events);
			} else {
				// Starting loading for a fetch/mutation event...
				handleNonRouteEvent();
			}
		}

		if (Array.isArray(events)) {
			const routeEvent = find(events, { type: 0 });
			if (routeEvent) {
				handleRouteEvent(routeEvent);
			}
			handleNonRouteEvent();
		}

		if (!isOn) {
			triggerLoading();
		}
	}, 100);

	// 8. done
	/**
	 * Routing shouldn't be able to done(), UNLESS we are not running a fetch/mutation
	 *
	 */
	const done = debounce((events: Event[] | Event | undefined) => {
		if (!events) {
			// No events given, clear all stateEvents.
			if (stateEvents.length > 0) {
				setEvents([]);
			}

			setValue(100);
			setTimeout(() => {
				setOn(false);
			}, 200);

			return;
		}

		let newEvents = [...stateEvents];

		if (Array.isArray(events)) {
			for (const { name } of events) {
				newEvents = filter(newEvents, (o) => o.name !== name);
			}
		} else {
			newEvents = filter(newEvents, (o) => o.name !== events.name);
		}

		setEvents(newEvents);

		if (newEvents.length === 0) {
			setValue(100);
			setTimeout(() => {
				setOn(false);
			}, 200);
		}
	}, 100);

	const checkEventsTimeout = () => {
		if (stateEvents && stateEvents.length > 0) {
			const newEvents = filter(stateEvents, (event) =>
				dayjs().isBefore(dayjs(event.date).add(expirationMS, 'ms'))
			);

			if (newEvents.length !== stateEvents.length) {
				setEvents(newEvents);

				if (newEvents.length === 0) {
					setValue(100);

					setTimeout(() => {
						setOn(false);
					}, 200);
				}
			}
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			checkEventsTimeout();
		}, 1000);

		return () => clearTimeout(interval);
	}, [stateEvents]);

	return (
		<LoadingProgressContext.Provider
			value={{
				value,
				start,
				done,
				loading: value > 0,
			}}
		>
			{isOn && (
				<>
					<LoadingProgress />
					<Box
						bgColor='#ffffff20'
						position='fixed'
						top={0}
						left={0}
						bottom={0}
						right={0}
						width='100vw'
						height='100vh'
						zIndex='90'
					/>
				</>
			)}
			{children}
		</LoadingProgressContext.Provider>
	);
};
