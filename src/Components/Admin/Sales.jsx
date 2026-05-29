import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";


// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  section: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  text: {
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E0E0E0",
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  total: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "right",
  },
});

const Sales = () => {
	const [orders, setOrders] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure.get("/orders/all").then((res) => {
			console.log(res.data);
			setOrders(res.data);
		});
	}, []);

  const MyDocument = ({ orders }) => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Sales Report</Text>
  
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Medicine</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Seller</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Buyer</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total Price</Text>
            </View>
          </View>
  
          {orders.map((order) => {
            return order?.items?.map((item, itemIndex) => {
              return (
                <View key={itemIndex} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.medicine_name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.seller_email}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{order.email}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{(item.unit_prices[0].price * item.quantity).toFixed(2)}</Text>
                  </View>
                </View>
              );
            });
          })}
        </View>
  
        <Text style={styles.total}>
          Total Price:{" "}
          {orders.reduce((acc, order) => {
            return acc + order.items.reduce((sum, item) => {
              return sum + item.unit_prices[0].price * item.quantity;
            }, 0);
          }, 0).toFixed(2)}
        </Text>
      </Page>
    </Document>
  );
  

	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Manage order</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Sales Report
			</h1>

			<div className="overflow-x-auto">
				<table className="table table-zebra text-center">
					{/* head */}
					<thead className="lg:text-xl font-slab align-text-top">
						<tr>
							<th>Medicine</th>
							<th>Seller</th>
							<th>Buyer</th>
							<th>Total Price</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{orders.map((order, index) => {
							return order?.items?.map((item, itemIndex) => {
								return (
									<tr key={index + " " + itemIndex}>
										<td>{item.medicine_name}
										</td>
										<td className="font-bold">{item.seller_email}</td>
										<td className="font-bold">{order.email}</td>
										<td className="font-bold">{(item.unit_prices[0].price*item.quantity).toFixed(2)}</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
        <div className="flex gap-6 justify-end mt-5">
					<button className="btn bg-green-500 text-white text-lg  hover:bg-green-700">
          <PDFDownloadLink document={<MyDocument orders={orders} />} fileName="sales_report.pdf">
      {({ loading }) => (loading ? "Loading document..." : "Download Report")}
    </PDFDownloadLink>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sales;
