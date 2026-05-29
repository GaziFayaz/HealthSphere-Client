import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AddToCartButton from "../Cart/AddToCartButton";
import ProductModal from "../Product/ProductModal";
import { FaEye } from "react-icons/fa";

const History = () => {
	const [paidItems, setPaidItems] = useState([]);
	const [pendingItems, setPendingItems] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure.get("/seller-sold-items").then((res) => {
			setPaidItems(res?.data?.paidItems);
			setPendingItems(res?.data?.pendingItems);
		});
	}, []);

	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Payment History</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Payment History
			</h1>
			<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
				<Tabs className="w-full">
					<TabList className="flex border-b-2 justify-around">
						<Tab className="text-2xl w-40 btn">Pending</Tab>
						<Tab className="text-2xl w-40 btn">Paid</Tab>
					</TabList>

					<TabPanel>
						<div className="overflow-x-auto">
							<table className="table table-zebra text-center">
								{/* head */}
								<thead className="lg:text-xl font-slab align-text-top">
									<tr>
										<th></th>
										<th>
											<div className="font-bold">Medicine</div>
											<div className="text-sm opacity-50">Type</div>
										</th>
										<th>Dosage Form</th>
										<th>Manufacturer</th>
										<th>Price</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody className="lg:text-lg font-roboto text-gray-300">
									{pendingItems.map((medicine, index) => {
										return (
											<tr key={index}>
												<td>
													<div className="avatar">
														<div className="mask mask-squircle w-12 h-12">
															<img
																src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
																alt="Avatar Tailwind CSS Component"
															/>
														</div>
													</div>
												</td>
												<td>
													<div className="flex-grow">
														<div className="font-bold">
															{medicine.medicine_name}
														</div>
														<div className="text-sm opacity-50">
															{medicine.generic_name}
														</div>
													</div>
												</td>
												<td className="font-bold">
													{medicine.category_name}
													<br />
													<span className="badge badge-ghost badge-sm">
														{medicine.strength}
													</span>
												</td>
												<td className="font-bold">
													{medicine.manufacturer_name}
												</td>
												<td className="font-bold">
													Tk. {medicine.unit_prices[0].price}
												</td>
												<td>
													<div className="h-full flex gap-10 justify-center items-center">
														<FaEye
															className="text-theme hover:text-theme2 text-2xl cursor-pointer"
															data-tooltip-id="my-tooltip"
															data-tooltip-content="See Details"
															data-tooltip-place="bottom"
															onClick={() => {
																// console.log(`getting clicked for id ${index}`)
																document
																	.getElementById(`modal${index}`)
																	.showModal();
															}}
														/>
														<AddToCartButton
															product={medicine}
														></AddToCartButton>
														<ProductModal
															modalId={`modal${index}`}
															modalData={medicine}
														></ProductModal>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="overflow-x-auto">
							<table className="table table-zebra text-center">
								{/* head */}
								<thead className="lg:text-xl font-slab align-text-top">
									<tr>
										<th></th>
										<th>
											<div className="font-bold">Medicine</div>
											<div className="text-sm opacity-50">Type</div>
										</th>
										<th>Dosage Form</th>
										<th>Manufacturer</th>
										<th>Price</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody className="lg:text-lg font-roboto text-gray-300">
									{paidItems.map((medicine, index) => {
										return (
											<tr key={index}>
												<td>
													<div className="avatar">
														<div className="mask mask-squircle w-12 h-12">
															<img
																src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
																alt="Avatar Tailwind CSS Component"
															/>
														</div>
													</div>
												</td>
												<td>
													<div className="flex-grow">
														<div className="font-bold">
															{medicine.medicine_name}
														</div>
														<div className="text-sm opacity-50">
															{medicine.generic_name}
														</div>
													</div>
												</td>
												<td className="font-bold">
													{medicine.category_name}
													<br />
													<span className="badge badge-ghost badge-sm">
														{medicine.strength}
													</span>
												</td>
												<td className="font-bold">
													{medicine.manufacturer_name}
												</td>
												<td className="font-bold">
													Tk. {medicine.unit_prices[0].price}
												</td>
												<td>
													<div className="h-full flex gap-10 justify-center items-center">
														<FaEye
															className="text-theme hover:text-theme2 text-2xl cursor-pointer"
															data-tooltip-id="my-tooltip"
															data-tooltip-content="See Details"
															data-tooltip-place="bottom"
															onClick={() => {
																// console.log(`getting clicked for id ${index}`)
																document
																	.getElementById(`modal${index}`)
																	.showModal();
															}}
														/>
														<AddToCartButton
															product={medicine}
														></AddToCartButton>
														<ProductModal
															modalId={`modal${index}`}
															modalData={medicine}
														></ProductModal>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default History;
