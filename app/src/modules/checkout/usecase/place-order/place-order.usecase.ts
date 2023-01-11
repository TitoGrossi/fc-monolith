import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface<PlaceOrderInputDto, PlaceOrderOutputDto> {
    private _checkoutGateway: CheckoutGateway;
    private _clientService: ClientAdmFacadeInterface;
    private _productService: ProductAdmFacadeInterface;
    private _catalogService: StoreCatalogFacadeInterface;
    private _paymentService: PaymentFacadeInterface;
    private _invoiceService: InvoiceFacadeInterface;

    constructor(
        gateway: CheckoutGateway,
        clientService: ClientAdmFacadeInterface,
        productService: ProductAdmFacadeInterface,
        catalogService: StoreCatalogFacadeInterface,
        paymentService: PaymentFacadeInterface,
        invoiceService: InvoiceFacadeInterface
    ) {
        this._checkoutGateway = gateway;
        this._clientService = clientService;
        this._productService = productService;
        this._catalogService = catalogService;
        this._paymentService = paymentService;
        this._invoiceService = invoiceService;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientService.findClient({ id: input.clientId });

        if (!client) throw new Error("Client not found");

        await this.validateProducts(input);
        const products = await this.retrieveProducts(input);

        const order = new Order({
            client: new Client({
                id: new Id(client.id),
                createdAt: client.createdAt,
                updatedAt: client.updatedAt,
                name: client.name,
                email: client.email,
                address: client.address,
            }),
            products: products,
        });

        const payment = await this._paymentService.process({ orderId: order.id.id, amount: order.total })
        const invoice = payment.status === "approved" ? await this._invoiceService.generateInvoice({
            name: client.name,
            document: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            number: "",
            complement: "",
            items: products.map((product) => {
                return {
                    id: product.id.id,
                    name: product.name,
                }
            }),

        }) : null

        payment.status === "approved" && order.approve();
        await this._checkoutGateway.addOrder(order);

        return {
            id: order.id.id,
            status: order.status,
            products: order.products.map((product) => {
                return { productId: product.id.id }
            }),
            total: order.total,
            invoiceId: invoice ? invoice.id : null
        }
    }

    private async retrieveProducts(input: PlaceOrderInputDto): Promise<Product[]> {
        const products: Product[] = []
        for (const product of input.products) {
            const retrievedProduct = await this._catalogService.find({ id: product.productId })
            if (!retrievedProduct)
                throw new Error("Product not found on catalog")
            products.push(new Product(
                {
                    id: new Id(retrievedProduct.id),
                    name: retrievedProduct.name,
                    description: retrievedProduct.description,
                    salesPrice: retrievedProduct.salesPrice,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ))
        }
        return products
    }

    // TODO: passar isso para a entidade (validação no domínio)
    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0)
            throw new Error("No products selected");

        // TODO: fazer isso em somente uma chamada de rede/banco
        for (const product of input.products) {
            const productStock = await this._productService.checkStock({ productId: product.productId })
            if (productStock.stock <= 0)
                throw new Error(`Product ${product.productId} is out of stock`)
        }
    }
}
