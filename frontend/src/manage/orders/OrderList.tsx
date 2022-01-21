import Order from "../../models/order";

interface IOrderList {
    orders: Order[];
    onDelete: (id?: string | number) => Promise<void>;
}

function OrderList({ orders, onDelete }: IOrderList) {
    return (
        <>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 font-semibold">ID</th>
                        <th className="border border-gray-300 p-2 font-semibold text-left">Buyer ID</th>
                        <th className="border border-gray-300 p-2 font-semibold">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="border border-gray-300 text-center p-2 w-32">{order.id}</td>
                            <td className="border border-gray-300 p-2 w-48">{order.user_id}</td>
                            {/* <td className="border border-gray-300 p-2">{order.title}</td> */}
                            <td className="border border-gray-300 p-2 text-center w-32">
                                <div onClick={() => onDelete(order.id)} className="inline-block cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">Delete</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default OrderList;