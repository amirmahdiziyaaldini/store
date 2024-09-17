import React, { useEffect, useState, useRef } from 'react';
import '../../style/clock.css'

export default function Clock() {
	const [days, setDays] = useState<number>(0);
	const [hours, setHours] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(0);

	  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // استفاده از useRef برای نگهداری interval

  
	const countDown = () => {
		const destination = new Date('Oct 10, 2024').getTime();

		if (intervalRef.current) clearInterval(intervalRef.current); // اطمینان از عدم تکرار interval

		intervalRef.current = setInterval(() => {
			const now = new Date().getTime();
			const difference = destination - now;

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			if (difference < 0) {
				clearInterval(intervalRef.current!); // توقف شمارش
			} else {
				setDays(days);
				setHours(hours);
				setMinutes(minutes);
				setSeconds(seconds);
			}
		}, 1000);
	};

	useEffect(() => {
		countDown();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current); // پاکسازی interval در زمان unmount شدن کامپوننت
		};
	}, []);

	return (
		<div className="clock__wrapper d-flex align-item-center gap-3">
			<div className="clock__data d-flex align-item-center gap-3">
				<div className="text-center">
					<h3 className="text-white fs-3 mb-2">{days}</h3>
					<h5 className="text-white fs-6">Days</h5>
				</div>
				<span className="text-white fs-3">:</span>
			</div>

			<div className="clock__data d-flex align-item-center gap-3">
				<div className="text-center">
					<h3 className="text-white fs-3 mb-2">{hours}</h3>
					<h5 className="text-white fs-6">Hours</h5>
				</div>
				<span className="text-white fs-3">:</span>
			</div>

			<div className="clock__data d-flex align-item-center gap-3">
				<div className="text-center">
					<h3 className="text-white fs-3 mb-2">{minutes}</h3>
					<h5 className="text-white fs-6">Minutes</h5>
				</div>
				<span className="text-white fs-3">:</span>
			</div>

			<div className="clock__data d-flex align-item-center gap-3">
				<div className="text-center">
					<h3 className="text-white fs-3 mb-2">{seconds}</h3>
					<h5 className="text-white fs-6">Seconds</h5>
				</div>
			</div>
		</div>
	);
}
