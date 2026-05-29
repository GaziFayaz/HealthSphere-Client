import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminHome = () => {
	const axiosSecure = useAxiosSecure();
	const [totalSales, setTotalSales] = useState(0);
	const [totalPaid, setTotalPaid] = useState(0);
	const [totalPending, setTotalPending] = useState(0);

	useEffect(() => {
		axiosSecure.get("/total-sales").then((res) => {
			// console.log(res.data);
			setTotalSales(res.data.totalSales);
			setTotalPaid(res.data.totalPaid);
			setTotalPending(res.data.totalPending);
		});
	}, [axiosSecure]);

	return (
		<div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 w-full">
			<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Sales Overview
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
						Total Sales: <span className="font-medium">{totalSales.toFixed(2)}</span>
					</h2>
				</div>
				<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
						Total Paid: <span className="font-medium">{totalPaid.toFixed(2)}</span>
					</h2>
				</div>
				<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
						Total Pending: <span className="font-medium">{totalPending.toFixed(2)}</span>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
