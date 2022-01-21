import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AccessControlContext } from "../../auth/AccessControl";
import MainLayout from "../../layouts/MainLayout";
import Order from "../../models/order";
import { useRepository } from "../../repository";
import OrderList from "./OrderList";

function OrderListPage() {
    const { token } = useContext(AccessControlContext);
    const repo = useRepository();
    const [orders, setOrders] = useState<Order[]>([]);
    const [firstLoad, setFirstLoad] = useState(false);

    async function fetchOrders() {
        const data = await repo.getAllOrders();
        setOrders(data);
        setFirstLoad(true);
    }

    async function onDelete(id?: string | number) {
        if(!id)
            return;

        const isAccepted = confirm("Do you want to delete this order?");
        if(isAccepted) {
            await repo.deleteOrderById(id);
            await fetchOrders();
        }
    }

    useEffect(() => {
        if(token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <MainLayout>
            <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>
            {firstLoad && (
                <>
                    {!orders.length && (
                        <div className="text-center my-32">
                            <div>There is no any order yet.</div>
                        </div>
                    )}
                    {!!orders.length && (
                        <OrderList orders={orders} onDelete={id => onDelete(id)} />
                    )}
                </>
            )}
            {!firstLoad && (
                <div className="my-32 text-center">Loading...</div>
            )}
        </MainLayout>
    )
}

export default OrderListPage;