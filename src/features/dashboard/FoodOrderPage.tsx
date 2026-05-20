// "use client";

// const orders = [
//     {
//         id: "#1001",
//         customer: "John Doe",
//         items: 3,
//         total: "$45",
//         status: "Delivered",
//     },
//     {
//         id: "#1002",
//         customer: "Sarah Smith",
//         items: 2,
//         total: "$28",
//         status: "Pending",
//     },
//     {
//         id: "#1003",
//         customer: "Michael Lee",
//         items: 5,
//         total: "$72",
//         status: "Preparing",
//     },
//     {
//         id: "#1004",
//         customer: "Emma Watson",
//         items: 1,
//         total: "$15",
//         status: "Cancelled",
//     },
// ];

// const getStatusStyle = (status: string) => {
//     switch (status) {
//         case "Delivered":
//             return "bg-green-100 text-green-700";

//         case "Pending":
//             return "bg-yellow-100 text-yellow-700";

//         case "Preparing":
//             return "bg-blue-100 text-blue-700";

//         case "Cancelled":
//             return "bg-red-100 text-red-700";

//         default:
//             return "bg-gray-100 text-gray-700";
//     }
// };

// const FoodOrderTable = () => {
//     return (
//         <div className="p-6">
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
//                 {/* Header */}
//                 <div className="flex items-center justify-between p-5 border-b">
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800">
//                             Food Orders
//                         </h2>

//                         <p className="text-sm text-gray-500 mt-1">
//                             Recent customer orders
//                         </p>
//                     </div>

//                     <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
//                         + Add Order
//                     </button>
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gray-50">
//                             <tr className="text-left text-sm text-gray-600">
//                                 <th className="px-6 py-4 font-semibold">
//                                     Order ID
//                                 </th>

//                                 <th className="px-6 py-4 font-semibold">
//                                     Customer
//                                 </th>

//                                 <th className="px-6 py-4 font-semibold">
//                                     Items
//                                 </th>

//                                 <th className="px-6 py-4 font-semibold">
//                                     Total
//                                 </th>

//                                 <th className="px-6 py-4 font-semibold">
//                                     Status
//                                 </th>

//                                 <th className="px-6 py-4 font-semibold text-right">
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {orders.map((order, index) => (
//                                 <tr
//                                     key={order.id}
//                                     className={`border-t hover:bg-gray-50 transition ${index % 2 === 0
//                                             ? "bg-white"
//                                             : "bg-gray-50/40"
//                                         }`}
//                                 >
//                                     <td className="px-6 py-4 font-medium text-gray-800">
//                                         {order.id}
//                                     </td>

//                                     <td className="px-6 py-4 text-gray-700">
//                                         {order.customer}
//                                     </td>

//                                     <td className="px-6 py-4 text-gray-700">
//                                         {order.items}
//                                     </td>

//                                     <td className="px-6 py-4 font-semibold text-gray-800">
//                                         {order.total}
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
//                                                 order.status
//                                             )}`}
//                                         >
//                                             {order.status}
//                                         </span>
//                                     </td>

//                                     <td className="px-6 py-4 text-right">
//                                         <button className="text-sm text-blue-600 hover:underline">
//                                             View
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FoodOrderTable;


"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ORDERS } from "../../graphql/queries/orderQueries";

const getStatusStyle = (status: string) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700";

        case "Pending":
            return "bg-yellow-100 text-yellow-700";

        case "Preparing":
            return "bg-blue-100 text-blue-700";

        case "Cancelled":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
};

const FoodOrderTable = () => {
    const { loading, error, data } = useQuery<any>(GET_ORDERS);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-red-500">
                Error loading orders
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl shadow border overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b">
                    <h2 className="text-2xl font-bold">
                        Food Orders
                    </h2>

                    <p className="text-sm text-gray-500">
                        Recent customer orders
                    </p>
                </div>

                {/* Table */}
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-6 py-4">
                                Order ID
                            </th>

                            <th className="px-6 py-4">
                                Customer
                            </th>

                            <th className="px-6 py-4">
                                Items
                            </th>

                            <th className="px-6 py-4">
                                Total
                            </th>

                            <th className="px-6 py-4">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.orders.map(
                            (order: any, index: number) => (
                                <tr
                                    key={order.id}
                                    className={`border-t ${index % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-50/30"
                                        }`}
                                >
                                    <td className="px-6 py-4 font-medium">
                                        #{order.id}
                                    </td>

                                    <td className="px-6 py-4">
                                        {order.customer}
                                    </td>

                                    <td className="px-6 py-4">
                                        {order.items}
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        ${order.total}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FoodOrderTable;