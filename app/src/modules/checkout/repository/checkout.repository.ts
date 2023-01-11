import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./models";

export default class SequelizeCheckoutRepository implements CheckoutGateway {
    async findOrder(id: string): Promise<Order> {
        // const retrievedOrder = await OrderModel.findByPk(id);

        // return Order();
        throw new Error("");
    }

    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.id,
            status: order.status,
            clientId: order.client.id.id,
            productsIds: order.products.map((product) => product.id.id),
        });
    }
}